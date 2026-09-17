/* ===========================================================================
 * COURSE COLOUR PICKER
 * ---------------------------------------------------------------------------
 * Swatch grid and live preview for subject colour themes.
 * ======================================================================== */

function renderColorSwatches(mode) {
  const container = document.getElementById(mode + '-course-color-swatches');
  const select = document.getElementById(mode + '-course-color');
  const label = document.getElementById(mode + '-course-color-label');
  if (!container || !select) return;

  const activeTheme = select.value || 'blue';
  if (label && PALETTE_META[activeTheme]) {
    label.innerText = PALETTE_META[activeTheme].name + ' (' + PALETTE_META[activeTheme].hex + ')';
  }

  container.innerHTML = Object.keys(PALETTE_META).map(k => {
    const meta = PALETTE_META[k];
    const isActive = (k === activeTheme);
    return `
          <button type="button" onclick="selectColorTheme('${jsAttr(mode)}', '${jsAttr(k)}')" 
            class="color-swatch-btn w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center cursor-pointer ${isActive ? 'color-swatch-active' : 'opacity-85 hover:opacity-100'}" 
            style="background-color: ${meta.hex};" 
            title="${meta.name} Palette">
            ${isActive ? '<span class="text-white text-[11px] font-black leading-none drop-shadow">✓</span>' : ''}
          </button>
        `;
  }).join('');

  updateColorPreview(mode);
}

function selectColorTheme(mode, themeKey) {
  const select = document.getElementById(mode + '-course-color');
  if (!select) return;
  select.value = themeKey;
  renderColorSwatches(mode);
}

function onColorThemeSelectChange(mode) {
  renderColorSwatches(mode);
}

function updateColorPreview(mode) {
  const preview = document.getElementById(mode + '-course-color-preview');
  const select = document.getElementById(mode + '-course-color');
  if (!preview || !select) return;

  const codeInput = document.getElementById(mode + '-course-code');
  const titleInput = document.getElementById(mode + '-course-title');
  const code = (codeInput && codeInput.value.trim()) ? codeInput.value.trim().toUpperCase() : (mode === 'new' ? 'CVE120' : 'COURSE');
  const title = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : (mode === 'new' ? 'Sample Course Title' : 'Subject Description');

  const theme = select.value || 'blue';
  const pal = COLOR_PALETTES[theme] || COLOR_PALETTES.blue;
  const meta = PALETTE_META[theme] || PALETTE_META.blue;

  preview.className = 'p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ' + pal.color;
  preview.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-xs tracking-tight">${escapeHtml(code)}</span>
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${pal.badgeBg}">3 Units</span>
          </div>
          <div class="text-[11px] font-medium opacity-90 truncate max-w-[220px] sm:max-w-xs mt-0.5">${escapeHtml(title)}</div>
        </div>
        <div class="text-right shrink-0">
          <span class="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${pal.badgeBg}">
            <span class="w-2 h-2 rounded-full" style="background-color: ${meta.hex}"></span>
            ${pal.name}
          </span>
        </div>
      `;
}

function initColorPickerListeners() {
  ['new', 'edit'].forEach(mode => {
    const codeInput = document.getElementById(mode + '-course-code');
    const titleInput = document.getElementById(mode + '-course-title');
    if (codeInput) codeInput.addEventListener('input', () => updateColorPreview(mode));
    if (titleInput) titleInput.addEventListener('input', () => updateColorPreview(mode));
  });
}
