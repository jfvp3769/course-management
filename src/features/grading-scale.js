/* ===========================================================================
 * GRADING SCALE EDITOR
 * ---------------------------------------------------------------------------
 * Per-subject, per-section or default numeric-grade threshold configuration.
 * ======================================================================== */

function parseGradingScaleScope(scope) {
  if (!scope || scope === '__default__') {
    return { type: 'default', key: '__default__' };
  }
  if (scope.startsWith('subject:')) {
    return { type: 'subject', key: scope.replace(/^subject:/, '').trim() };
  }
  const secKey = scope.startsWith('section:') ? scope.replace(/^section:/, '').trim() : scope.trim();
  return { type: 'section', key: secKey };
}

function openGradingScaleModal() {
  const secSelect = document.getElementById('gradebook-section-select');
  const selectedSec = secSelect ? secSelect.value : '';

  const subjects = (courseData.subjects || []).map(s => s.code);
  const allSections = [];
  (courseData.subjects || []).forEach(sub => {
    (sub.sections || []).forEach(sec => allSections.push(sub.code + ' - ' + sec));
  });

  const scopeSelect = document.getElementById('grading-scale-scope-select');
  if (scopeSelect) {
    scopeSelect.innerHTML = `
      <option value="__default__">Default Institutional Scale (All Subjects & Sections)</option>
      ${subjects.length > 0 ? `
        <optgroup label="Subjects (Applies to all sections in subject)">
          ${subjects.map(c => `<option value="subject:${escapeHtml(c)}">Subject: ${escapeHtml(c)}</option>`).join('')}
        </optgroup>
      ` : ''}
      ${allSections.length > 0 ? `
        <optgroup label="Specific Sections (Overrides subject & default)">
          ${allSections.map(s => `<option value="section:${escapeHtml(s)}">Section: ${escapeHtml(s)}</option>`).join('')}
        </optgroup>
      ` : ''}
    `;

    if (selectedSec && allSections.includes(selectedSec)) {
      scopeSelect.value = `section:${selectedSec}`;
    } else {
      scopeSelect.value = '__default__';
    }
  }

  onGradingScaleScopeChange();
  const modal = document.getElementById('grading-scale-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeGradingScaleModal() {
  const modal = document.getElementById('grading-scale-modal');
  if (modal) modal.classList.add('hidden');
}

function onGradingScaleScopeChange() {
  const scopeSelect = document.getElementById('grading-scale-scope-select');
  const rawScope = scopeSelect ? scopeSelect.value : '__default__';
  currentEditingScaleScope = rawScope;

  const scopeInfo = parseGradingScaleScope(rawScope);

  const toggleContainer = document.getElementById('grading-scale-section-toggle-container');
  const hintEl = document.getElementById('grading-scale-scope-hint');
  const errorEl = document.getElementById('grading-scale-error-msg');
  const radioDefault = document.getElementById('grading-scale-mode-default');
  const radioCustom = document.getElementById('grading-scale-mode-custom');
  const labelDefault = document.getElementById('grading-scale-mode-default-label');
  const labelCustom = document.getElementById('grading-scale-mode-custom-label');
  const resetBtn = document.getElementById('grading-scale-reset-section-btn');

  if (errorEl) errorEl.classList.add('hidden');

  if (scopeInfo.type === 'default') {
    if (toggleContainer) toggleContainer.classList.add('hidden');
    if (hintEl) hintEl.innerText = 'Configuring global default grading scale. Subjects and sections without custom scales automatically inherit these thresholds.';
    currentEditingScaleMode = 'custom';
    const { scale } = getActiveGradingScale('');
    currentEditingScaleData = JSON.parse(JSON.stringify(scale));
  } else if (scopeInfo.type === 'subject') {
    if (toggleContainer) toggleContainer.classList.remove('hidden');
    const hasCustom = !!(courseData.gradingScales && courseData.gradingScales.subjects && courseData.gradingScales.subjects[scopeInfo.key]);
    currentEditingScaleMode = hasCustom ? 'custom' : 'default';

    if (radioDefault) radioDefault.checked = !hasCustom;
    if (radioCustom) radioCustom.checked = hasCustom;
    if (labelDefault) labelDefault.innerText = 'Use Default Grading Scale';
    if (labelCustom) labelCustom.innerText = `Customize for Subject "${scopeInfo.key}"`;
    if (resetBtn) resetBtn.innerText = '↺ Sync with Default';

    if (hasCustom) {
      if (hintEl) hintEl.innerText = `Subject "${scopeInfo.key}" is currently using a custom scale applied to all sections under it. Click "Sync with Default" to revert.`;
      currentEditingScaleData = JSON.parse(JSON.stringify(courseData.gradingScales.subjects[scopeInfo.key]));
    } else {
      if (hintEl) hintEl.innerText = `Subject "${scopeInfo.key}" currently inherits the default grading scale. Select "Customize for Subject" to set subject-wide thresholds.`;
      const { scale } = getActiveGradingScale('');
      currentEditingScaleData = JSON.parse(JSON.stringify(scale));
    }
  } else {
    // Section scope
    if (toggleContainer) toggleContainer.classList.remove('hidden');
    const hasCustom = !!(courseData.gradingScales && courseData.gradingScales.sections && courseData.gradingScales.sections[scopeInfo.key]);
    currentEditingScaleMode = hasCustom ? 'custom' : 'default';

    const subCode = scopeInfo.key.includes(' - ') ? scopeInfo.key.split(' - ')[0].trim() : scopeInfo.key.trim();
    const subjectHasCustom = !!(courseData.gradingScales && courseData.gradingScales.subjects && courseData.gradingScales.subjects[subCode]);

    if (radioDefault) radioDefault.checked = !hasCustom;
    if (radioCustom) radioCustom.checked = hasCustom;
    if (labelDefault) labelDefault.innerText = subjectHasCustom ? `Inherit Subject Scale (${subCode})` : 'Use Default Grading Scale';
    if (labelCustom) labelCustom.innerText = 'Customize for this Section';
    if (resetBtn) resetBtn.innerText = subjectHasCustom ? `↺ Sync with Subject (${subCode})` : '↺ Sync with Default';

    if (hasCustom) {
      if (hintEl) hintEl.innerText = `Section "${scopeInfo.key}" is currently using a custom grading scale. Click "${subjectHasCustom ? `Sync with Subject (${subCode})` : 'Sync with Default'}" to revert.`;
      currentEditingScaleData = JSON.parse(JSON.stringify(courseData.gradingScales.sections[scopeInfo.key]));
    } else {
      if (hintEl) {
        hintEl.innerText = subjectHasCustom
          ? `Section "${scopeInfo.key}" currently inherits the custom Subject Scale for "${subCode}". Select "Customize for this Section" to override.`
          : `Section "${scopeInfo.key}" currently inherits the default grading scale. Select "Customize for this Section" to create section-specific thresholds.`;
      }
      // Load parent scale (subject scale if present, otherwise default scale)
      const { scale } = getActiveGradingScale(scopeInfo.key);
      currentEditingScaleData = JSON.parse(JSON.stringify(scale));
    }
  }

  renderGradingScaleInputs();
}

function onGradingScaleModeChange(mode) {
  currentEditingScaleMode = mode;
  const scopeInfo = parseGradingScaleScope(currentEditingScaleScope);
  const hintEl = document.getElementById('grading-scale-scope-hint');

  if (mode === 'default') {
    if (scopeInfo.type === 'subject') {
      const { scale } = getActiveGradingScale('');
      currentEditingScaleData = JSON.parse(JSON.stringify(scale));
      if (hintEl) hintEl.innerText = `Subject "${scopeInfo.key}" will inherit the default grading scale.`;
    } else {
      const subCode = scopeInfo.key.includes(' - ') ? scopeInfo.key.split(' - ')[0].trim() : scopeInfo.key.trim();
      const subjectHasCustom = !!(courseData.gradingScales && courseData.gradingScales.subjects && courseData.gradingScales.subjects[subCode]);
      if (subjectHasCustom) {
        currentEditingScaleData = JSON.parse(JSON.stringify(courseData.gradingScales.subjects[subCode]));
        if (hintEl) hintEl.innerText = `Section "${scopeInfo.key}" will inherit the Subject Scale (${subCode}).`;
      } else {
        const { scale } = getActiveGradingScale('');
        currentEditingScaleData = JSON.parse(JSON.stringify(scale));
        if (hintEl) hintEl.innerText = `Section "${scopeInfo.key}" will inherit the default grading scale.`;
      }
    }
  } else {
    if (scopeInfo.type === 'subject') {
      if (hintEl) hintEl.innerText = `Custom scale enabled for Subject "${scopeInfo.key}". Modify threshold values below.`;
    } else {
      if (hintEl) hintEl.innerText = `Custom scale enabled for Section "${scopeInfo.key}". Modify threshold values below.`;
    }
  }
  renderGradingScaleInputs();
}

function resetSectionScaleToDefault() {
  const scopeInfo = parseGradingScaleScope(currentEditingScaleScope);
  if (scopeInfo.type === 'default') return;

  currentEditingScaleMode = 'default';
  const radioDefault = document.getElementById('grading-scale-mode-default');
  if (radioDefault) radioDefault.checked = true;

  if (scopeInfo.type === 'subject') {
    const { scale } = getActiveGradingScale('');
    currentEditingScaleData = deepClone(scale);
    showToast(`Reset Subject "${scopeInfo.key}" to default scale.`);
  } else {
    const subCode = scopeInfo.key.includes(' - ') ? scopeInfo.key.split(' - ')[0].trim() : scopeInfo.key.trim();
    const subjectHasCustom = !!(courseData.gradingScales && courseData.gradingScales.subjects && courseData.gradingScales.subjects[subCode]);
    if (subjectHasCustom) {
      currentEditingScaleData = deepClone(courseData.gradingScales.subjects[subCode]);
      showToast(`Reset "${scopeInfo.key}" to Subject (${subCode}) scale.`);
    } else {
      const { scale } = getActiveGradingScale('');
      currentEditingScaleData = deepClone(scale);
      showToast(`Reset "${scopeInfo.key}" to default scale.`);
    }
  }
  renderGradingScaleInputs();
}

function restoreDefaultGradingScale() {
  currentEditingScaleData = deepClone(DEFAULT_GRADING_SCALE || DEFAULT_MSU_SCALE);
  renderGradingScaleInputs();
  showToast("Reset to default institutional grading scale (95.56% - 60.00%).");
}
// Backward-compatibility alias. This MUST be a window property: a top-level
// `const` creates a global *lexical* binding, never a property of `window`, and
// index.html:2246 has data-action="restoreOfficialMsuScale". dispatchAction()
// (src/core/events.js) consults the ActionRegistry and then window[action], so
// the "Reset to Default Scale" button silently did nothing but console.warn.
window.restoreOfficialMsuScale = restoreDefaultGradingScale;

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

  const scopeInfo = parseGradingScaleScope(currentEditingScaleScope);

  // Monotonic validation: ensure thresholds are valid numbers and strictly descending
  if (scopeInfo.type === 'default' || currentEditingScaleMode === 'custom') {
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
    courseData.gradingScales = { default: JSON.parse(JSON.stringify(DEFAULT_GRADING_SCALE || DEFAULT_MSU_SCALE)), subjects: {}, sections: {} };
  }
  if (!courseData.gradingScales.subjects) courseData.gradingScales.subjects = {};
  if (!courseData.gradingScales.sections) courseData.gradingScales.sections = {};

  if (scopeInfo.type === 'default') {
    courseData.gradingScales.default = JSON.parse(JSON.stringify(currentEditingScaleData));
    showToast("Default grading scale saved!");
  } else if (scopeInfo.type === 'subject') {
    if (currentEditingScaleMode === 'default') {
      delete courseData.gradingScales.subjects[scopeInfo.key];
      showToast(`Subject "${scopeInfo.key}" set to use default scale.`);
    } else {
      courseData.gradingScales.subjects[scopeInfo.key] = JSON.parse(JSON.stringify(currentEditingScaleData));
      showToast(`Custom grading scale saved for Subject "${scopeInfo.key}"!`);
    }
  } else {
    // Section scope
    if (currentEditingScaleMode === 'default') {
      delete courseData.gradingScales.sections[scopeInfo.key];
      showToast(`Section "${scopeInfo.key}" set to inherit scale.`);
    } else {
      courseData.gradingScales.sections[scopeInfo.key] = JSON.parse(JSON.stringify(currentEditingScaleData));
      showToast(`Custom grading scale saved for "${scopeInfo.key}"!`);
    }
  }

  saveAppState();
  closeGradingScaleModal();
  renderGradebook();
}
