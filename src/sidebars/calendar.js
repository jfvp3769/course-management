/* ===========================================================================
 * CALENDAR SIDEBAR
 * ---------------------------------------------------------------------------
 * Upcoming events, event-type distribution and jump-to-event navigation.
 * ======================================================================== */

// 3. Calendar Sidebar Updates & Navigation
function jumpToCalendarEvent(idx) {
  switchTab('calendar');
  if (calendarTypeFilter !== 'all') {
    setCalendarTypeFilter('all');
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const row = document.getElementById('cal-event-row-' + idx);
    const wrapper = document.getElementById('calendar-scroll-wrapper');
    if (row && wrapper) {
      const thead = wrapper.querySelector('thead');
      const theadHeight = thead ? thead.offsetHeight : 42;
      const targetTop = Math.max(0, row.offsetTop - theadHeight);
      wrapper.scrollTo({ top: targetTop, behavior: 'smooth' });

      row.classList.remove('row-flash-highlight');
      void row.offsetWidth;
      row.classList.add('row-flash-highlight');
      setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
      showToast('Highlighted calendar event #' + (idx + 1));
    } else if (row) {
      row.classList.remove('row-flash-highlight');
      void row.offsetWidth;
      row.classList.add('row-flash-highlight');
      setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
    }
  }));
}

function updateCalendarSidebar() {
  // Upcoming Deadlines
  const deadlinesList = document.getElementById('calendar-upcoming-deadlines');
  if (deadlinesList && msuCalendarEvents) {
    const now = (typeof window !== 'undefined' && window._overrideCurrentDate) ? new Date(window._overrideCurrentDate) : new Date();
    now.setHours(0, 0, 0, 0);
    const validDeadlines = msuCalendarEvents.filter(ev => {
      const dStr = ev.dateKey || (ev.firstSem ? parseDateRangeString(ev.firstSem)?.start : '');
      if (!dStr) return false;
      const parts = dStr.split('-').map(Number);
      const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
      const diffDays = Math.round((targetDate - now) / (1000 * 60 * 60 * 24));
      ev._diffDays = diffDays;
      return diffDays >= 0 && diffDays <= 60;
    }).sort((a, b) => a._diffDays - b._diffDays).slice(0, 6);

    if (validDeadlines.length === 0) {
      deadlinesList.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No upcoming events in next 60 days.</div>';
    } else {
      deadlinesList.innerHTML = validDeadlines.map(ev => {
        const originalIdx = msuCalendarEvents.indexOf(ev);
        const title = ev.activity || ev.title || 'University Event';
        const dateStr = ev.firstSem || ev.sem1 || ev.dateKey || '—';
        return `
              <div data-action="jumpToCalendarEvent" data-idx="${originalIdx >= 0 ? originalIdx : 0}" title="Click to view event in calendar table"
                class="p-2 bg-slate-50 dark:bg-[#141d2b] hover:bg-slate-100 dark:hover:bg-[#1a2638] border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg space-y-0.5 cursor-pointer transition-all hover:shadow-2xs group">
                <div class="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[var(--app-header-primary)] dark:group-hover:text-[var(--app-header-accent)] text-[11px] truncate transition-colors">
                  <span class="truncate">${escapeHtml(title)}</span>
                </div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">${escapeHtml(dateStr)}</div>
              </div>
            `;
      }).join('');
    }
  }

  // Lost Days Impact Analysis
  const lostDaysList = document.getElementById('calendar-lost-days-list');
  if (lostDaysList && courseData && courseData.subjects) {
    const noClassDates = new Set();
    const calEventReasons = {};
    if (Array.isArray(msuCalendarEvents)) {
      msuCalendarEvents.forEach(evt => {
        if (evt && evt.isNoClass && evt.dateKey) {
          noClassDates.add(evt.dateKey);
          if (!calEventReasons[evt.dateKey]) {
            calEventReasons[evt.dateKey] = evt.activity || evt.title || 'Academic Calendar Suspension';
          }
        }
      });
    }

    lostDaysBySection = {};
    let items = [];
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const secKey = `${sub.code}__${sec}`;
        const secDays = (weeklyTimetable || [])
          .filter(t => t.course === sub.code && t.section === sec)
          .map(t => t.day);

        let totalMeetings = 0;
        let lostCount = 0;
        const lostDetails = [];

        (semesterDates || []).forEach(d => {
          if (d.isWeekend) return;
          const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
          if (secDays.includes(fullDay)) {
            totalMeetings++;
            const cellKey = `${d.dateKey}__${sub.code}__${sec}`;
            const entry = plannerEntries ? plannerEntries[cellKey] : null;
            const isSuspended = d.isNoClassDate || noClassDates.has(d.dateKey) ||
              (entry && (entry.type === 'No Class' || entry.status === 'Cancelled'));

            if (isSuspended) {
              lostCount++;
              let reason = '';
              if (entry && (entry.reason || entry.notes || entry.topic)) {
                reason = entry.reason || entry.notes || entry.topic;
              } else if (calEventReasons[d.dateKey]) {
                reason = calEventReasons[d.dateKey];
              } else if (d.event && (d.event.activity || d.event.title)) {
                reason = d.event.activity || d.event.title;
              } else if (dailyNotes && dailyNotes[d.dateKey]) {
                reason = dailyNotes[d.dateKey];
              } else if (entry && entry.type === 'No Class') {
                reason = 'Class Suspension';
              } else {
                reason = 'University Suspension / Holiday';
              }

              lostDetails.push({
                dateKey: d.dateKey,
                displayDate: d.displayDate || d.dateKey,
                dayOfWeek: fullDay,
                reason: reason
              });
            }
          }
        });

        lostDetails.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
        lostDaysBySection[secKey] = {
          course: sub.code,
          sec: sec,
          lostCount,
          totalMeetings,
          lostDetails
        };

        const pct = totalMeetings > 0 ? ((lostCount / totalMeetings) * 100).toFixed(1) : '0.0';
        items.push({ course: sub.code, sec, lostCount, totalMeetings, pct });
      });
    });

    if (items.length === 0) {
      lostDaysList.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No subjects or sections configured.</div>';
    } else {
      lostDaysList.innerHTML = `
            <div class="space-y-1.5">
              ${items.map(it => `
                <div data-action="openLostDaysModal" data-course="${escapeHtml(it.course)}" data-section="${escapeHtml(it.sec)}"
                  title="Click to view detailed lost teaching dates for ${escapeHtml(it.course)} (${escapeHtml(it.sec)})"
                  class="p-2 bg-slate-50 dark:bg-[#141d2b] border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-[#1a2638] hover:border-slate-300 dark:hover:border-slate-600 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-all hover:shadow-2xs group shadow-2xs">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="font-bold text-slate-800 dark:text-slate-100 text-[11px] group-hover:text-[var(--app-header-primary)] dark:group-hover:text-[var(--app-header-accent)] transition-colors truncate">${escapeHtml(it.course)} - ${escapeHtml(it.sec)}</span>
                  </div>
                  <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md shrink-0">
                    ${it.lostCount} / ${it.totalMeetings} Days Lost (${it.pct}%)
                  </span>
                </div>
              `).join('')}
            </div>
          `;
    }
  }

  // Event Distribution with Click-to-Filter
  const distCont = document.getElementById('calendar-events-distribution');
  if (distCont && msuCalendarEvents) {
    const counts = { holiday: 0, exam: 0, milestone: 0, activity: 0 };
    msuCalendarEvents.forEach(e => {
      if (counts[e.type] !== undefined) counts[e.type]++;
    });

    const activeFilter = calendarTypeFilter;
    const getFilterBtnStyle = (type, activeColor, baseColor, borderColor) => {
      if (activeFilter === type) {
        return `p-2 ${activeColor} rounded-lg ring-2 ring-inset shadow-xs text-center transition cursor-pointer relative z-10`;
      }
      return `p-2 ${baseColor} rounded-lg border ${borderColor} text-center transition cursor-pointer`;
    };

    distCont.innerHTML = `
          <button type="button" data-action="setCalendarTypeFilter" data-filter="${activeFilter === 'holiday' ? 'all' : 'holiday'}" 
            class="${getFilterBtnStyle('holiday', 'bg-rose-100 dark:bg-[#3b0d1b] ring-rose-500 dark:ring-rose-400', 'bg-rose-50 hover:bg-rose-100/80 dark:bg-[#2d0a14] dark:hover:bg-[#3b0d1b]', 'border-rose-200 dark:border-[#9f1239]')}"
            title="${activeFilter === 'holiday' ? 'Active Filter (Holidays): Click to reset' : 'Filter by Holidays'}">
            <div class="font-black text-rose-800 dark:text-[#fb7185] text-xs">${counts.holiday}</div>
            <div class="text-[10px] text-rose-600 dark:text-[#fda4af] font-semibold flex items-center justify-center gap-0.5">
              <span>Holidays</span>
              <span>${activeFilter === 'holiday' ? '✕' : '🔍'}</span>
            </div>
          </button>
          <button type="button" data-action="setCalendarTypeFilter" data-filter="${activeFilter === 'exam' ? 'all' : 'exam'}" 
            class="${getFilterBtnStyle('exam', 'bg-amber-100 dark:bg-[#3d2205] ring-amber-500 dark:ring-amber-400', 'bg-amber-50 hover:bg-amber-100/80 dark:bg-[#2b1803] dark:hover:bg-[#3d2205]', 'border-amber-200 dark:border-[#b45309]')}"
            title="${activeFilter === 'exam' ? 'Active Filter (Exams): Click to reset' : 'Filter by Exams'}">
            <div class="font-black text-amber-900 dark:text-[#fbbf24] text-xs">${counts.exam}</div>
            <div class="text-[10px] text-amber-700 dark:text-[#fde68a] font-semibold flex items-center justify-center gap-0.5">
              <span>Exams</span>
              <span>${activeFilter === 'exam' ? '✕' : '🔍'}</span>
            </div>
          </button>
          <button type="button" data-action="setCalendarTypeFilter" data-filter="${activeFilter === 'milestone' ? 'all' : 'milestone'}" 
            class="${getFilterBtnStyle('milestone', 'bg-emerald-100 dark:bg-[#093b2c] ring-emerald-500 dark:ring-emerald-400', 'bg-emerald-50 hover:bg-emerald-100/80 dark:bg-[#06291e] dark:hover:bg-[#093b2c]', 'border-emerald-200 dark:border-[#047857]')}"
            title="${activeFilter === 'milestone' ? 'Active Filter (Milestones): Click to reset' : 'Filter by Milestones'}">
            <div class="font-black text-emerald-800 dark:text-[#34d399] text-xs">${counts.milestone}</div>
            <div class="text-[10px] text-emerald-600 dark:text-[#a7f3d0] font-semibold flex items-center justify-center gap-0.5">
              <span>Milestones</span>
              <span>${activeFilter === 'milestone' ? '✕' : '🔍'}</span>
            </div>
          </button>
          <button type="button" data-action="setCalendarTypeFilter" data-filter="${activeFilter === 'activity' ? 'all' : 'activity'}" 
            class="${getFilterBtnStyle('activity', 'bg-blue-100 dark:bg-[#142a4d] ring-blue-500 dark:ring-blue-400', 'bg-blue-50 hover:bg-blue-100/80 dark:bg-[#0e1e38] dark:hover:bg-[#142a4d]', 'border-blue-200 dark:border-[#1d4ed8]')}"
            title="${activeFilter === 'activity' ? 'Active Filter (Activities): Click to reset' : 'Filter by Activities'}">
            <div class="font-black text-blue-900 dark:text-[#60a5fa] text-xs">${counts.activity}</div>
            <div class="text-[10px] text-blue-600 dark:text-[#bfdbfe] font-semibold flex items-center justify-center gap-0.5">
              <span>Activities</span>
              <span>${activeFilter === 'activity' ? '✕' : '🔍'}</span>
            </div>
          </button>
        `;
  }
}
