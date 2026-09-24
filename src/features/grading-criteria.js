/* ===========================================================================
 * GRADING CRITERIA EDITOR
 * ---------------------------------------------------------------------------
 * Categories, sub-activities and their weights.
 * ======================================================================== */

function openGradingCriteriaModal() {
  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';
  const parts = selectedSec.split(' - ');
  const courseCode = parts[0] || 'Course';

  const scopeSelect = document.getElementById('grading-criteria-scope');
  if (scopeSelect) {
    scopeSelect.innerHTML = `
          <option value="section__${escapeHtml(selectedSec)}">Section: ${escapeHtml(selectedSec)}</option>
          <option value="course__${escapeHtml(courseCode)}">All Sections of ${escapeHtml(courseCode)}</option>
        `;
    scopeSelect.value = `section__${selectedSec}`;
  }

  const existingConfig = getGradingConfig(selectedSec);
  currentEditingGradingConfig = JSON.parse(JSON.stringify(existingConfig));

  renderGradingCriteriaModal();
  document.getElementById('grading-criteria-modal').classList.remove('hidden');
}

function closeGradingCriteriaModal() {
  document.getElementById('grading-criteria-modal').classList.add('hidden');
}

function renderGradingCriteriaModal() {
  const container = document.getElementById('grading-criteria-categories-list');
  const totalWeightEl = document.getElementById('grading-criteria-total-weight');
  const indicatorEl = document.getElementById('grading-criteria-weight-indicator');
  if (!container || !currentEditingGradingConfig) return;

  let totalWeight = 0;
  currentEditingGradingConfig.categories.forEach(c => {
    totalWeight += parseFloat(c.weight) || 0;
  });
  totalWeight = Math.round(totalWeight * 100) / 100;

  if (totalWeightEl) totalWeightEl.innerText = totalWeight + '%';
  const errorBanner = document.getElementById('grading-criteria-error-msg');
  const errorText = document.getElementById('grading-criteria-error-text');

  if (indicatorEl) {
    if (Math.abs(totalWeight - 100) < 0.01) {
      indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-emerald-100 dark:bg-emerald-950 dark:border dark:border-emerald-600 dark:text-emerald-200 text-emerald-800';
      if (errorBanner) errorBanner.classList.add('hidden');
    } else {
      indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-rose-100 dark:bg-rose-950 dark:border-rose-700 dark:text-rose-200 text-rose-800 border border-rose-300 animate-pulse';
      if (errorBanner && errorText) {
        const diff = Math.round(Math.abs(100 - totalWeight) * 100) / 100;
        const diffDesc = totalWeight < 100 ? `${diff}% short of 100%` : `${diff}% over 100%`;
        errorText.innerHTML = `Total activity percentage is currently <strong>${totalWeight}%</strong> (${diffDesc}). All categories must sum to exactly 100%.`;
        errorBanner.classList.remove('hidden');
      }
    }
  }

  container.innerHTML = currentEditingGradingConfig.categories.map((cat, catIdx) => {
    const subItems = cat.subActivities || [];
    let subWeightSum = 0;
    subItems.forEach(s => { subWeightSum += parseFloat(s.weight) || 0; });
    subWeightSum = Math.round(subWeightSum * 100) / 100;

    return `
          <div class="pt-4 first:pt-0 space-y-3">
            <div class="flex items-center justify-between gap-3 flex-wrap bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                <span class="w-6 h-6 rounded bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-black text-xs flex items-center justify-center border dark:border-indigo-700">${catIdx + 1}</span>
                <div class="flex-1">
                  <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category Name</label>
                  <input type="text" value="${escapeHtml(cat.name)}" data-action-input="updateGradingCategoryField" data-cat-idx="${catIdx}" data-field="name" class="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Quizzes, Exams, Labs">
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div>
                  <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category Weight %</label>
                  <div class="flex items-center gap-1">
                    <input type="number" min="0" max="100" step="any" value="${cat.weight}" data-action-input="updateGradingCategoryField" data-cat-idx="${catIdx}" data-field="weight" class="w-18 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono font-bold text-center text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500">
                    <span class="font-bold text-slate-500 dark:text-slate-400">%</span>
                  </div>
                </div>
                ${currentEditingGradingConfig.categories.length > 1 ? `
                  <button type="button" data-action="removeGradingCategory" data-cat-idx="${catIdx}" class="mt-4 p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition" title="Delete Category">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                ` : ''}
              </div>
            </div>

            <div class="pl-4 pr-1 space-y-2">
              <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-1">
                <span>Sub-Activities (${subItems.length}) • Sub-Weight Sum: <strong class="${Math.abs(subWeightSum - 100) < 0.01 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}">${subWeightSum}%</strong></span>
                <div class="flex items-center gap-2">
                  <button type="button" data-action="autoBalanceCategorySubActivities" data-cat-idx="${catIdx}" class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-slate-600 dark:text-slate-300 hover:text-indigo-800 dark:hover:text-indigo-200 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold transition" title="Distribute 1/N equal percentage">
                    ⚖️ Auto-balance (1/N)
                  </button>
                  <button type="button" data-action="addGradingSubActivity" data-cat-idx="${catIdx}" class="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 rounded text-[10px] font-bold flex items-center gap-1 transition">
                    <span>+ Add Sub-Activity</span>
                  </button>
                </div>
              </div>

              <div class="space-y-1.5">
                ${subItems.map((sub, subIdx) => `
                  <div class="flex items-center gap-2 bg-slate-50/70 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                    <span class="text-slate-400 dark:text-slate-500 font-mono text-[10px] w-4 text-center">${subIdx + 1}</span>
                    <input type="text" value="${escapeHtml(sub.name)}" data-action-input="updateGradingSubActivityField" data-cat-idx="${catIdx}" data-sub-idx="${subIdx}" data-field="name" class="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-800 dark:text-slate-100" placeholder="e.g. Quiz #1">
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] text-slate-400 dark:text-slate-500">Total Items:</span>
                      <input type="number" min="1" max="1000" step="any" value="${sub.maxScore}" data-action-input="updateGradingSubActivityField" data-cat-idx="${catIdx}" data-sub-idx="${subIdx}" data-field="maxScore" class="w-16 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-1 text-xs text-center font-mono dark:text-slate-100" placeholder="50">
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] text-slate-400 dark:text-slate-500">Weight:</span>
                      <input type="number" min="0" max="100" step="any" value="${sub.weight}" data-action-input="updateGradingSubActivityField" data-cat-idx="${catIdx}" data-sub-idx="${subIdx}" data-field="weight" class="w-14 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-1 text-xs text-center font-mono font-bold dark:text-slate-100" placeholder="25">
                      <span class="text-[10px] text-slate-400 dark:text-slate-500">%</span>
                    </div>
                    <button type="button" data-action="removeGradingSubActivity" data-cat-idx="${catIdx}" data-sub-idx="${subIdx}" class="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition" title="Delete Sub-Activity">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
  }).join('');
}

function addGradingCategory() {
  if (!currentEditingGradingConfig) return;
  const num = currentEditingGradingConfig.categories.length + 1;
  const catId = 'cat_' + Date.now();
  currentEditingGradingConfig.categories.push({
    id: catId,
    name: 'Category ' + num,
    weight: 10,
    subActivities: [
      { id: 'sub_' + catId + '_1', name: 'Activity 1', maxScore: 50, weight: 100 }
    ]
  });
  renderGradingCriteriaModal();
}

function removeGradingCategory(catIdx) {
  if (!currentEditingGradingConfig || currentEditingGradingConfig.categories.length <= 1) return;
  currentEditingGradingConfig.categories.splice(catIdx, 1);
  renderGradingCriteriaModal();
}

function addGradingSubActivity(catIdx) {
  if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
  const cat = currentEditingGradingConfig.categories[catIdx];
  if (!cat.subActivities) cat.subActivities = [];
  const num = cat.subActivities.length + 1;
  cat.subActivities.push({
    id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name: cat.name.replace(/s$/i, '') + ' #' + num,
    maxScore: 50,
    weight: 0
  });
  autoBalanceSubActivities(cat);
  renderGradingCriteriaModal();
}

function removeGradingSubActivity(catIdx, subIdx) {
  if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
  const cat = currentEditingGradingConfig.categories[catIdx];
  if (!cat.subActivities) return;
  cat.subActivities.splice(subIdx, 1);
  autoBalanceSubActivities(cat);
  renderGradingCriteriaModal();
}

function autoBalanceCategorySubActivities(catIdx) {
  if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
  autoBalanceSubActivities(currentEditingGradingConfig.categories[catIdx]);
  renderGradingCriteriaModal();
}

function updateGradingCategoryField(catIdx, field, val) {
  if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
  if (field === 'weight') {
    currentEditingGradingConfig.categories[catIdx].weight = parseFloat(val) || 0;
    const totalWeightEl = document.getElementById('grading-criteria-total-weight');
    const indicatorEl = document.getElementById('grading-criteria-weight-indicator');
    const errorBanner = document.getElementById('grading-criteria-error-msg');
    const errorText = document.getElementById('grading-criteria-error-text');

    let tw = 0;
    currentEditingGradingConfig.categories.forEach(c => { tw += parseFloat(c.weight) || 0; });
    tw = Math.round(tw * 100) / 100;
    if (totalWeightEl) totalWeightEl.innerText = tw + '%';
    if (indicatorEl) {
      if (Math.abs(tw - 100) < 0.01) {
        indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-emerald-100 text-emerald-800';
        if (errorBanner) errorBanner.classList.add('hidden');
      } else {
        indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-rose-100 text-rose-800 border border-rose-300 animate-pulse';
        if (errorBanner && errorText) {
          const diff = Math.round(Math.abs(100 - tw) * 100) / 100;
          const diffDesc = tw < 100 ? `${diff}% short of 100%` : `${diff}% over 100%`;
          errorText.innerHTML = `Total activity percentage is currently <strong>${tw}%</strong> (${diffDesc}). All categories must sum to exactly 100%.`;
          errorBanner.classList.remove('hidden');
        }
      }
    }
  } else {
    currentEditingGradingConfig.categories[catIdx][field] = val;
  }
}

function updateGradingSubActivityField(catIdx, subIdx, field, val) {
  if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
  const sub = currentEditingGradingConfig.categories[catIdx].subActivities[subIdx];
  if (!sub) return;
  if (field === 'maxScore' || field === 'weight') {
    sub[field] = parseFloat(val) || 0;
  } else {
    sub[field] = val;
  }
}

function resetGradingCriteriaToDefault() {
  currentEditingGradingConfig = JSON.parse(JSON.stringify(DEFAULT_GRADING_CONFIG));
  renderGradingCriteriaModal();
  showToast("Reset criteria to standard template.");
}

function saveGradingCriteriaModal() {
  if (!currentEditingGradingConfig) return;

  // Validate total category weight equals exactly 100%
  let totalWeight = 0;
  currentEditingGradingConfig.categories.forEach(c => {
    totalWeight += parseFloat(c.weight) || 0;
  });
  totalWeight = Math.round(totalWeight * 100) / 100;

  if (Math.abs(totalWeight - 100) > 0.01) {
    const diff = Math.round(Math.abs(100 - totalWeight) * 100) / 100;
    const diffDesc = totalWeight < 100 ? `short of 100% by ${diff}%` : `exceeds 100% by ${diff}%`;
    const errorBanner = document.getElementById('grading-criteria-error-msg');
    const errorText = document.getElementById('grading-criteria-error-text');
    if (errorBanner && errorText) {
      errorText.innerHTML = `<strong>Cannot Save:</strong> Total percentage of activities is <strong>${totalWeight}%</strong> (${diffDesc}). All categories must add up to exactly 100%.`;
      errorBanner.classList.remove('hidden');
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    showToast(`⚠️ Error: Total activity percentage is ${totalWeight}% (${diffDesc}). It must add up to exactly 100%!`, '⚠️');
    return;
  }

  const scopeVal = document.getElementById('grading-criteria-scope')?.value || '';
  if (!courseData.gradingConfigs) courseData.gradingConfigs = {};

  if (scopeVal.startsWith('course__')) {
    const courseCode = scopeVal.replace('course__', '');
    courseData.gradingConfigs[courseCode] = JSON.parse(JSON.stringify(currentEditingGradingConfig));
    // Clear any specific section overrides of this course so all follow course
    Object.keys(courseData.gradingConfigs).forEach(key => {
      if (key.startsWith(courseCode + ' - ')) {
        delete courseData.gradingConfigs[key];
      }
    });
    // Ensure all students in this course have default scores (0 for new sub-activities) initialized
    if (Array.isArray(studentRoster)) {
      studentRoster.filter(s => s.section && s.section.startsWith(courseCode + ' - ')).forEach(s => {
        ensureStudentScores(s, currentEditingGradingConfig);
      });
    }
    showToast(`Grading criteria applied to all sections of ${courseCode}!`);
  } else {
    const sectionKey = scopeVal.replace('section__', '');
    courseData.gradingConfigs[sectionKey] = JSON.parse(JSON.stringify(currentEditingGradingConfig));
    // Ensure all students in this section have default scores (0 for new sub-activities) initialized
    if (Array.isArray(studentRoster)) {
      studentRoster.filter(s => s.section === sectionKey).forEach(s => {
        ensureStudentScores(s, currentEditingGradingConfig);
      });
    }
    showToast(`Grading criteria saved for section ${sectionKey}!`);
  }

  saveAppState();
  closeGradingCriteriaModal();
  renderGradebook();
}
