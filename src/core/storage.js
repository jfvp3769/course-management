/* ===========================================================================
 * PERSISTENCE & BACKUP
 * ---------------------------------------------------------------------------
 * localStorage read/write, orphaned-student cleanup, and JSON backup
 * export/import.
 * ======================================================================== */

function saveAppState(immediate = false) {
  clearTimeout(saveTimeout);
  const indicator = document.getElementById('save-status-indicator');
  if (indicator) {
    indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span><span>Saving...</span>';
  }

  const doSave = () => {
    try {
      const payload = {
        version: 2,
        updatedAt: new Date().toISOString(),
        semesterConfig,
        courseData,
        columnWidths,
        weeklyTimetable,
        msuCalendarEvents,
        plannerEntries,
        studentRoster,
        dailyNotes,
        syllabusBacklog,
        currentWeekViewIndex,
        selectedMonthFilter
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      if (indicator) {
        indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span>Saved Offline</span>';
      }
    } catch (e) {
      console.error("Storage error:", e);
      if (indicator) {
        indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span><span>Save Failed</span>';
      }
    }
  };

  if (immediate) {
    doSave();
  } else {
    saveTimeout = setTimeout(doSave, 300);
  }
}

function cleanupOrphanedStudents() {
  if (!courseData || !Array.isArray(courseData.subjects) || courseData.subjects.length === 0) return 0;

  const validSectionMap = new Map();
  const validSectionKeys = new Set();

  courseData.subjects.forEach(sub => {
    (sub.sections || []).forEach(sec => {
      const fullKey = `${sub.code} - ${sec}`;
      validSectionKeys.add(fullKey);
      if (!validSectionMap.has(sec)) {
        validSectionMap.set(sec, fullKey);
      }
    });
  });

  const initialLen = studentRoster.length;
  const cleanedRoster = [];

  studentRoster.forEach(s => {
    if (!s || !s.section) return;

    // Matches valid canonical section
    if (validSectionKeys.has(s.section)) {
      cleanedRoster.push(s);
      return;
    }

    // Bare section name matches an active section - normalize to canonical full key
    if (validSectionMap.has(s.section)) {
      s.section = validSectionMap.get(s.section);
      cleanedRoster.push(s);
      return;
    }

    // Otherwise it belongs to a deleted/nonexistent section (e.g. initial demo data) - omit it
  });

  const removedCount = initialLen - cleanedRoster.length;
  if (removedCount > 0) {
    studentRoster = cleanedRoster;
    saveAppState();
  }
  return removedCount;
}

function loadAppState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.semesterConfig) {
        semesterConfig = Object.assign({}, DEFAULT_DATA.semesterConfig, parsed.semesterConfig);
      }
      if (parsed.courseData) courseData = parsed.courseData;
      if (parsed.columnWidths) columnWidths = parsed.columnWidths;
      if (parsed.weeklyTimetable) weeklyTimetable = parsed.weeklyTimetable;
      if (parsed.msuCalendarEvents) msuCalendarEvents = parsed.msuCalendarEvents;
      if (parsed.plannerEntries) plannerEntries = parsed.plannerEntries;
      if (parsed.studentRoster) studentRoster = parsed.studentRoster;
      if (parsed.dailyNotes) dailyNotes = parsed.dailyNotes;
      if (parsed.syllabusBacklog) syllabusBacklog = parsed.syllabusBacklog;
      if (parsed.currentWeekViewIndex) currentWeekViewIndex = parsed.currentWeekViewIndex;
      if (parsed.selectedMonthFilter) selectedMonthFilter = parsed.selectedMonthFilter;
      cleanupOrphanedStudents();
      return true;
    }
  } catch (e) {
    console.warn("Could not load stored state, falling back to defaults.", e);
  }
  return false;
}

function exportBackupJSON() {
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    semesterConfig,
    courseData,
    columnWidths,
    weeklyTimetable,
    msuCalendarEvents,
    plannerEntries,
    studentRoster,
    dailyNotes,
    syllabusBacklog,
    currentWeekViewIndex,
    selectedMonthFilter
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', 'MSU_Course_Manager_Backup_' + new Date().toISOString().slice(0, 10) + '.json');
  a.click();
  recordBackupCompleted();
  showToast("Data backup file exported!");
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.semesterConfig && data.courseData) {
        semesterConfig = Object.assign({}, DEFAULT_DATA.semesterConfig, data.semesterConfig);
        applyHeaderBranding();

        courseData = data.courseData;
        columnWidths = data.columnWidths || columnWidths;
        weeklyTimetable = data.weeklyTimetable || weeklyTimetable;
        msuCalendarEvents = data.msuCalendarEvents || msuCalendarEvents;
        plannerEntries = data.plannerEntries || plannerEntries;
        studentRoster = data.studentRoster || studentRoster;
        dailyNotes = data.dailyNotes || dailyNotes;

        saveAppState();
        semesterDates = generateSemesterDateList();
        Render.views('everything');
        recordBackupCompleted();
        showToast("Backup imported and restored successfully!");
        closeTermSettingsModal();
      } else {
        showToast("Invalid backup file structure.", "⚠️");
      }
    } catch (err) {
      console.error(err);
      showToast("Error parsing backup JSON file.", "⚠️");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function requestResetToDefaults() {
  showConfirmation(
    "Reset to Default Data?",
    "This will restore all subjects, schedules, calendar events, and rosters to initial demo state. Any custom additions will be lost.",
    () => {
      localStorage.removeItem(STORAGE_KEY);
      semesterConfig = JSON.parse(JSON.stringify(DEFAULT_DATA.semesterConfig));
      applyHeaderBranding();

      courseData = JSON.parse(JSON.stringify(DEFAULT_DATA.courseData));
      columnWidths = JSON.parse(JSON.stringify(DEFAULT_DATA.columnWidths));
      weeklyTimetable = JSON.parse(JSON.stringify(DEFAULT_DATA.weeklyTimetable));
      msuCalendarEvents = JSON.parse(JSON.stringify(DEFAULT_DATA.msuCalendarEvents));
      plannerEntries = JSON.parse(JSON.stringify(DEFAULT_DATA.plannerEntries));
      studentRoster = JSON.parse(JSON.stringify(DEFAULT_DATA.studentRoster));
      dailyNotes = JSON.parse(JSON.stringify(DEFAULT_DATA.dailyNotes));
      syllabusBacklog = [];
      currentWeekViewIndex = 1;
      selectedMonthFilter = 'all';

      saveAppState();
      semesterDates = generateSemesterDateList();
      Render.views('everything');
      closeTermSettingsModal();
      showToast("Data restored to verified defaults.");
    }
  );
}
