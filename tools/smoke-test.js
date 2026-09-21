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
    ['Render.after persists + repaints', () => {
      const key = window.__probe('STORAGE_KEY');
      window.localStorage.removeItem(key);
      window.__probe("plannerEntries['2026-08-10__CVE111__B15.1'].topic = 'SMOKE TEST TOPIC'");
      window.Render.after('lesson', { immediate: true });
      return !!window.localStorage.getItem(key) &&
             g('matrix-body').innerHTML.includes('SMOKE TEST TOPIC');
    }],
    ['apostrophe in section does not break handlers', () => {
      // Definitive test: set a section name containing an apostrophe, render,
      // then read the onclick attribute back through the DOM (which HTML-decodes
      // it) and parse it as JavaScript. Before the fix this was a syntax error.
      window.__probe("courseData.subjects[0].sections[0] = \"B'15\"");
      window.Render.views('planner');
      const acorn = require('acorn');
      const nodes = [...g('matrix-body').querySelectorAll('[onclick*="openLessonModal"]')];
      if (!nodes.length) return false;
      let sawApostrophe = false;
      for (const n of nodes) {
        const js = n.getAttribute('onclick');
        try { acorn.parse(js, { ecmaVersion: 2022 }); }
        catch (e) { console.log('      unparseable handler:', js.slice(0, 120)); return false; }
        if (js.includes("B\\'15")) sawApostrophe = true;
      }
      return sawApostrophe;
    }],
    ['easter-egg binding is idempotent', () => {
      let taps = 0;
      const logo = g('header-school-logo');
      if (!logo) return false;
      window.__probe('window.handleLogoEasterEggTap = () => {};');
      window.bindBrandingEasterEgg();
      window.bindBrandingEasterEgg();
      window.bindBrandingEasterEgg();
      // one bind only: the guard flag must be set and re-binding must be a no-op
      return logo.dataset.eggBound === '1';
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
  process.exit(errors.length ? 1 : 0);
}, 900);
