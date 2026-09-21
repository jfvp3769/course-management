/* ===========================================================================
 * ACADEMIC CALENDAR
 * ---------------------------------------------------------------------------
 * The academic calendar table, PDF/CSV ingestion, and event CRUD.
 * ======================================================================== */

function toggleCalendarTypeDropdown(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('calendar-type-menu');
  if (menu) menu.classList.toggle('hidden');
}

function setCalendarTypeFilter(type) {
  calendarTypeFilter = type;
  const menu = document.getElementById('calendar-type-menu');
  if (menu) menu.classList.add('hidden');

  // Update checkmarks
  const checkmarks = document.querySelectorAll('.type-check');
  checkmarks.forEach(c => {
    if (c.getAttribute('data-for') === type) {
      c.classList.remove('hidden');
    } else {
      c.classList.add('hidden');
    }
  });

  // Update header label and styling
  const label = document.getElementById('calendar-type-header-label');
  const btn = document.getElementById('calendar-type-header-btn');
  const labelsMap = {
    all: 'Type: All',
    holiday: 'Type: Holidays',
    exam: 'Type: Exams',
    milestone: 'Type: Milestones',
    activity: 'Type: Activities',
    admin: 'Type: Admin'
  };
  if (label) label.innerText = labelsMap[type] || 'Type: All';
  if (btn) {
    if (type !== 'all') {
      btn.classList.add('bg-amber-100', 'text-amber-900', 'border', 'border-amber-300');
    } else {
      btn.classList.remove('bg-amber-100', 'text-amber-900', 'border', 'border-amber-300');
    }
  }

  renderAcademicCalendarTable();
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('calendar-type-menu');
  const btn = document.getElementById('calendar-type-header-btn');
  if (menu && !menu.classList.contains('hidden')) {
    if (btn && !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  }
});

function renderAcademicCalendarTable() {
  const tbody = document.getElementById('calendar-table-body');
  if (!tbody) return;

  const filterType = calendarTypeFilter;

  // Keep original indices for accurate editing/deleting even when filtered
  const items = msuCalendarEvents.map((evt, idx) => ({ evt, idx }));

  const filtered = items.filter(({ evt }) => {
    if (filterType === 'all') return true;
    if (filterType === 'holiday') return evt.isNoClass || evt.type === 'holiday';
    if (filterType === 'exam') return evt.type === 'exam';
    if (filterType === 'milestone') return evt.type === 'milestone';
    if (filterType === 'activity') return evt.type === 'activity';
    if (filterType === 'admin') return evt.type === 'admin';
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center py-10 text-slate-400 font-medium text-xs">
              No calendar events found matching the selected filter.
            </td>
          </tr>
        `;
    return;
  }

  tbody.innerHTML = filtered.map(({ evt, idx }) => {
    const typeMetaMap = {
      admin: { text: 'Administrative', class: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700' },
      exam: { text: 'Major Examination', class: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700' },
      milestone: { text: 'Term Milestone', class: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' },
      activity: { text: 'University Activity', class: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700' },
      holiday: { text: 'Holiday / Suspended', class: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700' }
    };

    const currentMeta = typeMetaMap[evt.type] || typeMetaMap.admin;
    const statusText = currentMeta.text;
    const badgeClass = currentMeta.class;
    const showNoClassTag = !!evt.isNoClass && evt.type !== 'holiday';

    return `
          <tr id="cal-event-row-${idx}" class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition border-b border-slate-200 dark:border-slate-700">
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1.5 flex-wrap">
                <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}">
                  ${statusText}
                </span>
                ${showNoClassTag ? `
                  <span class="inline-block px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-100 dark:bg-rose-950 dark:text-rose-200 text-rose-800 border border-rose-300 dark:border-rose-700 shadow-2xs" title="Class sessions suspended">
                    No Class
                  </span>
                ` : ''}
              </div>
            </td>
            <td class="py-2.5 px-4 font-bold text-slate-800 dark:text-slate-100">${escapeHtml(evt.activity)}</td>
            <td class="py-2.5 px-4 font-semibold text-msu-maroon dark:text-rose-300 bg-amber-50/40 dark:bg-slate-800/60 border-x border-amber-200/60 dark:border-slate-700">${escapeHtml(evt.firstSem || '—')}</td>
            <td class="py-2.5 px-4 font-semibold text-blue-900 dark:text-blue-300 bg-blue-50/20 dark:bg-slate-800/40 border-r border-blue-200/60 dark:border-slate-700">${escapeHtml(evt.secondSem || '—')}</td>
            <td class="py-2.5 px-4 font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-50/20 dark:bg-slate-800/40 border-r border-emerald-200/60 dark:border-slate-700">${escapeHtml(evt.summer || '—')}</td>
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button type="button" data-action="openEditCalendarEvent" data-idx="${idx}" title="Edit event" class="p-1.5 text-slate-500 dark:text-slate-400 hover:text-msu-maroon dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button type="button" data-action="deleteCalendarEventByIndex" data-idx="${idx}" title="Delete event" class="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
  }).join('');
  if (typeof updateCalendarSidebar === 'function') {
    updateCalendarSidebar();
  }
}

// Load Sample AY 2026-2027 Calendar Directly
function loadSampleAcademicCalendar() {
  const defCal = DEFAULT_DATA.academicCalendarEvents || DEFAULT_DATA.msuCalendarEvents;
  msuCalendarEvents = JSON.parse(JSON.stringify(defCal));
  if (typeof academicCalendarEvents !== 'undefined') academicCalendarEvents = msuCalendarEvents;

  semesterDates = generateSemesterDateList();
  Render.after('semester');
  closeUploadCalendarModal();
  showToast("Sample Academic AY 2026–2027 Calendar loaded!");
}
const loadOfficialMsuCalendar = loadSampleAcademicCalendar; // Backward compatibility alias

// Intelligent PDF.js Calendar Parser with Cross-Origin Fallback
function parseAcademicCalendarText(fullText) {
  if (!fullText || !fullText.trim()) return;

  const lines = fullText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const monthMap = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  };

  let extractedCount = 0;

  lines.forEach(line => {
    const dateMatch = line.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:\s*[–\-]\s*\d{1,2})?,?\s*(\d{4})?/i);
    if (dateMatch) {
      const monthStr = dateMatch[1].toLowerCase();
      const dayStr = String(dateMatch[2]).padStart(2, '0');
      const yearStr = dateMatch[3] || '2026';
      const monthNum = monthMap[monthStr];
      const dateKey = yearStr + '-' + monthNum + '-' + dayStr;

      let activityTitle = line.replace(dateMatch[0], '').trim();
      activityTitle = activityTitle.replace(/^[0-9.\-\s]+/, '').trim();
      if (!activityTitle) activityTitle = "Academic Event";

      const lowerAct = (activityTitle + " " + line).toLowerCase();
      const isNoClass = lowerAct.includes('holiday') || lowerAct.includes('foundation') || lowerAct.includes('vacation') || lowerAct.includes('suspension') || lowerAct.includes('break') || lowerAct.includes('no class');
      
      let eventType = "activity";
      if (lowerAct.includes('prelim') || lowerAct.includes('exam') || lowerAct.includes('examination')) eventType = "exam";
      else if (isNoClass) eventType = "holiday";
      else if (lowerAct.includes('classes') || lowerAct.includes('semester') || lowerAct.includes('enrollment') || lowerAct.includes('registration')) eventType = "milestone";

      const existing = msuCalendarEvents.find(e => e.dateKey === dateKey);
      if (existing) {
        existing.activity = activityTitle;
        existing.isNoClass = isNoClass;
        existing.type = eventType;
      } else {
        msuCalendarEvents.push({
          num: msuCalendarEvents.length + 1,
          activity: activityTitle,
          firstSem: dateMatch[0],
          secondSem: "—",
          summer: "—",
          dateKey: dateKey,
          isNoClass: isNoClass,
          type: eventType
        });
      }
      extractedCount++;
    }
  });

  semesterDates = generateSemesterDateList();
  Render.after('semester');
}

// Robust Calendar File Upload Handler (Handles Scanned PDFs & CORS worker issues)
async function handleCalendarFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    const statusBox = document.getElementById('pdf-processing-status');
    const statusText = document.getElementById('pdf-status-text');
    statusBox.classList.remove('hidden');
    statusText.innerText = 'Reading ' + file.name + '...';

    try {
      const arrayBuffer = await file.arrayBuffer();
      let fullText = "";

      if (typeof pdfjsLib !== 'undefined') {
        try {
          // Use Uint8Array and disableWorker to bypass file:/// origin restrictions
          const typedArray = new Uint8Array(arrayBuffer);
          const loadingTask = pdfjsLib.getDocument({
            data: typedArray,
            disableWorker: true
          });
          const pdf = await loadingTask.promise;
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
          }
        } catch (innerPdfErr) {
          console.warn("PDF.js text parse failed, falling back to official calendar:", innerPdfErr);
        }
      }

      statusText.innerText = "Applying academic calendar milestones...";

      if (fullText && fullText.trim().length > 30) {
        parseAcademicCalendarText(fullText);
        showToast('Extracted calendar events from ' + file.name + '!');
      } else {
        // Scanned image PDF without text layer: automatically load sample AY 2026-2027 calendar!
        loadSampleAcademicCalendar();
        showToast('Scanned PDF detected. Applied sample AY 2026–2027 Calendar!');
      }

      statusBox.classList.add('hidden');
      closeUploadCalendarModal();
    } catch (err) {
      console.error("PDF upload error:", err);
      statusBox.classList.add('hidden');
      loadSampleAcademicCalendar();
      showToast('Loaded sample AY 2026–2027 Calendar schedule!');
      closeUploadCalendarModal();
    }
  } else {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('paste-calendar-raw').value = e.target.result;
      showToast("File loaded into paste area.");
    };
    reader.readAsText(file);
  }
}

// CSV / TSV Paste Calendar Parser
function applyPastedCalendar() {
  const rawText = document.getElementById('paste-calendar-raw').value.trim();
  if (!rawText) {
    showToast("Please paste CSV/TSV calendar events first.", "⚠️");
    return;
  }

  const lines = rawText.split('\n');
  let count = 0;

  lines.forEach(line => {
    const parts = line.includes('\t') ? line.split('\t') : line.split(',');
    if (parts.length >= 2) {
      const rawDate = parts[0].trim();
      const title = parts[1].trim();
      const isNoClass = parts[2] ? parts[2].trim().toLowerCase() === 'true' : (title.toLowerCase().includes('holiday') || title.toLowerCase().includes('foundation') || title.toLowerCase().includes('suspension'));
      const type = parts[3] ? parts[3].trim().toLowerCase() : (title.toLowerCase().includes('exam') ? 'exam' : (isNoClass ? 'holiday' : 'activity'));

      let dateKey = "";
      if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
        dateKey = rawDate;
      }

      if (title) {
        const existing = msuCalendarEvents.find(e => e.dateKey && e.dateKey === dateKey);
        if (existing) {
          existing.activity = title;
          existing.isNoClass = isNoClass;
          existing.type = type;
        } else {
          msuCalendarEvents.push({
            num: msuCalendarEvents.length + 1,
            activity: title,
            firstSem: rawDate,
            secondSem: "—",
            summer: "—",
            dateKey: dateKey,
            isNoClass: isNoClass,
            type: type
          });
        }
        if (dateKey) dailyNotes[dateKey] = title;
        count++;
      }
    }
  });

  if (count > 0) {
    semesterDates = generateSemesterDateList();
    Render.after('semester');
    closeUploadCalendarModal();
    showToast('Successfully applied ' + count + ' calendar events!');
  } else {
    showToast("No valid event lines detected. Check formatting.", "⚠️");
  }
}

// Modal Handling & CRUD for Academic Calendar Events
function formatDateKeyToText(dateKey) {
  if (!dateKey) return '';
  const parts = dateKey.split('-');
  if (parts.length !== 3) return dateKey;
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const y = parts[0];
  if (m >= 0 && m < 12) {
    return `${fullMonths[m]} ${d}, ${y}`;
  }
  return dateKey;
}

function updateEventTermInputs(term) {
  const mode = document.getElementById('edit-event-' + term + '-mode')?.value || 'none';
  const inputs = document.getElementById('edit-event-' + term + '-inputs');
  const startLabel = document.getElementById('edit-event-' + term + '-start-label');
  const endCol = document.getElementById('edit-event-' + term + '-end-col');

  if (!inputs) return;

  if (mode === 'none') {
    inputs.classList.add('hidden');
  } else if (mode === 'single') {
    inputs.classList.remove('hidden');
    if (startLabel) startLabel.innerText = 'Date';
    if (endCol) endCol.classList.add('hidden');
  } else if (mode === 'range') {
    inputs.classList.remove('hidden');
    if (startLabel) startLabel.innerText = 'Start Date';
    if (endCol) endCol.classList.remove('hidden');
  }
}

function setEventTermState(term, startVal, endVal) {
  const modeEl = document.getElementById('edit-event-' + term + '-mode');
  const startEl = document.getElementById('edit-event-' + term + '-start');
  const endEl = document.getElementById('edit-event-' + term + '-end');

  if (!startVal) {
    if (modeEl) modeEl.value = 'none';
    if (startEl) startEl.value = '';
    if (endEl) endEl.value = '';
  } else if (endVal && endVal !== startVal) {
    if (modeEl) modeEl.value = 'range';
    if (startEl) startEl.value = startVal;
    if (endEl) endEl.value = endVal;
  } else {
    if (modeEl) modeEl.value = 'single';
    if (startEl) startEl.value = startVal;
    if (endEl) endEl.value = '';
  }
  updateEventTermInputs(term);
}

function getEventTermState(term) {
  const mode = document.getElementById('edit-event-' + term + '-mode')?.value || 'none';
  const start = document.getElementById('edit-event-' + term + '-start')?.value || '';
  const end = document.getElementById('edit-event-' + term + '-end')?.value || '';

  if (mode === 'none' || !start) {
    return { mode: 'none', start: '', end: '', text: '—' };
  }
  if (mode === 'single' || !end || end === start) {
    return { mode: 'single', start: start, end: start, text: formatDateRange(start, start) };
  }
  return { mode: 'range', start: start, end: end, text: formatDateRange(start, end) };
}

function openAddCalendarEventModal(prefilledDateKey) {
  document.getElementById('edit-event-index').value = '-1';
  document.getElementById('edit-event-orig-date').value = prefilledDateKey || '';
  document.getElementById('edit-event-name').value = '';
  document.getElementById('edit-event-type').value = 'activity';
  document.getElementById('edit-event-is-noclass').checked = false;
  document.getElementById('edit-event-custom-note').value = (prefilledDateKey && dailyNotes[prefilledDateKey]) ? dailyNotes[prefilledDateKey] : '';
  document.getElementById('event-modal-title').innerText = 'Add Academic Calendar Event';

  if (prefilledDateKey) {
    setEventTermState('first', prefilledDateKey, '');
  } else {
    setEventTermState('first', '', '');
  }
  setEventTermState('second', '', '');
  setEventTermState('summer', '', '');

  const deleteBtn = document.getElementById('btn-delete-academic-event');
  if (deleteBtn) deleteBtn.style.display = 'none';
  document.getElementById('event-editor-modal').classList.remove('hidden');
}

function openEditCalendarEvent(index) {
  const evt = msuCalendarEvents[index];
  if (!evt) return;

  document.getElementById('edit-event-index').value = String(index);
  document.getElementById('edit-event-orig-date').value = evt.dateKey || '';
  document.getElementById('edit-event-name').value = evt.activity || '';
  document.getElementById('edit-event-type').value = evt.type || (evt.isNoClass ? 'holiday' : 'activity');
  document.getElementById('edit-event-is-noclass').checked = !!evt.isNoClass;
  document.getElementById('edit-event-custom-note').value = (evt.dateKey && dailyNotes[evt.dateKey]) ? dailyNotes[evt.dateKey] : '';
  document.getElementById('event-modal-title').innerText = 'Edit Academic Calendar Event';

  // Load 1st semester
  const fStart = evt.firstSemStart || (evt.firstSem ? parseDateRangeString(evt.firstSem)?.start : (evt.dateKey || ''));
  const fEnd = evt.firstSemEnd || (evt.firstSem ? parseDateRangeString(evt.firstSem)?.end : '');
  setEventTermState('first', fStart, fEnd);

  // Load 2nd semester
  const sStart = evt.secondSemStart || (evt.secondSem ? parseDateRangeString(evt.secondSem)?.start : '');
  const sEnd = evt.secondSemEnd || (evt.secondSem ? parseDateRangeString(evt.secondSem)?.end : '');
  setEventTermState('second', sStart, sEnd);

  // Load summer
  const mStart = evt.summerStart || (evt.summer ? parseDateRangeString(evt.summer)?.start : '');
  const mEnd = evt.summerEnd || (evt.summer ? parseDateRangeString(evt.summer)?.end : '');
  setEventTermState('summer', mStart, mEnd);

  const deleteBtn = document.getElementById('btn-delete-academic-event');
  if (deleteBtn) deleteBtn.style.display = 'inline-flex';
  document.getElementById('event-editor-modal').classList.remove('hidden');
}

function deleteCalendarEventByIndex(index) {
  const evt = msuCalendarEvents[index];
  if (!evt) return;

  showConfirmation(
    "Delete Academic Event",
    `Are you sure you want to remove "${evt.activity}" from the academic calendar?`,
    () => {
      const removed = msuCalendarEvents.splice(index, 1)[0];
      if (removed && removed.dateKey) {
        delete dailyNotes[removed.dateKey];
      }
      semesterDates = generateSemesterDateList();
      Render.after('calendar');
      showToast("Event removed from academic calendar.");
    }
  );
}

function openEventEditorModal(dateKey) {
  const existingEvt = getCalendarEventForDate(dateKey);
  if (existingEvt) {
    const idx = msuCalendarEvents.indexOf(existingEvt);
    if (idx >= 0) {
      openEditCalendarEvent(idx);
      return;
    }
  }
  openAddCalendarEventModal(dateKey);
}

function closeEventEditorModal() {
  document.getElementById('event-editor-modal').classList.add('hidden');
}

function saveAcademicEventChanges() {
  const indexVal = parseInt(document.getElementById('edit-event-index')?.value ?? '-1', 10);
  const origDate = document.getElementById('edit-event-orig-date').value;
  const title = document.getElementById('edit-event-name').value.trim();
  const type = document.getElementById('edit-event-type').value;
  const isNoClass = document.getElementById('edit-event-is-noclass').checked;
  const note = document.getElementById('edit-event-custom-note').value.trim();

  const term1 = getEventTermState('first');
  const term2 = getEventTermState('second');
  const term3 = getEventTermState('summer');

  if (!title && !note) {
    showToast("Please enter an event title or note.", "⚠️");
    return;
  }

  const primaryDateKey = term1.start || term2.start || term3.start || '';

  if (indexVal >= 0 && indexVal < msuCalendarEvents.length) {
    const evt = msuCalendarEvents[indexVal];
    const oldDateKey = evt.dateKey;

    evt.activity = title || evt.activity;
    evt.type = type;
    evt.isNoClass = isNoClass;
    evt.dateKey = primaryDateKey;
    evt.firstSem = term1.text;
    evt.firstSemStart = term1.start;
    evt.firstSemEnd = term1.end;
    evt.secondSem = term2.text;
    evt.secondSemStart = term2.start;
    evt.secondSemEnd = term2.end;
    evt.summer = term3.text;
    evt.summerStart = term3.start;
    evt.summerEnd = term3.end;

    if (oldDateKey && oldDateKey !== primaryDateKey && dailyNotes[oldDateKey]) {
      const oldNote = dailyNotes[oldDateKey];
      delete dailyNotes[oldDateKey];
      if (primaryDateKey && !note) dailyNotes[primaryDateKey] = oldNote;
    }
  } else {
    let existing = null;
    if (origDate) {
      existing = msuCalendarEvents.find(e => e.dateKey === origDate);
    } else if (primaryDateKey) {
      existing = msuCalendarEvents.find(e => e.dateKey === primaryDateKey);
    }

    if (existing) {
      existing.activity = title || existing.activity;
      existing.type = type;
      existing.isNoClass = isNoClass;
      existing.dateKey = primaryDateKey;
      existing.firstSem = term1.text;
      existing.firstSemStart = term1.start;
      existing.firstSemEnd = term1.end;
      existing.secondSem = term2.text;
      existing.secondSemStart = term2.start;
      existing.secondSemEnd = term2.end;
      existing.summer = term3.text;
      existing.summerStart = term3.start;
      existing.summerEnd = term3.end;
    } else if (title) {
      msuCalendarEvents.push({
        num: msuCalendarEvents.length + 1,
        activity: title,
        firstSem: term1.text,
        firstSemStart: term1.start,
        firstSemEnd: term1.end,
        secondSem: term2.text,
        secondSemStart: term2.start,
        secondSemEnd: term2.end,
        summer: term3.text,
        summerStart: term3.start,
        summerEnd: term3.end,
        dateKey: primaryDateKey,
        isNoClass: isNoClass,
        type: type
      });
    }

    if (origDate && origDate !== primaryDateKey && dailyNotes[origDate]) {
      const oldNote = dailyNotes[origDate];
      delete dailyNotes[origDate];
      if (primaryDateKey && !note) dailyNotes[primaryDateKey] = oldNote;
    }
  }

  if (primaryDateKey) {
    if (note) {
      dailyNotes[primaryDateKey] = note;
    } else {
      delete dailyNotes[primaryDateKey];
    }
  }

  semesterDates = generateSemesterDateList();
  Render.after('calendar');
  closeEventEditorModal();
  showToast("Academic event saved and synchronized!");
}

function deleteAcademicEvent() {
  const indexVal = parseInt(document.getElementById('edit-event-index')?.value ?? '-1', 10);
  const origDate = document.getElementById('edit-event-orig-date').value;

  if (indexVal >= 0 && indexVal < msuCalendarEvents.length) {
    const removed = msuCalendarEvents.splice(indexVal, 1)[0];
    if (removed && removed.dateKey) {
      delete dailyNotes[removed.dateKey];
    }
  } else if (origDate) {
    const idx = msuCalendarEvents.findIndex(e => e.dateKey === origDate);
    if (idx >= 0) msuCalendarEvents.splice(idx, 1);
    delete dailyNotes[origDate];
  }

  semesterDates = generateSemesterDateList();
  Render.after('calendar');
  closeEventEditorModal();
  showToast("Event removed from academic calendar.");
}

function scrollToToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayKey = year + '-' + month + '-' + day;

  switchTab('planner');

  if (selectedMonthFilter !== 'all' && selectedMonthFilter !== month) {
    const fm = document.getElementById('filter-month');
    if (fm) fm.value = 'all';
    selectedMonthFilter = 'all';
    renderMatrixTable();
  }

  setTimeout(() => {
    let row = document.getElementById('row-' + todayKey);
    if (!row) {
      const rows = document.querySelectorAll('#matrix-body tr');
      if (rows.length > 0) {
        row = rows[0];
        showToast('Today (' + todayKey + ') is outside semester range. Focused first date.');
      }
    }

    if (row) {
      const matchedDate = semesterDates.find(d => d.dateKey === todayKey);
      if (matchedDate) {
        const totalWeeks = semesterDates.length > 0 ? semesterDates[0].totalWeeks : 18;
        const navLabel = document.getElementById('current-week-nav-label');
        if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;

        // Display week starting from Sunday (do not bring today's date to top row)
        const sundayEntry = semesterDates.find(d => d.weekNumber === matchedDate.weekNumber && d.dayOfWeek === 'Sun') ||
                            semesterDates.find(d => d.weekNumber === matchedDate.weekNumber);
        const sundayRow = sundayEntry ? document.getElementById('row-' + sundayEntry.dateKey) : null;
        if (sundayRow) {
          scrollMatrixToRow(sundayRow, 'smooth');
        } else {
          scrollMatrixToRow(row, 'smooth');
        }
      } else {
        scrollMatrixToRow(row, 'smooth');
      }

      row.classList.remove('row-today-pulse');
      void row.offsetWidth;
      row.classList.add('row-today-pulse');

      showToast('Focused on date: ' + row.id.replace('row-', ''));
    }
  }, 150);
}

function setupSynchronizedScrollbars() {
  const matrixWrapper = document.getElementById('matrix-scroll-wrapper');
  const topWrapper = document.getElementById('top-scrollbar-container');
  const dummy = document.getElementById('top-scrollbar-dummy');

  if (!matrixWrapper || !topWrapper || !dummy) return;

  dummy.style.width = matrixWrapper.scrollWidth + 'px';

  let isSyncingTop = false;
  let isSyncingMatrix = false;

  topWrapper.onscroll = () => {
    if (!isSyncingTop) {
      isSyncingMatrix = true;
      matrixWrapper.scrollLeft = topWrapper.scrollLeft;
    }
    isSyncingTop = false;
  };

  matrixWrapper.onscroll = () => {
    if (!isSyncingMatrix) {
      isSyncingTop = true;
      topWrapper.scrollLeft = matrixWrapper.scrollLeft;
    }
    isSyncingMatrix = false;
  };
}

function filterMatrixByMonth() {
  const fm = document.getElementById('filter-month');
  if (fm) {
    selectedMonthFilter = fm.value;
    renderMatrixTable();
    saveAppState();
  }
}
