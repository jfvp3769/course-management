/* ===========================================================================
 * THEME & PALETTE MANAGER
 * ---------------------------------------------------------------------------
 * Dark mode toggling, main header color themes, and workspace window
 * background palette customization with instant live previews and persistence.
 * ======================================================================== */

const HEADER_PALETTES = {
  maroon: {
    id: 'maroon',
    name: 'Heritage Maroon & Gold',
    gradient: 'linear-gradient(to right, #4a0000, #800000, #0f172a)',
    accent: '#daa520',
    tabText: '#fde047',
    navBorder: 'rgba(155, 17, 30, 0.6)',
    primaryColor: '#800000',
    swatch: '#800000'
  },
  navy: {
    id: 'navy',
    name: 'Academic Navy & Gold',
    gradient: 'linear-gradient(to right, #0a192f, #1e3a8a, #0f172a)',
    accent: '#f59e0b',
    tabText: '#fcd34d',
    navBorder: 'rgba(30, 58, 138, 0.6)',
    primaryColor: '#1e3a8a',
    swatch: '#1e3a8a'
  },
  sapphire: {
    id: 'sapphire',
    name: 'Ocean Sapphire & Sky',
    gradient: 'linear-gradient(to right, #0c2340, #0284c7, #0f172a)',
    accent: '#38bdf8',
    tabText: '#7dd3fc',
    navBorder: 'rgba(2, 132, 199, 0.6)',
    primaryColor: '#0284c7',
    swatch: '#0284c7'
  },
  emerald: {
    id: 'emerald',
    name: 'Forest Emerald & Mint',
    gradient: 'linear-gradient(to right, #022c22, #047857, #064e3b)',
    accent: '#34d399',
    tabText: '#6ee7b7',
    navBorder: 'rgba(4, 120, 87, 0.6)',
    primaryColor: '#047857',
    swatch: '#047857'
  },
  purple: {
    id: 'purple',
    name: 'Royal Violet & Lavender',
    gradient: 'linear-gradient(to right, #2e1065, #6d28d9, #1e1b4b)',
    accent: '#c084fc',
    tabText: '#d8b4fe',
    navBorder: 'rgba(109, 40, 217, 0.6)',
    primaryColor: '#6d28d9',
    swatch: '#6d28d9'
  },
  slate: {
    id: 'slate',
    name: 'Executive Slate & Ice',
    gradient: 'linear-gradient(to right, #020617, #1e293b, #0f172a)',
    accent: '#38bdf8',
    tabText: '#7dd3fc',
    navBorder: 'rgba(51, 65, 85, 0.6)',
    primaryColor: '#1e293b',
    swatch: '#1e293b'
  },
  bronze: {
    id: 'bronze',
    name: 'Mahogany & Amber Bronze',
    gradient: 'linear-gradient(to right, #271406, #78350f, #1c1917)',
    accent: '#fbbf24',
    tabText: '#fef08a',
    navBorder: 'rgba(120, 53, 15, 0.6)',
    primaryColor: '#78350f',
    swatch: '#78350f'
  },
  teal: {
    id: 'teal',
    name: 'Deep Teal & Seafoam',
    gradient: 'linear-gradient(to right, #042f2e, #0f766e, #0f172a)',
    accent: '#2dd4bf',
    tabText: '#5eead4',
    navBorder: 'rgba(15, 118, 110, 0.6)',
    primaryColor: '#0f766e',
    swatch: '#0f766e'
  },
  custom: {
    id: 'custom',
    name: 'Custom Header Palette',
    primaryColor: '#1e3a8a',
    accent: '#f59e0b',
    tabText: '#fcd34d',
    swatch: 'linear-gradient(135deg, #1e3a8a, #f59e0b)'
  }
};

const WINDOW_PALETTES = {
  slate: {
    id: 'slate',
    name: 'Default Cool Slate',
    light: '#e2e8f0',
    dark: '#0f172a',
    swatchLight: '#e2e8f0',
    swatchDark: '#0f172a'
  },
  studio: {
    id: 'studio',
    name: 'Studio Minimal / Ash',
    light: '#f1f5f9',
    dark: '#18181b',
    swatchLight: '#f1f5f9',
    swatchDark: '#18181b'
  },
  warm: {
    id: 'warm',
    name: 'Warm Parchment / Sand',
    light: '#faedd9',
    dark: '#251a14',
    swatchLight: '#faedd9',
    swatchDark: '#251a14'
  },
  glacier: {
    id: 'glacier',
    name: 'Glacier Mist / Arctic Blue',
    light: '#dbeafe',
    dark: '#0b1d3a',
    swatchLight: '#dbeafe',
    swatchDark: '#0b1d3a'
  },
  sage: {
    id: 'sage',
    name: 'Sage Meadow / Mint Green',
    light: '#dcfce7',
    dark: '#062319',
    swatchLight: '#dcfce7',
    swatchDark: '#062319'
  },
  lavender: {
    id: 'lavender',
    name: 'Lilac Frost / Royal Violet',
    light: '#ede9fe',
    dark: '#1e1233',
    swatchLight: '#ede9fe',
    swatchDark: '#1e1233'
  },
  custom: {
    id: 'custom',
    name: 'Custom Window Colors',
    light: '#faedd9',
    dark: '#18181b',
    swatchLight: '#faedd9',
    swatchDark: '#18181b'
  }
};

let currentActiveHeaderTheme = 'maroon';
let currentActiveWindowTheme = 'slate';
let tempHeaderTheme = 'maroon';
let tempWindowTheme = 'slate';
let customHeaderConfig = { primary: '#1e3a8a', accent: '#f59e0b' };
let customWindowConfig = { light: '#faedd9', dark: '#18181b' };

/* ---------- DARK MODE ---------- */

function initDarkModeTheme() {
  const savedTheme = localStorage.getItem('faculty_dark_mode') || localStorage.getItem('msu_dark_mode') || 'light';
  applyDarkTheme(savedTheme, false);
}

function toggleDarkModeTheme() {
  const isDark = document.documentElement.classList.contains('theme-dark');
  const nextTheme = isDark ? 'light' : 'dark';
  applyDarkTheme(nextTheme, true);
}

function applyDarkTheme(theme, showNotice = true) {
  const label = document.getElementById('theme-toggle-label');
  const icon = document.getElementById('theme-toggle-icon');
  const sunSvg = '<svg class="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
  const moonSvg = '<svg class="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
  
  const root = document.documentElement;
  const isDark = (theme === 'dark');
  if (isDark) {
    root.classList.add('theme-dark', 'dark');
    localStorage.setItem('faculty_dark_mode', 'dark');
    if (label && label.dataset.role === 'mode-toggle') label.innerText = 'Light Mode';
    if (icon && icon.dataset.role === 'mode-toggle') icon.innerHTML = sunSvg;
    if (showNotice) showToast('Switched to Dark Mode theme!');
  } else {
    root.classList.remove('theme-dark', 'dark');
    localStorage.setItem('faculty_dark_mode', 'light');
    if (label && label.dataset.role === 'mode-toggle') label.innerText = 'Dark Mode';
    if (icon && icon.dataset.role === 'mode-toggle') icon.innerHTML = moonSvg;
    if (showNotice) showToast('Switched to Light Mode.');
  }

  // Re-sync window background color on root and body
  const lightBg = root.style.getPropertyValue('--app-window-bg-light') || '#e2e8f0';
  const darkBg = root.style.getPropertyValue('--app-window-bg-dark') || '#0f172a';
  const currentBg = isDark ? darkBg : lightBg;
  root.style.setProperty('--app-window-bg', currentBg);
  document.body.style.backgroundColor = currentBg;

  if (typeof updateThemeModalModeButtons === 'function') {
    updateThemeModalModeButtons();
  }
}

/* ---------- COLOR PALETTES ---------- */

function initColorThemes() {
  const conf = semesterConfig && semesterConfig.themeConfig;
  const savedHeader = (conf && conf.headerTheme) || localStorage.getItem('faculty_header_theme') || 'maroon';
  const savedWindow = (conf && conf.windowTheme) || localStorage.getItem('faculty_window_theme') || 'slate';

  let customHeader = (conf && conf.customHeader) || null;
  if (!customHeader) {
    try {
      const stored = localStorage.getItem('faculty_header_custom');
      if (stored) customHeader = JSON.parse(stored);
    } catch (e) {}
  }
  if (customHeader) customHeaderConfig = Object.assign(customHeaderConfig, customHeader);

  let customWindow = (conf && conf.customWindow) || null;
  if (!customWindow) {
    try {
      const stored = localStorage.getItem('faculty_window_custom');
      if (stored) customWindow = JSON.parse(stored);
    } catch (e) {}
  }
  if (customWindow) customWindowConfig = Object.assign(customWindowConfig, customWindow);

  currentActiveHeaderTheme = savedHeader;
  currentActiveWindowTheme = savedWindow;
  tempHeaderTheme = savedHeader;
  tempWindowTheme = savedWindow;

  applyHeaderTheme(savedHeader, customHeaderConfig, false);
  applyWindowTheme(savedWindow, customWindowConfig, false);
}

function applyHeaderTheme(themeKey, custom = null, persist = true) {
  const palette = HEADER_PALETTES[themeKey] || HEADER_PALETTES.maroon;
  let bg = palette.gradient;
  let accent = palette.accent;
  let tabText = palette.tabText || accent;
  let navBorder = palette.navBorder || 'rgba(255, 255, 255, 0.15)';
  let primary = palette.primaryColor || '#800000';

  if (themeKey === 'custom') {
    const p = (custom && custom.primary) || customHeaderConfig.primary || '#1e3a8a';
    const a = (custom && custom.accent) || customHeaderConfig.accent || '#f59e0b';
    primary = p;
    accent = a;
    tabText = a;
    bg = `linear-gradient(135deg, ${p} 0%, #0f172a 100%)`;
    navBorder = 'rgba(255, 255, 255, 0.18)';
  }

  const root = document.documentElement;
  root.style.setProperty('--app-header-bg', bg);
  root.style.setProperty('--app-header-primary', primary);
  root.style.setProperty('--app-header-accent', accent);
  root.style.setProperty('--app-header-tab-text', tabText);
  root.style.setProperty('--app-header-nav-border', navBorder);

  // Update theme-color meta tag for browser mobile frame
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', primary);

  // Update live clock and logo ring
  const logoRing = document.getElementById('header-school-logo-ring');
  if (logoRing) logoRing.style.borderColor = accent;

  const clockEl = document.getElementById('header-live-clock');
  if (clockEl) clockEl.style.color = tabText;

  // Re-apply to all tabs (both active and inactive) with explicit inline priority
  const allTabs = document.querySelectorAll('.tab-btn');
  allTabs.forEach(btn => {
    const isSelected = btn.getAttribute('aria-selected') === 'true' || btn.classList.contains('is-active-tab');
    if (isSelected) {
      btn.style.setProperty('border-bottom-color', accent, 'important');
      btn.style.setProperty('color', tabText, 'important');
      const span = btn.querySelector('span');
      if (span) span.style.setProperty('color', tabText, 'important');
      const svg = btn.querySelector('svg');
      if (svg) svg.style.setProperty('color', tabText, 'important');
    } else {
      btn.style.removeProperty('border-bottom-color');
      btn.style.removeProperty('color');
      const span = btn.querySelector('span');
      if (span) span.style.removeProperty('color');
      const svg = btn.querySelector('svg');
      if (svg) svg.style.removeProperty('color');
    }
  });

  if (persist) {
    currentActiveHeaderTheme = themeKey;
    localStorage.setItem('faculty_header_theme', themeKey);
    if (custom) {
      localStorage.setItem('faculty_header_custom', JSON.stringify(custom));
    }
  }
}

function applyWindowTheme(themeKey, custom = null, persist = true) {
  const palette = WINDOW_PALETTES[themeKey] || WINDOW_PALETTES.slate;
  let lightColor = palette.light;
  let darkColor = palette.dark;

  if (themeKey === 'custom') {
    lightColor = (custom && custom.light) || customWindowConfig.light || '#f1f5f9';
    darkColor = (custom && custom.dark) || customWindowConfig.dark || '#0b1120';
  }

  const isDark = document.documentElement.classList.contains('theme-dark');
  const currentColor = isDark ? darkColor : lightColor;

  const root = document.documentElement;
  root.style.setProperty('--app-window-bg', currentColor);
  root.style.setProperty('--app-window-bg-light', lightColor);
  root.style.setProperty('--app-window-bg-dark', darkColor);

  document.body.style.backgroundColor = currentColor;

  if (persist) {
    currentActiveWindowTheme = themeKey;
    localStorage.setItem('faculty_window_theme', themeKey);
    if (custom) {
      localStorage.setItem('faculty_window_custom', JSON.stringify(custom));
    }
  }
}

/* ---------- SWATCH RENDERING (SETTINGS MODAL) ---------- */

function renderHeaderThemeSwatches() {
  const container = document.getElementById('setting-header-palette-swatches');
  if (!container) return;

  container.innerHTML = Object.keys(HEADER_PALETTES).map(k => {
    const pal = HEADER_PALETTES[k];
    const isActive = (k === tempHeaderTheme);
    if (k === 'custom') {
      return `
        <button type="button" data-action="selectHeaderTheme" data-theme="custom"
          class="relative p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer ${isActive ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 shadow-xs' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'}"
          title="Custom Colors">
          <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-2xs border border-white/30 text-xs" style="background: ${customHeaderConfig.primary};">
            <span class="w-2.5 h-2.5 rounded-full border border-white" style="background: ${customHeaderConfig.accent};"></span>
          </div>
          <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Custom</span>
          ${isActive ? '<span class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-black shadow-xs">✓</span>' : ''}
        </button>
      `;
    }
    return `
      <button type="button" data-action="selectHeaderTheme" data-theme="${pal.id}"
        class="relative p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer ${isActive ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 shadow-xs' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'}"
        title="${escapeHtml(pal.name)}">
        <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-2xs border border-white/30" style="background: ${pal.gradient};">
          <span class="w-2.5 h-2.5 rounded-full border border-white/60 shadow-2xs" style="background: ${pal.accent};"></span>
        </div>
        <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight truncate max-w-[65px]">${escapeHtml(pal.name.split(' ')[0])}</span>
        ${isActive ? '<span class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-black shadow-xs">✓</span>' : ''}
      </button>
    `;
  }).join('');

  const customInputs = document.getElementById('setting-header-custom-inputs');
  if (customInputs) {
    if (tempHeaderTheme === 'custom') {
      customInputs.classList.remove('hidden');
      const primaryInput = document.getElementById('setting-header-custom-primary');
      const accentInput = document.getElementById('setting-header-custom-accent');
      if (primaryInput) primaryInput.value = customHeaderConfig.primary || '#1e3a8a';
      if (accentInput) accentInput.value = customHeaderConfig.accent || '#f59e0b';
    } else {
      customInputs.classList.add('hidden');
    }
  }
}

function renderWindowThemeSwatches() {
  const container = document.getElementById('setting-window-palette-swatches');
  if (!container) return;

  container.innerHTML = Object.keys(WINDOW_PALETTES).map(k => {
    const pal = WINDOW_PALETTES[k];
    const isActive = (k === tempWindowTheme);
    if (k === 'custom') {
      return `
        <button type="button" data-action="selectWindowTheme" data-theme="custom"
          class="relative p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer ${isActive ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 shadow-xs' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'}"
          title="Custom Background">
          <div class="w-7 h-7 rounded-full overflow-hidden flex border border-slate-300 dark:border-slate-600 shadow-2xs">
            <span class="w-1/2 h-full" style="background: ${customWindowConfig.light}"></span>
            <span class="w-1/2 h-full" style="background: ${customWindowConfig.dark}"></span>
          </div>
          <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Custom</span>
          ${isActive ? '<span class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-black shadow-xs">✓</span>' : ''}
        </button>
      `;
    }
    return `
      <button type="button" data-action="selectWindowTheme" data-theme="${pal.id}"
        class="relative p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer ${isActive ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 shadow-xs' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'}"
        title="${escapeHtml(pal.name)}">
        <div class="w-7 h-7 rounded-full overflow-hidden flex border border-slate-300 dark:border-slate-600 shadow-2xs">
          <span class="w-1/2 h-full" style="background: ${pal.swatchLight};"></span>
          <span class="w-1/2 h-full" style="background: ${pal.swatchDark};"></span>
        </div>
        <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight truncate max-w-[65px]">${escapeHtml(pal.name.split(' ')[0])}</span>
        ${isActive ? '<span class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-black shadow-xs">✓</span>' : ''}
      </button>
    `;
  }).join('');

  const customInputs = document.getElementById('setting-window-custom-inputs');
  if (customInputs) {
    if (tempWindowTheme === 'custom') {
      customInputs.classList.remove('hidden');
      const lightInput = document.getElementById('setting-window-custom-light');
      const darkInput = document.getElementById('setting-window-custom-dark');
      if (lightInput) lightInput.value = customWindowConfig.light || '#f1f5f9';
      if (darkInput) darkInput.value = customWindowConfig.dark || '#0b1120';
    } else {
      customInputs.classList.add('hidden');
    }
  }
}

/* ---------- USER ACTIONS ---------- */

function selectHeaderTheme(themeKey) {
  tempHeaderTheme = themeKey;
  applyHeaderTheme(themeKey, customHeaderConfig, false);
  renderHeaderThemeSwatches();
}

function selectWindowTheme(themeKey) {
  tempWindowTheme = themeKey;
  applyWindowTheme(themeKey, customWindowConfig, false);
  renderWindowThemeSwatches();
}

function onCustomHeaderColorInput(type, val) {
  if (!customHeaderConfig) customHeaderConfig = { primary: '#1e3a8a', accent: '#f59e0b' };
  customHeaderConfig[type] = val;
  if (tempHeaderTheme === 'custom') {
    applyHeaderTheme('custom', customHeaderConfig, false);
  }
}

function onCustomWindowColorInput(type, val) {
  if (!customWindowConfig) customWindowConfig = { light: '#f1f5f9', dark: '#0b1120' };
  customWindowConfig[type] = val;
  if (tempWindowTheme === 'custom') {
    applyWindowTheme('custom', customWindowConfig, false);
  }
}

function resetThemePalettes() {
  tempHeaderTheme = 'maroon';
  tempWindowTheme = 'slate';
  customHeaderConfig = { primary: '#800000', accent: '#daa520' };
  customWindowConfig = { light: '#e2e8f0', dark: '#0f172a' };
  applyHeaderTheme('maroon', customHeaderConfig, false);
  applyWindowTheme('slate', customWindowConfig, false);
  setThemeMode('light');
  renderHeaderThemeSwatches();
  renderWindowThemeSwatches();
  showToast("Reset to default institutional theme (Maroon, Slate & Light Mode).", "ℹ️");
}

/* ---------- DEDICATED THEME MODAL ACTIONS ---------- */

let savedActiveDarkMode = 'light';

function updateThemeModalModeButtons() {
  const isDark = document.documentElement.classList.contains('theme-dark');
  const lightBtn = document.getElementById('btn-mode-light');
  const darkBtn = document.getElementById('btn-mode-dark');
  const badge = document.getElementById('theme-modal-mode-badge');

  const activeClasses = ['ring-2', 'ring-amber-500', 'border-amber-500', 'bg-amber-50', 'dark:bg-amber-950/40', 'text-amber-900', 'dark:text-amber-200', 'shadow-xs'];
  const inactiveClasses = ['border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-900', 'text-slate-600', 'dark:text-slate-400'];

  if (lightBtn) {
    if (!isDark) {
      lightBtn.classList.add(...activeClasses);
      lightBtn.classList.remove(...inactiveClasses);
    } else {
      lightBtn.classList.remove(...activeClasses);
      lightBtn.classList.add(...inactiveClasses);
    }
  }

  if (darkBtn) {
    if (isDark) {
      darkBtn.classList.add(...activeClasses);
      darkBtn.classList.remove(...inactiveClasses);
    } else {
      darkBtn.classList.remove(...activeClasses);
      darkBtn.classList.add(...inactiveClasses);
    }
  }

  if (badge) {
    badge.textContent = isDark ? '🌙 Dark Mode Active' : '☀️ Light Mode Active';
  }
}

function setThemeMode(mode) {
  applyDarkTheme(mode, false);
  updateThemeModalModeButtons();
}

function openThemeModal() {
  savedActiveDarkMode = document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  tempHeaderTheme = currentActiveHeaderTheme || 'maroon';
  tempWindowTheme = currentActiveWindowTheme || 'slate';

  renderHeaderThemeSwatches();
  renderWindowThemeSwatches();
  updateThemeModalModeButtons();

  const modal = document.getElementById('theme-settings-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeThemeModal() {
  const modal = document.getElementById('theme-settings-modal');
  if (modal) modal.classList.add('hidden');

  // Revert preview back to saved active states if cancelled
  applyHeaderTheme(currentActiveHeaderTheme, customHeaderConfig, false);
  applyWindowTheme(currentActiveWindowTheme, customWindowConfig, false);
  applyDarkTheme(savedActiveDarkMode, false);
}

function saveThemeSettings() {
  applyHeaderTheme(tempHeaderTheme, customHeaderConfig, true);
  applyWindowTheme(tempWindowTheme, customWindowConfig, true);

  const isDark = document.documentElement.classList.contains('theme-dark');
  const nextMode = isDark ? 'dark' : 'light';
  localStorage.setItem('faculty_dark_mode', nextMode);
  savedActiveDarkMode = nextMode;

  if (typeof semesterConfig !== 'undefined') {
    if (!semesterConfig.themeConfig) semesterConfig.themeConfig = {};
    semesterConfig.themeConfig.headerTheme = tempHeaderTheme;
    semesterConfig.themeConfig.windowTheme = tempWindowTheme;
    semesterConfig.themeConfig.customHeader = JSON.parse(JSON.stringify(customHeaderConfig));
    semesterConfig.themeConfig.customWindow = JSON.parse(JSON.stringify(customWindowConfig));
  }

  if (typeof saveAppState === 'function') {
    saveAppState();
  }

  const modal = document.getElementById('theme-settings-modal');
  if (modal) modal.classList.add('hidden');
  showToast("Theme and visual appearance saved successfully!", "🎨");
}

if (typeof window !== 'undefined') {
  window.openThemeModal = openThemeModal;
  window.closeThemeModal = closeThemeModal;
  window.saveThemeSettings = saveThemeSettings;
  window.setThemeMode = setThemeMode;
  window.updateThemeModalModeButtons = updateThemeModalModeButtons;
  window.selectHeaderTheme = selectHeaderTheme;
  window.selectWindowTheme = selectWindowTheme;
  window.resetThemePalettes = resetThemePalettes;
  window.onCustomHeaderColorInput = onCustomHeaderColorInput;
  window.onCustomWindowColorInput = onCustomWindowColorInput;
}
