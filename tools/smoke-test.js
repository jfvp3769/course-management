/*
 * Boot the refactored app in a real DOM and assert it starts clean.
 * This is the load-order test: a classic <script> that calls a function
 * defined in a later file blows up here, not in the user's browser.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Run from anywhere:  node tools/smoke-test.js
const ROOT = path.resolve(__dirname, '..');

// Module order is read straight out of index.html, so this test also verifies
// that the script tags and the files on disk agree.
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const order = [...indexHtml.matchAll(/<script src="(src\/[^"]+)"><\/script>/g)].map(m => m[1]);
if (!order.length) { console.log('no module script tags found in index.html'); process.exit(1); }

// Strip the vendor <script> tags (tailwind/pdf.js); we inject our own stubs.
let html = indexHtml
  .replace(/<script src="(tailwind|pdf)[^"]*"><\/script>/g, '')
  .replace(/<script src="src\/[^"]*"><\/script>/g, '')
  .replace(/<script>[\s\S]*?tailwind\.config[\s\S]*?<\/script>/, '');

// 'dangerously' so injected <script> elements execute exactly as a browser
// would - separate scripts sharing one global lexical environment.
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/' });
const { window } = dom;

// jsdom models scrollTop/scrollLeft but not the scroll*() METHODS, which the
// app calls inside requestAnimationFrame callbacks (scrollMatrixToRow and
// friends). Without these stubs the runner dies on an uncaught TypeError in a
// frame callback before any assertion runs.
for (const proto of [window.HTMLElement.prototype, window.Element.prototype]) {
  if (typeof proto.scrollTo !== 'function') proto.scrollTo = function () {};
  if (typeof proto.scrollBy !== 'function') proto.scrollBy = function () {};
}
if (typeof window.Element.prototype.scrollIntoView !== 'function') {
  window.Element.prototype.scrollIntoView = function () {};
}
Object.defineProperty(window.HTMLElement.prototype, 'offsetTop', {
  configurable: true,
  get() {
    if (this.id && this.id.startsWith('row-')) {
      const idx = Array.prototype.indexOf.call(this.parentElement ? this.parentElement.children : [], this);
      return Math.max(120, (idx + 1) * 60);
    }
    return 0;
  }
});

// minimal vendor stubs
window.tailwind = { config: {} };
window.pdfjsLib = { GlobalWorkerOptions: {}, getDocument: () => ({ promise: Promise.resolve() }) };
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));

const errors = [];
const warnings = [];
window.console = Object.assign({}, console, {
  error: (...a) => errors.push(a.join(' ')),
  warn: (...a) => warnings.push(a.join(' ')),
  log: () => {}
});
window.addEventListener('error', (e) => errors.push('uncaught: ' + e.message));

// lets the test read global-lexical bindings (let/const) from outside
{
  const probe = window.document.createElement('script');
  probe.textContent = 'window.__probe = (expr) => eval(expr);';
  window.document.body.appendChild(probe);
}

// load each module the way the browser would
let loaded = 0;
for (const mod of order) {
  const code = fs.readFileSync(path.join(ROOT, mod), 'utf8');
  const el = window.document.createElement('script');
  el.textContent = code;
  const before = errors.length;
  window.document.body.appendChild(el);
  if (errors.length > before) {
    console.log(`\nLOAD FAILED: ${mod}`);
    errors.slice(before).forEach(e => console.log('  ' + e));
    process.exit(1);
  }
  loaded++;
}
console.log(`loaded ${loaded}/${order.length} modules without throwing`);

// bootstrap.js registers on DOMContentLoaded; jsdom already fired it, so the
// readyState branch calls startApp() synchronously during eval. Give timers a tick.
setTimeout(() => {
  const g = (n) => window.document.getElementById(n);

  const checks = [
    ['matrix table rendered', () => (g('matrix-body') || g('matrix-body') || window.document.querySelector('#matrix-table tbody'))?.children.length > 0],
    ['roster rendered', () => (g('student-table-body') || window.document.querySelector('#roster-table tbody'))?.innerHTML.length > 0],
    ['gradebook rendered', () => g('gradebook-table-body')?.innerHTML.length > 0],
    ['calendar rendered', () => (g('calendar-table-body') || g('academic-calendar-body'))?.innerHTML.length > 0],
    ['Render pipeline exposed', () => typeof window.Render?.after === 'function'],
    ['jsAttr helper present', () => window.__probe('typeof jsAttr') === 'function'],
    // --- regression tests for the bugs fixed in this refactor ---
    ['radar list keeps scroll position across sidebar re-render', () => {
      // _renderHorizonTimeline() replaced #planner-milestones-list innerHTML on
      // every sidebar repaint (clock tick, switchTab), which resets scrollTop.
      // It must now preserve the held position.
      const list = g('planner-milestones-list');
      if (!list) return false;
      const SENTINEL = 123;
      list.scrollTop = SENTINEL;
      window.updatePlannerSidebar();
      // innerHTML replacement always drops real scroll state in jsdom, so the
      // write-back is the signal under test - verify the code path ran after
      // the render by spying the native setter.
      const desc = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'scrollTop') ||
                   Object.getOwnPropertyDescriptor(window.Element.prototype, 'scrollTop');
      let restored = null;
      try {
        Object.defineProperty(list, 'scrollTop', {
          configurable: true,
          get() { return desc.get.call(this); },
          set(v) { restored = v; desc.set.call(this, v); }
        });
        window.updatePlannerSidebar();
        Object.defineProperty(list, 'scrollTop', desc);
      } catch (e) { return false; }
      return list.innerHTML.length > 0 && restored === SENTINEL;
    }],
    ['radar jump does not reset activity list scroll position', () => {
      const list = g('planner-milestones-list');
      if (!list) return false;
      const SENTINEL = 180;
      list.scrollTop = SENTINEL;
      const items = window.__probe('typeof _getHorizonTimelineEvents === "function" ? _getHorizonTimelineEvents(new Date(), "2026-09-22", 0, ["Sunday"]) : null');
      const m = items && items.find(i => i.dateKey);
      if (!m) return false;

      const origRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = (cb) => { cb(); return 0; };
      window.jumpToMatrixDate(m.dateKey, m.course || '', m.section || '', !!m.isSchoolMilestone);
      window.requestAnimationFrame = origRaf;

      return list.scrollTop === SENTINEL;
    }],
    ['radar jump targets the right cell and scroll args', () => {
      // INTRAMURALS-style milestone clicks resolve to the notes cell and must
      // hand scrollTo a top/left that moves toward it instead of silently
      // keeping the current position.
      const items = window.__probe('typeof _getHorizonTimelineEvents === "function" ? _getHorizonTimelineEvents(new Date(), "2026-09-22", 0, ["Sunday"]) : null');
      if (!items || !items.length) return false;
      window.Render.views('planner');
      const calls = [];
      const wrap = g('matrix-scroll-wrapper');
      const orig = wrap.scrollTo.bind(wrap);
      wrap.scrollTo = (opts) => { calls.push(opts); return orig(opts); };
      const dateKey = window.__probe("courseData.subjects[0] ? null : null");
      void dateKey;
      const milestones = items.filter(i => i.dateKey);
      if (!milestones.length) return false;
      const m = milestones[0];
      const rowBefore = g('row-' + m.dateKey);
      const origRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = (cb) => { cb(); return 0; };
      window.jumpToMatrixDate(m.dateKey, m.course || '', m.section || '', !!m.isSchoolMilestone);
      window.requestAnimationFrame = origRaf;
      wrap.scrollTo = orig;
      if (!calls.length) return false;
      // at least one handed scrollTo call must actually move the viewport
      return calls.some((c) => (typeof c.top === 'number' && c.top > 0) ||
                               (typeof c.left === 'number' && c.left > 0));
    }],
    ['Render.after persists + repaints', () => {
      const key = window.__probe('STORAGE_KEY');
      window.localStorage.removeItem(key);
      window.__probe("plannerEntries['2026-08-10__CVE111__B15.1'].topic = 'SMOKE TEST TOPIC'");
      window.Render.after('lesson', { immediate: true });
      return !!window.localStorage.getItem(key) &&
             g('matrix-body').innerHTML.includes('SMOKE TEST TOPIC');
    }],
    ['apostrophe in section survives render + delegated click', () => {
      // Section names are user data. They must survive (a) HTML-attribute
      // encoding into data-section, (b) the DOM decoding them back into
      // dataset.section, and (c) the delegated click -> ActionRegistry ->
      // openLessonModal() hand-off, which writes the name into #modal-title.
      // Before the data-action refactor this name was interpolated into an
      // inline onclick string literal and an apostrophe broke the handler.
      window.__probe('courseData.subjects[0].sections[0] = "B\'15"');
      window.Render.views('planner');

      // (a)+(b): the matrix must carry the RAW name in dataset. If the template
      // double-escaped it, dataset.section would hold "&#39;" instead.
      const cell = window.document.querySelector('#matrix-body td[data-action="openLessonModal"][data-section="B\'15"]');
      if (!cell) return false;
      if (cell.dataset.section !== "B'15") return false;

      // double-fire bug class: no rendered matrix element may carry an inline
      // onclick at all - the delegated data-action path is the only channel
      if (window.document.querySelector('#matrix-body [onclick]')) return false;

      // (c): click through the document-level delegated listener
      const errBefore = errors.length;
      try { cell.click(); } catch (e) { return false; }
      if (errors.length !== errBefore) return false; // handler threw

      const modal = g('lesson-modal');
      const title = g('modal-title');
      if (!modal || !title || modal.classList.contains('hidden')) return false;
      const code = window.__probe('courseData.subjects[0].code');
      // jsdom's innerText SETTER is a stub (textContent stays untouched), but
      // its GETTER returns exactly what the app wrote - so innerText is the
      // right channel here, and textContent would falsely read "Plan Activity".
      if (title.innerText.trim() !== 'Plan Activity: ' + code + " (B'15)") return false;
      // and the hand-off state proves the section name arrived intact
      return window.__probe('currentEditingCell && currentEditingCell.section') === "B'15";
    }],
    ['easter-egg binding is idempotent', () => {
      let taps = 0;
      const logo = g('header-school-logo');
      if (!logo) return false;
      window.__probe('window.handleLogoEasterEggTap = () => {};');
      window.bindBrandingEasterEgg();
      window.bindBrandingEasterEgg();
      window.bindBrandingEasterEgg();
      // verify favicon sync with school logo
      const fav = window.document.querySelector('link[rel*="icon"]');
      if (!fav) return false;
      const prevLogo = window.__probe('semesterConfig.schoolLogo');
      window.__probe('semesterConfig.schoolLogo = "data:image/png;base64,TEST_FAVICON_DATA"');
      window.applyHeaderBranding();
      const updatedHref = fav.href;
      window.__probe(`semesterConfig.schoolLogo = ${JSON.stringify(prevLogo)}`);
      window.applyHeaderBranding();
      if (!updatedHref.includes('TEST_FAVICON_DATA')) return false;

      // one bind only: the guard flag must be set and re-binding must be a no-op
      return logo.dataset.eggBound === '1';
    }],
    ['theme accent glow updates with selected theme', () => {
      window.applyHeaderTheme('emerald');
      const root = window.document.documentElement;
      const glowEmerald = root.style.getPropertyValue('--app-header-accent-glow');
      const accentEmerald = root.style.getPropertyValue('--app-header-accent');
      if (accentEmerald !== '#34d399') return false;
      if (!glowEmerald || !glowEmerald.includes('52, 211, 153')) return false;

      window.applyHeaderTheme('sapphire');
      const glowSapphire = root.style.getPropertyValue('--app-header-accent-glow');
      const accentSapphire = root.style.getPropertyValue('--app-header-accent');
      if (accentSapphire !== '#38bdf8') return false;
      if (!glowSapphire || !glowSapphire.includes('56, 189, 248')) return false;

      // restore default maroon
      window.applyHeaderTheme('maroon');
      return true;
    }],
    ['row height automatically adjusts to show exactly 7 rows on resize', () => {
      const wrap = g('matrix-scroll-wrapper');
      if (!wrap || typeof window.adjustMatrixRowHeightFor7Rows !== 'function') return false;

      // Test 1: Desktop window height (700px)
      const res1 = window.adjustMatrixRowHeightFor7Rows(wrap, 700);
      if (!res1 || typeof res1.rowH !== 'number' || typeof res1.exactWrapperH !== 'number') return false;
      // Invariant: exactWrapperH must equal thead (86) + (7 * rowH)
      if (res1.exactWrapperH !== 86 + (res1.rowH * 7)) return false;
      if (wrap.style.height !== res1.exactWrapperH + 'px') return false;
      if (wrap.style.getPropertyValue('--matrix-row-height') !== res1.rowH + 'px') return false;

      // Test 2: Taller window height (850px)
      const res2 = window.adjustMatrixRowHeightFor7Rows(wrap, 850);
      if (!res2 || res2.rowH <= res1.rowH) return false;
      if (res2.exactWrapperH !== 86 + (res2.rowH * 7)) return false;
      if (wrap.style.height !== res2.exactWrapperH + 'px') return false;
      if (wrap.style.getPropertyValue('--matrix-row-height') !== res2.rowH + 'px') return false;

      // Test 3: Compact window height (480px)
      const res3 = window.adjustMatrixRowHeightFor7Rows(wrap, 480);
      if (!res3 || res3.rowH >= res1.rowH || res3.rowH < 48) return false;
      if (res3.exactWrapperH !== 86 + (res3.rowH * 7)) return false;
      if (wrap.style.height !== res3.exactWrapperH + 'px') return false;
      if (wrap.style.getPropertyValue('--matrix-row-height') !== res3.rowH + 'px') return false;

      // Test 4: With horizontal scrollbar active (scrollWidth > clientWidth)
      Object.defineProperty(wrap, 'scrollWidth', { value: 1200, configurable: true });
      Object.defineProperty(wrap, 'clientWidth', { value: 900, configurable: true });
      const res4 = window.adjustMatrixRowHeightFor7Rows(wrap, 700);
      if (!res4 || res4.rowH !== 86 || res4.exactWrapperH !== 700) return false;
      if (wrap.style.height !== '700px') return false;
      if (wrap.style.getPropertyValue('--matrix-row-height') !== '86px') return false;

      // Reset mock properties
      delete wrap.scrollWidth;
      delete wrap.clientWidth;

      // Test 5: autoResizeContentWindows executes cleanly
      window.autoResizeContentWindows();
      return true;
    }],
    ['compact unified header cards across all 5 tabs', () => {
      const tabs = ['planner', 'timetable', 'calendar', 'roster', 'gradebook'];
      for (const tab of tabs) {
        const sec = g('tab-content-' + tab);
        if (!sec) return false;
        const card = sec.querySelector('.app-tab-header-card');
        if (!card) return false;
        const btns = card.querySelectorAll('button:not(.sidebar-docked-tag):not(.planner-week-nav-btn)');
        for (const b of btns) {
          const label = b.querySelector('.tab-btn-label, .planner-btn-label');
          if (!label || !label.textContent.trim()) return false;
        }
      }

      // Verify Option 2 separation & toolbar parity:
      const rosterCard = g('tab-content-roster').querySelector('.app-tab-header-card');
      const gradebookCard = g('tab-content-gradebook').querySelector('.app-tab-header-card');
      
      // Classroom links removed from headers
      if (rosterCard.querySelector('#roster-classroom-btn-container')) return false;
      if (gradebookCard.querySelector('#gradebook-classroom-btn-container')) return false;

      // Table search and filters are inside .main-table-card toolbar, not in .app-tab-header-card
      if (rosterCard.querySelector('#roster-search')) return false;
      if (gradebookCard.querySelector('#gradebook-grade-filter')) return false;

      const rosterTableCard = g('tab-content-roster').querySelector('.main-table-card');
      if (!rosterTableCard.querySelector('#roster-search')) return false;
      if (!rosterTableCard.querySelector('#roster-grade-filter')) return false;
      if (!rosterTableCard.querySelector('#roster-status-filter')) return false;

      const gradebookTableCard = g('tab-content-gradebook').querySelector('.main-table-card');
      if (!gradebookTableCard.querySelector('#gradebook-search')) return false;
      if (!gradebookTableCard.querySelector('#gradebook-grade-filter')) return false;
      if (!gradebookTableCard.querySelector('#gradebook-status-filter')) return false;

      // Verify section selector is at the right end of the header actions
      const rosterActions = rosterCard.querySelector('div.flex.items-center');
      if (!rosterActions?.lastElementChild?.querySelector('#roster-section-filter')) return false;

      const gradebookActions = gradebookCard.querySelector('div.flex.items-center');
      if (!gradebookActions?.lastElementChild?.querySelector('#gradebook-section-select')) return false;

      // Verify Tab 1 header title and rightmost week selector
      if (g('planner-term-label')?.textContent.trim() !== 'Semester Schedule & Activity Matrix') return false;
      const navLabel = g('current-week-nav-label');
      const navGroup = navLabel?.closest('div.border');
      const plannerControls = navGroup?.parentElement;
      if (!plannerControls || plannerControls.lastElementChild !== navGroup) return false;

      // Verify Gradebook search filtering
      const gbSearch = g('gradebook-search');
      gbSearch.value = 'nonexistent_student_xyz';
      window.renderGradebook();
      const emptyRow = g('gradebook-table-body')?.querySelector('td[colspan]');
      if (!emptyRow) return false;
      gbSearch.value = '';
      window.renderGradebook();

      // Verify Roster status filtering
      const rosterStatus = g('roster-status-filter');
      rosterStatus.value = 'Failed';
      window.filterStudentTable();
      const hiddenPassed = window.document.querySelector('#student-table-body tr[data-status="Passed"]');
      if (hiddenPassed && hiddenPassed.style.display !== 'none') return false;
      rosterStatus.value = 'all';
      window.filterStudentTable();

      return true;
    }],
    ['matrix activity cards and slots have full row height classes, CSS styling, and no colored left border', () => {
      const matrixSlots = window.document.querySelectorAll('#matrix-body td.matrix-cell-slot > div');
      if (matrixSlots.length === 0) return false;
      for (const card of matrixSlots) {
        if (!card.classList.contains('matrix-activity-card')) return false;
        if (card.classList.contains('border-dashed') && !card.classList.contains('matrix-activity-slot-empty')) {
          return false;
        }
        if (card.className.includes('border-l-4')) return false;
      }
      return true;
    }],
    ['gradebook has no # column and new sub-activities default to score 0', () => {
      const secSelect = window.document.getElementById('gradebook-section-select');
      const validSec = Array.from(secSelect?.options || []).map(o => o.value).find(v => window.__probe('studentRoster').some(s => s.section === v));
      if (secSelect && validSec) {
        secSelect.value = validSec;
      }
      window.renderGradebook();
      const headFirst = window.document.querySelector('#gradebook-table-head tr:first-child th:first-child');
      const headSecond = window.document.querySelector('#gradebook-table-head tr:first-child th:nth-child(2)');
      if (!headFirst || headFirst.getAttribute('data-sort') !== 'id') return false;
      if (!headFirst.textContent.includes('Student ID')) return false;
      if (!headSecond || headSecond.getAttribute('data-sort') !== 'name') return false;
      if (!headSecond.textContent.includes('Student Name')) return false;

      const bodyFirstCell = window.document.querySelector('#gradebook-table-body tr td.sticky-grade-col-1');
      if (!bodyFirstCell) return false;
      if (!bodyFirstCell.textContent.includes('-')) return false;

      const footFirstCell = window.document.querySelector('#gradebook-table-foot tr td.sticky-grade-foot-1');
      if (!footFirstCell || !footFirstCell.textContent.includes('AVERAGE')) return false;

      // Test newly added sub-activity defaults to 0
      window.__dummyStudent = { id: 'test_student_999', qz: 95 };
      window.__dummyConfig = {
        categories: [
          {
            id: 'cat_quiz',
            subActivities: [
              { id: 'sub_new_test_activity', maxScore: 50, weight: 50 }
            ]
          }
        ]
      };
      window.__probe('ensureStudentScores(window.__dummyStudent, window.__dummyConfig)');
      if (window.__dummyStudent.scores['sub_new_test_activity'] !== 0) { console.log('DEBUG 8', window.__dummyStudent.scores); return false; }
      const score = window.__probe('getStudentScore(window.__dummyStudent, "sub_new_test_activity", "cat_quiz", 50)');
      if (score !== 0) { console.log('DEBUG 9', score); return false; }
      delete window.__dummyStudent;
      delete window.__dummyConfig;

      return true;
    }],
    ['student roster and gradebook have alternating zebra striping and hover classes', () => {
      window.renderStudentRoster();
      const rosterRows = Array.from(window.document.querySelectorAll('#student-table-body tr'));
      if (rosterRows.length === 0) return false;
      const firstRow = rosterRows[0];
      const secondRow = rosterRows[1];
      if (!firstRow.classList.contains('roster-row-even')) return false;
      if (secondRow && !secondRow.classList.contains('roster-row-odd')) return false;

      // Filter and verify dynamic re-striping
      const rosterSearch = window.document.getElementById('roster-search');
      if (rosterSearch && secondRow) {
        rosterSearch.value = secondRow.getAttribute('data-email') || '';
        window.filterStudentTable();
        const visibleRows = rosterRows.filter(r => r.style.display !== 'none');
        if (visibleRows.length > 0 && !visibleRows[0].classList.contains('roster-row-even')) return false;
        rosterSearch.value = '';
        window.filterStudentTable();
      }

      // Verify Roster columns: Date Added is first column, Email Address column is removed
      const rosterHeaders = Array.from(window.document.querySelectorAll('#roster-table thead th'));
      if (rosterHeaders.length !== 6) return false;
      if (rosterHeaders[0].getAttribute('data-col') !== 'date' || !rosterHeaders[0].textContent.includes('Date Added')) return false;
      if (rosterHeaders[1].getAttribute('data-col') !== 'id' || !rosterHeaders[1].textContent.includes('Student ID')) return false;
      if (rosterHeaders.some(th => th.textContent.includes('Email Address'))) return false;

      // Verify row first cell is Date Added
      const firstRowCells = Array.from(firstRow.children);
      if (firstRowCells.length !== 6) return false;
      if (!firstRowCells[0].textContent.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

      // Verify Email action dropdown with Copy Email and Send Email options
      const emailBtn = firstRow.querySelector('.roster-email-btn');
      if (!emailBtn || emailBtn.getAttribute('data-action') !== 'toggleStudentEmailMenu') return false;
      window.toggleStudentEmailMenu(emailBtn, secondRow.getAttribute('data-email'), 'CVE112 - E15.1', 'Juan', 'Dela Cruz');
      const emailMenu = window.document.getElementById('roster-email-dropdown-menu');
      if (!emailMenu || emailMenu.classList.contains('hidden')) return false;
      const copyBtn = emailMenu.querySelector('[data-action="copyStudentEmail"]');
      const sendBtn = emailMenu.querySelector('[data-action="sendIndividualStudentEmail"]');
      if (!copyBtn || !sendBtn) return false;
      if (!copyBtn.textContent.includes('Copy Email') || !sendBtn.textContent.includes('Send Email')) return false;
      window.closeStudentEmailMenu();
      if (!emailMenu.classList.contains('hidden')) return false;

      // Verify Gradebook alternating classes
      window.renderGradebook();
      const gbRows = Array.from(window.document.querySelectorAll('#gradebook-table-body tr:not([id*="empty"])'));
      if (gbRows.length > 0) {
        if (!gbRows[0].classList.contains('grade-row-even')) return false;
        if (gbRows[1] && !gbRows[1].classList.contains('grade-row-odd')) return false;
      }
      return true;
    }],
    ['class performance widget renders KPIs, standing cohorts, and non-overlapping performer cards', () => {
      window.renderGradebook();
      window.updateGradebookSidebar();
      const statsContent = window.document.getElementById('gradebook-stats-content');
      if (!statsContent || !statsContent.innerHTML.includes('Average') || !statsContent.innerHTML.includes('Median')) return false;
      if (!statsContent.innerHTML.includes('Class Standing')) return false;
      if (!statsContent.innerHTML.includes('Others')) return false;
      const rangeIdx = statsContent.innerHTML.indexOf('Range');
      const standingIdx = statsContent.innerHTML.indexOf('Class Standing');
      if (rangeIdx === -1 || standingIdx === -1 || rangeIdx > standingIdx) return false;
      if (!statsContent.innerHTML.includes('Best') || !statsContent.innerHTML.includes('Worst')) return false;
      if (statsContent.innerHTML.includes('rounded-full bg-indigo-500')) return false;
      if (window.document.getElementById('btn-grade-dist-full')?.textContent.trim() !== 'All') return false;
      const distCont = window.document.getElementById('gradebook-grade-distribution');
      if (!distCont || distCont.children.length === 0) return false;

      // Verify widget titles follow theme selector structure
      const commTitle = window.document.querySelector('#roster-widget-communications .widget-title');
      const perfTitle = window.document.querySelector('#gradebook-widget-stats .widget-title');
      if (!commTitle || !commTitle.textContent.includes('Section Communications')) return false;
      if (!perfTitle || !perfTitle.textContent.includes('Class Performance')) return false;

      // Verify roster breakdown card styling
      window.updateRosterSidebar();
      const rosterBreakdown = window.document.getElementById('roster-sections-breakdown');
      if (rosterBreakdown && rosterBreakdown.children.length > 0) {
        const firstCard = rosterBreakdown.firstElementChild;
        if (!firstCard.classList.contains('dark:bg-[#141d2b]')) return false;
      }

      // Verify timetable weekday pills auto-width grid distribution
      window.updateTimetableSidebar();
      const dayPills = window.document.getElementById('timetable-agenda-day-pills');
      if (!dayPills || dayPills.children.length !== 7) return false;
      if (!dayPills.classList.contains('grid-cols-7')) return false;
      const firstPill = dayPills.firstElementChild;
      if (!firstPill || !firstPill.classList.contains('w-full')) return false;

      // Verify Lost Teaching Days cards have no yellow/amber styling
      window.updateCalendarSidebar();
      const lostDays = window.document.getElementById('calendar-lost-days-list');
      if (lostDays && lostDays.children.length > 0) {
        if (lostDays.innerHTML.includes('bg-amber-50') || lostDays.innerHTML.includes('border-amber-200') || lostDays.innerHTML.includes('text-amber-900')) {
          return false;
        }
      }
      return true;
    }],
    ['gradebook manual status override works reliably with uniform dropdown width and compact header', () => {
      window.renderGradebook();
      const firstSelect = window.document.querySelector('.grade-status-select');
      if (!firstSelect) return false;

      // Verify all required status options are present
      const optionValues = Array.from(firstSelect.options).map(o => o.value);
      if (!optionValues.includes('') || !optionValues.includes('Passed') || !optionValues.includes('Failed') || !optionValues.includes('INC') || !optionValues.includes('WDRW') || !optionValues.includes('DRP')) {
        return false;
      }

      // Verify uniform width class is applied to all status dropdowns
      const allSelects = window.document.querySelectorAll('.grade-status-select');
      for (const sel of allSelects) {
        if (!sel.classList.contains('w-[114px]')) return false;
      }

      // Verify minimized header height & compact classes
      const headTh = window.document.querySelector('#gradebook-table-head tr:first-child th');
      if (!headTh || !headTh.classList.contains('py-1')) return false;

      // Test manually setting status override
      const testStudent = window.__probe('studentRoster')[0];
      if (!testStudent) return false;
      const prevOverride = testStudent.statusOverride || '';

      // Test override to DRP
      window.updateGradeStatusOverride(testStudent.id, 'DRP', testStudent.section);
      if (testStudent.statusOverride !== 'DRP') return false;

      // Test override to Passed
      window.updateGradeStatusOverride(testStudent.id, 'Passed', testStudent.section);
      if (testStudent.statusOverride !== 'Passed') return false;

      // Test override to Failed
      window.updateGradeStatusOverride(testStudent.id, 'Failed', testStudent.section);
      if (testStudent.statusOverride !== 'Failed') return false;

      // Test whitespace/numeric ID tolerance
      window.updateGradeStatusOverride(' ' + testStudent.id + ' ', 'INC', testStudent.section);
      if (testStudent.statusOverride !== 'INC') return false;

      // Restore original state
      window.updateGradeStatusOverride(testStudent.id, prevOverride, testStudent.section);
      return true;
    }],
    ['lesson planner modal action buttons have consistent sizing, corner radius, and iconography', () => {
      if (typeof window.openLessonModal !== 'function') {
        window.openLessonModal = window.__probe('openLessonModal');
        window.closeLessonModal = window.__probe('closeLessonModal');
      }
      const wt = window.__probe('weeklyTimetable') || [];
      const slot = wt[0] || { course: 'CVE111', section: 'B15.1' };
      window.openLessonModal('2026-08-24', slot.course, slot.section, false);

      const modal = window.document.getElementById('lesson-modal');
      if (!modal || modal.classList.contains('hidden')) return false;

      const markBtn = window.document.getElementById('btn-mark-noclass-shift');
      const prevBtn = window.document.getElementById('btn-pullback-schedule');
      const nextBtn = window.document.getElementById('btn-movelast-schedule');
      const clearBtn = modal.querySelector('[data-action="clearLessonModalData"]');
      const cancelBtn = Array.from(modal.querySelectorAll('[data-action="closeLessonModal"]')).find(b => b.textContent.includes('Cancel'));
      const saveBtn = modal.querySelector('[data-action="saveLessonModalData"]');

      if (!markBtn || !prevBtn || !nextBtn || !clearBtn || !cancelBtn || !saveBtn) return false;

      // Verify all buttons have uniform h-9, rounded-xl, and font-bold text-xs
      const btns = [markBtn, prevBtn, nextBtn, clearBtn, cancelBtn, saveBtn];
      for (const btn of btns) {
        if (!btn.classList.contains('h-9')) return false;
        if (!btn.classList.contains('rounded-xl')) return false;
        if (!btn.classList.contains('font-bold') || !btn.classList.contains('text-xs')) return false;
      }

      // Verify destructive buttons share matching rose palette
      if (!markBtn.classList.contains('bg-rose-50') || !clearBtn.classList.contains('bg-rose-50')) return false;
      if (!markBtn.classList.contains('text-rose-700') || !clearBtn.classList.contains('text-rose-700')) return false;

      // Verify secondary buttons share matching slate palette
      if (!prevBtn.classList.contains('bg-slate-100') || !nextBtn.classList.contains('bg-slate-100') || !cancelBtn.classList.contains('bg-slate-100')) return false;

      // Verify SVG icons
      if (!markBtn.querySelector('svg') || !prevBtn.querySelector('svg') || !nextBtn.querySelector('svg') || !clearBtn.querySelector('svg') || !saveBtn.querySelector('svg')) {
        return false;
      }

      window.closeLessonModal();
      return true;
    }],
    ['tab header buttons hover fill color matches the header card in both light and dark mode', () => {
      const css = fs.readFileSync(path.join(ROOT, 'css/10-components.css'), 'utf8');

      // Verify light mode hover fill color matches header card (#ffffff)
      const lightTabBtnOk = css.includes('.tab-header-btn:hover:not(:disabled)') &&
        css.includes('background-color: var(--white, #ffffff) !important;');
      if (!lightTabBtnOk) return false;

      // Verify dark mode hover fill color matches dark header card (#0f172a)
      const darkTabBtnOk = css.includes('html.theme-dark .tab-header-btn:hover:not(:disabled)') &&
        css.includes('background-color: #0f172a !important;');
      if (!darkTabBtnOk) return false;

      // Verify planner action button hover fill matches header card
      const plannerBtnOk = css.includes('.planner-action-btn:hover:not(:disabled)') &&
        css.includes('html.theme-dark .planner-action-btn:hover:not(:disabled)');
      if (!plannerBtnOk) return false;

      // Verify no remaining color-mix on tab header button hover rules
      if (css.match(/\.tab-header-btn:hover:not\(:disabled\)[^}]*color-mix/)) return false;
      if (css.match(/html\.theme-dark \.tab-header-btn:hover:not\(:disabled\)[^}]*rgba\(218,\s*165,\s*32/)) return false;

      return true;
    }],
    ['copy and paste matrix activity inherits target section start time, end time, and room', () => {
      return window.__probe(`(() => {
        const testDate = '2026-08-18';
        const srcCourse = 'CVE111';
        const srcSection = 'B15.1';
        const dstCourse = 'CVE112';
        const dstSection = 'E15.1';

        // Prepare destination slot with a distinct schedule
        let dstSlot = weeklyTimetable.find(t => t.course === dstCourse && t.section === dstSection);
        if (!dstSlot) {
          dstSlot = { course: dstCourse, section: dstSection, day: 'Tuesday', startTime: '14:00', endTime: '15:30', room: 'Lab 404' };
          weeklyTimetable.push(dstSlot);
        } else {
          dstSlot.startTime = '14:00';
          dstSlot.endTime = '15:30';
          dstSlot.room = 'Lab 404';
        }

        const srcKey = testDate + '__' + srcCourse + '__' + srcSection;
        const dstKey = testDate + '__' + dstCourse + '__' + dstSection;

        plannerEntries[srcKey] = {
          topic: 'Structural Mechanics',
          activity: 'Slide Deck & Computation',
          type: 'Lecture',
          status: 'Planned',
          notes: 'Bring engineering paper',
          startTime: '07:30',
          endTime: '09:00',
          room: 'Eng 101'
        };

        // Copy source activity
        copyMatrixActivity(testDate, srcCourse, srcSection);

        // Verify clipboard stripped original time and room
        if (activityClipboard.startTime || activityClipboard.endTime || activityClipboard.room) {
          return false;
        }
        if (activityClipboard.topic !== 'Structural Mechanics') {
          return false;
        }

        // Paste into destination section
        pasteMatrixActivity(testDate, dstCourse, dstSection);

        const pasted = plannerEntries[dstKey];
        if (!pasted) return false;

        // Verify activity details preserved
        if (pasted.topic !== 'Structural Mechanics') return false;
        if (pasted.activity !== 'Slide Deck & Computation') return false;
        if (pasted.notes !== 'Bring engineering paper') return false;

        // Verify original time and room were NOT copied
        if (pasted.startTime === '07:30' || pasted.endTime === '09:00' || pasted.room === 'Eng 101') {
          return false;
        }

        // Verify destination section's time and room were inherited
        if (pasted.startTime !== '14:00' || pasted.endTime !== '15:30' || pasted.room !== 'Lab 404') {
          return false;
        }

        // Clean up
        delete plannerEntries[srcKey];
        delete plannerEntries[dstKey];
        activityClipboard = null;
        return true;
      })()`);
    }],
    ['gradebook default sort is student name A-Z and automatically updates when new students are enrolled', () => {
      return window.__probe(`(() => {
        // 1. Initial default state
        if (gradebookSortState.col !== 'name' || gradebookSortState.direction !== 'asc') return false;

        // 2. Render gradebook for active section
        const secSelect = document.getElementById('gradebook-section-select');
        const targetSec = secSelect ? secSelect.value : (courseData.subjects[0]?.code + ' - ' + courseData.subjects[0]?.sections[0]);
        renderGradebook();

        // Check header indicator for Student Name
        const nameHead = document.querySelector('th[data-sort="name"]');
        if (!nameHead || !nameHead.textContent.includes('▲')) return false;

        // Check rendered order of student rows
        const getRowNames = () => Array.from(document.querySelectorAll('#gradebook-table-body tr')).map(tr => {
          const nameCell = tr.querySelector('.sticky-grade-col-2');
          return nameCell ? nameCell.textContent.trim().toLowerCase() : '';
        }).filter(Boolean);

        let names = getRowNames();
        if (names.length < 2) return false;
        for (let i = 0; i < names.length - 1; i++) {
          if (names[i].localeCompare(names[i + 1]) > 0) return false;
        }

        // 3. Add a student late with an alphabetically early name (e.g. "Abad, Alan")
        const testStudentId = '2020-0001';
        studentRoster.push({
          id: testStudentId,
          last: 'Abad',
          first: 'Alan',
          email: 'alan.abad@university.edu',
          section: targetSec,
          dateAdded: '2026-09-25',
          qz: 85, lab: 85, p1: 85, p2: 85, fin: 85
        });

        // Re-render gradebook (simulating Render.views('enrollment'))
        renderGradebook();

        // Verify "Abad, Alan" is at the very TOP of the table, not at the bottom
        names = getRowNames();
        if (!names[0].includes('abad')) return false;

        // Check full alphabetical order
        for (let i = 0; i < names.length - 1; i++) {
          if (names[i].localeCompare(names[i + 1]) > 0) return false;
        }

        // Clean up test student
        studentRoster = studentRoster.filter(s => s.id !== testStudentId);
        renderGradebook();
        return true;
      })()`);
    }],
    ['student roster default sort is last name A-Z and automatically updates when new students are enrolled', () => {
      return window.__probe(`(() => {
        // 1. Initial default state
        if (rosterSortState.col !== 'name' || rosterSortState.direction !== 'asc') return false;

        // 2. Render student roster
        renderStudentRoster();

        // Check header indicator for Last Name
        const nameSortEl = document.getElementById('roster-sort-name');
        if (!nameSortEl || !nameSortEl.textContent.includes('▲')) return false;

        // Check other indicators
        const idSortEl = document.getElementById('roster-sort-id');
        if (!idSortEl || !idSortEl.textContent.includes('⇅')) return false;

        // Check rendered order of student roster rows
        const getRowLastNames = () => Array.from(document.querySelectorAll('#student-table-body tr')).map(tr => {
          const cells = tr.querySelectorAll('td');
          return cells[2] ? cells[2].textContent.trim().toLowerCase() : '';
        }).filter(Boolean);

        let lastNames = getRowLastNames();
        if (lastNames.length < 2) return false;
        for (let i = 0; i < lastNames.length - 1; i++) {
          if (lastNames[i].localeCompare(lastNames[i + 1]) > 0) return false;
        }

        // 3. Add a student late with an alphabetically earlier last name (e.g. "Abad, Alan")
        const targetSec = document.getElementById('roster-section-filter')?.value || (courseData.subjects[0]?.code + ' - ' + courseData.subjects[0]?.sections[0]);
        const testStudentId = '2020-0002';
        studentRoster.push({
          id: testStudentId,
          last: 'Abad',
          first: 'Alan',
          email: 'alan.abad@university.edu',
          section: targetSec,
          dateAdded: '2026-09-25',
          qz: 85, lab: 85, p1: 85, p2: 85, fin: 85
        });

        // Re-render roster (simulating saveSingleStudent / commitBulkImport)
        sortStudentRosterByName();
        renderStudentRoster();

        // Verify "Abad" is at the very TOP of the table, not at the bottom
        lastNames = getRowLastNames();
        if (lastNames[0] !== 'abad') return false;

        // Verify 3-state cycling for Last Name
        toggleRosterSort('name'); // should become desc (Z-A)
        if (rosterSortState.col !== 'name' || rosterSortState.direction !== 'desc') return false;
        if (!nameSortEl.textContent.includes('▼')) return false;

        toggleRosterSort('name'); // 2nd click resets to default A-Z
        if (rosterSortState.col !== 'name' || rosterSortState.direction !== 'asc') return false;
        if (!nameSortEl.textContent.includes('▲')) return false;

        // Clean up test student
        studentRoster = studentRoster.filter(s => s.id !== testStudentId);
        renderStudentRoster();
        return true;
      })()`);
    }],
    ['planner calendar monthly view renders 7-day columns and 1-month grid', () => {
      return window.__probe(`(() => {
        // Ensure monthly view is rendered
        setPlannerViewMode('month');
        renderPlannerMonthCalendar();

        const calContainer = document.getElementById('planner-calendar-view-container');
        if (!calContainer) return false;

        // Verify 7-day column headers
        const headerDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        for (const h of headerDays) {
          if (!calContainer.textContent.includes(h)) return false;
        }

        // Verify day cells rendered (at least 28 cells)
        const cells = calContainer.querySelectorAll('.planner-calendar-cell');
        if (cells.length < 28) return false;

        // Verify day cells contain date keys
        const firstCell = cells[0];
        if (!firstCell.getAttribute('data-date')) return false;

        return true;
      })()`);
    }],
    ['view switcher toggles seamlessly between Monthly View and Weekly View', () => {
      return window.__probe(`(() => {
        const calContainer = document.getElementById('planner-calendar-view-container');
        const matrixContainer = document.getElementById('planner-matrix-view-container');
        const monthNav = document.getElementById('planner-month-nav-container');
        const weekNav = document.getElementById('planner-week-nav-container');
        const btnMonth = document.getElementById('btn-planner-view-month');
        const btnWeek = document.getElementById('btn-planner-view-week');

        // 1. Switch to Weekly View
        setPlannerViewMode('week');
        if (plannerViewMode !== 'week') return false;
        if (!calContainer.classList.contains('hidden')) return false;
        if (matrixContainer.classList.contains('hidden')) return false;
        if (!monthNav.classList.contains('hidden')) return false;
        if (weekNav.classList.contains('hidden')) return false;
        if (!btnWeek.classList.contains('font-bold')) return false;

        // 2. Switch back to Monthly View
        setPlannerViewMode('month');
        if (plannerViewMode !== 'month') return false;
        if (calContainer.classList.contains('hidden')) return false;
        if (!matrixContainer.classList.contains('hidden')) return false;
        if (monthNav.classList.contains('hidden')) return false;
        if (!weekNav.classList.contains('hidden')) return false;
        if (!btnMonth.classList.contains('font-bold')) return false;

        return true;
      })()`);
    }],
    ['planner month navigator advances and rewinds active month', () => {
      return window.__probe(`(() => {
        initPlannerMonthControls();
        const initialMonth = currentPlannerMonth;
        const select = document.getElementById('planner-month-select');
        if (!select || select.options.length < 2) return false;

        // Advance 1 month
        navigatePlannerMonth(1);
        if (currentPlannerMonth === initialMonth && select.options.length > 1) return false;
        if (select.value !== currentPlannerMonth) return false;

        // Rewind back
        navigatePlannerMonth(-1);
        if (currentPlannerMonth !== initialMonth) return false;
        if (select.value !== initialMonth) return false;

        return true;
      })()`);
    }],
    ['planner section filter filters displayed classes in monthly view', () => {
      return window.__probe(`(() => {
        initPlannerMonthControls();
        renderPlannerMonthCalendar();

        const filterSelect = document.getElementById('planner-section-filter');
        if (!filterSelect || filterSelect.options.length < 2) return false;

        // Select specific section
        const targetSection = filterSelect.options[1].value;
        onPlannerSectionFilterChange(null, { value: targetSection });
        if (plannerSectionFilter !== targetSection) return false;

        // Verify only pills for targetSection appear
        const targetParts = targetSection.split(' - ');
        const targetCourse = targetParts[0];
        const targetSec = targetParts[1];
        const pills = document.querySelectorAll('#planner-calendar-view-container .planner-class-pill');
        for (const p of pills) {
          if (p.getAttribute('data-course') !== targetCourse || p.getAttribute('data-section') !== targetSec) {
            return false;
          }
        }

        // Reset filter
        onPlannerSectionFilterChange(null, { value: 'all' });
        if (plannerSectionFilter !== 'all') return false;

        return true;
      })()`);
    }],
    ['planner day inspector modal opens with full class schedule and action buttons', () => {
      return window.__probe(`(() => {
        const modal = document.getElementById('planner-day-inspector-modal');
        if (!modal) return false;

        // Open inspector for a known class date
        const testDate = '2026-08-18';
        openPlannerDayInspector(testDate);
        if (modal.classList.contains('hidden')) return false;
        if (activeDayInspectorDate !== testDate) return false;

        // Check header title
        const titleEl = document.getElementById('day-inspector-title');
        if (!titleEl || !titleEl.textContent.includes('2026')) return false;

        // Check class cards and action buttons
        const listEl = document.getElementById('day-inspector-classes-list');
        if (!listEl) return false;
        const copyBtns = listEl.querySelectorAll('[data-action="copyMatrixActivity"]');
        const pasteBtns = listEl.querySelectorAll('[data-action="pasteMatrixActivity"]');
        const editBtns = listEl.querySelectorAll('[data-action="openLessonModal"]');

        if (copyBtns.length === 0 || pasteBtns.length === 0 || editBtns.length === 0) return false;

        // Close inspector
        closePlannerDayInspector();
        if (!modal.classList.contains('hidden')) return false;
        if (activeDayInspectorDate !== null) return false;

        return true;
      })()`);
    }]
  ];

  let pass = 0;
  for (const [name, fn] of checks) {
    let ok = false;
    try { ok = !!fn(); } catch (e) { ok = false; }
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (ok) pass++;
  }

    console.log(`\n${pass}/${checks.length} smoke checks passed`);
  if (errors.length) {
    console.log(`\n${errors.length} console error(s):`);
    [...new Set(errors)].slice(0, 15).forEach(e => console.log('   ', e.slice(0, 200)));
  } else {
    console.log('no console errors during startup');
  }
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    [...new Set(warnings)].slice(0, 10).forEach(w => console.log('   ', w.slice(0, 200)));
  }
  console.log('');
  // the radar checks above are SYNC validations; the jump itself runs on
  // requestAnimationFrame, so give it a macrotask before the final verdict.
  setTimeout(() => {
    const wrap = g('matrix-scroll-wrapper');
    if (!wrap) { console.log('  FAIL  radar jump completes on rAF (no matrix wrapper)'); process.exit(1); }
    const calls = [];
    const orig = wrap.scrollTo.bind(wrap);
    wrap.scrollTo = (opts) => { calls.push(opts || {}); return orig(opts); };
    const row = window.document.querySelector('#matrix-body tr[id^="row-"]');
    if (!row) { console.log('  FAIL  radar jump completes on rAF (no matrix row)'); process.exit(1); }
    const dateKey = row.id.replace(/^row-/, '');
    const errBefore = errors.length;
    window.jumpToMatrixDate(dateKey);
    // jumpToMatrixDate defers to a double rAF; settle one macrotask later
    setTimeout(() => {
      wrap.scrollTo = orig;
      const ok = errors.length === errBefore &&
        calls.some((c) => (typeof c.top === 'number' && c.top > 0) ||
                          (typeof c.left === 'number' && c.left > 0));
      console.log(`  ${ok ? 'PASS' : 'FAIL'}  radar jump completes on rAF and moves the viewport`);
      if (!ok) {
        console.log('      scrollTo calls seen:', JSON.stringify(calls).slice(0, 300));
      }
      const total = pass + (ok ? 1 : 0);
      console.log(`\n${total}/${checks.length + 1} smoke checks passed`);
      process.exit(errors.length ? 1 : (ok ? 0 : 1));
    }, 250);
  }, 500);
});
