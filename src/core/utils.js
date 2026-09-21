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
