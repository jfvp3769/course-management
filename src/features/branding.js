/* ===========================================================================
 * SEMESTER & BRANDING SETTINGS
 * ---------------------------------------------------------------------------
 * School name, logo upload and semester title/date configuration.
 * ======================================================================== */

function applyHeaderBranding() {
  const defaultSchool = (DEFAULT_DATA.semesterConfig && DEFAULT_DATA.semesterConfig.schoolName)
    ? DEFAULT_DATA.semesterConfig.schoolName
    : "Mindanao State University - General Santos";
  const sName = (semesterConfig && semesterConfig.schoolName) ? semesterConfig.schoolName : defaultSchool;

  const headerNameEl = document.getElementById('header-school-name');
  if (headerNameEl) {
    headerNameEl.textContent = sName;
    headerNameEl.title = sName;
  }

  const logoImg = document.getElementById('header-school-logo');
  const fallbackEl = document.getElementById('header-logo-fallback');
  if (logoImg) {
    if (!logoImg._hasBoundError) {
      logoImg._hasBoundError = true;
      logoImg.addEventListener('error', () => {
        logoImg.style.display = 'none';
        if (fallbackEl) fallbackEl.style.display = 'flex';
      });
    }
    logoImg.style.display = 'block';
    if (fallbackEl) fallbackEl.style.display = 'none';

    if (semesterConfig && semesterConfig.schoolLogo) {
      logoImg.src = semesterConfig.schoolLogo;
      logoImg.classList.remove('scale-[1.38]');
      logoImg.classList.add('scale-100');
    } else {
      logoImg.src = 'msu-logo.png';
      logoImg.classList.add('scale-[1.38]');
      logoImg.classList.remove('scale-100');
    }
  }

  if (fallbackEl) {
    const initials = sName.split(/\s+/).map(w => w[0]).filter(c => /[A-Za-z0-9]/.test(c)).slice(0, 3).join('').toUpperCase() || 'MSU';
    fallbackEl.textContent = initials;
  }
}

function openTermSettingsModal() {
  tempUploadedLogo = (semesterConfig && semesterConfig.schoolLogo !== undefined) ? semesterConfig.schoolLogo : "";

  const schoolNameInput = document.getElementById('setting-school-name');
  if (schoolNameInput) {
    schoolNameInput.value = (semesterConfig && semesterConfig.schoolName)
      ? semesterConfig.schoolName
      : (DEFAULT_DATA.semesterConfig.schoolName || "Mindanao State University - General Santos");
  }

  const logoPreview = document.getElementById('setting-logo-preview');
  if (logoPreview) {
    if (tempUploadedLogo) {
      logoPreview.src = tempUploadedLogo;
      logoPreview.classList.remove('scale-[1.38]');
    } else {
      logoPreview.src = 'msu-logo.png';
      logoPreview.classList.add('scale-[1.38]');
    }
  }

  const fileInput = document.getElementById('setting-logo-file');
  if (fileInput) fileInput.value = '';

  document.getElementById('setting-term-title').value = semesterConfig.title || '';
  document.getElementById('setting-start-date').value = semesterConfig.startDate || '';
  document.getElementById('setting-end-date').value = semesterConfig.endDate || '';
  const emailInput = document.getElementById('setting-faculty-email');
  if (emailInput) {
    emailInput.value = semesterConfig.facultyEmail || '';
  }
  document.getElementById('term-settings-modal').classList.remove('hidden');
}

function closeTermSettingsModal() {
  document.getElementById('term-settings-modal').classList.add('hidden');
  tempUploadedLogo = undefined;
}

function handleLogoFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast("Please select a valid image file (PNG, JPG, SVG, WebP).", "⚠️");
    return;
  }

  // Use an offscreen Image and Canvas to downscale high-resolution images of ANY size
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const maxDim = 256;
      let w = img.width;
      let h = img.height;

      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);

      // Export as PNG to preserve transparent backgrounds
      const compressedDataUrl = canvas.toDataURL('image/png');

      tempUploadedLogo = compressedDataUrl;
      const preview = document.getElementById('setting-logo-preview');
      if (preview) {
        preview.src = compressedDataUrl;
        preview.classList.remove('scale-[1.38]');
      }
      showToast("Logo optimized & ready to save! (Scaled to crisp 256px)", "✓");
    };
    img.onerror = function() {
      showToast("Could not process image file.", "⚠️");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function resetDefaultLogo() {
  tempUploadedLogo = "";
  const preview = document.getElementById('setting-logo-preview');
  if (preview) {
    preview.src = 'msu-logo.png';
    preview.classList.add('scale-[1.38]');
  }
  const fileInput = document.getElementById('setting-logo-file');
  if (fileInput) fileInput.value = '';
  showToast("Reset to official MSU seal.", "ℹ️");
}

function saveTermSettings() {
  const schoolName = (document.getElementById('setting-school-name')?.value || '').trim();
  const title = document.getElementById('setting-term-title').value.trim();
  const start = document.getElementById('setting-start-date').value;
  const end = document.getElementById('setting-end-date').value;
  const facultyEmail = (document.getElementById('setting-faculty-email')?.value || '').trim();

  if (!start || !end) {
    showToast("Start and End dates are required.", "⚠️");
    return;
  }

  if (start >= end) {
    showToast("Start date must be before End date.", "⚠️");
    return;
  }

  semesterConfig.schoolName = schoolName || (DEFAULT_DATA.semesterConfig.schoolName || "Mindanao State University - General Santos");
  if (tempUploadedLogo !== undefined) {
    semesterConfig.schoolLogo = tempUploadedLogo;
  }

  semesterConfig.title = title || semesterConfig.title;
  semesterConfig.startDate = start;
  semesterConfig.endDate = end;
  semesterConfig.facultyEmail = facultyEmail;

  applyHeaderBranding();


  document.getElementById('header-term-title').innerText = semesterConfig.title + ' • Course Planning & Activity Matrix';
  document.getElementById('planner-term-label').innerText = semesterConfig.title + ' Matrix';

  semesterDates = generateSemesterDateList();
  Render.after('semester');
  closeTermSettingsModal();
  showToast("Portal branding & academic timeline updated successfully!");
}
