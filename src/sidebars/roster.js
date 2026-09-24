/* ===========================================================================
 * ROSTER SIDEBAR
 * ---------------------------------------------------------------------------
 * Enrollment by section, lost-days modal and the bulk email actions.
 * ======================================================================== */

function openLostDaysModal(course, section) {
  const modal = document.getElementById('lost-days-modal');
  const titleEl = document.getElementById('lost-days-modal-title');
  const listEl = document.getElementById('lost-days-modal-list');
  if (!modal) return;

  const secKey = `${course}__${section}`;
  const data = (lostDaysBySection && lostDaysBySection[secKey]) ? lostDaysBySection[secKey] : null;

  if (titleEl) {
    titleEl.innerText = `${course} (${section}) — Lost Teaching Days Impact`;
  }

  if (listEl) {
    if (!data || !data.lostDetails || data.lostDetails.length === 0) {
      listEl.innerHTML = `
            <div class="text-center py-6 px-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <div class="text-2xl mb-1">🎉</div>
              <p class="text-xs font-bold text-slate-700 dark:text-slate-200">No Teaching Days Lost</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">All scheduled class sessions fall on regular instructional days.</p>
            </div>
          `;
    } else {
      listEl.innerHTML = `
            <div class="flex items-center justify-between text-xs px-1 pb-1 text-slate-500 dark:text-slate-400 font-medium">
              <span>Impacted Class Sessions: <strong class="text-slate-800 dark:text-slate-100">${data.lostCount}</strong> of ${data.totalMeetings}</span>
              <span class="text-[11px] font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">${((data.lostCount / (data.totalMeetings || 1)) * 100).toFixed(1)}% Lost</span>
            </div>
            <div class="space-y-1.5">
              ${data.lostDetails.map((item, idx) => `
                <div class="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-amber-50/40 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between gap-3 text-xs transition">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      ${idx + 1}
                    </span>
                    <div class="min-w-0">
                      <div class="font-bold text-slate-900 dark:text-slate-100 text-xs">${formatDateKeyToText(item.dateKey)}</div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">${escapeHtml(item.dayOfWeek)} • <span class="font-mono text-[10px] text-slate-400 dark:text-slate-500">${item.dateKey}</span></div>
                    </div>
                  </div>
                  <div class="shrink-0 max-w-[50%] text-right">
                    <span class="block w-full px-2 py-1 rounded-md text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 truncate" title="${escapeHtml(item.reason)}">
                      ${escapeHtml(item.reason)}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
    }
  }

  modal.classList.remove('hidden');
}

function closeLostDaysModal() {
  const modal = document.getElementById('lost-days-modal');
  if (modal) modal.classList.add('hidden');
}

function selectRosterSection(sec) {
  const filter = document.getElementById('roster-section-filter');
  if (filter) {
    let matchedVal = '';
    for (let i = 0; i < filter.options.length; i++) {
      const optVal = filter.options[i].value;
      if (optVal === sec || optVal.endsWith(' - ' + sec) || optVal.includes(sec)) {
        matchedVal = optVal;
        break;
      }
    }
    filter.value = matchedVal;
    filterStudentTable();
  }
}

function updateRosterSidebar() {
  const breakdown = document.getElementById('roster-sections-breakdown');
  const totalBadge = document.getElementById('roster-total-students-badge');
  const healthStatus = document.getElementById('roster-health-status');
  if (!breakdown || !studentRoster) return;

  if (totalBadge) totalBadge.innerText = studentRoster.length + ' Total';

  // 1. Only display valid active sections
  const validSections = new Set();
  if (courseData && courseData.subjects) {
    courseData.subjects.forEach(sub => {
      (sub.sections || []).forEach(sec => validSections.add(`${sub.code} - ${sec}`));
    });
  }

  const secCounts = {};
  validSections.forEach(s => { secCounts[s] = 0; });
  studentRoster.forEach(s => {
    if (validSections.has(s.section)) {
      secCounts[s.section] = (secCounts[s.section] || 0) + 1;
    }
  });

  const sections = Array.from(validSections);
  if (sections.length === 0) {
    breakdown.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No active sections.</div>';
  } else {
    const maxCount = sections.reduce((max, sec) => Math.max(max, secCounts[sec] || 0), 0);
    breakdown.innerHTML = sections.map(sec => {
      const count = secCounts[sec] || 0;
      const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
      return `
        <!-- Delegated only: src/core/events.js dispatches data-action, so an extra
             inline onclick here would (a) run the handler twice per click and
             (b) embed the section name in a JS string literal, which breaks for
             names containing an apostrophe (escapeHtml is not enough - see jsAttr). -->
        <div data-action="selectRosterSection" data-section="${escapeHtml(sec)}" title="Click to filter table by ${escapeHtml(sec)}"
          class="space-y-1 p-2 rounded-lg bg-slate-50 dark:bg-[#141d2b] hover:bg-slate-100 dark:hover:bg-[#1a2638] transition-all cursor-pointer border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-2xs group">
          <div class="flex justify-between text-xs font-bold">
            <span class="text-slate-800 dark:text-slate-100 group-hover:text-[var(--app-header-primary)] dark:group-hover:text-[var(--app-header-accent)] transition-colors truncate">${escapeHtml(sec)}</span>
            <span class="text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">${count}</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div class="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Health status: only check duplicate IDs between sections of the same subject
  if (healthStatus) {
    const subjectIdMap = new Map();
    const dupes = [];
    studentRoster.forEach(s => {
      if (!validSections.has(s.section)) return;
      const courseCode = (s.section || '').split(' - ')[0].trim();
      if (!courseCode || !s.id) return;
      const key = `${courseCode}__${s.id}`;
      if (subjectIdMap.has(key)) {
        dupes.push(`${s.id} in ${courseCode} (${subjectIdMap.get(key)} & ${s.section})`);
      } else {
        subjectIdMap.set(key, s.section);
      }
    });

    if (dupes.length === 0) {
      healthStatus.innerHTML = `
        <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
          <span>✓</span>
          <span>Student IDs unique within each subject</span>
        </div>
      `;
    } else {
      healthStatus.innerHTML = `
        <div class="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-[11px]">
          <span class="font-bold">⚠️ Duplicate in Same Subject:</span> ${dupes.join(', ')}
        </div>
      `;
    }
  }
}

function dispatchEmail({ to = '', bcc = '', subject = '', body = '' }) {
  const authUser = (semesterConfig && semesterConfig.facultyEmail) ? semesterConfig.facultyEmail.trim() : '';

  if (authUser) {
    const url = new URL('https://mail.google.com/mail/');
    url.searchParams.set('view', 'cm');
    url.searchParams.set('fs', '1');
    url.searchParams.set('authuser', authUser);
    if (to) url.searchParams.set('to', to);
    if (bcc) url.searchParams.set('bcc', bcc);
    if (subject) url.searchParams.set('su', subject);
    if (body) url.searchParams.set('body', body);

    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  } else {
    const params = [];
    if (bcc) params.push(`bcc=${encodeURIComponent(bcc)}`);
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    const query = params.length > 0 ? `?${params.join('&')}` : '';

    window.location.href = `mailto:${encodeURIComponent(to)}${query}`;
  }
}

function getCurrentlyFilteredRosterEmails() {
  const rows = document.querySelectorAll('#student-table-body tr');
  const emails = [];
  rows.forEach(r => {
    if (r.style.display !== 'none') {
      const email = r.getAttribute('data-email');
      if (email && email.trim()) emails.push(email.trim());
    }
  });
  return emails;
}

function sendIndividualStudentEmail(email, section, firstName = '', lastName = '') {
  if (!email) {
    showToast("Student does not have an email address recorded.", "⚠️");
    return;
  }
  const subject = `Academic Notice: ${section}`;
  dispatchEmail({ to: email, subject });
  const targetAccount = semesterConfig.facultyEmail ? ` via ${semesterConfig.facultyEmail}` : '';
  showToast(`Composing email to ${firstName || email}${targetAccount}...`, '✉️');
}

function emailFilteredStudentsBCC() {
  const emails = getCurrentlyFilteredRosterEmails();
  const secFilter = document.getElementById('roster-section-filter')?.value || 'All Sections';
  const gradeFilter = document.getElementById('roster-grade-filter')?.value || 'all';

  if (emails.length === 0) {
    showToast("No students found in current filtered view.", "⚠️");
    return;
  }

  const gradeContext = gradeFilter !== 'all' ? ` [Grade: ${gradeFilter}]` : '';
  const subject = `Academic Notice: ${secFilter}${gradeContext}`;

  dispatchEmail({ bcc: emails.join(','), subject });
  const targetAccount = semesterConfig.facultyEmail ? ` from ${semesterConfig.facultyEmail}` : '';
  showToast(`Drafting BCC email to ${emails.length} student(s)${targetAccount}.`, '✉️');
}

function emailSectionBCC() {
  const filter = document.getElementById('roster-section-filter');
  const selectedSec = filter ? filter.value : '';
  const list = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
  const emails = list.map(s => s.email).filter(Boolean);

  if (emails.length === 0) {
    showToast("No emails found for this section.", "⚠️");
    return;
  }

  const subject = `Course Announcement: ${selectedSec || 'All Sections'}`;
  dispatchEmail({ bcc: emails.join(','), subject });
  const targetAccount = semesterConfig.facultyEmail ? ` from ${semesterConfig.facultyEmail}` : '';
  showToast(`Drafting announcement to all ${emails.length} students in ${selectedSec || 'all sections'}${targetAccount}.`, '📢');
}

function copySectionEmails() {
  const filteredEmails = getCurrentlyFilteredRosterEmails();
  let emails = filteredEmails;

  if (emails.length === 0) {
    const filter = document.getElementById('roster-section-filter');
    const selectedSec = filter ? filter.value : '';
    const list = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
    emails = list.map(s => s.email).filter(Boolean);
  }

  if (emails.length === 0) {
    showToast("No emails found for current selection.", "⚠️");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(emails.join(', '));
    showToast(`Copied ${emails.length} student email(s)!`, '📋');
  } else {
    showToast(`Found ${emails.length} student email(s).`);
  }
}

