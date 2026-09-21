/* ===========================================================================
 * TAB SWITCHING
 * ---------------------------------------------------------------------------
 * Shows one main section at a time and lazily renders whichever tab is opened.
 * ======================================================================== */

function switchTab(tabId) {
  saveAppState(true);
  const tabs = ['planner', 'timetable', 'calendar', 'roster', 'gradebook'];
  tabs.forEach(t => {
    const btn = document.getElementById('tab-btn-' + t);
    const content = document.getElementById('tab-content-' + t);
    if (btn) btn.setAttribute('aria-selected', t === tabId ? 'true' : 'false');
    if (t === tabId) {
      if (btn) btn.className = "tab-btn px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-msu-gold text-amber-200 flex items-center gap-2 shrink-0";
      if (content) content.classList.remove('hidden');
    } else {
      if (btn) btn.className = "tab-btn px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 border-transparent text-slate-300 hover:text-white flex items-center gap-2 shrink-0 transition";
      if (content) content.classList.add('hidden');
    }
  });

  if (tabId === 'timetable') renderWeeklyTimetable();
  if (tabId === 'calendar') renderAcademicCalendarTable();
  if (tabId === 'roster') renderStudentRoster();
  if (tabId === 'gradebook') renderGradebook();
  if (tabId === 'planner') {
    Render.only('scrollbars', 'progress');
  }
  updateTabSidebar(tabId);
  checkAndSyncBackdrop();
  if (typeof initAllDualScrollbars === 'function') {
    requestAnimationFrame(() => requestAnimationFrame(initAllDualScrollbars));
  }
  if (typeof initMainWindowResizers === 'function') {
    initMainWindowResizers();
  }
  if (typeof autoResizeContentWindows === 'function') {
    autoResizeContentWindows();
    requestAnimationFrame(() => requestAnimationFrame(autoResizeContentWindows));
  }
}
