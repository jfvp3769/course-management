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
    indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.8)]"></span><span class="tracking-wide">Saving...</span>';
  }

  const doSave = () => {
    try {
      const calEvts = (typeof academicCalendarEvents !== 'undefined' ? academicCalendarEvents : msuCalendarEvents);
      const payload = {
        version: 2,
        updatedAt: new Date().toISOString(),
        semesterConfig,
        courseData,
        columnWidths,
        weeklyTimetable,
        academicCalendarEvents: calEvts,
        msuCalendarEvents: calEvts,
        plannerEntries,
        studentRoster,
        dailyNotes,
        syllabusBacklog,
        currentWeekViewIndex,
        selectedMonthFilter
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      if (indicator) {
        indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span><span class="tracking-wide">Saved Offline</span>';
      }
    } catch (e) {
      console.error("Storage error:", e);
      if (indicator) {
        indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 shadow-[0_0_6px_rgba(244,63,94,0.8)]"></span><span class="tracking-wide">Save Failed</span>';
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
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored && typeof LEGACY_STORAGE_KEY !== 'undefined') {
      stored = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        try { localStorage.setItem(STORAGE_KEY, stored); } catch (e) {}
      }
    }
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.semesterConfig) {
        semesterConfig = Object.assign({}, DEFAULT_DATA.semesterConfig, parsed.semesterConfig);
      }
      if (parsed.courseData) courseData = parsed.courseData;
      if (parsed.columnWidths) columnWidths = parsed.columnWidths;
      if (parsed.weeklyTimetable) weeklyTimetable = parsed.weeklyTimetable;
      const calEvts = parsed.academicCalendarEvents || parsed.msuCalendarEvents;
      if (calEvts) {
        msuCalendarEvents = calEvts;
        if (typeof academicCalendarEvents !== 'undefined') academicCalendarEvents = calEvts;
      }
      if (parsed.plannerEntries) plannerEntries = parsed.plannerEntries;
      if (parsed.studentRoster) studentRoster = parsed.studentRoster;
      if (parsed.dailyNotes) dailyNotes = parsed.dailyNotes;
      if (parsed.syllabusBacklog) syllabusBacklog = parsed.syllabusBacklog;
      if (parsed.currentWeekViewIndex) currentWeekViewIndex = parsed.currentWeekViewIndex;
      if (parsed.selectedMonthFilter) selectedMonthFilter = parsed.selectedMonthFilter;
      cleanupOrphanedStudents();
      if (typeof sortStudentRosterByName === 'function') {
        sortStudentRosterByName();
      }
      return true;
    }
  } catch (e) {
    console.warn("Could not load stored state, falling back to defaults.", e);
  }
  return false;
}

function exportBackupJSON() {
  const calEvts = (typeof academicCalendarEvents !== 'undefined' ? academicCalendarEvents : msuCalendarEvents);
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    semesterConfig,
    courseData,
    columnWidths,
    weeklyTimetable,
    academicCalendarEvents: calEvts,
    msuCalendarEvents: calEvts,
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
  a.setAttribute('download', 'Faculty_Course_Manager_Backup_' + new Date().toISOString().slice(0, 10) + '.json');
  a.click();
  recordBackupCompleted();
  showToast("Data backup file exported!");
}

function validateBackupStructure(data) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    return ['Backup file must contain a valid JSON object.'];
  }
  if (!data.semesterConfig || typeof data.semesterConfig !== 'object') {
    errors.push('Missing or invalid semesterConfig');
  }
  if (!data.courseData || typeof data.courseData !== 'object') {
    errors.push('Missing or invalid courseData');
  } else if (!Array.isArray(data.courseData.subjects)) {
    errors.push('courseData.subjects must be an array');
  }
  if (data.weeklyTimetable && !Array.isArray(data.weeklyTimetable)) {
    errors.push('weeklyTimetable must be an array');
  }
  if (data.studentRoster && !Array.isArray(data.studentRoster)) {
    errors.push('studentRoster must be an array');
  }
  const calArray = data.academicCalendarEvents || data.msuCalendarEvents;
  if (calArray && !Array.isArray(calArray)) {
    errors.push('academicCalendarEvents must be an array');
  }
  if (data.plannerEntries && (typeof data.plannerEntries !== 'object' || Array.isArray(data.plannerEntries))) {
    errors.push('plannerEntries must be an object');
  }
  if (data.dailyNotes && (typeof data.dailyNotes !== 'object' || Array.isArray(data.dailyNotes))) {
    errors.push('dailyNotes must be an object');
  }
  if (data.syllabusBacklog && !Array.isArray(data.syllabusBacklog)) {
    errors.push('syllabusBacklog must be an array');
  }
  return errors;
}

function importBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      const validationErrors = validateBackupStructure(data);
      if (validationErrors.length > 0) {
        showToast("Invalid backup: " + validationErrors[0], "⚠️");
        return;
      }

      semesterConfig = Object.assign({}, DEFAULT_DATA.semesterConfig, data.semesterConfig);
      applyHeaderBranding();

      courseData = data.courseData;
      columnWidths = data.columnWidths || columnWidths;
      weeklyTimetable = data.weeklyTimetable || weeklyTimetable;
      const calEvts = data.academicCalendarEvents || data.msuCalendarEvents;
      if (calEvts) {
        msuCalendarEvents = calEvts;
        if (typeof academicCalendarEvents !== 'undefined') academicCalendarEvents = calEvts;
      }
      plannerEntries = data.plannerEntries || plannerEntries;
      studentRoster = data.studentRoster || studentRoster;
      dailyNotes = data.dailyNotes || dailyNotes;
      syllabusBacklog = data.syllabusBacklog || [];

      cleanupOrphanedStudents();
      if (typeof sortStudentRosterByName === 'function') {
        sortStudentRosterByName();
      }
      saveAppState();
      semesterDates = generateSemesterDateList();
      Render.views('everything');
      recordBackupCompleted();
      showToast("Backup imported and restored successfully!");
      closeTermSettingsModal();
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
      if (typeof LEGACY_STORAGE_KEY !== 'undefined') {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
      semesterConfig = JSON.parse(JSON.stringify(DEFAULT_DATA.semesterConfig));
      applyHeaderBranding();

      courseData = JSON.parse(JSON.stringify(DEFAULT_DATA.courseData));
      columnWidths = JSON.parse(JSON.stringify(DEFAULT_DATA.columnWidths));
      weeklyTimetable = JSON.parse(JSON.stringify(DEFAULT_DATA.weeklyTimetable));
      const defCal = DEFAULT_DATA.academicCalendarEvents || DEFAULT_DATA.msuCalendarEvents;
      msuCalendarEvents = JSON.parse(JSON.stringify(defCal));
      if (typeof academicCalendarEvents !== 'undefined') academicCalendarEvents = msuCalendarEvents;
      plannerEntries = JSON.parse(JSON.stringify(DEFAULT_DATA.plannerEntries));
      studentRoster = JSON.parse(JSON.stringify(DEFAULT_DATA.studentRoster));
      dailyNotes = JSON.parse(JSON.stringify(DEFAULT_DATA.dailyNotes));
      syllabusBacklog = [];
      currentWeekViewIndex = 1;
      selectedMonthFilter = 'all';

      if (typeof sortStudentRosterByName === 'function') {
        sortStudentRosterByName();
      }
      saveAppState();
      semesterDates = generateSemesterDateList();
      Render.views('everything');
      closeTermSettingsModal();
      showToast("Data restored to initial defaults.");
    }
  );
}
