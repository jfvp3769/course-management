/* ===========================================================================
 * PERIODIC BACKUP REMINDER
 * ---------------------------------------------------------------------------
 * Tracks time since the last backup and shows, snoozes or dismisses the
 * reminder banner.
 * ======================================================================== */

function recordBackupCompleted() {
  try {
    const now = Date.now();
    localStorage.setItem('faculty_last_backup_time', String(now));
    localStorage.removeItem('faculty_backup_reminder_snoozed_until');
    localStorage.removeItem('msu_backup_reminder_snoozed_until');
  } catch (e) {
    console.warn("Could not save backup timestamp:", e);
  }
  dismissBackupReminderBanner(false);
  updateBackupStatusUI();
}

function formatLastBackupTime() {
  try {
    const last = localStorage.getItem('faculty_last_backup_time') || localStorage.getItem('msu_last_backup_time');
    if (!last) return 'No backup saved yet on this device';
    const lastTs = parseInt(last, 10);
    if (isNaN(lastTs) || lastTs <= 0) return 'No backup saved yet on this device';

    const diffMs = Date.now() - lastTs;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 1) return 'Last backup: Just now';
    if (diffMins < 60) return `Last backup: ${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `Last backup: ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays === 1) return 'Last backup: Yesterday';
    return `Last backup: ${diffDays} days ago`;
  } catch (e) {
    return 'No backup saved yet';
  }
}

function updateBackupStatusUI() {
  const statusEl = document.getElementById('ei-last-backup-status');
  if (statusEl) {
    const text = formatLastBackupTime();
    const last = localStorage.getItem('faculty_last_backup_time') || localStorage.getItem('msu_last_backup_time');
    const icon = last ? '🕒 ' : '⚠️ ';
    statusEl.innerHTML = `${icon}<span>${escapeHtml(text)}</span>`;
  }
}

function checkBackupReminder() {
  try {
    const snoozedUntil = localStorage.getItem('faculty_backup_reminder_snoozed_until') || localStorage.getItem('msu_backup_reminder_snoozed_until');
    if (snoozedUntil && Date.now() < parseInt(snoozedUntil, 10)) {
      return; // Currently snoozed
    }

    const lastBackup = localStorage.getItem('faculty_last_backup_time') || localStorage.getItem('msu_last_backup_time');
    let shouldRemind = false;
    let daysSince = 0;

    if (lastBackup) {
      const lastTs = parseInt(lastBackup, 10);
      if (!isNaN(lastTs)) {
        const elapsed = Date.now() - lastTs;
        daysSince = Math.floor(elapsed / (24 * 60 * 60 * 1000));
        if (elapsed >= BACKUP_REMINDER_MS) {
          shouldRemind = true;
        }
      }
    } else {
      let firstInstalled = localStorage.getItem('faculty_app_first_installed_time') || localStorage.getItem('msu_app_first_installed_time');
      if (!firstInstalled) {
        const rawStored = localStorage.getItem(STORAGE_KEY) || (typeof LEGACY_STORAGE_KEY !== 'undefined' ? localStorage.getItem(LEGACY_STORAGE_KEY) : null);
        if (rawStored) {
          try {
            const parsed = JSON.parse(rawStored);
            if (parsed.updatedAt) {
              firstInstalled = String(new Date(parsed.updatedAt).getTime());
            }
          } catch (e) {}
        }
        if (!firstInstalled) {
          firstInstalled = String(Date.now());
        }
        localStorage.setItem('faculty_app_first_installed_time', firstInstalled);
      }

      const firstTs = parseInt(firstInstalled, 10);
      if (!isNaN(firstTs)) {
        const elapsed = Date.now() - firstTs;
        daysSince = Math.floor(elapsed / (24 * 60 * 60 * 1000));
        if (elapsed >= BACKUP_REMINDER_MS) {
          shouldRemind = true;
        }
      }
    }

    if (shouldRemind) {
      showBackupReminderBanner(daysSince);
    }
  } catch (err) {
    console.warn("Backup reminder check encountered an issue:", err);
  }
}

function showBackupReminderBanner(daysSince = 0) {
  const banner = document.getElementById('backup-reminder-banner');
  if (!banner) return;
  const msgEl = document.getElementById('backup-reminder-message');
  if (msgEl) {
    if (daysSince > 0) {
      msgEl.textContent = `It's been ${daysSince} days since your last backup. Download a copy to safeguard your student rosters, grades, and lesson plans.`;
    } else {
      msgEl.textContent = `You haven't backed up your portal data recently. Download a copy to safeguard your student rosters, grades, and lesson plans.`;
    }
  }
  banner.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
  banner.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
}

function dismissBackupReminderBanner(snoozeDefault = false) {
  const banner = document.getElementById('backup-reminder-banner');
  if (banner) {
    banner.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    banner.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
  }
  if (snoozeDefault) {
    localStorage.setItem('faculty_backup_reminder_snoozed_until', String(Date.now() + 24 * 60 * 60 * 1000));
  }
}

function snoozeBackupReminder(days = 3) {
  const snoozeMs = days * 24 * 60 * 60 * 1000;
  localStorage.setItem('faculty_backup_reminder_snoozed_until', String(Date.now() + snoozeMs));
  dismissBackupReminderBanner(false);
  showToast(`Backup reminder snoozed for ${days} days`);
}

function triggerBackupFromReminder() {
  exportBackupJSON();
}

window.checkBackupReminder = checkBackupReminder;
window.showBackupReminderBanner = showBackupReminderBanner;
window.dismissBackupReminderBanner = dismissBackupReminderBanner;
window.snoozeBackupReminder = snoozeBackupReminder;
window.triggerBackupFromReminder = triggerBackupFromReminder;
