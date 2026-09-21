/* ===========================================================================
 * IMPORT / EXPORT CENTRE
 * ---------------------------------------------------------------------------
 * CSV and JSON import/export for the planner schedule, subject catalogue,
 * roster and gradebook scores. Also owns the live header clock.
 * ======================================================================== */

function openExportImportModal(defaultTab = null) {
  const modal = document.getElementById('export-import-modal');
  if (!modal) return;

  // Automatically route to the active workspace tab if none is specified
  if (!defaultTab || typeof defaultTab !== 'string') {
    const mainTabs = ['planner', 'timetable', 'calendar', 'roster', 'gradebook'];
    const activeMainTab = mainTabs.find(t => {
      const el = document.getElementById('tab-content-' + t);
      return el && !el.classList.contains('hidden');
    }) || 'planner';

    const tabMapping = {
      planner: 'planner',
      timetable: 'courses',
      calendar: 'planner',
      roster: 'roster',
      gradebook: 'grades'
    };
    defaultTab = tabMapping[activeMainTab] || 'planner';
  }

  // Populate roster export sections
  const secSelect = document.getElementById('ei-roster-export-section');
  if (secSelect) {
    cleanupOrphanedStudents();
    const allSections = [];
    (courseData.subjects || []).forEach(sub => {
      (sub.sections || []).forEach(sec => {
        allSections.push(sub.code + ' - ' + sec);
      });
    });

    secSelect.innerHTML = `<option value="">All Sections (${studentRoster.length} Students)</option>` +
      allSections.map(secKey => {
        const count = studentRoster.filter(s => s.section === secKey).length;
        return `<option value="${escapeHtml(secKey)}">Section: ${escapeHtml(secKey)} (${count} Students)</option>`;
      }).join('');
  }

  switchExportImportTab(defaultTab);
  updateBackupStatusUI();
  modal.classList.remove('hidden');
}

function closeExportImportModal() {
  const modal = document.getElementById('export-import-modal');
  if (modal) modal.classList.add('hidden');
}

function switchExportImportTab(tabId) {
  const tabs = ['planner', 'courses', 'roster', 'grades', 'backup'];
  tabs.forEach(t => {
    const btn = document.getElementById('ei-tab-' + t);
    const panel = document.getElementById('ei-panel-' + t);
    if (t === tabId) {
      if (btn) {
        btn.className = 'ei-tab px-3 py-1.5 rounded-lg border border-transparent app-themed-btn-primary text-white font-bold transition shadow-2xs';
      }
      if (panel) panel.classList.remove('hidden');
    } else {
      if (btn) {
        btn.className = 'ei-tab px-3 py-1.5 rounded-lg border border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition';
      }
      if (panel) panel.classList.add('hidden');
    }
  });
  if (tabId === 'backup') {
    updateBackupStatusUI();
  }
}

// Export / Import Planner Schedule
function exportPlannerScheduleCSV() {
  let csv = 'Date,Day,CourseCode,Section,Topic,ActivityType,SubExam,Room,Notes\n';
  (semesterDates || []).forEach(d => {
    (courseData.subjects || []).forEach(sub => {
      (sub.sections || []).forEach(sec => {
        const key = d.dateKey + '__' + sub.code + '__' + sec;
        const entry = plannerEntries[key];
        if (entry) {
          const row = [
            d.dateKey,
            d.dayOfWeek,
            sub.code,
            sec,
            entry.topic || '',
            entry.activityType || entry.type || '',
            entry.subExam || '',
            entry.room || '',
            entry.notes || ''
          ];
          csv += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',') + '\n';
        }
      });
    });
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'Lesson_Schedule_' + new Date().toISOString().slice(0, 10) + '.csv');
  a.click();
  showToast("Lesson Planner Matrix CSV exported!");
}

function exportPlannerScheduleJSON() {
  const payload = {
    exportedAt: new Date().toISOString(),
    plannerEntries,
    dailyNotes,
    syllabusBacklog
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', 'Lesson_Schedule_' + new Date().toISOString().slice(0, 10) + '.json');
  a.click();
  showToast("Lesson Planner Matrix JSON exported!");
}

function importPlannerScheduleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      if (file.name.endsWith('.json')) {
        const data = JSON.parse(content);
        if (data.plannerEntries) {
          Object.assign(plannerEntries, data.plannerEntries);
          if (data.dailyNotes) Object.assign(dailyNotes, data.dailyNotes);
          if (data.syllabusBacklog) syllabusBacklog = data.syllabusBacklog;
          Render.after('plannerImport');
          showToast("Schedule entries restored from JSON!");
        }
      } else {
        // Parse CSV
        const lines = content.split(/\r?\n/).filter(Boolean);
        let importedCount = 0;
        for (let i = 1; i < lines.length; i++) {
          const parts = parseCSVLine(lines[i]);
          if (parts.length >= 5) {
            const dateStr = parts[0];
            const code = parts[2];
            const sec = parts[3];
            const topic = parts[4];
            const activityType = parts[5] || 'Lecture';
            const subExam = parts[6] || '';
            const room = parts[7] || '';
            const notes = parts[8] || '';

            if (dateStr && code && sec) {
              const key = dateStr + '__' + code + '__' + sec;
              plannerEntries[key] = { topic, activityType, subExam, room, notes, status: "Planned" };
              importedCount++;
            }
          }
        }
        Render.after('plannerImport');
        showToast("Imported " + importedCount + " schedule rows!");
      }
    } catch (err) {
      console.error(err);
      showToast("Error parsing schedule file.", "⚠️");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// Export / Import Subjects Catalog
function exportSubjectsJSON() {
  const payload = {
    exportedAt: new Date().toISOString(),
    subjects: courseData.subjects,
    weeklyTimetable
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', 'Subjects_Timetable_' + new Date().toISOString().slice(0, 10) + '.json');
  a.click();
  showToast("Subjects & Timetable exported!");
}

function importSubjectsJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.subjects) {
        courseData.subjects = data.subjects;
        if (data.weeklyTimetable) weeklyTimetable = data.weeklyTimetable;
        Render.after('schedule');
        openManageCoursesModal();
        updateTimetableSidebar();
        showToast("Subjects & Timetable restored successfully!");
      } else {
        showToast("Invalid subjects backup file.", "⚠️");
      }
    } catch (err) {
      console.error(err);
      showToast("Error parsing subjects JSON.", "⚠️");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// Export / Import Roster
function exportRosterCSV() {
  const secSelect = document.getElementById('ei-roster-export-section');
  const selectedSec = secSelect ? secSelect.value : '';
  const filtered = studentRoster.filter(s => {
    if (!selectedSec) return true;
    return s.section === selectedSec || selectedSec.endsWith(' - ' + s.section);
  });

  let csv = 'Student ID,Last Name,First Name,Email,Section\n';
  filtered.forEach(s => {
    const row = [s.id, s.last, s.first, s.email, s.section];
    csv += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'Student_Roster_' + (selectedSec ? selectedSec.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' : '') + new Date().toISOString().slice(0, 10) + '.csv');
  a.click();
  showToast("Student Roster CSV exported!");
}

function importRosterCSVFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      const lines = content.split(/\r?\n/).filter(Boolean);
      let addedCount = 0;

      for (let i = (lines[0].toLowerCase().includes('id') ? 1 : 0); i < lines.length; i++) {
        const line = lines[i];
        const parts = line.includes('\t') ? line.split('\t').map(s => s.trim()) : parseCSVLine(line);
        if (parts.length >= 3) {
          const id = parts[0];
          const last = parts[1];
          const first = parts[2];
          const email = parts[3] ? parts[3] : (first.toLowerCase() + '.' + last.toLowerCase() + '@university.edu');
          const section = parts[4] ? parts[4] : 'Main';

          if (id && last) {
            if (!studentRoster.some(s => s.id === id && s.section === section)) {
              studentRoster.push({ id, last, first, email, section, scores: {}, qz: 85, lab: 85, p1: 85, p2: 85, fin: 85 });
              addedCount++;
            }
          }
        }
      }

      saveAppState(false);
      Render.only('roster', 'gradebook', 'rosterSidebar');
      showToast("Imported " + addedCount + " students into roster!");
    } catch (err) {
      console.error(err);
      showToast("Error parsing roster file.", "⚠️");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// Import Scores into Gradebook
function importGradebookScoresCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      const lines = content.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) {
        showToast("CSV has no data rows.", "⚠️");
        return;
      }

      const headers = parseCSVLine(lines[0]);
      const idColIdx = headers.findIndex(h => h.toLowerCase().includes('student id') || h.toLowerCase() === 'id');

      if (idColIdx === -1) {
        showToast("Could not find 'Student ID' column.", "⚠️");
        return;
      }

      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';
      const config = getGradingConfig(selectedSec);

      // Build sub-activity lookup map
      const subActivityMap = {};
      config.categories.forEach(cat => {
        (cat.subActivities || []).forEach(sub => {
          subActivityMap[sub.name.toLowerCase()] = sub.id;
          subActivityMap[(cat.name + ' - ' + sub.name).toLowerCase()] = sub.id;
          subActivityMap[sub.id.toLowerCase()] = sub.id;
        });
      });

      // Match header columns to subActivities
      const colToSubActId = {};
      headers.forEach((h, idx) => {
        if (idx === idColIdx) return;
        const cleanHeader = h.split('(')[0].trim().toLowerCase();
        if (subActivityMap[cleanHeader]) {
          colToSubActId[idx] = subActivityMap[cleanHeader];
        } else {
          Object.keys(subActivityMap).forEach(k => {
            if (cleanHeader.includes(k)) {
              colToSubActId[idx] = subActivityMap[k];
            }
          });
        }
      });

      let updatedStudents = 0;
      for (let i = 1; i < lines.length; i++) {
        const parts = parseCSVLine(lines[i]);
        const studentId = parts[idColIdx];
        if (!studentId) continue;

        const student = studentRoster.find(s => s.id === studentId && (!selectedSec || s.section === selectedSec));
        if (student) {
          if (!student.scores) student.scores = {};
          let hasScoreUpdate = false;

          Object.keys(colToSubActId).forEach(cIdx => {
            const subId = colToSubActId[cIdx];
            const rawVal = parts[cIdx];
            if (rawVal !== undefined && rawVal !== '') {
              const numVal = parseFloat(rawVal);
              if (!isNaN(numVal)) {
                student.scores[subId] = numVal;
                hasScoreUpdate = true;
              }
            }
          });

          if (hasScoreUpdate) updatedStudents++;
        }
      }

      Render.after('grades');
      showToast("Updated scores for " + updatedStudents + " students from CSV!");
    } catch (err) {
      console.error(err);
      showToast("Error importing gradebook scores.", "⚠️");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function initLiveHeaderClock() {
  function updateClock() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dayNum = now.getDate();
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    const dayEl = document.getElementById('clock-day-text');
    const dateEl = document.getElementById('clock-date-text');
    const timeEl = document.getElementById('clock-time-text');

    if (dayEl) dayEl.textContent = dayName;
    if (dateEl) dateEl.textContent = `${monthName} ${dayNum}, ${year}`;
    if (timeEl) timeEl.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    // Periodically refresh Next Activities & Next Class widgets at minute turnover so countdowns tick live
    if (seconds === '00') {
      Render.only('plannerSidebar', 'timetableSidebar');
    }
  }

  updateClock();
  if (typeof setInterval === 'function') {
    setInterval(updateClock, 1000);
  }
}
