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
 * Render a single calendar cell in the 7-day grid.
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
  const customNote = dailyNotes[dateKey] || '';

  // Gather scheduled classes for this date
  const dayClasses = [];

  if (courseData && Array.isArray(courseData.subjects)) {
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const fullSecKey = `${sub.code} - ${sec}`;
        // Strategy 2: If filtered to a specific section, ignore others
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

  // Cell Background & Text Theme
  let cellBgClass = 'bg-white dark:bg-slate-900';
  if (!isCurrentMonth) {
    cellBgClass = 'bg-slate-50/70 dark:bg-slate-950/60 text-slate-400 dark:text-slate-600';
  } else if (isWeekend) {
    cellBgClass = 'bg-[#f8fafc] dark:bg-[#0f172a]';
  }

  const todayBorder = isToday ? 'ring-2 ring-inset ring-msu-maroon dark:ring-rose-500 shadow-sm z-10' : '';

  // Limit visible classes in cell (Strategy 1: Compact Pills + Popover)
  // If filtered to 1 section, show up to 3; otherwise show up to 2 pills to keep row height uniform
  const maxVisible = (plannerSectionFilter !== 'all' || dayClasses.length <= 2) ? 3 : 2;
  const visibleClasses = dayClasses.slice(0, maxVisible);
  const hiddenCount = Math.max(0, dayClasses.length - maxVisible);

  return `
    <div id="cal-day-${dateKey}" data-date="${dateKey}" class="planner-calendar-cell flex flex-col p-1.5 min-h-[120px] sm:min-h-[135px] border-r border-b border-slate-200 dark:border-slate-800 ${cellBgClass} ${todayBorder} transition-colors group/cal-cell relative">
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

      <!-- Class Pills Container (Strategy 1) -->
      <div class="space-y-1 flex-1 min-h-0 overflow-hidden">
        ${visibleClasses.map(c => {
          const pillBorder = c.sub ? c.sub.headerBg : 'bg-slate-700 text-white';
          const topicDisplay = c.topic || '+ Click to plan';
          const isUnplanned = !c.topic;
          const timeSnippet = c.startTime ? c.startTime.replace(/^0/, '') : '';

          let pillBg = 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700';
          if (c.isNoClass) {
            pillBg = 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/80';
          } else if (c.type === 'Exam') {
            pillBg = 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800/80';
          } else if (c.isSpecialSession) {
            pillBg = 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/80';
          }

          const tooltip = `${c.course} (${c.section}) • ${c.startTime} - ${c.endTime} • ${c.room || 'No Room'}\n${c.stats.meetingNum ? `Meeting #${c.stats.meetingNum} (${c.stats.meetingsLeft} left)\n` : ''}${c.topic || 'No topic planned yet'}`;

          return `
            <div data-action="openLessonModal" data-date="${dateKey}" data-course="${escapeHtml(c.course)}" data-section="${escapeHtml(c.section)}" data-weekend="${isWeekend ? 'true' : 'false'}" class="planner-class-pill flex items-center justify-between gap-1 px-1.5 py-0.5 rounded-md border ${pillBg} cursor-pointer hover:shadow-xs hover:scale-[1.01] active:scale-95 transition select-none" title="${escapeHtml(tooltip)}">
              <div class="flex items-center gap-1 min-w-0 truncate">
                ${c.isDone ? '<span class="text-[8.5px] font-black text-emerald-600 dark:text-emerald-400 shrink-0">✓</span>' : ''}
                <span class="font-extrabold text-[10px] text-slate-900 dark:text-white shrink-0">${escapeHtml(c.course)}</span>
                <span class="text-[8.5px] text-slate-500 dark:text-slate-400 shrink-0">(${escapeHtml(c.section)})</span>
                <span class="text-[9px] ${isUnplanned ? 'text-slate-400 italic' : 'font-medium text-slate-700 dark:text-slate-300'} truncate opacity-90">${escapeHtml(topicDisplay)}</span>
              </div>
              <span class="text-[8.5px] font-mono text-slate-500 dark:text-slate-400 shrink-0">${escapeHtml(timeSnippet)}</span>
            </div>
          `;
        }).join('')}

        <!-- "+X more classes" Badge (Strategy 1) -->
        ${hiddenCount > 0 ? `
          <button type="button" data-action="openPlannerDayInspector" data-date="${dateKey}" class="w-full text-center py-0.5 px-1 rounded-md text-[9.5px] font-bold text-msu-maroon dark:text-rose-300 bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200/90 dark:border-rose-800/70 transition shadow-2xs mt-0.5 flex items-center justify-center gap-1">
            <span>+${hiddenCount} more classes</span>
            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
        ` : ''}

        <!-- Empty slot quick-plan hover affordance if no classes -->
        ${dayClasses.length === 0 && !isNoClassDate && isCurrentMonth && !isWeekend ? `
          <div class="flex-1 flex items-center justify-center opacity-0 group-hover/cal-cell:opacity-100 transition py-1">
            <button type="button" data-action="openPlannerDayInspector" data-date="${dateKey}" class="text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              + Plan
            </button>
          </div>
        ` : ''}
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
}
