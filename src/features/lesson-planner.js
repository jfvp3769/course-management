/* ===========================================================================
 * LESSON ENTRY & SCHEDULE SHIFTING
 * ---------------------------------------------------------------------------
 * The lesson modal plus the shift-forward / pull-back algorithms that keep a
 * section's meetings consistent when a class is cancelled or moved.
 * Also owns the planner undo/redo stacks.
 * ======================================================================== */

function openLessonModal(dateKey, subject, section, isWeekend) {

  currentEditingCell = { dateKey, subject, section };
  const cellKey = dateKey + '__' + subject + '__' + section;
  const entry = plannerEntries[cellKey] || {};

  const dObj = (typeof semesterDates !== 'undefined' && Array.isArray(semesterDates))
    ? semesterDates.find(d => d.dateKey === dateKey)
    : null;
  const fullDay = dObj ? (FULL_DAY_NAMES[dObj.dayOfWeek] || dObj.dayOfWeek) : '';
  const scheduledSlot = (typeof weeklyTimetable !== 'undefined' && Array.isArray(weeklyTimetable))
    ? weeklyTimetable.find(t => t.course === subject && t.section === section && t.day === fullDay)
    : null;
  const isOutOfSchedule = !scheduledSlot;

  document.getElementById('modal-title').innerText = 'Plan Activity: ' + subject + ' (' + section + ')';
  let subtitle = 'Date: ' + dateKey;
  if (isOutOfSchedule) {
    subtitle += isWeekend ? ' • Weekend Session' : ' • Special / Makeup Session';
  }
  document.getElementById('modal-subtitle').innerText = subtitle;

  document.getElementById('modal-topic').value = entry.topic || '';
  document.getElementById('modal-activity').value = entry.activity || '';
  const defaultType = isOutOfSchedule ? 'Makeup Class' : 'Lecture';
  document.getElementById('modal-type').value = entry.type || defaultType;
  document.getElementById('modal-status').value = entry.status || 'Planned';
  document.getElementById('modal-notes').value = entry.notes || '';

  const fallbackSlot = (typeof weeklyTimetable !== 'undefined' && Array.isArray(weeklyTimetable))
    ? weeklyTimetable.find(t => t.course === subject && t.section === section)
    : null;

  const startTimeEl = document.getElementById('modal-start-time');
  const endTimeEl = document.getElementById('modal-end-time');
  const roomEl = document.getElementById('modal-room');
  if (startTimeEl) startTimeEl.value = entry.startTime || (scheduledSlot ? scheduledSlot.startTime : (fallbackSlot ? fallbackSlot.startTime : ''));
  if (endTimeEl) endTimeEl.value = entry.endTime || (scheduledSlot ? scheduledSlot.endTime : (fallbackSlot ? fallbackSlot.endTime : ''));
  if (roomEl) roomEl.value = entry.room || (scheduledSlot ? (scheduledSlot.room || '') : (fallbackSlot ? (fallbackSlot.room || '') : ''));

  const isNoClass = entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')));
  const hasExistingActivity = !isNoClass && entry && (
    (entry.topic && entry.topic.trim() && !entry.topic.toLowerCase().includes('no class')) ||
    (entry.activity && entry.activity.trim() && !entry.activity.toLowerCase().includes('no class'))
  );

  const shiftContainer = document.getElementById('modal-shift-actions');
  if (shiftContainer) {
    if (isOutOfSchedule) {
      shiftContainer.innerHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
              <span>⚡</span>
              <span>${isWeekend ? 'Weekend Session' : 'Special / Makeup Session'} (Out-of-Schedule)</span>
            </span>
          `;
    } else if (isNoClass) {
      const wasPushed = entry ? (entry.pushedForward !== false) : true;
      shiftContainer.innerHTML = `
            <button type="button" id="btn-remove-noclass-shift" onclick="removeNoClassFromModal()" class="h-9 px-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition" title="${wasPushed ? "Remove 'No Class' on this day and revert all subsequent planned meetings back to their original schedule" : "Remove 'No Class' marker on this day"}">
              <span class="text-sm font-black">↺</span>
              <span>${wasPushed ? 'Remove "No Class" & Revert Schedule' : 'Remove "No Class"'}</span>
            </button>
          `;
    } else {
      const markBtnText = hasExistingActivity ? 'Mark "No Class" & Push Forward' : 'Mark "No Class"';
      const markBtnTitle = hasExistingActivity
        ? 'Mark this day as No Class and push all subsequent planned meetings forward by 1 meeting slot'
        : 'Mark this empty day as No Class (no schedule shift)';

      shiftContainer.innerHTML = `
            <button type="button" id="btn-mark-noclass-shift" onclick="markMeetingAsNoClassAndShift()" class="h-9 px-3 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 rounded-lg font-bold text-xs border border-rose-300 inline-flex items-center gap-1.5 transition shadow-2xs" title="${markBtnTitle}">
              <span>🚫</span>
              <span>${markBtnText}</span>
            </button>
            <button type="button" id="btn-pullback-schedule" onclick="pullBackScheduleFromModal()" class="h-9 px-3 bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-700 rounded-lg font-bold text-xs border border-slate-300 inline-flex items-center gap-1.5 transition shadow-2xs" title="Pull Back to Prev Slot: Move this activity and subsequent schedule back to previous meeting slot">
              <span>◀</span>
              <span>Prev Slot</span>
            </button>
            <button type="button" id="btn-movelast-schedule" onclick="moveToNextViableSlotFromModal()" class="h-9 px-3 bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-700 rounded-lg font-bold text-xs border border-slate-300 inline-flex items-center gap-1.5 transition shadow-2xs" title="Move to Next Viable Slot: Move this activity forward to next meeting slot">
              <span>Next Slot</span>
              <span>▶</span>
            </button>
          `;
    }
  }
  updateUndoButtonState();

  document.getElementById('lesson-modal').classList.remove('hidden');
}

function closeLessonModal() {
  document.getElementById('lesson-modal').classList.add('hidden');
  currentEditingCell = null;
}

function toggleModalCompleteQuick() {
  const select = document.getElementById('modal-status');
  if (select) select.value = (select.value === 'Completed') ? 'Planned' : 'Completed';
}
if (typeof window !== 'undefined') window.toggleModalCompleteQuick = toggleModalCompleteQuick;

function saveLessonModalData() {
  if (!currentEditingCell) return;
  pushPlannerUndo('Save Lesson Activity');
  const { dateKey, subject, section } = currentEditingCell;
  const cellKey = dateKey + '__' + subject + '__' + section;

  const topic = document.getElementById('modal-topic').value.trim();
  const activity = document.getElementById('modal-activity').value.trim();
  const type = document.getElementById('modal-type').value;
  const status = document.getElementById('modal-status').value;
  const notes = document.getElementById('modal-notes').value.trim();
  const startTime = document.getElementById('modal-start-time') ? document.getElementById('modal-start-time').value : '';
  const endTime = document.getElementById('modal-end-time') ? document.getElementById('modal-end-time').value : '';
  const room = document.getElementById('modal-room') ? document.getElementById('modal-room').value.trim() : '';

  if (!topic && !activity) {
    delete plannerEntries[cellKey];
  } else {
    const savedData = { topic, activity, type, status, notes };
    if (startTime) savedData.startTime = startTime;
    if (endTime) savedData.endTime = endTime;
    if (room) savedData.room = room;
    plannerEntries[cellKey] = savedData;
  }

  saveAppState();
  closeLessonModal();
  Render.views('lesson');
  showToast('Lesson saved for ' + subject + ' (' + section + ') on ' + dateKey);
}

function clearLessonModalData() {
  if (!currentEditingCell) return;
  pushPlannerUndo('Clear Lesson Details');
  const { dateKey, subject, section } = currentEditingCell;
  const cellKey = dateKey + '__' + subject + '__' + section;
  delete plannerEntries[cellKey];
  if (document.getElementById('modal-start-time')) document.getElementById('modal-start-time').value = '';
  if (document.getElementById('modal-end-time')) document.getElementById('modal-end-time').value = '';
  if (document.getElementById('modal-room')) document.getElementById('modal-room').value = '';
  saveAppState();
  closeLessonModal();
  Render.views('lesson');
  showToast("Lesson details cleared.");
}

function pushPlannerUndo(actionName = 'Planner change') {
  plannerUndoStack.push({
    name: actionName,
    entries: deepClone(plannerEntries),
    timestamp: Date.now()
  });
  if (plannerUndoStack.length > MAX_PLANNER_HISTORY) plannerUndoStack.shift();
  // Performing a new action clears redo history
  plannerRedoStack = [];
  updateUndoRedoButtonState();
}

function updateUndoRedoButtonState() {
  const undoBtn = document.getElementById('btn-planner-undo');
  const redoBtn = document.getElementById('btn-planner-redo');
  const modalUndoBtn = document.getElementById('modal-undo-btn');
  const hasUndo = plannerUndoStack.length > 0;
  const hasRedo = plannerRedoStack.length > 0;

  if (undoBtn) {
    undoBtn.disabled = !hasUndo;
    if (hasUndo) {
      undoBtn.classList.remove('opacity-60', 'cursor-not-allowed');
      undoBtn.title = 'Undo: ' + plannerUndoStack[plannerUndoStack.length - 1].name + ' (Ctrl+Z)';
    } else {
      undoBtn.classList.add('opacity-60', 'cursor-not-allowed');
      undoBtn.title = 'No actions to undo (Ctrl+Z)';
    }
  }

  if (redoBtn) {
    redoBtn.disabled = !hasRedo;
    if (hasRedo) {
      redoBtn.classList.remove('opacity-60', 'cursor-not-allowed');
      redoBtn.title = 'Redo: ' + plannerRedoStack[plannerRedoStack.length - 1].name + ' (Ctrl+Y or Ctrl+Shift+Z)';
    } else {
      redoBtn.classList.add('opacity-60', 'cursor-not-allowed');
      redoBtn.title = 'No actions to redo (Ctrl+Y or Ctrl+Shift+Z)';
    }
  }

  if (modalUndoBtn) {
    if (hasUndo) modalUndoBtn.classList.remove('hidden');
    else modalUndoBtn.classList.add('hidden');
  }
}

// Alias for backward compatibility
const updateUndoButtonState = updateUndoRedoButtonState;

function undoPlannerAction() {
  if (plannerUndoStack.length === 0) {
    showToast('No actions to undo.', 'ℹ️');
    return;
  }
  const last = plannerUndoStack.pop();
  // Save current state into redo stack before restoring previous state
  plannerRedoStack.push({
    name: last.name,
    entries: deepClone(plannerEntries),
    timestamp: Date.now()
  });
  if (plannerRedoStack.length > MAX_PLANNER_HISTORY) plannerRedoStack.shift();

  plannerEntries = deepClone(last.entries);
  Render.after('lessonUndo');
  showToast('Undid: ' + last.name + '. Schedule restored!', '↺');
}

function redoPlannerAction() {
  if (plannerRedoStack.length === 0) {
    showToast('No actions to redo.', 'ℹ️');
    return;
  }
  const next = plannerRedoStack.pop();
  // Save current state into undo stack before applying redone state
  plannerUndoStack.push({
    name: next.name,
    entries: deepClone(plannerEntries),
    timestamp: Date.now()
  });
  if (plannerUndoStack.length > MAX_PLANNER_HISTORY) plannerUndoStack.shift();

  plannerEntries = deepClone(next.entries);
  Render.after('lessonUndo');
  showToast('Redid: ' + next.name + '. Changes reapplied!', '↻');
}

// Attach Ctrl+Z / Cmd+Z (Undo) and Ctrl+Y / Ctrl+Shift+Z (Redo) shortcuts
window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  const isCmdOrCtrl = e.ctrlKey || e.metaKey;
  if (!isCmdOrCtrl) return;

  if (e.key.toLowerCase() === 'z') {
    e.preventDefault();
    if (e.shiftKey) {
      redoPlannerAction();
    } else {
      undoPlannerAction();
    }
  } else if (e.key.toLowerCase() === 'y') {
    e.preventDefault();
    redoPlannerAction();
  }
});

function closeModalAnimated(modal) {
  if (!modal || modal.classList.contains('hidden')) return;
  modal.classList.add('modal-closing');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('modal-closing');
  }, 150);
}

// Global Escape key modal dismisser
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('div[id$="-modal"]:not(.hidden)').forEach(m => closeModalAnimated(m));
    if (typeof pendingConfirmationAction !== 'undefined') pendingConfirmationAction = null;
    if (typeof currentEditingCell !== 'undefined') currentEditingCell = null;
  }
});

function getScheduledDatesForSection(subject, section) {
  const subDays = weeklyTimetable.filter(t => t.course === subject && t.section === section).map(t => t.day);
  return semesterDates.filter(d => {
    const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
    return !d.isWeekend && !d.isNoClassDate && subDays.includes(fullDay);
  });
}

function shiftScheduleForward(dateKey, subject, section) {
  const slots = getScheduledDatesForSection(subject, section);
  const startIdx = slots.findIndex(d => d.dateKey === dateKey);
  if (startIdx === -1 || startIdx >= slots.length - 1) return false;

  let lastFilledIdx = -1;
  for (let i = slots.length - 1; i >= startIdx; i--) {
    const k = slots[i].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[k]) {
      lastFilledIdx = i;
      break;
    }
  }

  const shiftEnd = lastFilledIdx !== -1 ? Math.min(slots.length - 2, lastFilledIdx) : startIdx;

  for (let i = shiftEnd; i >= startIdx; i--) {
    const currKey = slots[i].dateKey + '__' + subject + '__' + section;
    const nextKey = slots[i + 1].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[currKey]) {
      plannerEntries[nextKey] = plannerEntries[currKey];
      delete plannerEntries[currKey];
    } else {
      delete plannerEntries[nextKey];
    }
  }
  return true;
}

// Pull current meeting and all subsequent meetings back to the previous scheduled slot!
function pullMeetingBackward(dateKey, subject, section) {
  const slots = getScheduledDatesForSection(subject, section);
  const currIdx = slots.findIndex(d => d.dateKey === dateKey);
  if (currIdx <= 0) return false;

  const prevIdx = currIdx - 1;

  let lastFilledIdx = -1;
  for (let i = slots.length - 1; i >= currIdx; i--) {
    const k = slots[i].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[k]) {
      lastFilledIdx = i;
      break;
    }
  }

  const shiftEnd = lastFilledIdx !== -1 ? lastFilledIdx : currIdx;

  for (let i = prevIdx; i < shiftEnd; i++) {
    const currKey = slots[i].dateKey + '__' + subject + '__' + section;
    const nextKey = slots[i + 1].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[nextKey]) {
      plannerEntries[currKey] = plannerEntries[nextKey];
      delete plannerEntries[nextKey];
    } else {
      delete plannerEntries[currKey];
    }
  }
  delete plannerEntries[slots[shiftEnd].dateKey + '__' + subject + '__' + section];
  return true;
}

// Remove No Class on dateKey and pull subsequent meetings back into dateKey
function removeNoClassAndShiftBack(dateKey, subject, section) {
  const slots = getScheduledDatesForSection(subject, section);
  const startIdx = slots.findIndex(d => d.dateKey === dateKey);
  if (startIdx === -1) return false;

  let lastFilledIdx = -1;
  for (let i = slots.length - 1; i > startIdx; i--) {
    const k = slots[i].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[k]) {
      lastFilledIdx = i;
      break;
    }
  }

  if (lastFilledIdx === -1) {
    delete plannerEntries[dateKey + '__' + subject + '__' + section];
    return true;
  }

  for (let i = startIdx; i < lastFilledIdx; i++) {
    const currKey = slots[i].dateKey + '__' + subject + '__' + section;
    const nextKey = slots[i + 1].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[nextKey]) {
      plannerEntries[currKey] = plannerEntries[nextKey];
      delete plannerEntries[nextKey];
    } else {
      delete plannerEntries[currKey];
    }
  }
  delete plannerEntries[slots[lastFilledIdx].dateKey + '__' + subject + '__' + section];
  return true;
}

function markMeetingAsNoClassAndShift() {
  if (!currentEditingCell) return;
  const { dateKey, subject, section } = currentEditingCell;
  const cellKey = dateKey + '__' + subject + '__' + section;
  const entry = plannerEntries[cellKey];

  // Only push forward when marking an existing planned activity with "No Class".
  // If marking on an empty activity, keep schedule in place!
  const hasExistingActivity = entry && (
    (entry.topic && entry.topic.trim() && !entry.topic.toLowerCase().includes('no class')) ||
    (entry.activity && entry.activity.trim() && !entry.activity.toLowerCase().includes('no class'))
  );

  if (hasExistingActivity) {
    pushPlannerUndo('Mark No Class & Push on ' + dateKey);
    shiftScheduleForward(dateKey, subject, section);
  } else {
    pushPlannerUndo('Mark No Class on ' + dateKey);
  }

  plannerEntries[cellKey] = {
    topic: "No Class / Session Suspended",
    activity: "Class suspended",
    type: "No Class",
    status: "Cancelled",
    notes: "Marked as No Class",
    pushedForward: hasExistingActivity ? true : false
  };

  saveAppState();
  closeLessonModal();
  Render.views('lesson');

  if (hasExistingActivity) {
    showToast('Marked ' + dateKey + ' as No Class & pushed planned meetings forward. (Click Undo to revert)', '🚫');
  } else {
    showToast('Marked ' + dateKey + ' as No Class.', '🚫');
  }
}

function removeNoClassFromModal() {
  if (!currentEditingCell) return;
  const { dateKey, subject, section } = currentEditingCell;
  const cellKey = dateKey + '__' + subject + '__' + section;
  const entry = plannerEntries[cellKey];
  const wasPushed = entry ? (entry.pushedForward !== false) : true;

  pushPlannerUndo('Remove No Class on ' + dateKey);

  if (wasPushed) {
    removeNoClassAndShiftBack(dateKey, subject, section);
    showToast('Removed "No Class" on ' + dateKey + ' and reverted schedule back.', '↺');
  } else {
    delete plannerEntries[cellKey];
    showToast('Removed "No Class" on ' + dateKey + '.', '↺');
  }

  saveAppState();
  closeLessonModal();
  Render.views('lesson');
}

function pullBackScheduleFromModal() {
  if (!currentEditingCell) return;
  const { dateKey, subject, section } = currentEditingCell;
  const slots = getScheduledDatesForSection(subject, section);
  const currIdx = slots.findIndex(d => d.dateKey === dateKey);

  if (currIdx <= 0) {
    showToast('Cannot pull back: This is already the first scheduled meeting of the semester.', '⚠️');
    return;
  }

  // Preserve any edits currently typed in modal before moving
  const topic = document.getElementById('modal-topic')?.value.trim() || '';
  const activity = document.getElementById('modal-activity')?.value.trim() || '';
  const type = document.getElementById('modal-type')?.value || 'Lecture';
  const status = document.getElementById('modal-status')?.value || 'Planned';
  const notes = document.getElementById('modal-notes')?.value.trim() || '';
  const cellKey = dateKey + '__' + subject + '__' + section;
  if (topic || activity) {
    plannerEntries[cellKey] = { topic, activity, type, status, notes };
  }

  const prevDateKey = slots[currIdx - 1].dateKey;
  const prevEntry = plannerEntries[prevDateKey + '__' + subject + '__' + section];

  if (prevEntry && prevEntry.type !== 'No Class' && prevEntry.topic) {
    showConfirmation(
      "Pull Back Meeting Schedule",
      'The previous meeting slot on ' + prevDateKey + ' already has "' + prevEntry.topic + '". Are you sure you want to pull back this meeting into ' + prevDateKey + '?',
      () => {
        pushPlannerUndo('Pull Back to ' + prevDateKey);
        pullMeetingBackward(dateKey, subject, section);
        saveAppState();
        closeLessonModal();
        Render.views('planner');
        showToast('Pulled meeting back to ' + prevDateKey + '.', '◀');
      }
    );
    return;
  }

  pushPlannerUndo('Pull Back to ' + prevDateKey);
  pullMeetingBackward(dateKey, subject, section);
  saveAppState();
  closeLessonModal();
  Render.views('planner');
  showToast('Pulled meeting and subsequent schedule back to ' + prevDateKey + '.', '◀');
}

function moveToNextViableSlotFromModal() {
  if (!currentEditingCell) return;
  const { dateKey, subject, section } = currentEditingCell;
  const slots = getScheduledDatesForSection(subject, section);
  const currIdx = slots.findIndex(d => d.dateKey === dateKey);

  if (currIdx === -1 || currIdx >= slots.length - 1) {
    showToast('Cannot move forward: This is already the last scheduled meeting of the semester.', '⚠️');
    return;
  }

  const nextDateKey = slots[currIdx + 1].dateKey;

  // Preserve any edits currently typed in modal before moving
  const topic = document.getElementById('modal-topic')?.value.trim() || '';
  const activity = document.getElementById('modal-activity')?.value.trim() || '';
  const type = document.getElementById('modal-type')?.value || 'Lecture';
  const status = document.getElementById('modal-status')?.value || 'Planned';
  const notes = document.getElementById('modal-notes')?.value.trim() || '';
  const cellKey = dateKey + '__' + subject + '__' + section;
  if (topic || activity) {
    plannerEntries[cellKey] = { topic, activity, type, status, notes };
  }

  if (!plannerEntries[cellKey]) {
    showToast('Current meeting slot has no activity to move.', 'ℹ️');
    return;
  }

  let lastFilledIdx = -1;
  for (let i = slots.length - 1; i >= currIdx; i--) {
    const k = slots[i].dateKey + '__' + subject + '__' + section;
    if (plannerEntries[k]) {
      lastFilledIdx = i;
      break;
    }
  }

  if (lastFilledIdx === slots.length - 1) {
    showConfirmation(
      "Move to Next Viable Slot",
      'The final meeting slot on ' + slots[slots.length - 1].dateKey + ' is already occupied. Moving forward will displace schedule past semester end. Do you wish to proceed?',
      () => {
        pushPlannerUndo('Move to Next Slot (' + nextDateKey + ')');
        shiftScheduleForward(dateKey, subject, section);
        saveAppState();
        closeLessonModal();
        Render.views('planner');
        showToast('Moved activity forward to ' + nextDateKey + '.', '▶');
      }
    );
    return;
  }

  pushPlannerUndo('Move to Next Slot (' + nextDateKey + ')');
  shiftScheduleForward(dateKey, subject, section);
  saveAppState();
  closeLessonModal();
  Render.views('planner');
  showToast('Moved activity to next viable slot (' + nextDateKey + ').', '▶');
}
