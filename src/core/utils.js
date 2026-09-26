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

function getSectionAccent(secIndex) {
  return sectionAccentColors[secIndex % sectionAccentColors.length];
}

function getSectionBadgeStyle(secIndex) {
  return sectionBadgeBorders[secIndex % sectionBadgeBorders.length];
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
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`
    };
  }

  // 1. Laboratory Work: flask-conical
  if (t.includes('lab')) {
    return {
      type: 'Laboratory Work',
      iconName: 'flask-conical',
      bgClass: 'bg-cyan-600 text-white dark:bg-cyan-500',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`
    };
  }

  // 2. Seatwork / Recitation: pen-tool
  if (t.includes('seatwork') || t.includes('recitation')) {
    return {
      type: 'Seatwork / Recitation',
      iconName: 'pen-tool',
      bgClass: 'bg-emerald-600 text-white dark:bg-emerald-500',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`
    };
  }

  // 3. Quiz / Evaluation: clipboard-check
  if (t.includes('quiz') || t.includes('eval')) {
    return {
      type: 'Quiz / Evaluation',
      iconName: 'clipboard-check',
      bgClass: 'bg-purple-600 text-white dark:bg-purple-500',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`
    };
  }

  // 4. Major Examination: award
  if (t.includes('exam')) {
    return {
      type: 'Major Examination',
      iconName: 'award',
      bgClass: 'bg-amber-500 text-white dark:bg-amber-600',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.523 9.11L12 19l-5 3 1.523-9.11"/></svg>`
    };
  }

  // 5. Field Work / Surveying: compass
  if (t.includes('field') || t.includes('survey')) {
    return {
      type: 'Field Work / Surveying',
      iconName: 'compass',
      bgClass: 'bg-teal-600 text-white dark:bg-teal-500',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/></svg>`
    };
  }

  // 6. Makeup Class: calendar-clock
  if (t.includes('makeup')) {
    return {
      type: 'Makeup Class',
      iconName: 'calendar-clock',
      bgClass: 'bg-orange-500 text-white dark:bg-orange-600',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>`
    };
  }

  // 7. Special Session: sparkles
  if (t.includes('special')) {
    return {
      type: 'Special Session',
      iconName: 'sparkles',
      bgClass: 'bg-violet-600 text-white dark:bg-violet-500',
      svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`
    };
  }

  // 8. Lecture & Discussion: book-open (default)
  return {
    type: 'Lecture & Discussion',
    iconName: 'book-open',
    bgClass: 'bg-blue-600 text-white dark:bg-blue-500',
    svg: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
  };
}

if (typeof window !== 'undefined') {
  window.getActivityTypeBadgeInfo = getActivityTypeBadgeInfo;
}
