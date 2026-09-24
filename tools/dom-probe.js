/*
 * DOM-level audit: boots the app in jsdom and inspects the RENDERED document.
 *
 * tools/audit.js only reads source text, so it cannot see markup that is built
 * at runtime (data-action="${...}", onclick="${jsAttr(...)}"). This probe
 * renders every main view and then checks the live DOM for:
 *
 *   1. duplicate element IDs          - getElementById() silently returns the first
 *   2. elements with BOTH an inline onclick and a matching data-action
 *                                     - the delegated listener in src/core/events.js
 *                                       fires the same handler a second time
 *   3. dead controls                  - a data-action that is in neither the
 *                                       ActionRegistry nor window.<name>, i.e. it
 *                                       can only ever console.warn when clicked
 *
 * Usage:  node tools/dom-probe.js
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const order = [...indexHtml.matchAll(/<script src="(src\/[^"]+)"><\/script>/g)].map((m) => m[1]);

let html = indexHtml
  .replace(/<script src="(tailwind|pdf)[^"]*"><\/script>/g, '')
  .replace(/<script src="src\/[^"]*"><\/script>/g, '')
  .replace(/<script>[\s\S]*?tailwind\.config[\s\S]*?<\/script>/, '');

const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/' });
const { window } = dom;
window.tailwind = { config: {} };
window.pdfjsLib = { GlobalWorkerOptions: {}, getDocument: () => ({ promise: Promise.resolve() }) };
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
const noise = [];
window.console = Object.assign({}, console, { log: () => {}, error: (...a) => noise.push(a.join(' ')), warn: (...a) => noise.push(a.join(' ')) });

for (const mod of order) {
  const el = window.document.createElement('script');
  el.textContent = fs.readFileSync(path.join(ROOT, mod), 'utf8');
  window.document.body.appendChild(el);
}

// jsdom does not implement Element.scrollTo / scrollIntoView. The app calls them
// from rAF callbacks, which would otherwise surface as an uncaught TypeError and
// make the probe's own noise indistinguishable from real failures. Patch them
// with no-ops and report the fact.
const patched = { scrollTo: 0, scrollIntoView: 0 };
window.Element.prototype.scrollTo = function () { patched.scrollTo++; };
window.Element.prototype.scrollIntoView = function () { patched.scrollIntoView++; };
if (!window.Element.prototype.scrollBy) window.Element.prototype.scrollBy = function () {};

// Which actions are handled? The ActionRegistry lives inside an IIFE, so read the
// literal keys out of events.js (same list tools/audit.js uses).
const eventsSrc = fs.readFileSync(path.join(ROOT, 'src/core/events.js'), 'utf8');
const registered = new Set([...eventsSrc.matchAll(/^\s{4}([A-Za-z_$][\w$]*):\s*(?:\(|async)/gm)].map((m) => m[1]));

const VIEW_IDS = ['matrix', 'timetable', 'calendar', 'roster', 'gradebook', 'progress', 'plannerSidebar', 'timetableSidebar', 'calendarSidebar', 'rosterSidebar', 'gradebookSidebar'];

setTimeout(() => {
  try { window.Render.only(VIEW_IDS); } catch (e) { console.log('render failed:', e.message); }
  const doc = window.document;
  const all = [...doc.querySelectorAll('*')];

  // ---- 1. duplicate IDs -----------------------------------------------------
  const idCount = new Map();
  all.forEach((el) => {
    if (!el.id) return;
    idCount.set(el.id, (idCount.get(el.id) || 0) + 1);
  });
  const dupIds = [...idCount].filter(([, n]) => n > 1);

  // ---- 2. inline onclick + matching data-action -----------------------------
  const doubleFire = new Map();
  all.forEach((el) => {
    const onclick = el.getAttribute('onclick');
    const action = el.getAttribute('data-action');
    if (!onclick || !action) return;
    if (new RegExp(`\\b${action}\\s*\\(`).test(onclick)) {
      doubleFire.set(action, (doubleFire.get(action) || 0) + 1);
    }
  });

  // ---- 3. dead controls -----------------------------------------------------
  const dead = new Map();
  all.forEach((el) => {
    for (const attr of el.getAttributeNames()) {
      if (!attr.startsWith('data-action')) continue;
      const action = el.getAttribute(attr);
      if (!action || registered.has(action)) continue;
      if (typeof window[action] === 'function') continue;
      if (!dead.has(action)) dead.set(action, `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`);
    }
  });

  const line = (n) => `  ${n.padEnd(38)}`;
  console.log('=== rendered DOM probe ===');
  console.log(line('elements in document') + all.length);
  console.log(line('elements with data-action') + all.filter((e) => e.hasAttribute('data-action')).length);
  console.log(line('jsdom scroll stubs called') + `scrollTo=${patched.scrollTo} scrollIntoView=${patched.scrollIntoView}`);

  console.log('\n--- duplicate IDs in rendered DOM (' + dupIds.length + ') ---');
  dupIds.slice(0, 25).forEach(([id, n]) => console.log(`    #${id} x${n}`));

  console.log('\n--- inline onclick + matching data-action (' + doubleFire.size + ') ---');
  [...doubleFire].sort((a, b) => b[1] - a[1]).forEach(([a, n]) => console.log(`    ${a}  x${n} element(s)`));

  console.log('\n--- dead data-action controls (' + dead.size + ') ---');
  [...dead].forEach(([a, where]) => console.log(`    ${a}  <- ${where}`));

  if (noise.length) {
    console.log('\n--- console noise (' + noise.length + ') ---');
    [...new Set(noise)].slice(0, 12).forEach((n) => console.log('    ' + n.slice(0, 160)));
  } else {
    console.log('\nno console errors/warnings during boot+render');
  }
  process.exit(0);
}, 900);
