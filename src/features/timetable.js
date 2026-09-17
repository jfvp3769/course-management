/* ===========================================================================
 * WEEKLY TIMETABLE
 * ---------------------------------------------------------------------------
 * Renders the recurring weekly class grid.
 * ======================================================================== */

function renderWeeklyTimetable() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const baseHour = 7;
  const hourHeight = 54;
  const pixelsPerMinute = hourHeight / 60;

  days.forEach(day => {
    const col = document.getElementById('timetable-col-' + day);
    if (!col) return;

    col.innerHTML = '';
    const daySlots = weeklyTimetable.filter(slot => slot.day === day);

    daySlots.forEach(slot => {
      const startMin = timeToMinutes(slot.startTime);
      const endMin = timeToMinutes(slot.endTime);
      const durationMin = Math.max(15, endMin - startMin);

      const topOffsetPx = Math.round((startMin - (baseHour * 60)) * pixelsPerMinute);
      const heightPx = Math.max(48, Math.round(durationMin * pixelsPerMinute));

      const isCompact = durationMin <= 60;
      const isMedium = durationMin > 60 && durationMin <= 90;
      const cardPadding = isCompact ? 'px-2.5 py-1' : (isMedium ? 'px-2.5 py-1.5' : 'p-2.5');

      const sub = courseData.subjects.find(s => s.code === slot.course) || {};
      const secIndex = sub.sections ? sub.sections.indexOf(slot.section) : 0;
      const accentBarClass = getSectionAccent(secIndex >= 0 ? secIndex : 0);

      // Detect schedule collision / overlap
      const hasOverlap = daySlots.some(other => {
        if (other === slot) return false;
        const otherStart = timeToMinutes(other.startTime);
        const otherEnd = timeToMinutes(other.endTime);
        return (startMin < otherEnd && endMin > otherStart);
      });

      const classroomLink = getClassroomLink(slot.course, slot.section);

      const card = document.createElement('div');
      card.className = `absolute left-1 right-1 rounded-xl ${cardPadding} border shadow-xs transition hover:shadow-md hover:z-20 cursor-pointer overflow-hidden flex flex-col justify-between ${hasOverlap ? 'border-rose-500 ring-2 ring-rose-400 bg-rose-50 text-rose-950' : (sub.color || 'bg-blue-50 border-blue-300 text-blue-950')} ${accentBarClass}`;
      card.style.top = topOffsetPx + 'px';
      card.style.height = heightPx + 'px';

      card.title = `${slot.course} (${slot.section}) - ${sub.title || slot.course}\nSchedule: ${formatTime12(slot.startTime)} - ${formatTime12(slot.endTime)}\nRoom: ${slot.room || 'TBA'} • Type: ${slot.type || 'Lecture'}`;

      card.onclick = () => openEditScheduleModalForSlot(slot.course, slot.section, slot.day, slot.startTime);

      card.innerHTML = `
            <div class="${isCompact ? 'space-y-0' : 'space-y-0.5'}">
              <div class="flex items-center justify-between gap-1 leading-tight">
                <span class="font-extrabold ${isCompact ? 'text-[11.5px]' : 'text-xs'} tracking-tight truncate">${escapeHtml(slot.course)}</span>
                <div class="flex items-center gap-1 shrink-0">
                  ${hasOverlap ? '<span class="text-[8px] px-1 py-0.5 rounded font-black bg-rose-600 text-white uppercase animate-pulse">Overlap</span>' : ''}
                  ${classroomLink ? `
                    <a href="${escapeHtml(classroomLink)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded font-black bg-white/95 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-300/80 hover:border-emerald-400 uppercase shadow-2xs transition group leading-none" title="Open Google Classroom for ${escapeHtml(slot.course)} ${escapeHtml(slot.section)} in new tab (${escapeHtml(classroomLink)})">
                      <span>${escapeHtml(slot.section)}</span>
                      <svg class="w-2.5 h-2.5 text-emerald-600 shrink-0 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                    </a>
                  ` : `
                    <button type="button" onclick="event.stopPropagation(); openClassroomModal('${jsAttr(slot.course)}', '${jsAttr(slot.section)}')" class="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded font-black bg-white/90 hover:bg-slate-100 text-slate-800 border border-slate-300/80 uppercase shadow-2xs transition leading-none" title="Click section to link Google Classroom for ${escapeHtml(slot.course)} ${escapeHtml(slot.section)}">
                      <span>${escapeHtml(slot.section)}</span>
                    </button>
                  `}
                </div>
              </div>
              <div class="text-[10px] font-semibold opacity-90 truncate leading-tight">${escapeHtml(sub.title || slot.course)}</div>
            </div>
            <div class="flex items-center justify-between ${isCompact ? 'text-[9px] pt-0.5' : 'text-[10px] mt-1 pt-1'} font-mono font-bold leading-tight border-t border-slate-900/10 whitespace-nowrap overflow-hidden gap-1">
              <span class="truncate">${formatTime12(slot.startTime)} - ${formatTime12(slot.endTime)}</span>
              <span class="${isCompact ? 'px-1 py-0.2 text-[8.5px]' : 'px-1.5 py-0.5'} rounded bg-white/80 border border-slate-300/70 font-sans shrink-0 leading-none">${escapeHtml(slot.room)}</span>
            </div>
          `;

      card.id = 'timetable-card-' + String(slot.course).replace(/\s+/g, '_') + '-' + String(slot.section).replace(/\s+/g, '_') + '-' + day;
      col.appendChild(card);
    });
  });
  if (typeof updateTimetableSidebar === 'function') {
    updateTimetableSidebar();
  }
}
