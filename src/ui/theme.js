/* ===========================================================================
 * DARK MODE
 * ---------------------------------------------------------------------------
 * Reads and writes the theme preference and toggles the root class.
 * ======================================================================== */

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
  if (theme === 'dark') {
    document.documentElement.classList.add('theme-dark', 'dark');
    localStorage.setItem('faculty_dark_mode', 'dark');
    if (label) label.innerText = 'Light Mode';
    if (icon) icon.innerHTML = sunSvg;
    if (showNotice) showToast('Switched to Dark Mode theme!');
  } else {
    document.documentElement.classList.remove('theme-dark', 'dark');
    localStorage.setItem('faculty_dark_mode', 'light');
    if (label) label.innerText = 'Dark Mode';
    if (icon) icon.innerHTML = moonSvg;
    if (showNotice) showToast('Switched to Light Mode.');
  }
}
