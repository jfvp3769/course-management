/* ===========================================================================
 * GRADING SCALE EDITOR
 * ---------------------------------------------------------------------------
 * Per-section or default numeric-grade threshold configuration.
 * ======================================================================== */

function openGradingScaleModal() {
  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';

  const allSections = [];
  courseData.subjects.forEach(sub => {
    sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
  });

  const scopeSelect = document.getElementById('grading-scale-scope-select');
  if (scopeSelect) {
    scopeSelect.innerHTML = `
          <option value="__default__">Default Grading Scale (All Sections)</option>
          ${allSections.map(s => `<option value="${s}">Section: ${escapeHtml(s)}</option>`).join('')}
        `;
    if (selectedSec && allSections.includes(selectedSec)) {
      scopeSelect.value = selectedSec;
    } else {
      scopeSelect.value = '__default__';
    }
  }

  onGradingScaleScopeChange();
  document.getElementById('grading-scale-modal').classList.remove('hidden');
}

function closeGradingScaleModal() {
  document.getElementById('grading-scale-modal').classList.add('hidden');
}

function onGradingScaleScopeChange() {
  const scopeSelect = document.getElementById('grading-scale-scope-select');
  const scope = scopeSelect ? scopeSelect.value : '__default__';
  currentEditingScaleScope = scope;

  const toggleContainer = document.getElementById('grading-scale-section-toggle-container');
  const hintEl = document.getElementById('grading-scale-scope-hint');
  const errorEl = document.getElementById('grading-scale-error-msg');
  if (errorEl) errorEl.classList.add('hidden');

  if (scope === '__default__') {
    if (toggleContainer) toggleContainer.classList.add('hidden');
    if (hintEl) hintEl.innerText = 'Configuring global default grading scale. Sections without their own custom scale will automatically inherit these thresholds.';
    currentEditingScaleMode = 'custom';
    const { scale } = getActiveGradingScale('');
    currentEditingScaleData = JSON.parse(JSON.stringify(scale));
  } else {
    if (toggleContainer) toggleContainer.classList.remove('hidden');
    const hasCustom = !!(courseData.gradingScales && courseData.gradingScales.sections && courseData.gradingScales.sections[scope]);
    currentEditingScaleMode = hasCustom ? 'custom' : 'default';

    const radioDefault = document.getElementById('grading-scale-mode-default');
    const radioCustom = document.getElementById('grading-scale-mode-custom');
    if (radioDefault) radioDefault.checked = !hasCustom;
    if (radioCustom) radioCustom.checked = hasCustom;

    if (hasCustom) {
      if (hintEl) hintEl.innerText = `Section "${scope}" is currently using a custom grading scale. Click "Sync with Default" to revert.`;
      currentEditingScaleData = JSON.parse(JSON.stringify(courseData.gradingScales.sections[scope]));
    } else {
      if (hintEl) hintEl.innerText = `Section "${scope}" is currently inheriting the default grading scale. Select "Customize for this Section" to create specific thresholds.`;
      const { scale } = getActiveGradingScale('');
      currentEditingScaleData = JSON.parse(JSON.stringify(scale));
    }
  }

  renderGradingScaleInputs();
}

function onGradingScaleModeChange(mode) {
  currentEditingScaleMode = mode;
  const hintEl = document.getElementById('grading-scale-scope-hint');
  if (mode === 'default') {
    const { scale } = getActiveGradingScale('');
    currentEditingScaleData = JSON.parse(JSON.stringify(scale));
    if (hintEl) hintEl.innerText = `Section "${currentEditingScaleScope}" will inherit the default grading scale.`;
  } else {
    if (hintEl) hintEl.innerText = `Custom scale enabled for section "${currentEditingScaleScope}". Modify threshold values below.`;
  }
  renderGradingScaleInputs();
}

function resetSectionScaleToDefault() {
  if (currentEditingScaleScope === '__default__') return;
  currentEditingScaleMode = 'default';
  const radioDefault = document.getElementById('grading-scale-mode-default');
  if (radioDefault) radioDefault.checked = true;
  const { scale } = getActiveGradingScale('');
  currentEditingScaleData = deepClone(scale);
  renderGradingScaleInputs();
  showToast(`Reset ${currentEditingScaleScope} to default scale.`);
}

function restoreOfficialMsuScale() {
  currentEditingScaleData = deepClone(DEFAULT_MSU_SCALE);
  renderGradingScaleInputs();
  showToast("Reset to default grading scale (95.56% - 60.00%).");
}

function updateGradingScaleItemMin(grade, val) {
  const item = currentEditingScaleData.find(i => i.grade === grade);
  if (item) {
    item.min = parseFloat(val) || 0;
    const errorEl = document.getElementById('grading-scale-error-msg');
    if (errorEl) errorEl.classList.add('hidden');
  }
}

function renderGradingScaleInputs() {
  const container = document.getElementById('grading-scale-inputs-container');
  if (!container) return;
  const isReadOnly = (currentEditingScaleScope !== '__default__' && currentEditingScaleMode === 'default');

  container.innerHTML = currentEditingScaleData.filter(item => item.grade !== '5.00').map(item => {
    return `
          <div class="p-2.5 rounded-xl border ${item.grade === 'INC' ? 'border-orange-200 dark:border-orange-900/60 bg-orange-50/40 dark:bg-orange-950/40' : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60'} space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-black text-sm ${item.grade === 'INC' ? 'text-orange-700 dark:text-orange-400' : (parseFloat(item.grade) <= 1.75 ? 'text-emerald-700 dark:text-emerald-400' : (parseFloat(item.grade) <= 2.50 ? 'text-blue-700 dark:text-blue-400' : 'text-amber-700 dark:text-amber-400'))}">${item.grade}</span>
              <span class="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-medium">${escapeHtml(item.desc || item.status || '')}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500">Min:</span>
              <input type="number" min="0" max="100" step="any" ${isReadOnly ? 'disabled' : ''} value="${item.min}" data-action-input="updateGradingScaleItemMin" data-grade="${escapeHtml(item.grade)}" class="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 ${isReadOnly ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'focus:ring-2 focus:ring-amber-500'}">
              <span class="text-xs font-bold text-slate-500 dark:text-slate-400">%</span>
            </div>
          </div>
        `;
  }).join('') + `
        <div class="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-black text-sm text-rose-700 dark:text-rose-400">5.00</span>
            <span class="text-[10px] text-rose-600 dark:text-rose-400 font-sans font-medium">Failed</span>
          </div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 font-sans pt-1">
            Automatic for all scores below INC
          </div>
        </div>
      `;
}

function saveGradingScaleModal() {
  const errorEl = document.getElementById('grading-scale-error-msg');
  if (errorEl) errorEl.classList.add('hidden');

  // Monotonic validation: ensure thresholds are valid numbers and strictly descending
  if (currentEditingScaleScope === '__default__' || currentEditingScaleMode === 'custom') {
    // 1. Check all entries are numbers in 0-100 range
    for (let i = 0; i < currentEditingScaleData.length; i++) {
      const item = currentEditingScaleData[i];
      if (item.grade === '5.00') continue; // 5.00 is always 0.00
      if (typeof item.min !== 'number' || isNaN(item.min) || item.min < 0 || item.min > 100) {
        if (errorEl) {
          errorEl.innerText = `Invalid percentage for grade ${item.grade}: must be a number between 0 and 100.`;
          errorEl.classList.remove('hidden');
        }
        showToast(`Invalid threshold for grade ${item.grade}.`, '⚠️');
        return;
      }
    }

    // 2. Check monotonic descending order (1.00 > 1.25 > 1.50 > ... > 3.00 > INC > 0)
    for (let i = 0; i < currentEditingScaleData.length - 1; i++) {
      const higher = currentEditingScaleData[i];
      const lower = currentEditingScaleData[i + 1];
      if (lower.grade === '5.00') {
        if (higher.min <= 0) {
          if (errorEl) {
            errorEl.innerText = `Threshold for ${higher.grade} (${higher.min}%) must be strictly greater than 0%.`;
            errorEl.classList.remove('hidden');
          }
          showToast(`Threshold for ${higher.grade} must be > 0%.`, '⚠️');
          return;
        }
      } else if (higher.min <= lower.min) {
        if (errorEl) {
          errorEl.innerText = `Inconsistent grading scale: threshold for ${higher.grade} (${higher.min}%) must be strictly higher than ${lower.grade} (${lower.min}%).`;
          errorEl.classList.remove('hidden');
        }
        showToast(`Scale error: ${higher.grade} must be higher than ${lower.grade}.`, '⚠️');
        return;
      }
    }
  }

  if (!courseData.gradingScales) {
    courseData.gradingScales = { default: JSON.parse(JSON.stringify(DEFAULT_MSU_SCALE)), sections: {} };
  }

  if (currentEditingScaleScope === '__default__') {
    courseData.gradingScales.default = JSON.parse(JSON.stringify(currentEditingScaleData));
    showToast("Default grading scale saved!");
  } else {
    if (currentEditingScaleMode === 'default') {
      if (courseData.gradingScales.sections) {
        delete courseData.gradingScales.sections[currentEditingScaleScope];
      }
      showToast(`Section ${currentEditingScaleScope} set to use default scale.`);
    } else {
      if (!courseData.gradingScales.sections) courseData.gradingScales.sections = {};
      courseData.gradingScales.sections[currentEditingScaleScope] = JSON.parse(JSON.stringify(currentEditingScaleData));
      showToast(`Custom grading scale saved for ${currentEditingScaleScope}!`);
    }
  }

  saveAppState();
  closeGradingScaleModal();
  renderGradebook();
}
