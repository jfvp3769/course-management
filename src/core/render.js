/* =============================================================================
 * RENDER PIPELINE
 * -----------------------------------------------------------------------------
 * Before this module existed, ~50 call sites each hand-wrote their own sequence
 * of render calls, e.g.:
 *
 *     saveAppState();
 *     renderMatrixTable();
 *     updateSemesterProgressBar();
 *     if (typeof updateTimetableSidebar === 'function') updateTimetableSidebar();
 *
 * Those sequences drifted apart over time, so some mutations refreshed a widget
 * and near-identical ones did not. `Render` centralises them: a mutation now
 * declares WHAT changed, not WHICH widgets to repaint.
 *
 * Deliberately synchronous, in the original call order, so existing code that
 * measures or scrolls the DOM immediately after a repaint keeps working.
 * Within one call each view runs at most once.
 * ========================================================================== */

const Render = (() => {
  /** view id -> render fn. Called lazily: feature modules load after this one. */
  const VIEWS = {
    matrix: () => (typeof renderPlannerView === 'function' ? renderPlannerView() : renderMatrixTable()),
    timetable: () => renderWeeklyTimetable(),
    calendar: () => renderAcademicCalendarTable(),
    roster: () => renderStudentRoster(),
    gradebook: () => renderGradebook(),
    progress: () => updateSemesterProgressBar(),
    sidebars: () => updateAllSidebars(),
    plannerSidebar: () => updatePlannerSidebar(),
    timetableSidebar: () => updateTimetableSidebar(),
    calendarSidebar: () => updateCalendarSidebar(),
    rosterSidebar: () => updateRosterSidebar(),
    gradebookSidebar: () => updateGradebookSidebar(),
    undoRedo: () => updateUndoRedoButtonState(),
    monthFilter: () => populateMonthFilter(),
    scrollbars: () => setupSynchronizedScrollbars()
  };

  /**
   * Named change sets. Every entry below was derived from an actual repaint
   * sequence in the original code - none of them repaint more than the call
   * sites already did. A run that matches no set uses Render.only(...).
   */
  const CHANGE_SETS = {
    // a lesson cell was edited, shifted, copied or cleared
    lesson: ['matrix', 'progress', 'plannerSidebar', 'timetableSidebar'],
    lessonUndo: ['matrix', 'progress', 'undoRedo', 'plannerSidebar'],
    // planner matrix only
    planner: ['matrix', 'progress', 'plannerSidebar'],
    plannerImport: ['matrix', 'progress', 'plannerSidebar'],
    // weekly timetable slots
    schedule: ['matrix', 'timetable'],
    // subjects / sections added, renamed, reordered or removed
    courses: ['matrix', 'timetable', 'roster', 'gradebook', 'progress'],
    // academic calendar events
    calendar: ['matrix', 'calendar', 'progress'],
    // semester dates changed, so the month filter must be rebuilt too
    semester: ['monthFilter', 'matrix', 'calendar', 'progress'],
    // students added, imported or removed
    enrollment: ['roster', 'gradebook'],
    roster: ['roster', 'gradebook', 'progress'],
    // scores or grading config changed
    grades: ['gradebook', 'gradebookSidebar'],
    // full reload: backup import, reset to defaults
    everything: [
      'monthFilter', 'matrix', 'timetable', 'calendar', 'roster', 'gradebook',
      'progress', 'scrollbars'
    ]
  };

  function run(views) {
    const seen = new Set();
    views.forEach((view) => {
      if (seen.has(view)) return;
      seen.add(view);
      const fn = VIEWS[view];
      if (typeof fn !== 'function') return;
      try {
        fn();
      } catch (err) {
        // One broken widget must not abort the rest of the repaint.
        console.error(`[Render] view "${view}" failed:`, err);
      }
    });
  }

  function expand(change) {
    const keys = Array.isArray(change) ? change : [change];
    const out = [];
    keys.forEach((k) => {
      const set = CHANGE_SETS[k];
      if (!set) {
        console.warn(`[Render] unknown change set "${k}"`);
        return;
      }
      out.push(...set);
    });
    return out;
  }

  /**
   * Persist, then repaint everything affected by a named change.
   * @param {string|string[]} change  key(s) of CHANGE_SETS
   * @param {{save?: boolean, immediate?: boolean}} [opts]
   *        save      - write to localStorage first (default true)
   *        immediate - bypass the save debounce (default false)
   */
  function after(change, opts = {}) {
    const { save = true, immediate = false } = opts;
    if (save) saveAppState(immediate);
    run(expand(change));
  }

  /** Repaint without persisting - for startup and read-only view changes. */
  function views(change) {
    run(expand(change));
  }

  /** Escape hatch for one-off combinations that do not deserve a change set. */
  function only(...viewIds) {
    run(viewIds.flat());
  }

  return { after, views, only, VIEWS, CHANGE_SETS };
})();

window.Render = Render;
