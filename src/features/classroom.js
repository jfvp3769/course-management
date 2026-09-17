/* ===========================================================================
 * GOOGLE CLASSROOM LINKS
 * ---------------------------------------------------------------------------
 * Per course-section Classroom URL storage and its editor modal.
 * ======================================================================== */

function getClassroomLink(courseCode, section) {
  if (!courseData) return '';
  const key = courseCode + '__' + section;
  if (courseData.classroomLinks && courseData.classroomLinks[key]) {
    return courseData.classroomLinks[key];
  }
  return '';
}

function setClassroomLink(courseCode, section, url) {
  if (!courseData) return;
  if (!courseData.classroomLinks) courseData.classroomLinks = {};
  const key = courseCode + '__' + section;
  const cleanUrl = (url || '').trim();
  if (cleanUrl) {
    courseData.classroomLinks[key] = cleanUrl;
  } else {
    delete courseData.classroomLinks[key];
  }
  saveAppState();
}

function openClassroomModal(courseCode, section) {
  document.getElementById('classroom-modal-course').value = courseCode;
  document.getElementById('classroom-modal-section').value = section;
  
  const currentLink = getClassroomLink(courseCode, section);
  document.getElementById('classroom-modal-url').value = currentLink;

  const sub = courseData.subjects ? courseData.subjects.find(s => s.code === courseCode) : null;
  const subTitle = sub ? sub.title : courseCode;
  const subtitleEl = document.getElementById('classroom-modal-subtitle');
  if (subtitleEl) {
    subtitleEl.innerText = `${courseCode} (${section}) • ${subTitle}`;
  }

  const removeBtn = document.getElementById('classroom-modal-remove-btn');
  if (removeBtn) {
    removeBtn.style.display = currentLink ? 'inline-block' : 'none';
  }

  document.getElementById('google-classroom-modal').classList.remove('hidden');
}

function closeClassroomModal() {
  document.getElementById('google-classroom-modal').classList.add('hidden');
}

function saveClassroomLink(e) {
  if (e) e.preventDefault();
  const courseCode = document.getElementById('classroom-modal-course').value;
  const section = document.getElementById('classroom-modal-section').value;
  let url = document.getElementById('classroom-modal-url').value.trim();

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');
  setClassroomLink(courseCode, section, url);
  closeClassroomModal();
  renderMatrixTable();
  if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
  if (typeof filterStudentTable === 'function') filterStudentTable();
  if (typeof renderGradebook === 'function') renderGradebook();
  if (wasManageModalOpen) openManageCoursesModal();
  showToast(url ? `Google Classroom link saved for ${courseCode} ${section}!` : `Classroom link removed for ${courseCode} ${section}.`);
}

function removeClassroomLink() {
  const courseCode = document.getElementById('classroom-modal-course').value;
  const section = document.getElementById('classroom-modal-section').value;
  const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');
  setClassroomLink(courseCode, section, '');
  closeClassroomModal();
  renderMatrixTable();
  if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
  if (typeof filterStudentTable === 'function') filterStudentTable();
  if (typeof renderGradebook === 'function') renderGradebook();
  if (wasManageModalOpen) openManageCoursesModal();
  showToast(`Classroom link removed for ${courseCode} ${section}.`);
}

function testClassroomLink() {
  let url = document.getElementById('classroom-modal-url').value.trim();
  if (!url) {
    showToast("Please enter a URL first.", "⚠️");
    return;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
