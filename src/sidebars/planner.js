/* ===========================================================================
 * PLANNER SIDEBAR
 * ---------------------------------------------------------------------------
 * Next activities, coverage radar, milestones and lost-day tracking.
 * ======================================================================== */

// 1. Planner Sidebar Updates & Navigation
function jumpToMatrixDate(dateKey, courseCode = '', section = '', isMilestone = false) {
  if (!dateKey) return;

  const plannerContent = document.getElementById('tab-content-planner');
  if (plannerContent && plannerContent.classList.contains('hidden')) {
    switchTab('planner');
  }

  // Preserve teaching radar activities scroll position so jumping does not reset it
  const list = document.getElementById('planner-milestones-list');
  const keptRadarScroll = list ? list.scrollTop : null;

  // Ensure full semester dates are visible if month filter excluded this date
  const parts = dateKey.split('-');
  const month = parts[1];
  if (selectedMonthFilter !== 'all') {
    const monthFilter = document.getElementById('filter-month');
    if (monthFilter) monthFilter.value = 'all';
    selectedMonthFilter = 'all';
    renderMatrixTable();
  }

  // Monthly View Support: Navigate to target month & highlight calendar cell
  const targetYearMonth = `${parts[0]}-${parts[1]}`;
  if (plannerViewMode === 'month' && currentPlannerMonth !== targetYearMonth) {
    currentPlannerMonth = targetYearMonth;
    const monthSelect = document.getElementById('planner-month-select');
    if (monthSelect) monthSelect.value = targetYearMonth;
    if (typeof renderPlannerMonthCalendar === 'function') {
      renderPlannerMonthCalendar();
    }
    saveAppState();
  }

  const calDay = document.getElementById('cal-day-' + dateKey);
  if (calDay) {
    calDay.classList.remove('activity-navigated-highlight');
    void calDay.offsetWidth;
    calDay.classList.add('activity-navigated-highlight');
    setTimeout(() => calDay.classList.remove('activity-navigated-highlight'), 1600);
    if (typeof calDay.scrollIntoView === 'function') {
      calDay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (list && keptRadarScroll !== null) {
    list.scrollTop = keptRadarScroll;
  }

  requestAnimationFrame(() => requestAnimationFrame(() => {
    const wrapper = document.getElementById('matrix-scroll-wrapper');
    const thead = document.getElementById('matrix-head');
    const theadHeight = (thead && typeof thead.offsetHeight === 'number' && !isNaN(thead.offsetHeight)) ? thead.offsetHeight : 86;

    let targetTop = wrapper ? wrapper.scrollTop : 0;
    let targetLeft = wrapper ? wrapper.scrollLeft : 0;

    // 1. Locate the week containing the navigated date
    let targetEntry = semesterDates.find(d => d.dateKey === dateKey);
    let targetWeekNumber = targetEntry ? targetEntry.weekNumber : null;

    if (targetWeekNumber) {
      currentWeekViewIndex = targetWeekNumber;
      const totalWeeks = semesterDates.length > 0 ? semesterDates[0].totalWeeks : 18;
      const navLabel = document.getElementById('current-week-nav-label');
      if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;
      saveAppState();

      // Display the week starting from Sunday at the top row (do NOT bring navigated date to top row)
      const sundayEntry = semesterDates.find(d => d.weekNumber === targetWeekNumber && d.dayOfWeek === 'Sun') ||
                          semesterDates.find(d => d.weekNumber === targetWeekNumber);
      if (sundayEntry) {
        const sundayRow = document.getElementById('row-' + sundayEntry.dateKey);
        if (sundayRow) {
          targetTop = Math.max(0, sundayRow.offsetTop - theadHeight);
        }
      }
    } else {
      // Fallback if week number not found
      const row = document.getElementById('row-' + dateKey);
      if (row) targetTop = Math.max(0, row.offsetTop - theadHeight);
    }

    // 2. Identify the navigated target cell/card for horizontal scroll calculation
    const targetRow = document.getElementById('row-' + dateKey);
    let targetCell = null;
    let targetCard = null;

    if (courseCode && section) {
      const cellKey = dateKey + '__' + courseCode + '__' + section;
      targetCell = document.getElementById('cell-' + cellKey);
      targetCard = document.getElementById('card-' + cellKey);
    } else if (isMilestone) {
      targetCell = document.getElementById('cell-' + dateKey + '__notes');
      targetCard = document.getElementById('card-' + dateKey + '__notes');
    }

    // Fallback: called with only a date, or the exact cell (e.g. a milestone's
    // notes column) is not rendered - aim at the first cell of that row so the
    // horizontal jump still happens instead of silently doing nothing.
    if (!targetCell && targetRow) {
      targetCell = targetRow.querySelector('.matrix-cell-slot') || targetRow.querySelector('[id^="cell-"]');
      if (targetCell) {
        targetCard = targetCell.querySelector('[id^="card-"]') || targetCell.querySelector('div');
      }
    }

    // Horizontal: compare getBoundingClientRect() values (both rects are taken
    // from the same viewport frame, so the delta is exact and immune to the
    // offsetLeft coordinate-space ambiguity inside a scrolled container), then
    // write scrollLeft DIRECTLY rather than smoothly: setupDualScrollbar
    // mirrors scrollLeft to the top scrollbar and a late echo cancels a smooth
    // animation mid-flight, leaving the target off-screen.
    if (targetCell && wrapper) {
      const stickyLeftWidth = 110; // 42px Day + 68px Date sticky columns
      const cellRect = targetCell.getBoundingClientRect();
      const wrapRect = wrapper.getBoundingClientRect();
      const viewLeft = wrapRect.left + stickyLeftWidth;
      const viewRight = wrapRect.right;

      let newScrollLeft = wrapper.scrollLeft;
      if (cellRect.left < viewLeft) {
        newScrollLeft += cellRect.left - viewLeft - 12;
      } else if (cellRect.right > viewRight) {
        newScrollLeft += cellRect.right - viewRight + 24;
      }
      newScrollLeft = Math.max(0, Math.round(newScrollLeft));
      if (newScrollLeft !== wrapper.scrollLeft) {
        wrapper.scrollLeft = newScrollLeft;
      }
    }

    // Vertical: smooth. scrollTop has no mirror to fight it, so this cannot be
    // cancelled; `left` is passed explicitly so the instant horizontal move
    // above is not discarded when the options object is applied.
    if (wrapper) {
      wrapper.scrollTo({ top: targetTop, left: wrapper.scrollLeft, behavior: 'smooth' });
    }

    // 4. Clear any lingering flash highlights before triggering a new one
    document.querySelectorAll('.row-flash-highlight').forEach(r => r.classList.remove('row-flash-highlight'));
    document.querySelectorAll('.day-navigated-highlight').forEach(el => el.classList.remove('day-navigated-highlight'));
    document.querySelectorAll('.activity-navigated-highlight').forEach(el => el.classList.remove('activity-navigated-highlight'));

    // 5. Highlight the navigated date & day badge with automatic removal
    if (targetRow) {
      const dayBadge = targetRow.querySelector('.sticky-col-day span');
      if (dayBadge) {
        void dayBadge.offsetWidth;
        dayBadge.classList.add('day-navigated-highlight');
        setTimeout(() => dayBadge.classList.remove('day-navigated-highlight'), 1400);
      }

      const dateCell = targetRow.querySelector('.sticky-col-date');
      if (dateCell) {
        void dateCell.offsetWidth;
        dateCell.classList.add('day-navigated-highlight');
        setTimeout(() => dateCell.classList.remove('day-navigated-highlight'), 1400);
      }

      void targetRow.offsetWidth;
      targetRow.classList.add('row-flash-highlight');
      setTimeout(() => targetRow.classList.remove('row-flash-highlight'), 1600);
    }

    // 6. Highlight activity card / cell and show toast with automatic removal
    if (targetCell) {
      const elToHighlight = targetCard || targetCell;
      void elToHighlight.offsetWidth;
      elToHighlight.classList.add('activity-navigated-highlight');
      setTimeout(() => elToHighlight.classList.remove('activity-navigated-highlight'), 1400);

      const activityDesc = courseCode ? `${courseCode} (${section})` : (isMilestone ? 'Academic Event' : 'Activity');
      showToast(`Navigated to: ${activityDesc} • ${dateKey}`);
    } else if (targetRow) {
      showToast('Navigated to: ' + dateKey);
    } else {
      showToast('Date ' + dateKey + ' not in current view.', '⚠️');
    }

    if (list && keptRadarScroll !== null) {
      list.scrollTop = keptRadarScroll;
    }
  }));
}

window.jumpToMatrixDate = jumpToMatrixDate;

function setRadarFilter(filter) {
  currentRadarFilter = filter;
  updatePlannerSidebar();
  // A filter change re-scopes the list, so start it at the top on purpose
  // (unlike the passive re-renders, which preserve the scroll via
  // _renderHorizonTimeline).
  const list = document.getElementById('planner-milestones-list');
  if (list) list.scrollTop = 0;
}
if (typeof window !== 'undefined') window.setRadarFilter = setRadarFilter;

function _getRadarActiveSlots(actualNow, now, todayStr, currentSystemDay, currentTotalMinutes) {
  const todaySemesterDate = (typeof semesterDates !== 'undefined' && Array.isArray(semesterDates))
    ? semesterDates.find(d => d.dateKey === todayStr)
    : null;
  const isCampusSuspended = todaySemesterDate ? todaySemesterDate.isNoClassDate : false;

  const activeTodaySlots = [];
  const seenSlotKeys = new Set();

  // A. Evaluate regularly scheduled timetable slots for today
  if (Array.isArray(weeklyTimetable)) {
    const regularSlots = weeklyTimetable.filter(t => t.day === currentSystemDay);
    regularSlots.forEach(s => {
      const cellKey = `${todayStr}__${s.course}__${s.section}`;
      seenSlotKeys.add(cellKey);

      if (isCampusSuspended) return; // Campus holiday / university suspension

      const entry = (typeof plannerEntries === 'object' && plannerEntries !== null)
        ? plannerEntries[cellKey]
        : null;

      if (!entry) return; // Unplanned / no activity scheduled

      const rawTopic = (entry.topic || '').trim();
      const rawActivity = (entry.activity || '').trim();
      const rawType = (entry.type || '').trim();
      const rawStatus = (entry.status || '').trim();
      const topicLower = rawTopic.toLowerCase();
      const actLower = rawActivity.toLowerCase();

      // Exclude cancelled / suspended
      const isNoClass = (rawType === 'No Class') ||
        (rawStatus === 'Cancelled') ||
        topicLower.includes('no class') ||
        actLower.includes('no class') ||
        topicLower.includes('class suspended') ||
        actLower.includes('class suspended') ||
        topicLower.includes('session suspended');

      if (isNoClass) return;

      const hasContent = (rawTopic.length > 0) || (rawActivity.length > 0);
      if (!hasContent) return;

      const isNoActivity = topicLower.includes('no planned activity') ||
        actLower.includes('no planned activity') ||
        topicLower.includes('no activity') ||
        actLower.includes('no activity') ||
        topicLower === 'unplanned';

      if (isNoActivity) return;

      activeTodaySlots.push({
        course: s.course,
        section: s.section,
        startTime: entry.startTime || s.startTime,
        endTime: entry.endTime || s.endTime,
        room: entry.room || s.room || 'TBA',
        type: entry.type || s.type || 'Lecture',
        topic: rawTopic,
        activity: rawActivity,
        notes: entry.notes || '',
        isSpecialSession: false,
        dateKey: todayStr
      });
    });
  }

  // B. Special sessions / makeup classes planned for today in plannerEntries
  if (typeof plannerEntries === 'object' && plannerEntries !== null) {
    Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
      if (!entry) return;
      if (!cellKey.startsWith(todayStr + '__')) return;

      const parts = cellKey.split('__');
      if (parts.length < 3) return;
      const [, course, section] = parts;

      const isRegularSlot = Array.isArray(weeklyTimetable) && weeklyTimetable.some(t => t.day === currentSystemDay && t.course === course && t.section === section);
      if (seenSlotKeys.has(cellKey) || isRegularSlot) return;

      const rawTopic = (entry.topic || '').trim();
      const rawActivity = (entry.activity || '').trim();
      const rawType = (entry.type || '').trim();
      const rawStatus = (entry.status || '').trim();
      const topicLower = rawTopic.toLowerCase();
      const actLower = rawActivity.toLowerCase();

      const isNoClass = (rawType === 'No Class') ||
        (rawStatus === 'Cancelled') ||
        topicLower.includes('no class') ||
        actLower.includes('no class') ||
        topicLower.includes('class suspended') ||
        actLower.includes('class suspended') ||
        topicLower.includes('session suspended');

      if (isNoClass) return;

      const hasContent = (rawTopic.length > 0) || (rawActivity.length > 0);
      if (!hasContent) return;

      const isNoActivity = topicLower.includes('no planned activity') ||
        actLower.includes('no planned activity') ||
        topicLower.includes('no activity') ||
        actLower.includes('no activity');

      if (isNoActivity) return;

      const fallbackSlot = Array.isArray(weeklyTimetable) ? weeklyTimetable.find(t => t.course === course && t.section === section) : null;
      activeTodaySlots.push({
        course,
        section,
        startTime: entry.startTime || (fallbackSlot ? fallbackSlot.startTime : '08:00'),
        endTime: entry.endTime || (fallbackSlot ? fallbackSlot.endTime : '09:30'),
        room: entry.room || (fallbackSlot ? fallbackSlot.room : 'TBA'),
        type: entry.type || (fallbackSlot ? fallbackSlot.type : 'Special Session'),
        topic: rawTopic,
        activity: rawActivity,
        notes: entry.notes || '',
        isSpecialSession: true,
        dateKey: todayStr
      });
    });
  }

  // Sort today's active classes
  activeTodaySlots.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  const remainingToday = activeTodaySlots.filter(s => timeToMinutes(s.endTime) > currentTotalMinutes);
  const upcomingToday = remainingToday[0] || null;

  // C. Lookahead Engine: If classes today have ended or off-day, locate next scheduled meeting across future dates
  let lookaheadClass = null;
  if (!upcomingToday && Array.isArray(semesterDates)) {
    const todayIdx = semesterDates.findIndex(d => d.dateKey === todayStr);
    const startScanIdx = todayIdx >= 0 ? todayIdx + 1 : 0;

    for (let i = startScanIdx; i < semesterDates.length; i++) {
      const fDateObj = semesterDates[i];
      if (!fDateObj) continue;
      const fDateKey = fDateObj.dateKey;
      const fDayName = FULL_DAY_NAMES[fDateObj.dayOfWeek] || fDateObj.dayOfWeek;
      const fIsSuspended = fDateObj.isNoClassDate;

      const candidatesOnDate = [];

      // Check future regular timetable slots
      if (!fIsSuspended && Array.isArray(weeklyTimetable)) {
        const fRegSlots = weeklyTimetable.filter(t => t.day === fDayName);
        fRegSlots.forEach(s => {
          const cellKey = `${fDateKey}__${s.course}__${s.section}`;
          const entry = (typeof plannerEntries === 'object' && plannerEntries !== null) ? plannerEntries[cellKey] : null;
          if (!entry) return;
          const topic = (entry.topic || '').trim();
          const activity = (entry.activity || '').trim();
          const type = (entry.type || '').trim();
          const status = (entry.status || '').trim();
          if (type === 'No Class' || status === 'Cancelled' || topic.toLowerCase().includes('no class') || topic.toLowerCase().includes('class suspended')) return;
          if (!topic && !activity) return;
          if (topic.toLowerCase().includes('no planned activity') || topic.toLowerCase().includes('no activity')) return;

          candidatesOnDate.push({
            course: s.course,
            section: s.section,
            startTime: entry.startTime || s.startTime,
            endTime: entry.endTime || s.endTime,
            room: entry.room || s.room || 'TBA',
            type: entry.type || s.type || 'Lecture',
            topic,
            activity,
            dateKey: fDateKey,
            dayName: fDayName,
            isSpecialSession: false
          });
        });
      }

      // Check future special sessions / makeups
      if (typeof plannerEntries === 'object' && plannerEntries !== null) {
        Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
          if (!entry || !cellKey.startsWith(fDateKey + '__')) return;
          const parts = cellKey.split('__');
          if (parts.length < 3) return;
          const [, cCode, sec] = parts;
          const isRegular = Array.isArray(weeklyTimetable) && weeklyTimetable.some(t => t.day === fDayName && t.course === cCode && t.section === sec);
          if (isRegular) return;

          const topic = (entry.topic || '').trim();
          const activity = (entry.activity || '').trim();
          const type = (entry.type || '').trim();
          const status = (entry.status || '').trim();
          if (type === 'No Class' || status === 'Cancelled' || topic.toLowerCase().includes('no class')) return;
          if (!topic && !activity) return;

          const fallback = Array.isArray(weeklyTimetable) ? weeklyTimetable.find(t => t.course === cCode && t.section === sec) : null;
          candidatesOnDate.push({
            course: cCode,
            section: sec,
            startTime: entry.startTime || (fallback ? fallback.startTime : '08:00'),
            endTime: entry.endTime || (fallback ? fallback.endTime : '09:30'),
            room: entry.room || (fallback ? fallback.room : 'TBA'),
            type: entry.type || (fallback ? fallback.type : 'Special Session'),
            topic,
            activity,
            dateKey: fDateKey,
            dayName: fDayName,
            isSpecialSession: true
          });
        });
      }

      if (candidatesOnDate.length > 0) {
        candidatesOnDate.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
        lookaheadClass = candidatesOnDate[0];
        const fParts = fDateKey.split('-').map(Number);
        const fDate = new Date(fParts[0], fParts[1] - 1, fParts[2]);
        lookaheadClass.diffDays = Math.round((fDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        break;
      }
    }
  }

  return { upcomingToday, lookaheadClass, todayStr, currentTotalMinutes };
}

function _renderRadarDispatchCard(radarData) {
  const { upcomingToday, lookaheadClass, todayStr, currentTotalMinutes } = radarData;
  const dispatchCardEl = document.getElementById('planner-radar-dispatch-card');
  const radarStatusBadge = document.getElementById('planner-radar-status-badge');

  if (!dispatchCardEl) return;

  if (upcomingToday) {
    const startMin = timeToMinutes(upcomingToday.startTime);
    const isOngoing = currentTotalMinutes >= startMin;
    const diffMin = startMin - currentTotalMinutes;

    let countdownText = `${diffMin}m`;
    if (diffMin >= 60) {
      const hrs = Math.floor(diffMin / 60);
      const mins = diffMin % 60;
      countdownText = mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
    }

    if (radarStatusBadge) {
      radarStatusBadge.className = isOngoing
        ? 'text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-white animate-pulse shadow-2xs'
        : 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs';
      radarStatusBadge.innerText = isOngoing
        ? (upcomingToday.isSpecialSession ? '⚡ Special In Progress' : 'Class In Progress')
        : (upcomingToday.isSpecialSession ? `⚡ Special in ${countdownText}` : `Starts in ${countdownText}`);
    }

    const classroomLink = (typeof getClassroomLink === 'function') ? getClassroomLink(upcomingToday.course, upcomingToday.section) : '';
    dispatchCardEl.innerHTML = `
          <div id="planner-radar-active-card"
            class="p-2.5 rounded-xl border ${isOngoing ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100' : (upcomingToday.isSpecialSession ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100' : 'bg-slate-50 dark:bg-[#141d2b] border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100')} space-y-1.5 cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-[#1a2638] hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs group"
            title="${classroomLink ? `Open Google Classroom for ${escapeHtml(upcomingToday.course)} ${escapeHtml(upcomingToday.section)} in new tab` : 'Click to jump to today in matrix'}">
            <div class="flex items-center justify-between gap-1.5">
              <span class="font-black text-xs flex items-center gap-1.5 min-w-0">
                <span class="truncate">${escapeHtml(upcomingToday.course)} (${escapeHtml(upcomingToday.section)})</span>
                ${upcomingToday.isSpecialSession ? '<span class="text-[8px] font-extrabold px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 uppercase tracking-tight shrink-0">⚡ Special</span>' : ''}
                <svg class="w-3.5 h-3.5 ${classroomLink ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} shrink-0 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor" title="${classroomLink ? 'Google Classroom Linked' : 'Google Classroom Not Configured'}">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </span>
              <span class="font-mono font-bold text-[10px] text-slate-600 dark:text-slate-300 shrink-0">${formatTime12(upcomingToday.startTime)} - ${formatTime12(upcomingToday.endTime)}</span>
            </div>
            ${upcomingToday.topic ? `
              <div class="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight break-words" title="${escapeHtml(upcomingToday.topic)}">
                ${escapeHtml(upcomingToday.topic)}
              </div>
            ` : ''}
            ${upcomingToday.activity && upcomingToday.activity !== upcomingToday.topic ? `
              <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate" title="${escapeHtml(upcomingToday.activity)}">
                🎯 ${escapeHtml(upcomingToday.activity)}
              </div>
            ` : ''}
            <div class="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span class="truncate">${escapeHtml(upcomingToday.room || 'TBA')} • ${escapeHtml(upcomingToday.type || 'Lecture')}</span>
              ${classroomLink ? `<span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline shrink-0 ml-1">Classroom ↗</span>` : ''}
            </div>
          </div>
        `;

    const activeCardEl = document.getElementById('planner-radar-active-card');
    if (activeCardEl) {
      activeCardEl.onclick = () => {
        if (classroomLink) {
          window.open(classroomLink, '_blank');
        } else {
          jumpToMatrixDate(todayStr, upcomingToday.course, upcomingToday.section);
        }
      };
    }
  } else if (lookaheadClass) {
    const isTmrw = lookaheadClass.diffDays === 1;
    const dayBadgeText = isTmrw ? 'Tomorrow' : (lookaheadClass.diffDays <= 6 ? lookaheadClass.dayName : lookaheadClass.dateKey);

    if (radarStatusBadge) {
      radarStatusBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      radarStatusBadge.innerText = isTmrw ? 'Next: Tomorrow' : `Next: ${lookaheadClass.dayName.substring(0, 3)}`;
    }

    const classroomLink = (typeof getClassroomLink === 'function') ? getClassroomLink(lookaheadClass.course, lookaheadClass.section) : '';
    dispatchCardEl.innerHTML = `
          <div id="planner-radar-lookahead-card"
            class="p-2.5 rounded-xl border bg-blue-50/60 dark:bg-[#0e1e38] hover:bg-blue-100/70 dark:hover:bg-[#142646] border-blue-200/90 dark:border-blue-800/80 hover:border-blue-300 dark:hover:border-blue-600 text-slate-900 dark:text-slate-100 space-y-1.5 cursor-pointer transition-all hover:shadow-xs group"
            title="Click to jump to ${lookaheadClass.dateKey} in matrix">
            <div class="flex items-center justify-between gap-1.5">
              <span class="font-black text-xs flex items-center gap-1.5 min-w-0">
                <span class="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700 uppercase tracking-tight shrink-0">Next Up</span>
                <span class="truncate">${escapeHtml(lookaheadClass.course)} (${escapeHtml(lookaheadClass.section)})</span>
                ${lookaheadClass.isSpecialSession ? '<span class="text-[8px] font-extrabold px-1 rounded bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 uppercase shrink-0">⚡ Special</span>' : ''}
              </span>
              <span class="font-mono font-bold text-[10px] text-blue-900 dark:text-blue-300 shrink-0">${formatTime12(lookaheadClass.startTime)}</span>
            </div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
              <span>📅 ${dayBadgeText} (${lookaheadClass.dateKey})</span>
              <span>• Rm ${escapeHtml(lookaheadClass.room || 'TBA')}</span>
            </div>
            ${lookaheadClass.topic ? `
              <div class="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight truncate" title="${escapeHtml(lookaheadClass.topic)}">
                ${escapeHtml(lookaheadClass.topic)}
              </div>
            ` : ''}
            <div class="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 pt-0.5">
              <span class="text-blue-700 dark:text-blue-400 font-semibold group-hover:underline">View in Matrix ➔</span>
              ${classroomLink ? `<a href="${classroomLink}" target="_blank" data-action="noop" data-stop-propagation="true" class="font-bold text-emerald-700 dark:text-emerald-400 hover:underline">Classroom ↗</a>` : ''}
            </div>
          </div>
        `;

    const lookaheadCardEl = document.getElementById('planner-radar-lookahead-card');
    if (lookaheadCardEl) {
      lookaheadCardEl.onclick = () => {
        jumpToMatrixDate(lookaheadClass.dateKey, lookaheadClass.course, lookaheadClass.section);
      };
    }
  } else {
    if (radarStatusBadge) {
      radarStatusBadge.className = 'text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
      radarStatusBadge.innerText = 'Term Done';
    }
    dispatchCardEl.innerHTML = `
          <div class="p-3 bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center text-slate-500 dark:text-slate-400 text-[11px] space-y-1">
            <div class="font-bold text-slate-700 dark:text-slate-200">🎉 No more scheduled classes</div>
            <div class="text-[10px] text-slate-400 dark:text-slate-500">All planned classes for this term have concluded.</div>
          </div>
        `;
  }
}

function _updateRadarFilterPills() {
  const pillsContainer = document.getElementById('planner-radar-filter-pills');
  if (!pillsContainer) return;
  const pillButtons = pillsContainer.querySelectorAll('button[data-radar-filter]');
  pillButtons.forEach(btn => {
    const f = btn.getAttribute('data-radar-filter');
    const isSelected = (f === currentRadarFilter);
    if (isSelected) {
      btn.className = 'radar-filter-pill app-themed-btn-primary px-2 py-0.5 text-[10px] font-bold rounded-md bg-msu-maroon text-white transition shadow-2xs';
    } else {
      btn.className = 'radar-filter-pill px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition';
    }
  });
}

function _getHorizonTimelineEvents(now, todayStr, currentTotalMinutes, dayNames) {
  const upcomingItems = [];

  // 1. Planned activities from Schedule & Activity Matrix
  if (typeof plannerEntries === 'object' && plannerEntries !== null) {
    Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
      if (!entry) return;
      if (entry.status === 'Completed' || entry.status === 'Cancelled') return;

      const parts = cellKey.split('__');
      if (parts.length < 3) return;
      const [dateKey, course, section] = parts;

      const topic = (entry.topic || '').trim();
      const activity = (entry.activity || '').trim();
      const type = entry.type || entry.activityType || 'Lecture';

      if (!topic && !activity && type !== 'No Class') return;

      const dateParts = dateKey.split('-').map(Number);
      let targetDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      if (isNaN(targetDate.getTime())) return;

      const diffDays = Math.round((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 0 || diffDays > 30) return;

      const targetDayName = dayNames[targetDate.getDay()];
      let slot = null;
      if (Array.isArray(weeklyTimetable)) {
        slot = weeklyTimetable.find(t => t.course === course && t.section === section && t.day === targetDayName);
        if (!slot) {
          slot = weeklyTimetable.find(t => t.course === course && t.section === section);
        }
      }

      const startTime = entry.startTime || (slot ? slot.startTime : '');
      const endTime = entry.endTime || (slot ? slot.endTime : '');
      const room = entry.room || (slot ? slot.room : '');

      // Remove if class on today has already passed
      if (diffDays === 0 && endTime) {
        const endMin = timeToMinutes(endTime);
        if (endMin > 0 && currentTotalMinutes > endMin) {
          return;
        }
      }

      upcomingItems.push({
        source: 'matrix',
        dateKey,
        targetDate,
        diffDays,
        course,
        section,
        type,
        startTime,
        endTime,
        room,
        topic: topic || (type === 'No Class' ? 'No Class Scheduled' : (activity || 'Class Session')),
        activity: activity,
        notes: entry.notes || '',
        status: entry.status || 'Planned',
        isSchoolMilestone: false
      });
    });
  }

  // 2. School Calendar Milestones & Major University Events
  if (Array.isArray(msuCalendarEvents)) {
    msuCalendarEvents.forEach(evt => {
      if (!evt) return;
      let targetDate = null;
      let dateKey = evt.dateKey || '';

      if (dateKey) {
        const dParts = dateKey.split('-').map(Number);
        targetDate = new Date(dParts[0], dParts[1] - 1, dParts[2]);
      } else if (evt.firstSem || evt.sem1) {
        const text = evt.firstSem || evt.sem1 || '';
        const dateMatch = text.match(/(\w+\s+\d+)/);
        if (dateMatch) {
          const year = semesterConfig.academicYear ? semesterConfig.academicYear.substring(0, 4) : '2026';
          targetDate = new Date(dateMatch[1] + ', ' + year);
          if (!isNaN(targetDate.getTime())) {
            const mStr = String(targetDate.getMonth() + 1).padStart(2, '0');
            const dStr = String(targetDate.getDate()).padStart(2, '0');
            dateKey = `${targetDate.getFullYear()}-${mStr}-${dStr}`;
          }
        }
      }

      if (!targetDate || isNaN(targetDate.getTime())) return;
      targetDate.setHours(0, 0, 0, 0);

      const diffDays = Math.round((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 0 || diffDays > 30) return;

      const evtStartTime = evt.startTime || '';
      const evtEndTime = evt.endTime || '';

      if (diffDays === 0 && evtEndTime) {
        const endMin = timeToMinutes(evtEndTime);
        if (endMin > 0 && currentTotalMinutes > endMin) return;
      }

      const isMilestone = (evt.type === 'milestone' || evt.type === 'exam' || evt.type === 'holiday' || evt.isNoClass);
      if (!isMilestone) return;

      upcomingItems.push({
        source: 'calendar',
        dateKey,
        targetDate,
        diffDays,
        type: evt.type || 'milestone',
        startTime: evtStartTime,
        endTime: evtEndTime,
        topic: evt.activity || evt.title || 'Academic Milestone',
        activity: evt.firstSem || evt.sem1 || dateKey || '',
        isNoClass: !!evt.isNoClass,
        isSchoolMilestone: true
      });
    });
  }

  // Sort chronologically
  upcomingItems.sort((a, b) => {
    if (a.dateKey !== b.dateKey) {
      return a.dateKey.localeCompare(b.dateKey);
    }
    const aTime = a.startTime ? timeToMinutes(a.startTime) : (a.isSchoolMilestone ? -1 : 9999);
    const bTime = b.startTime ? timeToMinutes(b.startTime) : (b.isSchoolMilestone ? -1 : 9999);
    if (aTime !== bTime) {
      return aTime - bTime;
    }
    if (a.isSchoolMilestone && !b.isSchoolMilestone) return -1;
    if (!a.isSchoolMilestone && b.isSchoolMilestone) return 1;
    return (a.course || '').localeCompare(b.course || '');
  });

  // Filter items according to currentRadarFilter
  let filteredItems = upcomingItems;
  if (currentRadarFilter === 'today') {
    filteredItems = upcomingItems.filter(item => item.diffDays === 0);
  } else if (currentRadarFilter === 'week') {
    filteredItems = upcomingItems.filter(item => item.diffDays >= 0 && item.diffDays <= 7);
  } else if (currentRadarFilter === 'milestones') {
    filteredItems = upcomingItems.filter(item => item.isSchoolMilestone || item.type === 'Exam' || item.type === 'Quiz' || item.type === 'No Class');
  }

  return filteredItems.slice(0, 15);
}

function _formatRadarDate(dateKey) {
  if (!dateKey) return '';
  if (typeof semesterDates !== 'undefined' && Array.isArray(semesterDates)) {
    const matched = semesterDates.find(d => d.dateKey === dateKey);
    if (matched && matched.displayDate && matched.dayOfWeek) {
      return `${matched.dayOfWeek}, ${matched.displayDate}`;
    }
  }
  const parts = dateKey.split('-').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (!isNaN(d.getTime())) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${days[d.getDay()]}, ${d.getDate()}-${months[d.getMonth()]}`;
    }
  }
  return dateKey;
}

function _formatRadarTime(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  let h = parseInt(parts[0], 10);
  const m = parts[1] || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function _renderHorizonTimeline(displayList, currentTotalMinutes) {
  const nextActivitiesList = document.getElementById('planner-milestones-list');
  if (!nextActivitiesList) return;

  // Replacing a scroll container's innerHTML resets scrollTop to 0, and this
  // runs on every clock tick and every switchTab('planner') - which is what
  // snapped the radar back to the top after each jump click. Hold the position
  // across the repaint and let the browser clamp it to the new content height.
  const keptScrollTop = nextActivitiesList.scrollTop;

  if (displayList.length === 0) {
    let emptyText = 'No activities scheduled in the next 30 days.';
    if (currentRadarFilter === 'today') emptyText = 'No remaining classes or activities scheduled for today.';
    else if (currentRadarFilter === 'week') emptyText = 'No more activities scheduled for this week.';
    else if (currentRadarFilter === 'milestones') emptyText = 'No upcoming exams or university milestones.';

    const emptyHtml = `
          <div class="text-slate-400 italic text-[11px] py-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            ${emptyText}<br><span class="text-[10px] text-slate-400">Add lessons, quizzes, or exams in the matrix.</span>
          </div>
        `;
    if (nextActivitiesList.innerHTML !== emptyHtml) {
      nextActivitiesList.innerHTML = emptyHtml;
    }
    nextActivitiesList.scrollTop = keptScrollTop;
    requestAnimationFrame(() => {
      if (nextActivitiesList) nextActivitiesList.scrollTop = keptScrollTop;
    });
    return;
  }

  const newHtml = displayList.map(item => {
    let daysBadge = '';
    if (item.diffDays === 0) {
      const startMin = item.startTime ? timeToMinutes(item.startTime) : 0;
      const endMin = item.endTime ? timeToMinutes(item.endTime) : 0;
      const isOngoing = startMin > 0 && endMin > 0 && currentTotalMinutes >= startMin && currentTotalMinutes <= endMin;

      if (isOngoing) {
        daysBadge = `<span class="inline-flex items-center justify-center text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-white shadow-2xs shrink-0 animate-pulse leading-none">Now</span>`;
      } else {
        daysBadge = `<span class="inline-flex items-center justify-center text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0 shadow-2xs leading-none">Today</span>`;
      }
    } else if (item.diffDays === 1) {
      daysBadge = `<span class="inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 shrink-0 leading-none">Tmrw</span>`;
    } else {
      daysBadge = `<span class="inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0 leading-none">${item.diffDays}d left</span>`;
    }

    const cursorClass = item.dateKey ? 'cursor-pointer hover:shadow-xs transition' : '';

    // School Calendar Milestone card
    if (item.isSchoolMilestone) {
      const clickAttr = item.dateKey ? `data-action="jumpToMatrixDate" data-date="${escapeHtml(item.dateKey)}" data-is-school="true"` : '';
      let milestoneTypeLabel = 'School Milestone';
      let milestoneBg = 'bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 dark:from-[#2b1803] dark:to-[#382005] border-2 border-amber-300 dark:border-amber-700 ring-1 ring-amber-200/60 dark:ring-amber-900/40 shadow-2xs text-amber-900 dark:text-amber-200';
      if (item.type === 'exam') {
        milestoneTypeLabel = 'Major Exam Period';
      } else if (item.type === 'holiday' || item.isNoClass) {
        milestoneTypeLabel = 'University Holiday / No Class';
      }

      const milestoneDate = _formatRadarDate(item.dateKey) || item.activity;

      return `
            <div ${clickAttr} title="${item.dateKey ? 'Click to view event in matrix' : ''}"
              class="px-2.5 py-1.5 rounded-xl ${milestoneBg} space-y-1 ${cursorClass}">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5 min-w-0 flex-wrap">
                  <span class="inline-flex items-center justify-center text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 gap-1 shrink-0 leading-none">
                    ⭐ ${milestoneTypeLabel}
                  </span>
                  <span class="text-[10px] font-bold text-amber-800 dark:text-amber-300 leading-none">${escapeHtml(milestoneDate)}</span>
                </div>
                ${daysBadge}
              </div>
              <div class="font-bold text-slate-900 dark:text-amber-100 text-xs leading-snug break-words">
                <span>${escapeHtml(item.topic)}</span>
              </div>
            </div>
          `;
    }

    // Planned Matrix Activity card
    const clickAttr = item.dateKey ? `data-action="jumpToMatrixDate" data-date="${escapeHtml(item.dateKey)}" data-course="${escapeHtml(item.course || '')}" data-section="${escapeHtml(item.section || '')}"` : '';
    let typeColor = 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    if (item.type === 'Quiz') {
      typeColor = 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    } else if (item.type === 'Exam') {
      typeColor = 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    } else if (item.type === 'Laboratory') {
      typeColor = 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    } else if (item.type === 'No Class') {
      typeColor = 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    } else if (item.type === 'Makeup Class' || item.type === 'Special Session') {
      typeColor = 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    }

    const typeBadge = `<span class="inline-flex items-center justify-center text-[9.5px] font-bold px-1.5 py-0.5 rounded ${typeColor} border shrink-0 leading-none">${escapeHtml(item.type)}</span>`;

    // Simplified single-line schedule details (no bulky badge boxes or raw ISO date)
    const detailParts = [];
    const dateLabel = _formatRadarDate(item.dateKey);
    if (dateLabel) detailParts.push(escapeHtml(dateLabel));
    const timeLabel = _formatRadarTime(item.startTime);
    if (timeLabel) detailParts.push(escapeHtml(timeLabel));
    if (item.room) detailParts.push(`Rm ${escapeHtml(item.room)}`);

    const detailsHtml = detailParts.length > 0 ? `
          <div class="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[10.5px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">
            ${detailParts.map((part, idx) => `
              ${idx > 0 ? '<span class="opacity-30 select-none">•</span>' : ''}
              <span>${part}</span>
            `).join('')}
          </div>
        ` : '';

    return `
          <div ${clickAttr} title="${item.dateKey ? 'Click to jump to ' + item.dateKey + ' in matrix' : ''}"
            class="px-2.5 py-1.5 bg-slate-50 dark:bg-[#141d2b] hover:bg-slate-100 dark:hover:bg-[#1a2638] rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-2xs space-y-1 transition-all group ${cursorClass}">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 truncate leading-none">
                  ${escapeHtml(item.course)} (${escapeHtml(item.section)})
                </span>
                ${typeBadge}
              </div>
              ${daysBadge}
            </div>
            <div class="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[var(--app-header-primary)] dark:group-hover:text-[var(--app-header-accent)] text-xs leading-snug break-words transition-colors">
              <span>${escapeHtml(item.topic)}</span>
            </div>
            ${item.activity && item.activity !== item.topic ? `<div class="text-[10.5px] text-slate-400 dark:text-slate-500 italic truncate">${escapeHtml(item.activity)}</div>` : ''}
            ${detailsHtml}
          </div>
        `;
  }).join('');
  if (nextActivitiesList.innerHTML !== newHtml) {
    nextActivitiesList.innerHTML = newHtml;
  }
  // ...and restore the position for the populated branch too.
  nextActivitiesList.scrollTop = keptScrollTop;
  requestAnimationFrame(() => {
    if (nextActivitiesList) nextActivitiesList.scrollTop = keptScrollTop;
  });
}

function _renderTeachingPacingStats(todayStr, currentTotalMinutes) {
  // =========================================================
  // 2. TEACHING DAYS DISTRIBUTION (Unified Single Source of Truth)
  // =========================================================
  const pacingStats = document.getElementById('planner-pacing-stats');
  const pacingPctBadge = document.getElementById('planner-pacing-pct-badge');

  if (pacingStats && Array.isArray(semesterDates) && semesterDates.length > 0) {
    const stats = calculateTeachingDaysStats();

    if (pacingPctBadge) {
      pacingPctBadge.textContent = stats.termElapsedPct.toFixed(2) + '% Term Elapsed';
    }

    pacingStats.innerHTML = `
          <div class="p-2 bg-slate-50 dark:bg-[#141d2b] rounded-lg border border-slate-200 dark:border-slate-700">
            <div class="text-sm font-black text-slate-900 dark:text-slate-100">${stats.totalTeachingDays}</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Teaching Days</div>
          </div>
          <div class="p-2 bg-emerald-50 dark:bg-[#062d22] rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div class="text-sm font-black text-emerald-800 dark:text-emerald-400">${stats.heldTeachingDays}</div>
            <div class="text-[10px] text-emerald-600 dark:text-emerald-200 font-semibold">Held / Conducted</div>
          </div>
          <div class="p-2 bg-rose-50 dark:bg-[#3b0712] rounded-lg border border-rose-200 dark:border-rose-700">
            <div class="text-sm font-black text-rose-800 dark:text-rose-400">${stats.noClassDays}</div>
            <div class="text-[10px] text-rose-600 dark:text-rose-200 font-semibold">No Class / Off</div>
          </div>
          <div class="p-2 bg-amber-50 dark:bg-[#2e1a05] rounded-lg border border-amber-200 dark:border-amber-700">
            <div class="text-sm font-black text-amber-900 dark:text-amber-400">${stats.remainingDays}</div>
            <div class="text-[10px] text-amber-700 dark:text-amber-200 font-semibold">Remaining Days</div>
          </div>
        `;
  }

  const subjectPaceList = document.getElementById('planner-subject-pace-list');
  if (subjectPaceList && courseData && courseData.subjects) {
    const noClassDates = new Set();
    if (Array.isArray(msuCalendarEvents)) {
      msuCalendarEvents.forEach(evt => {
        if (evt && evt.isNoClass && evt.dateKey) noClassDates.add(evt.dateKey);
      });
    }

    let paceItems = [];
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const secSlots = (weeklyTimetable || []).filter(t => t.course === sub.code && t.section === sec);
        const secDays = secSlots.map(t => t.day);

        let totalMtgs = 0;
        let doneMtgs = 0;

        (semesterDates || []).forEach(d => {
          if (d.isWeekend) return;
          const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
          if (!secDays.includes(fullDay)) return;

          const cellKey = `${d.dateKey}__${sub.code}__${sec}`;
          const entry = plannerEntries ? plannerEntries[cellKey] : null;
          const isSuspended = d.isNoClassDate || noClassDates.has(d.dateKey) ||
            (entry && (entry.type === 'No Class' || entry.status === 'Cancelled'));

          if (isSuspended) return;

          totalMtgs++;

          const slot = secSlots.find(s => s.day === fullDay);
          const endMin = slot && slot.endTime ? timeToMinutes(slot.endTime) : 0;
          const isPastDate = d.dateKey < todayStr;
          const isPastTimeToday = (d.dateKey === todayStr) && (endMin > 0 ? currentTotalMinutes >= endMin : true);
          const isCompleted = (entry && entry.status === 'Completed') || isPastDate || isPastTimeToday;

          if (isCompleted) doneMtgs++;
        });

        const pct = totalMtgs > 0 ? ((doneMtgs / totalMtgs) * 100).toFixed(1) : '0.0';
        paceItems.push({ course: sub.code, sec, doneMtgs, totalMtgs, pct, color: sub.color || 'bg-blue-600' });
      });
    });

    if (paceItems.length === 0) {
      subjectPaceList.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No sections configured.</div>';
    } else {
      subjectPaceList.innerHTML = paceItems.map(it => `
            <div class="p-2 bg-slate-50 dark:bg-[#141d2b] hover:bg-slate-100 dark:hover:bg-[#1a2638] border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg space-y-1 transition-all">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800 dark:text-slate-100 text-[11px]">${escapeHtml(it.course)} (${escapeHtml(it.sec)})</span>
                <span class="font-mono text-[10px] font-bold text-indigo-700 dark:text-indigo-300">${it.doneMtgs} / ${it.totalMtgs} mtgs (${it.pct}%)</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300" style="width: ${it.pct}%"></div>
              </div>
            </div>
          `).join('');
    }
  }
}

function updatePlannerSidebar() {
  const sidebar = document.getElementById('sidebar-planner');
  const plannerTab = document.getElementById('tab-content-planner');
  if (!sidebar || sidebar.classList.contains('tab-sidebar-collapsed') || (plannerTab && plannerTab.classList.contains('hidden'))) {
    if (typeof window !== 'undefined') window._plannerSidebarStale = true;
    return;
  }
  if (typeof window !== 'undefined') window._plannerSidebarStale = false;

  const actualNow = (typeof window !== 'undefined' && window._overrideCurrentDate)
    ? new Date(window._overrideCurrentDate)
    : new Date();
  const currentHours = actualNow.getHours();
  const currentMinutes = actualNow.getMinutes();
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  const now = new Date(actualNow.getFullYear(), actualNow.getMonth(), actualNow.getDate());
  const nowYear = now.getFullYear();
  const nowMonth = String(now.getMonth() + 1).padStart(2, '0');
  const nowDay = String(now.getDate()).padStart(2, '0');
  const todayStr = `${nowYear}-${nowMonth}-${nowDay}`;
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentSystemDay = dayNames[actualNow.getDay()];

  // 1. Teaching Radar (Live Dispatch & Lookahead)
  const radarData = _getRadarActiveSlots(actualNow, now, todayStr, currentSystemDay, currentTotalMinutes);
  _renderRadarDispatchCard(radarData);
  _updateRadarFilterPills();

  // 2. Horizon Timeline
  const horizonEvents = _getHorizonTimelineEvents(now, todayStr, currentTotalMinutes, dayNames);
  _renderHorizonTimeline(horizonEvents, currentTotalMinutes);

  initDraggableSidebarWidgets('sidebar-planner');

  // 3. Pacing & Progress
  _renderTeachingPacingStats(todayStr, currentTotalMinutes);
}
if (typeof window !== 'undefined') window.updatePlannerSidebar = updatePlannerSidebar;
