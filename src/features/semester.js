/* ===========================================================================
 * SEMESTER TIMELINE & DATE LOGIC
 * ---------------------------------------------------------------------------
 * Generates the semester date list, week navigation, teaching-day statistics
 * and the progress bar. The date maths the planner matrix is built on.
 * ======================================================================== */

function formatDateRange(start, end) {
  if (!start) return '—';
  const cleanStart = String(start).trim();
  const cleanEnd = String(end || '').trim();

  if (!cleanEnd || cleanStart === cleanEnd) {
    const p = cleanStart.split('-');
    if (p.length !== 3) return cleanStart;
    const m = parseInt(p[1], 10) - 1;
    const d = parseInt(p[2], 10);
    const y = p[0];
    if (m >= 0 && m < 12) return `${monthNamesFull[m]} ${d}, ${y}`;
    return cleanStart;
  }

  const p1 = cleanStart.split('-');
  const p2 = cleanEnd.split('-');
  if (p1.length !== 3 || p2.length !== 3) return `${cleanStart} – ${cleanEnd}`;

  const m1 = parseInt(p1[1], 10) - 1;
  const d1 = parseInt(p1[2], 10);
  const y1 = p1[0];

  const m2 = parseInt(p2[1], 10) - 1;
  const d2 = parseInt(p2[2], 10);
  const y2 = p2[0];

  if (y1 === y2 && m1 === m2) {
    return `${monthNamesFull[m1]} ${d1} – ${d2}, ${y1}`;
  }
  if (y1 === y2) {
    return `${monthNamesFull[m1]} ${d1} – ${monthNamesFull[m2]} ${d2}, ${y1}`;
  }
  return `${monthNamesFull[m1]} ${d1}, ${y1} – ${monthNamesFull[m2]} ${d2}, ${y2}`;
}

function parseDateRangeString(text) {
  if (!text || text === '—' || text === '-') return null;
  const clean = text.replace(/–/g, '-').replace(/\s+/g, ' ').trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return { start: clean, end: clean, isRange: false };
  }

  const monthLookup = {
    january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
    july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
  };

  const crossYear = clean.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})\s*-\s*([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (crossYear) {
    const m1 = monthLookup[crossYear[1].toLowerCase()];
    const d1 = crossYear[2].padStart(2, '0');
    const y1 = crossYear[3];
    const m2 = monthLookup[crossYear[4].toLowerCase()];
    const d2 = crossYear[5].padStart(2, '0');
    const y2 = crossYear[6];
    if (m1 && m2) return { start: `${y1}-${m1}-${d1}`, end: `${y2}-${m2}-${d2}`, isRange: true };
  }

  const crossMonth = clean.match(/([A-Za-z]+)\s+(\d{1,2})\s*-\s*([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (crossMonth) {
    const m1 = monthLookup[crossMonth[1].toLowerCase()];
    const d1 = crossMonth[2].padStart(2, '0');
    const m2 = monthLookup[crossMonth[3].toLowerCase()];
    const d2 = crossMonth[4].padStart(2, '0');
    const y = crossMonth[5];
    if (m1 && m2) return { start: `${y}-${m1}-${d1}`, end: `${y}-${m2}-${d2}`, isRange: true };
  }

  const sameMonthRange = clean.match(/([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2}),?\s+(\d{4})/i);
  if (sameMonthRange) {
    const m = monthLookup[sameMonthRange[1].toLowerCase()];
    const d1 = sameMonthRange[2].padStart(2, '0');
    const d2 = sameMonthRange[3].padStart(2, '0');
    const y = sameMonthRange[4];
    if (m) return { start: `${y}-${m}-${d1}`, end: `${y}-${m}-${d2}`, isRange: true };
  }

  const single = clean.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (single) {
    const m = monthLookup[single[1].toLowerCase()];
    const d = single[2].padStart(2, '0');
    const y = single[3];
    if (m) return { start: `${y}-${m}-${d}`, end: `${y}-${m}-${d}`, isRange: false };
  }

  return null;
}

function getCalendarEventForDate(dateKey) {
  if (!dateKey) return null;
  for (const e of msuCalendarEvents) {
    // 1. Direct dateKey match
    if (e.dateKey && e.dateKey === dateKey) return e;

    // 2. 1st Semester range or single date
    if (e.firstSem) {
      const parsed = parseDateRangeString(e.firstSem);
      if (parsed && dateKey >= parsed.start && dateKey <= parsed.end) return e;
    }

    // 3. 2nd Semester check
    if (e.secondSem) {
      const parsed = parseDateRangeString(e.secondSem);
      if (parsed && dateKey >= parsed.start && dateKey <= parsed.end) return e;
    }

    // 4. Summer check
    if (e.summer) {
      const parsed = parseDateRangeString(e.summer);
      if (parsed && dateKey >= parsed.start && dateKey <= parsed.end) return e;
    }
  }
  return null;
}

function generateSemesterDateList() {
  const dates = [];
  const start = new Date(semesterConfig.startDate + "T00:00:00");
  const end = new Date(semesterConfig.endDate + "T00:00:00");

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Find the Sunday at or before the semester start date (anchor for week 1)
  const firstSunday = new Date(start);
  firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

  // Find the Saturday at or after the semester end date
  const lastSaturday = new Date(end);
  if (lastSaturday.getDay() !== 6) {
    lastSaturday.setDate(lastSaturday.getDate() + (6 - lastSaturday.getDay()));
  }

  const totalWeeks = Math.max(1, Math.round((lastSaturday - firstSunday + 1) / (1000 * 60 * 60 * 24 * 7)));

  let curr = new Date(firstSunday);

  while (curr <= lastSaturday) {
    const year = curr.getFullYear();
    const monthNum = String(curr.getMonth() + 1).padStart(2, '0');
    const dayNum = String(curr.getDate()).padStart(2, '0');
    const dateKey = year + '-' + monthNum + '-' + dayNum;
    const dayOfWeek = daysOfWeek[curr.getDay()];
    const isWeekend = (curr.getDay() === 0 || curr.getDay() === 6);
    const displayDate = curr.getDate() + '-' + monthNames[curr.getMonth()];

    const calEvent = getCalendarEventForDate(dateKey);
    // Week number based on Sunday-aligned weeks (Sunday = start of week)
    const daysSinceFirstSunday = Math.round((curr - firstSunday) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.min(totalWeeks, Math.floor(daysSinceFirstSunday / 7) + 1);
    const progressPercentage = Math.min(100, Math.max(1, Math.round((currentWeek / totalWeeks) * 100)));

    dates.push({
      dateKey,
      displayDate,
      dayOfWeek,
      monthNum,
      year,
      monthName: monthNames[curr.getMonth()],
      isWeekend,
      weekNumber: currentWeek,
      totalWeeks: totalWeeks,
      progressPercentage: progressPercentage,
      event: calEvent || null,
      isNoClassDate: calEvent ? calEvent.isNoClass : false
    });

    curr.setDate(curr.getDate() + 1);
  }

  const badge = document.getElementById('planner-total-weeks-badge');
  if (badge) badge.innerText = totalWeeks + ' Weeks';

  const navLabel = document.getElementById('current-week-nav-label');
  if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;

  return dates;
}

function populateMonthFilter() {
  const select = document.getElementById('filter-month');
  if (!select) return;

  const distinctMonths = [];
  semesterDates.forEach(d => {
    if (!distinctMonths.some(m => m.monthNum === d.monthNum && m.year === d.year)) {
      distinctMonths.push({ monthNum: d.monthNum, year: d.year, name: d.monthName });
    }
  });

  let optionsHtml = '<option value="all">Full Semester</option>';
  distinctMonths.forEach(m => {
    const isSelected = selectedMonthFilter === m.monthNum ? 'selected' : '';
    optionsHtml += '<option value="' + m.monthNum + '" ' + isSelected + '>' + m.name + ' ' + m.year + '</option>';
  });

  select.innerHTML = optionsHtml;
}

function scrollMatrixCellIntoHorizontalView(targetCell, behavior = 'smooth') {
  const wrapper = document.getElementById('matrix-scroll-wrapper');
  if (!wrapper || !targetCell) return;

  const stickyLeftWidth = 110; // 42px Day + 68px Date sticky columns
  // getBoundingClientRect() (not offsetLeft): with a scrolled, dual-scrollbar
  // container, offset* coordinates are relative to an ambiguous offsetParent,
  // so they misfire exactly when the cell is already off-screen.
  const cellRect = targetCell.getBoundingClientRect();
  const wrapRect = wrapper.getBoundingClientRect();
  const viewLeft = wrapRect.left + stickyLeftWidth;
  const viewRight = wrapRect.right;

  let newScrollLeft = wrapper.scrollLeft;
  if (cellRect.left < viewLeft) {
    // Scrolled too far right or cell hidden behind sticky columns: bring into view
    newScrollLeft += cellRect.left - viewLeft - 12;
  } else if (cellRect.right > viewRight) {
    // Off-screen to the right: bring cell into view with padding
    newScrollLeft += cellRect.right - viewRight + 24;
  }
  newScrollLeft = Math.max(0, Math.round(newScrollLeft));
  if (newScrollLeft === wrapper.scrollLeft) return;

  if (behavior === 'smooth') {
    wrapper.scrollTo({ left: newScrollLeft, top: wrapper.scrollTop, behavior: 'smooth' });
  } else {
    wrapper.scrollLeft = newScrollLeft;
  }
}

function scrollMatrixToRow(targetRow, behavior = 'smooth') {
  const wrapper = document.getElementById('matrix-scroll-wrapper');
  const thead = document.getElementById('matrix-head');
  if (!targetRow || !wrapper) return;
  const theadHeight = (thead && typeof thead.offsetHeight === 'number' && !isNaN(thead.offsetHeight)) ? thead.offsetHeight : 68;
  // getBoundingClientRect() (not offsetTop): same offsetParent ambiguity as
  // the horizontal helper above - in a scrolled wrapper offset* reads are only
  // trustworthy when the row is already on screen.
  const rowRect = targetRow.getBoundingClientRect();
  const wrapRect = wrapper.getBoundingClientRect();
  const targetTop = Math.max(0, wrapper.scrollTop + (rowRect.top - wrapRect.top) - theadHeight);
  if (targetTop === wrapper.scrollTop) return;
  if (behavior === 'smooth') {
    wrapper.scrollTo({ top: targetTop, left: wrapper.scrollLeft, behavior: 'smooth' });
  } else {
    wrapper.scrollTop = targetTop;
  }
}

function navigateWeek(direction) {
  const totalWeeks = semesterDates.length > 0 ? semesterDates[0].totalWeeks : 1;

  currentWeekViewIndex = Math.min(totalWeeks, Math.max(1, currentWeekViewIndex + direction));

  const navLabel = document.getElementById('current-week-nav-label');
  if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;

  // Find the first date (Sunday) in semesterDates that belongs to the target week
  const targetEntry = semesterDates.find(d => d.weekNumber === currentWeekViewIndex);
  if (targetEntry) {
    const targetRow = document.getElementById('row-' + targetEntry.dateKey);
    if (targetRow) {
      scrollMatrixToRow(targetRow, 'smooth');
    }
  }
  saveAppState();
}

function calculateTeachingDaysStats() {
  const now = (typeof window !== 'undefined' && window._overrideCurrentDate)
    ? new Date(window._overrideCurrentDate)
    : new Date();
  
  const todayYear = now.getFullYear();
  const todayMonth = String(now.getMonth() + 1).padStart(2, '0');
  const todayDay = String(now.getDate()).padStart(2, '0');
  const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;
  
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // 1. Gather all university-wide suspension dates
  const noClassDates = new Set();
  if (Array.isArray(msuCalendarEvents)) {
    msuCalendarEvents.forEach(evt => {
      if (evt && evt.isNoClass && evt.dateKey) noClassDates.add(evt.dateKey);
    });
  }

  // 2. Identify entries explicitly marked "No Class" or cancelled
  if (typeof plannerEntries === 'object' && plannerEntries !== null) {
    Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
      if (!entry) return;
      const [dateKey] = cellKey.split('__');
      const rawType = (entry.type || entry.activityType || '').trim().toLowerCase();
      const topic = (entry.topic || '').toLowerCase();
      if (rawType === 'no class' || topic.includes('no class') || topic.includes('suspended') || entry.status === 'Cancelled') {
        noClassDates.add(dateKey);
      }
    });
  }

  // 3. Calculate Total Scheduled Class Meetings and Completed Meetings
  let totalScheduledMeetings = 0;
  let conductedMeetings = 0;

  const startKey = (semesterConfig && semesterConfig.startDate) ? semesterConfig.startDate : '';
  const endKey = (semesterConfig && semesterConfig.endDate) ? semesterConfig.endDate : '';

  if (Array.isArray(semesterDates) && Array.isArray(weeklyTimetable)) {
    semesterDates.forEach(d => {
      if (startKey && d.dateKey < startKey) return;
      if (endKey && d.dateKey > endKey) return;
      if (d.isWeekend) return;

      const isSuspended = d.isNoClassDate || noClassDates.has(d.dateKey);
      if (isSuspended) return;

      const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;

      // Find all scheduled slots occurring on this weekday
      const slotsOnDay = weeklyTimetable.filter(t => t.day === fullDay);

      slotsOnDay.forEach(slot => {
        const cellKey = `${d.dateKey}__${slot.course}__${slot.section}`;
        const entry = (plannerEntries && plannerEntries[cellKey]) ? plannerEntries[cellKey] : null;

        // Skip if this slot was individually cancelled
        if (entry) {
          const rawType = (entry.type || entry.activityType || '').trim().toLowerCase();
          const topic = (entry.topic || '').toLowerCase();
          if (rawType === 'no class' || topic.includes('no class') || entry.status === 'Cancelled') {
            return;
          }
        }

        totalScheduledMeetings++;

        // Check if meeting has elapsed
        const endMinutes = slot.endTime ? timeToMinutes(slot.endTime) : 0;
        const isPastDate = d.dateKey < todayStr;
        const isPastTimeToday = (d.dateKey === todayStr) && (endMinutes > 0 ? currentTotalMinutes >= endMinutes : true);
        const isCompleted = (entry && entry.status === 'Completed') || isPastDate || isPastTimeToday;

        if (isCompleted) {
          conductedMeetings++;
        }
      });
    });
  }

  // 4. Activity breakdowns for syllabus summary
  let matrixLectureCount = 0;
  let matrixLabCount = 0;
  let matrixQuizCount = 0;
  let matrixExamCount = 0;
  let matrixTotalCount = 0;
  let matrixCompletedCount = 0;
  const conductedDatesSet = new Set();

  if (typeof plannerEntries === 'object' && plannerEntries !== null) {
    Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
      if (!entry) return;
      const parts = cellKey.split('__');
      if (parts.length < 3) return;
      const [dateKey, course, section] = parts;

      const topic = (entry.topic || '').trim();
      const activity = (entry.activity || '').trim();
      const rawType = (entry.type || entry.activityType || 'Lecture').trim().toLowerCase();
      const status = entry.status || 'Planned';

      if (rawType === 'no class' || topic.toLowerCase().includes('no class') || topic.toLowerCase().includes('suspended') || status === 'Cancelled') {
        return;
      }
      if (!topic && !activity) return;

      matrixTotalCount++;

      const dateParts = dateKey.split('-').map(Number);
      const entryDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      const targetDayName = dayNames[entryDate.getDay()];
      
      let slot = weeklyTimetable.find(t => t.course === course && t.section === section && t.day === targetDayName)
              || weeklyTimetable.find(t => t.course === course && t.section === section);
      
      const endTimeStr = entry.endTime || (slot ? slot.endTime : '');
      const endMinutes = endTimeStr ? timeToMinutes(endTimeStr) : 0;

      const isPastDate = dateKey < todayStr;
      const isPastTimeToday = (dateKey === todayStr) && (endMinutes > 0 ? currentTotalMinutes >= endMinutes : true);
      const isCompleted = (status === 'Completed') || isPastDate || isPastTimeToday;

      if (isCompleted) {
        matrixCompletedCount++;
        conductedDatesSet.add(dateKey);
      }

      if (rawType.includes('quiz') || rawType.includes('seatwork')) matrixQuizCount++;
      else if (rawType.includes('exam')) matrixExamCount++;
      else if (rawType.includes('lab') || rawType.includes('field')) matrixLabCount++;
      else matrixLectureCount++;
    });
  }

  // 5. Calendar Teaching Days stats
  let totalTeachingDays = 0;
  let noClassDays = 0;

  if (Array.isArray(semesterDates)) {
    semesterDates.forEach(d => {
      if (startKey && d.dateKey < startKey) return;
      if (endKey && d.dateKey > endKey) return;
      if (!d.isWeekend) {
        const isSuspended = d.isNoClassDate || noClassDates.has(d.dateKey);
        if (isSuspended) noClassDays++;
        else totalTeachingDays++;
      }
    });
  }

  const heldTeachingDays = conductedDatesSet.size;
  const remainingDays = Math.max(0, totalTeachingDays - heldTeachingDays);

  // Term elapsed percentage based on weeks
  let currentActualWeek = 0;
  let totalWeeksCount = 1;
  
  if (Array.isArray(semesterDates) && semesterDates.length > 0) {
    totalWeeksCount = semesterDates[0].totalWeeks || 1;
    const firstDateKey = semesterDates[0].dateKey;
    const lastDateKey = semesterDates[semesterDates.length - 1].dateKey;
    
    if (todayStr < firstDateKey) {
      currentActualWeek = 0;
    } else if (todayStr > lastDateKey) {
      currentActualWeek = totalWeeksCount;
    } else {
      const todayEntry = semesterDates.find(d => d.dateKey === todayStr);
      if (todayEntry) {
        currentActualWeek = todayEntry.weekNumber;
      } else {
        const pastDates = semesterDates.filter(d => d.dateKey <= todayStr);
        currentActualWeek = pastDates.length > 0 ? pastDates[pastDates.length - 1].weekNumber : 0;
      }
    }
  }
  
  const rawTermElapsed = totalWeeksCount > 0 ? (currentActualWeek / totalWeeksCount) * 100 : 0;
  const termElapsedPct = parseFloat(rawTermElapsed.toFixed(2));

  return {
    totalTeachingDays,
    heldTeachingDays,
    noClassDays,
    remainingDays,
    termElapsedPct,
    matrixTotalCount,
    matrixCompletedCount,
    matrixLectureCount,
    matrixLabCount,
    matrixQuizCount,
    matrixExamCount,
    totalScheduledMeetings,
    conductedMeetings
  };
}

function updateSemesterProgressBar() {
  const totalWeeks = semesterDates.length > 0 ? semesterDates[0].totalWeeks : 18;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
  const todayDay = String(today.getDate()).padStart(2, '0');
  const todayKey = todayYear + '-' + todayMonth + '-' + todayDay;

  let currentActualWeek = 1;

  if (semesterDates.length > 0) {
    const firstDateKey = semesterDates[0].dateKey;
    const lastDateKey = semesterDates[semesterDates.length - 1].dateKey;

    if (todayKey < firstDateKey) {
      currentActualWeek = 1;
    } else if (todayKey > lastDateKey) {
      currentActualWeek = totalWeeks;
    } else {
      const todayEntry = semesterDates.find(d => d.dateKey === todayKey);
      if (todayEntry) {
        currentActualWeek = todayEntry.weekNumber;
      } else {
        const pastDates = semesterDates.filter(d => d.dateKey <= todayKey);
        currentActualWeek = pastDates.length > 0 ? pastDates[pastDates.length - 1].weekNumber : 1;
      }
    }
  }

}
