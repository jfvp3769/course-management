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
  setTimeout(() => {
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
  }, 60);
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
              <div onclick="jumpToCalendarEvent(${originalIdx >= 0 ? originalIdx : 0})" title="Click to view event in calendar table"
                class="p-2 bg-slate-50 hover:bg-rose-50/70 border border-slate-200 hover:border-rose-300 rounded-lg space-y-0.5 cursor-pointer transition group">
                <div class="font-bold text-slate-800 group-hover:text-rose-900 text-[11px] truncate">
                  <span class="truncate">${escapeHtml(title)}</span>
                </div>
                <div class="text-[10px] text-slate-500 font-mono">${escapeHtml(dateStr)}</div>
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
                <div onclick="openLostDaysModal('${jsAttr(it.course)}', '${jsAttr(it.sec)}')"
                  title="Click to view detailed lost teaching dates for ${escapeHtml(it.course)} (${escapeHtml(it.sec)})"
                  class="p-2 ${it.lostCount > 0 ? 'bg-amber-50/70 border-amber-200 hover:bg-amber-100 hover:border-amber-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'} border rounded-lg flex items-center justify-between text-xs cursor-pointer transition group shadow-2xs">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="font-bold text-slate-800 text-[11px] group-hover:text-msu-maroon transition truncate">${escapeHtml(it.course)} - ${escapeHtml(it.sec)}</span>
                  </div>
                  <span class="text-[10px] font-bold ${it.lostCount > 0 ? 'text-amber-900 bg-amber-100' : 'text-slate-600 bg-slate-200'} px-1.5 py-0.5 rounded shrink-0">
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
    const getRing = (type) => (activeFilter === type ? 'ring-2 ring-slate-800 ring-offset-1 shadow-sm' : '');

    distCont.innerHTML = `
          <button onclick="setCalendarTypeFilter('${activeFilter === 'holiday' ? 'all' : 'holiday'}')" 
            class="p-2 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 text-center transition cursor-pointer ${getRing('holiday')}"
            title="Filter by Holidays">
            <div class="font-black text-rose-800 text-xs">${counts.holiday}</div>
            <div class="text-[10px] text-rose-600 font-semibold">Holidays 🔍</div>
          </button>
          <button onclick="setCalendarTypeFilter('${activeFilter === 'exam' ? 'all' : 'exam'}')" 
            class="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 text-center transition cursor-pointer ${getRing('exam')}"
            title="Filter by Exams">
            <div class="font-black text-amber-900 text-xs">${counts.exam}</div>
            <div class="text-[10px] text-amber-700 font-semibold">Exams 🔍</div>
          </button>
          <button onclick="setCalendarTypeFilter('${activeFilter === 'milestone' ? 'all' : 'milestone'}')" 
            class="p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 text-center transition cursor-pointer ${getRing('milestone')}"
            title="Filter by Milestones">
            <div class="font-black text-emerald-800 text-xs">${counts.milestone}</div>
            <div class="text-[10px] text-emerald-600 font-semibold">Milestones 🔍</div>
          </button>
          <button onclick="setCalendarTypeFilter('${activeFilter === 'activity' ? 'all' : 'activity'}')" 
            class="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-center transition cursor-pointer ${getRing('activity')}"
            title="Filter by Activities">
            <div class="font-black text-blue-900 text-xs">${counts.activity}</div>
            <div class="text-[10px] text-blue-600 font-semibold">Activities 🔍</div>
          </button>
        `;
  }
}
