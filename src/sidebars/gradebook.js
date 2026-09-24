/* ===========================================================================
 * GRADEBOOK SIDEBAR
 * ---------------------------------------------------------------------------
 * Class statistics, grade distribution, cohort filtering and score-error
 * highlighting.
 * ======================================================================== */

function setGradeDistScaleMode(mode) {
  gradeDistScaleMode = mode;
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
}

function onGradebookDropdownFilterChange() {
  gradebookCohortFilter = null;
  renderGradebook();
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
}

function onGradebookSearchInput() {
  gradebookCohortFilter = null;
  renderGradebook();
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
}

function resetGradebookFilters() {
  gradebookCohortFilter = null;
  const searchEl = document.getElementById('gradebook-search');
  const gradeFilterEl = document.getElementById('gradebook-grade-filter');
  const statusFilterEl = document.getElementById('gradebook-status-filter');
  if (searchEl) searchEl.value = '';
  if (gradeFilterEl) gradeFilterEl.value = 'all';
  if (statusFilterEl) statusFilterEl.value = 'all';
  renderGradebook();
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
  if (typeof showToast === 'function') {
    showToast('Filter reset — showing all enrolled students', '✓');
  }
}

function updateGradebookResetFilterButton() {
  const btn = document.getElementById('gradebook-reset-filter-btn');
  if (!btn) return;
  const gradeFilter = document.getElementById('gradebook-grade-filter')?.value || 'all';
  const statusFilter = document.getElementById('gradebook-status-filter')?.value || 'all';
  const isFiltered = (gradebookCohortFilter !== null) || (gradeFilter !== 'all') || (statusFilter !== 'all');

  if (isFiltered) {
    btn.classList.remove('hidden');
    const label = document.getElementById('gradebook-reset-filter-label');
    if (label) {
      if (gradeFilter !== 'all' && statusFilter !== 'all') {
        label.innerText = `Reset (${gradeFilter}, ${statusFilter})`;
      } else if (gradeFilter !== 'all') {
        label.innerText = `Reset (${gradeFilter})`;
      } else if (statusFilter !== 'all') {
        label.innerText = `Reset (${statusFilter})`;
      } else if (gradebookCohortFilter) {
        label.innerText = `Reset (${gradebookCohortFilter.label})`;
      } else {
        label.innerText = 'Reset Filter';
      }
    }
  } else {
    btn.classList.add('hidden');
  }
}

function filterGradebookByCohort(studentIds, cohortLabel = '') {
  if (!studentIds || studentIds.length === 0) {
    if (typeof showToast === 'function') showToast(`No students in ${cohortLabel || 'selected group'}.`, 'ℹ️');
    return;
  }

  // Ensure Gradebook tab is active if clicked from another tab view
  const gradebookContent = document.getElementById('tab-content-gradebook');
  if (gradebookContent && gradebookContent.classList.contains('hidden') && typeof switchTab === 'function') {
    switchTab('gradebook');
  }

  // Toggle behavior: if clicking the already active cohort, reset filter
  if (gradebookCohortFilter && gradebookCohortFilter.label === cohortLabel) {
    resetGradebookFilters();
    return;
  }

  gradebookCohortFilter = {
    label: cohortLabel,
    studentIds: studentIds
  };

  // Reset dropdown selects so cohort filter is exclusive
  const gradeFilterEl = document.getElementById('gradebook-grade-filter');
  const statusFilterEl = document.getElementById('gradebook-status-filter');
  if (gradeFilterEl) gradeFilterEl.value = 'all';
  if (statusFilterEl) statusFilterEl.value = 'all';

  renderGradebook();
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }

  const wrapper = document.getElementById('gradebook-scroll-wrapper');
  if (wrapper) wrapper.scrollTo({ top: 0, behavior: 'smooth' });

  if (typeof showToast === 'function') {
    showToast(`Filtered: showing ${studentIds.length} student${studentIds.length === 1 ? '' : 's'} (${cohortLabel})`, '🔍');
  }
}

function highlightCohortInGradebook(studentIds, cohortLabel = '') {
  if (!studentIds || studentIds.length === 0) {
    if (typeof showToast === 'function') showToast(`No students in ${cohortLabel || 'selected group'}.`, 'ℹ️');
    return;
  }
  const wrapper = document.getElementById('gradebook-scroll-wrapper');
  let firstRow = null;

  studentIds.forEach(id => {
    const row = document.getElementById('grade-row-' + id) || document.querySelector(`tr[data-student-id="${id}"]`);
    if (row) {
      if (!firstRow) firstRow = row;
      row.classList.remove('row-flash-highlight');
      void row.offsetWidth; // trigger reflow
      row.classList.add('row-flash-highlight');
      setTimeout(() => row.classList.remove('row-flash-highlight'), 3000);
    }
  });

  if (firstRow && wrapper) {
    const thead = document.getElementById('gradebook-table-head');
    const theadHeight = thead ? thead.offsetHeight : 72;
    const targetTop = Math.max(0, firstRow.offsetTop - theadHeight);
    wrapper.scrollTo({ top: targetTop, behavior: 'smooth' });
  }

  if (typeof showToast === 'function') {
    showToast(`Highlighting ${studentIds.length} student${studentIds.length === 1 ? '' : 's'}${cohortLabel ? ` (${cohortLabel})` : ''}`, '🎯');
  }
}

function _renderInputErrorRadar(errorsList, errorsBadge, studentRoster, selectedSec, config) {
  if (!errorsList || !studentRoster) return;

  const filteredStudents = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
  const errorEntries = [];

  filteredStudents.forEach(s => {
    config.categories.forEach(cat => {
      (cat.subActivities || []).forEach(sub => {
        const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
        const rawVal = s.scores ? s.scores[sub.id] : undefined;
        const numVal = parseFloat(rawVal);

        if (!isNaN(numVal) && numVal > maxScore) {
          errorEntries.push({
            student: s,
            sub,
            type: 'over_max',
            msg: `${sub.name}: Score (${numVal}) exceeds max (${maxScore})`
          });
        } else if (!isNaN(numVal) && numVal < 0) {
          errorEntries.push({
            student: s,
            sub,
            type: 'negative',
            msg: `${sub.name}: Negative score (${numVal})`
          });
        } else if (rawVal !== undefined && rawVal !== null && rawVal !== '' && isNaN(numVal)) {
          errorEntries.push({
            student: s,
            sub,
            type: 'invalid',
            msg: `${sub.name}: Non-numeric score entered`
          });
        }
      });
    });
  });

  if (errorsBadge) {
    const isCohortActive = (typeof gradebookCohortFilter !== 'undefined' && gradebookCohortFilter && gradebookCohortFilter.label === 'Input Errors');
    errorsBadge.setAttribute('draggable', 'false');
    if (errorEntries.length === 0) {
      errorsBadge.removeAttribute('data-action');
      errorsBadge.removeAttribute('data-cohort-label');
      errorsBadge.removeAttribute('data-student-ids');
      errorsBadge.removeAttribute('role');
      errorsBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-transparent dark:border-emerald-800/60 cursor-default pointer-events-auto';
      errorsBadge.innerText = '0 Errors';
      errorsBadge.title = 'No score errors detected';
    } else {
      const errorStudentIds = [...new Set(errorEntries.map(e => e.student.id))].join(',');
      errorsBadge.setAttribute('role', 'button');
      errorsBadge.setAttribute('data-action', 'filterGradebookByCohort');
      errorsBadge.setAttribute('data-cohort-label', 'Input Errors');
      errorsBadge.setAttribute('data-student-ids', errorStudentIds);
      if (isCohortActive) {
        errorsBadge.className = 'text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-600 text-white shadow-xs cursor-pointer ring-2 ring-inset ring-rose-700 dark:ring-rose-400 transition-all select-none flex items-center gap-1 pointer-events-auto';
        errorsBadge.innerHTML = `<span>${errorEntries.length} ${errorEntries.length === 1 ? 'Error' : 'Errors'}</span><span class="text-[9px] font-black leading-none" title="Click to clear filter">✕</span>`;
        errorsBadge.title = 'Active filter: Input Errors (click to reset)';
      } else {
        errorsBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800/60 shadow-2xs cursor-pointer transition-all select-none hover:scale-105 pointer-events-auto';
        errorsBadge.innerText = `${errorEntries.length} ${errorEntries.length === 1 ? 'Error' : 'Errors'}`;
        errorsBadge.title = `Click to filter gradebook to students with score errors (${errorEntries.length})`;
      }
    }
  }

  if (errorEntries.length === 0) {
    errorsList.innerHTML = '<div class="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-lg text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">✓ All scores valid and within limits!</div>';
  } else {
    errorsList.innerHTML = errorEntries.map(err => `
          <div data-action="highlightStudentScoreError" data-student-id="${escapeHtml(err.student.id)}" data-sub-id="${escapeHtml(err.sub.id)}" data-section="${escapeHtml(err.student.section)}"
            class="p-2 bg-rose-50 dark:bg-[#200b12] hover:bg-rose-100 dark:hover:bg-[#2d0e19] border border-rose-300 dark:border-rose-900/60 hover:border-rose-400 dark:hover:border-rose-700/80 rounded-lg cursor-pointer transition-all hover:shadow-2xs text-xs group"
            title="Click to focus input">
            <div class="font-bold text-slate-900 dark:text-rose-100 truncate text-[11px] group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">${escapeHtml(err.student.last)}, ${escapeHtml(err.student.first)}</div>
            <div class="text-[10px] text-rose-700 dark:text-rose-400 font-semibold truncate mt-0.5">${escapeHtml(err.msg)}</div>
          </div>
        `).join('');
  }
}

function _renderAtRiskRadar(atRiskList, atRiskBadge, studentGrades) {
  if (!atRiskList || !studentGrades) return;

  const atRisk = [];

  studentGrades.forEach(({ student: s, gradeResult: res }) => {
    const msuNum = parseFloat(res.msu.grade);
    const isFailingGrade = !isNaN(msuNum) && msuNum > 3.00;
    const isNonPassingStatus = res.msu.status !== 'Passed';
    const isSpecialAtRisk = res.msu.grade === '5.00' || res.msu.grade === 'INC';

    if (isFailingGrade || isNonPassingStatus || isSpecialAtRisk) {
      atRisk.push({ student: s, res });
    }
  });

  if (atRiskBadge) {
    const isCohortActive = (typeof gradebookCohortFilter !== 'undefined' && gradebookCohortFilter && gradebookCohortFilter.label === 'At-Risk Students');
    atRiskBadge.setAttribute('draggable', 'false');
    if (atRisk.length === 0) {
      atRiskBadge.removeAttribute('data-action');
      atRiskBadge.removeAttribute('data-cohort-label');
      atRiskBadge.removeAttribute('data-student-ids');
      atRiskBadge.removeAttribute('role');
      atRiskBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-transparent dark:border-emerald-800/60 cursor-default pointer-events-auto';
      atRiskBadge.innerText = '0 At-Risk';
      atRiskBadge.title = 'No at-risk students detected';
    } else {
      const atRiskStudentIds = atRisk.map(item => item.student.id).join(',');
      atRiskBadge.setAttribute('role', 'button');
      atRiskBadge.setAttribute('data-action', 'filterGradebookByCohort');
      atRiskBadge.setAttribute('data-cohort-label', 'At-Risk Students');
      atRiskBadge.setAttribute('data-student-ids', atRiskStudentIds);
      if (isCohortActive) {
        atRiskBadge.className = 'text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-600 text-white shadow-xs cursor-pointer ring-2 ring-inset ring-rose-700 dark:ring-rose-400 transition-all select-none flex items-center gap-1 pointer-events-auto';
        atRiskBadge.innerHTML = `<span>${atRisk.length} At-Risk</span><span class="text-[9px] font-black leading-none" title="Click to clear filter">✕</span>`;
        atRiskBadge.title = 'Active filter: At-Risk Students (click to reset)';
      } else {
        atRiskBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/80 dark:hover:bg-rose-900/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800/60 shadow-2xs cursor-pointer transition-all select-none hover:scale-105 pointer-events-auto';
        atRiskBadge.innerText = atRisk.length + ' At-Risk';
        atRiskBadge.title = `Click to filter gradebook to at-risk students (${atRisk.length})`;
      }
    }
  }

  if (atRisk.length === 0) {
    atRiskList.innerHTML = '<div class="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-lg text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">✓ All students currently passing!</div>';
  } else {
    atRiskList.innerHTML = atRisk.map(item => `
          <div data-action="highlightStudentInGradebook" data-student-id="${escapeHtml(item.student.id)}" data-section="${escapeHtml(item.student.section)}" 
            class="p-2 bg-rose-50 dark:bg-[#200b12] hover:bg-rose-100 dark:hover:bg-[#2d0e19] border border-rose-200 dark:border-rose-900/60 hover:border-rose-300 dark:hover:border-rose-700/80 rounded-lg flex items-center justify-between cursor-pointer transition-all hover:shadow-2xs text-xs shadow-2xs group">
            <div class="min-w-0">
              <div class="font-bold text-slate-900 dark:text-rose-100 truncate text-[11px] group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">${escapeHtml(item.student.last)}, ${escapeHtml(item.student.first)}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">${escapeHtml(item.student.id)} • ${escapeHtml(item.student.section)}</div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800">${item.res.total}%</span>
              <div class="text-[9px] font-bold text-rose-700 dark:text-rose-400 mt-0.5">Grade: ${item.res.msu.grade}</div>
            </div>
          </div>
        `).join('');
  }
}

function _renderClassPerformanceWidget(statsContent, statsBadge, studentGrades, selectedSec) {
  if (!statsContent || !studentGrades) return;

  if (studentGrades.length === 0) {
    if (statsBadge) {
      statsBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center gap-1 shrink-0';
      statsBadge.innerHTML = '<span>0 Enrolled</span>';
    }
    statsContent.innerHTML = '<div class="text-slate-400 italic text-[11px] py-1 text-center">No student records to analyze.</div>';
    return;
  }

  const count = studentGrades.length;
  let sumTotal = 0;
  let passCount = 0;
  let failCount = 0;
  let otherCount = 0;
  const passedStudents = [];
  const failedStudents = [];
  const otherStudents = [];
  const totals = [];
  const studentMetrics = [];

  studentGrades.forEach(({ student: s, gradeResult }) => {
    const tot = gradeResult.total;
    sumTotal += tot;
    totals.push(tot);
    studentMetrics.push({ student: s, gradeResult });

    if (gradeResult.msu.status === 'Passed') {
      passCount++;
      passedStudents.push(s);
    } else if (gradeResult.msu.status === 'Failed') {
      failCount++;
      failedStudents.push(s);
    } else {
      otherCount++;
      otherStudents.push(s);
    }
  });

  const passedStudentIds = passedStudents.map(s => s.id).join(',');
  const failedStudentIds = failedStudents.map(s => s.id).join(',');
  const otherStudentIds = otherStudents.map(s => s.id).join(',');

  totals.sort((a, b) => a - b);
  const avgTotal = sumTotal / count;
  const medianTotal = (count % 2 === 0) ? (totals[count / 2 - 1] + totals[count / 2]) / 2 : totals[Math.floor(count / 2)];
  const passRate = (count > 0) ? (passCount / count) * 100 : 0;
  const failRate = (count > 0) ? (failCount / count) * 100 : 0;
  const otherRate = (count > 0) ? (otherCount / count) * 100 : 0;
  const avgMsu = getMsuGrade(avgTotal, null, selectedSec);
  const medianMsu = getMsuGrade(medianTotal, null, selectedSec);

  studentMetrics.sort((a, b) => b.gradeResult.total - a.gradeResult.total);
  const topStudent = studentMetrics[0];
  const lowStudent = studentMetrics[studentMetrics.length - 1];

  // Score Variance & Standard Deviation (sigma)
  const variance = totals.reduce((acc, val) => acc + Math.pow(val - avgTotal, 2), 0) / count;
  const stdDev = Math.sqrt(variance);
  const scoreSpread = (topStudent.gradeResult.total - lowStudent.gradeResult.total).toFixed(1);

  // Top Header Badge: Class Enrollment
  if (statsBadge) {
    statsBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700 flex items-center gap-1 shrink-0';
    statsBadge.innerHTML = `<svg class="w-3 h-3 text-slate-500 dark:text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg><span>${count} Enrolled</span>`;
  }

  statsContent.innerHTML = `
        <!-- KPI Row: Average, Median, Pass Rate -->
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="py-2 px-1 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-between shadow-2xs">
            <span class="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average</span>
            <span class="text-sm font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight my-1">${avgTotal.toFixed(1)}%</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-black font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 shadow-2xs" title="Institutional Equivalent: ${escapeHtml(avgMsu.status)}">${escapeHtml(avgMsu.grade)}</span>
          </div>
          <div class="py-2 px-1 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-between shadow-2xs">
            <span class="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Median</span>
            <span class="text-sm font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight my-1">${medianTotal.toFixed(1)}%</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-black font-mono bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs" title="Institutional Equivalent: ${escapeHtml(medianMsu.status)}">${escapeHtml(medianMsu.grade)}</span>
          </div>
          <div class="py-2 px-1 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-between shadow-2xs">
            <span class="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pass Rate</span>
            <span class="text-sm font-black ${passRate >= 75 ? 'text-emerald-700 dark:text-emerald-400' : (passRate >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400')} font-mono tracking-tight my-1">${Math.round(passRate)}%</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-black font-mono ${passRate >= 75 ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60' : (passRate >= 50 ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60')} shadow-2xs">${passCount}/${count}</span>
          </div>
        </div>

        <!-- Score Spread & Standard Deviation Strip (Directly below Average, Median, Pass Rate) -->
        ${topStudent ? `
        <div class="flex items-center justify-between text-[10.5px] px-2.5 py-1.5 bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 font-mono shadow-2xs">
          <div class="flex items-center gap-1.5">
            <span class="text-[9px] font-sans font-extrabold text-slate-400 uppercase tracking-wider">Range</span>
            <span class="font-extrabold text-slate-800 dark:text-slate-200">${lowStudent ? lowStudent.gradeResult.total.toFixed(1) : 0}% – ${topStudent.gradeResult.total.toFixed(1)}%</span>
            <span class="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Δ ${scoreSpread}%</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-[9px] font-sans font-extrabold text-slate-400 uppercase tracking-wider">σ</span>
            <span class="font-extrabold text-slate-800 dark:text-slate-200">±${stdDev.toFixed(1)}%</span>
          </div>
        </div>
        ` : ''}

        <!-- Class Standing Card with Clean Multi-Segment Bar and Interactive Cohort Cards -->
        <div class="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-2xs">
          <div class="flex items-center justify-between text-[10px]">
            <span class="font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
              Class Standing
            </span>
          </div>

          <!-- Multi-segmented Progress Bar -->
          <div class="w-full bg-slate-200/80 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden flex cursor-pointer shadow-inner">
            <div data-action="filterGradebookByCohort" data-cohort-label="Passed" data-student-ids="${passedStudentIds}"
                 class="bg-emerald-500 hover:bg-emerald-600 h-full transition-all duration-300 ${gradebookCohortFilter?.label === 'Passed' ? 'ring-2 ring-emerald-700' : ''}"
                 style="width: ${passRate}%"
                 title="${passCount} Passed (${passRate.toFixed(1)}%) • Click to filter"></div>
            <div data-action="filterGradebookByCohort" data-cohort-label="Failed" data-student-ids="${failedStudentIds}"
                 class="bg-rose-500 hover:bg-rose-600 h-full transition-all duration-300 ${gradebookCohortFilter?.label === 'Failed' ? 'ring-2 ring-rose-700' : ''}"
                 style="width: ${failRate}%"
                 title="${failCount} Failed (${failRate.toFixed(1)}%) • Click to filter"></div>
            ${otherCount > 0 ? `
            <div data-action="filterGradebookByCohort" data-cohort-label="Others" data-student-ids="${otherStudentIds}"
                 class="bg-amber-400 hover:bg-amber-500 dark:bg-slate-400 dark:hover:bg-slate-500 h-full transition-all duration-300 ${gradebookCohortFilter?.label === 'Others' ? 'ring-2 ring-slate-600' : ''}"
                 style="width: ${otherRate}%"
                 title="${otherCount} Others (${otherRate.toFixed(1)}%) • Click to filter"></div>
            ` : ''}
          </div>

          <!-- 3 Interactive Cohort Cards -->
          <div class="grid grid-cols-3 gap-1.5 pt-0.5">
            <!-- Passed -->
            <button type="button" data-action="filterGradebookByCohort" data-cohort-label="Passed" data-student-ids="${passedStudentIds}"
                    class="py-1.5 px-1 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center ${gradebookCohortFilter?.label === 'Passed' ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-400 shadow-sm' : 'bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200/90 dark:border-emerald-800/60'}"
                    title="Filter ${passCount} passed students (${passRate.toFixed(1)}%)">
              <span class="text-[9px] font-extrabold uppercase tracking-wider ${gradebookCohortFilter?.label === 'Passed' ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-400'} flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full ${gradebookCohortFilter?.label === 'Passed' ? 'bg-white' : 'bg-emerald-500'}"></span>Pass
              </span>
              <span class="font-mono font-black text-xs my-0.5 ${gradebookCohortFilter?.label === 'Passed' ? 'text-white' : 'text-emerald-950 dark:text-emerald-100'}">${passCount}</span>
              <span class="font-mono text-[9px] font-bold ${gradebookCohortFilter?.label === 'Passed' ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'}">${passRate.toFixed(1)}%</span>
            </button>

            <!-- Failed -->
            <button type="button" data-action="filterGradebookByCohort" data-cohort-label="Failed" data-student-ids="${failedStudentIds}"
                    class="py-1.5 px-1 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center ${gradebookCohortFilter?.label === 'Failed' ? 'bg-rose-600 text-white border-rose-700 ring-2 ring-rose-400 shadow-sm' : 'bg-rose-50/70 dark:bg-rose-950/40 hover:bg-rose-100/80 dark:hover:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-200/90 dark:border-rose-800/60'}"
                    title="Filter ${failCount} failed students (${failRate.toFixed(1)}%)">
              <span class="text-[9px] font-extrabold uppercase tracking-wider ${gradebookCohortFilter?.label === 'Failed' ? 'text-rose-100' : 'text-rose-700 dark:text-rose-400'} flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full ${gradebookCohortFilter?.label === 'Failed' ? 'bg-white' : 'bg-rose-500'}"></span>Fail
              </span>
              <span class="font-mono font-black text-xs my-0.5 ${gradebookCohortFilter?.label === 'Failed' ? 'text-white' : 'text-rose-950 dark:text-rose-100'}">${failCount}</span>
              <span class="font-mono text-[9px] font-bold ${gradebookCohortFilter?.label === 'Failed' ? 'text-rose-200' : 'text-rose-600 dark:text-rose-400'}">${failRate.toFixed(1)}%</span>
            </button>

            <!-- Others -->
            <button type="button" data-action="filterGradebookByCohort" data-cohort-label="Others" data-student-ids="${otherStudentIds}"
                    class="py-1.5 px-1 rounded-lg border text-center transition cursor-pointer flex flex-col items-center justify-center ${gradebookCohortFilter?.label === 'Others' ? 'bg-slate-700 text-white border-slate-800 ring-2 ring-slate-400 shadow-sm' : 'bg-slate-100/70 dark:bg-slate-800/50 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700'}"
                    title="Filter ${otherCount} other students (${otherRate.toFixed(1)}%)">
              <span class="text-[9px] font-extrabold uppercase tracking-wider ${gradebookCohortFilter?.label === 'Others' ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'} flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full ${gradebookCohortFilter?.label === 'Others' ? 'bg-white' : 'bg-slate-400'}"></span>Others
              </span>
              <span class="font-mono font-black text-xs my-0.5 ${gradebookCohortFilter?.label === 'Others' ? 'text-white' : 'text-slate-900 dark:text-slate-100'}">${otherCount}</span>
              <span class="font-mono text-[9px] font-bold ${gradebookCohortFilter?.label === 'Others' ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}">${otherRate.toFixed(1)}%</span>
            </button>
          </div>
        </div>

        <!-- Performer Cards (Best & Worst) -->
        ${topStudent ? `
        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <!-- Best Score Card -->
          <div data-action="filterGradebookByCohort" data-cohort-label="Best: ${escapeHtml(topStudent.student.last)}" data-student-ids="${escapeHtml(topStudent.student.id)}"
               class="p-2.5 rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-xs min-w-0 flex flex-col justify-between ${gradebookCohortFilter?.label === 'Best: ' + topStudent.student.last ? 'bg-emerald-100 dark:bg-emerald-950/80 ring-2 ring-inset ring-emerald-500 dark:ring-emerald-400 relative z-10' : 'bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100/90 dark:hover:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/60 hover:border-emerald-300 dark:hover:border-emerald-700'}"
               title="Best performer: ${escapeHtml(topStudent.student.last)}, ${escapeHtml(topStudent.student.first)} (${topStudent.gradeResult.total.toFixed(1)}%) • Click to inspect in gradebook">
            <!-- Top Row: Icon + Label + Score -->
            <div class="flex items-center justify-between gap-1 w-full">
              <div class="flex items-center gap-1 min-w-0">
                <span class="text-xs shrink-0">🏆</span>
                <span class="text-[9.5px] font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider truncate">Best</span>
              </div>
              <span class="font-mono font-black text-emerald-700 dark:text-emerald-300 text-xs shrink-0">${topStudent.gradeResult.total.toFixed(1)}%</span>
            </div>
            <!-- Bottom Row: Student Name + Grade Pill -->
            <div class="mt-1.5 flex items-center justify-between gap-1 w-full min-w-0">
              <span class="font-bold text-slate-800 dark:text-slate-100 truncate text-[11px]" title="${escapeHtml(topStudent.student.last)}, ${escapeHtml(topStudent.student.first)}">
                ${escapeHtml(topStudent.student.last)}${topStudent.student.first ? `, ${escapeHtml(topStudent.student.first.charAt(0))}.` : ''}
              </span>
              <span class="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700/60 shrink-0">${escapeHtml(topStudent.gradeResult.msu.grade)}</span>
            </div>
          </div>

          <!-- Worst Score Card -->
          ${lowStudent ? `
          <div data-action="filterGradebookByCohort" data-cohort-label="Worst: ${escapeHtml(lowStudent.student.last)}" data-student-ids="${escapeHtml(lowStudent.student.id)}"
               class="p-2.5 rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-xs min-w-0 flex flex-col justify-between ${gradebookCohortFilter?.label === 'Worst: ' + lowStudent.student.last ? 'bg-amber-100 dark:bg-amber-950/80 ring-2 ring-inset ring-amber-500 dark:ring-amber-400 relative z-10' : 'bg-amber-50/70 dark:bg-amber-950/30 hover:bg-amber-100/90 dark:hover:bg-amber-950/60 border border-amber-200/90 dark:border-amber-800/60 hover:border-amber-300 dark:hover:border-amber-700'}"
               title="Worst performer: ${escapeHtml(lowStudent.student.last)}, ${escapeHtml(lowStudent.student.first)} (${lowStudent.gradeResult.total.toFixed(1)}%) • Click to inspect in gradebook">
            <!-- Top Row: Icon + Label + Score -->
            <div class="flex items-center justify-between gap-1 w-full">
              <div class="flex items-center gap-1 min-w-0">
                <span class="text-xs shrink-0">${lowStudent.gradeResult.total < 75 ? '⚠️' : '🎯'}</span>
                <span class="text-[9.5px] font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider truncate">Worst</span>
              </div>
              <span class="font-mono font-black ${lowStudent.gradeResult.total < 75 ? 'text-rose-700 dark:text-rose-400' : 'text-amber-700 dark:text-amber-300'} text-xs shrink-0">${lowStudent.gradeResult.total.toFixed(1)}%</span>
            </div>
            <!-- Bottom Row: Student Name + Grade Pill -->
            <div class="mt-1.5 flex items-center justify-between gap-1 w-full min-w-0">
              <span class="font-bold text-slate-800 dark:text-slate-100 truncate text-[11px]" title="${escapeHtml(lowStudent.student.last)}, ${escapeHtml(lowStudent.student.first)}">
                ${escapeHtml(lowStudent.student.last)}${lowStudent.student.first ? `, ${escapeHtml(lowStudent.student.first.charAt(0))}.` : ''}
              </span>
              <span class="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded ${lowStudent.gradeResult.total < 75 ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 border border-rose-200/80 dark:border-rose-700/60' : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/60'} shrink-0">${escapeHtml(lowStudent.gradeResult.msu.grade)}</span>
            </div>
          </div>
          ` : ''}
        </div>
        ` : ''}
      `;
}

function _renderGradeDistributionHistogram(distCont, studentGrades, selectedSec) {
  if (!distCont || !studentGrades) return;

  if (studentGrades.length === 0) {
    distCont.innerHTML = '<div class="text-slate-400 italic text-[11px] py-1 text-center">No grade distribution records.</div>';
    return;
  }

  // Synchronize mode toggle button states
  const btnGrouped = document.getElementById('btn-grade-dist-grouped');
  const btnFull = document.getElementById('btn-grade-dist-full');
  if (btnGrouped && btnFull) {
    if (gradeDistScaleMode === 'full') {
      btnFull.className = 'px-1.5 py-0.5 rounded text-[9px] font-bold transition bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-2xs';
      btnGrouped.className = 'px-1.5 py-0.5 rounded text-[9px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition';
    } else {
      btnGrouped.className = 'px-1.5 py-0.5 rounded text-[9px] font-bold transition bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-2xs';
      btnFull.className = 'px-1.5 py-0.5 rounded text-[9px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition';
    }
  }

  let buckets = {};
  if (gradeDistScaleMode === 'full') {
    // Full institutional grading scale
    const { scale } = getActiveGradingScale(selectedSec);
    scale.forEach(item => {
      let color = 'bg-slate-400 dark:bg-slate-400';
      const gNum = parseFloat(item.grade);
      if (item.grade === '1.00') color = 'bg-emerald-600 dark:bg-emerald-500';
      else if (!isNaN(gNum) && gNum <= 1.75) color = 'bg-emerald-500 dark:bg-emerald-400';
      else if (!isNaN(gNum) && gNum <= 2.50) color = 'bg-blue-600 dark:bg-blue-500';
      else if (!isNaN(gNum) && gNum <= 3.00) color = 'bg-amber-500 dark:bg-amber-400';
      else if (item.grade === 'INC') color = 'bg-slate-400 dark:bg-slate-400';
      else if (item.grade === '5.00') color = 'bg-rose-600 dark:bg-rose-500';
      buckets[item.grade] = {
        count: 0,
        color: color,
        label: item.desc || item.status,
        students: []
      };
    });

    studentGrades.forEach(({ student: s, gradeResult: res }) => {
      const g = res.msu.grade;
      if (buckets[g]) {
        buckets[g].count++;
        buckets[g].students.push(s);
      } else if (g === 'INC' && buckets['INC']) {
        buckets['INC'].count++;
        buckets['INC'].students.push(s);
      } else if (buckets['5.00']) {
        buckets['5.00'].count++;
        buckets['5.00'].students.push(s);
      }
    });
  } else {
    // Grouped 5 summary tiers
    buckets = {
      '1.00 - 1.25': { count: 0, color: 'bg-emerald-600 dark:bg-emerald-500', label: 'Superior', students: [] },
      '1.50 - 2.00': { count: 0, color: 'bg-blue-600 dark:bg-blue-500', label: 'Very Good', students: [] },
      '2.25 - 3.00': { count: 0, color: 'bg-amber-500 dark:bg-amber-400', label: 'Passing', students: [] },
      'INC': { count: 0, color: 'bg-slate-400 dark:bg-slate-400', label: 'Incomplete', students: [] },
      '5.00': { count: 0, color: 'bg-rose-600 dark:bg-rose-500', label: 'Failed', students: [] }
    };

    studentGrades.forEach(({ student: s, gradeResult: res }) => {
      const g = parseFloat(res.msu.grade);
      if (isNaN(g) || res.msu.grade === 'INC') {
        buckets['INC'].count++;
        buckets['INC'].students.push(s);
      } else if (g >= 1.00 && g <= 1.25) {
        buckets['1.00 - 1.25'].count++;
        buckets['1.00 - 1.25'].students.push(s);
      } else if (g > 1.25 && g <= 2.00) {
        buckets['1.50 - 2.00'].count++;
        buckets['1.50 - 2.00'].students.push(s);
      } else if (g > 2.00 && g <= 3.00) {
        buckets['2.25 - 3.00'].count++;
        buckets['2.25 - 3.00'].students.push(s);
      } else {
        buckets['5.00'].count++;
        buckets['5.00'].students.push(s);
      }
    });
  }

  const totalStudents = Math.max(1, studentGrades.length);

  distCont.innerHTML = Object.keys(buckets).map(k => {
    const b = buckets[k];
    const pct = Math.round((b.count / totalStudents) * 100);
    const studentNames = b.students.map(st => st.last).join(', ');
    const hasStudents = b.students.length > 0;
    const studentIdsParam = b.students.map(st => st.id).join(',');
    const isCohortActive = (gradebookCohortFilter && gradebookCohortFilter.label === k);
    const barWidth = b.count > 0 ? Math.max(pct, 3.5) : 0;

    return `
          <div ${hasStudents ? `data-action="filterGradebookByCohort" data-student-ids="${escapeHtml(studentIdsParam)}" data-cohort-label="${escapeHtml(k)}"` : ''}
               class="flex items-center gap-2 text-[11px] py-1 px-1.5 rounded-lg ${isCohortActive ? 'bg-amber-100/90 dark:bg-amber-950/70 ring-1.5 ring-amber-500 font-bold' : (hasStudents ? 'hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer group' : 'opacity-40 cursor-default')} transition select-none"
               title="${hasStudents ? (isCohortActive ? `Active Filter (${k}): Click to reset` : `Click to filter ${b.students.length} student${b.students.length === 1 ? '' : 's'} (${k} - ${b.label}): ${escapeHtml(studentNames)}`) : `No students in grade bracket ${k} (${b.label})`}">
            <div class="w-20 shrink-0 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full ${b.color} shrink-0"></span>
              <span class="font-mono text-[10.5px] font-bold ${isCohortActive ? 'text-amber-900 dark:text-amber-200' : 'text-slate-700 dark:text-slate-300'} truncate" title="${escapeHtml(b.label)}">${escapeHtml(k)}</span>
              ${isCohortActive ? `<span class="text-[9px] text-amber-700 dark:text-amber-400 font-black ml-auto" title="Filtered (click to reset)">✕</span>` : ''}
            </div>
            <div class="flex-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-full h-2 overflow-hidden shadow-inner">
              <div class="${b.color} h-full rounded-full transition-all duration-300" style="width: ${barWidth}%"></div>
            </div>
            <div class="w-14 text-right font-mono shrink-0">
              <span class="font-black ${isCohortActive ? 'text-amber-900 dark:text-amber-100' : 'text-slate-800 dark:text-slate-200'}">${b.count}</span>
              <span class="text-[9.5px] ${isCohortActive ? 'text-amber-700 dark:text-amber-300' : 'text-slate-400 dark:text-slate-500'}">(${pct}%)</span>
            </div>
          </div>
        `;
  }).join('');
}

function updateGradebookSidebar() {
  const errorsList = document.getElementById('gradebook-errors-list');
  const errorsBadge = document.getElementById('gradebook-errors-badge');
  const atRiskList = document.getElementById('gradebook-atrisk-list');
  const atRiskBadge = document.getElementById('gradebook-atrisk-badge');
  const statsContent = document.getElementById('gradebook-stats-content');
  const statsBadge = document.getElementById('gradebook-stats-badge');
  const distCont = document.getElementById('gradebook-grade-distribution');

  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';
  const config = getGradingConfig(selectedSec);

  // Pre-compute all grades ONCE to avoid redundant recalculation across widgets
  const filteredStudents = studentRoster.filter(s =>
    !selectedSec || s.section === selectedSec
  );
  const studentGrades = filteredStudents.map(s => ({
    student: s,
    gradeResult: calculateStudentGrade(s, config, selectedSec)
  }));

  // 1. Input Error Radar
  _renderInputErrorRadar(errorsList, errorsBadge, studentRoster, selectedSec, config);

  // 2. At-Risk Radar
  _renderAtRiskRadar(atRiskList, atRiskBadge, studentGrades);

  // 3. Class Performance Widget
  _renderClassPerformanceWidget(statsContent, statsBadge, studentGrades, selectedSec);

  // 4. Grade Distribution Histogram
  _renderGradeDistributionHistogram(distCont, studentGrades, selectedSec);
}

function highlightStudentInGradebook(studentId, section = null) {
  const secSelect = document.getElementById('gradebook-section-select');
  const activeSec = secSelect ? secSelect.value : '';
  const targetSection = section || activeSec;

  // Lock lookup strictly to the student's exact section to prevent cross-section shifts
  let student = studentRoster.find(s => s.id === studentId && s.section === targetSection);
  if (!student && !section) {
    student = studentRoster.find(s => s.id === studentId);
  }

  let switchedSection = false;
  if (student && secSelect && student.section && secSelect.value !== student.section) {
    secSelect.value = student.section;
    gradebookCohortFilter = null;
    Render.views('grades');
    switchedSection = true;
  } else if (gradebookCohortFilter !== null && (!gradebookCohortFilter.studentIds || !gradebookCohortFilter.studentIds.includes(studentId))) {
    gradebookCohortFilter = null;
    Render.views('grades');
    switchedSection = true;
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const row = document.getElementById('grade-row-' + studentId) || document.querySelector(`tr[data-student-id="${studentId}"]`);
    const wrapper = document.getElementById('gradebook-scroll-wrapper');
    if (row && wrapper) {
      const thead = document.getElementById('gradebook-table-head');
      const theadHeight = thead ? thead.offsetHeight : 72;
      const targetTop = Math.max(0, row.offsetTop - theadHeight);
      wrapper.scrollTo({ top: targetTop, behavior: 'smooth' });

      row.classList.remove('row-flash-highlight');
      void row.offsetWidth; // trigger reflow
      row.classList.add('row-flash-highlight');
      setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
      showToast('Highlighted: ' + (student ? student.last + ', ' + student.first : studentId));
    } else if (row) {
      row.classList.remove('row-flash-highlight');
      void row.offsetWidth;
      row.classList.add('row-flash-highlight');
      setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
      showToast('Highlighted: ' + (student ? student.last + ', ' + student.first : studentId));
    } else {
      showToast("Student not in active section view.", "⚠️");
    }
  }));
}

function highlightStudentScoreError(studentId, subId, section = null) {
  highlightStudentInGradebook(studentId, section);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const targetInput = document.querySelector(`input[data-student="${studentId}"][data-sub="${subId}"]`);
    if (targetInput) {
      targetInput.focus({ preventScroll: true });
      targetInput.select();
      targetInput.classList.remove('input-beacon-pulse');
      void targetInput.offsetWidth;
      targetInput.classList.add('input-beacon-pulse');
      setTimeout(() => targetInput.classList.remove('input-beacon-pulse'), 2500);
    }
  }));
}
