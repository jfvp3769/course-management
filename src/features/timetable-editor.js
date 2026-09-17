/* ===========================================================================
 * TIMETABLE SLOT EDITOR
 * ---------------------------------------------------------------------------
 * Add, edit and delete individual weekly schedule slots.
 * ======================================================================== */

function openEditScheduleModalForSlot(course, section, day, startTime) {
  const idx = weeklyTimetable.findIndex(t => t.course === course && t.section === section && t.day === day && t.startTime === startTime);
  if (idx === -1) return;

  const slot = weeklyTimetable[idx];

  document.getElementById('sched-editor-title').innerText = 'Edit Section Schedule (' + course + ')';
  document.getElementById('sched-editor-subtitle').innerText = 'Update days, hours, and room for section ' + section + '.';
  document.getElementById('sched-edit-index').value = idx;
  document.getElementById('sched-delete-btn').classList.remove('hidden');

  populateScheduleModalDropdowns(course, section);

  const checkboxes = document.querySelectorAll('#sched-days-group input[type="checkbox"]');
  checkboxes.forEach(c => {
    c.checked = (c.value === day);
  });

  document.getElementById('sched-start-time').value = slot.startTime;
  document.getElementById('sched-end-time').value = slot.endTime;
  document.getElementById('sched-room-input').value = slot.room;
  document.getElementById('sched-type-input').value = slot.type || 'Lecture';

  const classroomInput = document.getElementById('sched-classroom-url');
  if (classroomInput) {
    classroomInput.value = (typeof getClassroomLink === 'function' ? getClassroomLink(course, section) : '') || '';
  }

  document.getElementById('schedule-modal').classList.remove('hidden');
}

function openAddScheduleModal() {
  document.getElementById('sched-editor-title').innerText = "Add Section Schedule";
  document.getElementById('sched-editor-subtitle').innerText = "Configure meeting hours and room allocation.";
  document.getElementById('sched-edit-index').value = "-1";
  document.getElementById('sched-delete-btn').classList.add('hidden');

  populateScheduleModalDropdowns();

  const checkboxes = document.querySelectorAll('#sched-days-group input[type="checkbox"]');
  checkboxes.forEach(c => c.checked = false);

  document.getElementById('sched-start-time').value = "07:30";
  document.getElementById('sched-end-time').value = "09:00";
  document.getElementById('sched-room-input').value = "Eng 201";

  const classroomInput = document.getElementById('sched-classroom-url');
  if (classroomInput) {
    classroomInput.value = '';
  }

  document.getElementById('schedule-modal').classList.remove('hidden');
}

function populateScheduleModalDropdowns(selectedCourse = null, selectedSec = null) {
  const courseSelect = document.getElementById('sched-course-select');
  courseSelect.innerHTML = courseData.subjects.map(s => `
        <option value="${s.code}" ${selectedCourse === s.code ? 'selected' : ''}>${escapeHtml(s.code)} - ${escapeHtml(s.title)}</option>
      `).join('');
  if (selectedCourse) courseSelect.value = selectedCourse;

  updateScheduleSectionDropdown(selectedSec);
}

function updateScheduleSectionDropdown(selectedSec = null) {
  const courseCode = document.getElementById('sched-course-select').value;
  const sub = courseData.subjects.find(s => s.code === courseCode);
  const secSelect = document.getElementById('sched-section-select');

  if (!sub || !sub.sections.length) {
    secSelect.innerHTML = '<option value="Main">Main</option>';
    secSelect.value = 'Main';
    return;
  }

  secSelect.innerHTML = sub.sections.map(sec => `
        <option value="${sec}" ${selectedSec === sec ? 'selected' : ''}>${escapeHtml(sec)}</option>
      `).join('');
  if (selectedSec) secSelect.value = selectedSec;

  const classroomInput = document.getElementById('sched-classroom-url');
  if (classroomInput && typeof getClassroomLink === 'function') {
    const activeSec = selectedSec || secSelect.value;
    classroomInput.value = (activeSec ? getClassroomLink(courseCode, activeSec) : '') || '';
  }
}

function closeScheduleEditorModal() {
  document.getElementById('schedule-modal').classList.add('hidden');
}

function saveScheduleEditorData() {
  const course = document.getElementById('sched-course-select').value;
  const section = document.getElementById('sched-section-select').value;
  const startTime = document.getElementById('sched-start-time').value;
  const endTime = document.getElementById('sched-end-time').value;
  const room = document.getElementById('sched-room-input').value.trim() || 'TBA';
  const type = document.getElementById('sched-type-input').value;
  const editIndex = parseInt(document.getElementById('sched-edit-index').value);
  const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');

  const classroomInput = document.getElementById('sched-classroom-url');
  if (classroomInput && typeof setClassroomLink === 'function') {
    let cleanClassUrl = classroomInput.value.trim();
    if (cleanClassUrl && !/^https?:\/\//i.test(cleanClassUrl)) {
      cleanClassUrl = 'https://' + cleanClassUrl;
    }
    setClassroomLink(course, section, cleanClassUrl);
  }

  const checkedDays = Array.from(document.querySelectorAll('#sched-days-group input[type="checkbox"]:checked')).map(c => c.value);

  if (checkedDays.length === 0) {
    showToast("Please select at least one day of the week.", "⚠️");
    return;
  }

  if (!startTime || !endTime || startTime >= endTime) {
    showToast("Start time must be strictly earlier than End time.", "⚠️");
    return;
  }

  if (editIndex >= 0) {
    weeklyTimetable.splice(editIndex, 1);
  }

  checkedDays.forEach(day => {
    const duplicateIdx = weeklyTimetable.findIndex(t => t.course === course && t.section === section && t.day === day && t.startTime === startTime);
    if (duplicateIdx >= 0) {
      weeklyTimetable.splice(duplicateIdx, 1);
    }

    weeklyTimetable.push({ course, section, day, startTime, endTime, room, type });
  });

  saveAppState();
  closeScheduleEditorModal();
  Render.views('schedule');
  if (wasManageModalOpen) {
    openManageCoursesModal();
  }
  updateSemesterProgressBar();
  showToast('Schedule saved for ' + course + ' (' + section + ')');
}

function deleteCurrentScheduleSlot() {
  const editIndex = parseInt(document.getElementById('sched-edit-index').value);
  const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');
  if (editIndex >= 0) {
    weeklyTimetable.splice(editIndex, 1);
    saveAppState();
    closeScheduleEditorModal();
    Render.views('schedule');
    if (wasManageModalOpen) {
      openManageCoursesModal();
    }
    updateSemesterProgressBar();
    showToast("Schedule slot removed.");
  }
}
