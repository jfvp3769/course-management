/* ===========================================================================
 * USER GUIDE
 * ---------------------------------------------------------------------------
 * The floating step-by-step onboarding panel.
 * ======================================================================== */

function openUserGuideModal(tabId = 'setup') {
  const modal = document.getElementById('user-guide-modal');
  if (!modal) return;
  switchGuideTab(tabId);
  modal.classList.remove('hidden');
}

function closeUserGuideModal() {
  const modal = document.getElementById('user-guide-modal');
  if (modal) modal.classList.add('hidden');
}

function switchGuideTab(tabId) {
  const select = document.getElementById('guide-step-select');
  if (select && select.value !== tabId) {
    select.value = tabId;
  }
  GUIDE_STEPS.forEach(t => {
    const panel = document.getElementById('guide-panel-' + t);
    if (panel) {
      if (t === tabId) panel.classList.remove('hidden');
      else panel.classList.add('hidden');
    }
  });
}

function navigateGuideStep(direction) {
  const select = document.getElementById('guide-step-select');
  const current = select ? select.value : 'setup';
  const currentIndex = GUIDE_STEPS.indexOf(current);
  const nextIndex = Math.max(0, Math.min(GUIDE_STEPS.length - 1, currentIndex + direction));
  switchGuideTab(GUIDE_STEPS[nextIndex]);
}

function toggleGuideMinimize() {
  const content = document.getElementById('user-guide-content-area');
  const btn = document.getElementById('btn-guide-minimize');
  if (!content) return;
  const isMinimized = content.classList.contains('hidden');
  if (isMinimized) {
    content.classList.remove('hidden');
    if (btn) btn.innerText = '–';
  } else {
    content.classList.add('hidden');
    if (btn) btn.innerText = '□';
  }
}
