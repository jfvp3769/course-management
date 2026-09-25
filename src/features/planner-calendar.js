/* ===========================================================================
 * MONTHLY PLANNER CALENDAR VIEW (Strategy 1 + Strategy 2 + View Switcher)
 * ---------------------------------------------------------------------------
 * Provides an interactive 1-month visual calendar grid for Tab 1
 * (Semester Schedule & Activity Matrix), featuring:
 * 1. Strategy 1: Sleek compact pills (~22-26px) with visible class limit (max 2)
 *    and a Day Inspector Flyout Modal for high-density days (up to 6 classes).
 * 2. Strategy 2: Course / Section Focus Filter Bar.
 * 3. View Switcher: Seamless toggling between "Monthly View" and "Weekly View".
 * ======================================================================== */

function initPlannerMonthControls() {
  const monthSelect = document.getElementById('planner-month-select');
  const sectionFilter = document.getElementById('planner-section-filter');

  // 1. Populate Distinct Months
  if (monthSelect && Array.isArray(semesterDates) && semesterDates.length > 0) {
    const distinctMonths = [];
    semesterDates.forEach(d => {
      const yearMonth = `${d.year}-${d.monthNum}`;
      if (!distinctMonths.some(m => m.yearMonth === yearMonth)) {
        distinctMonths.push({
          yearMonth,
          monthNum: d.monthNum,
          year: d.year,
          name: d.monthName
        });
      }
    });

    if (distinctMonths.length > 0) {
      // If currentPlannerMonth is unset or invalid, default to today's month if in semester, or first month
      const now = (typeof window !== 'undefined' && window._overrideCurrentDate)
        ? new Date(window._overrideCurrentDate)
        : new Date();
      const thisYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      if (!currentPlannerMonth || !distinctMonths.some(m => m.yearMonth === currentPlannerMonth)) {
        if (distinctMonths.some(m => m.yearMonth === thisYearMonth)) {
          currentPlannerMonth = thisYearMonth;
        } else {
          currentPlannerMonth = distinctMonths[0].yearMonth;
        }
      }

      monthSelect.innerHTML = distinctMonths.map(m => `
        <option value="${m.yearMonth}" ${currentPlannerMonth === m.yearMonth ? 'selected' : ''}>
          ${m.name} ${m.year}
        </option>
      `).join('');
    }
  }

  // 2. Populate Section Filter
  if (sectionFilter && courseData && Array.isArray(courseData.subjects)) {
    const allSections = [];
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        allSections.push(`${sub.code} - ${sec}`);
      });
    });

    let filterHtml = '<option value="all">All Sections</option>';
    allSections.forEach(secKey => {
      const isSelected = (plannerSectionFilter === secKey) ? 'selected' : '';
      filterHtml += `<option value="${escapeHtml(secKey)}" ${isSelected}>${escapeHtml(secKey)}</option>`;
    });
    sectionFilter.innerHTML = filterHtml;

    if (plannerSectionFilter !== 'all' && !allSections.includes(plannerSectionFilter)) {
      plannerSectionFilter = 'all';
    }
    sectionFilter.value = plannerSectionFilter;
  }

  // 3. Synchronize Switcher Buttons and Container Visibility
  _updateViewSwitcherButtons();
  _syncPlannerViewContainers();
}

function _updateViewSwitcherButtons() {
  const btnMonth = document.getElementById('btn-planner-view-month');
  const btnWeek = document.getElementById('btn-planner-view-week');
  if (!btnMonth || !btnWeek) return;

  const activeClasses = ['bg-white', 'dark:bg-slate-700', 'text-slate-900', 'dark:text-slate-100', 'font-bold', 'shadow-2xs'];
  const inactiveClasses = ['text-slate-500', 'hover:text-slate-800', 'dark:hover:text-slate-200', 'font-semibold', 'bg-transparent'];

  if (plannerViewMode === 'month') {
    btnMonth.classList.add(...activeClasses);
    btnMonth.classList.remove(...inactiveClasses);
    btnWeek.classList.add(...inactiveClasses);
    btnWeek.classList.remove(...activeClasses);
  } else {
    btnWeek.classList.add(...activeClasses);
    btnWeek.classList.remove(...inactiveClasses);
    btnMonth.classList.add(...inactiveClasses);
    btnMonth.classList.remove(...activeClasses);
  }
}

function _syncPlannerViewContainers() {
  const calContainer = document.getElementById('planner-calendar-view-container');
  const matrixContainer = document.getElementById('planner-matrix-view-container');
  const monthNav = document.getElementById('planner-month-nav-container');
  const weekNav = document.getElementById('planner-week-nav-container');

  if (plannerViewMode === 'month') {
    if (calContainer) {
      calContainer.classList.remove('hidden');
      calContainer.classList.add('flex');
    }
    if (matrixContainer) {
      matrixContainer.classList.add('hidden');
      matrixContainer.classList.remove('flex');
    }
    if (monthNav) {
      monthNav.classList.remove('hidden');
      monthNav.classList.add('flex');
    }
    if (weekNav) {
      weekNav.classList.add('hidden');
      weekNav.classList.remove('flex');
    }
  } else {
    if (calContainer) {
      calContainer.classList.add('hidden');
      calContainer.classList.remove('flex');
    }
    if (matrixContainer) {
      matrixContainer.classList.remove('hidden');
      matrixContainer.classList.add('flex');
    }
    if (monthNav) {
      monthNav.classList.add('hidden');
      monthNav.classList.remove('flex');
    }
    if (weekNav) {
      weekNav.classList.remove('hidden');
      weekNav.classList.add('flex');
    }
  }
}

function setPlannerViewMode(mode) {
  plannerViewMode = (mode === 'week') ? 'week' : 'month';
  saveAppState();
  _updateViewSwitcherButtons();
  _syncPlannerViewContainers();

  if (plannerViewMode === 'month') {
    renderPlannerMonthCalendar();
    showToast('Switched to Monthly View', '📅');
  } else {
    renderMatrixTable();
    showToast('Switched to Weekly View', '⊞');
    // Ensure synchronized scrollbars and layout match in weekly view
    if (typeof setupSynchronizedScrollbars === 'function') {
      requestAnimationFrame(() => setupSynchronizedScrollbars());
    }
  }
}

function navigatePlannerMonth(delta) {
  if (!Array.isArray(semesterDates) || semesterDates.length === 0) return;

  const distinctMonths = [];
  semesterDates.forEach(d => {
    const yearMonth = `${d.year}-${d.monthNum}`;
    if (!distinctMonths.includes(yearMonth)) distinctMonths.push(yearMonth);
  });

  let currentIdx = distinctMonths.indexOf(currentPlannerMonth);
  if (currentIdx === -1) currentIdx = 0;

  const newIdx = Math.max(0, Math.min(distinctMonths.length - 1, currentIdx + delta));
  currentPlannerMonth = distinctMonths[newIdx];

  const monthSelect = document.getElementById('planner-month-select');
  if (monthSelect) monthSelect.value = currentPlannerMonth;

  saveAppState();
  renderPlannerMonthCalendar();
}

function onPlannerMonthSelectChange(e, target) {
  const sel = target || document.getElementById('planner-month-select');
  if (!sel || !sel.value) return;

  currentPlannerMonth = sel.value;
  saveAppState();
  renderPlannerMonthCalendar();
}

function onPlannerSectionFilterChange(e, target) {
  const sel = target || document.getElementById('planner-section-filter');
  if (!sel) return;

  plannerSectionFilter = sel.value || 'all';
  saveAppState();
  renderPlannerMonthCalendar();

  if (plannerSectionFilter === 'all') {
    showToast('Showing all scheduled sections', '🔍');
  } else {
    showToast(`Focused on: ${plannerSectionFilter}`, '🔍');
  }
}

/**
 * Calculate meeting sequence counters for every course and section across the semester.
 */
function _calculateCalendarMeetingStats() {
  const meetingStats = {}; // cellKey -> { meetingNum, totalMeetings, meetingsLeft }
  const totalCounters = {};
  const runningCounters = {};

  if (!courseData || !Array.isArray(courseData.subjects) || !Array.isArray(semesterDates)) {
    return meetingStats;
  }

  // Initialize
  courseData.subjects.forEach(sub => {
    (sub.sections || []).forEach(sec => {
      const secKey = `${sub.code}__${sec}`;
      totalCounters[secKey] = 0;
      runningCounters[secKey] = 0;
    });
  });

  const dayMap = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };

  // First pass: compute total meetings per section
  semesterDates.forEach(d => {
    const fullDay = dayMap[d.dayOfWeek] || d.dayOfWeek;
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const secKey = `${sub.code}__${sec}`;
        const cellKey = `${d.dateKey}__${sub.code}__${sec}`;
        const entry = plannerEntries[cellKey];

        const scheduled = (weeklyTimetable || []).some(t => t.course === sub.code && t.section === sec && t.day === fullDay);
        const isSpecial = !scheduled && !!entry;

        if (d.isWeekend && !isSpecial) return;
        if (d.isNoClassDate) return;

        if (scheduled || isSpecial) {
          const isNoClass = entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')));
          if (!isNoClass) {
            totalCounters[secKey]++;
          }
        }
      });
    });
  });

  // Second pass: compute running meeting numbers and remaining counts
  semesterDates.forEach(d => {
    const fullDay = dayMap[d.dayOfWeek] || d.dayOfWeek;
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const secKey = `${sub.code}__${sec}`;
        const cellKey = `${d.dateKey}__${sub.code}__${sec}`;
        const entry = plannerEntries[cellKey];

        const scheduled = (weeklyTimetable || []).some(t => t.course === sub.code && t.section === sec && t.day === fullDay);
        const isSpecial = !scheduled && !!entry;

        if (d.isWeekend && !isSpecial) return;
        if (d.isNoClassDate) return;

        if (scheduled || isSpecial) {
          const isNoClass = entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')));
          let num = runningCounters[secKey];
          if (!isNoClass) {
            runningCounters[secKey]++;
            num = runningCounters[secKey];
          }
          const tot = totalCounters[secKey] || 0;
          meetingStats[cellKey] = {
            meetingNum: num,
            totalMeetings: tot,
            meetingsLeft: Math.max(0, tot - num)
          };
        }
      });
    });
  });

  return meetingStats;
}

/**
 * Main renderer for the 1-Month Calendar View.
 */
function renderPlannerMonthCalendar() {
  const container = document.getElementById('planner-calendar-view-container');
  if (!container) return;

  if (!Array.isArray(semesterDates) || semesterDates.length === 0) {
    container.innerHTML = '<div class="p-8 text-center text-slate-400">Loading semester dates...</div>';
    return;
  }

  // Resolve current active month (e.g. '2026-09')
  if (!currentPlannerMonth) {
    const now = (typeof window !== 'undefined' && window._overrideCurrentDate)
      ? new Date(window._overrideCurrentDate)
      : new Date();
    currentPlannerMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  const parts = currentPlannerMonth.split('-');
  const activeYear = parseInt(parts[0], 10);
  const activeMonth = parseInt(parts[1], 10); // 1-12

  // Month Bounds
  const firstDayOfWeek = new Date(activeYear, activeMonth - 1, 1).getDay(); // 0=Sun..6=Sat
  const daysInMonth = new Date(activeYear, activeMonth, 0).getDate();
  const daysInPrevMonth = new Date(activeYear, activeMonth - 1, 0).getDate();

  // Grid Cells Calculation (Complete 7-day rows)
  const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
  const trailingDaysCount = totalCells - (firstDayOfWeek + daysInMonth);

  const gridDays = [];

  // 1. Leading padding days (previous month)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const prevMonthNum = activeMonth === 1 ? 12 : activeMonth - 1;
    const prevYear = activeMonth === 1 ? activeYear - 1 : activeYear;
    const dateKey = `${prevYear}-${String(prevMonthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    gridDays.push({
      dateKey,
      dayNum,
      isCurrentMonth: false,
      dateObj: new Date(prevYear, prevMonthNum - 1, dayNum)
    });
  }

  // 2. Active month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${activeYear}-${String(activeMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    gridDays.push({
      dateKey,
      dayNum: d,
      isCurrentMonth: true,
      dateObj: new Date(activeYear, activeMonth - 1, d)
    });
  }

  // 3. Trailing padding days (next month)
  for (let t = 1; t <= trailingDaysCount; t++) {
    const nextMonthNum = activeMonth === 12 ? 1 : activeMonth + 1;
    const nextYear = activeMonth === 12 ? activeYear + 1 : activeYear;
    const dateKey = `${nextYear}-${String(nextMonthNum).padStart(2, '0')}-${String(t).padStart(2, '0')}`;
    gridDays.push({
      dateKey,
      dayNum: t,
      isCurrentMonth: false,
      dateObj: new Date(nextYear, nextMonthNum - 1, t)
    });
  }

  // Resolve todayKey
  const now = (typeof window !== 'undefined' && window._overrideCurrentDate)
    ? new Date(window._overrideCurrentDate)
    : new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const meetingStats = _calculateCalendarMeetingStats();

  // Fast Timetable Lookup Map
  const timetableMap = {};
  if (Array.isArray(weeklyTimetable)) {
    weeklyTimetable.forEach(t => {
      const k = `${t.day}__${t.course}__${t.section}`;
      timetableMap[k] = t;
    });
  }

  // Render 7-day Column Header
  const daysHeader = [
    { code: 'SUN', label: 'Sunday', isWeekend: true },
    { code: 'MON', label: 'Monday', isWeekend: false },
    { code: 'TUE', label: 'Tuesday', isWeekend: false },
    { code: 'WED', label: 'Wednesday', isWeekend: false },
    { code: 'THU', label: 'Thursday', isWeekend: false },
    { code: 'FRI', label: 'Friday', isWeekend: false },
    { code: 'SAT', label: 'Saturday', isWeekend: true }
  ];

  let html = `
    <!-- 7-Day Header -->
    <div class="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 sticky top-0 z-20 select-none shadow-xs">
      ${daysHeader.map(h => `
        <div class="py-2 px-1 text-center font-extrabold text-[11px] sm:text-xs tracking-wider border-r last:border-r-0 border-slate-200/80 dark:border-slate-800 ${h.isWeekend ? 'text-amber-800 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20' : 'text-slate-700 dark:text-slate-300'}">
          <span>${h.code}</span>
        </div>
      `).join('')}
    </div>

    <!-- Calendar 7-Column Days Grid -->
    <div class="grid grid-cols-7 auto-rows-fr divide-y divide-slate-200 dark:divide-slate-800 border-l border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800/80 gap-[1px]">
      ${gridDays.map(g => _renderCalendarDayCell(g, g.isCurrentMonth, todayKey, timetableMap, meetingStats)).join('')}
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Parse time string (e.g., '07:30', '7:30', '1:00 PM', '13:00') to minutes from midnight.
 */
function parseTimeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const s = timeStr.trim().toUpperCase();
  const isPM = s.includes('PM');
  const isAM = s.includes('AM');
  const clean = s.replace(/[A-Z]/g, '').trim();
  const parts = clean.split(':');
  if (parts.length < 2) return null;
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return null;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

/**
 * Format minutes from midnight to HH:mm string.
 */
function formatMinutesToHHMM(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Format 24-hr time string to 12-hr display (e.g. '07:30' -> '7:30 AM').
 */
function formatTimeDisplay(timeStr) {
  const mins = parseTimeToMinutes(timeStr);
  if (mins === null) return timeStr || '';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
}

/**
 * Map start and end minutes to CSS grid rows (1-based, 1..9, span 1..9).
 * Column 1 (AM): 7:30 AM (450m) – 12:00 PM (720m) -> 9 vertical rows of 30 mins
 * Column 2 (PM): 1:00 PM (780m) – 5:30 PM (1050m) -> 9 vertical rows of 30 mins
 */
function mapTimeToGridRow(startMins, endMins, period) {
  const base = period === 'AM' ? 450 : 780;
  const s = (startMins !== null && !isNaN(startMins)) ? startMins : base;
  const e = (endMins !== null && !isNaN(endMins)) ? endMins : (s + 60);

  const startRow = Math.max(1, Math.min(9, Math.floor((s - base) / 30) + 1));
  const endRow = Math.max(startRow + 1, Math.min(10, Math.ceil((e - base) / 30) + 1));
  const span = Math.max(1, Math.min(10 - startRow, endRow - startRow));
  return { startRow, span, startCol: startRow };
}

function mapTimeToGridColumn(startMins, endMins, period) {
  return mapTimeToGridRow(startMins, endMins, period);
}

/**
 * Assign grid tracks (columns) to prevent collision when classes in the same period overlap.
 */
function assignGridTracks(classes) {
  const tracks = [];
  classes.forEach(c => {
    let placedTrack = 1;
    const s = c.startRow ?? c.startCol ?? 1;
    const sp = c.span ?? 1;
    for (let t = 0; t < tracks.length; t++) {
      const hasCollision = tracks[t].some(occ => {
        return Math.max(s, occ.startRow) < Math.min(s + sp, occ.startRow + occ.span);
      });
      if (!hasCollision) {
        placedTrack = t + 1;
        tracks[t].push({ startRow: s, span: sp, startCol: s });
        c.track = placedTrack;
        return;
      }
    }
    placedTrack = tracks.length + 1;
    tracks.push([{ startRow: s, span: sp, startCol: s }]);
    c.track = placedTrack;
  });
}

/**
 * Returns state-based styling for a subject pill according to palette and planned activity state.
 * - With Planned Activity: Solid/proper theme color (high contrast, full saturation/opacity).
 * - No Planned Activity: Muted/pale styling of the subject color (low opacity tint/light pastel fill with dashed border).
 */
function getSubjectPillStyles(courseCode, hasPlannedActivity, isNoClass) {
  if (isNoClass) {
    return 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 line-through opacity-85';
  }

  const sub = (courseData && Array.isArray(courseData.subjects))
    ? courseData.subjects.find(s => s.code === courseCode)
    : null;
  const theme = (sub && sub.colorTheme ? sub.colorTheme.toLowerCase() : 'blue');

  const solidThemes = {
    blue: 'bg-blue-600 dark:bg-blue-700 text-white border border-blue-700 dark:border-blue-500 shadow-2xs',
    emerald: 'bg-emerald-600 dark:bg-emerald-700 text-white border border-emerald-700 dark:border-emerald-500 shadow-2xs',
    amber: 'bg-amber-600 dark:bg-amber-700 text-white border border-amber-700 dark:border-amber-500 shadow-2xs',
    purple: 'bg-purple-600 dark:bg-purple-700 text-white border border-purple-700 dark:border-purple-500 shadow-2xs',
    teal: 'bg-teal-600 dark:bg-teal-700 text-white border border-teal-700 dark:border-teal-500 shadow-2xs',
    rose: 'bg-rose-600 dark:bg-rose-700 text-white border border-rose-700 dark:border-rose-500 shadow-2xs',
    indigo: 'bg-indigo-600 dark:bg-indigo-700 text-white border border-indigo-700 dark:border-indigo-500 shadow-2xs',
    cyan: 'bg-cyan-600 dark:bg-cyan-700 text-white border border-cyan-700 dark:border-cyan-500 shadow-2xs',
    slate: 'bg-slate-700 dark:bg-slate-700 text-white border border-slate-800 dark:border-slate-600 shadow-2xs'
  };

  const mutedThemes = {
    blue: 'bg-blue-50/90 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-dashed border-blue-300 dark:border-blue-700/80',
    emerald: 'bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-dashed border-emerald-300 dark:border-emerald-700/80',
    amber: 'bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-dashed border-amber-300 dark:border-amber-700/80',
    purple: 'bg-purple-50/90 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 border border-dashed border-purple-300 dark:border-purple-700/80',
    teal: 'bg-teal-50/90 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 border border-dashed border-teal-300 dark:border-teal-700/80',
    rose: 'bg-rose-50/90 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-dashed border-rose-300 dark:border-rose-700/80',
    indigo: 'bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border border-dashed border-indigo-300 dark:border-indigo-700/80',
    cyan: 'bg-cyan-50/90 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 border border-dashed border-cyan-300 dark:border-cyan-700/80',
    slate: 'bg-slate-100/90 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-dashed border-slate-300 dark:border-slate-700'
  };

  if (hasPlannedActivity) {
    return solidThemes[theme] || solidThemes.slate;
  } else {
    return mutedThemes[theme] || mutedThemes.slate;
  }
}

/**
 * Render a vertical 9-row subgrid column for AM (7:30–12:00) or PM (1:00–5:30).
 * display: grid; grid-template-rows: repeat(9, minmax(14px, 1fr)); grid-template-columns: 1fr; gap: 2px;
 * Completely without time labels or column headers.
 */
function _renderSubgridColumn(period, dateKey, classes, isWeekend, isNoClassDate, isCurrentMonth) {
  const baseMinutes = period === 'AM' ? 450 : 780; // 07:30 AM (450) vs 1:00 PM (780)

  // 1. Generate 9 background 30-minute empty slot units (Rows 1–9)
  const slotsHtml = [];
  for (let u = 1; u <= 9; u++) {
    const startM = baseMinutes + (u - 1) * 30;
    const endM = startM + 30;
    const startStr = formatMinutesToHHMM(startM);

    if (!isCurrentMonth) {
      slotsHtml.push(`
        <div style="grid-row: ${u} / span 1; grid-column: 1 / -1;" class="h-full rounded-xs border border-dashed border-slate-200/40 dark:border-slate-800/40 pointer-events-none"></div>
      `);
    } else {
      slotsHtml.push(`
        <button type="button" 
          data-action="openAddActivityModal" 
          data-date="${dateKey}" 
          data-period="${period}" 
          data-unit="${u}" 
          data-start-time="${startStr}" 
          data-end-time="${formatMinutesToHHMM(startM + 60)}"
          style="grid-row: ${u} / span 1; grid-column: 1 / -1;" 
          class="planner-empty-slot w-full h-full select-none" 
          title="Click to add activity at ${formatTimeDisplay(startStr)} (${period})">
        </button>
      `);
    }
  }

  // 2. Map and layout class pills
  classes.forEach(c => {
    const startM = parseTimeToMinutes(c.startTime) ?? baseMinutes;
    const endM = parseTimeToMinutes(c.endTime) ?? (startM + 90);
    const { startRow, span } = mapTimeToGridRow(startM, endM, period);
    c.startRow = startRow;
    c.span = span;
    c.startCol = startRow; // backward compatibility
  });

  assignGridTracks(classes);

  const maxTracks = classes.reduce((max, c) => Math.max(max, c.track || 1), 1);

  const pillsHtml = classes.map(c => {
    const hasActivity = !!(c.hasPlannedActivity);
    const styleClasses = getSubjectPillStyles(c.course, hasActivity, c.isNoClass);
    const tooltipText = `${c.course} (${c.section}) • ${formatTimeDisplay(c.startTime)} – ${formatTimeDisplay(c.endTime)}\n${c.room ? 'Room: ' + c.room + '\n' : ''}${c.stats.meetingNum ? 'Mtg #' + c.stats.meetingNum + ' (' + c.stats.meetingsLeft + ' left)\n' : ''}${c.topic || 'No topic planned yet'}`;

    const sub = (courseData && Array.isArray(courseData.subjects))
      ? courseData.subjects.find(s => s.code === c.course)
      : (c.sub || null);

    let badgeColor = (sub && sub.badgeBg)
      ? sub.badgeBg
      : 'bg-blue-100 dark:bg-[#0f274a] text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-600';

    if (c.type === 'Exam') {
      badgeColor = 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800';
    } else if (c.isNoClass) {
      badgeColor = 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800';
    } else if (c.type === 'Makeup Class') {
      badgeColor = 'bg-amber-50/90 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700';
    } else if (c.type === 'Special Session') {
      badgeColor = 'bg-violet-50/90 dark:bg-violet-950/60 text-violet-950 dark:text-violet-200 border-violet-300 dark:border-violet-700';
    }

    const isTopHalf = (c.startRow < 6);
    const vPosClass = isTopHalf ? 'top-0' : 'bottom-0';
    const hPosClass = (period === 'AM') ? 'left-0' : 'right-0';
    const meetingNum = c.stats.meetingNum || '';
    const isCompleted = c.isDone;

    return `
      <div class="calendar-pill-slot relative group/cal-card" 
           style="grid-row: ${c.startRow} / span ${c.span}; grid-column: ${c.track || 1} / span 1;">
        
        <!-- Collapsed Compact State (matches pill requirements) -->
        <div 
          data-action="openLessonModal" 
          data-date="${dateKey}" 
          data-course="${escapeHtml(c.course)}" 
          data-section="${escapeHtml(c.section)}" 
          data-weekend="${isWeekend ? 'true' : 'false'}"
          data-subject-title="${escapeHtml(c.sub?.title || c.course)}"
          data-topic="${escapeHtml(c.topic || '')}"
          data-activity="${escapeHtml(c.activity || '')}"
          data-room="${escapeHtml(c.room || '')}"
          data-start-time="${escapeHtml(c.startTime || '')}"
          data-end-time="${escapeHtml(c.endTime || '')}"
          data-type="${escapeHtml(c.type || 'Lecture')}"
          data-status="${escapeHtml(c.entry?.status || 'Planned')}"
          data-meeting-num="${c.stats.meetingNum || ''}"
          data-total-meetings="${c.stats.totalMeetings || ''}"
          data-meetings-left="${c.stats.meetingsLeft || ''}"
          data-has-activity="${hasActivity ? 'true' : 'false'}"
          class="planner-calendar-pill planner-class-pill pointer-events-auto cursor-pointer flex flex-col justify-center select-none w-full h-full ${styleClasses}"
          title="${escapeHtml(tooltipText)}">
          <span class="text-[9.5px] font-black leading-tight truncate text-left w-full">${escapeHtml(c.course)}</span>
          <span class="text-[8.5px] font-bold leading-tight truncate text-left w-full opacity-90">${escapeHtml(c.section)}</span>
        </div>

        <!-- In-Place Expanding Card on Hover (Weekly View Behavior) -->
        <div 
          data-action="openLessonModal" 
          data-date="${dateKey}" 
          data-course="${escapeHtml(c.course)}" 
          data-section="${escapeHtml(c.section)}" 
          data-weekend="${isWeekend ? 'true' : 'false'}"
          class="planner-calendar-expanded-card ${vPosClass} ${hPosClass} p-1.5 rounded-lg border ${badgeColor} shadow-xl flex flex-col gap-0.5 cursor-pointer select-none">
          
          <!-- Top Row: Meeting # & Status / Type Badges -->
          <div class="flex items-center justify-between gap-1 overflow-hidden leading-tight">
            ${!c.isNoClass ? `
              <span class="font-extrabold text-[8.5px] uppercase tracking-tight truncate">Mtg #${meetingNum}</span>
            ` : `
              <span class="font-extrabold text-[8.5px] uppercase tracking-tight text-rose-700 dark:text-rose-300 truncate">${escapeHtml(c.type || 'No Class')}</span>
            `}
            <div class="flex items-center gap-1 shrink-0">
              ${isCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
              <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 shrink-0">${escapeHtml(c.type || 'Lecture')}</span>
            </div>
          </div>

          <!-- Course & Section Subtitle -->
          <div class="text-[8px] font-extrabold uppercase tracking-tight opacity-75 truncate -mb-0.5">${escapeHtml(c.course)} (${escapeHtml(c.section)})</div>

          <!-- Topic Title -->
          <div class="font-bold text-[10.5px] leading-tight text-current truncate" title="${escapeHtml(c.topic || c.sub?.title || c.course)}">${escapeHtml(c.topic || c.sub?.title || 'Planned Activity')}</div>
          
          <!-- Activity Description (if present) -->
          ${c.activity ? `<div class="text-[8.5px] opacity-80 leading-tight truncate" title="${escapeHtml(c.activity)}">${escapeHtml(c.activity)}</div>` : ''}

          <!-- Time & Room Strip -->
          <div class="flex items-center justify-between text-[8.5px] font-mono font-bold pt-1 mt-0.5 border-t border-current/15 text-current opacity-90 leading-tight">
            <span class="truncate whitespace-nowrap">🕒 ${formatTime12(c.startTime)} – ${formatTime12(c.endTime)}</span>
            <span class="px-1 py-0.2 rounded bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 font-sans font-semibold shrink-0">${escapeHtml(c.room || 'TBA')}</span>
          </div>

          <!-- Action Buttons Strip -->
          <div class="flex items-center justify-end gap-1 pt-1 mt-0.5 border-t border-current/15">
            <button type="button" data-action="copyMatrixActivity" data-stop-propagation="true" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" class="flex-1 py-1 px-1 rounded-md bg-white/95 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs inline-flex items-center justify-center gap-0.5 cursor-pointer transition" title="Copy Activity">📋 Copy</button>
            <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" class="flex-1 py-1 px-1 rounded-md bg-white/95 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs inline-flex items-center justify-center gap-0.5 cursor-pointer transition" title="Paste Copied Activity">📥 Paste</button>
            <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" data-weekend="${isWeekend ? 'true' : 'false'}" class="flex-1 py-1 px-1 rounded-md bg-white/95 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs inline-flex items-center justify-center gap-0.5 cursor-pointer transition" title="Edit Activity">✏️ Edit</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="calendar-subgrid-col calendar-subgrid-row relative rounded border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 p-0.5" 
         style="display: grid; grid-template-rows: repeat(9, minmax(14px, 1fr)); grid-template-columns: repeat(${maxTracks}, minmax(0, 1fr)); gap: 2px;">
      <!-- Layer 1: Background 9 30-min empty slot units -->
      ${slotsHtml.join('')}
      <!-- Layer 2: Foreground Class Pills -->
      ${pillsHtml}
    </div>
  `;
}

const _renderSubgridRow = _renderSubgridColumn;

/**
 * Render a single calendar cell in the 7-day grid with 9-column AM and PM subgrids.
 */
function _renderCalendarDayCell(g, isCurrentMonth, todayKey, timetableMap, meetingStats) {
  const { dateKey, dayNum, dateObj } = g;

  const dayOfWeekIdx = dateObj.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullDay = dayNames[dayOfWeekIdx];
  const isWeekend = (dayOfWeekIdx === 0 || dayOfWeekIdx === 6);
  const isToday = (dateKey === todayKey);

  // Look up semester date entry if within semester bounds
  const semesterEntry = Array.isArray(semesterDates) ? semesterDates.find(d => d.dateKey === dateKey) : null;
  const isNoClassDate = semesterEntry ? semesterEntry.isNoClassDate : false;
  const calendarEvent = (typeof getCalendarEventForDate === 'function')
    ? getCalendarEventForDate(dateKey)
    : (semesterEntry ? semesterEntry.event : null);

  // Gather scheduled classes for this date
  const dayClasses = [];

  if (courseData && Array.isArray(courseData.subjects)) {
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const fullSecKey = `${sub.code} - ${sec}`;
        if (plannerSectionFilter !== 'all' && plannerSectionFilter !== fullSecKey) {
          return;
        }

        const cellKey = `${dateKey}__${sub.code}__${sec}`;
        const entry = plannerEntries[cellKey];
        const timetableSlot = timetableMap[`${fullDay}__${sub.code}__${sec}`] || null;
        const isScheduledToday = !!timetableSlot;
        const isSpecialSession = !isScheduledToday && !!entry;

        if (isWeekend && !isSpecialSession) return;

        if (isScheduledToday || isSpecialSession) {
          const stats = meetingStats[cellKey] || { meetingNum: 0, totalMeetings: 0, meetingsLeft: 0 };
          const isDone = entry && (entry.status === 'Completed' || (dateKey < todayKey && entry.status !== 'Cancelled'));
          const isNoClass = entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')));
          const hasPlannedActivity = !!(!isNoClass && entry && ((entry.topic && entry.topic.trim()) || (entry.activity && entry.activity.trim())));

          dayClasses.push({
            course: sub.code,
            section: sec,
            fullSecKey,
            sub,
            timetableSlot,
            isSpecialSession,
            isScheduledToday,
            entry,
            isDone,
            isNoClass,
            hasPlannedActivity,
            stats,
            cellKey,
            startTime: (entry && entry.startTime) || (timetableSlot && timetableSlot.startTime) || '07:30',
            endTime: (entry && entry.endTime) || (timetableSlot && timetableSlot.endTime) || '09:00',
            room: (entry && entry.room) || (timetableSlot && timetableSlot.room) || '',
            topic: (entry && entry.topic) ? entry.topic.trim() : '',
            activity: (entry && entry.activity) ? entry.activity.trim() : '',
            type: (entry && entry.type) || (isSpecialSession ? 'Makeup Class' : 'Lecture')
          });
        }
      });
    });
  }

  // Sort classes chronologically by start time
  dayClasses.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  // Split into AM and PM classes (threshold: start minutes < 750 / 12:30 PM)
  const amClasses = [];
  const pmClasses = [];
  dayClasses.forEach(c => {
    const sMin = parseTimeToMinutes(c.startTime) ?? 450;
    if (sMin < 750) {
      amClasses.push(c);
    } else {
      pmClasses.push(c);
    }
  });

  // Cell Background & Text Theme
  let cellBgClass = 'bg-white dark:bg-slate-900';
  if (!isCurrentMonth) {
    cellBgClass = 'bg-slate-50/70 dark:bg-slate-950/60 text-slate-400 dark:text-slate-600';
  } else if (isWeekend) {
    cellBgClass = 'bg-[#f8fafc] dark:bg-[#0f172a]';
  }

  const todayBorder = isToday ? 'ring-2 ring-inset ring-msu-maroon dark:ring-rose-500 shadow-sm z-10' : '';

  return `
    <div id="cal-day-${dateKey}" data-date="${dateKey}" class="planner-calendar-cell flex flex-col p-1 sm:p-1.5 min-h-[175px] sm:min-h-[185px] border-r border-b border-slate-200 dark:border-slate-800 ${cellBgClass} ${todayBorder} transition-colors group/cal-cell relative">
      <!-- Day Cell Top Header -->
      <div class="flex items-center justify-between gap-1 mb-1 shrink-0">
        <!-- Date Number & Today Pill -->
        <div class="flex items-center gap-1">
          ${isToday ? `
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-msu-maroon dark:bg-rose-600 text-white font-black text-[10px] shadow-2xs leading-none">
              <span>${dayNum}</span>
              <span class="text-[8px] uppercase tracking-wider font-extrabold hidden sm:inline">TODAY</span>
            </span>
          ` : `
            <span class="font-extrabold text-xs sm:text-[13px] ${isCurrentMonth ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-600'} leading-none">${dayNum}</span>
          `}
        </div>

        <!-- Badges & Inspect Button -->
        <div class="flex items-center gap-0.5 overflow-hidden">
          ${isNoClassDate ? `
            <span class="px-1 py-0.2 rounded text-[7.5px] sm:text-[8px] font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800/80 leading-none shrink-0" title="University Class Suspension">No Class</span>
          ` : ''}
          ${calendarEvent && !isNoClassDate ? `
            <span class="px-1 py-0.2 rounded text-[7.5px] sm:text-[8px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 truncate max-w-[65px] leading-none shrink-0" title="${escapeHtml(calendarEvent.activity || '')}">${escapeHtml(calendarEvent.activity || 'Event')}</span>
          ` : ''}

          <!-- Open Day Inspector Quick Link -->
          <button type="button" data-action="openPlannerDayInspector" data-date="${dateKey}" class="p-0.5 rounded hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition opacity-0 group-hover/cal-cell:opacity-100 shrink-0" title="Inspect full schedule for ${dateKey}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
        </div>
      </div>

      <!-- Campus Suspension Banner -->
      ${isNoClassDate ? `
        <div class="py-0.5 px-1 rounded bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 text-center text-[9px] font-bold text-rose-700 dark:text-rose-400 mb-1 select-none">
          🚫 Campus Suspended
        </div>
      ` : ''}

      <!-- 2-Column Vertical Subgrid (AM on Left, PM on Right, No Time Labels) -->
      <div class="calendar-2col-container grid grid-cols-2 gap-1 mt-1 w-full flex-1">
        ${_renderSubgridColumn('AM', dateKey, amClasses, isWeekend, isNoClassDate, isCurrentMonth)}
        ${_renderSubgridColumn('PM', dateKey, pmClasses, isWeekend, isNoClassDate, isCurrentMonth)}
      </div>
    </div>
  `;
}

/**
 * Open the Day Schedule Inspector modal (Strategy 1).
 */
function openPlannerDayInspector(dateKey) {
  if (!dateKey) return;
  activeDayInspectorDate = dateKey;

  const modal = document.getElementById('planner-day-inspector-modal');
  const titleEl = document.getElementById('day-inspector-title');
  const subtitleEl = document.getElementById('day-inspector-subtitle');
  const bannerEl = document.getElementById('day-inspector-banner');
  const listEl = document.getElementById('day-inspector-classes-list');

  if (!modal || !titleEl || !subtitleEl || !listEl) return;

  const dateParts = dateKey.split('-');
  const y = parseInt(dateParts[0], 10);
  const m = parseInt(dateParts[1], 10);
  const d = parseInt(dateParts[2], 10);
  const dObj = new Date(y, m - 1, d);

  const fullDateFormatted = dObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  titleEl.innerText = fullDateFormatted;

  // Resolve day of week & events
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullDay = dayNames[dObj.getDay()];
  const isWeekend = (dObj.getDay() === 0 || dObj.getDay() === 6);

  const semesterEntry = Array.isArray(semesterDates) ? semesterDates.find(entry => entry.dateKey === dateKey) : null;
  const isNoClassDate = semesterEntry ? semesterEntry.isNoClassDate : false;
  const calEvent = (typeof getCalendarEventForDate === 'function')
    ? getCalendarEventForDate(dateKey)
    : (semesterEntry ? semesterEntry.event : null);
  const note = dailyNotes[dateKey] || '';

  // Banner for holidays / suspensions / notes
  if (isNoClassDate || calEvent || note) {
    bannerEl.classList.remove('hidden');
    bannerEl.innerHTML = `
      ${isNoClassDate ? `
        <div class="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-2">
          <svg class="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          <span>University Class Suspension / Holiday</span>
        </div>
      ` : ''}
      ${calEvent && !isNoClassDate ? `
        <div class="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-2">
          <span>★</span>
          <span>${escapeHtml(calEvent.activity || 'Academic Event')}</span>
        </div>
      ` : ''}
      ${note ? `
        <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs italic">
          <strong>Daily Note:</strong> ${escapeHtml(note)}
        </div>
      ` : ''}
    `;
  } else {
    bannerEl.classList.add('hidden');
    bannerEl.innerHTML = '';
  }

  // Gather scheduled classes for this date
  const meetingStats = _calculateCalendarMeetingStats();
  const dayClasses = [];

  if (courseData && Array.isArray(courseData.subjects)) {
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const cellKey = `${dateKey}__${sub.code}__${sec}`;
        const entry = plannerEntries[cellKey];
        const timetableSlot = (weeklyTimetable || []).find(t => t.course === sub.code && t.section === sec && t.day === fullDay);
        const isScheduledToday = !!timetableSlot;
        const isSpecialSession = !isScheduledToday && !!entry;

        if (isWeekend && !isSpecialSession) return;

        if (isScheduledToday || isSpecialSession) {
          const stats = meetingStats[cellKey] || { meetingNum: 0, totalMeetings: 0, meetingsLeft: 0 };
          const isDone = entry && (entry.status === 'Completed' || entry.status === 'Done');
          const isNoClass = entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')));

          dayClasses.push({
            course: sub.code,
            section: sec,
            sub,
            timetableSlot,
            isSpecialSession,
            isScheduledToday,
            entry,
            isDone,
            isNoClass,
            stats,
            cellKey,
            startTime: (entry && entry.startTime) || (timetableSlot && timetableSlot.startTime) || '07:30',
            endTime: (entry && entry.endTime) || (timetableSlot && timetableSlot.endTime) || '09:00',
            room: (entry && entry.room) || (timetableSlot && timetableSlot.room) || '',
            topic: (entry && entry.topic) ? entry.topic.trim() : '',
            activity: (entry && entry.activity) ? entry.activity.trim() : '',
            type: (entry && entry.type) || (isSpecialSession ? 'Makeup Class' : 'Lecture')
          });
        }
      });
    });
  }

  dayClasses.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

  subtitleEl.innerText = `${dayClasses.length} ${dayClasses.length === 1 ? 'Class' : 'Classes'} Scheduled • AY 2026–2027`;

  if (dayClasses.length === 0) {
    listEl.innerHTML = `
      <div class="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
        <div class="text-3xl mb-2">🏖️</div>
        <div class="text-xs font-bold text-slate-700 dark:text-slate-300">No regular classes scheduled for this date</div>
        <p class="text-[11px] text-slate-500 mt-1">You can schedule a special or makeup class by clicking below.</p>
      </div>
    `;
  } else {
    listEl.innerHTML = dayClasses.map(c => {
      const isUnplanned = !c.topic;
      const topicText = c.topic || 'No topic planned yet for this slot';
      const badgeClass = c.sub.headerBg || 'bg-slate-800 text-white';

      let cardBorder = 'border-slate-200 dark:border-slate-700';
      if (c.isNoClass) cardBorder = 'border-rose-300 dark:border-rose-800/80 bg-rose-50/30 dark:bg-rose-950/20';
      else if (c.type === 'Exam') cardBorder = 'border-amber-300 dark:border-amber-800/80 bg-amber-50/30 dark:bg-amber-950/20';

      return `
        <div class="p-3 rounded-xl border ${cardBorder} bg-white dark:bg-slate-800/90 shadow-2xs space-y-2 transition hover:shadow-xs">
          <!-- Class Header Row -->
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded-lg text-xs font-black ${badgeClass} shadow-2xs">${escapeHtml(c.course)} (${escapeHtml(c.section)})</span>
              ${c.stats.meetingNum ? `
                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                  Mtg #${c.stats.meetingNum} of ${c.stats.totalMeetings}
                </span>
                <span class="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  ${c.stats.meetingsLeft} left
                </span>
              ` : ''}
              ${c.isSpecialSession ? `
                <span class="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">⚡ Special Session</span>
              ` : ''}
            </div>

            <!-- Status Badge -->
            <div class="flex items-center gap-1 shrink-0">
              ${c.isDone ? '<span class="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">✓ Done</span>' : ''}
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">${escapeHtml(c.type || 'Lecture')}</span>
            </div>
          </div>

          <!-- Topic & Activity Content -->
          <div class="space-y-0.5">
            <div class="text-xs font-bold text-slate-900 dark:text-slate-100 ${isUnplanned ? 'text-slate-400 dark:text-slate-500 italic' : ''}">
              ${escapeHtml(topicText)}
            </div>
            ${c.activity ? `
              <div class="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                ${escapeHtml(c.activity)}
              </div>
            ` : ''}
          </div>

          <!-- Schedule & Venue + Actions -->
          <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/80 flex-wrap">
            <div class="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <span class="font-semibold">🕒 ${escapeHtml(c.startTime)} - ${escapeHtml(c.endTime)}</span>
              <span>•</span>
              <span class="font-sans">📍 ${escapeHtml(c.room || 'Room unassigned')}</span>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" data-action="copyMatrixActivity" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" class="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-600 transition shadow-2xs inline-flex items-center gap-1 cursor-pointer" title="Copy activity">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
              <button type="button" data-action="pasteMatrixActivity" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" class="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-600 transition shadow-2xs inline-flex items-center gap-1 cursor-pointer" title="Paste copied activity">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                <span>Paste</span>
              </button>
              <button type="button" data-action="openLessonModal" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" data-weekend="${isWeekend ? 'true' : 'false'}" class="h-8 px-3 bg-msu-maroon hover:bg-rose-900 active:scale-95 text-white rounded-xl text-xs font-bold transition shadow-2xs inline-flex items-center gap-1 cursor-pointer" title="Edit lesson plan in modal">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove('hidden');
}

function closePlannerDayInspector() {
  const modal = document.getElementById('planner-day-inspector-modal');
  if (modal) modal.classList.add('hidden');
  activeDayInspectorDate = null;
}

/* ===========================================================================
 * HOVER POPOVER LOGIC (150ms Delay with Subject Title, Topic, Room & Time)
 * ======================================================================== */
let popoverTimer = null;
let activeHoveredPill = null;

function showPlannerPillPopover(pill) {
  if (!pill) return;
  clearTimeout(popoverTimer);
  activeHoveredPill = pill;

  popoverTimer = setTimeout(() => {
    if (activeHoveredPill !== pill) return;
    const popover = document.getElementById('planner-calendar-popover');
    const content = document.getElementById('planner-calendar-popover-content');
    if (!popover || !content) return;

    const course = pill.getAttribute('data-course') || '';
    const section = pill.getAttribute('data-section') || '';
    const subjectTitle = pill.getAttribute('data-subject-title') || course;
    const topic = pill.getAttribute('data-topic') || '';
    const activity = pill.getAttribute('data-activity') || '';
    const room = pill.getAttribute('data-room') || '';
    const startTime = pill.getAttribute('data-start-time') || '';
    const endTime = pill.getAttribute('data-end-time') || '';
    const type = pill.getAttribute('data-type') || 'Lecture';
    const meetingNum = pill.getAttribute('data-meeting-num') || '';
    const meetingsLeft = pill.getAttribute('data-meetings-left') || '';

    content.innerHTML = `
      <div class="border-b border-slate-700/60 pb-1.5">
        <div class="font-black text-xs text-white flex items-center justify-between gap-2">
          <span>${escapeHtml(course)} (${escapeHtml(section)})</span>
          <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-white/10 text-slate-200 shrink-0">${escapeHtml(type)}</span>
        </div>
        <div class="text-[10.5px] text-slate-300 font-semibold truncate mt-0.5">${escapeHtml(subjectTitle)}</div>
      </div>
      <div class="space-y-0.5 text-[10.5px] text-slate-300 pt-0.5">
        <div class="flex items-center gap-1.5 font-medium">
          <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="font-mono">${formatTimeDisplay(startTime)} – ${formatTimeDisplay(endTime)}</span>
        </div>
        ${room ? `
          <div class="flex items-center gap-1.5 font-medium">
            <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Room: <strong class="text-white">${escapeHtml(room)}</strong></span>
          </div>
        ` : ''}
        ${meetingNum ? `
          <div class="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold pt-0.5">
            <span>Mtg #${meetingNum}</span>
            <span class="text-slate-400">•</span>
            <span>${meetingsLeft} left in term</span>
          </div>
        ` : ''}
      </div>
      <div class="pt-1 border-t border-slate-700/60 text-[10.5px]">
        ${topic ? `
          <div class="text-slate-100 font-semibold leading-snug">
            <span class="text-slate-400 font-normal">Topic: </span>${escapeHtml(topic)}
          </div>
        ` : '<div class="text-slate-400 italic">No topic planned yet</div>'}
        ${activity ? `
          <div class="text-slate-300 text-[10px] leading-snug mt-0.5">
            <span class="text-slate-400">Activity: </span>${escapeHtml(activity)}
          </div>
        ` : ''}
      </div>
    `;

    popover.classList.remove('hidden');
    popover.style.opacity = '0';
    popover.style.display = 'block';

    const rect = pill.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    let top = rect.top - popRect.height - 8;
    if (top < 10) {
      top = rect.bottom + 8;
    }
    let left = rect.left + (rect.width / 2) - (popRect.width / 2);
    if (left < 10) left = 10;
    if (typeof window !== 'undefined' && left + popRect.width > window.innerWidth - 10) {
      left = window.innerWidth - popRect.width - 10;
    }

    popover.style.top = `${Math.round(top)}px`;
    popover.style.left = `${Math.round(left)}px`;
    popover.style.opacity = '1';
  }, 150);
}

function hidePlannerPillPopover() {
  clearTimeout(popoverTimer);
  activeHoveredPill = null;
  const popover = document.getElementById('planner-calendar-popover');
  if (popover) {
    popover.classList.add('hidden');
    popover.style.opacity = '0';
  }
}

// Floating popover disabled in favor of in-place expanding cards (matching weekly view)
if (typeof document !== 'undefined') {
  window.addEventListener('scroll', () => hidePlannerPillPopover(), true);
}

/* ===========================================================================
 * "ADD ACTIVITY" MODAL ON EMPTY SLOT CLICK
 * ======================================================================== */
let currentAddActivityContext = null;

function openAddActivityModal(context) {
  if (!context || !context.dateKey) return;
  hidePlannerPillPopover();
  currentAddActivityContext = context;

  const modal = document.getElementById('add-activity-modal');
  if (!modal) return;

  const { dateKey, startTime, endTime, period, unit } = context;

  // Format Subtitle
  const dateParts = dateKey.split('-');
  const y = parseInt(dateParts[0], 10);
  const m = parseInt(dateParts[1], 10);
  const d = parseInt(dateParts[2], 10);
  const dObj = new Date(y, m - 1, d);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullDay = dayNames[dObj.getDay()];
  const isWeekend = (dObj.getDay() === 0 || dObj.getDay() === 6);

  const dateDisplay = dObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const subtitleEl = document.getElementById('add-modal-subtitle');
  if (subtitleEl) {
    subtitleEl.innerText = `${dateDisplay} • ${formatTimeDisplay(startTime)} Slot (${period})`;
  }

  const startTimeEl = document.getElementById('add-modal-start-time');
  const endTimeEl = document.getElementById('add-modal-end-time');
  const topicEl = document.getElementById('add-modal-topic');
  const actEl = document.getElementById('add-modal-activity');
  const notesEl = document.getElementById('add-modal-notes');
  const errorBanner = document.getElementById('add-activity-error-banner');

  if (startTimeEl) startTimeEl.value = startTime || (period === 'AM' ? '07:30' : '13:00');
  if (endTimeEl) endTimeEl.value = endTime || formatMinutesToHHMM((parseTimeToMinutes(startTimeEl.value) || 450) + 60);
  if (topicEl) topicEl.value = '';
  if (actEl) actEl.value = '';
  if (notesEl) notesEl.value = '';
  if (errorBanner) errorBanner.classList.add('hidden');

  // Determine available subjects scheduled on fullDay
  const regularSlots = (Array.isArray(weeklyTimetable) ? weeklyTimetable : []).filter(t => t.day === fullDay);

  const radioRegular = document.getElementById('scope-regular');
  const radioOther = document.getElementById('scope-other');

  if (regularSlots.length > 0 && !isWeekend) {
    if (radioRegular) radioRegular.checked = true;
    _populateAddSubjectSelect('regular', fullDay);
  } else {
    if (radioOther) radioOther.checked = true;
    _populateAddSubjectSelect('other', fullDay);
  }

  // Trigger initial auto-fill
  onAddActivitySubjectSelectChange();

  modal.classList.remove('hidden');
}

function closeAddActivityModal() {
  const modal = document.getElementById('add-activity-modal');
  if (modal) modal.classList.add('hidden');
  currentAddActivityContext = null;
}

function _populateAddSubjectSelect(scope, fullDay) {
  const select = document.getElementById('add-activity-subject-select');
  if (!select) return;

  let optionsHtml = '';

  if (scope === 'regular') {
    const regularSlots = (Array.isArray(weeklyTimetable) ? weeklyTimetable : []).filter(t => t.day === fullDay);
    if (regularSlots.length === 0) {
      optionsHtml = '<option value="" disabled selected>(No subjects scheduled on this weekday)</option>';
    } else {
      regularSlots.forEach(t => {
        const sub = (courseData?.subjects || []).find(s => s.code === t.course);
        const title = sub ? sub.title : t.course;
        optionsHtml += `<option value="${escapeHtml(t.course)}__${escapeHtml(t.section)}">${escapeHtml(t.course)} (${escapeHtml(t.section)}) - ${escapeHtml(title)}</option>`;
      });
    }
  } else {
    // Other Subject / Makeup - all active subjects
    if (courseData && Array.isArray(courseData.subjects)) {
      courseData.subjects.forEach(sub => {
        (sub.sections || []).forEach(sec => {
          optionsHtml += `<option value="${escapeHtml(sub.code)}__${escapeHtml(sec)}">${escapeHtml(sub.code)} (${escapeHtml(sec)}) - ${escapeHtml(sub.title || sub.code)}</option>`;
        });
      });
    }
  }

  select.innerHTML = optionsHtml;
}

function onSubjectScopeRadioChange(e, target) {
  const radio = target || document.querySelector('input[name="add-subject-scope"]:checked');
  const scope = radio ? radio.value : 'regular';

  let fullDay = 'Monday';
  if (currentAddActivityContext && currentAddActivityContext.dateKey) {
    const parts = currentAddActivityContext.dateKey.split('-');
    const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    fullDay = dayNames[dObj.getDay()];
  }

  _populateAddSubjectSelect(scope, fullDay);

  const typeEl = document.getElementById('add-modal-type');
  if (typeEl) {
    typeEl.value = (scope === 'other') ? 'Makeup Class' : 'Lecture';
  }

  onAddActivitySubjectSelectChange();
}

function onAddActivitySubjectSelectChange(e, target) {
  const select = document.getElementById('add-activity-subject-select');
  const roomEl = document.getElementById('add-modal-room');
  const startTimeEl = document.getElementById('add-modal-start-time');
  const endTimeEl = document.getElementById('add-modal-end-time');
  const typeEl = document.getElementById('add-modal-type');

  if (!select || !select.value) return;

  const [course, section] = select.value.split('__');
  if (!course || !section) return;

  let fullDay = '';
  if (currentAddActivityContext && currentAddActivityContext.dateKey) {
    const parts = currentAddActivityContext.dateKey.split('-');
    const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    fullDay = dayNames[dObj.getDay()];
  }

  const timetableSlots = Array.isArray(weeklyTimetable) ? weeklyTimetable : [];
  const slot = timetableSlots.find(t => t.course === course && t.section === section && t.day === fullDay)
    || timetableSlots.find(t => t.course === course && t.section === section);

  // Auto-populate default Room
  if (roomEl && slot && slot.room) {
    roomEl.value = slot.room;
  }

  // Auto-populate standard duration
  if (slot && slot.startTime && slot.endTime && startTimeEl && endTimeEl) {
    const sM = parseTimeToMinutes(slot.startTime);
    const eM = parseTimeToMinutes(slot.endTime);
    if (sM !== null && eM !== null && eM > sM) {
      const dur = eM - sM;
      const curStart = parseTimeToMinutes(startTimeEl.value) ?? 450;
      endTimeEl.value = formatMinutesToHHMM(curStart + dur);
    }
  }

  // Activity type default logic
  const radioOther = document.getElementById('scope-other');
  if (radioOther && radioOther.checked) {
    if (typeEl) typeEl.value = 'Makeup Class';
  } else if (slot && slot.type && typeEl) {
    typeEl.value = slot.type;
  }

  validateAddActivityTimeLive();
}

function validateAddActivityTimeLive() {
  const errorBanner = document.getElementById('add-activity-error-banner');
  const errorText = document.getElementById('add-activity-error-text');
  const startTimeEl = document.getElementById('add-modal-start-time');
  const endTimeEl = document.getElementById('add-modal-end-time');
  const select = document.getElementById('add-activity-subject-select');

  if (!errorBanner || !errorText || !startTimeEl || !endTimeEl) return true;

  const startM = parseTimeToMinutes(startTimeEl.value);
  const endM = parseTimeToMinutes(endTimeEl.value);

  if (startM === null || endM === null) {
    errorText.innerText = 'Please enter valid start and end times.';
    errorBanner.classList.remove('hidden');
    return false;
  }

  if (endM <= startM) {
    errorText.innerText = 'End time must be after start time.';
    errorBanner.classList.remove('hidden');
    return false;
  }

  if (!currentAddActivityContext || !currentAddActivityContext.dateKey) {
    errorBanner.classList.add('hidden');
    return true;
  }

  const { dateKey } = currentAddActivityContext;
  const parts = dateKey.split('-');
  const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullDay = dayNames[dObj.getDay()];
  const isWeekend = (dObj.getDay() === 0 || dObj.getDay() === 6);

  const [selectedCourse, selectedSection] = (select && select.value) ? select.value.split('__') : ['', ''];

  // Check overlap against all classes scheduled in that day's subgrid
  const timetableSlots = Array.isArray(weeklyTimetable) ? weeklyTimetable : [];
  const scheduledToday = timetableSlots.filter(t => t.day === fullDay);

  let conflict = null;

  // 1. Regular timetable slots on this date
  if (!isWeekend) {
    for (const t of scheduledToday) {
      if (t.course === selectedCourse && t.section === selectedSection) continue;
      const cellKey = `${dateKey}__${t.course}__${t.section}`;
      const entry = plannerEntries[cellKey];
      if (entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')))) {
        continue;
      }
      const tStart = parseTimeToMinutes((entry && entry.startTime) || t.startTime);
      const tEnd = parseTimeToMinutes((entry && entry.endTime) || t.endTime);
      if (tStart !== null && tEnd !== null) {
        if (Math.max(startM, tStart) < Math.min(endM, tEnd)) {
          conflict = { course: t.course, section: t.section, start: (entry && entry.startTime) || t.startTime, end: (entry && entry.endTime) || t.endTime };
          break;
        }
      }
    }
  }

  // 2. Out-of-schedule entries in plannerEntries for this date
  if (!conflict) {
    Object.keys(plannerEntries).forEach(k => {
      if (!k.startsWith(`${dateKey}__`)) return;
      const [, cCode, cSec] = k.split('__');
      if (cCode === selectedCourse && cSec === selectedSection) return;
      const entry = plannerEntries[k];
      if (!entry || entry.type === 'No Class') return;
      if (scheduledToday.some(t => t.course === cCode && t.section === cSec)) return;

      const tStart = parseTimeToMinutes(entry.startTime);
      const tEnd = parseTimeToMinutes(entry.endTime);
      if (tStart !== null && tEnd !== null) {
        if (Math.max(startM, tStart) < Math.min(endM, tEnd)) {
          conflict = { course: cCode, section: cSec, start: entry.startTime, end: entry.endTime };
        }
      }
    });
  }

  if (conflict) {
    errorText.innerText = `Time conflict: Overlaps with ${conflict.course} (${conflict.section}) scheduled at ${formatTimeDisplay(conflict.start)} – ${formatTimeDisplay(conflict.end)}.`;
    errorBanner.classList.remove('hidden');
    return false;
  }

  errorBanner.classList.add('hidden');
  return true;
}

function saveAddActivityModal() {
  if (!validateAddActivityTimeLive()) return;

  const select = document.getElementById('add-activity-subject-select');
  if (!select || !select.value) {
    showToast('Please select a subject and section.', '⚠️');
    return;
  }

  const [course, section] = select.value.split('__');
  if (!course || !section || !currentAddActivityContext) return;

  const { dateKey } = currentAddActivityContext;
  const topic = document.getElementById('add-modal-topic')?.value.trim() || '';
  const activity = document.getElementById('add-modal-activity')?.value.trim() || '';
  const type = document.getElementById('add-modal-type')?.value || 'Lecture';
  const status = document.getElementById('add-modal-status')?.value || 'Planned';
  const notes = document.getElementById('add-modal-notes')?.value.trim() || '';
  const startTime = document.getElementById('add-modal-start-time')?.value || '';
  const endTime = document.getElementById('add-modal-end-time')?.value || '';
  const room = document.getElementById('add-modal-room')?.value.trim() || '';

  pushPlannerUndo(`Add Activity: ${course} (${section})`);

  const cellKey = `${dateKey}__${course}__${section}`;
  plannerEntries[cellKey] = {
    topic: topic || `${type}`,
    activity,
    type,
    status,
    notes,
    startTime,
    endTime,
    room
  };

  saveAppState();
  closeAddActivityModal();
  Render.views('planner');
  showToast(`Added ${type} for ${course} (${section}) on ${dateKey}`, '✓');
}

/**
 * Master Planner View coordinator called by VIEWS.matrix in render.js.
 */
function renderPlannerView() {
  initPlannerMonthControls();
  // Always render the matrix table in DOM so smoke-tests, print, and instant switching work
  renderMatrixTable();
  if (plannerViewMode === 'month') {
    renderPlannerMonthCalendar();
  }
  _syncPlannerViewContainers();
}

// Global window assignments
if (typeof window !== 'undefined') {
  window.renderPlannerView = renderPlannerView;
  window.renderPlannerMonthCalendar = renderPlannerMonthCalendar;
  window.initPlannerMonthControls = initPlannerMonthControls;
  window.setPlannerViewMode = setPlannerViewMode;
  window.navigatePlannerMonth = navigatePlannerMonth;
  window.onPlannerMonthSelectChange = onPlannerMonthSelectChange;
  window.onPlannerSectionFilterChange = onPlannerSectionFilterChange;
  window.openPlannerDayInspector = openPlannerDayInspector;
  window.closePlannerDayInspector = closePlannerDayInspector;
  window._calculateCalendarMeetingStats = _calculateCalendarMeetingStats;
  window._syncPlannerViewContainers = _syncPlannerViewContainers;
  window.parseTimeToMinutes = parseTimeToMinutes;
  window.formatMinutesToHHMM = formatMinutesToHHMM;
  window.formatTimeDisplay = formatTimeDisplay;
  window.mapTimeToGridColumn = mapTimeToGridColumn;
  window.mapTimeToGridRow = mapTimeToGridRow;
  window._renderSubgridColumn = _renderSubgridColumn;
  window._renderSubgridRow = _renderSubgridRow;
  window.getSubjectPillStyles = getSubjectPillStyles;
  window.showPlannerPillPopover = showPlannerPillPopover;
  window.hidePlannerPillPopover = hidePlannerPillPopover;
  window.openAddActivityModal = openAddActivityModal;
  window.closeAddActivityModal = closeAddActivityModal;
  window.onSubjectScopeRadioChange = onSubjectScopeRadioChange;
  window.onAddActivitySubjectSelectChange = onAddActivitySubjectSelectChange;
  window.validateAddActivityTimeLive = validateAddActivityTimeLive;
  window.saveAddActivityModal = saveAddActivityModal;
}

