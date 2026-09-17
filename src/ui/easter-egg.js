/* ===========================================================================
 * SECRET KNOWLEDGE VAULT
 * ---------------------------------------------------------------------------
 * Hidden tips browser, reachable via five taps on the school logo or the
 * Konami code.
 * ======================================================================== */

function openEasterEggModal() {
  const modal = document.getElementById('easter-egg-tips-modal');
  if (!modal) return;
  vaultActiveCategory = 'all';
  vaultSearchTerm = '';
  const input = document.getElementById('vault-search-input');
  if (input) input.value = '';
  updateVaultFilterButtons();
  renderEasterEggTipsList();
  modal.classList.remove('hidden');
}

function closeEasterEggModal() {
  const modal = document.getElementById('easter-egg-tips-modal');
  if (modal) modal.classList.add('hidden');
}

function filterVaultTips(cat) {
  vaultActiveCategory = cat;
  updateVaultFilterButtons();
  renderEasterEggTipsList();
}

function searchVaultTips() {
  const input = document.getElementById('vault-search-input');
  vaultSearchTerm = (input ? input.value : '').toLowerCase().trim();
  renderEasterEggTipsList();
}

function updateVaultFilterButtons() {
  const allBtn = document.getElementById('vault-filter-all');
  const tipBtn = document.getElementById('vault-filter-tip');
  const dykBtn = document.getElementById('vault-filter-dyk');

  const activeClass = 'px-3 py-1.5 rounded-lg bg-msu-maroon text-white border border-msu-maroon transition shadow-2xs';
  const inactiveClass = 'px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 transition';

  if (allBtn) allBtn.className = vaultActiveCategory === 'all' ? activeClass : inactiveClass;
  if (tipBtn) tipBtn.className = vaultActiveCategory === 'Tip' ? activeClass : inactiveClass;
  if (dykBtn) dykBtn.className = vaultActiveCategory === 'Did You Know?' ? activeClass : inactiveClass;
}

function renderEasterEggTipsList() {
  const listContainer = document.getElementById('easter-egg-tips-list');
  if (!listContainer) return;

  const tips = (typeof PORTAL_TIPS !== 'undefined' && Array.isArray(PORTAL_TIPS)) ? PORTAL_TIPS : [];
  
  const filtered = tips.filter(t => {
    const matchesCat = vaultActiveCategory === 'all' || t.type === vaultActiveCategory;
    const textContent = `${t.title} ${t.content || t.desc} ${t.type}`.toLowerCase();
    const matchesSearch = !vaultSearchTerm || textContent.includes(vaultSearchTerm);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `
          <div class="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
            <span class="text-3xl">🔍</span>
            <p class="text-sm font-semibold">No tips match "${escapeHtml(vaultSearchTerm)}"</p>
            <button type="button" onclick="document.getElementById('vault-search-input').value=''; searchVaultTips();" class="text-xs text-msu-maroon hover:underline font-bold">Clear search filter</button>
          </div>
        `;
    return;
  }

  listContainer.innerHTML = filtered.map((t, idx) => {
    const isDyk = t.type === 'Did You Know?';
    const badgeClass = isDyk 
      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30' 
      : 'bg-msu-maroon/10 text-msu-maroon dark:text-rose-300 border-msu-maroon/20';
    const iconBg = isDyk ? 'bg-amber-100 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700' : 'bg-rose-100 border-rose-300 dark:bg-rose-950/40 dark:border-rose-700';

    return `
          <div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 sm:p-4 flex gap-3.5 items-start hover:border-amber-400 dark:hover:border-amber-500/60 transition shadow-2xs">
            <div class="w-10 h-10 rounded-xl ${iconBg} border text-xl flex items-center justify-center shrink-0 shadow-xs">
              ${t.icon || (isDyk ? '💡' : '📌')}
            </div>
            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badgeClass}">
                  ${escapeHtml(t.type)}
                </span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold ml-auto">#${tips.indexOf(t) + 1} of ${tips.length}</span>
              </div>
              <h4 class="font-extrabold text-sm text-slate-900 dark:text-slate-100 leading-snug">${escapeHtml(t.title)}</h4>
              <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">${t.content || t.desc}</div>
            </div>
          </div>
        `;
  }).join('');
}

// Easter Egg Triggers: (1) 5 quick clicks on School Logo / Name; (2) Konami Code

function handleLogoEasterEggTap() {
  logoTapCount++;
  
  const logoEl = document.getElementById('header-school-logo') || document.getElementById('header-school-name');
  if (logoEl) {
    logoEl.style.transition = 'transform 0.15s ease';
    logoEl.style.transform = `scale(${1 + logoTapCount * 0.05})`;
    setTimeout(() => { if (logoEl) logoEl.style.transform = 'scale(1)'; }, 180);
  }

  clearTimeout(logoTapTimer);
  if (logoTapCount >= 5) {
    logoTapCount = 0;
    showToast('🎉 Secret Knowledge Vault Unlocked! All 25 Tips Revealed!', '✨');
    openEasterEggModal();
  } else {
    logoTapTimer = setTimeout(() => {
      logoTapCount = 0;
    }, 2200);
  }
}

// Konami Code sequence

window.addEventListener('keydown', (e) => {
  // Ignore if user is typing in an input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
    return;
  }
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const expected = KONAMI_CODE[konamiIndex].toLowerCase();
  if (key === expected) {
    konamiIndex++;
    if (konamiIndex === KONAMI_CODE.length) {
      konamiIndex = 0;
      showToast('🕹️ Konami Code Activated! Welcome to the Secret Vault!', '✨');
      openEasterEggModal();
    }
  } else {
    konamiIndex = 0;
  }
});

// Expose helpers for power users & console explorers
window.unlockSecretTips = openEasterEggModal;

/**
 * Binds the logo/name tap trigger. Idempotent: safe to call after a backup
 * import, a settings save, or a reset without stacking duplicate listeners.
 * (The previous code re-attached these on every branding change, which made a
 * single tap count 2-4 times and fired the vault early.)
 */
function bindBrandingEasterEgg() {
  ['header-school-logo', 'header-school-name'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el || el.dataset.eggBound === '1') return;
    el.dataset.eggBound = '1';
    el.addEventListener('click', handleLogoEasterEggTap);
  });
}

window.bindBrandingEasterEgg = bindBrandingEasterEgg;
window.openSecretVault = openEasterEggModal;
