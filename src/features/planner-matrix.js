/* ===========================================================================
 * LESSON PLANNER MATRIX
 * ---------------------------------------------------------------------------
 * The main date x course-section grid: rendering, column resizing, month
 * filtering and activity copy/paste.
 * ======================================================================== */

function copyMatrixActivity(dateKey, course, section, e) {
  if (e) e.stopPropagation();
  const cellKey = `${dateKey}__${course}__${section}`;
  const entry = plannerEntries[cellKey];
  if (!entry) {
    showToast("No planned activity to copy in this slot.", "⚠️");
    return;
  }
  activityClipboard = JSON.parse(JSON.stringify(entry));
  showToast(`Copied activity from ${course} (${section})!`, "📋");
}

function pasteMatrixActivity(dateKey, course, section, e) {
  if (e) e.stopPropagation();
  if (!activityClipboard) {
    showToast("Clipboard is empty. Copy an activity first.", "⚠️");
    return;
  }
  pushPlannerUndo(`Paste Activity to ${course} (${section})`);
  const cellKey = `${dateKey}__${course}__${section}`;
  plannerEntries[cellKey] = JSON.parse(JSON.stringify(activityClipboard));
  Render.after('lesson');
  showToast(`Pasted activity to ${course} (${section}) on ${dateKey}!`, "✓");
}


function renderMatrixTable() {
  const table = document.getElementById('matrix-table');
  const thead = document.getElementById('matrix-head');
  const tbody = document.getElementById('matrix-body');
  if (!table || !thead || !tbody) return;

  // Enforce fixed layout for perfect pixel-controlled resizing
  table.style.tableLayout = 'fixed';
  updateMatrixTableWidth();

  let filteredDates = semesterDates;
  if (selectedMonthFilter !== 'all') {
    filteredDates = semesterDates.filter(d => d.monthNum === selectedMonthFilter);
  }

  // Build Colgroup for direct column-width resizing
  let colgroupHtml = `
        <col class="col-day" style="width: 42px; min-width: 42px; max-width: 42px;">
        <col class="col-date" style="width: 68px; min-width: 68px; max-width: 68px;">
      `;

  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => {
      const colKey = sub.code + '__' + sec;
      const currentW = columnWidths[colKey] || 205;
      colgroupHtml += `<col id="cg-col-${colKey}" style="width: ${currentW}px;">`;
    });
  });

  colgroupHtml += `<col class="col-notes" style="width: 300px; min-width: 260px;">`;

  let existingColgroup = document.getElementById('matrix-colgroup');
  if (existingColgroup) {
    existingColgroup.innerHTML = colgroupHtml;
  } else {
    const cg = document.createElement('colgroup');
    cg.id = 'matrix-colgroup';
    cg.innerHTML = colgroupHtml;
    table.insertBefore(cg, table.firstChild);
  }

  // ROW 1: Sticky Top Subjects with Rowspan for Day/Date/Notes
  let row1 = `
        <tr class="bg-slate-800 text-white divide-x divide-slate-700">
          <th rowspan="2" class="sticky-header-day p-1 text-center font-bold text-slate-200 bg-slate-900 border-b border-slate-700 select-none text-[11px]">
            Day
          </th>
          <th rowspan="2" class="sticky-header-date p-1 text-center font-bold text-slate-200 bg-slate-900 border-b border-slate-700 select-none text-[11px]">
            Date
          </th>
      `;

  courseData.subjects.forEach(sub => {
    const span = sub.sections.length || 1;
    const unitsText = sub.units ? `(${sub.units} units)` : '';
    row1 += `
          <th colspan="${span}" class="py-1.5 px-2 text-center font-extrabold tracking-wide ${sub.headerBg} border-b border-slate-900 shadow-2xs">
            <div class="flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden text-xs sm:text-sm font-bold" title="${escapeHtml(sub.code)} - ${escapeHtml(sub.title || '')} ${unitsText}">
              <span class="font-black tracking-tight shrink-0">${escapeHtml(sub.code)}</span>
              ${sub.title ? `<span class="opacity-70 font-normal shrink-0">-</span><span class="truncate font-semibold opacity-95 text-xs">${escapeHtml(sub.title)}</span>` : ''}
              ${unitsText ? `<span class="text-[10.5px] font-medium opacity-85 shrink-0">${unitsText}</span>` : ''}
            </div>
          </th>
        `;
  });

  row1 += `
          <th rowspan="2" class="p-2.5 text-center font-bold text-slate-200 bg-slate-900 min-w-[240px] border-b border-slate-700 select-none">
            Academic Events & Campus Notes
          </th>
        </tr>
      `;

  // ROW 2: Subject Sections Row (Clean, perfectly aligned under parent subjects)
  let row2 = `
        <tr class="bg-slate-100 text-slate-800 border-b border-slate-300 divide-x divide-slate-200 shadow-xs">
      `;

  courseData.subjects.forEach(sub => {
    sub.sections.forEach((sec, secIdx) => {
      const colKey = sub.code + '__' + sec;
      const currentW = columnWidths[colKey] || 205;
      const badgeAccent = getSectionBadgeStyle(secIdx);

      const classroomLink = getClassroomLink(sub.code, sec);
      row2 += `
            <th id="th-col-${colKey}" style="width: ${currentW}px;" class="p-1.5 text-center font-bold text-xs bg-slate-100 hover:bg-slate-200/90 text-slate-800 relative select-none transition">
              <div class="flex items-center justify-center gap-1.5">
                <span class="text-[10px] font-bold text-slate-500 uppercase">${escapeHtml(sub.code)}</span>
                ${classroomLink ? `
                  <a href="${escapeHtml(classroomLink)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-black ${badgeAccent} shadow-2xs hover:opacity-85 hover:scale-105 transition active:scale-95" title="Open Google Classroom for ${escapeHtml(sub.code)} ${escapeHtml(sec)} in new tab (${escapeHtml(classroomLink)})" onclick="event.stopPropagation()">
                    <span>${escapeHtml(sec)}</span>
                    <svg class="w-3 h-3 text-emerald-700 shrink-0" viewBox="0 0 24 24" fill="currentColor" title="Google Classroom Linked"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                  </a>
                ` : `
                  <button type="button" onclick="event.stopPropagation(); openClassroomModal('${jsAttr(sub.code)}', '${jsAttr(sec)}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-black ${badgeAccent} shadow-2xs hover:opacity-85 hover:scale-105 transition active:scale-95 cursor-pointer" title="Click section to add Google Classroom link for ${escapeHtml(sub.code)} ${escapeHtml(sec)}">
                    <span>${escapeHtml(sec)}</span>
                    <span class="text-[9px] opacity-60 font-medium">+link</span>
                  </button>
                `}
              </div>
              <!-- Column Drag Resizer Handle -->
              <div class="col-resizer" onmousedown="initColumnResize(event, '${jsAttr(colKey)}')" title="Drag to resize column (${sub.code} ${sec})"></div>
            </th>
          `;
    });
  });

  row2 += `</tr>`;

  thead.innerHTML = row1 + row2;

  const meetingCounters = {};
  courseData.subjects.forEach(s => {
    s.sections.forEach(sec => {
      meetingCounters[s.code + '__' + sec] = 0;
    });
  });

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
  const todayDay = String(today.getDate()).padStart(2, '0');
  const todayKey = todayYear + '-' + todayMonth + '-' + todayDay;

  // Pre-index timetable slots into a Map for O(1) lookups across 1,500+ cells
  const timetableMap = new Map();
  (weeklyTimetable || []).forEach(t => {
    timetableMap.set(`${t.course}__${t.section}__${t.day}`, t);
  });

  tbody.innerHTML = filteredDates.map(d => {
    const isToday = (d.dateKey === todayKey);
    const weekendClass = d.isWeekend ? 'bg-slate-300 text-slate-700 font-semibold' : 'bg-white text-slate-800';
    const dayWeekendBadge = d.isWeekend ? 'bg-slate-400 text-slate-900' : 'bg-slate-100 text-slate-700';

    let dateRowHtml = `
          <tr id="row-${d.dateKey}" class="transition border-b border-slate-200 matrix-row-height ${weekendClass} ${isToday ? 'row-today-active' : 'hover:bg-slate-50/80'}">
            <td class="sticky-col-day p-1 text-center font-bold border-r border-slate-200 ${d.isWeekend ? 'bg-slate-300' : 'bg-slate-50'}">
              <span class="inline-block px-1 py-0.5 rounded text-[10px] sm:text-[10.5px] ${dayWeekendBadge}">${d.dayOfWeek}</span>
            </td>

            <td class="sticky-col-date p-1 text-center font-semibold font-mono text-[11px] border-r border-slate-200 ${d.isWeekend ? 'bg-slate-300 text-slate-800' : 'bg-slate-50 text-slate-700'}">
              ${d.displayDate}
            </td>
        `;

    courseData.subjects.forEach(sub => {
      sub.sections.forEach((sec, secIdx) => {
        const cellKey = d.dateKey + '__' + sub.code + '__' + sec;
        const colKey = sub.code + '__' + sec;
        const currentW = columnWidths[colKey] || 205;
        const entry = plannerEntries[cellKey];

        const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
        const scheduledSlot = timetableMap.get(`${sub.code}__${sec}__${fullDay}`);
        const accentBarClass = getSectionAccent(secIdx);

        if (d.isWeekend) {
          const weekendEntry = plannerEntries[cellKey];
          if (weekendEntry) {
            const isEntryCompleted = (weekendEntry.status === 'Completed') || (d.dateKey < todayKey);
            let badgeColor = sub.badgeBg;
            if (weekendEntry.type === 'Exam') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
            else if (weekendEntry.type === 'No Class') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
            else if (weekendEntry.type === 'Makeup Class') badgeColor = 'bg-amber-50 text-amber-950 border-amber-300';
            else if (weekendEntry.type === 'Special Session') badgeColor = 'bg-violet-50 text-violet-950 border-violet-300';

            dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-300 bg-slate-200/60 cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1 rounded-lg border ${badgeColor} ${accentBarClass} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] ${badgeColor}">
                      <div class="flex items-center justify-between gap-1 overflow-hidden">
                        <span class="font-extrabold text-[8.5px] uppercase tracking-tight text-amber-800 truncate">⚡ ${escapeHtml(weekendEntry.type || 'Weekend')}</span>
                        <div class="flex items-center gap-1 shrink-0">
                          ${isEntryCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                          <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/80 shrink-0 border border-black/10">${escapeHtml(weekendEntry.type || 'Weekend')}</span>
                        </div>
                      </div>
                      <div class="font-bold text-[10.5px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(weekendEntry.topic || 'Planned Activity')}">${escapeHtml(weekendEntry.topic || 'Planned Activity')}</div>
                      ${weekendEntry.activity ? `<div class="text-[8.5px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full leading-tight" title="${escapeHtml(weekendEntry.activity)}">${escapeHtml(weekendEntry.activity)}</div>` : ''}
                      <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-semibold pt-1 mt-1 border-t border-black/10 text-slate-600">
                        <span>⚡ Weekend Session</span>
                        <span class="px-1 py-0.2 rounded bg-white/80 border border-slate-300/60 font-sans font-semibold">${escapeHtml(weekendEntry.status || 'Planned')}</span>
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-black/10">
                        <button type="button" onclick="copyMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Copy Activity">📋 Copy</button>
                        <button type="button" onclick="pasteMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                      </div>
                    </div>
                  </td>
                `;
          } else {
            dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-300 bg-slate-200/50 cursor-pointer hover:bg-slate-200/80 transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1 rounded-lg border border-dashed border-slate-400/30 hover:border-amber-400 text-slate-500 hover:text-amber-800 bg-slate-200/40 hover:bg-white text-center transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white group-hover/card-cell:border-amber-400">
                      <div class="text-[8.5px] font-medium py-0.5 opacity-30 group-hover/card-cell:opacity-100 transition-opacity flex items-center justify-center gap-1 text-slate-600 group-hover/card-cell:text-amber-700">
                        <span class="font-bold">+</span>
                        <span class="truncate">Weekend Session</span>
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-0.5 border-t border-slate-200">
                        <button type="button" onclick="pasteMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})" class="p-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 shadow-2xs" title="Plan Weekend Session">✏️ Plan</button>
                      </div>
                    </div>
                  </td>
                `;
          }
          return;
        }

        if (d.isNoClassDate) {
          dateRowHtml += `
                <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 bg-rose-50/50 text-center align-middle overflow-hidden">
                  <span id="card-${cellKey}" class="inline-block px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[9.5px] font-bold border border-rose-300">
                    No Class
                  </span>
                </td>
              `;
          return;
        }

        if (scheduledSlot) {
          if (entry) {
            const isNoClass = (entry.type === 'No Class') || (entry.topic && entry.topic.toLowerCase().includes('no class'));
            if (!isNoClass) {
              meetingCounters[sub.code + '__' + sec]++;
            }
            const meetingNum = meetingCounters[sub.code + '__' + sec];

            const isEntryCompleted = (entry.status === 'Completed') || (d.dateKey < todayKey);
            let badgeColor = sub.badgeBg;
            if (entry.type === 'Exam') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
            if (entry.type === 'No Class') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';

            dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1 rounded-lg border ${badgeColor} ${accentBarClass} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] ${badgeColor}">
                      <div class="flex items-center justify-between gap-1 overflow-hidden">
                        ${!isNoClass ? `<span class="font-extrabold text-[8.5px] uppercase tracking-tight truncate">Mtg #${meetingNum}</span>` : `<span class="font-extrabold text-[8.5px] uppercase tracking-tight text-rose-700 truncate">${escapeHtml(entry.type || 'No Class')}</span>`}
                        <div class="flex items-center gap-1 shrink-0">
                          ${isEntryCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                          <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/80 shrink-0">${escapeHtml(entry.type)}</span>
                        </div>
                      </div>
                      <div class="font-bold text-[10.5px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(entry.topic || 'Planned Activity')}">${escapeHtml(entry.topic || 'Planned Activity')}</div>
                      ${entry.activity ? `<div class="text-[8.5px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full leading-tight" title="${escapeHtml(entry.activity)}">${escapeHtml(entry.activity)}</div>` : ''}
                      <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-bold pt-1 mt-1 border-t border-black/10 text-slate-700">
                        <span>🕒 ${formatTime12(scheduledSlot.startTime)} – ${formatTime12(scheduledSlot.endTime)}</span>
                        <span class="px-1 py-0.2 rounded bg-white/80 border border-slate-300/60 font-sans font-semibold">${escapeHtml(scheduledSlot.room || 'TBA')}</span>
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-black/10">
                        <button type="button" onclick="copyMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Copy Activity">📋 Copy</button>
                        <button type="button" onclick="pasteMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                      </div>
                    </div>
                  </td>
                `;
          } else {
            dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1 rounded-lg border border-dashed border-slate-300 hover:border-msu-maroon text-slate-500 hover:text-slate-800 bg-slate-50/60 hover:bg-white text-center ${accentBarClass} transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white">
                      <div class="text-[9.5px] text-slate-500 font-semibold py-0.5">+ Click to plan</div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-center text-[8.5px] font-mono text-slate-500 pt-0.5 mt-0.5 border-t border-slate-200">
                        🕒 ${formatTime12(scheduledSlot.startTime)} – ${formatTime12(scheduledSlot.endTime)} • ${escapeHtml(scheduledSlot.room || 'TBA')}
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-slate-200">
                        <button type="button" onclick="pasteMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})" class="p-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Open Planner">✏️ Edit</button>
                      </div>
                    </div>
                  </td>
                `;
          }
        } else {
          if (entry) {
            const isNoClass = (entry.type === 'No Class') || (entry.topic && entry.topic.toLowerCase().includes('no class'));
            const isEntryCompleted = (entry.status === 'Completed') || (d.dateKey < todayKey);
            let badgeColor = sub.badgeBg;
            if (entry.type === 'Exam') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
            else if (entry.type === 'No Class') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
            else if (entry.type === 'Makeup Class') badgeColor = 'bg-amber-50/90 text-amber-950 border-amber-300';
            else if (entry.type === 'Special Session') badgeColor = 'bg-violet-50/90 text-violet-950 border-violet-300';

            const displayType = entry.type || 'Special Session';

            dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1 rounded-lg border ${badgeColor} ${accentBarClass} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] ${badgeColor}">
                      <div class="flex items-center justify-between gap-1 overflow-hidden">
                        <span class="font-extrabold text-[8.5px] uppercase tracking-tight text-amber-800 truncate">⚡ ${escapeHtml(displayType)}</span>
                        <div class="flex items-center gap-1 shrink-0">
                          ${isEntryCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                          <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/80 shrink-0 border border-black/10">${escapeHtml(entry.type || 'Special')}</span>
                        </div>
                      </div>
                      <div class="font-bold text-[10.5px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(entry.topic || 'Planned Activity')}">${escapeHtml(entry.topic || 'Planned Activity')}</div>
                      ${entry.activity ? `<div class="text-[8.5px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full leading-tight" title="${escapeHtml(entry.activity)}">${escapeHtml(entry.activity)}</div>` : ''}
                      <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-semibold pt-1 mt-1 border-t border-black/10 text-slate-600">
                        <span>⚡ Out-of-Schedule</span>
                        <span class="px-1 py-0.2 rounded bg-white/80 border border-slate-300/60 font-sans font-semibold">${escapeHtml(entry.status || 'Planned')}</span>
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-black/10">
                        <button type="button" onclick="copyMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Copy Activity">📋 Copy</button>
                        <button type="button" onclick="pasteMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                      </div>
                    </div>
                  </td>
                `;
          } else {
            dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer hover:bg-amber-50/20 transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1 rounded-lg border border-dashed border-slate-200 hover:border-amber-400 text-slate-400 hover:text-amber-800 bg-slate-50/30 hover:bg-white text-center transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white group-hover/card-cell:border-amber-400">
                      <div class="text-[8.5px] font-medium py-0.5 opacity-30 group-hover/card-cell:opacity-100 transition-opacity flex items-center justify-center gap-1 text-slate-500 group-hover/card-cell:text-amber-700">
                        <span class="font-bold">+</span>
                        <span class="truncate">Special / Makeup</span>
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-center text-[8px] font-mono text-amber-700/80 pt-0.5 mt-0.5 border-t border-slate-200">
                        ⚡ Out-of-schedule day
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-slate-200">
                        <button type="button" onclick="pasteMatrixActivity('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', event)" class="p-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${jsAttr(d.dateKey)}', '${jsAttr(sub.code)}', '${jsAttr(sec)}', ${d.isWeekend})" class="p-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 shadow-2xs" title="Plan Special Session / Makeup Class">✏️ Plan</button>
                      </div>
                    </div>
                  </td>
                `;
          }
        }
      });
    });

    const customNote = dailyNotes[d.dateKey] || '';
    // ROW NOTES / ACADEMIC EVENTS CELL
    let eventContent = '';
    if (d.event || customNote) {
      let badgeTheme = 'bg-blue-100 text-blue-900 border-blue-300';
      if (d.event && d.event.isNoClass) badgeTheme = 'bg-rose-100 text-rose-900 border-rose-300';
      else if (d.event && d.event.type === 'exam') badgeTheme = 'bg-amber-100 text-amber-900 border-amber-400';
      else if (d.event && d.event.type === 'milestone') badgeTheme = 'bg-emerald-100 text-emerald-900 border-emerald-300';

      eventContent = `
            <div id="card-${d.dateKey}__notes" class="p-1 rounded-lg border bg-slate-50 border-slate-200 shadow-xs space-y-0.5">
              ${d.event ? `
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold border ${badgeTheme}">
                    ${escapeHtml(d.event.activity)}
                  </span>
                  ${d.event.isNoClass ? `<span class="px-1.5 py-0.2 rounded text-[8.5px] font-bold bg-rose-100 text-rose-700 border border-rose-200">No Class</span>` : ''}
                </div>
              ` : ''}
              ${customNote ? `<div class="text-[10.5px] text-slate-700 font-medium italic leading-tight">${escapeHtml(customNote)}</div>` : ''}
            </div>
          `;
    } else {
      eventContent = `
            <div id="card-${d.dateKey}__notes" class="text-center text-slate-300 text-[10.5px] select-none py-0.5">—</div>
          `;
    }

    dateRowHtml += `
            <td id="cell-${d.dateKey}__notes" data-cell-key="${d.dateKey}__notes" class="p-1 border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition align-middle" onclick="openEventEditorModal('${jsAttr(d.dateKey)}')">
              ${eventContent}
            </td>
          </tr>
        `;

    return dateRowHtml;
  }).join('');

  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => setupSynchronizedScrollbars());
  } else {
    setupSynchronizedScrollbars();
  }
  if (typeof updatePlannerSidebar === 'function') {
    updatePlannerSidebar();
  }
  if (typeof autoResizeContentWindows === 'function') {
    autoResizeContentWindows();
  }
}

function updateMatrixTableWidth() {
  const table = document.getElementById('matrix-table');
  if (!table) return;
  let totalW = 42 + 68 + 300; // 42px day + 68px date + 300px notes
  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => {
      const k = sub.code + '__' + sec;
      totalW += (columnWidths[k] || 205);
    });
  });
  table.style.width = totalW + 'px';
  table.style.minWidth = totalW + 'px';
}

function initColumnResize(e, colKey) {
  e.preventDefault();
  e.stopPropagation();

  activeResizeColKey = colKey;
  resizeStartX = e.clientX;
  resizeStartWidth = columnWidths[colKey] || 205;

  // Allow flexible shrinking even with long text down to 60px
  minResizeWidth = 60;

  document.body.style.cursor = 'col-resize';
  document.body.classList.add('select-none');

  document.addEventListener('mousemove', handleColumnResizeMove);
  document.addEventListener('mouseup', stopColumnResize);
}

function handleColumnResizeMove(e) {
  if (!activeResizeColKey) return;
  const delta = e.clientX - resizeStartX;
  const newWidth = Math.max(minResizeWidth, Math.min(600, Math.round(resizeStartWidth + delta)));

  columnWidths[activeResizeColKey] = newWidth;

  const cg = document.getElementById('cg-col-' + activeResizeColKey);
  if (cg) {
    cg.style.width = newWidth + 'px';
    cg.style.minWidth = newWidth + 'px';
    cg.style.maxWidth = newWidth + 'px';
  }

  const th = document.getElementById('th-col-' + activeResizeColKey);
  if (th) {
    th.style.width = newWidth + 'px';
    th.style.minWidth = newWidth + 'px';
    th.style.maxWidth = newWidth + 'px';
  }

  // Update cells in the active column so table respects width even with long text
  const cells = document.querySelectorAll(`td[data-col="${activeResizeColKey}"]`);
  cells.forEach(td => {
    td.style.width = newWidth + 'px';
    td.style.minWidth = newWidth + 'px';
    td.style.maxWidth = newWidth + 'px';
  });

  updateMatrixTableWidth();
  setupSynchronizedScrollbars();
}

function stopColumnResize() {
  if (!activeResizeColKey) return;

  document.removeEventListener('mousemove', handleColumnResizeMove);
  document.removeEventListener('mouseup', stopColumnResize);

  document.body.style.cursor = '';
  document.body.classList.remove('select-none');

  activeResizeColKey = null;
  setupSynchronizedScrollbars();
  saveAppState();
}
