/*
 * Static audit: cross-file integration problems that a "does it load?" smoke
 * test cannot see, because it only ever runs inside one module's file.
 *
 *  1. index.html script order vs the MODULES list in sw.js
 *     (drift means the offline install serves a stale or missing module)
 *  2. duplicate top-level declarations across modules
 *     (classic <script> tags share one global lexical scope, so a second
 *      `function foo(){}` silently overwrites the first)
 *  3. data-action values in markup/templates that resolve to no handler at all
 *     (dispatchAction() checks the ActionRegistry, then window[action])
 *  4. ActionRegistry handlers that delegate to a window.<fn> that no module
 *     ever defines
 *  5. elements carrying BOTH an inline onclick and a matching data-action,
 *     which therefore run their handler twice per click
 *  6. `node tools/audit.js 238` -> which modules have code at that line, for
 *     resolving a stack frame reported as http://localhost/:238
 *
 * Exit code is 1 when any problem is found, so it can gate a commit.
 * Usage:  node tools/audit.js [line ...] [--unused]
 */
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const ROOT = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const problems = [];
const notes = [];

/* ---------- module list: index.html is the source of truth ---------- */
const html = read('index.html');
const htmlModules = [...html.matchAll(/<script src="(src\/[^"]+)"><\/script>/g)].map((m) => m[1]);

const sw = read('sw.js');
const swBlock = sw.match(/const MODULES = \[([\s\S]*?)\];/);
const swModules = swBlock
  ? [...swBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1].replace(/^\.\//, ''))
  : [];

/* ---------- every line of every module, for scope-level scans ---------- */
const files = ['<html>', ...htmlModules];
const allLines = [];
for (const f of files) {
  const text = f === '<html>' ? html : read(f);
  text.split(/\r?\n/).forEach((line, i) => allLines.push({ file: f, line: i + 1, text: line }));
}

/* ---------- 1. module list drift ---------- */
if (htmlModules.length !== swModules.length || htmlModules.some((m, i) => m !== swModules[i])) {
  problems.push(
    'sw.js MODULES does not match index.html script order\n' +
    '    index.html: ' + htmlModules.join(', ') + '\n' +
    '    sw.js     : ' + swModules.join(', ')
  );
} else {
  notes.push(`sw.js MODULES matches index.html (${htmlModules.length} modules)`);
}

const missingOnDisk = htmlModules.filter((m) => !fs.existsSync(path.join(ROOT, m)));
if (missingOnDisk.length) problems.push('script tags with no file: ' + missingOnDisk.join(', '));

/* ---------- 2. top-level declarations, via a real parser ---------- */
// Classic <script> tags share one global lexical environment, so the same
// name declared in two files is either a silent overwrite (function/var) or
// a hard SyntaxError (let/const). An indentation-based regex cannot tell a
// top-level declaration from a nested one, so parse every module with acorn
// and read Program.body - the authoritative top-level scope.
const topLevel = new Map();  // name -> { file, line, kind }
const globalFns = new Set(); // names dispatchAction() can reach via window[...]
for (const mod of htmlModules) {
  const text = read(mod);
  let ast;
  try {
    ast = acorn.parse(text, { ecmaVersion: 'latest', locations: true });
  } catch (e) {
    problems.push(`${mod}: does not parse (${e.message})`);
    continue;
  }
  for (const stmt of ast.body) {
    const line = stmt.loc ? stmt.loc.start.line : 0;
    const found = []; // [name, kind, reachableThroughWindow]
    switch (stmt.type) {
      case 'FunctionDeclaration':
        // function declarations in sloppy-mode classic scripts become
        // properties of the global object -> window[name] works
        found.push([stmt.id.name, 'function', true]);
        break;
      case 'ClassDeclaration':
        // let-like binding: global lexical scope, NOT a window property
        found.push([stmt.id.name, 'class', false]);
        break;
      case 'VariableDeclaration':
        for (const d of stmt.declarations) {
          if (d.id.type !== 'Identifier') continue;
          const init = d.init;
          const isFn = !!init && (init.type === 'FunctionExpression' ||
                                  init.type === 'ArrowFunctionExpression');
          // only `var` creates a window property; let/const bindings are
          // invisible to the window[actionName] fallback in dispatchAction()
          found.push([d.id.name, stmt.kind, stmt.kind === 'var' ? isFn : false]);
        }
        break;
      case 'ExpressionStatement': {
        const expr = stmt.expression;
        if (expr.type === 'AssignmentExpression' &&
            expr.left.type === 'MemberExpression' &&
            !expr.left.computed &&
            expr.left.object.type === 'Identifier' && expr.left.object.name === 'window' &&
            expr.left.property.type === 'Identifier') {
          // window.X = ... is a property write, NOT a lexical declaration:
          // it can coexist with `const X` in another module (that is exactly
          // how tips-data.js publishes PORTAL_TIPS). It only feeds globalFns,
          // because dispatchAction()'s window[...] fallback can reach it.
          found.push([expr.left.property.name, 'window-assign', true, false]);
        }
        break;
      }
    }
    for (const [name, kind, onWindow, lexical = true] of found) {
      if (onWindow) globalFns.add(name);
      if (!lexical) continue; // property writes never collide with declarations
      const prev = topLevel.get(name);
      if (prev) {
        if (prev.file !== mod) {
          problems.push(
            `duplicate top-level "${name}" (${prev.kind}): ${prev.file}:${prev.line} and ${mod}:${line}`
          );
        }
      } else {
        topLevel.set(name, { file: mod, line, kind });
      }
    }
  }
}

/* ---------- 3. data-action coverage ---------- */
// dispatchAction() consults the ActionRegistry first and then falls back to
// window[actionName], so a name is only broken when BOTH paths are missing.
const eventsJs = read('src/core/events.js');
const registered = new Set([...eventsJs.matchAll(/^\s*([A-Za-z_$][\w$]*):\s*(?:function\s*)?\(/gm)].map((m) => m[1]));
// globalFns comes from the acorn pass in section 2

const used = new Map();
allLines.forEach((l) => {
  // matches data-action, data-action-change, data-action-input, data-action-keydown,
  // data-action-dragstart, data-action-submit, data-action-mousedown, ...
  for (const m of l.text.matchAll(/data-action(?:-[a-z]+)?="([^"$]*?)"/g)) {
    const action = m[1];
    if (!action) continue;
    if (!used.has(action)) used.set(action, []);
    used.get(action).push(`${l.file}:${l.line}`);
  }
});

const unresolved = [...used.entries()].filter(([a]) => !registered.has(a) && !globalFns.has(a));

// NOTE: values built at runtime (data-action="${...}") are invisible here, so
// the "registered but never referenced" list is a review queue, not dead code.
const registeredUnused = [...registered].filter((a) => !used.has(a) && a !== 'noop');
if (unresolved.length) {
  problems.push(
    `${unresolved.length} data-action value(s) with neither a registry entry nor a global function ` +
    '(they only produce a console.warn when clicked):\n' +
    unresolved.map(([a, at]) => `    ${a}  (${at.slice(0, 3).join(', ')})`).join('\n')
  );
}
notes.push(
  `${registered.size} registry entries, ${used.size} distinct data-action values in markup/templates, ` +
  `${[...used.keys()].filter((a) => !registered.has(a) && globalFns.has(a)).length} resolved through the window fallback`
);

/* ---------- 4. registered actions whose delegated callbacks target nothing ---------- */
const delegating = [...eventsJs.matchAll(/typeof window\.([A-Za-z_$][\w$]*)\s*===\s*'function'/g)].map((m) => m[1]);
const missingTargets = [...new Set(delegating)].filter((n) => !globalFns.has(n));
if (missingTargets.length) {
  problems.push(
    `${missingTargets.length} registry handler(s) delegate to a window.<fn> that is never defined:\n    ` +
    missingTargets.join(', ')
  );
}
notes.push(`${new Set(delegating).size} window.<fn> delegations inside events.js, ${registeredUnused.length} registered-but-unreferenced action(s)`);

/* ---------- 5. inline onclick + delegated data-action on the same element ---------- */
// src/core/events.js installs ONE document-level click listener that dispatches
// every [data-action]. Any element that ALSO carries an inline onclick="..." for
// the same function runs the handler TWICE per click. Handlers that push an undo
// snapshot, delete a row or toggle state are not idempotent, so this is a silent
// double-write.
const doubles = [];
allLines.forEach((l) => {
  if (!/onclick=/.test(l.text) || !/data-action=/.test(l.text)) return;
  const inline = [...l.text.matchAll(/onclick="([^"]*)"/g)].map((m) => m[1]);
  const actions = [...l.text.matchAll(/data-action="([^"]*)"/g)].map((m) => m[1]);
  inline.forEach((js) => {
    const called = js.match(/([A-Za-z_$][\w$]*)\s*\(/);
    if (called && actions.includes(called[1])) {
      doubles.push(`${l.file}:${l.line}  ${called[1]}()  (both inline onclick and data-action)`);
    }
  });
});
if (doubles.length) {
  problems.push(
    `${doubles.length} element(s) fire the same handler twice (inline onclick AND delegated data-action):\n    ` +
    doubles.join('\n    ')
  );
} else {
  notes.push('no element carries both an inline onclick and a matching data-action');
}

/* ---------- 6. locate a runtime stack frame ---------- */
// jsdom/DevTools report `http://localhost/:238` for an injected classic script:
// the line number is relative to that ONE file, but every classic script shares
// the same URL, so the file has to be inferred. For each asked line number we
// print every module that has non-trivial code there, plus any top-level
// function defined at that line - enough to identify the frame by eye.
//   node tools/audit.js 238 48
const asked = process.argv.slice(2).filter((a) => /^\d+$/.test(a)).map(Number);
if (asked.length) {
  console.log('\n=== frame lookup (line number -> candidate modules) ===');
  asked.forEach((L) => {
    console.log(`  :${L}`);
    let hits = 0;
    for (const mod of htmlModules) {
      const text = read(mod);
      const lineText = text.split(/\r?\n/)[L - 1];
      if (!lineText || !lineText.trim() || /^[\s})]*$/.test(lineText)) continue;
      hits++;
      console.log(`      ${mod}:${L}  ${lineText.trim().slice(0, 96)}`);
    }
    if (!hits) console.log('      (no module has code at this line)');
  });
}


console.log('=== module list ===');
console.log(`  index.html modules: ${htmlModules.length}   sw.js modules: ${swModules.length}`);
notes.forEach((n) => console.log('  note: ' + n));
console.log('\n=== problems ===');
if (!problems.length) {
  console.log('  (none)');
} else {
  problems.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
}
console.log(`\n${problems.length} problem(s), ${notes.length} note(s)`);
if (process.argv.includes('--unused')) {
  console.log(`\nreferenced as a literal data-action (${used.size}):`);
  [...used.keys()].sort().forEach((a) => console.log('   ' + a));
  console.log(`\nregistered but never referenced (${registeredUnused.length}):`);
  registeredUnused.forEach((a) => console.log('   ' + a));
}
process.exit(problems.length ? 1 : 0);
