/* ===========================================================================
 * GRADEBOOK
 * ---------------------------------------------------------------------------
 * The class record grid: score entry, weighted grade computation, institutional
 * scale mapping, category collapse/reorder and CSV export.
 * ======================================================================== */

function autoBalanceSubActivities(category) {
  if (!category.subActivities || category.subActivities.length === 0) return;
  const n = category.subActivities.length;
  const baseWeight = Math.floor((100 / n) * 100) / 100;
  const remainder = Math.round((100 - (baseWeight * n)) * 100) / 100;
  category.subActivities.forEach((sub, idx) => {
    sub.weight = idx === n - 1 ? Math.round((baseWeight + remainder) * 100) / 100 : baseWeight;
  });
}

function getActiveGradingScale(sectionKey) {
  if (!courseData.gradingScales) {
    courseData.gradingScales = { default: JSON.parse(JSON.stringify(DEFAULT_GRADING_SCALE)), sections: {} };
  }
  if (courseData.gradingScales.sections && sectionKey && courseData.gradingScales.sections[sectionKey]) {
    return {
      scale: courseData.gradingScales.sections[sectionKey],
      isDefault: false
    };
  }
  const defaultScale = (courseData.gradingScales.default && courseData.gradingScales.default.length)
    ? courseData.gradingScales.default
    : DEFAULT_GRADING_SCALE;
  return {
    scale: defaultScale,
    isDefault: true
  };
}

function getInstitutionalGrade(total, statusOverride, sectionKey) {
  if (statusOverride === 'WDRW') return { grade: "WDRW", status: "Withdrawn", class: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1e293b] border-slate-300 dark:border-slate-600 font-bold" };
  if (statusOverride === 'DRP') return { grade: "DRP", status: "Dropped", class: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1e293b] border-slate-300 dark:border-slate-600 font-bold" };
  if (statusOverride === 'INC') return { grade: "INC", status: "Incomplete", class: "text-orange-700 dark:text-orange-200 bg-orange-100 dark:bg-[#431407] border-orange-300 dark:border-orange-600 font-bold" };

  const num = parseFloat(total) || 0;
  const { scale } = getActiveGradingScale(sectionKey);
  const sorted = [...scale].sort((a, b) => b.min - a.min);

  for (const item of sorted) {
    if (num >= item.min) {
      let badgeClass = item.class;
      if (!badgeClass) {
        if (item.grade === '1.00') badgeClass = "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-[#063526] border-emerald-300 dark:border-emerald-600 font-black";
        else if (parseFloat(item.grade) <= 1.75) badgeClass = "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-[#063526] border-emerald-300 dark:border-emerald-600 font-bold";
        else if (parseFloat(item.grade) <= 2.50) badgeClass = "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#0f274a] border-blue-300 dark:border-blue-600 font-bold";
        else if (parseFloat(item.grade) <= 3.00) badgeClass = "text-amber-700 dark:text-amber-200 bg-amber-50 dark:bg-[#3b2306] border-amber-300 dark:border-amber-600 font-bold";
        else if (item.grade === 'INC') badgeClass = "text-orange-700 dark:text-orange-200 bg-orange-100 dark:bg-[#431407] border-orange-300 dark:border-orange-600 font-black";
        else badgeClass = "text-rose-800 dark:text-rose-200 bg-rose-100 dark:bg-[#3b0d18] border-rose-300 dark:border-rose-600 font-black";
      }
      return {
        grade: item.grade,
        status: item.status || (item.grade === 'INC' ? 'Incomplete' : (item.grade === '5.00' ? 'Failed' : 'Passed')),
        class: badgeClass
      };
    }
  }
  return { grade: "5.00", status: "Failed", class: "text-rose-800 dark:text-rose-200 bg-rose-100 dark:bg-[#3b0d18] border-rose-300 dark:border-rose-600 font-black" };
}

const getMsuGrade = getInstitutionalGrade; // Backward compatibility alias

function getGradingConfig(sectionKey) {
  if (!courseData.gradingConfigs) courseData.gradingConfigs = {};
  if (sectionKey && courseData.gradingConfigs[sectionKey]) {
    return courseData.gradingConfigs[sectionKey];
  }
  if (sectionKey) {
    const code = sectionKey.split(' - ')[0];
    if (courseData.gradingConfigs[code]) {
      return courseData.gradingConfigs[code];
    }
  }
  return DEFAULT_GRADING_CONFIG;
}

function ensureStudentScores(student, config) {
  if (!student) return;
  if (!student.scores || typeof student.scores !== 'object') student.scores = {};
  if (!config || !config.categories) return;
  config.categories.forEach(cat => {
    if (cat.subActivities && cat.subActivities.length > 0) {
      cat.subActivities.forEach(sub => {
        if (student.scores[sub.id] === undefined || student.scores[sub.id] === null || isNaN(student.scores[sub.id])) {
          const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
          let legacyPct = 85;
          if (cat.id === 'cat_quiz' && student.qz !== undefined) legacyPct = student.qz;
          else if (cat.id === 'cat_lab' && student.lab !== undefined) legacyPct = student.lab;
          else if (cat.id === 'cat_p1' && student.p1 !== undefined) legacyPct = student.p1;
          else if (cat.id === 'cat_p2' && student.p2 !== undefined) legacyPct = student.p2;
          else if (cat.id === 'cat_fin' && student.fin !== undefined) legacyPct = student.fin;
          student.scores[sub.id] = Math.round(((legacyPct || 0) / 100) * maxScore);
        }
      });
    }
  });
}

function getStudentScore(student, subId, catId, maxScore) {
  if (student.scores && student.scores[subId] !== undefined) {
    return parseFloat(student.scores[subId]) || 0;
  }
  // Migration fallback from legacy fields:
  if (catId === 'cat_quiz' && student.qz !== undefined) return Math.round(((student.qz || 0) / 100) * maxScore);
  if (catId === 'cat_lab' && student.lab !== undefined) return Math.round(((student.lab || 0) / 100) * maxScore);
  if (catId === 'cat_p1' && student.p1 !== undefined) return Math.round(((student.p1 || 0) / 100) * maxScore);
  if (catId === 'cat_p2' && student.p2 !== undefined) return Math.round(((student.p2 || 0) / 100) * maxScore);
  if (catId === 'cat_fin' && student.fin !== undefined) return Math.round(((student.fin || 0) / 100) * maxScore);
  return 0;
}

function calculateStudentGrade(student, config, sectionKey) {
  let finalWeightedPercent = 0;
  const categoryTotals = {};

  config.categories.forEach(cat => {
    const catWeight = parseFloat(cat.weight) || 0;
    let catPercent = 0;
    if (cat.subActivities && cat.subActivities.length > 0) {
      let subWeightedSum = 0;
      cat.subActivities.forEach(sub => {
        const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
        const subWeight = parseFloat(sub.weight) || 0;
        const scoreVal = getStudentScore(student, sub.id, cat.id, maxScore);
        const subRatio = maxScore > 0 ? (scoreVal / maxScore) : 0;
        subWeightedSum += subRatio * (subWeight / 100);
      });
      catPercent = subWeightedSum * 100;
    }
    categoryTotals[cat.id] = Math.round(catPercent * 100) / 100;
    finalWeightedPercent += (catPercent * (catWeight / 100));
  });

  finalWeightedPercent = Math.round(finalWeightedPercent * 100) / 100;
  const institutionalGrade = getInstitutionalGrade(finalWeightedPercent, student.statusOverride, sectionKey);

  return {
    categoryTotals,
    total: finalWeightedPercent,
    institutionalGrade,
    msu: institutionalGrade
  };
}

function renderGradingScaleDrawer(sectionKey) {
  const { scale, isDefault } = getActiveGradingScale(sectionKey);
  const titleEl = document.getElementById('grading-scale-drawer-title');
  const badgeEl = document.getElementById('grading-scale-drawer-badge');
  const gridEl = document.getElementById('grading-scale-cards-grid');

  if (titleEl) {
    titleEl.innerText = sectionKey ? `Grading Scale: ${sectionKey}` : 'Default Institutional Grading Scale';
  }
  if (badgeEl) {
    if (isDefault) {
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-950 dark:text-amber-300 text-amber-900';
      badgeEl.innerText = 'Default Scale';
    } else {
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 text-emerald-900';
      badgeEl.innerText = 'Custom Section Scale';
    }
  }
  if (gridEl) {
    gridEl.innerHTML = scale.map(item => `
          <div class="p-1.5 rounded bg-white dark:bg-slate-900 border ${item.grade === '5.00' ? 'border-rose-300 dark:border-rose-800' : (item.grade === 'INC' ? 'border-orange-300 dark:border-orange-800' : (parseFloat(item.grade) <= 1.75 ? 'border-emerald-300 dark:border-emerald-800' : (parseFloat(item.grade) <= 2.50 ? 'border-blue-300 dark:border-blue-800' : 'border-amber-300 dark:border-amber-800')))}">
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-sans">${item.min.toFixed(2)}%</div>
            <div class="font-black text-xs ${item.grade === '5.00' ? 'text-rose-700 dark:text-rose-400' : (item.grade === 'INC' ? 'text-orange-700 dark:text-orange-400' : (parseFloat(item.grade) <= 1.75 ? 'text-emerald-700 dark:text-emerald-400' : (parseFloat(item.grade) <= 2.50 ? 'text-blue-700 dark:text-blue-400' : 'text-amber-700 dark:text-amber-400')))}">${item.grade}</div>
          </div>
        `).join('') + `
          <div class="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-sans">Special</div>
            <div class="font-bold text-slate-700 dark:text-slate-300 text-xs">WDRW / DRP</div>
          </div>
        `;
  }
}

function toggleGradebookCategoryCollapse(catId) {
  if (draggedCategoryIdx !== null) return;
  gradebookCollapsedCats[catId] = !gradebookCollapsedCats[catId];
  renderGradebook();
}

function handleCategoryDragStart(e, idx) {
  draggedCategoryIdx = idx;
  if (e.dataTransfer) e.dataTransfer.setData('text/plain', idx);
}

function handleCategoryDrop(e, targetIdx) {
  e.preventDefault();
  e.currentTarget.classList.remove('grade-cat-drag-over');
  if (draggedCategoryIdx === null || draggedCategoryIdx === targetIdx) {
    draggedCategoryIdx = null;
    return;
  }
  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';
  const config = getGradingConfig(selectedSec);
  
  const [movedCat] = config.categories.splice(draggedCategoryIdx, 1);
  config.categories.splice(targetIdx, 0, movedCat);
  draggedCategoryIdx = null;
  
  if (!courseData.gradingConfigs) courseData.gradingConfigs = {};
  courseData.gradingConfigs[selectedSec] = config;
  
  saveAppState();
  renderGradebook();
  showToast(`Moved "${movedCat.name}" category!`);
}

function toggleAllGradebookSubActivities() {
  isAllGradebookSubActivitiesCollapsed = !isAllGradebookSubActivitiesCollapsed;
  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';
  const config = getGradingConfig(selectedSec);
  config.categories.forEach(cat => {
    gradebookCollapsedCats[cat.id] = isAllGradebookSubActivitiesCollapsed;
  });
  renderGradebook();
}


function getGradebookSortIndicator(colKey) {
  if (gradebookSortState.col !== colKey) {
    return '<span class="text-[10px] text-slate-400 opacity-60 ml-1 inline-block">⇅</span>';
  }
  return gradebookSortState.direction === 'asc'
    ? '<span class="text-[11px] text-msu-maroon font-black ml-1 inline-block">▲</span>'
    : '<span class="text-[11px] text-msu-maroon font-black ml-1 inline-block">▼</span>';
}

function toggleGradebookSort(colKey) {
  saveAppState(true);
  if (gradebookSortState.col === colKey) {
    gradebookSortState.direction = gradebookSortState.direction === 'asc' ? 'desc' : 'asc';
  } else {
    gradebookSortState.col = colKey;
    // Default to descending (highest first) for numeric/score columns
    if (colKey === 'total' || colKey.startsWith('sub_') || colKey.startsWith('cat_')) {
      gradebookSortState.direction = 'desc';
    } else {
      gradebookSortState.direction = 'asc';
    }
  }
  renderGradebook();
}

function toggleGradingScaleDrawer() {
  const scaleDrawer = document.getElementById('grading-scale-drawer');
  const statsDrawer = document.getElementById('gradebook-stats-drawer');
  const scaleBtn = document.getElementById('gradebook-scale-toggle-btn');
  const statsBtn = document.getElementById('gradebook-stats-toggle-btn');
  if (!scaleDrawer) return;

  const willOpen = scaleDrawer.classList.contains('hidden');
  if (willOpen) {
    if (statsDrawer) statsDrawer.classList.add('hidden');
    if (statsBtn) {
      statsBtn.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-100', 'shadow-inner');
      statsBtn.classList.add('bg-emerald-50');
    }
  }
  scaleDrawer.classList.toggle('hidden');
  const isOpen = !scaleDrawer.classList.contains('hidden');
  if (scaleBtn) {
    if (isOpen) {
      scaleBtn.classList.add('ring-2', 'ring-amber-500', 'bg-amber-100', 'shadow-inner');
      scaleBtn.classList.remove('bg-amber-50');
    } else {
      scaleBtn.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-100', 'shadow-inner');
      scaleBtn.classList.add('bg-amber-50');
    }
  }
}

function toggleGradebookStatsDrawer() {
  const sidebar = document.getElementById('sidebar-gradebook');
  if (sidebar && sidebar.classList.contains('tab-sidebar-collapsed')) {
    toggleTabSidebar('gradebook');
  }
  const widget = document.getElementById('gradebook-widget-stats');
  if (widget) {
    widget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    widget.classList.add('ring-2', 'ring-emerald-500');
    setTimeout(() => widget.classList.remove('ring-2', 'ring-emerald-500'), 1500);
  }
}

function setGradebookStatsView(viewMode) {
  if (typeof updateGradebookSidebar === 'function') updateGradebookSidebar();
}

function renderGradebookStats(selectedSec, studentsList, config) {
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
}

function _renderGradebookHeader(thead, config, categoryPalette, isUnbalanced, totalCatWeight) {
  if (!thead) return;

  let tier1Html = `
        <tr class="border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold bg-slate-100 dark:bg-slate-900">
          <th rowspan="2" data-action="toggleGradebookSort" data-sort="default" class="sticky-grade-head-1 py-2.5 px-2 text-center border-r border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 cursor-pointer select-none hover:bg-slate-200 dark:hover:bg-slate-800 transition" title="Click to reset to default student roster order">
            <div class="flex items-center justify-center gap-0.5">
              <span>#</span>
              ${getGradebookSortIndicator('default')}
            </div>
          </th>
          <th rowspan="2" data-action="toggleGradebookSort" data-sort="id" class="sticky-grade-head-2 py-2.5 px-2.5 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 cursor-pointer select-none hover:bg-slate-200 dark:hover:bg-slate-800 transition" title="Click to sort by Student ID (Ascending/Descending)">
            <div class="flex items-center justify-center gap-1">
              <span>Student ID</span>
              ${getGradebookSortIndicator('id')}
            </div>
          </th>
          <th rowspan="2" data-action="toggleGradebookSort" data-sort="name" class="sticky-grade-head-3 py-2.5 px-3 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 cursor-pointer select-none hover:bg-slate-200 dark:hover:bg-slate-800 transition" title="Click to sort by Student Name (A-Z / Z-A)">
            <div class="flex items-center justify-center gap-1">
              <span>Student Name</span>
              ${getGradebookSortIndicator('name')}
            </div>
          </th>
      `;

  let tier2Html = `
        <tr class="border-b border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-900 text-[11px]">
      `;

  config.categories.forEach((cat, catIdx) => {
    const catTheme = categoryPalette[catIdx % categoryPalette.length];
    const isCollapsed = !!gradebookCollapsedCats[cat.id];

    if (isCollapsed) {
      tier1Html += `
            <th colspan="1" draggable="true" data-action-dragstart="handleCategoryDragStart" data-cat-idx="${catIdx}" data-action-dragover="handleCategoryDragOver" data-action-dragleave="handleCategoryDragLeave" data-action-drop="handleCategoryDrop" data-action="toggleGradebookCategoryCollapse" data-cat-id="${escapeHtml(cat.id)}" class="cursor-grab active:cursor-grabbing py-2.5 px-2 text-center font-extrabold ${catTheme.tier1} ${catTheme.groupBorder} select-none hover:brightness-95 transition-all" title="Click to expand ${escapeHtml(cat.name)} sub-activities (or drag to reorder)">
              <div class="flex items-center justify-center gap-1.5">
                <span class="text-xs tracking-tight">${escapeHtml(cat.name)} (${cat.weight}%)</span>
                <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">▸</span>
              </div>
            </th>
          `;
      tier2Html += `
            <th data-action="toggleGradebookSort" data-sort="cat_${escapeHtml(cat.id)}" class="py-1.5 px-2 text-center whitespace-nowrap text-slate-700 dark:text-slate-200 font-bold text-[10.5px] ${catTheme.tier2} ${catTheme.groupBorder} cursor-pointer select-none hover:brightness-95 transition" title="Click to sort by ${escapeHtml(cat.name)} Subtotal %">
              <div class="flex items-center justify-center gap-0.5">
                <span>Subtotal %</span>
                ${getGradebookSortIndicator('cat_' + cat.id)}
              </div>
            </th>
          `;
    } else {
      const subCount = (cat.subActivities && cat.subActivities.length > 0) ? cat.subActivities.length : 1;
      tier1Html += `
            <th colspan="${subCount}" draggable="true" data-action-dragstart="handleCategoryDragStart" data-cat-idx="${catIdx}" data-action-dragover="handleCategoryDragOver" data-action-dragleave="handleCategoryDragLeave" data-action-drop="handleCategoryDrop" data-action="toggleGradebookCategoryCollapse" data-cat-id="${escapeHtml(cat.id)}" class="cursor-grab active:cursor-grabbing py-2.5 px-2 text-center font-extrabold ${catTheme.tier1} ${catTheme.groupBorder} select-none hover:brightness-95 transition-all" title="Click to collapse ${escapeHtml(cat.name)} sub-activities (or drag to reorder)">
              <div class="flex items-center justify-center gap-1.5">
                <span class="text-xs tracking-tight">${escapeHtml(cat.name)} (${cat.weight}%)</span>
                ${(cat.subActivities && cat.subActivities.length > 0) ? `<span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">▾</span>` : ''}
              </div>
            </th>
          `;
      if (cat.subActivities && cat.subActivities.length > 0) {
        cat.subActivities.forEach((sub, subIdx) => {
          const isLast = (subIdx === cat.subActivities.length - 1);
          const borderClass = isLast ? catTheme.groupBorder : 'border-r border-slate-200 dark:border-slate-700';
          tier2Html += `
                <th data-action="toggleGradebookSort" data-sort="sub_${escapeHtml(sub.id)}" class="py-1.5 px-1.5 text-center whitespace-nowrap ${catTheme.tier2} ${borderClass} cursor-pointer select-none hover:brightness-95 transition" title="Click to sort by ${escapeHtml(sub.name)} score (Highest/Lowest)">
                  <div class="flex items-center justify-center gap-0.5">
                    <span class="font-bold text-slate-800 dark:text-slate-100 text-[11px]">${escapeHtml(sub.name)}</span>
                    ${getGradebookSortIndicator('sub_' + sub.id)}
                  </div>
                  <div class="text-[9.5px] text-slate-500 dark:text-slate-400 font-mono font-normal">${sub.maxScore} pts • ${sub.weight}%</div>
                </th>
              `;
        });
      } else {
        tier2Html += `
              <th class="py-1.5 px-1.5 text-center italic text-slate-400 dark:text-slate-500 ${catTheme.tier2} ${catTheme.groupBorder}">No items</th>
            `;
      }
    }
  });

  if (isUnbalanced) {
    tier1Html += `
          <th class="py-2 px-2 text-center border-r border-rose-300 dark:border-rose-700 bg-rose-100/90 dark:bg-rose-950 text-rose-950 dark:text-rose-200 font-extrabold whitespace-nowrap" title="Total activity percentage must equal 100%">
            <span class="inline-flex items-center gap-1 text-[11px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse shadow-2xs">
              ⚠️ Sum: ${totalCatWeight}% (≠ 100%)
            </span>
          </th>
        `;
    tier2Html += `
          <th class="py-1.5 px-1.5 text-center border-r border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/70 text-[10px] text-rose-700 dark:text-rose-300 font-bold whitespace-nowrap">
            Weight Error
          </th>
        `;
  }

  tier1Html += `
          <th rowspan="2" data-action="toggleGradebookSort" data-sort="total" class="py-2.5 px-2 text-center bg-slate-200 dark:bg-slate-900 font-black border-r border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 min-w-[85px] cursor-pointer select-none hover:bg-slate-300 dark:hover:bg-slate-800 transition" title="Click to sort by Total Percentage (Highest/Lowest)">
            <div class="flex items-center justify-center gap-1">
              <span>Total %</span>
              ${getGradebookSortIndicator('total')}
            </div>
          </th>
          <th rowspan="2" class="py-2.5 px-2 text-center bg-slate-200 dark:bg-slate-900 font-black border-r border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 min-w-[85px]">Final Grade</th>
          <th rowspan="2" class="py-2.5 px-2 text-center bg-slate-100 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold min-w-[105px]">Status</th>
        </tr>
      `;
  tier2Html += `</tr>`;

  thead.innerHTML = tier1Html + tier2Html;
}

function _filterAndSortGradebookStudents(sectionStudents, config, selectedSec, gradeCache) {
  // Apply Grade and Status dropdown filters + Cohort filter
  const gradeFilter = document.getElementById('gradebook-grade-filter')?.value || 'all';
  const statusFilter = document.getElementById('gradebook-status-filter')?.value || 'all';

  if ((gradeFilter !== 'all' || statusFilter !== 'all') && typeof gradebookCohortFilter !== 'undefined') {
    gradebookCohortFilter = null;
  }

  let filtered = sectionStudents.filter(s => {
    if (typeof gradebookCohortFilter !== 'undefined' && gradebookCohortFilter && Array.isArray(gradebookCohortFilter.studentIds)) {
      if (!gradebookCohortFilter.studentIds.includes(s.id)) return false;
    }
    const res = gradeCache.get(s.id) || calculateStudentGrade(s, config, selectedSec);
    const matchesGrade = (gradeFilter === 'all') || (res.msu.grade === gradeFilter);
    const matchesStatus = (statusFilter === 'all') || (res.msu.status.toLowerCase() === statusFilter.toLowerCase());
    return matchesGrade && matchesStatus;
  });

  // Apply intelligent column sorting
  if (gradebookSortState.col === 'id') {
    filtered.sort((a, b) => {
      const cmp = (a.id || '').localeCompare(b.id || '', undefined, { numeric: true, sensitivity: 'base' });
      return gradebookSortState.direction === 'asc' ? cmp : -cmp;
    });
  } else if (gradebookSortState.col === 'name') {
    filtered.sort((a, b) => {
      const nameA = `${a.last || ''}, ${a.first || ''}`.trim().toLowerCase();
      const nameB = `${b.last || ''}, ${b.first || ''}`.trim().toLowerCase();
      const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
      return gradebookSortState.direction === 'asc' ? cmp : -cmp;
    });
  } else if (gradebookSortState.col === 'total') {
    filtered.sort((a, b) => {
      const gradeA = (gradeCache.get(a.id) || calculateStudentGrade(a, config, selectedSec)).total || 0;
      const gradeB = (gradeCache.get(b.id) || calculateStudentGrade(b, config, selectedSec)).total || 0;
      return gradebookSortState.direction === 'asc' ? (gradeA - gradeB) : (gradeB - gradeA);
    });
  } else if (gradebookSortState.col.startsWith('sub_')) {
    const subCol = gradebookSortState.col;
    let targetCat = null;
    let targetSub = null;
    config.categories.forEach(cat => {
      if (cat.subActivities) {
        const found = cat.subActivities.find(sub => sub.id === subCol || 'sub_' + sub.id === subCol);
        if (found) { targetCat = cat; targetSub = found; }
      }
    });
    const actualSubId = targetSub ? targetSub.id : subCol.replace(/^sub_sub_/, 'sub_');
    const catId = targetCat ? targetCat.id : '';
    const maxScore = targetSub ? targetSub.maxScore : 100;

    filtered.sort((a, b) => {
      const valA = parseFloat(getStudentScore(a, actualSubId, catId, maxScore)) || 0;
      const valB = parseFloat(getStudentScore(b, actualSubId, catId, maxScore)) || 0;
      return gradebookSortState.direction === 'asc' ? (valA - valB) : (valB - valA);
    });
  } else if (gradebookSortState.col.startsWith('cat_')) {
    const catCol = gradebookSortState.col;
    let targetCat = config.categories.find(c => c.id === catCol || 'cat_' + c.id === catCol);
    const actualCatId = targetCat ? targetCat.id : catCol.replace(/^cat_cat_/, 'cat_');
    filtered.sort((a, b) => {
      const gradeA = gradeCache.get(a.id) || calculateStudentGrade(a, config, selectedSec);
      const gradeB = gradeCache.get(b.id) || calculateStudentGrade(b, config, selectedSec);
      const valA = (gradeA.categoryTotals && gradeA.categoryTotals[actualCatId] !== undefined) ? gradeA.categoryTotals[actualCatId] : 0;
      const valB = (gradeB.categoryTotals && gradeB.categoryTotals[actualCatId] !== undefined) ? gradeB.categoryTotals[actualCatId] : 0;
      return gradebookSortState.direction === 'asc' ? (valA - valB) : (valB - valA);
    });
  }

  return filtered;
}

function _renderGradebookStudentRows(tbody, filtered, config, selectedSec, gradeCache, categoryPalette, isUnbalanced) {
  tbody.innerHTML = filtered.map((s, rowIdx) => {
    const gradeResult = gradeCache.get(s.id) || calculateStudentGrade(s, config, selectedSec);
    let colIdx = 0;
    const isEven = (rowIdx % 2 === 0);
    const rowClass = isEven
      ? 'grade-row-even bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100'
      : 'grade-row-odd bg-[#f1f5f9] dark:bg-[#1e293b] text-slate-800 dark:text-slate-100';
    const stickyCellBg = isEven
      ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100'
      : 'bg-[#f1f5f9] dark:bg-[#1e293b] text-slate-800 dark:text-slate-100';

    let cellsHtml = '';
    config.categories.forEach((cat, catIdx) => {
      const catTheme = categoryPalette[catIdx % categoryPalette.length];
      const isCollapsed = !!gradebookCollapsedCats[cat.id];
      if (isCollapsed) {
        const catScore = (gradeResult.categoryTotals && gradeResult.categoryTotals[cat.id] !== undefined) ? gradeResult.categoryTotals[cat.id] : 0;
        cellsHtml += `
              <td class="py-2 px-2 text-center ${catTheme.groupBorder} font-mono font-black text-xs" data-cat-summary="${cat.id}">
                <span class="inline-block px-2 py-0.5 rounded-full text-xs font-bold ${catTheme.badge}">${(parseFloat(catScore) || 0).toFixed(2)}%</span>
              </td>
            `;
      } else {
        if (cat.subActivities && cat.subActivities.length > 0) {
          cat.subActivities.forEach((sub, subIdx) => {
            const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
            const val = getStudentScore(s, sub.id, cat.id, maxScore);
            const numVal = parseFloat(val);
            const isOverMax = !isNaN(numVal) && numVal > maxScore;
            const inputClass = isOverMax ? 'border-rose-500 dark:border-rose-600 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 ring-2 ring-rose-400 font-black' : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100';
            const inputTitle = isOverMax ? `⚠️ Warning: Score (${val}) exceeds maximum possible items (${maxScore})!` : `Score (max ${maxScore})`;
            const isLast = (subIdx === cat.subActivities.length - 1);
            const cellBorder = isLast ? catTheme.groupBorder : 'border-r border-slate-200/80 dark:border-slate-700/60';

            cellsHtml += `
                  <td class="py-2 px-1 text-center ${cellBorder}">
                    <input type="number" min="0" max="${maxScore}" step="any"
                      data-student="${escapeHtml(s.id)}"
                      data-sub="${escapeHtml(sub.id)}"
                      data-row="${rowIdx}"
                      data-col="${colIdx}"
                      value="${val}"
                      title="${inputTitle}"
                      data-action-focus="selectOnFocus"
                      data-action-keydown="handleGradeGridKey"
                      data-action-input="updateDynamicScore"
                      data-action-change="updateDynamicScoreCommit"
                      data-action-blur="updateDynamicScoreCommit"
                      class="grade-cell-input w-14 text-center font-mono font-bold rounded py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border ${inputClass}">
                  </td>
                `;
            colIdx++;
          });
        } else {
          cellsHtml += `<td class="py-2 px-1 text-center text-slate-300 dark:text-slate-600 ${catTheme.groupBorder}">—</td>`;
        }
      }
    });

    return `
          <tr id="grade-row-${escapeHtml(s.id)}" data-student-id="${escapeHtml(s.id)}" class="${rowClass} hover:bg-blue-50/60 dark:hover:bg-[#24344d] transition border-b border-slate-200 dark:border-slate-700 group">
            <td class="sticky-grade-col-1 py-2.5 px-2 font-mono text-slate-400 dark:text-slate-400 text-center border-r border-slate-200 dark:border-slate-700 ${stickyCellBg}">${rowIdx + 1}</td>
            <td class="sticky-grade-col-2 py-2.5 px-2.5 font-mono font-bold text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap ${stickyCellBg}">${escapeHtml(s.id)}</td>
            <td class="sticky-grade-col-3 py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap ${stickyCellBg} overflow-hidden" title="${escapeHtml(s.last)}, ${escapeHtml(s.first)}">
              <div class="truncate max-w-[216px]">${escapeHtml(s.last)}, ${escapeHtml(s.first)}</div>
            </td>
            ${cellsHtml}
            ${isUnbalanced ? '<td class="py-2 px-1 text-center border-r border-rose-200 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs" title="Total weight does not equal 100%">⚠️</td>' : ''}
            <td class="py-2.5 px-2 text-center font-extrabold text-xs font-mono text-slate-800 dark:text-slate-200 ${stickyCellBg} border-r border-slate-200 dark:border-slate-700 grade-total-cell">${(parseFloat(gradeResult.total) || 0).toFixed(2)}%</td>
            <td class="py-2.5 px-2 text-center border-r border-slate-200 dark:border-slate-700 ${stickyCellBg}">
              <span class="grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${gradeResult.msu.class}">${gradeResult.msu.grade}</span>
            </td>
            <td class="py-2.5 px-2 text-center ${stickyCellBg} border-l border-slate-200 dark:border-slate-700">
              <select data-action-change="updateGradeStatusOverride" data-student="${escapeHtml(s.id)}" class="grade-status-select text-[11px] font-bold rounded border border-slate-300 dark:border-slate-600 px-1 py-1 bg-white dark:bg-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-msu-maroon ${gradeResult.msu.status === 'Passed' ? 'text-emerald-700 dark:text-emerald-400' : (gradeResult.msu.status === 'Incomplete' ? 'text-orange-700 dark:text-orange-400' : (gradeResult.msu.status === 'Withdrawn' || gradeResult.msu.status === 'Dropped' ? 'text-slate-600 dark:text-slate-400' : 'text-rose-700 dark:text-rose-400'))}">
                <option value="" ${!s.statusOverride ? 'selected' : ''}>Auto (${gradeResult.msu.status})</option>
                <option value="INC" ${s.statusOverride === 'INC' ? 'selected' : ''}>INC</option>
                <option value="WDRW" ${s.statusOverride === 'WDRW' ? 'selected' : ''}>WDRW</option>
                <option value="DRP" ${s.statusOverride === 'DRP' ? 'selected' : ''}>DRP</option>
              </select>
            </td>
          </tr>
        `;
  }).join('');
}

function _renderGradebookFooter(tfoot, filtered, config, selectedSec, gradeCache, categoryPalette, isUnbalanced) {
  if (!tfoot) return;

  let footCellsHtml = '';
  let classSumTotal = 0;
  let passCount = 0;

  filtered.forEach(s => {
    const res = gradeCache.get(s.id) || calculateStudentGrade(s, config, selectedSec);
    classSumTotal += res.total;
    if (res.msu.status === 'Passed') passCount++;
  });

  const classAvgTotal = filtered.length > 0 ? (classSumTotal / filtered.length) : 0;
  const classAvgMsu = getMsuGrade(classAvgTotal, null, selectedSec);
  const passRate = filtered.length > 0 ? ((passCount / filtered.length) * 100) : 0;

  config.categories.forEach((cat, catIdx) => {
    const catTheme = categoryPalette[catIdx % categoryPalette.length];
    const isCollapsed = !!gradebookCollapsedCats[cat.id];

    if (isCollapsed) {
      let catSum = 0;
      filtered.forEach(s => {
        const res = calculateStudentGrade(s, config, selectedSec);
        catSum += (res.categoryTotals && res.categoryTotals[cat.id]) ? res.categoryTotals[cat.id] : 0;
      });
      const catAvg = filtered.length > 0 ? (catSum / filtered.length) : 0;
      footCellsHtml += `
            <td class="py-2.5 px-2 text-center font-mono font-black text-xs ${catTheme.groupBorder} bg-slate-100 dark:bg-slate-900" title="Class Average for ${escapeHtml(cat.name)}">
              <span class="inline-block px-2 py-0.5 rounded-full text-xs font-bold ${catTheme.badge}">${catAvg.toFixed(2)}%</span>
            </td>
          `;
    } else {
      if (cat.subActivities && cat.subActivities.length > 0) {
        cat.subActivities.forEach((sub, subIdx) => {
          let subScoreSum = 0;
          filtered.forEach(s => {
            subScoreSum += parseFloat(getStudentScore(s, sub.id, cat.id, sub.maxScore)) || 0;
          });
          const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
          const avgScore = filtered.length > 0 ? (subScoreSum / filtered.length) : 0;
          const avgPct = (avgScore / maxScore) * 100;
          const isLast = (subIdx === cat.subActivities.length - 1);
          const cellBorder = isLast ? catTheme.groupBorder : 'border-r border-slate-200 dark:border-slate-700';

          footCellsHtml += `
                <td class="py-2 px-1 text-center font-mono text-[11px] ${cellBorder} bg-slate-100 dark:bg-slate-900" title="${escapeHtml(sub.name)}: Avg ${avgScore.toFixed(1)} / ${maxScore} (${avgPct.toFixed(2)}%)">
                  <div class="font-bold text-slate-800 dark:text-slate-100">${avgScore.toFixed(1)}</div>
                  <div class="text-[9.5px] text-slate-500 dark:text-slate-400 font-normal">${avgPct.toFixed(2)}%</div>
                </td>
              `;
        });
      } else {
        footCellsHtml += `<td class="py-2 px-1 text-center text-slate-400 dark:text-slate-500 ${catTheme.groupBorder} bg-slate-100 dark:bg-slate-900">—</td>`;
      }
    }
  });

  tfoot.innerHTML = `
        <tr class="border-t-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
          <td class="sticky-grade-foot-1 py-2.5 px-2 text-center font-mono font-bold text-slate-400 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">—</td>
          <td class="sticky-grade-foot-2 py-2.5 px-2.5 font-mono font-black text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap bg-slate-100 dark:bg-slate-900 uppercase tracking-wider text-[11px]">AVERAGE</td>
          <td class="sticky-grade-foot-3 py-2.5 px-3 font-bold text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700 whitespace-nowrap bg-slate-100 dark:bg-slate-900 text-xs">
            Class Mean (${filtered.length} Students)
          </td>
          ${footCellsHtml}
          ${isUnbalanced ? '<td class="py-2 px-1 text-center border-r border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-bold text-xs">—</td>' : ''}
          <td class="py-2.5 px-2 text-center font-black text-xs font-mono text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700">
            ${classAvgTotal.toFixed(2)}%
          </td>
          <td class="py-2.5 px-2 text-center border-r border-slate-200 dark:border-slate-700 bg-amber-100/80 dark:bg-slate-900">
            <span class="grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${classAvgMsu.class}">${classAvgMsu.grade}</span>
          </td>
          <td class="py-2.5 px-2 text-center bg-slate-100 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 whitespace-nowrap">
            <span class="text-[11px] font-black ${passRate >= 75 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}">${passRate.toFixed(2)}% Pass</span>
          </td>
        </tr>
      `;
}

function renderGradebook() {
  const secSelect = document.getElementById('gradebook-section-select');
  const tbody = document.getElementById('gradebook-table-body');
  const thead = document.getElementById('gradebook-table-head');
  if (!tbody) return;

  const allSections = [];
  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
  });

  if (secSelect) {
    const prevVal = secSelect.value;
    secSelect.innerHTML = allSections.map(s => `
          <option value="${s}">${escapeHtml(s)}</option>
        `).join('');
    if (prevVal && allSections.includes(prevVal)) {
      secSelect.value = prevVal;
    } else if (allSections.length > 0) {
      secSelect.value = allSections[0];
    }
  }

  const selectedSec = secSelect ? secSelect.value : (allSections[0] || '');

  if (typeof lastRenderedGradebookSection !== 'undefined' && lastRenderedGradebookSection && lastRenderedGradebookSection !== selectedSec) {
    if (typeof gradebookCohortFilter !== 'undefined') gradebookCohortFilter = null;
  }
  if (typeof lastRenderedGradebookSection !== 'undefined') lastRenderedGradebookSection = selectedSec;

  // Icon-only Google Classroom link container
  const gradebookClassroomContainer = document.getElementById('gradebook-classroom-btn-container');
  if (gradebookClassroomContainer) {
    if (selectedSec) {
      const parts = selectedSec.split(' - ');
      const code = parts[0];
      const sec = parts[1];
      const link = getClassroomLink(code, sec);
      if (link) {
        gradebookClassroomContainer.innerHTML = `
              <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center justify-center transition shadow-2xs" title="Open Google Classroom for ${escapeHtml(selectedSec)}">
                <svg class="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </a>
            `;
      } else {
        gradebookClassroomContainer.innerHTML = `
              <button type="button" data-action="openClassroomModal" data-course="${escapeHtml(code)}" data-section="${escapeHtml(sec)}" class="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-800 border border-dashed border-slate-300 hover:border-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center transition" title="+ Link Google Classroom for ${escapeHtml(selectedSec)}">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </button>
            `;
      }
    } else {
      gradebookClassroomContainer.innerHTML = '';
    }
  }

  // Update Grading Scale Drawer content
  renderGradingScaleDrawer(selectedSec);

  // Load section configuration
  const config = getGradingConfig(selectedSec);

  // Update collapse/expand toolbar button state
  const collapseText = document.getElementById('gradebook-collapse-text');
  const collapseIcon = document.getElementById('gradebook-collapse-icon');
  const allCollapsed = config.categories.length > 0 && config.categories.every(c => gradebookCollapsedCats[c.id]);
  if (collapseText && collapseIcon) {
    collapseText.innerText = allCollapsed ? 'Expand Sub-activities' : 'Collapse Sub-activities';
    collapseIcon.innerText = allCollapsed ? '⊟' : '⊞';
  }

  // Calculate total category percentage weight
  let totalCatWeight = 0;
  config.categories.forEach(cat => {
    totalCatWeight += parseFloat(cat.weight) || 0;
  });
  totalCatWeight = Math.round(totalCatWeight * 100) / 100;
  const isUnbalanced = Math.abs(totalCatWeight - 100) > 0.01;

  const weightAlertEl = document.getElementById('gradebook-weight-alert');
  const weightAlertMsg = document.getElementById('gradebook-weight-alert-msg');
  if (weightAlertEl) {
    if (isUnbalanced) {
      weightAlertEl.classList.remove('hidden');
      if (weightAlertMsg) {
        const diff = Math.round(Math.abs(100 - totalCatWeight) * 100) / 100;
        const diffDesc = totalCatWeight < 100 ? `${diff}% short of 100%` : `${diff}% over 100%`;
        weightAlertMsg.innerHTML = `Total activity weight currently adds up to <strong class="underline decoration-rose-500 font-black text-rose-950">${totalCatWeight}%</strong> (${diffDesc}). Final grades and institutional scale evaluation cannot be computed accurately until categories add up to exactly 100%.`;
      }
    } else {
      weightAlertEl.classList.add('hidden');
    }
  }

  const categoryPalette = [
    {
      tier1: 'bg-sky-100/90 dark:bg-[#0c1e36] text-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-700/80',
      tier2: 'bg-sky-50 dark:bg-[#0a1524] text-sky-900 dark:text-sky-200 border-sky-200 dark:border-sky-900/60',
      groupBorder: 'border-r-2 border-sky-300 dark:border-sky-700/80',
      badge: 'bg-sky-100 dark:bg-[#0f274a] text-sky-900 dark:text-sky-200 border border-sky-300 dark:border-sky-700/80'
    },
    {
      tier1: 'bg-violet-100/90 dark:bg-[#201138] text-violet-950 dark:text-violet-300 border-violet-300 dark:border-violet-700/80',
      tier2: 'bg-violet-50 dark:bg-[#150a24] text-violet-900 dark:text-violet-200 border-violet-200 dark:border-violet-900/60',
      groupBorder: 'border-r-2 border-violet-300 dark:border-violet-700/80',
      badge: 'bg-violet-100 dark:bg-[#2b1245] text-violet-900 dark:text-violet-200 border border-violet-300 dark:border-violet-700/80'
    },
    {
      tier1: 'bg-amber-100/90 dark:bg-[#2b1803] text-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700/80',
      tier2: 'bg-amber-50 dark:bg-[#1c1003] text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-900/60',
      groupBorder: 'border-r-2 border-amber-300 dark:border-amber-700/80',
      badge: 'bg-amber-100 dark:bg-[#3b2306] text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/80'
    },
    {
      tier1: 'bg-emerald-100/90 dark:bg-[#072a1e] text-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/80',
      tier2: 'bg-emerald-50 dark:bg-[#041a13] text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-900/60',
      groupBorder: 'border-r-2 border-emerald-300 dark:border-emerald-700/80',
      badge: 'bg-emerald-100 dark:bg-[#063526] text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/80'
    },
    {
      tier1: 'bg-rose-100/90 dark:bg-[#2d0e19] text-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-700/80',
      tier2: 'bg-rose-50 dark:bg-[#1f0911] text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-900/60',
      groupBorder: 'border-r-2 border-rose-300 dark:border-rose-700/80',
      badge: 'bg-rose-100 dark:bg-[#3b0d18] text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-700/80'
    },
    {
      tier1: 'bg-teal-100/90 dark:bg-[#062624] text-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-700/80',
      tier2: 'bg-teal-50 dark:bg-[#041817] text-teal-900 dark:text-teal-200 border-teal-200 dark:border-teal-900/60',
      groupBorder: 'border-r-2 border-teal-300 dark:border-teal-700/80',
      badge: 'bg-teal-100 dark:bg-[#062624] text-teal-900 dark:text-teal-200 border border-teal-300 dark:border-teal-700/80'
    },
    {
      tier1: 'bg-indigo-100/90 dark:bg-[#13173d] text-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700/80',
      tier2: 'bg-indigo-50 dark:bg-[#0d0f28] text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-900/60',
      groupBorder: 'border-r-2 border-indigo-300 dark:border-indigo-700/80',
      badge: 'bg-indigo-100 dark:bg-[#1f1b4d] text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700/80'
    }
  ];

  // 1. Render 2-tier spreadsheet header
  _renderGradebookHeader(thead, config, categoryPalette, isUnbalanced, totalCatWeight);

  // Filter students by selected section
  const sectionStudents = studentRoster.filter(s => s.section === selectedSec);
  sectionStudents.forEach(s => ensureStudentScores(s, config));

  // Memoize student grade calculations for this render pass to eliminate O(N log N) recalculations
  const gradeCache = new Map();
  sectionStudents.forEach(s => {
    gradeCache.set(s.id, calculateStudentGrade(s, config, selectedSec));
  });

  // Update statistics drawer with all enrolled students in section
  renderGradebookStats(selectedSec, sectionStudents, config);

  // 2. Filter & Sort students
  const filtered = _filterAndSortGradebookStudents(sectionStudents, config, selectedSec, gradeCache);

  const tfoot = document.getElementById('gradebook-table-foot');

  if (filtered.length === 0) {
    if (tfoot) tfoot.innerHTML = '';
    const gradeFilter = document.getElementById('gradebook-grade-filter')?.value || 'all';
    const statusFilter = document.getElementById('gradebook-status-filter')?.value || 'all';
    const isFilteredOut = (gradeFilter !== 'all' || statusFilter !== 'all' || (typeof gradebookCohortFilter !== 'undefined' && gradebookCohortFilter !== null)) && sectionStudents.length > 0;

    tbody.innerHTML = `
          <tr>
            <td colspan="30" class="py-8 text-center text-slate-400 italic">
              ${isFilteredOut
            ? `<div class="space-y-2.5 py-4">
                     <p class="text-slate-600 dark:text-slate-300 font-medium">No students in ${escapeHtml(selectedSec)} match the current filter ${gradebookCohortFilter ? `(<strong>${escapeHtml(gradebookCohortFilter.label)}</strong>)` : ''}.</p>
                     <button type="button" data-action="resetGradebookFilters" class="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold rounded-lg text-xs shadow-2xs transition inline-flex items-center gap-1.5 active:scale-95">
                       <span>✕</span><span>Reset Filters</span>
                     </button>
                   </div>`
            : `No students enrolled in section ${escapeHtml(selectedSec)}. Use the Class List tab to enroll students.`}
            </td>
          </tr>
        `;
    if (typeof updateGradebookResetFilterButton === 'function') updateGradebookResetFilterButton();
    return;
  }

  // 3. Render Student Rows
  _renderGradebookStudentRows(tbody, filtered, config, selectedSec, gradeCache, categoryPalette, isUnbalanced);

  // 4. Render Class Average Summary Footer (tfoot)
  _renderGradebookFooter(tfoot, filtered, config, selectedSec, gradeCache, categoryPalette, isUnbalanced);

  if (typeof updateGradebookResetFilterButton === 'function') {
    updateGradebookResetFilterButton();
  }
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
}

function handleGradeGridKey(e, row, col) {
  let targetRow = row;
  let targetCol = col;
  if (e.key === 'ArrowDown' || e.key === 'Enter') {
    e.preventDefault();
    targetRow = row + 1;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    targetRow = row - 1;
  } else if (e.key === 'ArrowRight') {
    let atEnd = true;
    try {
      if (e.target.selectionEnd !== null && e.target.selectionEnd !== undefined) {
        atEnd = (e.target.selectionEnd === e.target.value.length);
      }
    } catch (_) {}
    if (atEnd) targetCol = col + 1;
    else return;
  } else if (e.key === 'ArrowLeft') {
    let atStart = true;
    try {
      if (e.target.selectionStart !== null && e.target.selectionStart !== undefined) {
        atStart = (e.target.selectionStart === 0);
      }
    } catch (_) {}
    if (atStart) targetCol = col - 1;
    else return;
  } else {
    return;
  }
  const targetInput = document.querySelector(`input[data-row="${targetRow}"][data-col="${targetCol}"]`);
  if (targetInput) {
    targetInput.focus();
    targetInput.select();
  }
}

function updateGradeStatusOverride(studentId, overrideVal) {
  const student = studentRoster.find(s => s.id === studentId);
  if (!student) return;
  student.statusOverride = overrideVal || '';
  saveAppState();
  renderGradebook();
}

// High Performance In-Place Reactive Score Update
function updateDynamicScore(studentId, subId, val, immediate = false) {
  const secSelect = document.getElementById('gradebook-section-select');
  const sectionKey = secSelect ? secSelect.value : '';

  // Find student matching both ID and current section
  let student = studentRoster.find(s => s.id === studentId && (s.section === sectionKey || !sectionKey));
  if (!student) {
    student = studentRoster.find(s => s.id === studentId);
  }
  if (!student) return;

  if (!student.scores || typeof student.scores !== 'object') {
    student.scores = {};
  }

  const activeSection = sectionKey || student.section;
  const config = getGradingConfig(activeSection);

  // Sub-activity max score validation
  let targetSub = null;
  config.categories.forEach(cat => {
    if (cat.subActivities) {
      const found = cat.subActivities.find(sub => sub.id === subId);
      if (found) targetSub = found;
    }
  });
  const maxScore = (targetSub && targetSub.maxScore > 0) ? targetSub.maxScore : 100;

  const numVal = Math.max(0, parseFloat(val) || 0);
  student.scores[subId] = numVal;

  const gradeResult = calculateStudentGrade(student, config, sectionKey);
  const isOverMax = (parseFloat(val) || 0) > maxScore;

  const inputEl = document.querySelector(`input[data-student="${studentId}"][data-sub="${subId}"]`);
  if (inputEl) {
    if (isOverMax) {
      inputEl.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700', 'ring-2', 'ring-rose-400', 'font-black');
      inputEl.classList.remove('bg-white', 'border-slate-300');
      inputEl.title = `⚠️ Warning: Entered score (${val}) exceeds maximum possible items (${maxScore})!`;
      showToast(`⚠️ Warning: Score (${val}) exceeds max score (${maxScore}) for ${targetSub?.name || 'activity'}!`, "⚠️");
    } else {
      inputEl.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-700', 'ring-2', 'ring-rose-400', 'font-black');
      inputEl.classList.add('bg-white', 'border-slate-300');
      inputEl.title = `Score (max ${maxScore})`;
    }
  }

  // Sync legacy properties if standard IDs to preserve backward compatibility
  if (subId.startsWith('sub_quiz')) student.qz = gradeResult.categoryTotals['cat_quiz'] || student.qz;
  if (subId.startsWith('sub_lab')) student.lab = gradeResult.categoryTotals['cat_lab'] || student.lab;
  if (subId.startsWith('sub_p1')) student.p1 = gradeResult.categoryTotals['cat_p1'] || student.p1;
  if (subId.startsWith('sub_p2')) student.p2 = gradeResult.categoryTotals['cat_p2'] || student.p2;
  if (subId.startsWith('sub_fin')) student.fin = gradeResult.categoryTotals['cat_fin'] || student.fin;

  const row = document.getElementById('grade-row-' + studentId);
  if (row) {
    // Update category summary cells if in collapsed mode
    config.categories.forEach(cat => {
      const sumCell = row.querySelector(`[data-cat-summary="${cat.id}"]`);
      if (sumCell) {
        const badge = sumCell.querySelector('span');
        const formatted = (parseFloat(gradeResult.categoryTotals[cat.id]) || 0).toFixed(2) + '%';
        if (badge) badge.innerText = formatted;
        else sumCell.innerText = formatted;
      }
    });

    const totalCell = row.querySelector('.grade-total-cell');
    const msuCell = row.querySelector('.grade-msu-cell');
    const statusSelect = row.querySelector('.grade-status-select');

    if (totalCell) totalCell.innerText = (parseFloat(gradeResult.total) || 0).toFixed(2) + '%';
    if (msuCell) {
      msuCell.className = 'grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ' + gradeResult.msu.class;
      msuCell.innerText = gradeResult.msu.grade;
    }
    if (statusSelect && statusSelect.options && statusSelect.options.length > 0 && !student.statusOverride) {
      statusSelect.options[0].text = 'Auto (' + gradeResult.msu.status + ')';
      statusSelect.className = 'grade-status-select text-xs font-bold rounded border border-slate-300 px-1.5 py-1 bg-white focus:ring-1 focus:ring-msu-maroon ' + (gradeResult.msu.status === 'Passed' ? 'text-emerald-700' : (gradeResult.msu.status === 'Incomplete' ? 'text-orange-700' : 'text-rose-700'));
    }
  }

  // Save debounced to avoid freezing on rapid typing (immediate on blur/beforeunload)
  saveAppState(immediate);
  if (typeof updateGradebookSidebar === 'function') {
    updateGradebookSidebar();
  }
}

// Legacy fallback updateScore
function updateScore(studentId, field, val) {
  updateDynamicScore(studentId, 'sub_' + field, val);
}

function exportGradebookCSV() {
  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';
  const config = getGradingConfig(selectedSec);

  let headerRow = ['Student ID', 'Last Name', 'First Name', 'Section'];
  config.categories.forEach(cat => {
    if (cat.subActivities && cat.subActivities.length > 0) {
      cat.subActivities.forEach(sub => {
        headerRow.push(`${cat.name} - ${sub.name} (${sub.maxScore}pts • ${sub.weight}%)`);
      });
    } else {
      headerRow.push(`${cat.name} (${cat.weight}%)`);
    }
  });
  headerRow.push('Total %', 'Final Grade', 'Status');

  let csv = headerRow.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

  const filtered = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
  filtered.forEach(s => {
    const gradeResult = calculateStudentGrade(s, config, selectedSec);
    const row = [s.id, s.last, s.first, s.section];
    config.categories.forEach(cat => {
      if (cat.subActivities && cat.subActivities.length > 0) {
        cat.subActivities.forEach(sub => {
          const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
          row.push(getStudentScore(s, sub.id, cat.id, maxScore));
        });
      } else {
        row.push(0);
      }
    });
    row.push(gradeResult.total + '%', gradeResult.msu.grade, gradeResult.msu.status);
    csv += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'Class_Record_' + (selectedSec ? selectedSec.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' : '') + new Date().toISOString().slice(0, 10) + '.csv');
  a.click();
  showToast("Class Record CSV exported!");
}
