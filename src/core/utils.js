/* ===========================================================================
 * SHARED UTILITIES
 * ---------------------------------------------------------------------------
 * Escaping, cloning, time formatting and the toast notifier. Everything here
 * is pure or DOM-trivial and safe to call from any module.
 * ======================================================================== */

// Expose tips globally and update tip display logic
window.PORTAL_TIPS = PORTAL_TIPS;

function getNextRandomTip(currentIndex = -1) {
  let nextIdx;
  do {
nextIdx = Math.floor(Math.random() * PORTAL_TIPS.length);
  } while (PORTAL_TIPS.length > 1 && nextIdx === currentIndex);
  return { ...PORTAL_TIPS[nextIdx], index: nextIdx };
}

const SECTION_PALETTE_ITEMS = [
  { key: 'amber',   border: 'border-t-4 border-t-amber-400 dark:border-t-amber-300',   accent: 'border-l-4 border-l-amber-400 dark:border-l-amber-300',   badge: 'border-amber-500 text-amber-900 bg-amber-100/90 dark:border-amber-400 dark:text-amber-100 dark:bg-amber-950/80' },
  { key: 'blue',    border: 'border-t-4 border-t-blue-400 dark:border-t-blue-300',       accent: 'border-l-4 border-l-blue-400 dark:border-l-blue-300',       badge: 'border-blue-500 text-blue-900 bg-blue-100/90 dark:border-blue-400 dark:text-blue-100 dark:bg-blue-950/80' },
  { key: 'emerald', border: 'border-t-4 border-t-emerald-400 dark:border-t-emerald-300', accent: 'border-l-4 border-l-emerald-400 dark:border-l-emerald-300', badge: 'border-emerald-500 text-emerald-900 bg-emerald-100/90 dark:border-emerald-400 dark:text-emerald-100 dark:bg-emerald-950/80' },
  { key: 'fuchsia', border: 'border-t-4 border-t-fuchsia-400 dark:border-t-fuchsia-300', accent: 'border-l-4 border-l-fuchsia-400 dark:border-l-fuchsia-300', badge: 'border-fuchsia-500 text-fuchsia-900 bg-fuchsia-100/90 dark:border-fuchsia-400 dark:text-fuchsia-100 dark:bg-fuchsia-950/80' },
  { key: 'cyan',    border: 'border-t-4 border-t-cyan-400 dark:border-t-cyan-300',       accent: 'border-l-4 border-l-cyan-400 dark:border-l-cyan-300',       badge: 'border-cyan-500 text-cyan-900 bg-cyan-100/90 dark:border-cyan-400 dark:text-cyan-100 dark:bg-cyan-950/80' },
  { key: 'rose',    border: 'border-t-4 border-t-rose-400 dark:border-t-rose-300',       accent: 'border-l-4 border-l-rose-400 dark:border-l-rose-300',       badge: 'border-rose-500 text-rose-900 bg-rose-100/90 dark:border-rose-400 dark:text-rose-100 dark:bg-rose-950/80' },
  { key: 'orange',  border: 'border-t-4 border-t-orange-400 dark:border-t-orange-300',   accent: 'border-l-4 border-l-orange-400 dark:border-l-orange-300',   badge: 'border-orange-500 text-orange-900 bg-orange-100/90 dark:border-orange-400 dark:text-orange-100 dark:bg-orange-950/80' },
  { key: 'purple',  border: 'border-t-4 border-t-purple-400 dark:border-t-purple-300',   accent: 'border-l-4 border-l-purple-400 dark:border-l-purple-300',   badge: 'border-purple-500 text-purple-900 bg-purple-100/90 dark:border-purple-400 dark:text-purple-100 dark:bg-purple-950/80' },
  { key: 'teal',    border: 'border-t-4 border-t-teal-400 dark:border-t-teal-300',       accent: 'border-l-4 border-l-teal-400 dark:border-l-teal-300',       badge: 'border-teal-500 text-teal-900 bg-teal-100/90 dark:border-teal-400 dark:text-teal-100 dark:bg-teal-950/80' },
  { key: 'lime',    border: 'border-t-4 border-t-lime-400 dark:border-t-lime-300',       accent: 'border-l-4 border-l-lime-400 dark:border-l-lime-300',       badge: 'border-lime-500 text-lime-900 bg-lime-100/90 dark:border-lime-400 dark:text-lime-100 dark:bg-lime-950/80' },
  { key: 'sky',     border: 'border-t-4 border-t-sky-400 dark:border-t-sky-300',         accent: 'border-l-4 border-l-sky-400 dark:border-l-sky-300',         badge: 'border-sky-500 text-sky-900 bg-sky-100/90 dark:border-sky-400 dark:text-sky-100 dark:bg-sky-950/80' },
  { key: 'pink',    border: 'border-t-4 border-t-pink-400 dark:border-t-pink-300',       accent: 'border-l-4 border-l-pink-400 dark:border-l-pink-300',       badge: 'border-pink-500 text-pink-900 bg-pink-100/90 dark:border-pink-400 dark:text-pink-100 dark:bg-pink-950/80' },
  { key: 'indigo',  border: 'border-t-4 border-t-indigo-400 dark:border-t-indigo-300',   accent: 'border-l-4 border-l-indigo-400 dark:border-l-indigo-300',   badge: 'border-indigo-500 text-indigo-900 bg-indigo-100/90 dark:border-indigo-400 dark:text-indigo-100 dark:bg-indigo-950/80' }
];

function _getFilteredSectionPalettes(subTheme) {
  const normTheme = String(subTheme || '').trim().toLowerCase();
  if (!normTheme) return SECTION_PALETTE_ITEMS;
  const conflicts = {
    blue: ['blue', 'sky', 'indigo'],
    sky: ['sky', 'blue', 'cyan'],
    indigo: ['indigo', 'blue', 'purple'],
    emerald: ['emerald', 'teal', 'lime'],
    teal: ['teal', 'emerald', 'cyan'],
    lime: ['lime', 'emerald'],
    amber: ['amber', 'orange', 'yellow'],
    orange: ['orange', 'amber', 'red'],
    purple: ['purple', 'fuchsia', 'indigo'],
    fuchsia: ['fuchsia', 'purple', 'pink'],
    rose: ['rose', 'pink', 'red', 'maroon'],
    red: ['red', 'rose', 'maroon', 'orange'],
    maroon: ['maroon', 'rose', 'red']
  };
  const toSkip = conflicts[normTheme] || [normTheme];
  const filtered = SECTION_PALETTE_ITEMS.filter(item => !toSkip.includes(item.key));
  return filtered.length > 0 ? filtered : SECTION_PALETTE_ITEMS;
}

function getSectionAccent(secIndex, subTheme = '') {
  const palettes = _getFilteredSectionPalettes(subTheme);
  const idx = Math.max(0, parseInt(secIndex, 10) || 0);
  return palettes[idx % palettes.length].accent;
}

function getSectionBadgeStyle(secIndex, subTheme = '') {
  const palettes = _getFilteredSectionPalettes(subTheme);
  const idx = Math.max(0, parseInt(secIndex, 10) || 0);
  return palettes[idx % palettes.length].badge;
}

function getSectionTopBorder(secIndex, subTheme = '') {
  const palettes = _getFilteredSectionPalettes(subTheme);
  const idx = Math.max(0, parseInt(secIndex, 10) || 0);
  return palettes[idx % palettes.length].border;
}

function getSectionPalette(sub, secIdx = 0) {
  const paletteKeys = ['blue', 'amber', 'emerald', 'purple', 'rose', 'cyan', 'indigo', 'teal', 'orange', 'slate', 'lime', 'sky', 'pink', 'fuchsia', 'red', 'maroon'];
  const baseTheme = (sub && sub.colorTheme ? sub.colorTheme.toLowerCase() : 'blue');
  if (secIdx === 0) {
    return (typeof COLOR_PALETTES !== 'undefined' && COLOR_PALETTES[baseTheme]) ? COLOR_PALETTES[baseTheme] : (typeof COLOR_PALETTES !== 'undefined' ? COLOR_PALETTES.blue : { badgeBg: sub?.badgeBg || '' });
  }
  const otherKeys = paletteKeys.filter(k => k !== baseTheme);
  const pickedKey = otherKeys[(secIdx - 1) % otherKeys.length];
  return (typeof COLOR_PALETTES !== 'undefined' && COLOR_PALETTES[pickedKey]) ? COLOR_PALETTES[pickedKey] : (typeof COLOR_PALETTES !== 'undefined' ? COLOR_PALETTES.amber : { badgeBg: sub?.badgeBg || '' });
}

// Security & Helper Utilities
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJsString(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/</g, '\\x3c')
    .replace(/>/g, '\\x3e');
}

/**
 * Escape a value that will be interpolated into a JS string literal which is
 * itself inside a double-quoted HTML attribute, e.g.
 *
 *     `<button onclick="doThing('${jsAttr(name)}')">`
 *
 * Two layers are required and the order matters. The browser HTML-decodes the
 * attribute first, then parses the result as JS, so we JS-escape first and
 * HTML-escape second.
 *
 * escapeHtml alone is wrong here: it turns ' into &#039;, which decodes back to
 * a bare ' and closes the JS string early. escapeJsString alone is also wrong:
 * it emits \" which still contains a literal " and closes the HTML attribute
 * early. Either way a section named like "O'Brien" breaks the handler.
 */
function jsAttr(str) {
  return escapeHtml(escapeJsString(str));
}

function deepClone(obj) {
  if (typeof structuredClone === 'function') {
    try { return structuredClone(obj); } catch (_) {}
  }
  return JSON.parse(JSON.stringify(obj));
}

function formatTime12(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(':');
  let hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  return String(hour).padStart(2, '0') + ':' + m + ' ' + ampm;
}

function timeToMinutes(tStr) {
  if (!tStr || typeof tStr !== 'string') return 0;
  let str = tStr.trim();
  const isPM = /pm/i.test(str);
  const isAM = /am/i.test(str);
  str = str.replace(/[^\d:]/g, '');
  const parts = str.split(':').map(Number);
  let h = parts[0] || 0;
  const m = parts[1] || 0;
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  return h * 60 + m;
}

/**
 * Parse a single CSV line respecting RFC 4180 quoted fields.
 * Handles commas inside quotes and escaped double-quotes ("").
 * Returns an array of trimmed field strings.
 */
function parseCSVLine(line) {
  const fields = [];
  let i = 0, len = line.length;
  while (i <= len) {
    if (i === len) { fields.push(''); break; }
    if (line[i] === '"') {
      let val = '';
      i++; // skip opening quote
      while (i < len) {
        if (line[i] === '"') {
          if (i + 1 < len && line[i + 1] === '"') {
            val += '"'; i += 2; // escaped quote ""
          } else {
            i++; break;         // closing quote
          }
        } else {
          val += line[i++];
        }
      }
      fields.push(val.trim());
      if (i < len && line[i] === ',') i++;
    } else {
      const next = line.indexOf(',', i);
      if (next === -1) {
        fields.push(line.substring(i).trim());
        break;
      } else {
        fields.push(line.substring(i, next).trim());
        i = next + 1;
      }
    }
  }
  return fields;
}

function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  const iconElem = document.getElementById('toast-icon');
  const msgElem = document.getElementById('toast-message');
  if (!toast || !iconElem || !msgElem) return;

  iconElem.innerText = icon;
  msgElem.innerText = msg;
  toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100', 'toast-animated');
  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100', 'toast-animated');
  }, 3500);
}

/**
 * Activity Type to Lucide Icon Mapping for Badges (Subject Pills, Hover Cards, Weekly Cards).
 * Returns { type, iconName, bgClass, svg } or null.
 */
function getActivityTypeBadgeInfo(rawType, isNoClass = false) {
  if (isNoClass) return null;
  const t = String(rawType || 'Lecture').trim().toLowerCase();
  if (t === 'no class' || t.includes('suspended') || t.includes('cancel')) {
    return {
      type: 'No Class / Suspended',
      iconName: 'ban',
      bgClass: 'bg-rose-600 text-white dark:bg-rose-500',
      textClass: 'text-rose-600 dark:text-rose-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`
    };
  }

  // 1. Laboratory Work: flask-conical
  if (t.includes('lab')) {
    return {
      type: 'Laboratory Work',
      iconName: 'flask-conical',
      bgClass: 'bg-cyan-600 text-white dark:bg-cyan-500',
      textClass: 'text-cyan-600 dark:text-cyan-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`
    };
  }

  // 2. Seatwork / Recitation: pen-tool
  if (t.includes('seatwork') || t.includes('recitation')) {
    return {
      type: 'Seatwork / Recitation',
      iconName: 'pen-tool',
      bgClass: 'bg-emerald-600 text-white dark:bg-emerald-500',
      textClass: 'text-emerald-600 dark:text-emerald-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`
    };
  }

  // 3. Quiz / Evaluation: clipboard-check
  if (t.includes('quiz') || t.includes('eval')) {
    return {
      type: 'Quiz / Evaluation',
      iconName: 'clipboard-check',
      bgClass: 'bg-purple-600 text-white dark:bg-purple-500',
      textClass: 'text-purple-600 dark:text-purple-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`
    };
  }

  // 4. Major Examination: award
  if (t.includes('exam')) {
    return {
      type: 'Major Examination',
      iconName: 'award',
      bgClass: 'bg-amber-500 text-white dark:bg-amber-600',
      textClass: 'text-amber-600 dark:text-amber-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.523 9.11L12 19l-5 3 1.523-9.11"/></svg>`
    };
  }

  // 5. Field Work / Surveying: compass
  if (t.includes('field') || t.includes('survey')) {
    return {
      type: 'Field Work / Surveying',
      iconName: 'compass',
      bgClass: 'bg-teal-600 text-white dark:bg-teal-500',
      textClass: 'text-teal-600 dark:text-teal-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/></svg>`
    };
  }

  // 6. Makeup Class: calendar-clock
  if (t.includes('makeup')) {
    return {
      type: 'Makeup Class',
      iconName: 'calendar-clock',
      bgClass: 'bg-orange-500 text-white dark:bg-orange-600',
      textClass: 'text-orange-600 dark:text-orange-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>`
    };
  }

  // 7. Special Session: sparkles
  if (t.includes('special')) {
    return {
      type: 'Special Session',
      iconName: 'sparkles',
      bgClass: 'bg-violet-600 text-white dark:bg-violet-500',
      textClass: 'text-violet-600 dark:text-violet-400',
      svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
    };
  }

  // 8. Lecture & Discussion: book-open (default)
  return {
    type: 'Lecture & Discussion',
    iconName: 'book-open',
    bgClass: 'bg-blue-600 text-white dark:bg-blue-500',
    textClass: 'text-blue-600 dark:text-blue-400',
    svg: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
  };
}

if (typeof window !== 'undefined') {
  window.getSectionAccent = getSectionAccent;
  window.getSectionBadgeStyle = getSectionBadgeStyle;
  window.getSectionTopBorder = getSectionTopBorder;
  window.getSectionPalette = getSectionPalette;
  window.getActivityTypeBadgeInfo = getActivityTypeBadgeInfo;
}
