/* ===========================================================================
 * STUDENT ROSTER
 * ---------------------------------------------------------------------------
 * Roster table rendering, filtering, sorting, and student add/import/remove.
 * ======================================================================== */

function getRosterSortIndicator(colKey) {
  if (rosterSortState.col !== colKey) {
    return '<span class="text-[10px] text-slate-400 opacity-60 ml-1 inline-block">⇅</span>';
  }
  return rosterSortState.direction === 'asc'
    ? '<span class="text-[11px] app-themed-link font-black ml-1 inline-block">▲</span>'
    : '<span class="text-[11px] app-themed-link font-black ml-1 inline-block">▼</span>';
}

function toggleRosterSort(colKey) {
  if (rosterSortState.col === colKey) {
    rosterSortState.direction = rosterSortState.direction === 'asc' ? 'desc' : 'asc';
  } else {
    rosterSortState.col = colKey;
    rosterSortState.direction = (colKey === 'date') ? 'desc' : 'asc';
  }
  renderStudentRoster();
}

function renderStudentRoster() {
  const tbody = document.getElementById('student-table-body');
  const filterSelect = document.getElementById('roster-section-filter');
  if (!tbody) return;

  ['id', 'name', 'date', 'grade'].forEach(k => {
    const el = document.getElementById(`roster-sort-${k}`);
    if (el) el.innerHTML = getRosterSortIndicator(k);
  });

  const allSections = [];
  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
  });

  if (filterSelect) {
    const currentVal = filterSelect.value;
    if (allSections.length === 0) {
      filterSelect.innerHTML = '<option value="">No sections added</option>';
    } else {
      filterSelect.innerHTML = allSections.map(s => `
            <option value="${s}" ${(currentVal === s || (!currentVal && s === allSections[0]) || (currentVal === 'all' && s === allSections[0])) ? 'selected' : ''}>${escapeHtml(s)}</option>
          `).join('');

      if (allSections.includes(currentVal)) {
        filterSelect.value = currentVal;
      } else {
        filterSelect.value = allSections[0];
      }
    }
  }

  // Precalculate and attach Final Grades to each student for the Roster
  studentRoster.forEach(s => {
    const cfg = getGradingConfig(s.section);
    ensureStudentScores(s, cfg);
    s._gradeResult = calculateStudentGrade(s, cfg, s.section);
  });

  let sortedStudents = [...studentRoster];
  if (rosterSortState.col === 'name') {
    sortedStudents.sort((a, b) => {
      const cmp = (a.last || '').localeCompare(b.last || '', undefined, { sensitivity: 'base' });
      return rosterSortState.direction === 'asc' ? cmp : -cmp;
    });
  } else if (rosterSortState.col === 'date') {
    sortedStudents.sort((a, b) => {
      const dA = a.dateAdded || '2026-08-10';
      const dB = b.dateAdded || '2026-08-10';
      return rosterSortState.direction === 'asc' ? dA.localeCompare(dB) : dB.localeCompare(dA);
    });
  } else if (rosterSortState.col === 'id') {
    sortedStudents.sort((a, b) => {
      const cmp = (a.id || '').localeCompare(b.id || '', undefined, { numeric: true });
      return rosterSortState.direction === 'asc' ? cmp : -cmp;
    });
  } else if (rosterSortState.col === 'grade') {
    sortedStudents.sort((a, b) => {
      const totalA = a._gradeResult ? a._gradeResult.total : 0;
      const totalB = b._gradeResult ? b._gradeResult.total : 0;
      return rosterSortState.direction === 'asc' ? (totalA - totalB) : (totalB - totalA);
    });
  }

  tbody.innerHTML = sortedStudents.map(s => {
    const res = s._gradeResult || { total: 0, msu: { grade: '—', class: 'bg-slate-100 text-slate-600', status: 'Pending' } };
    const gradeText = res.msu.grade;
    const gradeBadgeClass = res.msu.class || 'bg-slate-100 text-slate-700 border-slate-300';
    const mailtoSubject = encodeURIComponent(`Academic Notice: ${s.section}`);

    return `
          <tr data-student-id="${escapeHtml(s.id)}" data-section="${escapeHtml(s.section)}" data-grade="${escapeHtml(gradeText)}" data-email="${escapeHtml(s.email)}" class="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition border-b border-slate-200 dark:border-slate-700">
            <td class="py-2.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-100">${escapeHtml(s.id)}</td>
            <td class="py-2.5 px-4 font-bold text-slate-900 dark:text-slate-100">${escapeHtml(s.last)}</td>
            <td class="py-2.5 px-4 text-slate-700 dark:text-slate-200 font-medium">${escapeHtml(s.first)}</td>
            <td class="py-2.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">${escapeHtml(s.email)}</td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">
              <span class="grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${gradeBadgeClass}" title="Weighted Score: ${res.total.toFixed(2)}% • Status: ${escapeHtml(res.msu.status)}">
                ${escapeHtml(gradeText)}
              </span>
            </td>
            <td class="py-2.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400 font-semibold">${escapeHtml(s.dateAdded || '2026-08-10')}</td>
            <td class="py-2.5 px-4 text-center whitespace-nowrap">
              <div class="flex items-center justify-center gap-2">
                <button type="button" data-action="sendIndividualStudentEmail" data-email="${escapeHtml(s.email)}" data-section="${escapeHtml(s.section)}" data-first="${escapeHtml(s.first)}" data-last="${escapeHtml(s.last)}" class="roster-email-btn text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold text-xs hover:underline inline-flex items-center gap-1 cursor-pointer" title="Send email to ${escapeHtml(s.first)} ${escapeHtml(s.last)} (${escapeHtml(s.email)})">
                  <svg class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>Email</span>
                </button>
                <span class="text-slate-300 dark:text-slate-600">|</span>
                <button type="button" data-action="removeStudent" data-id="${escapeHtml(s.id)}" data-section="${escapeHtml(s.section)}" class="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 font-semibold text-xs hover:underline cursor-pointer">
                  Remove
                </button>
              </div>
            </td>
          </tr>
        `;
  }).join('');

  filterStudentTable();
}

function filterStudentTable() {
  const term = (document.getElementById('roster-search')?.value || '').toLowerCase().trim();
  const secFilter = document.getElementById('roster-section-filter')?.value || '';
  const gradeFilter = document.getElementById('roster-grade-filter')?.value || 'all';

  const rosterClassroomContainer = document.getElementById('roster-classroom-btn-container');
  if (rosterClassroomContainer) {
    if (secFilter) {
      const parts = secFilter.split(' - ');
      const code = parts[0];
      const sec = parts[1];
      const link = getClassroomLink(code, sec);
      if (link) {
        rosterClassroomContainer.innerHTML = `
              <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center justify-center transition shrink-0 group shadow-2xs" title="Open Google Classroom for ${escapeHtml(secFilter)} in new tab (${escapeHtml(link)})">
                <svg class="w-4 h-4 text-emerald-700 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </a>
            `;
      } else {
        rosterClassroomContainer.innerHTML = `
              <button type="button" data-action="openClassroomModal" data-course="${escapeHtml(code)}" data-section="${escapeHtml(sec)}" class="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-dashed border-slate-300 hover:border-emerald-300 rounded-lg text-xs flex items-center justify-center transition shrink-0 group" title="Link Google Classroom for ${escapeHtml(secFilter)}">
                <svg class="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </button>
            `;
      }
    } else {
      rosterClassroomContainer.innerHTML = '';
    }
  }

  const rows = document.querySelectorAll('#student-table-body tr');
  let visibleCount = 0;
  let totalForSection = 0;

  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    const matchesTerm = !term || text.includes(term);
    const rowSec = r.getAttribute('data-section') || '';
    const rowGrade = r.getAttribute('data-grade') || '';
    const matchesSec = secFilter ? (rowSec === secFilter || secFilter.endsWith(' - ' + rowSec) || (rowSec && secFilter.includes(rowSec))) : true;
    const matchesGrade = (gradeFilter === 'all') || (rowGrade === gradeFilter);

    if (matchesSec) totalForSection++;
    const isVisible = matchesTerm && matchesSec && matchesGrade;
    r.style.display = isVisible ? '' : 'none';
    if (isVisible) visibleCount++;
  });

  const countBadge = document.getElementById('roster-count-badge');
  if (countBadge) {
    if (gradeFilter !== 'all' || term) {
      countBadge.innerText = `Showing: ${visibleCount} of ${totalForSection} Students${gradeFilter !== 'all' ? ` (${gradeFilter})` : ''}`;
    } else {
      countBadge.innerText = `Section Count: ${totalForSection} Students`;
    }
  }

  const removeAllBtn = document.getElementById('roster-remove-all-btn');
  if (removeAllBtn) {
    removeAllBtn.disabled = (totalForSection === 0);
    if (totalForSection === 0) {
      removeAllBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      removeAllBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  const emailFilteredBtn = document.getElementById('roster-email-filtered-btn');
  if (emailFilteredBtn) {
    emailFilteredBtn.disabled = (visibleCount === 0);
    if (visibleCount === 0) {
      emailFilteredBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      emailFilteredBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  if (typeof updateRosterSidebar === 'function') {
    updateRosterSidebar();
  }
}

function removeStudent(studentId, section = null) {
  const confirmMsg = section
    ? `Remove student ID ${studentId} from section ${section}?`
    : `Remove student ID ${studentId} from the class roster and records?`;

  showConfirmation(
    "Remove Student?",
    confirmMsg,
    () => {
      if (section) {
        studentRoster = studentRoster.filter(s => !(s.id === studentId && s.section === section));
      } else {
        studentRoster = studentRoster.filter(s => s.id !== studentId);
      }
      Render.after('enrollment');
      showToast('Student ' + studentId + (section ? ' removed from ' + section + '.' : ' removed.'));
    }
  );
}

function removeAllStudentsFromSection() {
  const filterSelect = document.getElementById('roster-section-filter');
  const sec = filterSelect ? filterSelect.value : '';
  if (!sec) {
    showToast("Please select a section first.", "⚠️");
    return;
  }

  const count = studentRoster.filter(s => s.section === sec || sec.endsWith(' - ' + s.section) || (s.section && sec.includes(s.section))).length;
  if (count === 0) {
    showToast(`No enrolled students in ${sec} to remove.`, "ℹ️");
    return;
  }

  showConfirmation(
    `Remove All Students in ${sec}?`,
    `Are you sure you want to remove all ${count} enrolled student(s) from ${sec}? This action cannot be undone.`,
    () => {
      studentRoster = studentRoster.filter(s => !(s.section === sec || sec.endsWith(' - ' + s.section) || (s.section && sec.includes(s.section))));
      Render.after('enrollment');
      showToast(`Removed all ${count} student(s) from ${sec}.`);
    }
  );
}

function openBulkImportModal() {
  const secSelect = document.getElementById('bulk-target-section');
  const allSections = [];
  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
  });

  const currentSelectedSection = document.getElementById('roster-section-filter')?.value;

  secSelect.innerHTML = allSections.map(s => `
        <option value="${s}" ${s === currentSelectedSection ? 'selected' : ''}>${escapeHtml(s)}</option>
      `).join('');

  if (currentSelectedSection && allSections.includes(currentSelectedSection)) {
    secSelect.value = currentSelectedSection;
  } else if (allSections.length > 0) {
    secSelect.value = allSections[0];
  }

  document.getElementById('bulk-paste-area').value = '';
  document.getElementById('bulk-preview-summary').innerText = 'Ready to parse clipboard data.';
  parsedBulkStudents = [];
  document.getElementById('bulk-import-modal').classList.remove('hidden');
}

function closeBulkImportModal() {
  document.getElementById('bulk-import-modal').classList.add('hidden');
}

function previewBulkData() {
  const text = document.getElementById('bulk-paste-area').value.trim();
  const summary = document.getElementById('bulk-preview-summary');
  parsedBulkStudents = [];

  if (!text) {
    summary.innerText = "Ready to parse clipboard data.";
    return;
  }

  const lines = text.split('\n');
  lines.forEach(line => {
    const parts = line.includes('\t') ? line.split('\t') : line.split(',');
    if (parts.length >= 3) {
      const id = parts[0].trim();
      const last = parts[1].trim();
      const first = parts[2].trim();
      const email = parts[3] ? parts[3].trim() : (first.toLowerCase() + '.' + last.toLowerCase() + '@university.edu');

      if (id && last) {
        parsedBulkStudents.push({ id, last, first, email });
      }
    }
  });

  summary.innerHTML = 'Found <strong class="text-emerald-700">' + parsedBulkStudents.length + '</strong> valid student entries ready to enroll.';
}

function commitBulkImport() {
  const targetSec = document.getElementById('bulk-target-section').value;
  if (parsedBulkStudents.length === 0) {
    showToast("No valid student rows found.", "⚠️");
    return;
  }

  parsedBulkStudents.forEach(st => {
    if (!studentRoster.some(s => s.id === st.id && s.section === targetSec)) {
      studentRoster.push({
        id: st.id,
        last: st.last,
        first: st.first,
        email: st.email,
        section: targetSec,
        dateAdded: new Date().toISOString().slice(0, 10),
        qz: 85,
        lab: 85,
        p1: 85,
        p2: 85,
        fin: 85
      });
    }
  });

  saveAppState();
  closeBulkImportModal();
  const filterSelect = document.getElementById('roster-section-filter');
  if (filterSelect) {
    filterSelect.value = targetSec;
  }
  Render.views('enrollment');
  showToast('Enrolled ' + parsedBulkStudents.length + ' students into ' + targetSec + '!');
}

function openAddSingleStudentModal() {
  const secSelect = document.getElementById('stud-section');
  const allSections = [];
  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
  });

  const currentSelectedSection = document.getElementById('roster-section-filter')?.value;

  secSelect.innerHTML = allSections.map(s => `
        <option value="${s}" ${s === currentSelectedSection ? 'selected' : ''}>${escapeHtml(s)}</option>
      `).join('');

  if (currentSelectedSection && allSections.includes(currentSelectedSection)) {
    secSelect.value = currentSelectedSection;
  } else if (allSections.length > 0) {
    secSelect.value = allSections[0];
  }

  document.getElementById('stud-id').value = '';
  document.getElementById('stud-last').value = '';
  document.getElementById('stud-first').value = '';
  document.getElementById('stud-email').value = '';

  document.getElementById('single-student-modal').classList.remove('hidden');
}

function closeSingleStudentModal() {
  document.getElementById('single-student-modal').classList.add('hidden');
}

function saveSingleStudent() {
  const id = document.getElementById('stud-id').value.trim();
  const last = document.getElementById('stud-last').value.trim();
  const first = document.getElementById('stud-first').value.trim();
  const email = document.getElementById('stud-email').value.trim();
  const section = document.getElementById('stud-section').value;

  if (!id || !last || !first) {
    showToast("ID, Last Name, and First Name are required.", "⚠️");
    return;
  }

  studentRoster.push({
    id,
    last,
    first,
    email: email || (first.toLowerCase() + '.' + last.toLowerCase() + '@university.edu'),
    section,
    dateAdded: new Date().toISOString().slice(0, 10),
    qz: 85,
    lab: 85,
    p1: 85,
    p2: 85,
    fin: 85
  });

  saveAppState();
  closeSingleStudentModal();
  const filterSelect = document.getElementById('roster-section-filter');
  if (filterSelect && section) {
    filterSelect.value = section;
  }
  Render.views('enrollment');
  showToast('Student ' + first + ' ' + last + ' added.');
}
