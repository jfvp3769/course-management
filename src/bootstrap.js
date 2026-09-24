/* =============================================================================
 * APPLICATION BOOTSTRAP
 * -----------------------------------------------------------------------------
 * Loaded last. Everything above this file only DEFINES things; this file is the
 * single place that runs them.
 *
 * What changed from the original:
 *
 *   - There were two competing entry points. `window.onload` loaded state and
 *     rendered; a separate `DOMContentLoaded` initialised the resizers, the
 *     dual scrollbars and the backup timers. DOMContentLoaded fires FIRST, so
 *     the column resizers and scrollbar tracks were measured against empty
 *     tables and only worked because a 100ms setTimeout happened to re-run them
 *     after the render. Startup is now one ordered sequence: load -> render ->
 *     measure -> bind -> timers.
 *
 *   - `resize` was bound in two places with different callbacks. Now bound
 *     once, and debounced to a frame - the old handler re-rendered the whole
 *     timetable synchronously on every resize event.
 * ========================================================================== */

/* ---------- 1. state ---------------------------------------------------- */

function bootLoadState() {
  const hasStoredData = loadAppState();

  // Every student needs an explicit score object for their section's grading
  // config before anything tries to render a grade.
  (courseData?.subjects || []).forEach((sub) => {
    (sub.sections || []).forEach((sec) => {
      const sectionKey = `${sub.code} - ${sec}`;
      const config = getGradingConfig(sectionKey);
      studentRoster
        .filter((s) => s.section === sectionKey || s.section === sec)
        .forEach((s) => ensureStudentScores(s, config));
    });
  });

  semesterDates = generateSemesterDateList();
  initializeCurrentWeekView();

  return hasStoredData;
}

/* ---------- 2. first paint ---------------------------------------------- */

function bootRender() {
  applyHeaderBranding();
  populateMonthFilter();
  Render.only(
    'matrix', 'timetable', 'calendar', 'roster', 'gradebook', 'progress'
  );
}

/* ---------- 3. layout, measured against rendered content ---------------- */

function bootLayout() {
  initSidebarStates();
  updateAllSidebars();
  setupSynchronizedScrollbars();
  initAllDualScrollbars();
  initMainWindowResizers();
  autoResizeContentWindows();
  fixNextActivitiesScroll();
  scrollToPresentWeekOnLoad();
}

/* ---------- 4. listeners ------------------------------------------------ */

function bootBindings() {
  if (window.AppEvents) window.AppEvents.initEventDelegation();
  initColorPickerListeners();
  initDarkModeTheme();
  if (typeof initColorThemes === 'function') initColorThemes();
  bindBrandingEasterEgg();

  const gradeFilter = document.getElementById('gradebook-grade-filter');
  const statusFilter = document.getElementById('gradebook-status-filter');
  const gradebookSearch = document.getElementById('gradebook-search');
  if (gradeFilter) gradeFilter.addEventListener('change', onGradebookDropdownFilterChange);
  if (statusFilter) statusFilter.addEventListener('change', onGradebookDropdownFilterChange);
  if (gradebookSearch && typeof onGradebookSearchInput === 'function') {
    gradebookSearch.addEventListener('input', onGradebookSearchInput);
  }

  // One resize handler, coalesced to a frame. Previously two handlers fired on
  // every resize event, one of them re-rendering the timetable synchronously.
  let resizeFrame = null;
  window.addEventListener('resize', () => {
    if (resizeFrame !== null) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = null;
      autoResizeContentWindows();
      Render.only('scrollbars', 'timetable');
    });
  });

  window.addEventListener('beforeunload', () => saveAppState(true));
}

/* ---------- 5. background timers ---------------------------------------- */

function bootTimers() {
  initLiveHeaderClock();
  setTimeout(checkBackupReminder, 3500);
  setInterval(checkBackupReminder, 30 * 60 * 1000);
}

/* ---------- entry point -------------------------------------------------- */

function startApp() {
  const hasStoredData = bootLoadState();
  bootRender();
  bootLayout();
  bootBindings();
  bootTimers();

  if (hasStoredData) {
    showToast('Restored your saved course & lesson data!');
  }
  checkDailyTipsOnStartup();

  // Fonts and the logo can still be loading; re-measure once they settle so
  // the auto-fit panels do not lock in a pre-webfont height.
  window.addEventListener('load', () => {
    autoResizeContentWindows();
    setupSynchronizedScrollbars();
  }, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp, { once: true });
} else {
  startApp();
}
