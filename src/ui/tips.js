/* ===========================================================================
 * TIP OF THE DAY
 * ---------------------------------------------------------------------------
 * Tip rotation, the tips modal and the once-per-day startup check.
 * ======================================================================== */

const FACULTY_TIPS = PORTAL_TIPS;

function renderCurrentTip() {
  const tipsList = (typeof PORTAL_TIPS !== 'undefined' && Array.isArray(PORTAL_TIPS) && PORTAL_TIPS.length > 0)
    ? PORTAL_TIPS
    : (typeof FACULTY_TIPS !== 'undefined' ? FACULTY_TIPS : []);
  if (tipsList.length === 0) return;

  const tip = tipsList[currentTipIndex % tipsList.length];

  const iconBox = document.getElementById('tip-icon-box');
  const badge = document.getElementById('tip-badge');
  const counter = document.getElementById('tip-counter');
  const title = document.getElementById('tip-title');
  const desc = document.getElementById('tip-desc');

  const isDidYouKnow = tip.type === 'Did You Know?';
  if (iconBox) iconBox.textContent = tip.icon || (isDidYouKnow ? '💡' : '📌');
  if (badge) {
    badge.textContent = tip.type || tip.badge || 'Tip';
    if (isDidYouKnow) {
      badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30';
    } else {
      badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-msu-maroon/10 text-msu-maroon border border-msu-maroon/20';
    }
  }
  if (counter) counter.textContent = 'Tip of the Day';
  if (title) title.textContent = tip.title;
  if (desc) desc.innerHTML = tip.content || tip.desc;
}

function getActiveTipsCount() {
  return (typeof PORTAL_TIPS !== 'undefined' && Array.isArray(PORTAL_TIPS) && PORTAL_TIPS.length > 0)
    ? PORTAL_TIPS.length
    : 8;
}

function nextTip() {
  const total = getActiveTipsCount();
  currentTipIndex = (currentTipIndex + 1) % total;
  renderCurrentTip();
}

function prevTip() {
  const total = getActiveTipsCount();
  currentTipIndex = (currentTipIndex - 1 + total) % total;
  renderCurrentTip();
}

function goToTip(idx) {
  const total = getActiveTipsCount();
  if (idx >= 0 && idx < total) {
    currentTipIndex = idx;
    renderCurrentTip();
  }
}

function openTipsModal(force = false) {
  const modal = document.getElementById('tips-modal');
  if (!modal) return;
  if (force) {
    const checkbox = document.getElementById('tips-hide-today-checkbox');
    if (checkbox) checkbox.checked = false;
  }
  renderCurrentTip();
  modal.classList.remove('hidden');
}

function closeTipsModal() {
  const modal = document.getElementById('tips-modal');
  if (modal) modal.classList.add('hidden');

  const checkbox = document.getElementById('tips-hide-today-checkbox');
  if (checkbox && checkbox.checked) {
    const todayStr = new Date().toLocaleDateString('en-CA');
    localStorage.setItem('faculty_hide_tips_date', todayStr);
  }
}

function checkDailyTipsOnStartup() {
  try {
    const savedDate = localStorage.getItem('faculty_hide_tips_date') || localStorage.getItem('msu_hide_tips_date');
    const todayStr = new Date().toLocaleDateString('en-CA');
    if (savedDate === todayStr) {
      return; // Hidden for today
    }

    // Cycle through tips based on day of year
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const dayOfYear = Math.floor((new Date() - startOfYear) / (1000 * 60 * 60 * 24));
    const total = getActiveTipsCount();
    currentTipIndex = Math.abs(dayOfYear) % total;

    // Slight delay so the UI cleanly renders before popup opens
    setTimeout(() => {
      openTipsModal(false);
    }, 600);
  } catch (e) {
    console.warn("Could not check daily tips state:", e);
  }
}
