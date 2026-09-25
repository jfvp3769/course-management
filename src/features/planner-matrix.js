/* ===========================================================================
 * LESSON PLANNER MATRIX
 * ---------------------------------------------------------------------------
 * The main date x course-section grid: rendering, column resizing, month
 * filtering and activity copy/paste.
 * ======================================================================== */

function _resolveSectionSlot(dateKey, course, section) {
  if (typeof weeklyTimetable === 'undefined' || !Array.isArray(weeklyTimetable)) {
    return null;
  }
  let fullDay = '';
  if (typeof semesterDates !== 'undefined' && Array.isArray(semesterDates)) {
    const dObj = semesterDates.find(d => d.dateKey === dateKey);
    if (dObj && dObj.dayOfWeek) {
      fullDay = (typeof FULL_DAY_NAMES !== 'undefined' && FULL_DAY_NAMES[dObj.dayOfWeek])
        ? FULL_DAY_NAMES[dObj.dayOfWeek]
        : dObj.dayOfWeek;
    }
  }
  if (!fullDay && dateKey) {
    try {
      fullDay = new Date(dateKey + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
    } catch (e) {
      fullDay = '';
    }
  }

  const scheduledSlot = fullDay
    ? weeklyTimetable.find(t => t.course === course && t.section === section && t.day === fullDay)
    : null;
  const fallbackSlot = weeklyTimetable.find(t => t.course === course && t.section === section);

  return scheduledSlot || fallbackSlot || null;
}

function copyMatrixActivity(dateKey, course, section, e) {
  if (e) e.stopPropagation();
  const cellKey = `${dateKey}__${course}__${section}`;
  const entry = plannerEntries[cellKey];
  if (!entry) {
    showToast("No planned activity to copy in this slot.", "⚠️");
    return;
  }
  activityClipboard = JSON.parse(JSON.stringify(entry));
  // Strip source slot's specific schedule and venue so they don't leak into pasted slots
  delete activityClipboard.startTime;
  delete activityClipboard.endTime;
  delete activityClipboard.room;
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

  const newEntry = JSON.parse(JSON.stringify(activityClipboard));
  // Ensure source start time, end time, and room / venue are never carried over
  delete newEntry.startTime;
  delete newEntry.endTime;
  delete newEntry.room;

  // Use the Start Time, End Time, and Room / Venue of the section where pasted
  const targetSlot = _resolveSectionSlot(dateKey, course, section);
  if (targetSlot) {
    if (targetSlot.startTime) newEntry.startTime = targetSlot.startTime;
    if (targetSlot.endTime) newEntry.endTime = targetSlot.endTime;
    if (targetSlot.room) newEntry.room = targetSlot.room;
  }

  plannerEntries[cellKey] = newEntry;
  Render.after('lesson');
  showToast(`Pasted activity to ${course} (${section}) on ${dateKey}!`, "✓");
}


function _setupMatrixColgroup(table) {
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
}

function _renderMatrixHeader(thead) {
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
                  <a href="${escapeHtml(classroomLink)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-black ${badgeAccent} shadow-2xs hover:opacity-85 hover:scale-105 transition active:scale-95" title="Open Google Classroom for ${escapeHtml(sub.code)} ${escapeHtml(sec)} in new tab (${escapeHtml(classroomLink)})" data-action="noop" data-stop-propagation="true">
                    <span>${escapeHtml(sec)}</span>
                    <svg class="w-3 h-3 text-emerald-700 shrink-0" viewBox="0 0 24 24" fill="currentColor" title="Google Classroom Linked"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                  </a>
                ` : `
                  <button type="button" data-action="openClassroomModal" data-stop-propagation="true" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-black ${badgeAccent} shadow-2xs hover:opacity-85 hover:scale-105 transition active:scale-95 cursor-pointer" title="Click section to add Google Classroom link for ${escapeHtml(sub.code)} ${escapeHtml(sec)}">
                    <span>${escapeHtml(sec)}</span>
                    <span class="text-[9px] opacity-60 font-medium">+link</span>
                  </button>
                `}
              </div>
              <!-- Column Drag Resizer Handle -->
              <div class="col-resizer" data-action-mousedown="initColumnResize" data-col="${escapeHtml(colKey)}" title="Drag to resize column (${sub.code} ${sec})"></div>
            </th>
          `;
    });
  });

  row2 += `</tr>`;

  thead.innerHTML = row1 + row2;
}

function _renderMatrixCell(d, sub, sec, secIdx, timetableMap, meetingCounters, todayKey) {
  const cellKey = d.dateKey + '__' + sub.code + '__' + sec;
  const colKey = sub.code + '__' + sec;
  const currentW = columnWidths[colKey] || 205;
  const entry = plannerEntries[cellKey];

  const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
  const scheduledSlot = timetableMap.get(`${sub.code}__${sec}__${fullDay}`);

  if (d.isWeekend) {
    const weekendEntry = plannerEntries[cellKey];
    if (weekendEntry) {
      const isEntryCompleted = (weekendEntry.status === 'Completed') || (d.dateKey < todayKey);
      let badgeColor = sub.badgeBg;
      if (weekendEntry.type === 'Exam') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
      else if (weekendEntry.type === 'No Class') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
      else if (weekendEntry.type === 'Makeup Class') badgeColor = 'bg-amber-50 text-amber-950 border-amber-300';
      else if (weekendEntry.type === 'Special Session') badgeColor = 'bg-violet-50 text-violet-950 border-violet-300';

      return `
            <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-800 bg-[#e8edf3] dark:bg-[#182234] cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" data-action="openLessonModal" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
              <div id="card-${cellKey}" draggable="true" data-action-dragstart="handleMatrixCardDragStart" data-action-dragend="handleMatrixCardDragEnd" data-cell-key="${cellKey}" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="matrix-activity-card p-1 rounded-lg border ${badgeColor} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] cursor-grab active:cursor-grabbing">
                <div class="flex items-center justify-between gap-1 overflow-hidden">
                  <span class="font-extrabold text-[8.5px] uppercase tracking-tight text-amber-800 dark:text-amber-300 truncate">⚡ ${escapeHtml(weekendEntry.type || 'Weekend')}</span>
                  <div class="flex items-center gap-1 shrink-0">
                    ${isEntryCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                    <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 shrink-0 border border-black/10 dark:border-white/10">${escapeHtml(weekendEntry.type || 'Weekend')}</span>
                  </div>
                </div>
                <div class="font-bold text-[10.5px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(weekendEntry.topic || 'Planned Activity')}">${escapeHtml(weekendEntry.topic || 'Planned Activity')}</div>
                ${weekendEntry.activity ? `<div class="text-[8.5px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full leading-tight" title="${escapeHtml(weekendEntry.activity)}">${escapeHtml(weekendEntry.activity)}</div>` : ''}
                <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-semibold pt-1 mt-1 border-t border-current/15 text-current opacity-90">
                  <span class="truncate whitespace-nowrap">⚡ Weekend Session</span>
                  <span class="px-1 py-0.2 rounded bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 font-sans font-semibold shrink-0">${escapeHtml(weekendEntry.status || 'Planned')}</span>
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-current/15">
                  <button type="button" data-action="copyMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Copy Activity">📋 Copy</button>
                  <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                  <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                </div>
              </div>
            </td>
          `;
    } else {
      return `
            <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-800 bg-[#e8edf3] dark:bg-[#182234] cursor-pointer hover:bg-slate-200/50 dark:hover:bg-[#202c42] transition align-top relative group/card-cell matrix-cell-slot" data-action="openLessonModal" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
              <div id="card-${cellKey}" class="matrix-activity-card matrix-activity-slot-empty p-1 rounded-lg border border-dashed border-amber-300/70 dark:border-amber-800/60 hover:border-amber-400 text-amber-900/70 dark:text-amber-300/70 hover:text-amber-950 dark:hover:text-amber-200 bg-amber-50/25 dark:bg-amber-950/20 hover:bg-white dark:hover:bg-slate-800 text-center transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white dark:group-hover/card-cell:bg-slate-800 group-hover/card-cell:border-amber-400">
                <div class="text-[8.5px] font-medium py-0.5 opacity-60 group-hover/card-cell:opacity-100 transition-opacity flex items-center justify-center gap-1 text-amber-800/80 dark:text-amber-300/80 group-hover/card-cell:text-amber-900 dark:group-hover/card-cell:text-amber-200">
                  <span class="font-bold">+</span>
                  <span class="truncate">Weekend Session</span>
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-0.5 border-t border-amber-200/60 dark:border-amber-800/40">
                  <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                  <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" class="p-1 rounded bg-amber-50 dark:bg-amber-950/70 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold border border-amber-300 dark:border-amber-700 shadow-2xs" title="Plan Weekend Session">✏️ Plan</button>
                </div>
              </div>
            </td>
          `;
    }
  }

  if (d.isNoClassDate) {
    return `
          <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" data-is-noclass="true" data-date="${d.dateKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-700 bg-rose-50/50 dark:bg-rose-950/30 text-center align-middle overflow-hidden" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
            <span id="card-${cellKey}" class="inline-block px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 dark:text-rose-200 text-rose-800 text-[9.5px] font-bold border border-rose-300 dark:border-rose-700">
              No Class
            </span>
          </td>
        `;
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

      return `
            <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-700 cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" data-action="openLessonModal" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
              <div id="card-${cellKey}" draggable="true" data-action-dragstart="handleMatrixCardDragStart" data-action-dragend="handleMatrixCardDragEnd" data-cell-key="${cellKey}" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="matrix-activity-card p-1 rounded-lg border ${badgeColor} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] cursor-grab active:cursor-grabbing">
                <div class="flex items-center justify-between gap-1 overflow-hidden">
                  ${!isNoClass ? `<span class="font-extrabold text-[8.5px] uppercase tracking-tight truncate">Mtg #${meetingNum}</span>` : `<span class="font-extrabold text-[8.5px] uppercase tracking-tight text-rose-700 dark:text-rose-300 truncate">${escapeHtml(entry.type || 'No Class')}</span>`}
                  <div class="flex items-center gap-1 shrink-0">
                    ${isEntryCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                    <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 shrink-0">${escapeHtml(entry.type)}</span>
                  </div>
                </div>
                <div class="font-bold text-[10.5px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(entry.topic || 'Planned Activity')}">${escapeHtml(entry.topic || 'Planned Activity')}</div>
                ${entry.activity ? `<div class="text-[8.5px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full leading-tight" title="${escapeHtml(entry.activity)}">${escapeHtml(entry.activity)}</div>` : ''}
                <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-bold pt-1 mt-1 border-t border-current/15 text-current opacity-90">
                  <span class="truncate whitespace-nowrap">🕒 ${formatTime12(scheduledSlot.startTime)} – ${formatTime12(scheduledSlot.endTime)}</span>
                  <span class="px-1 py-0.2 rounded bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 font-sans font-semibold shrink-0">${escapeHtml(scheduledSlot.room || 'TBA')}</span>
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-current/15">
                  <button type="button" data-action="copyMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Copy Activity">📋 Copy</button>
                  <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                  <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                </div>
              </div>
            </td>
          `;
    } else {
      return `
            <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition align-top relative group/card-cell matrix-cell-slot" data-action="openLessonModal" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
              <div id="card-${cellKey}" class="matrix-activity-card matrix-activity-slot-empty p-1 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 hover:border-[var(--app-header-primary)] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-50/60 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 text-center transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white dark:group-hover/card-cell:bg-slate-800">
                <div class="text-[9.5px] text-slate-500 dark:text-slate-400 font-semibold py-0.5">+ Click to plan</div>
                <div class="hidden group-hover/card-cell:flex items-center justify-center text-[8.5px] font-mono text-slate-500 dark:text-slate-400 pt-0.5 mt-0.5 border-t border-slate-200 dark:border-slate-700">
                  🕒 ${formatTime12(scheduledSlot.startTime)} – ${formatTime12(scheduledSlot.endTime)} • ${escapeHtml(scheduledSlot.room || 'TBA')}
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-slate-200 dark:border-slate-700">
                  <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                  <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" class="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Open Planner">✏️ Edit</button>
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

      return `
            <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-700 cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" data-action="openLessonModal" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
              <div id="card-${cellKey}" draggable="true" data-action-dragstart="handleMatrixCardDragStart" data-action-dragend="handleMatrixCardDragEnd" data-cell-key="${cellKey}" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="matrix-activity-card p-1 rounded-lg border ${badgeColor} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] cursor-grab active:cursor-grabbing">
                <div class="flex items-center justify-between gap-1 overflow-hidden">
                  <span class="font-extrabold text-[8.5px] uppercase tracking-tight text-amber-800 dark:text-amber-300 truncate">⚡ ${escapeHtml(displayType)}</span>
                  <div class="flex items-center gap-1 shrink-0">
                    ${isEntryCompleted ? '<span class="text-[7.5px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                    <span class="text-[7.5px] px-1 py-0.2 rounded font-bold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 shrink-0 border border-black/10 dark:border-white/10">${escapeHtml(entry.type || 'Special')}</span>
                  </div>
                </div>
                <div class="font-bold text-[10.5px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(entry.topic || 'Planned Activity')}">${escapeHtml(entry.topic || 'Planned Activity')}</div>
                ${entry.activity ? `<div class="text-[8.5px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full leading-tight" title="${escapeHtml(entry.activity)}">${escapeHtml(entry.activity)}</div>` : ''}
                <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-semibold pt-1 mt-1 border-t border-current/15 text-current opacity-90">
                  <span class="truncate whitespace-nowrap">⚡ Out-of-Schedule</span>
                  <span class="px-1 py-0.2 rounded bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 font-sans font-semibold shrink-0">${escapeHtml(entry.status || 'Planned')}</span>
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-current/15">
                  <button type="button" data-action="copyMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Copy Activity">📋 Copy</button>
                  <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                  <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" class="p-1 rounded bg-white/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                </div>
              </div>
            </td>
          `;
    } else {
      return `
            <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-amber-50/20 dark:hover:bg-slate-800 transition align-top relative group/card-cell matrix-cell-slot" data-action="openLessonModal" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" data-action-dragover="handleMatrixCellDragOver" data-action-dragleave="handleMatrixCellDragLeave" data-action-drop="handleMatrixCellDrop">
              <div id="card-${cellKey}" class="matrix-activity-card matrix-activity-slot-empty p-1 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-400 dark:text-slate-500 hover:text-amber-800 dark:hover:text-amber-300 bg-slate-50/30 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 text-center transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white dark:group-hover/card-cell:bg-slate-800 group-hover/card-cell:border-amber-400">
                <div class="text-[8.5px] font-medium py-0.5 opacity-30 group-hover/card-cell:opacity-100 transition-opacity flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 group-hover/card-cell:text-amber-700 dark:group-hover/card-cell:text-amber-300">
                  <span class="font-bold">+</span>
                  <span class="truncate">Special / Makeup</span>
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-center text-[8px] font-mono text-amber-700/80 dark:text-amber-300/80 pt-0.5 mt-0.5 border-t border-slate-200 dark:border-slate-700">
                  ⚡ Out-of-schedule day
                </div>
                <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-slate-200 dark:border-slate-700">
                  <button type="button" data-action="pasteMatrixActivity" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" class="p-1 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-300 dark:border-slate-600 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                  <button type="button" data-action="openLessonModal" data-stop-propagation="true" data-date="${d.dateKey}" data-course="${escapeHtml(sub.code)}" data-section="${escapeHtml(sec)}" data-weekend="${d.isWeekend ? 'true' : 'false'}" class="p-1 rounded bg-amber-50 dark:bg-amber-950/70 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold border border-amber-300 dark:border-amber-700 shadow-2xs" title="Plan Special Session / Makeup Class">✏️ Plan</button>
                </div>
              </div>
            </td>
          `;
    }
  }
}

function _renderMatrixNotesCell(d) {
  const customNote = dailyNotes[d.dateKey] || '';
  let eventContent = '';
  if (d.event || customNote) {
    let badgeTheme = 'bg-blue-100 text-blue-900 border-blue-300';
    if (d.event && d.event.isNoClass) badgeTheme = 'bg-rose-100 text-rose-900 border-rose-300';
    else if (d.event && d.event.type === 'exam') badgeTheme = 'bg-amber-100 text-amber-900 border-amber-400';
    else if (d.event && d.event.type === 'milestone') badgeTheme = 'bg-emerald-100 text-emerald-900 border-emerald-300';

    eventContent = `
          <div id="card-${d.dateKey}__notes" class="p-1 rounded-lg border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-xs space-y-0.5">
            ${d.event ? `
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold border ${badgeTheme}">
                  ${escapeHtml(d.event.activity)}
                </span>
                ${d.event.isNoClass ? `<span class="px-1.5 py-0.2 rounded text-[8.5px] font-bold bg-rose-100 dark:bg-rose-950 dark:text-rose-200 text-rose-700 border border-rose-200 dark:border-rose-800">No Class</span>` : ''}
              </div>
            ` : ''}
            ${customNote ? `<div class="text-[10.5px] text-slate-700 dark:text-slate-300 font-medium italic leading-tight">${escapeHtml(customNote)}</div>` : ''}
          </div>
        `;
  } else {
    eventContent = `
          <div id="card-${d.dateKey}__notes" class="text-center text-slate-300 dark:text-slate-600 text-[10.5px] select-none py-0.5">—</div>
        `;
  }

  return `
          <td id="cell-${d.dateKey}__notes" data-cell-key="${d.dateKey}__notes" class="p-1 border-r border-slate-200 dark:border-slate-800 cursor-pointer ${d.isWeekend ? 'bg-[#e8edf3] dark:bg-[#182234] hover:bg-slate-200/50 dark:hover:bg-[#202c42]' : 'hover:bg-slate-100 dark:hover:bg-slate-800'} transition align-middle" data-action="openEventEditorModal" data-date="${d.dateKey}">
            ${eventContent}
          </td>
      `;
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

  // 1. Build Colgroup for direct column-width resizing
  _setupMatrixColgroup(table);

  // 2. Render 2-tier sticky headers
  _renderMatrixHeader(thead);

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

  // Save scroll position of matrix viewport to prevent jumping
  const scrollWrapper = document.getElementById('matrix-scroll-wrapper');
  const savedScrollLeft = scrollWrapper ? scrollWrapper.scrollLeft : 0;
  const savedScrollTop = scrollWrapper ? scrollWrapper.scrollTop : 0;

  // 3. Render Table Body
  tbody.innerHTML = filteredDates.map(d => {
    const isToday = (d.dateKey === todayKey);
    const weekendClass = d.isWeekend
      ? 'matrix-row-weekend bg-[#e8edf3] dark:bg-[#182234] text-slate-800 dark:text-slate-200'
      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100';

    const dayWeekendBadge = d.isWeekend
      ? 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800/80 font-bold'
      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700';

    const weekendDivider = d.dayOfWeek === 'Sat'
      ? 'border-t-2 border-slate-300 dark:border-slate-700'
      : (d.dayOfWeek === 'Sun' ? 'border-b-2 border-slate-300 dark:border-slate-700' : '');

    let dateRowHtml = `
          <tr id="row-${d.dateKey}" class="transition border-b border-slate-200 dark:border-slate-800 matrix-row-height ${weekendDivider} ${weekendClass} ${isToday ? 'row-today-active' : (d.isWeekend ? 'hover:bg-slate-200/60 dark:hover:bg-[#202c42]' : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/80')}">
            <td class="sticky-col-day p-1 text-center font-bold border-r border-slate-200 dark:border-slate-800 ${d.isWeekend ? 'bg-[#dce3ec] dark:bg-[#111826]' : 'bg-slate-50 dark:bg-slate-950'}">
              <span class="inline-block px-1.5 py-0.5 rounded text-[10px] sm:text-[10.5px] ${dayWeekendBadge}">${d.dayOfWeek}</span>
            </td>

            <td class="sticky-col-date p-1 text-center font-bold font-mono text-[11px] border-r border-slate-200 dark:border-slate-800 ${d.isWeekend ? 'bg-[#dce3ec] dark:bg-[#111826] text-amber-900 dark:text-amber-300' : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'}">
              ${d.displayDate}
            </td>
        `;

    courseData.subjects.forEach(sub => {
      sub.sections.forEach((sec, secIdx) => {
        dateRowHtml += _renderMatrixCell(d, sub, sec, secIdx, timetableMap, meetingCounters, todayKey);
      });
    });

    dateRowHtml += _renderMatrixNotesCell(d);
    dateRowHtml += `</tr>`;
    return dateRowHtml;
  }).join('');

  // Restore scroll position after DOM replacement
  if (scrollWrapper && (savedScrollLeft > 0 || savedScrollTop > 0)) {
    scrollWrapper.scrollLeft = savedScrollLeft;
    scrollWrapper.scrollTop = savedScrollTop;
  }

  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => setupSynchronizedScrollbars());
  } else {
    setupSynchronizedScrollbars();
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

/* ===========================================================================
 * LESSON MATRIX DRAG & DROP HANDLERS
 * ---------------------------------------------------------------------------
 * Reorganize lecture topic cards across dates and sections via drag and drop.
 * Supports:
 * - Move to empty slot
 * - Smooth swap between occupied slots
 * - Full 50-step undo/redo stack integration
 * - Scroll position preservation
 * ======================================================================== */

let currentDragOverCell = null;

function handleMatrixCardDragStart(e, target, data) {
  const cellKey = data?.cellKey || (target ? target.getAttribute('data-cell-key') : null);
  if (!cellKey) return;
  const entry = plannerEntries[cellKey];
  if (!entry) return;

  draggedMatrixCard = {
    cellKey: cellKey,
    dateKey: data?.date || target.getAttribute('data-date'),
    course: data?.course || target.getAttribute('data-course'),
    section: data?.section || target.getAttribute('data-section'),
    entry: JSON.parse(JSON.stringify(entry))
  };
  isDraggingMatrixCard = true;

  // Add high-performance dragging class to body
  document.body.classList.add('is-matrix-dragging');

  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', cellKey);
    } catch (err) {}
  }

  if (target) {
    target.classList.add('matrix-card-dragging');
  }
}

function handleMatrixCardDragEnd(e, target, data) {
  // Remove high-performance dragging class from body
  document.body.classList.remove('is-matrix-dragging');

  // Clear any dragged styles across document
  document.querySelectorAll('.matrix-card-dragging').forEach(el => el.classList.remove('matrix-card-dragging'));
  document.querySelectorAll('.matrix-cell-drag-over').forEach(el => el.classList.remove('matrix-cell-drag-over'));
  document.querySelectorAll('.matrix-cell-drag-over-swap').forEach(el => el.classList.remove('matrix-cell-drag-over-swap'));

  currentDragOverCell = null;
  draggedMatrixCard = null;

  // Suppress immediate click event on the cell
  setTimeout(() => {
    isDraggingMatrixCard = false;
  }, 100);
}

function handleMatrixCellDragOver(e, target, data) {
  if (!draggedMatrixCard) return;

  // Disallow dropping on official university holiday suspension dates
  if (data?.isNoclass === 'true' || (target && target.getAttribute('data-is-noclass') === 'true')) {
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'none';
    return;
  }

  const targetCellKey = data?.cellKey || (target ? target.getAttribute('data-cell-key') : null);
  if (!targetCellKey || targetCellKey === draggedMatrixCard.cellKey) {
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'none';
    return;
  }

  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }

  // ULTRA-PERFORMANCE: If mouse is moving within the same cell, skip all DOM mutations!
  if (target === currentDragOverCell) {
    return;
  }

  // Mouse moved to a new cell: clean up previous highlight
  if (currentDragOverCell && currentDragOverCell !== target) {
    currentDragOverCell.classList.remove('matrix-cell-drag-over', 'matrix-cell-drag-over-swap');
  }

  currentDragOverCell = target;

  const hasExistingEntry = !!plannerEntries[targetCellKey];
  if (target) {
    if (hasExistingEntry) {
      target.classList.remove('matrix-cell-drag-over');
      target.classList.add('matrix-cell-drag-over-swap');
    } else {
      target.classList.remove('matrix-cell-drag-over-swap');
      target.classList.add('matrix-cell-drag-over');
    }
  }
}

function handleMatrixCellDragLeave(e, target, data) {
  if (e && e.relatedTarget && target && target.contains(e.relatedTarget)) {
    return;
  }
  if (target) {
    target.classList.remove('matrix-cell-drag-over');
    target.classList.remove('matrix-cell-drag-over-swap');
  }
  if (target === currentDragOverCell) {
    currentDragOverCell = null;
  }
}

function _calculateMeetingNumberForCell(targetDateKey, subCode, sec, timetableMap) {
  let filteredDates = semesterDates || [];
  if (typeof selectedMonthFilter !== 'undefined' && selectedMonthFilter !== 'all') {
    filteredDates = filteredDates.filter(d => d.monthNum === selectedMonthFilter);
  }
  let count = 0;
  for (let i = 0; i < filteredDates.length; i++) {
    const d = filteredDates[i];
    if (d.isNoClassDate || d.isWeekend) {
      if (d.dateKey === targetDateKey) break;
      continue;
    }
    const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
    const scheduledSlot = timetableMap.get(`${subCode}__${sec}__${fullDay}`);
    if (scheduledSlot) {
      const k = d.dateKey + '__' + subCode + '__' + sec;
      const entry = plannerEntries[k];
      if (entry) {
        const isNoClass = (entry.type === 'No Class') || (entry.topic && entry.topic.toLowerCase().includes('no class'));
        if (!isNoClass) {
          count++;
        }
      }
    }
    if (d.dateKey === targetDateKey) break;
  }
  return count;
}

function _refreshSingleMatrixCell(cellKey) {
  const existingTd = document.getElementById('cell-' + cellKey);
  if (!existingTd) return false;

  const dateKey = existingTd.getAttribute('data-date');
  const courseCode = existingTd.getAttribute('data-course');
  const sec = existingTd.getAttribute('data-section');

  const d = (semesterDates || []).find(x => x.dateKey === dateKey);
  const sub = (courseData?.subjects || []).find(s => s.code === courseCode);
  if (!d || !sub) return false;

  const secIdx = Math.max(0, sub.sections.indexOf(sec));

  const timetableMap = new Map();
  (weeklyTimetable || []).forEach(t => {
    timetableMap.set(`${t.course}__${t.section}__${t.day}`, t);
  });

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const currentMeetingNum = _calculateMeetingNumberForCell(dateKey, courseCode, sec, timetableMap);
  const meetingCounters = { [courseCode + '__' + sec]: Math.max(0, currentMeetingNum - 1) };

  const newTdHtml = _renderMatrixCell(d, sub, sec, secIdx, timetableMap, meetingCounters, todayKey);

  const tempTable = document.createElement('table');
  tempTable.innerHTML = `<tbody><tr>${newTdHtml}</tr></tbody>`;
  const newTd = tempTable.querySelector('td');
  if (newTd) {
    existingTd.replaceWith(newTd);
    return true;
  }
  return false;
}

function _refreshColumnCells(courseCode, section) {
  let filteredDates = semesterDates || [];
  if (typeof selectedMonthFilter !== 'undefined' && selectedMonthFilter !== 'all') {
    filteredDates = filteredDates.filter(d => d.monthNum === selectedMonthFilter);
  }
  const timetableMap = new Map();
  (weeklyTimetable || []).forEach(t => {
    timetableMap.set(`${t.course}__${t.section}__${t.day}`, t);
  });
  const sub = (courseData?.subjects || []).find(s => s.code === courseCode);
  if (!sub) return;
  const secIdx = Math.max(0, sub.sections.indexOf(section));
  const meetingCounters = { [courseCode + '__' + section]: 0 };
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  filteredDates.forEach(d => {
    const cellKey = d.dateKey + '__' + courseCode + '__' + section;
    const existingTd = document.getElementById('cell-' + cellKey);
    if (!existingTd) return;

    const newTdHtml = _renderMatrixCell(d, sub, section, secIdx, timetableMap, meetingCounters, todayKey);
    const tempTable = document.createElement('table');
    tempTable.innerHTML = `<tbody><tr>${newTdHtml}</tr></tbody>`;
    const newTd = tempTable.querySelector('td');
    if (newTd) {
      existingTd.replaceWith(newTd);
    }
  });
}

function handleMatrixCellDrop(e, target, data) {
  e.preventDefault();
  if (target) {
    target.classList.remove('matrix-cell-drag-over');
    target.classList.remove('matrix-cell-drag-over-swap');
  }

  if (!draggedMatrixCard) return;

  const sourceCard = draggedMatrixCard;
  const sourceCellKey = sourceCard.cellKey;
  const targetCellKey = data?.cellKey || (target ? target.getAttribute('data-cell-key') : null);
  const targetDate = data?.date || (target ? target.getAttribute('data-date') : null);
  const targetCourse = data?.course || (target ? target.getAttribute('data-course') : null);
  const targetSec = data?.section || (target ? target.getAttribute('data-section') : null);

  if (!targetCellKey || targetCellKey === sourceCellKey) {
    handleMatrixCardDragEnd(e, null, data);
    return;
  }

  if (data?.isNoclass === 'true' || (target && target.getAttribute('data-is-noclass') === 'true')) {
    showToast(`Cannot schedule lessons on official suspension date (${targetDate})`, '⚠️');
    handleMatrixCardDragEnd(e, null, data);
    return;
  }

  const sourceEntry = plannerEntries[sourceCellKey];
  if (!sourceEntry) {
    handleMatrixCardDragEnd(e, null, data);
    return;
  }

  const targetEntry = plannerEntries[targetCellKey];

  // 1. Push to 50-step undo history
  const undoLabel = targetEntry
    ? `Swap Lessons: ${sourceCard.course} (${sourceCard.dateKey}) ↔ ${targetCourse} (${targetDate})`
    : `Move Lesson: "${sourceEntry.topic || 'Activity'}" to ${targetCourse} (${targetDate})`;
  if (typeof pushPlannerUndo === 'function') {
    pushPlannerUndo(undoLabel);
  }

  // 2. Perform Move or Swap in state
  if (targetEntry) {
    // Swap entries
    plannerEntries[targetCellKey] = sourceEntry;
    plannerEntries[sourceCellKey] = targetEntry;
  } else {
    // Move to empty cell
    plannerEntries[targetCellKey] = sourceEntry;
    delete plannerEntries[sourceCellKey];
  }

  // 3. Ultra-fast targeted DOM refresh
  let refreshed = false;
  try {
    if (targetEntry) {
      // For Swap: only the 2 swapped cells need re-rendering
      const r1 = _refreshSingleMatrixCell(sourceCellKey);
      const r2 = _refreshSingleMatrixCell(targetCellKey);
      refreshed = r1 && r2;
    } else {
      // For Move: refresh affected column(s) to guarantee meeting counters remain 100% accurate
      _refreshColumnCells(sourceCard.course, sourceCard.section);
      if (targetCourse !== sourceCard.course || targetSec !== sourceCard.section) {
        _refreshColumnCells(targetCourse, targetSec);
      }
      refreshed = true;
    }
  } catch (err) {
    console.warn('[Matrix Drag] Fast refresh failed, falling back to Render pipeline:', err);
    refreshed = false;
  }

  if (refreshed) {
    if (typeof updateSemesterProgressBar === 'function') updateSemesterProgressBar();
    if (typeof updatePlannerSidebar === 'function') updatePlannerSidebar();
    if (typeof updateTimetableSidebar === 'function') updateTimetableSidebar();
    if (typeof updateUndoRedoButtonState === 'function') updateUndoRedoButtonState();
    if (typeof saveAppState === 'function') saveAppState();
  } else {
    // Fallback if targeted replacement encountered an unexpected state
    const scrollWrapper = document.getElementById('matrix-scroll-wrapper');
    const savedScrollLeft = scrollWrapper ? scrollWrapper.scrollLeft : 0;
    const savedScrollTop = scrollWrapper ? scrollWrapper.scrollTop : 0;

    if (typeof Render !== 'undefined' && typeof Render.after === 'function') {
      Render.after('lesson');
    } else {
      if (typeof saveAppState === 'function') saveAppState();
      if (typeof renderMatrixTable === 'function') renderMatrixTable();
    }

    const newWrapper = document.getElementById('matrix-scroll-wrapper');
    if (newWrapper) {
      newWrapper.scrollLeft = savedScrollLeft;
      newWrapper.scrollTop = savedScrollTop;
    }
  }

  // 4. Toast Feedback
  const topicTitle = (sourceEntry.topic || 'Lesson').trim();
  const truncatedTopic = topicTitle.length > 28 ? topicTitle.substring(0, 26) + '…' : topicTitle;
  if (targetEntry) {
    showToast(`Swapped "${truncatedTopic}" with ${targetCourse} (${targetSec}) on ${targetDate}!`, '🔄');
  } else {
    showToast(`Moved "${truncatedTopic}" to ${targetCourse} (${targetSec}) on ${targetDate}!`, '✓');
  }

  handleMatrixCardDragEnd(e, null, data);
}

if (typeof window !== 'undefined') {
  window.handleMatrixCardDragStart = handleMatrixCardDragStart;
  window.handleMatrixCardDragEnd = handleMatrixCardDragEnd;
  window.handleMatrixCellDragOver = handleMatrixCellDragOver;
  window.handleMatrixCellDragLeave = handleMatrixCellDragLeave;
  window.handleMatrixCellDrop = handleMatrixCellDrop;
  window._refreshSingleMatrixCell = _refreshSingleMatrixCell;
  window._refreshColumnCells = _refreshColumnCells;
  window._resolveSectionSlot = _resolveSectionSlot;
}
