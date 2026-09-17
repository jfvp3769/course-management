/* ===========================================================================
 * DECLARE NO CLASS
 * ---------------------------------------------------------------------------
 * Bulk-marks dates as no-class and cascades the schedule shift.
 * ======================================================================== */

function openDeclareNoClassModal() {
  noClassSelectedDays = [];
  document.getElementById('noclass-date').value = semesterConfig.startDate;
  document.getElementById('noclass-start-date').value = semesterConfig.startDate;
  document.getElementById('noclass-end-date').value = semesterConfig.startDate;
  document.getElementById('noclass-picker-input').value = semesterConfig.startDate;
  document.getElementById('noclass-reason').value = "University Suspension";
  setNoClassMode('single');
  renderNoClassChips();
  document.getElementById('declare-noclass-modal').classList.remove('hidden');
}

function closeDeclareNoClassModal() {
  document.getElementById('declare-noclass-modal').classList.add('hidden');
}

function setNoClassMode(mode) {
  noClassCurrentMode = mode;
  const modes = ['single', 'range', 'multi'];

  modes.forEach(m => {
    const btn = document.getElementById('noclass-mode-btn-' + m);
    const container = document.getElementById('noclass-container-' + m);
    if (m === mode) {
      if (btn) btn.className = "py-1 px-2 font-bold rounded-lg bg-white shadow-xs text-slate-900 transition";
      if (container) container.classList.remove('hidden');
    } else {
      if (btn) btn.className = "py-1 px-2 font-medium rounded-lg text-slate-600 hover:text-slate-900 transition";
      if (container) container.classList.add('hidden');
    }
  });
}

function addSelectedNoClassDay() {
  const val = document.getElementById('noclass-picker-input').value;
  if (!val) return;
  if (!noClassSelectedDays.includes(val)) {
    noClassSelectedDays.push(val);
    noClassSelectedDays.sort();
    renderNoClassChips();
  }
}

function removeNoClassDay(dateStr) {
  noClassSelectedDays = noClassSelectedDays.filter(d => d !== dateStr);
  renderNoClassChips();
}

function renderNoClassChips() {
  const container = document.getElementById('noclass-chips-list');
  if (!container) return;

  if (noClassSelectedDays.length === 0) {
    container.innerHTML = '<span class="text-slate-400 italic text-[11px] self-center">No additional days selected yet</span>';
    return;
  }

  container.innerHTML = noClassSelectedDays.map(d => `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
          <span>${d}</span>
          <button type="button" onclick="removeNoClassDay('${jsAttr(d)}')" class="text-rose-600 hover:text-rose-900 font-extrabold text-sm leading-none">&times;</button>
        </span>
      `).join('');
}

function submitDeclareNoClass() {
  const reason = document.getElementById('noclass-reason').value.trim() || "Suspension";
  const shouldShift = document.getElementById('noclass-shift-checkbox').checked;
  let targetDates = [];

  if (noClassCurrentMode === 'single') {
    const d = document.getElementById('noclass-date').value;
    if (d) targetDates.push(d);
  } else if (noClassCurrentMode === 'range') {
    const start = document.getElementById('noclass-start-date').value;
    const end = document.getElementById('noclass-end-date').value;

    if (!start || !end) {
      showToast("Please choose start and end dates.", "⚠️");
      return;
    }
    if (start > end) {
      showToast("Start date must be before end date.", "⚠️");
      return;
    }

    let curr = new Date(start + "T00:00:00");
    const stop = new Date(end + "T00:00:00");

    while (curr <= stop) {
      const y = curr.getFullYear();
      const m = String(curr.getMonth() + 1).padStart(2, '0');
      const day = String(curr.getDate()).padStart(2, '0');
      targetDates.push(y + '-' + m + '-' + day);
      curr.setDate(curr.getDate() + 1);
    }
  } else if (noClassCurrentMode === 'multi') {
    const primary = document.getElementById('noclass-picker-input').value;
    if (primary && !noClassSelectedDays.includes(primary)) {
      noClassSelectedDays.push(primary);
    }
    targetDates = [...noClassSelectedDays];
  }

  if (targetDates.length === 0) {
    showToast("Please select at least one date.", "⚠️");
    return;
  }

  targetDates.sort();

  targetDates.forEach(dateKey => {
    let calEvt = msuCalendarEvents.find(e => e.dateKey === dateKey);
    if (calEvt) {
      calEvt.isNoClass = true;
      calEvt.activity = reason;
    } else {
      msuCalendarEvents.push({
        num: "-",
        activity: reason,
        firstSem: dateKey,
        secondSem: "—",
        summer: "—",
        dateKey: dateKey,
        isNoClass: true,
        type: "holiday"
      });
    }

    dailyNotes[dateKey] = reason;
  });

  // Update semester dates so suspension dates are recognized
  semesterDates = generateSemesterDateList();

  if (shouldShift) {
    targetDates.forEach(dateKey => {
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => {
          const cellKey = dateKey + '__' + sub.code + '__' + sec;
          const existing = plannerEntries[cellKey];
          if (existing && existing.type !== 'No Class') {
            delete plannerEntries[cellKey];
            const secDays = weeklyTimetable.filter(t => t.course === sub.code && t.section === sec).map(t => t.day);
            const futureDates = semesterDates.filter(d => {
              const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
              return d.dateKey > dateKey && !d.isWeekend && !d.isNoClassDate && secDays.includes(fullDay);
            });

            let toInsert = existing;
            for (let i = 0; i < futureDates.length; i++) {
              const nextKey = futureDates[i].dateKey + '__' + sub.code + '__' + sec;
              const displaced = plannerEntries[nextKey];
              plannerEntries[nextKey] = toInsert;
              if (!displaced) {
                toInsert = null;
                break;
              }
              toInsert = displaced;
            }
            if (toInsert && Array.isArray(syllabusBacklog)) {
              syllabusBacklog.push({
                subject: sub.code,
                section: sec,
                entry: toInsert,
                displacedDate: dateKey
              });
            }
          }
        });
      });
    });
  }

  populateMonthFilter();
  saveAppState();
  closeDeclareNoClassModal();
  Render.views('calendar');
  showToast('Applied suspension to ' + targetDates.length + ' day(s).');
}

function openUploadCalendarModal() {
  document.getElementById('upload-calendar-modal').classList.remove('hidden');
}

function closeUploadCalendarModal() {
  document.getElementById('upload-calendar-modal').classList.add('hidden');
}
