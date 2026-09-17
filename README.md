# MSU-GSC Course & Lesson Manager — Refactored

Same application, same behaviour, restructured. `app.js` (10,470 lines) became
38 modules; `styles.css` (2,979 lines) became 10 ordered parts. Three real bugs
were fixed along the way.

Nothing here is a rewrite. Every line of your logic is preserved — the split was
verified with a JavaScript parser, not by eye.

---

## Running it

It is still a plain static site. Serve the folder over HTTP (the service worker
needs a real origin; `file://` will not work):

```bash
cd msu-course-manager
python3 -m http.server 8000
# open http://localhost:8000
```

Your existing data is untouched. The `localStorage` key is unchanged
(`MSU_GSC_COURSE_MANAGER_DATA_V2`), so the app picks up saved rosters, grades
and lesson plans exactly as before.

**One action required:** the service worker cache name changed to
`msu-gsc-manager-v2.00`. On first load the old worker may serve the old cached
`app.js`. Hard-reload once (Ctrl/Cmd-Shift-R), or clear the site's storage in
DevTools → Application. After that it self-updates.

---

## What was wrong

The code was disciplined at the micro level — no `var`, no `==`, no stray
`console.log`, no duplicate function names, consistent escaping in most places.
The problems were structural.

| Issue | Detail |
|---|---|
| One global scope | 278 functions and ~45 mutable `let` globals in a single file that still carried the 4-space indent from when it lived inside a `<script>` tag |
| Oversized functions | 7 functions over 200 lines: `updatePlannerSidebar` (754), `renderGradebook` (530), `updateGradebookSidebar` (413), `renderMatrixTable` (391) |
| Repaint duplication | ~50 call sites each hand-wrote their own render sequence; they had drifted, so near-identical mutations refreshed different widgets |
| CSS fighting Tailwind | 981 `!important` declarations, 563 of them `html.theme-dark` rules overriding Tailwind utilities at equal specificity |

A hard constraint shaped everything: **191 inline `on*` handlers in the HTML
plus ~101 more generated inside JS template strings.** Every handler must stay
reachable from the global scope, so ES modules were not an option. The modules
load as ordered classic `<script>` tags, which share one global lexical
environment — exactly the semantics the original code relied on.

---

## Bugs fixed

### 1. Apostrophes silently killed hundreds of click handlers

Generated handlers used `escapeHtml` for values going into a JS string inside an
HTML attribute. `escapeHtml` turns `'` into `&#039;`, and the browser decodes
that back to a bare `'` *before* the JS parser sees it — closing the string
early.

With a section named `B'15`, measured against your original `app.js`:

```
ORIGINAL: 244 / 1220 openLessonModal handlers are syntax errors
  example: openLessonModal('2026-08-09', 'CVE112', 'B'15', true)
                                                      ^ string ends here
REFACTORED: 0
```

Every cell in that column was dead — clicking did nothing, no error visible.
`highlightTimetableClass` had no escaping at all.

Neither existing helper was correct alone: `escapeJsString` emits `\"`, which
still contains a literal `"` and closes the *HTML attribute* early. The fix is
`jsAttr()` in `src/core/utils.js`, applying both layers in the order the browser
unwinds them. 127 interpolations were corrected (92 using the wrong escaper, 35
with none).

### 2. Stacking event listeners

A four-line block attaching the easter-egg tap handler had been copy-pasted into
`importBackupJSON`, `requestResetToDefaults` and `saveTermSettings` on top of the
legitimate one in `window.onload`. Each backup import or settings save added
another listener, so one tap eventually counted 2–4 times and the vault fired
early. Replaced with an idempotent `bindBrandingEasterEgg()`.

### 3. Two bootstraps racing

`DOMContentLoaded` fired *first* and initialised the column resizers and
scrollbar tracks against empty tables; it only worked because a 100 ms
`setTimeout` happened to re-run them after `window.onload` had rendered.
`resize` was bound in two places with different callbacks.

`src/bootstrap.js` is now one ordered sequence — load → render → measure → bind
→ timers — with a single frame-coalesced resize handler.

---

## The render pipeline

The dominant duplication was this, repeated ~50 times with variations:

```js
saveAppState();
renderMatrixTable();
updateSemesterProgressBar();
if (typeof updateTimetableSidebar === 'function') updateTimetableSidebar();
```

`src/core/render.js` replaces it. A mutation declares *what changed*, not *which
widgets to repaint*:

```js
Render.after('lesson');                          // save + repaint
Render.after('courses', { immediate: true });    // bypass the save debounce
Render.views('planner');                         // repaint without saving
Render.only('scrollbars', 'timetable');          // one-off combination
```

**The change sets were derived, not invented.** I inventoried the 19 distinct
repaint sequences that actually existed in your code and built the sets from
that, then matched them *exactly* — a sequence that matches no set becomes
`Render.only(...)` rather than being widened.

That detail matters: my first attempt used a "smallest superset" fallback, which
silently made switching to the planner tab re-render the whole gradebook and
roster. Exact matching guarantees **no call site repaints more than it did
before**. 44 sequences collapsed, 113 lines removed.

Adding a widget to a workflow is now one line in `CHANGE_SETS`, not a hunt
through 50 call sites. Each view is also wrapped in `try/catch`, so one broken
widget no longer aborts the rest of a repaint.

---

## Layout

```
index.html              markup + ordered <link>/<script> tags
sw.js                   service worker
manifest.json           PWA manifest

src/
  core/                 constants, state, utils, render pipeline, storage
  features/             planner matrix, timetable, calendar, courses,
                        roster, gradebook, grading config, no-class, branding
  sidebars/             one module per tab sidebar
  ui/                   tabs, modals, theme, tips, guide, layout, easter egg
  io/                   CSV / JSON import & export
  bootstrap.js          the only file that RUNS anything — loaded last

css/
  00-index.css          table of contents + known debt
  01..10                straight slices of the original, cascade unchanged

tools/
  smoke-test.js         boots the app in jsdom and asserts it starts clean
```

Largest module is now 1,013 lines (`features/gradebook.js`), down from 10,470.
Every module opens with a header describing what it owns.

`src/core/state.js` collects the ~45 mutable globals that were previously
declared wherever they were first used. They remain globals deliberately — see
the inline-handler constraint above.

---

## Verification

The split was checked, not trusted.

**AST comparison.** The original and the concatenated modules were parsed with
`acorn` and compared:

```
template chunks   1528 = 1528   identical
function decls     278 =  278   identical
string literals   4079 = 4079   identical
```

This caught a real error: my first dedent pass stripped 4 spaces from inside
multi-line HTML template literals. I redid it driven by the parser's exact list
of 1,137 protected lines.

**Boot test.** `tools/smoke-test.js` loads the real `index.html` in jsdom and
injects all 38 modules as actual `<script>` elements — so `let`/`const` share one
global lexical environment exactly as in a browser. This is the load-order test:
a script calling a function defined in a later file fails here, not in front of a
user.

```
loaded 38/38 modules without throwing
  PASS  matrix table rendered
  PASS  roster rendered
  PASS  gradebook rendered
  PASS  calendar rendered
  PASS  Render pipeline exposed
  PASS  jsAttr helper present
  PASS  Render.after persists + repaints
  PASS  apostrophe in section does not break handlers
  PASS  easter-egg binding is idempotent

9/9 smoke checks passed — no console errors during startup
```

The apostrophe test is not a regex check: it renames a section to `B'15`,
renders, reads each handler back through the DOM, and parses it with `acorn`.

To run it:

```bash
npm install jsdom acorn
node tools/smoke-test.js
```

**Not covered:** this proves the app boots, renders and persists. It does not
click through every modal or verify anything visual. Exercise the grading
criteria editor, the PDF calendar import and dark mode by hand before you rely
on this in a live semester.

---

## Also fixed

**`sw.js`** — still cached `./app.js`, which no longer exists. It also used
`cache.addAll()`, which rejects the *entire* install if any single entry 404s, so
a missing `msu-logo.png` would silently disable offline support for the whole
app. Now caches assets individually with optional ones marked, and uses
network-first for navigations so a deployed update actually reaches users. The
old handler was cache-first with no revalidation — anyone who had ever loaded the
app could never receive an update.

**Font loading** — the Google Fonts `@import` sat at the top of `styles.css`,
where it blocks the CSSOM until it resolves. In an offline PWA it never resolves.
Moved to non-blocking `<link>` tags in `index.html` with `preconnect`.

---

## Known debt and resolution status

**563 `!important` dark-mode overrides.** Tailwind is already configured with
`darkMode: 'class'` and the `dark` class is applied to `<html>`, so the supported
fix is `dark:` variants in the markup and deleting the override block. That is a
visual change across every screen and needs a browser to verify screen by screen.
Guessing at it would have been worse than leaving it documented. See
`css/00-index.css`.

**The four oversized render functions** (`updatePlannerSidebar`, `renderGradebook`,
`updateGradebookSidebar`, `renderMatrixTable`).
*Resolved (Phase 2):* Decomposed into clean, maintainable coordinator functions supported
by focused helper routines (`_renderRadarDispatchCard`, `_getHorizonTimelineEvents`,
`_filterAndSortGradebookStudents`, `_renderMatrixCell`, etc.), with zero visual or behavioral regressions.

**Inline `on*` handlers.** Migrating ~290 of them to delegated listeners would
remove the global-scope constraint entirely and let this become real ES modules.
That is the natural next step, and the module boundaries are now in place to do
it feature by feature rather than all at once.

**Planner sidebar staleness.**
*Resolved (Phase 1):* Added `'plannerSidebar'` to `lesson`, `lessonUndo`, and `planner` change sets
in `Render.views()`, combined with an early-exit visibility/collapse guard (`window._plannerSidebarStale`)
and lazy catch-up upon uncollapsing `toggleTabSidebar('planner')`.
