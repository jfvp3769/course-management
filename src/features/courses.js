/* ===========================================================================
 * COURSE & SECTION MANAGEMENT
 * ---------------------------------------------------------------------------
 * Subjects and sections: create, rename, reorder, recolour and delete.
 * ======================================================================== */

function moveSubjectOrder(index, direction) {
  if (!courseData || !courseData.subjects) return;
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= courseData.subjects.length) return;

  const item = courseData.subjects[index];
  const otherItem = courseData.subjects[newIndex];
  const safeCodeA = item.code.replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeCodeB = otherItem.code.replace(/[^a-zA-Z0-9_-]/g, '_');

  // 1. FIRST: Capture bounding rects before DOM re-render
  const cardA = document.getElementById(`manage-subject-card-${safeCodeA}`);
  const cardB = document.getElementById(`manage-subject-card-${safeCodeB}`);
  const rectA = cardA ? cardA.getBoundingClientRect() : null;
  const rectB = cardB ? cardB.getBoundingClientRect() : null;

  // 2. Mutate state
  courseData.subjects.splice(index, 1);
  courseData.subjects.splice(newIndex, 0, item);

  saveAppState();
  renderMatrixTable();
  openManageCoursesModal();

  // 3. LAST, INVERT, PLAY: Animate the physical card swap
  if (rectA && rectB) {
    const newCardA = document.getElementById(`manage-subject-card-${safeCodeA}`);
    const newCardB = document.getElementById(`manage-subject-card-${safeCodeB}`);
    if (newCardA && newCardB) {
      const newRectA = newCardA.getBoundingClientRect();
      const newRectB = newCardB.getBoundingClientRect();
      const deltaYA = rectA.top - newRectA.top;
      const deltaYB = rectB.top - newRectB.top;

      newCardA.style.transform = `translateY(${deltaYA}px)`;
      newCardA.style.transition = 'none';
      newCardA.style.willChange = 'transform';
      newCardA.style.zIndex = '10';

      newCardB.style.transform = `translateY(${deltaYB}px)`;
      newCardB.style.transition = 'none';
      newCardB.style.willChange = 'transform';
      newCardB.style.zIndex = '5';

      // Force reflow
      newCardA.offsetHeight;

      requestAnimationFrame(() => {
        newCardA.style.transition = 'transform 580ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 580ms ease';
        newCardA.style.transform = 'translateY(0)';
        newCardA.classList.add('ring-2', 'ring-msu-gold/80', 'shadow-md');

        newCardB.style.transition = 'transform 580ms cubic-bezier(0.22, 1, 0.36, 1)';
        newCardB.style.transform = 'translateY(0)';

        setTimeout(() => {
          newCardA.style.transform = '';
          newCardA.style.transition = '';
          newCardA.style.willChange = '';
          newCardA.style.zIndex = '';
          newCardA.classList.remove('ring-2', 'ring-msu-gold/80', 'shadow-md');

          newCardB.style.transform = '';
          newCardB.style.transition = '';
          newCardB.style.willChange = '';
          newCardB.style.zIndex = '';
        }, 640);
      });
    }
  }

  showToast(`Moved ${item.code} ${direction < 0 ? 'up (left in matrix)' : 'down (right in matrix)'}!`);
}

function moveSectionOrder(subIdx, secIdx, direction) {
  if (!courseData || !courseData.subjects || !courseData.subjects[subIdx]) return;
  const sub = courseData.subjects[subIdx];
  if (!sub.sections) return;
  const newIdx = secIdx + direction;
  if (newIdx < 0 || newIdx >= sub.sections.length) return;

  const sec = sub.sections[secIdx];
  const otherSec = sub.sections[newIdx];
  const safeSub = sub.code.replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeSecA = sec.replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeSecB = otherSec.replace(/[^a-zA-Z0-9_-]/g, '_');

  // 1. FIRST: Capture bounding rects before DOM re-render
  const rowA = document.getElementById(`manage-sec-row-${safeSub}__${safeSecA}`);
  const rowB = document.getElementById(`manage-sec-row-${safeSub}__${safeSecB}`);
  const rectA = rowA ? rowA.getBoundingClientRect() : null;
  const rectB = rowB ? rowB.getBoundingClientRect() : null;

  // 2. Mutate state
  sub.sections.splice(secIdx, 1);
  sub.sections.splice(newIdx, 0, sec);

  saveAppState();
  renderMatrixTable();
  openManageCoursesModal();

  // 3. LAST, INVERT, PLAY: Animate the physical row swap
  if (rectA && rectB) {
    const newRowA = document.getElementById(`manage-sec-row-${safeSub}__${safeSecA}`);
    const newRowB = document.getElementById(`manage-sec-row-${safeSub}__${safeSecB}`);
    if (newRowA && newRowB) {
      const newRectA = newRowA.getBoundingClientRect();
      const newRectB = newRowB.getBoundingClientRect();
      const deltaYA = rectA.top - newRectA.top;
      const deltaYB = rectB.top - newRectB.top;

      newRowA.style.transform = `translateY(${deltaYA}px)`;
      newRowA.style.transition = 'none';
      newRowA.style.willChange = 'transform';
      newRowA.style.zIndex = '10';

      newRowB.style.transform = `translateY(${deltaYB}px)`;
      newRowB.style.transition = 'none';
      newRowB.style.willChange = 'transform';
      newRowB.style.zIndex = '5';

      // Force reflow
      newRowA.offsetHeight;

      requestAnimationFrame(() => {
        newRowA.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms ease';
        newRowA.style.transform = 'translateY(0)';
        newRowA.classList.add('ring-2', 'ring-msu-gold/80', 'shadow-xs');

        newRowB.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
        newRowB.style.transform = 'translateY(0)';

        setTimeout(() => {
          newRowA.style.transform = '';
          newRowA.style.transition = '';
          newRowA.style.willChange = '';
          newRowA.style.zIndex = '';
          newRowA.classList.remove('ring-2', 'ring-msu-gold/80', 'shadow-xs');

          newRowB.style.transform = '';
          newRowB.style.transition = '';
          newRowB.style.willChange = '';
          newRowB.style.zIndex = '';
        }, 550);
      });
    }
  }

  showToast(`Moved section ${sec} ${direction < 0 ? 'up (left in matrix)' : 'down (right in matrix)'}!`);
}

function openManageCoursesModal() {
  renderColorSwatches('new');
  const container = document.getElementById('manage-courses-list');
  if (!container) return;

  // Preserve scroll position inside modal if re-rendering while open
  const scrollParent = container.parentElement;
  const prevScrollTop = scrollParent ? scrollParent.scrollTop : 0;

  container.innerHTML = courseData.subjects.map((sub, subIdx) => {
    const subSlots = weeklyTimetable.filter(t => t.course === sub.code);
    const isFirstSub = (subIdx === 0);
    const isLastSub = (subIdx === courseData.subjects.length - 1);
    const safeSub = sub.code.replace(/[^a-zA-Z0-9_-]/g, '_');

    return `
          <div id="manage-subject-card-${safeSub}" class="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5 transition-shadow">
            <div class="flex items-center justify-between gap-2.5">
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <!-- Leftmost Stacked Reorder Arrows -->
                <div class="inline-flex flex-col border border-slate-300 dark:border-slate-600 rounded-md overflow-hidden bg-white dark:bg-slate-800 shadow-2xs shrink-0 select-none">
                  <button type="button" data-action="moveSubjectOrder" data-sub-idx="${subIdx}" data-dir="-1" ${isFirstSub ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border-b border-slate-200 dark:border-slate-700 transition ${isFirstSub ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move ${escapeHtml(sub.code)} Up (Shift Left in Matrix)">
                    <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
                  </button>
                  <button type="button" data-action="moveSubjectOrder" data-sub-idx="${subIdx}" data-dir="1" ${isLastSub ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition ${isLastSub ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move ${escapeHtml(sub.code)} Down (Shift Right in Matrix)">
                    <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-extrabold text-sm text-slate-900 dark:text-slate-100">${escapeHtml(sub.code)}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded ${sub.headerBg}">${sub.units} Units</span>
                  </div>
                  <div class="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">${escapeHtml(sub.title)}</div>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button type="button" data-action="openEditSubjectModal" data-code="${escapeHtml(sub.code)}" class="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1">
                  ✎ Edit Details
                </button>
                <button type="button" data-action="requestRemoveSubject" data-code="${escapeHtml(sub.code)}" class="px-2.5 py-1 bg-rose-50 dark:bg-rose-500/15 hover:bg-rose-100 dark:hover:bg-rose-500/25 border border-rose-200 dark:border-rose-500/35 rounded-lg text-rose-700 dark:text-rose-300 font-semibold text-xs">
                  Delete
                </button>
              </div>
            </div>

            <div class="border-t border-slate-200 dark:border-slate-700 pt-2 space-y-1.5">
              <div class="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                <span>Sections & Scheduled Hours:</span>
                <button type="button" data-action="openAddSectionModal" data-code="${escapeHtml(sub.code)}" class="text-msu-maroon dark:text-amber-400 hover:underline font-bold text-[11px]">+ Add Section</button>
              </div>
              <div class="space-y-1.5">
                ${sub.sections.map((sec, secIdx) => {
              const secSlots = subSlots.filter(s => s.section === sec);
              const accentBar = getSectionAccent(secIdx);
              const isFirstSec = (secIdx === 0);
              const isLastSec = (secIdx === sub.sections.length - 1);
              const safeSec = sec.replace(/[^a-zA-Z0-9_-]/g, '_');

              return `
                    <div id="manage-sec-row-${safeSub}__${safeSec}" class="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${accentBar} transition-shadow">
                      <div class="flex items-center gap-2.5 min-w-0 flex-1">
                        <!-- Leftmost Stacked Reorder Arrows -->
                        <div class="inline-flex flex-col border border-slate-300 dark:border-slate-600 rounded-md overflow-hidden bg-white dark:bg-slate-800 shadow-2xs shrink-0 select-none">
                          <button type="button" data-action="moveSectionOrder" data-sub-idx="${subIdx}" data-sec-idx="${secIdx}" data-dir="-1" ${isFirstSec ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border-b border-slate-200 dark:border-slate-700 transition ${isFirstSec ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move Section ${escapeHtml(sec)} Up (Shift Left in Matrix)">
                            <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
                          </button>
                          <button type="button" data-action="moveSectionOrder" data-sub-idx="${subIdx}" data-sec-idx="${secIdx}" data-dir="1" ${isLastSec ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition ${isLastSec ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move Section ${escapeHtml(sec)} Down (Shift Right in Matrix)">
                            <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                          </button>
                        </div>
                        <span class="font-extrabold text-xs bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-600 shrink-0">${escapeHtml(sec)}</span>
                        <div class="text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">
                          ${secSlots.length > 0 
                        ? secSlots.map(s => `<span class="inline-block mr-2 font-mono text-slate-700 dark:text-slate-200 font-semibold">${escapeHtml(s.day.substring(0,3))} ${formatTime12(s.startTime)}–${formatTime12(s.endTime)} (${escapeHtml(s.room)})</span>`).join('') 
                        : '<span class="text-slate-400 dark:text-slate-500 italic font-sans">No schedule assigned yet</span>'}
                        </div>
                      </div>
                      <div class="flex items-center gap-1.5 shrink-0 ml-auto">
                        <button type="button" data-action="openEditSectionModal" data-code="${escapeHtml(sub.code)}" data-sec="${escapeHtml(sec)}" class="px-2.5 py-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg font-semibold text-xs flex items-center gap-1 transition shadow-2xs">
                          ✎ Edit Section
                        </button>
                        <button type="button" data-action="requestRemoveSection" data-code="${escapeHtml(sub.code)}" data-sec="${escapeHtml(sec)}" class="px-2.5 py-1 bg-rose-50 dark:bg-rose-500/15 hover:bg-rose-100 dark:hover:bg-rose-500/25 border border-rose-200 dark:border-rose-500/35 rounded-lg text-rose-700 dark:text-rose-300 font-semibold text-xs transition">
                          Remove
                        </button>
                      </div>
                    </div>
                  `;
            }).join('')}
              </div>
            </div>
          </div>
        `;
  }).join('');

  if (scrollParent) {
    scrollParent.scrollTop = prevScrollTop;
  }

  document.getElementById('manage-courses-modal').classList.remove('hidden');
}

function closeManageCoursesModal() {
  document.getElementById('manage-courses-modal').classList.add('hidden');
  closeScheduleEditorModal();
}

function openScheduleEditorForCourseSection(course, section) {
  openAddScheduleModal();
  document.getElementById('sched-course-select').value = course;
  updateScheduleSectionDropdown(section);
}

function openAddSectionModal(courseCode) {
  const sub = courseData.subjects.find(s => s.code === courseCode);
  if (!sub) return;

  document.getElementById('add-section-course-code').value = courseCode;
  document.getElementById('add-section-name').value = '';
  document.getElementById('add-section-classroom-url').value = '';

  // Reset schedule inputs
  const dayCheckboxes = document.querySelectorAll('#add-section-days-group input[type="checkbox"]');
  dayCheckboxes.forEach(cb => { cb.checked = false; });
  const startTimeInput = document.getElementById('add-section-start-time');
  if (startTimeInput) startTimeInput.value = '07:30';
  const endTimeInput = document.getElementById('add-section-end-time');
  if (endTimeInput) endTimeInput.value = '09:00';
  const roomInput = document.getElementById('add-section-room');
  if (roomInput) roomInput.value = '';
  const typeInput = document.getElementById('add-section-type');
  if (typeInput) typeInput.value = 'Lecture';

  const subtitle = document.getElementById('add-section-modal-subtitle');
  if (subtitle) {
    subtitle.innerText = `Configure new section for ${sub.code} • ${sub.title}`;
  }

  document.getElementById('add-section-modal').classList.remove('hidden');
  setTimeout(() => {
    const input = document.getElementById('add-section-name');
    if (input) input.focus();
  }, 50);
}

function closeAddSectionModal() {
  document.getElementById('add-section-modal').classList.add('hidden');
}

function submitAddSection(e) {
  if (e) e.preventDefault();
  const courseCode = document.getElementById('add-section-course-code').value;
  const secNameInput = document.getElementById('add-section-name').value.trim();
  let classroomUrl = document.getElementById('add-section-classroom-url').value.trim();

  if (!secNameInput) {
    showToast("Please enter a section name.", "⚠️");
    return;
  }

  const sub = courseData.subjects.find(s => s.code === courseCode);
  if (!sub) return;

  if (sub.sections.includes(secNameInput)) {
    showToast(`Section "${secNameInput}" already exists for ${courseCode}.`, "⚠️");
    return;
  }

  // Check optional schedule inputs
  const checkedDays = Array.from(document.querySelectorAll('#add-section-days-group input[type="checkbox"]:checked')).map(c => c.value);
  let startTime = '';
  let endTime = '';
  let room = 'TBA';
  let type = 'Lecture';

  if (checkedDays.length > 0) {
    startTime = (document.getElementById('add-section-start-time')?.value || '').trim();
    endTime = (document.getElementById('add-section-end-time')?.value || '').trim();
    room = (document.getElementById('add-section-room')?.value || '').trim() || 'TBA';
    type = document.getElementById('add-section-type')?.value || 'Lecture';

    if (!startTime || !endTime || startTime >= endTime) {
      showToast("Schedule start time must be strictly earlier than end time.", "⚠️");
      return;
    }
  }

  sub.sections.push(secNameInput);
  columnWidths[courseCode + '__' + secNameInput] = 205;

  if (classroomUrl) {
    if (!/^https?:\/\//i.test(classroomUrl)) {
      classroomUrl = 'https://' + classroomUrl;
    }
    setClassroomLink(courseCode, secNameInput, classroomUrl);
  }

  // Add weekly timetable schedule slots if specified
  if (checkedDays.length > 0) {
    checkedDays.forEach(day => {
      const dupIdx = weeklyTimetable.findIndex(t => t.course === courseCode && t.section === secNameInput && t.day === day && t.startTime === startTime);
      if (dupIdx >= 0) {
        weeklyTimetable.splice(dupIdx, 1);
      }
      weeklyTimetable.push({
        course: courseCode,
        section: secNameInput,
        day,
        startTime,
        endTime,
        room,
        type
      });
    });
  }

  saveAppState();
  closeAddSectionModal();
  openManageCoursesModal();
  renderMatrixTable();
  if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
  Render.views('roster');

  const toastMsg = checkedDays.length > 0
    ? `Added section ${secNameInput} (${checkedDays.map(d => d.slice(0,3)).join(', ')}) to ${courseCode}!`
    : `Added section ${secNameInput} to ${courseCode}!`;
  showToast(toastMsg);
}

function promptAddSection(courseCode) {
  openAddSectionModal(courseCode);
}

function openEditSectionModal(courseCode, sectionName) {
  const sub = courseData.subjects.find(s => s.code === courseCode);
  if (!sub) return;

  document.getElementById('edit-section-course-code').value = courseCode;
  document.getElementById('edit-section-original-name').value = sectionName;
  document.getElementById('edit-section-name').value = sectionName;

  // Preload current Google Classroom URL
  const currentClassroomUrl = (typeof getClassroomLink === 'function') ? getClassroomLink(courseCode, sectionName) : '';
  const classroomInput = document.getElementById('edit-section-classroom-url');
  if (classroomInput) {
    classroomInput.value = currentClassroomUrl || '';
  }

  const subtitle = document.getElementById('edit-section-modal-subtitle');
  if (subtitle) {
    subtitle.innerText = `Update section for ${courseCode} • ${sub.title}`;
  }

  // Preload current schedules for this section
  const secSlots = (weeklyTimetable || []).filter(t => t.course === courseCode && t.section === sectionName);
  const dayCheckboxes = document.querySelectorAll('#edit-section-days-group input[type="checkbox"]');
  
  const activeDays = secSlots.map(s => s.day);
  dayCheckboxes.forEach(cb => {
    cb.checked = activeDays.includes(cb.value);
  });

  const firstSlot = secSlots[0] || {};
  document.getElementById('edit-section-start-time').value = firstSlot.startTime || '07:30';
  document.getElementById('edit-section-end-time').value = firstSlot.endTime || '09:00';
  document.getElementById('edit-section-room').value = firstSlot.room || 'TBA';
  document.getElementById('edit-section-type').value = firstSlot.type || 'Lecture';

  document.getElementById('edit-section-modal').classList.remove('hidden');
}

function closeEditSectionModal() {
  document.getElementById('edit-section-modal').classList.add('hidden');
}

function submitEditSection(e) {
  if (e) e.preventDefault();
  const courseCode = document.getElementById('edit-section-course-code').value;
  const origName = document.getElementById('edit-section-original-name').value;
  const newName = document.getElementById('edit-section-name').value.trim();
  let classroomUrl = (document.getElementById('edit-section-classroom-url')?.value || '').trim();

  if (!newName) {
    showToast("Please enter a section name.", "⚠️");
    return;
  }

  const sub = courseData.subjects.find(s => s.code === courseCode);
  if (!sub) return;

  // Check if renamed name conflicts with another existing section
  if (newName !== origName && sub.sections.includes(newName)) {
    showToast(`Section "${newName}" already exists for ${courseCode}.`, "⚠️");
    return;
  }

  // Format URL protocol if specified
  if (classroomUrl && !/^https?:\/\//i.test(classroomUrl)) {
    classroomUrl = 'https://' + classroomUrl;
  }

  const checkedDays = Array.from(document.querySelectorAll('#edit-section-days-group input[type="checkbox"]:checked')).map(c => c.value);
  const startTime = (document.getElementById('edit-section-start-time')?.value || '').trim();
  const endTime = (document.getElementById('edit-section-end-time')?.value || '').trim();
  const room = (document.getElementById('edit-section-room')?.value || '').trim() || 'TBA';
  const type = document.getElementById('edit-section-type')?.value || 'Lecture';

  if (checkedDays.length > 0 && (!startTime || !endTime || startTime >= endTime)) {
    showToast("Start time must be strictly earlier than End time.", "⚠️");
    return;
  }

  // 1. Rename Section Cascade across all data stores if name changed
  if (newName !== origName) {
    const secIdx = sub.sections.indexOf(origName);
    if (secIdx !== -1) sub.sections[secIdx] = newName;

    // Column widths
    if (columnWidths[`${courseCode}__${origName}`] !== undefined) {
      columnWidths[`${courseCode}__${newName}`] = columnWidths[`${courseCode}__${origName}`];
      delete columnWidths[`${courseCode}__${origName}`];
    }

    // Clean up old Google Classroom link key if name changed
    if (courseData.classroomLinks && courseData.classroomLinks[`${courseCode}__${origName}`]) {
      delete courseData.classroomLinks[`${courseCode}__${origName}`];
    }

    // Timetable sections
    weeklyTimetable.forEach(t => {
      if (t.course === courseCode && t.section === origName) {
        t.section = newName;
      }
    });

    // Lesson Planner entries
    const newPlanner = {};
    Object.keys(plannerEntries).forEach(k => {
      if (k.includes(`__${courseCode}__${origName}`)) {
        const replaced = k.replace(`__${courseCode}__${origName}`, `__${courseCode}__${newName}`);
        newPlanner[replaced] = plannerEntries[k];
      } else {
        newPlanner[k] = plannerEntries[k];
      }
    });
    plannerEntries = newPlanner;

    // Student Roster enrollment
    studentRoster.forEach(s => {
      if (s.section === `${courseCode} - ${origName}` || s.section === origName) {
        s.section = `${courseCode} - ${newName}`;
      }
    });
  }

  // 2. Persist the Google Classroom link under the active section name
  if (typeof setClassroomLink === 'function') {
    setClassroomLink(courseCode, newName, classroomUrl);
  }

  // 3. Re-assign schedules for this section
  weeklyTimetable = weeklyTimetable.filter(t => !(t.course === courseCode && t.section === newName));

  if (checkedDays.length > 0) {
    checkedDays.forEach(day => {
      weeklyTimetable.push({
        course: courseCode,
        section: newName,
        day,
        startTime,
        endTime,
        room,
        type
      });
    });
  }

  saveAppState();
  closeEditSectionModal();
  openManageCoursesModal();
  renderMatrixTable();
  if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
  Render.views('roster');
  showToast(`Updated section ${newName} for ${courseCode}!`);
}

function addNewSubject() {
  const code = document.getElementById('new-course-code').value.trim().toUpperCase();
  const title = document.getElementById('new-course-title').value.trim();
  const theme = document.getElementById('new-course-color').value;

  if (!code) {
    showToast("Please enter a subject code.", "⚠️");
    return;
  }

  if (courseData.subjects.some(s => s.code === code)) {
    showToast("Subject code already exists.", "⚠️");
    return;
  }

  const pal = COLOR_PALETTES[theme] || COLOR_PALETTES.blue;

  courseData.subjects.push({
    code,
    title: title || code,
    units: 3,
    colorTheme: theme,
    color: pal.color,
    headerBg: pal.headerBg,
    badgeBg: pal.badgeBg,
    sections: ["Main"]
  });

  columnWidths[code + '__Main'] = 190;

  document.getElementById('new-course-code').value = '';
  document.getElementById('new-course-title').value = '';
  const newColorEl = document.getElementById('new-course-color');
  if (newColorEl) newColorEl.value = 'blue';

  saveAppState();
  openManageCoursesModal();
  Render.views('courses');
  showToast('Subject ' + code + ' added.');
}

function showConfirmation(title, message, onConfirm) {
  document.getElementById('confirm-title').innerText = title;
  document.getElementById('confirm-message').innerText = message;
  pendingConfirmationAction = onConfirm;
  document.getElementById('confirm-modal').classList.remove('hidden');
}

function executeConfirmation() {
  if (typeof pendingConfirmationAction === 'function') {
    pendingConfirmationAction();
  }
  cancelConfirmation();
}

function cancelConfirmation() {
  pendingConfirmationAction = null;
  document.getElementById('confirm-modal').classList.add('hidden');
}

function requestRemoveSubject(courseCode) {
  showConfirmation(
    'Delete Subject ' + courseCode + '?',
    'This will remove ' + courseCode + ', all its sections, weekly schedules, enrolled students, and planned lesson records.',
    () => {
      courseData.subjects = courseData.subjects.filter(s => s.code !== courseCode);
      weeklyTimetable = weeklyTimetable.filter(t => t.course !== courseCode);

      Object.keys(plannerEntries).forEach(k => {
        if (k.includes('__' + courseCode + '__')) delete plannerEntries[k];
      });

      studentRoster = studentRoster.filter(s => !s.section || !s.section.startsWith(courseCode + ' - '));
      cleanupOrphanedStudents();

      saveAppState();
      openManageCoursesModal();
      Render.views('courses');
      showToast('Subject ' + courseCode + ' deleted.');
    }
  );
}

function requestRemoveSection(courseCode, section) {
  showConfirmation(
    'Remove Section ' + section + '?',
    'Remove section ' + section + ' from ' + courseCode + ' and clear its scheduled periods and enrolled students?',
    () => {
      const sub = courseData.subjects.find(s => s.code === courseCode);
      if (sub) {
        sub.sections = sub.sections.filter(sec => sec !== section);
        weeklyTimetable = weeklyTimetable.filter(t => !(t.course === courseCode && t.section === section));

        Object.keys(plannerEntries).forEach(k => {
          if (k.includes('__' + courseCode + '__' + section)) delete plannerEntries[k];
        });

        studentRoster = studentRoster.filter(s => !(s.section === `${courseCode} - ${section}` || s.section === section));
        cleanupOrphanedStudents();

        saveAppState();
        openManageCoursesModal();
        Render.views('courses');
        showToast('Removed section ' + section + ' from ' + courseCode + '.');
      }
    }
  );
}

function openEditSubjectModal(code) {
  const sub = courseData.subjects.find(s => s.code === code);
  if (!sub) return;

  document.getElementById('edit-course-original-code').value = sub.code;
  document.getElementById('edit-course-code').value = sub.code;
  document.getElementById('edit-course-title').value = sub.title;
  document.getElementById('edit-course-units').value = sub.units || 3;
  document.getElementById('edit-course-color').value = sub.colorTheme || 'blue';
  renderColorSwatches('edit');

  document.getElementById('edit-course-modal').classList.remove('hidden');
}

function closeEditSubjectModal() {
  document.getElementById('edit-course-modal').classList.add('hidden');
}

function saveEditSubject() {
  const origCode = document.getElementById('edit-course-original-code').value;
  const newCode = document.getElementById('edit-course-code').value.trim().toUpperCase();
  const newTitle = document.getElementById('edit-course-title').value.trim();
  const newUnits = parseInt(document.getElementById('edit-course-units').value) || 3;
  const newTheme = document.getElementById('edit-course-color').value;

  if (!newCode) {
    showToast("Please specify a course code.", "⚠️");
    return;
  }

  const sub = courseData.subjects.find(s => s.code === origCode);
  if (!sub) return;

  const pal = COLOR_PALETTES[newTheme] || COLOR_PALETTES.blue;

  sub.code = newCode;
  sub.title = newTitle || newCode;
  sub.units = newUnits;
  sub.colorTheme = newTheme;
  sub.color = pal.color;
  sub.headerBg = pal.headerBg;
  sub.badgeBg = pal.badgeBg;

  if (origCode !== newCode) {
    weeklyTimetable.forEach(t => {
      if (t.course === origCode) t.course = newCode;
    });

    const newPlanner = {};
    Object.keys(plannerEntries).forEach(k => {
      if (k.includes('__' + origCode + '__')) {
        const replaced = k.replace('__' + origCode + '__', '__' + newCode + '__');
        newPlanner[replaced] = plannerEntries[k];
      } else {
        newPlanner[k] = plannerEntries[k];
      }
    });
    plannerEntries = newPlanner;

    studentRoster.forEach(s => {
      if (s.section && s.section.startsWith(origCode + ' - ')) {
        s.section = s.section.replace(origCode + ' - ', newCode + ' - ');
      }
    });
  }

  saveAppState();
  closeEditSubjectModal();
  openManageCoursesModal();
  Render.only('matrix', 'timetable', 'roster', 'gradebook');
  showToast('Subject ' + newCode + ' updated.');
}
