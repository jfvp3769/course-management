/* ===========================================================================
 * TIMETABLE SIDEBAR
 * ---------------------------------------------------------------------------
 * Teaching load, schedule conflicts and the daily agenda.
 * ======================================================================== */

// 2. Timetable Sidebar Updates & Daily Agenda

function setAgendaDay(day) {
  activeAgendaDay = day;
  updateTimetableSidebar();
}

function highlightTimetableClass(course, section, day) {
  switchTab('timetable');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const cardId = 'timetable-card-' + String(course).replace(/\s+/g, '_') + '-' + String(section).replace(/\s+/g, '_') + '-' + day;
    const card = document.getElementById(cardId);
    const wrapper = document.getElementById('timetable-scroll-wrapper');
    const col = document.getElementById('timetable-col-' + day);

    if (wrapper && col) {
      const targetLeft = Math.max(0, col.offsetLeft - 90);
      wrapper.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    if (card) {
      card.classList.remove('activity-navigated-highlight');
      void card.offsetWidth;
      card.classList.add('activity-navigated-highlight');
      setTimeout(() => card.classList.remove('activity-navigated-highlight'), 2200);
      showToast('Located ' + course + ' (' + section + ') on ' + day);
    }
  }));
}

function updateTimetableSidebar() {
  const loadStats = document.getElementById('timetable-load-stats');
  const loadBadge = document.getElementById('timetable-load-badge');
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = (typeof window !== 'undefined' && window._overrideCurrentDate) ? new Date(window._overrideCurrentDate) : new Date();
  const currentSystemDay = allDays[now.getDay()];
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
  const nowYear = now.getFullYear();
  const nowMonth = String(now.getMonth() + 1).padStart(2, '0');
  const nowDay = String(now.getDate()).padStart(2, '0');
  const todayDateKey = `${nowYear}-${nowMonth}-${nowDay}`;

  // Contact hours calculation
  let totalMinutes = 0;
  const dayMinutes = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };
  weeklyTimetable.forEach(t => {
    const startM = timeToMinutes(t.startTime);
    const endM = timeToMinutes(t.endTime);
    if (endM > startM) {
      const dur = endM - startM;
      totalMinutes += dur;
      if (dayMinutes[t.day] !== undefined) dayMinutes[t.day] += dur;
    }
  });
  const hours = (totalMinutes / 60).toFixed(1);
  if (loadBadge) loadBadge.innerText = hours + ' Hrs/Wk';

  if (loadStats) {
    loadStats.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="text-slate-600 dark:text-slate-400 font-semibold">Weekly Contact Hours:</span>
            <span class="font-bold text-slate-900 dark:text-slate-100 text-sm">${hours} hrs / week</span>
          </div>
        `;
  }

  // Peak Teaching Hours / Daily Distribution Meter
  const distEl = document.getElementById('timetable-daily-distribution');
  if (distEl) {
    const maxDayMin = Math.max(1, ...Object.values(dayMinutes));
    distEl.innerHTML = `
          <div class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Daily Distribution:</div>
          ${weekDays.map(d => {
        const mins = dayMinutes[d];
        const dayHrs = (mins / 60).toFixed(1);
        const barPct = Math.round((mins / maxDayMin) * 100);
        return `
              <div class="flex items-center gap-2 text-[10px]">
                <span class="w-7 font-semibold text-slate-600 dark:text-slate-300">${d.substring(0, 3)}</span>
                <div class="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div class="h-full rounded-full ${mins > 0 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-transparent'}" style="width: ${barPct}%"></div>
                </div>
                <span class="font-bold w-9 text-right text-slate-700 dark:text-slate-200">${dayHrs}h</span>
              </div>
            `;
      }).join('')}
        `;
  }

  // Conflict Auditor
  const conflictCont = document.getElementById('timetable-conflicts-container');
  if (conflictCont && weeklyTimetable) {
    const conflicts = [];
    for (let i = 0; i < weeklyTimetable.length; i++) {
      for (let j = i + 1; j < weeklyTimetable.length; j++) {
        const a = weeklyTimetable[i];
        const b = weeklyTimetable[j];
        if (a.day === b.day && a.room && b.room && a.room.trim().toLowerCase() === b.room.trim().toLowerCase()) {
          const aStart = timeToMinutes(a.startTime);
          const aEnd = timeToMinutes(a.endTime);
          const bStart = timeToMinutes(b.startTime);
          const bEnd = timeToMinutes(b.endTime);
          if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
            conflicts.push({ day: a.day, room: a.room, a: a.course + ' (' + a.section + ')', b: b.course + ' (' + b.section + ')' });
          }
        }
      }
    }

    if (conflicts.length === 0) {
      conflictCont.innerHTML = `
            <div class="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-lg flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
              <span class="text-emerald-600 dark:text-emerald-400">✓</span>
              <span>0 Room / Schedule Conflicts Detected</span>
            </div>
          `;
    } else {
      conflictCont.innerHTML = conflicts.map(c => `
            <div class="p-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/80 rounded-lg text-rose-900 dark:text-rose-200 text-[11px] space-y-1 mb-1.5">
              <div class="font-extrabold text-rose-800 dark:text-rose-300">⚠️ Room Conflict: ${escapeHtml(c.room)}</div>
              <div class="text-slate-700 dark:text-slate-300">${c.day}: ${escapeHtml(c.a)} overlaps with ${escapeHtml(c.b)}</div>
            </div>
          `).join('');
    }
  }

  // Today's Agenda & Weekday Picker
  const todayAgenda = document.getElementById('timetable-today-agenda');
  const todayLabel = document.getElementById('timetable-today-day-label');
  const dayPillsCont = document.getElementById('timetable-agenda-day-pills');

  if (todayAgenda && weeklyTimetable) {
    const currentSystemDay = allDays[new Date().getDay()];
    const displayDay = activeAgendaDay || currentSystemDay;

    if (todayLabel) {
      todayLabel.innerText = displayDay + (displayDay === currentSystemDay ? ' (Today)' : '');
    }

    if (dayPillsCont) {
      dayPillsCont.innerHTML = weekDays.map(d => {
        const isSelected = (d === displayDay);
        const isToday = (d === currentSystemDay);
        const shortName = d.substring(0, 3);
        const activeClasses = isSelected
          ? 'app-themed-btn-primary text-white font-black shadow-xs'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700/60 font-medium';
        return `
              <button data-action="setAgendaDay" data-day="${escapeHtml(d)}" 
                class="w-full py-1 px-0.5 text-center flex items-center justify-center rounded-md transition ${activeClasses} relative min-w-0" 
                title="View ${d} Schedule">
                <span class="truncate leading-tight">${shortName}</span>
                ${isToday ? '<span class="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>' : ''}
              </button>
            `;
      }).join('');
    }

    let daySlots = weeklyTimetable
      .filter(t => t.day === displayDay)
      .map(s => ({ ...s, isSpecialSession: false }))
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // When viewing today's agenda, also append any special classes planned for today
    if (displayDay === currentSystemDay && typeof plannerEntries === 'object' && plannerEntries !== null) {
      Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
        if (!entry || !cellKey.startsWith(todayDateKey + '__')) return;
        const parts = cellKey.split('__');
        if (parts.length < 3) return;
        const [dateKey, course, section] = parts;

        const isRegular = weeklyTimetable.some(t => t.day === currentSystemDay && t.course === course && t.section === section);
        if (isRegular) return;

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
          actLower.includes('class suspended');

        if (isNoClass) return;

        const hasContent = (rawTopic.length > 0) || (rawActivity.length > 0);
        if (!hasContent) return;

        const fallbackSlot = weeklyTimetable.find(t => t.course === course && t.section === section);
        daySlots.push({
          course,
          section,
          day: displayDay,
          startTime: entry.startTime || (fallbackSlot ? fallbackSlot.startTime : '08:00'),
          endTime: entry.endTime || (fallbackSlot ? fallbackSlot.endTime : '09:30'),
          room: entry.room || (fallbackSlot ? fallbackSlot.room : 'TBA'),
          type: entry.type || (fallbackSlot ? fallbackSlot.type : 'Special Session'),
          topic: rawTopic,
          isSpecialSession: true
        });
      });
      daySlots.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    }

    if (daySlots.length === 0) {
      todayAgenda.innerHTML = `<div class="text-slate-400 dark:text-slate-500 italic text-[11px] py-3 text-center">No classes scheduled for ${displayDay}.</div>`;
    } else {
      todayAgenda.innerHTML = daySlots.map(s => {
        const cellKey = `${todayDateKey}__${s.course}__${s.section}`;
        const entry = (displayDay === currentSystemDay && typeof plannerEntries === 'object' && plannerEntries !== null) ? plannerEntries[cellKey] : null;
        const isNoClass = entry && (entry.type === 'No Class' || entry.status === 'Cancelled' || (entry.topic && entry.topic.toLowerCase().includes('no class')));
        const hasPlannedTopic = entry && entry.topic && !isNoClass;

        const cardClasses = isNoClass
          ? 'bg-rose-50/70 dark:bg-[#200b12] border-rose-200 dark:border-rose-900/80 hover:bg-rose-100/80 dark:hover:bg-[#2d0e19] hover:border-rose-300 dark:hover:border-rose-700/80 opacity-85'
          : (s.isSpecialSession
            ? 'bg-amber-50/70 dark:bg-[#1a1c24] border-amber-200 dark:border-amber-900/70 hover:bg-amber-100/80 dark:hover:bg-[#252834] hover:border-amber-300 dark:hover:border-amber-600/80'
            : 'bg-slate-50 dark:bg-[#141d2b] hover:bg-slate-100 dark:hover:bg-[#1a2638] border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600');

        const titleHover = isNoClass
          ? ''
          : 'group-hover:text-[var(--app-header-primary)] dark:group-hover:text-[var(--app-header-accent)]';

        return `
              <div data-action="highlightTimetableClass" data-course="${escapeHtml(s.course)}" data-section="${escapeHtml(s.section)}" data-day="${escapeHtml(s.day)}"
                class="p-2 ${cardClasses} border rounded-lg flex items-center justify-between gap-2 text-xs transition-all hover:shadow-2xs cursor-pointer group shadow-2xs">
                <div class="min-w-0">
                  <div class="font-extrabold text-slate-800 dark:text-slate-100 text-[11px] ${titleHover} transition-colors flex items-center gap-1.5 flex-wrap">
                    <span class="${isNoClass ? 'line-through text-rose-800 dark:text-rose-400' : ''}">${escapeHtml(s.course)} - ${escapeHtml(s.section)}</span>
                    ${isNoClass ? '<span class="text-[8px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">No Class</span>' : ''}
                    ${s.isSpecialSession ? '<span class="text-[8px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/80">⚡ Special</span>' : ''}
                  </div>
                  <div class="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 tracking-tight">${formatTime12(s.startTime)} – ${formatTime12(s.endTime)} • Rm ${escapeHtml(s.room)}</div>
                  ${hasPlannedTopic ? `<div class="text-[10px] text-slate-600 ${s.isSpecialSession ? 'dark:text-amber-200/90' : 'dark:text-slate-300'} truncate italic mt-0.5">${escapeHtml(entry.topic)}</div>` : ''}
                </div>
                <div class="shrink-0" data-action="noop" data-stop-propagation="true">
                  ${getClassroomLink(s.course, s.section) 
                ? `<a href="${escapeHtml(getClassroomLink(s.course, s.section))}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-[#06291e] dark:hover:bg-[#0a3d2c] text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 rounded-lg flex items-center justify-center transition shadow-2xs group/btn" title="Open Google Classroom for ${escapeHtml(s.course)} (${escapeHtml(s.section)})">
                        <svg class="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 group-hover/btn:scale-110 transition" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                        </svg>
                      </a>`
                : ''}
                </div>
              </div>
            `;
      }).join('');
    }
  }

  initDraggableSidebarWidgets('sidebar-timetable');
}
