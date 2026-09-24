/* ===========================================================================
 * VIEWPORT LAYOUT
 * ---------------------------------------------------------------------------
 * Synchronised top/bottom horizontal scrollbars, auto-fit content panels and
 * the manual window resizers.
 * ======================================================================== */

function setupDualScrollbar(topWrapperId, bottomWrapperId, trackId) {
  const topEl = document.getElementById(topWrapperId);
  const bottomEl = document.getElementById(bottomWrapperId);
  const trackEl = document.getElementById(trackId);
  if (!topEl || !bottomEl || !trackEl) return;

  function syncTrackWidth() {
const scrollW = bottomEl.scrollWidth;
const clientW = bottomEl.clientWidth;
if (clientW === 0) return; // Tab is hidden

const maxScroll = Math.max(0, scrollW - clientW);
const topClientW = topEl.clientWidth || clientW;
trackEl.style.width = (topClientW + maxScroll) + "px";
topEl.style.display = maxScroll > 2 ? "block" : "none";
topEl.scrollLeft = bottomEl.scrollLeft;
  }

  let activeScroller = null;
  topEl.addEventListener("scroll", () => {
if (activeScroller === "bottom") return;
activeScroller = "top";
bottomEl.scrollLeft = topEl.scrollLeft;
requestAnimationFrame(() => { if (activeScroller === "top") activeScroller = null; });
  }, { passive: true });

  bottomEl.addEventListener("scroll", () => {
if (activeScroller === "top") return;
activeScroller = "bottom";
topEl.scrollLeft = bottomEl.scrollLeft;
requestAnimationFrame(() => { if (activeScroller === "bottom") activeScroller = null; });
  }, { passive: true });

  if (window.ResizeObserver) {
const ro = new ResizeObserver(() => syncTrackWidth());
ro.observe(bottomEl);
if (bottomEl.firstElementChild) ro.observe(bottomEl.firstElementChild);
  }
  window.addEventListener("resize", syncTrackWidth);
  requestAnimationFrame(() => requestAnimationFrame(syncTrackWidth));
}

function initAllDualScrollbars() {
  setupDualScrollbar("matrix-top-scroll-wrapper", "matrix-scroll-wrapper", "matrix-top-scroll-track");
  setupDualScrollbar("gradebook-top-scroll-wrapper", "gradebook-scroll-wrapper", "gradebook-top-scroll-track");
  
  const rosterTable = document.getElementById("table-roster") || document.getElementById("roster-table");
  if (rosterTable && rosterTable.parentElement) {
const parent = rosterTable.parentElement;
if (!parent.id) parent.id = "roster-scroll-wrapper";
setupDualScrollbar("roster-top-scroll-wrapper", parent.id, "roster-top-scroll-track");
  } else if (document.getElementById("roster-scroll-wrapper")) {
setupDualScrollbar("roster-top-scroll-wrapper", "roster-scroll-wrapper", "roster-top-scroll-track");
  }
}

function prevGuideStep() {
  if (typeof navigateGuideStep === 'function') navigateGuideStep(-1);
}

function nextGuideStep() {
  if (typeof navigateGuideStep === 'function') navigateGuideStep(1);
}


const MAIN_WINDOW_CONFIGS = [
  { wrapperId: 'matrix-scroll-wrapper', tabId: 'planner' },
  { wrapperId: 'timetable-scroll-wrapper', tabId: 'timetable' },
  { wrapperId: 'calendar-scroll-wrapper', tabId: 'calendar' },
  { wrapperId: 'roster-scroll-wrapper', tabId: 'roster' },
  { wrapperId: 'gradebook-scroll-wrapper', tabId: 'gradebook' }
];

function adjustMatrixRowHeightFor7Rows(wrapperEl, explicitWrapperH) {
  const el = wrapperEl || document.getElementById('matrix-scroll-wrapper');
  if (!el) return null;

  const thead = el.querySelector('thead') || document.getElementById('matrix-head');
  const theadH = (thead && typeof thead.offsetHeight === 'number' && thead.offsetHeight > 0)
    ? thead.offsetHeight
    : 86;

  // Detect horizontal scrollbar height (calibrated to 12px for WebKit/Blink scrollbars)
  const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
  let scrollbarH = 0;
  if (el.offsetHeight > 0 && el.clientHeight > 0) {
    scrollbarH = Math.max(0, el.offsetHeight - el.clientHeight);
  } else if (hasHorizontalScroll) {
    scrollbarH = 12;
  }

  // Determine available container height
  let containerH = 0;
  if (typeof explicitWrapperH === 'number' && explicitWrapperH > 0) {
    containerH = explicitWrapperH;
  } else if (el.offsetHeight > 0) {
    containerH = el.offsetHeight;
  }

  // Headless / JSDOM fallback
  if (containerH <= 0) {
    const defaultRowH = 60;
    el.style.setProperty('--matrix-row-height', defaultRowH + 'px');
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style.setProperty('--matrix-row-height', defaultRowH + 'px');
    }
    return { rowH: defaultRowH, exactWrapperH: theadH + (defaultRowH * 7) + scrollbarH };
  }

  // Available vertical space for the 7 rows
  const availableForRows = Math.max(0, containerH - theadH - scrollbarH);
  // Exactly 7 rows per week
  const rowH = Math.max(48, Math.floor(availableForRows / 7));

  // Maintain relative scroll position if row height changed
  const oldRowH = parseFloat(el.style.getPropertyValue('--matrix-row-height')) || 0;
  if (oldRowH > 0 && oldRowH !== rowH && el.scrollTop > 0) {
    const scrollRatio = el.scrollTop / oldRowH;
    el.scrollTop = Math.round(scrollRatio * rowH);
  }

  // Set CSS custom property on wrapper and root
  el.style.setProperty('--matrix-row-height', rowH + 'px');
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.style.setProperty('--matrix-row-height', rowH + 'px');
  }

  // Calibrate wrapper height so 7 rows fill the viewport with zero fractional cutoff
  const exactWrapperH = theadH + (rowH * 7) + scrollbarH;
  el.style.height = exactWrapperH + 'px';
  el.style.maxHeight = 'none';

  return { rowH, exactWrapperH };
}

function autoResizeContentWindows() {
  MAIN_WINDOW_CONFIGS.forEach(({ wrapperId, tabId }) => {
    const el = document.getElementById(wrapperId);
    if (!el) return;

    // Check if user set a manual height override for this tab
    // (Planner matrix dynamically calculates 7 rows to fit the window on resize)
    const savedH = (tabId !== 'planner')
      ? (localStorage.getItem('faculty_main_win_h_' + tabId) || localStorage.getItem('msu_main_win_h_' + tabId))
      : null;
    if (savedH) {
      const numH = parseInt(savedH, 10);
      if (!isNaN(numH) && numH >= 240) {
        el.style.height = numH + 'px';
        el.style.maxHeight = 'none';
        return;
      }
    }

    // Only compute viewport-fit if the tab is currently visible
    const tabSection = document.getElementById('tab-content-' + tabId);
    if (tabSection && tabSection.classList.contains('hidden')) {
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top > 0) {
      // 36px breathing room for bottom margin, 14px resizer bar, and page padding
      const bottomBuffer = 36;
      const targetH = Math.max(280, Math.floor(window.innerHeight - rect.top - bottomBuffer));
      if (wrapperId === 'matrix-scroll-wrapper') {
        adjustMatrixRowHeightFor7Rows(el, targetH);
      } else {
        el.style.height = targetH + 'px';
        el.style.maxHeight = 'none';
      }
    } else if (wrapperId === 'matrix-scroll-wrapper') {
      adjustMatrixRowHeightFor7Rows(el);
    }
  });

  if (typeof initAllDualScrollbars === 'function') {
    initAllDualScrollbars();
  }
}

function initMainWindowResizers() {
  const resizers = document.querySelectorAll('.main-table-bottom-resizer');
  resizers.forEach(resizer => {
    if (resizer._initialized) return;
    resizer._initialized = true;

    const targetId = resizer.getAttribute('data-target');
    const tabId = resizer.getAttribute('data-tab') || 'planner';
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    // Apply saved custom height on initialization if present
    const savedH = localStorage.getItem('faculty_main_win_h_' + tabId) || localStorage.getItem('msu_main_win_h_' + tabId);
    if (savedH) {
      const numH = parseInt(savedH, 10);
      if (!isNaN(numH) && numH >= 240) {
        targetEl.style.height = numH + 'px';
        targetEl.style.maxHeight = 'none';
        if (targetId === 'matrix-scroll-wrapper') {
          adjustMatrixRowHeightFor7Rows(targetEl, numH);
        }
      }
    }

    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const startY = e.clientY;
      const startH = targetEl.getBoundingClientRect().height;
      const minH = 240;
      const maxH = Math.max(minH, Math.floor(window.innerHeight * 0.94));

      try {
        resizer.setPointerCapture(e.pointerId);
      } catch (err) {}

      document.body.classList.add('resizing-main-window-active');
      resizer.parentElement?.classList.add('main-window-resizing');

      let targetH = startH;
      let rafId = null;

      const applyHeight = () => {
        rafId = null;
        targetEl.style.height = targetH + 'px';
        targetEl.style.maxHeight = 'none';
        if (targetId === 'matrix-scroll-wrapper') {
          adjustMatrixRowHeightFor7Rows(targetEl, targetH);
        }
        if (typeof initAllDualScrollbars === 'function') {
          initAllDualScrollbars();
        }
      };

      const onPointerMove = (moveEv) => {
        const deltaY = moveEv.clientY - startY;
        targetH = Math.min(maxH, Math.max(minH, Math.round(startH + deltaY)));
        if (!rafId) {
          rafId = requestAnimationFrame(applyHeight);
        }
      };

      const onPointerUp = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          applyHeight();
        }
        try {
          if (resizer.hasPointerCapture(e.pointerId)) {
            resizer.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        resizer.removeEventListener('lostpointercapture', onPointerUp);

        document.body.classList.remove('resizing-main-window-active');
        resizer.parentElement?.classList.remove('main-window-resizing');

        if (targetEl.style.height) {
          localStorage.setItem('faculty_main_win_h_' + tabId, parseInt(targetEl.style.height, 10));
        }
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      resizer.addEventListener('lostpointercapture', onPointerUp);
    });

    // Double-click resets to automatic responsive viewport-fit
    resizer.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      localStorage.removeItem('faculty_main_win_h_' + tabId);
      localStorage.removeItem('msu_main_win_h_' + tabId);
      targetEl.style.height = '';
      autoResizeContentWindows();
      if (typeof showToast === 'function') {
        showToast('Reset window to auto-fit viewport height.', '✓');
      }
    });
  });
}

// Reset activity list scroll to top on render to avoid chopped cards
function fixNextActivitiesScroll() {
  const list = document.getElementById("planner-milestones-list") || document.getElementById("next-activities-list") || document.querySelector(".next-activities-scroll-area");
  if (list) {
    list.scrollTop = 0;
  }
}

if (typeof window !== 'undefined') {
  window.adjustMatrixRowHeightFor7Rows = adjustMatrixRowHeightFor7Rows;
}
