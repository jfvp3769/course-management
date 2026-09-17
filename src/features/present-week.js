/* ===========================================================================
 * PRESENT WEEK RESOLUTION
 * ---------------------------------------------------------------------------
 * Works out which semester week today falls in and scrolls the matrix to it.
 * ======================================================================== */

function initializeCurrentWeekView() {
  if (!Array.isArray(semesterDates) || semesterDates.length === 0) return;

  const totalWeeks = semesterDates[0].totalWeeks || 18;
  const now = (typeof window !== 'undefined' && window._overrideCurrentDate)
    ? new Date(window._overrideCurrentDate)
    : new Date();

  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const todayKey = `${y}-${m}-${d}`;

  const firstDateKey = semesterDates[0].dateKey;
  const lastDateKey = semesterDates[semesterDates.length - 1].dateKey;

  if (todayKey < firstDateKey) {
    currentWeekViewIndex = 1;
  } else if (todayKey > lastDateKey) {
    currentWeekViewIndex = totalWeeks;
  } else {
    const matched = semesterDates.find(entry => entry.dateKey === todayKey);
    if (matched) {
      currentWeekViewIndex = matched.weekNumber;
    } else {
      const pastEntries = semesterDates.filter(entry => entry.dateKey <= todayKey);
      currentWeekViewIndex = pastEntries.length > 0 ? pastEntries[pastEntries.length - 1].weekNumber : 1;
    }
  }

  const navLabel = document.getElementById('current-week-nav-label');
  if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;
}

function scrollToPresentWeekOnLoad() {
  setTimeout(() => {
    const targetEntry = semesterDates.find(d => d.weekNumber === currentWeekViewIndex && d.dayOfWeek === 'Sun') ||
                        semesterDates.find(d => d.weekNumber === currentWeekViewIndex);
    if (targetEntry) {
      const targetRow = document.getElementById('row-' + targetEntry.dateKey);
      if (targetRow) {
        scrollMatrixToRow(targetRow, 'auto');
      }
    }
  }, 60);
}
