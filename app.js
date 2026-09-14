const PORTAL_TIPS = [
  {
    title: "Fast Keyboard Shortcuts in Planner",
    type: "Tip",
    icon: "⌨️",
    content: "Use <kbd class='px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono font-bold text-[11px]'>Ctrl+Z</kbd> to instantly undo syllabus changes and <kbd class='px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono font-bold text-[11px]'>Ctrl+Y</kbd> (or Ctrl+Shift+Z) to redo card moves and lesson entries in the Matrix."
  },
  {
    title: "Direct Copy-Paste from Google Sheets",
    type: "Tip",
    icon: "📋",
    content: "Have a class roster in Excel or Google Sheets? Click <b>'Paste Class List'</b> in the Roster tab to import columns (ID, Last Name, First Name, Email) in seconds without manual row-by-row data entry."
  },
  {
    title: "Compact Grading View",
    type: "Tip",
    icon: "📊",
    content: "Toggle <b>'Collapse Sub-activities'</b> in the Gradebook toolbar to hide daily seatworks and view only high-level exam category totals and overall weighted course percentages."
  },
  {
    title: "100% Offline Persistence",
    type: "Did You Know?",
    icon: "💾",
    content: "Every modification you make to grades, activities, and schedules is saved in local browser storage, allowing full functionality without requiring an active internet connection."
  },
  {
    title: "Cascading 'No Class' Suspensions",
    type: "Did You Know?",
    icon: "🔄",
    content: "Declaring a 'No Class' day (for university holidays, sports events, or weather suspensions) automatically cascades your remaining lesson topics forward into future available class days."
  },
  {
    title: "One-Click Faculty Gmail Integration",
    type: "Did You Know?",
    icon: "✉️",
    content: "Configure your official faculty Google account in Settings. Clicking any student's email link will immediately launch Gmail logged in under that specific institutional account."
  },
  {
    title: "Complete JSON Backups & Migration",
    type: "Tip",
    icon: "📦",
    content: "Use the <b>Export / Import Hub</b> anytime to download complete JSON snapshots of your semester records to safely transfer data between work and home laptops."
  },
  {
    title: "Real-Time Active Class Indicator",
    type: "Did You Know?",
    icon: "⏰",
    content: "The header live clock actively monitors your Weekly Timetable and displays a golden indicator badge whenever one of your scheduled lectures or lab periods is currently in session."
  },
  {
    title: "Dual Top & Bottom Scrollbars",
    type: "Did You Know?",
    icon: "🎚️",
    content: "The Lesson Planner Matrix, Gradebook, and Student Roster feature synchronized scrollbars at both the top and bottom of the table so you can navigate wide tables without scrolling to the bottom."
  },
  {
    title: "Personalized School Branding & Logo",
    type: "Tip",
    icon: "🏫",
    content: "Click <b>Portal Settings</b> in the header anytime to customize your university or department name and upload your own school logo. High-resolution logos are automatically optimized!"
  },
  {
    title: "Vertical Resizing for Sidebar Widgets",
    type: "Tip",
    icon: "📐",
    content: "You can drag the bottom edge of the <b>Next Activities</b> widget to resize it to your preferred height. Double-click the widget header anytime to reset it back to default."
  },
  {
    title: "Gradebook Out-of-Bounds Detection",
    type: "Did You Know?",
    icon: "🚨",
    content: "Entering a score higher than an assessment's configured maximum highlights the cell with a glowing red warning ring and toast notification to catch data entry typos immediately."
  },
  {
    title: "Interactive Drag & Drop Lessons",
    type: "Tip",
    icon: "🖐️",
    content: "In the Lesson Matrix, you can drag and drop lecture topic cards across days and sections to easily reorganize your teaching schedule when topics take longer than planned."
  },
  {
    title: "One-Click Filtered Student Announcements",
    type: "Tip",
    icon: "📢",
    content: "Filter the Roster by section or final grade status (e.g. students with INC or below 3.00), then click <b>'Email Filtered Students'</b> in the sidebar to open a pre-addressed BCC email draft."
  },
  {
    title: "Section Renaming & Schedule Editing",
    type: "Did You Know?",
    icon: "✏️",
    content: "Under Manage Subjects, clicking <b>'Edit Section'</b> lets you rename sections or alter meeting days and hours with automatic state migration across your timetable, matrix, and student rosters."
  },
  {
    title: "PDF Academic Calendar Text Extraction",
    type: "Did You Know?",
    icon: "📄",
    content: "Upload your official university academic calendar PDF in the Calendar tab. The built-in PDF.js engine extracts event titles, dates, and examination periods into your timeline."
  },
  {
    title: "Gradebook Input Error Radar",
    type: "Tip",
    icon: "🎯",
    content: "The Gradebook sidebar features an <b>Input Error Radar</b> that automatically flags empty score cells and zero entries. Click any listed student to jump directly to their score cell."
  },
  {
    title: "Custom Passing Criteria & Scales",
    type: "Tip",
    icon: "⚖️",
    content: "Click <b>'Grading Scale'</b> to customize grade thresholds from 1.00 (98-100%) to 5.00 (<75%), adjust passing percentages, and preview real-time grade distributions for your section."
  },
  {
    title: "Customizable Subject Column Widths",
    type: "Tip",
    icon: "↔️",
    content: "Need more room for detailed syllabus notes? Hover between subject column headers in the Lesson Matrix and drag the divider edge to expand or narrow any column."
  },
  {
    title: "Academic Week-Based Progress",
    type: "Did You Know?",
    icon: "📈",
    content: "The top navigation bar tracks cumulative semester elapsed percentage based on certified academic calendar weeks, providing an accurate, objective term timeline at a glance."
  },
  {
    title: "Instant 'Jump to Today' Locator",
    type: "Tip",
    icon: "🎯",
    content: "Click <b>'Jump to Today'</b> below the Lesson Matrix or in Today's Schedule to instantly scroll and highlight the current teaching day with an amber ambient focus glow."
  },
  {
    title: "Full Sunday Class Schedule Support",
    type: "Did You Know?",
    icon: "☀️",
    content: "For weekend programs and graduate courses, Sunday is fully supported in the Weekly Timetable grid, conflict detector, and Today's Schedule agenda widgets."
  },
  {
    title: "Integrated Bug & Feedback Dispatcher",
    type: "Tip",
    icon: "🐛",
    content: "Encounter an issue or have an idea? Click the floating bug button in the bottom-left corner anytime to send feedback directly to the system maintainer with diagnostics included."
  },
  {
    title: "Safe Multi-Section Student Enrollment",
    type: "Did You Know?",
    icon: "🛡️",
    content: "Students enrolled across multiple courses or lab sections share a single unified ID record, and removing a student from one section preserves their enrollment in other courses."
  },
  {
    title: "Installable Desktop Web App (PWA)",
    type: "Did You Know?",
    icon: "💻",
    content: "This course manager includes a web app manifest and Service Worker—click your browser's install icon in the address bar to run it as a standalone, distraction-free desktop application!"
  }
];

// Expose tips globally and update tip display logic
window.PORTAL_TIPS = PORTAL_TIPS;

function getNextRandomTip(currentIndex = -1) {
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * PORTAL_TIPS.length);
  } while (PORTAL_TIPS.length > 1 && nextIdx === currentIndex);
  return { ...PORTAL_TIPS[nextIdx], index: nextIdx };
}

/* =========================================================
       MSU-GSC COURSE & LESSON MANAGER - HIGH PERFORMANCE ENGINE
       ========================================================= */

    const STORAGE_KEY = 'MSU_GSC_COURSE_MANAGER_DATA_V2';

    const COLOR_PALETTES = {
      blue: {
        name: 'Blue',
        color: 'bg-blue-50/90 border-blue-300 text-blue-950',
        headerBg: 'bg-blue-600 text-white',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      emerald: {
        name: 'Emerald',
        color: 'bg-emerald-50/90 border-emerald-300 text-emerald-950',
        headerBg: 'bg-emerald-700 text-white',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      amber: {
        name: 'Amber',
        color: 'bg-amber-50/90 border-amber-300 text-amber-950',
        headerBg: 'bg-amber-600 text-white',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      purple: {
        name: 'Purple',
        color: 'bg-purple-50/90 border-purple-300 text-purple-950',
        headerBg: 'bg-purple-700 text-white',
        badgeBg: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      teal: {
        name: 'Teal',
        color: 'bg-teal-50/90 border-teal-300 text-teal-950',
        headerBg: 'bg-teal-700 text-white',
        badgeBg: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      rose: {
        name: 'Rose',
        color: 'bg-rose-50/90 border-rose-300 text-rose-950',
        headerBg: 'bg-rose-700 text-white',
        badgeBg: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      indigo: {
        name: 'Indigo',
        color: 'bg-indigo-50/90 border-indigo-300 text-indigo-950',
        headerBg: 'bg-indigo-700 text-white',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      cyan: {
        name: 'Cyan',
        color: 'bg-cyan-50/90 border-cyan-300 text-cyan-950',
        headerBg: 'bg-cyan-700 text-white',
        badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      },
      orange: {
        name: 'Orange',
        color: 'bg-orange-50/90 border-orange-300 text-orange-950',
        headerBg: 'bg-orange-600 text-white',
        badgeBg: 'bg-orange-100 text-orange-800 border-orange-300'
      },
      slate: {
        name: 'Slate',
        color: 'bg-slate-100/90 border-slate-400 text-slate-900',
        headerBg: 'bg-slate-700 text-white',
        badgeBg: 'bg-slate-200 text-slate-800 border-slate-400'
      },
      lime: {
        name: 'Lime',
        color: 'bg-lime-50/90 border-lime-300 text-lime-950',
        headerBg: 'bg-lime-700 text-white',
        badgeBg: 'bg-lime-100 text-lime-800 border-lime-300'
      },
      sky: {
        name: 'Sky',
        color: 'bg-sky-50/90 border-sky-300 text-sky-950',
        headerBg: 'bg-sky-700 text-white',
        badgeBg: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      pink: {
        name: 'Pink',
        color: 'bg-pink-50/90 border-pink-300 text-pink-950',
        headerBg: 'bg-pink-700 text-white',
        badgeBg: 'bg-pink-100 text-pink-800 border-pink-300'
      },
      fuchsia: {
        name: 'Fuchsia',
        color: 'bg-fuchsia-50/90 border-fuchsia-300 text-fuchsia-950',
        headerBg: 'bg-fuchsia-700 text-white',
        badgeBg: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
      },
      red: {
        name: 'Red',
        color: 'bg-red-50/90 border-red-300 text-red-950',
        headerBg: 'bg-red-700 text-white',
        badgeBg: 'bg-red-100 text-red-800 border-red-300'
      },
      maroon: {
        name: 'Maroon',
        color: 'bg-rose-50/90 border-rose-300 text-rose-950',
        headerBg: 'bg-msu-maroon text-white',
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    };

    const FULL_DAY_NAMES = {
      'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday',
      'Thu': 'Thursday', 'Fri': 'Friday', 'Sat': 'Saturday', 'Sun': 'Sunday'
    };

    const sectionAccentColors = [
      'border-l-4 border-l-blue-600',
      'border-l-4 border-l-amber-500',
      'border-l-4 border-l-emerald-600',
      'border-l-4 border-l-purple-600',
      'border-l-4 border-l-rose-600',
      'border-l-4 border-l-cyan-600',
      'border-l-4 border-l-indigo-600',
      'border-l-4 border-l-teal-600',
      'border-l-4 border-l-orange-500',
      'border-l-4 border-l-slate-600',
      'border-l-4 border-l-lime-600',
      'border-l-4 border-l-sky-600',
      'border-l-4 border-l-pink-600',
      'border-l-4 border-l-fuchsia-600',
      'border-l-4 border-l-red-600',
      'border-l-4 border-l-msu-maroon'
    ];

    const sectionBadgeBorders = [
      'border-blue-600 text-blue-900 bg-blue-100/90',
      'border-amber-600 text-amber-900 bg-amber-100/90',
      'border-emerald-600 text-emerald-900 bg-emerald-100/90',
      'border-purple-600 text-purple-900 bg-purple-100/90',
      'border-rose-600 text-rose-900 bg-rose-100/90',
      'border-cyan-600 text-cyan-900 bg-cyan-100/90',
      'border-indigo-600 text-indigo-900 bg-indigo-100/90',
      'border-teal-600 text-teal-900 bg-teal-100/90',
      'border-orange-600 text-orange-900 bg-orange-100/90',
      'border-slate-600 text-slate-900 bg-slate-200/90',
      'border-lime-600 text-lime-900 bg-lime-100/90',
      'border-sky-600 text-sky-900 bg-sky-100/90',
      'border-pink-600 text-pink-900 bg-pink-100/90',
      'border-fuchsia-600 text-fuchsia-900 bg-fuchsia-100/90',
      'border-red-600 text-red-900 bg-red-100/90',
      'border-msu-maroon text-rose-950 bg-rose-100/90'
    ];

    function getSectionAccent(secIndex) {
      return sectionAccentColors[secIndex % sectionAccentColors.length];
    }

    function getSectionBadgeStyle(secIndex) {
      return sectionBadgeBorders[secIndex % sectionBadgeBorders.length];
    }

    // Default Seed Data Verified from MSU-GSC AY 2026-2027 Calendar
    const DEFAULT_DATA = {
      semesterConfig: {
        schoolName: "Mindanao State University - General Santos",
        schoolLogo: "",
        title: "1st Semester, Academic Year 2026–2027",
        startDate: "2026-08-10",
        endDate: "2026-12-11",
        facultyEmail: ""
      },
      courseData: {
        classroomLinks: {
          'CVE112__B15.1': 'https://classroom.google.com'
        },
        subjects: [
          {
            code: "CVE112",
            title: "Mechanics of Deformable Bodies",
            units: 3,
            colorTheme: "blue",
            color: COLOR_PALETTES.blue.color,
            headerBg: COLOR_PALETTES.blue.headerBg,
            badgeBg: COLOR_PALETTES.blue.badgeBg,
            sections: ["B15.1", "E15", "M15"]
          },
          {
            code: "CVE113",
            title: "Structural Theory",
            units: 3,
            colorTheme: "emerald",
            color: COLOR_PALETTES.emerald.color,
            headerBg: COLOR_PALETTES.emerald.headerBg,
            badgeBg: COLOR_PALETTES.emerald.badgeBg,
            sections: ["J15"]
          },
          {
            code: "CVE169",
            title: "Civil Engineering Project & Design",
            units: 3,
            colorTheme: "amber",
            color: COLOR_PALETTES.amber.color,
            headerBg: COLOR_PALETTES.amber.headerBg,
            badgeBg: COLOR_PALETTES.amber.badgeBg,
            sections: ["Main"]
          }
        ]
      },
      columnWidths: {
        'CVE112__B15.1': 190,
        'CVE112__E15': 190,
        'CVE112__M15': 190,
        'CVE113__J15': 190,
        'CVE169__Main': 200
      },
      weeklyTimetable: [
        { course: "CVE112", section: "B15.1", day: "Monday", startTime: "07:30", endTime: "09:00", room: "Eng 201", type: "Lecture" },
        { course: "CVE112", section: "B15.1", day: "Wednesday", startTime: "07:30", endTime: "09:00", room: "Eng 201", type: "Lecture" },
        { course: "CVE112", section: "E15", day: "Tuesday", startTime: "09:00", endTime: "10:30", room: "Eng 204", type: "Lecture" },
        { course: "CVE112", section: "E15", day: "Thursday", startTime: "09:00", endTime: "10:30", room: "Eng 204", type: "Lecture" },
        { course: "CVE112", section: "M15", day: "Monday", startTime: "13:00", endTime: "14:30", room: "Eng 205", type: "Lecture" },
        { course: "CVE112", section: "M15", day: "Wednesday", startTime: "13:00", endTime: "14:30", room: "Eng 205", type: "Lecture" },
        { course: "CVE113", section: "J15", day: "Tuesday", startTime: "10:30", endTime: "12:00", room: "Eng 301", type: "Lecture" },
        { course: "CVE113", section: "J15", day: "Thursday", startTime: "10:30", endTime: "12:00", room: "Eng 301", type: "Lecture" },
        { course: "CVE169", section: "Main", day: "Friday", startTime: "08:00", endTime: "11:00", room: "CAD Lab", type: "Laboratory" }
      ],
      msuCalendarEvents: [
        { num: 1, activity: "Regular Registration (Freshmen)", firstSem: "July 1 – 31, 2026", secondSem: "—", summer: "—", dateKey: "", isNoClass: false, type: "admin" },
        { num: 2, activity: "First Day of Report to Office of Faculty Members", firstSem: "August 3, 2026", secondSem: "January 4, 2027", summer: "—", dateKey: "2026-08-03", isNoClass: false, type: "admin" },
        { num: 3, activity: "General Faculty Assembly & Planning Conference", firstSem: "August 3, 2026", secondSem: "January 11, 2027", summer: "June 7, 2027", dateKey: "2026-08-03", isNoClass: false, type: "admin" },
        { num: 4, activity: "Regular Registration (Old Students/Returning)", firstSem: "August 3 – 7, 2026", secondSem: "January 11 – 15, 2027", summer: "June 7 – 8, 2027", dateKey: "2026-08-07", isNoClass: false, type: "admin" },
        { num: 5, activity: "START OF CLASSES (Undergraduate Students)", firstSem: "August 10, 2026", secondSem: "January 18, 2027", summer: "June 9, 2027", dateKey: "2026-08-10", isNoClass: false, type: "milestone" },
        { num: 6, activity: "Start of Classes (Graduate Students)", firstSem: "August 17, 2026", secondSem: "January 25, 2027", summer: "—", dateKey: "2026-08-17", isNoClass: false, type: "milestone" },
        { num: 7, activity: "MSU SYSTEM FOUNDATION DAY (Charter Day)", firstSem: "September 1, 2026", secondSem: "—", summer: "—", dateKey: "2026-09-01", isNoClass: true, type: "holiday" },
        { num: 8, activity: "FIRST PRELIMINARY EXAMINATIONS", firstSem: "September 10 – 11, 2026", secondSem: "February 18 – 19, 2027", summer: "—", dateKey: "2026-09-10", isNoClass: false, type: "exam" },
        { num: 9, activity: "First Prelim Examinations (Day 2)", firstSem: "September 11, 2026", secondSem: "February 19, 2027", summer: "—", dateKey: "2026-09-11", isNoClass: false, type: "exam" },
        { num: 10, activity: "INTRAMURALS WEEK (Sports & Cultural Festival)", firstSem: "October 1 – 3, 2026", secondSem: "—", summer: "—", dateKey: "2026-10-01", isNoClass: true, type: "activity" },
        { num: 11, activity: "College Council Meeting", firstSem: "October 7, 2026", secondSem: "March 24, 2027", summer: "—", dateKey: "2026-10-07", isNoClass: false, type: "admin" },
        { num: 12, activity: "Campus Council Meeting", firstSem: "October 14, 2026", secondSem: "March 31, 2027", summer: "—", dateKey: "2026-10-14", isNoClass: false, type: "admin" },
        { num: 13, activity: "SECOND PRELIMINARY EXAMINATIONS", firstSem: "October 21 – 23, 2026", secondSem: "April 6 – 8, 2027", summer: "—", dateKey: "2026-10-21", isNoClass: false, type: "exam" },
        { num: 14, activity: "Second Prelim Examinations (Day 2)", firstSem: "October 22, 2026", secondSem: "April 7, 2027", summer: "—", dateKey: "2026-10-22", isNoClass: false, type: "exam" },
        { num: 15, activity: "Second Prelim Examinations (Day 3)", firstSem: "October 23, 2026", secondSem: "April 8, 2027", summer: "—", dateKey: "2026-10-23", isNoClass: false, type: "exam" },
        { num: 16, activity: "All Saints' / All Souls' Day Observance", firstSem: "November 1 – 2, 2026", secondSem: "—", summer: "—", dateKey: "2026-11-02", isNoClass: true, type: "holiday" },
        { num: 17, activity: "FINAL EXAMINATIONS (Graduating Students)", firstSem: "December 2 – 4, 2026", secondSem: "May 12 – 14, 2027", summer: "—", dateKey: "2026-12-02", isNoClass: false, type: "exam" },
        { num: 18, activity: "FINAL EXAMINATIONS (Non-Graduating Students)", firstSem: "December 9 – 11, 2026", secondSem: "May 19 – 21, 2027", summer: "—", dateKey: "2026-12-09", isNoClass: false, type: "exam" },
        { num: 19, activity: "Final Examinations (Day 2)", firstSem: "December 10, 2026", secondSem: "May 20, 2027", summer: "—", dateKey: "2026-12-10", isNoClass: false, type: "exam" },
        { num: 20, activity: "LAST DAY OF CLASSES", firstSem: "December 11, 2026", secondSem: "May 21, 2027", summer: "July 16, 2027", dateKey: "2026-12-11", isNoClass: false, type: "milestone" },
        { num: 21, activity: "Last Day for Submission of Grades (Graduating)", firstSem: "December 18, 2026", secondSem: "June 1, 2027", summer: "—", dateKey: "2026-12-18", isNoClass: false, type: "milestone" },
        { num: 22, activity: "Christmas Vacation / Semestral Break Begins", firstSem: "December 12, 2026 – January 3, 2027", secondSem: "May 24 – July 22, 2027", summer: "—", dateKey: "2026-12-12", isNoClass: true, type: "holiday" }
      ],
      plannerEntries: {
        "2026-08-10__CVE112__B15.1": { topic: "Course Orientation & Syllabus Overview", activity: "Review of Grading Matrix & Reference Books", type: "Lecture", status: "Completed", notes: "Provide link to syllabus" },
        "2026-08-12__CVE112__B15.1": { topic: "Normal & Shear Stress Review", activity: "Sample problem derivation on whiteboard", type: "Lecture", status: "Planned", notes: "Seatwork #1 assigned" },
        "2026-08-11__CVE112__E15": { topic: "Course Introduction & Policies", activity: "Diagnostic assessment on Statics of Rigid Bodies", type: "Lecture", status: "Planned", notes: "" },
        "2026-08-10__CVE112__M15": { topic: "Course Overview & Objectives", activity: "Discussion of course requirements", type: "Lecture", status: "Planned", notes: "" },
        "2026-08-11__CVE113__J15": { topic: "Introduction to Structural Theory", activity: "Lecture on Determinacy and Stability of Beams", type: "Lecture", status: "Planned", notes: "" },
        "2026-08-14__CVE169__Main": { topic: "Capstone Project Group Formulation", activity: "Brainstorming of Project Titles & Advisers", type: "Laboratory", status: "Planned", notes: "Submit 3 title proposals" }
      },
      studentRoster: [
        { id: "2022-0142", last: "Al-Ghazali", first: "Fatima", email: "fatima.alghazali@msugensan.edu.ph", section: "CVE112 - B15.1", qz: 92, lab: 88, p1: 89, p2: 91, fin: 90 },
        { id: "2023-0854", last: "Pendatun", first: "Datu Ali", email: "ali.pendatun@msugensan.edu.ph", section: "CVE112 - B15.1", qz: 85, lab: 84, p1: 82, p2: 86, fin: 88 },
        { id: "2023-1105", last: "Santos", first: "Juan", email: "juan.santos@msugensan.edu.ph", section: "CVE112 - B15.1", qz: 78, lab: 80, p1: 75, p2: 79, fin: 82 },
        { id: "2023-1490", last: "Campos", first: "Maria", email: "maria.campos@msugensan.edu.ph", section: "CVE112 - E15", qz: 95, lab: 92, p1: 94, p2: 96, fin: 95 },
        { id: "2022-0912", last: "Dimalanta", first: "Karlo", email: "karlo.dimalanta@msugensan.edu.ph", section: "CVE113 - J15", qz: 88, lab: 90, p1: 86, p2: 89, fin: 91 }
      ],
      dailyNotes: {}
    };

    // Active Application State
    let currentWeekViewIndex = 1;
    let semesterConfig = JSON.parse(JSON.stringify(DEFAULT_DATA.semesterConfig));
    let courseData = JSON.parse(JSON.stringify(DEFAULT_DATA.courseData));
    let columnWidths = JSON.parse(JSON.stringify(DEFAULT_DATA.columnWidths));
    let weeklyTimetable = JSON.parse(JSON.stringify(DEFAULT_DATA.weeklyTimetable));
    let msuCalendarEvents = JSON.parse(JSON.stringify(DEFAULT_DATA.msuCalendarEvents));
    let plannerEntries = JSON.parse(JSON.stringify(DEFAULT_DATA.plannerEntries));
    let studentRoster = JSON.parse(JSON.stringify(DEFAULT_DATA.studentRoster));
    let dailyNotes = JSON.parse(JSON.stringify(DEFAULT_DATA.dailyNotes));
    let syllabusBacklog = [];

    let currentEditingCell = null;
    let selectedMonthFilter = "all";
    let pendingConfirmationAction = null;
    let parsedBulkStudents = [];
    let semesterDates = [];
    let noClassSelectedDays = [];
    let noClassCurrentMode = 'single';
    let saveTimeout = null;
    let activityClipboard = null;

    function copyMatrixActivity(dateKey, course, section, e) {
      if (e) e.stopPropagation();
      const cellKey = `${dateKey}__${course}__${section}`;
      const entry = plannerEntries[cellKey];
      if (!entry) {
        showToast("No planned activity to copy in this slot.", "⚠️");
        return;
      }
      activityClipboard = JSON.parse(JSON.stringify(entry));
      showToast(`Copied activity from ${course} (${section})!`, "📋");
    }

    function pasteMatrixActivity(dateKey, course, section, e) {
      if (e) e.stopPropagation();
      if (!activityClipboard) {
        showToast("Clipboard is empty. Copy an activity first.", "⚠️");
        return;
      }
      pushPlannerUndo(`Paste Activity to ${course} (${section})`);
      const cellKey = `${dateKey}__${course}__${section}`;
      plannerEntries[cellKey] = JSON.parse(JSON.stringify(activityClipboard));
      saveAppState();
      renderMatrixTable();
      updateSemesterProgressBar();
      showToast(`Pasted activity to ${course} (${section}) on ${dateKey}!`, "✓");
    }

    // Security & Helper Utilities
    function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function escapeJsString(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/</g, '\\x3c')
        .replace(/>/g, '\\x3e');
    }

    function deepClone(obj) {
      if (typeof structuredClone === 'function') {
        try { return structuredClone(obj); } catch (_) {}
      }
      return JSON.parse(JSON.stringify(obj));
    }

    function formatTime12(timeStr) {
      if (!timeStr) return "";
      const [h, m] = timeStr.split(':');
      let hour = parseInt(h);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12;
      return String(hour).padStart(2, '0') + ':' + m + ' ' + ampm;
    }

    function timeToMinutes(tStr) {
      if (!tStr || typeof tStr !== 'string') return 0;
      let str = tStr.trim();
      const isPM = /pm/i.test(str);
      const isAM = /am/i.test(str);
      str = str.replace(/[^\d:]/g, '');
      const parts = str.split(':').map(Number);
      let h = parts[0] || 0;
      const m = parts[1] || 0;
      if (isPM && h < 12) h += 12;
      if (isAM && h === 12) h = 0;
      return h * 60 + m;
    }

    function showToast(msg, icon = '✓') {
      const toast = document.getElementById('toast');
      const iconElem = document.getElementById('toast-icon');
      const msgElem = document.getElementById('toast-message');
      if (!toast || !iconElem || !msgElem) return;

      iconElem.innerText = icon;
      msgElem.innerText = msg;
      toast.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100', 'toast-animated');
      setTimeout(() => {
        toast.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
        toast.classList.remove('translate-y-0', 'opacity-100', 'toast-animated');
      }, 3500);
    }

    // ================= STORAGE & BACKUP MANAGER =================
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

      // Attach Easter Egg trigger to School Logo & Name
      const brandLogo = document.getElementById('header-school-logo');
      const brandName = document.getElementById('header-school-name');
      if (brandLogo) brandLogo.addEventListener('click', handleLogoEasterEggTap);
      if (brandName) brandName.addEventListener('click', handleLogoEasterEggTap);
            courseData = data.courseData;
            columnWidths = data.columnWidths || columnWidths;
            weeklyTimetable = data.weeklyTimetable || weeklyTimetable;
            msuCalendarEvents = data.msuCalendarEvents || msuCalendarEvents;
            plannerEntries = data.plannerEntries || plannerEntries;
            studentRoster = data.studentRoster || studentRoster;
            dailyNotes = data.dailyNotes || dailyNotes;

            saveAppState();
            semesterDates = generateSemesterDateList();
            populateMonthFilter();
            renderMatrixTable();
            renderWeeklyTimetable();
            renderAcademicCalendarTable();
            renderStudentRoster();
            renderGradebook();
            updateSemesterProgressBar();
            setupSynchronizedScrollbars();
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

      // Attach Easter Egg trigger to School Logo & Name
      const brandLogo = document.getElementById('header-school-logo');
      const brandName = document.getElementById('header-school-name');
      if (brandLogo) brandLogo.addEventListener('click', handleLogoEasterEggTap);
      if (brandName) brandName.addEventListener('click', handleLogoEasterEggTap);
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
          populateMonthFilter();
          renderMatrixTable();
          renderWeeklyTimetable();
          renderAcademicCalendarTable();
          renderStudentRoster();
          renderGradebook();
          updateSemesterProgressBar();
          setupSynchronizedScrollbars();
          closeTermSettingsModal();
          showToast("Data restored to verified defaults.");
        }
      );
    }

    // ================= PERIODIC BACKUP REMINDER SYSTEM =================
    const BACKUP_REMINDER_DAYS = 7;
    const BACKUP_REMINDER_MS = BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000;

    function recordBackupCompleted() {
      try {
        const now = Date.now();
        localStorage.setItem('msu_last_backup_time', String(now));
        localStorage.removeItem('msu_backup_reminder_snoozed_until');
      } catch (e) {
        console.warn("Could not save backup timestamp:", e);
      }
      dismissBackupReminderBanner(false);
      updateBackupStatusUI();
    }

    function formatLastBackupTime() {
      try {
        const last = localStorage.getItem('msu_last_backup_time');
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
        const last = localStorage.getItem('msu_last_backup_time');
        const icon = last ? '🕒 ' : '⚠️ ';
        statusEl.innerHTML = `${icon}<span>${escapeHtml(text)}</span>`;
      }
    }

    function checkBackupReminder() {
      try {
        const snoozedUntil = localStorage.getItem('msu_backup_reminder_snoozed_until');
        if (snoozedUntil && Date.now() < parseInt(snoozedUntil, 10)) {
          return; // Currently snoozed
        }

        const lastBackup = localStorage.getItem('msu_last_backup_time');
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
          let firstInstalled = localStorage.getItem('msu_app_first_installed_time');
          if (!firstInstalled) {
            const rawStored = localStorage.getItem(STORAGE_KEY);
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
            localStorage.setItem('msu_app_first_installed_time', firstInstalled);
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
        localStorage.setItem('msu_backup_reminder_snoozed_until', String(Date.now() + 24 * 60 * 60 * 1000));
      }
    }

    function snoozeBackupReminder(days = 3) {
      const snoozeMs = days * 24 * 60 * 60 * 1000;
      localStorage.setItem('msu_backup_reminder_snoozed_until', String(Date.now() + snoozeMs));
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

    // ================= TAB SWITCHING =================
    function switchTab(tabId) {
      saveAppState(true);
      const tabs = ['planner', 'timetable', 'calendar', 'roster', 'gradebook'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        const content = document.getElementById('tab-content-' + t);
        if (btn) btn.setAttribute('aria-selected', t === tabId ? 'true' : 'false');
        if (t === tabId) {
          if (btn) btn.className = "tab-btn px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 border-msu-gold text-amber-200 flex items-center gap-2 shrink-0";
          if (content) content.classList.remove('hidden');
        } else {
          if (btn) btn.className = "tab-btn px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 border-transparent text-slate-300 hover:text-white flex items-center gap-2 shrink-0 transition";
          if (content) content.classList.add('hidden');
        }
      });

      if (tabId === 'timetable') renderWeeklyTimetable();
      if (tabId === 'calendar') renderAcademicCalendarTable();
      if (tabId === 'roster') renderStudentRoster();
      if (tabId === 'gradebook') renderGradebook();
      if (tabId === 'planner') {
        setupSynchronizedScrollbars();
        updateSemesterProgressBar();
      }
      updateTabSidebar(tabId);
      checkAndSyncBackdrop();
      if (typeof initAllDualScrollbars === 'function') {
        setTimeout(initAllDualScrollbars, 60);
      }
    }

    // ================= SEMESTER TIMELINE & ACADEMIC DATE LOGIC =================
    const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

      const stickyLeftWidth = 204; // 54px Day + 84px Date sticky columns
      const cellLeft = targetCell.offsetLeft;
      const cellWidth = targetCell.offsetWidth;
      const cellRight = cellLeft + cellWidth;

      const viewLeft = wrapper.scrollLeft + stickyLeftWidth;
      const viewRight = wrapper.scrollLeft + wrapper.clientWidth;

      if (cellLeft < viewLeft) {
        // Scrolled too far right or cell hidden behind sticky columns: bring into view
        const newScrollLeft = Math.max(0, cellLeft - stickyLeftWidth - 12);
        wrapper.scrollTo({ left: newScrollLeft, top: wrapper.scrollTop, behavior });
      } else if (cellRight > viewRight) {
        // Off-screen to the right: bring cell into view with padding
        const newScrollLeft = cellRight - wrapper.clientWidth + 24;
        wrapper.scrollTo({ left: newScrollLeft, top: wrapper.scrollTop, behavior });
      }
    }

    function scrollMatrixToRow(targetRow, behavior = 'smooth') {
      const wrapper = document.getElementById('matrix-scroll-wrapper');
      const thead = document.getElementById('matrix-head');
      if (!targetRow || !wrapper) return;
      const theadHeight = (thead && typeof thead.offsetHeight === 'number' && !isNaN(thead.offsetHeight)) ? thead.offsetHeight : 86;
      const targetTop = Math.max(0, targetRow.offsetTop - theadHeight);
      wrapper.scrollTo({ top: targetTop, left: wrapper.scrollLeft, behavior });
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

    
    // ================= GOOGLE CLASSROOM LINKING =================
    function getClassroomLink(courseCode, section) {
      if (!courseData) return '';
      const key = courseCode + '__' + section;
      if (courseData.classroomLinks && courseData.classroomLinks[key]) {
        return courseData.classroomLinks[key];
      }
      return '';
    }

    function setClassroomLink(courseCode, section, url) {
      if (!courseData) return;
      if (!courseData.classroomLinks) courseData.classroomLinks = {};
      const key = courseCode + '__' + section;
      const cleanUrl = (url || '').trim();
      if (cleanUrl) {
        courseData.classroomLinks[key] = cleanUrl;
      } else {
        delete courseData.classroomLinks[key];
      }
      saveAppState();
    }

    function openClassroomModal(courseCode, section) {
      document.getElementById('classroom-modal-course').value = courseCode;
      document.getElementById('classroom-modal-section').value = section;
      
      const currentLink = getClassroomLink(courseCode, section);
      document.getElementById('classroom-modal-url').value = currentLink;

      const sub = courseData.subjects ? courseData.subjects.find(s => s.code === courseCode) : null;
      const subTitle = sub ? sub.title : courseCode;
      const subtitleEl = document.getElementById('classroom-modal-subtitle');
      if (subtitleEl) {
        subtitleEl.innerText = `${courseCode} (${section}) • ${subTitle}`;
      }

      const removeBtn = document.getElementById('classroom-modal-remove-btn');
      if (removeBtn) {
        removeBtn.style.display = currentLink ? 'inline-block' : 'none';
      }

      document.getElementById('google-classroom-modal').classList.remove('hidden');
    }

    function closeClassroomModal() {
      document.getElementById('google-classroom-modal').classList.add('hidden');
    }

    function saveClassroomLink(e) {
      if (e) e.preventDefault();
      const courseCode = document.getElementById('classroom-modal-course').value;
      const section = document.getElementById('classroom-modal-section').value;
      let url = document.getElementById('classroom-modal-url').value.trim();

      if (url && !/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }

      const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');
      setClassroomLink(courseCode, section, url);
      closeClassroomModal();
      renderMatrixTable();
      if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
      if (typeof filterStudentTable === 'function') filterStudentTable();
      if (typeof renderGradebook === 'function') renderGradebook();
      if (wasManageModalOpen) openManageCoursesModal();
      showToast(url ? `Google Classroom link saved for ${courseCode} ${section}!` : `Classroom link removed for ${courseCode} ${section}.`);
    }

    function removeClassroomLink() {
      const courseCode = document.getElementById('classroom-modal-course').value;
      const section = document.getElementById('classroom-modal-section').value;
      const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');
      setClassroomLink(courseCode, section, '');
      closeClassroomModal();
      renderMatrixTable();
      if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
      if (typeof filterStudentTable === 'function') filterStudentTable();
      if (typeof renderGradebook === 'function') renderGradebook();
      if (wasManageModalOpen) openManageCoursesModal();
      showToast(`Classroom link removed for ${courseCode} ${section}.`);
    }

    function testClassroomLink() {
      let url = document.getElementById('classroom-modal-url').value.trim();
      if (!url) {
        showToast("Please enter a URL first.", "⚠️");
        return;
      }
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // ================= PERFECTED LESSON PLANNER MATRIX =================
    function renderMatrixTable() {
      const table = document.getElementById('matrix-table');
      const thead = document.getElementById('matrix-head');
      const tbody = document.getElementById('matrix-body');
      if (!table || !thead || !tbody) return;

      // Enforce fixed layout for perfect pixel-controlled resizing
      table.style.tableLayout = 'fixed';
      updateMatrixTableWidth();

      let filteredDates = semesterDates;
      if (selectedMonthFilter !== 'all') {
        filteredDates = semesterDates.filter(d => d.monthNum === selectedMonthFilter);
      }

      // Build Colgroup for direct column-width resizing
      let colgroupHtml = `
        <col class="col-day" style="width: 54px; min-width: 54px; max-width: 54px;">
        <col class="col-date" style="width: 84px; min-width: 84px; max-width: 84px;">
      `;

      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => {
          const colKey = sub.code + '__' + sec;
          const currentW = columnWidths[colKey] || 205;
          colgroupHtml += `<col id="cg-col-${colKey}" style="width: ${currentW}px;">`;
        });
      });

      colgroupHtml += `<col class="col-notes" style="width: 300px; min-width: 260px;">`;

      let existingColgroup = document.getElementById('matrix-colgroup');
      if (existingColgroup) {
        existingColgroup.innerHTML = colgroupHtml;
      } else {
        const cg = document.createElement('colgroup');
        cg.id = 'matrix-colgroup';
        cg.innerHTML = colgroupHtml;
        table.insertBefore(cg, table.firstChild);
      }

      // ROW 1: Sticky Top Subjects with Rowspan for Day/Date/Notes
      let row1 = `
        <tr class="bg-slate-800 text-white divide-x divide-slate-700">
          <th rowspan="2" class="sticky-header-day p-2 text-center font-bold text-slate-200 bg-slate-900 border-b border-slate-700 select-none">
            Day
          </th>
          <th rowspan="2" class="sticky-header-date p-2 text-center font-bold text-slate-200 bg-slate-900 border-b border-slate-700 select-none">
            Date
          </th>
      `;

      courseData.subjects.forEach(sub => {
        const span = sub.sections.length || 1;
        row1 += `
          <th colspan="${span}" class="p-2 text-center font-extrabold tracking-wide ${sub.headerBg} border-b border-slate-900 shadow-2xs">
            <div class="flex items-center justify-center gap-2">
              <span class="text-xs sm:text-sm font-black tracking-tight">${escapeHtml(sub.code)}</span>
              <span class="text-[10px] font-bold opacity-90 px-1.5 py-0.5 rounded bg-black/25">${sub.units} Units</span>
            </div>
            <div class="text-[10px] font-medium opacity-90 truncate max-w-[210px] mx-auto">${escapeHtml(sub.title)}</div>
          </th>
        `;
      });

      row1 += `
          <th rowspan="2" class="p-2.5 text-center font-bold text-slate-200 bg-slate-900 min-w-[240px] border-b border-slate-700 select-none">
            Academic Events & Campus Notes
          </th>
        </tr>
      `;

      // ROW 2: Subject Sections Row (Clean, perfectly aligned under parent subjects)
      let row2 = `
        <tr class="bg-slate-100 text-slate-800 border-b border-slate-300 divide-x divide-slate-200 shadow-xs">
      `;

      courseData.subjects.forEach(sub => {
        sub.sections.forEach((sec, secIdx) => {
          const colKey = sub.code + '__' + sec;
          const currentW = columnWidths[colKey] || 205;
          const badgeAccent = getSectionBadgeStyle(secIdx);

          const classroomLink = getClassroomLink(sub.code, sec);
          row2 += `
            <th id="th-col-${colKey}" style="width: ${currentW}px;" class="p-1.5 text-center font-bold text-xs bg-slate-100 hover:bg-slate-200/90 text-slate-800 relative select-none transition">
              <div class="flex items-center justify-center gap-1.5">
                <span class="text-[10px] font-bold text-slate-500 uppercase">${escapeHtml(sub.code)}</span>
                ${classroomLink ? `
                  <a href="${escapeHtml(classroomLink)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-black ${badgeAccent} shadow-2xs hover:opacity-85 hover:scale-105 transition active:scale-95" title="Open Google Classroom for ${escapeHtml(sub.code)} ${escapeHtml(sec)} in new tab (${escapeHtml(classroomLink)})" onclick="event.stopPropagation()">
                    <span>${escapeHtml(sec)}</span>
                    <svg class="w-3 h-3 text-emerald-700 shrink-0" viewBox="0 0 24 24" fill="currentColor" title="Google Classroom Linked"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                  </a>
                ` : `
                  <button type="button" onclick="event.stopPropagation(); openClassroomModal('${escapeHtml(sub.code)}', '${escapeHtml(sec)}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-black ${badgeAccent} shadow-2xs hover:opacity-85 hover:scale-105 transition active:scale-95 cursor-pointer" title="Click section to add Google Classroom link for ${escapeHtml(sub.code)} ${escapeHtml(sec)}">
                    <span>${escapeHtml(sec)}</span>
                    <span class="text-[9px] opacity-60 font-medium">+link</span>
                  </button>
                `}
              </div>
              <!-- Column Drag Resizer Handle -->
              <div class="col-resizer" onmousedown="initColumnResize(event, '${colKey}')" title="Drag to resize column (${sub.code} ${sec})"></div>
            </th>
          `;
        });
      });

      row2 += `</tr>`;

      thead.innerHTML = row1 + row2;

      const meetingCounters = {};
      courseData.subjects.forEach(s => {
        s.sections.forEach(sec => {
          meetingCounters[s.code + '__' + sec] = 0;
        });
      });

      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
      const todayDay = String(today.getDate()).padStart(2, '0');
      const todayKey = todayYear + '-' + todayMonth + '-' + todayDay;

      // Pre-index timetable slots into a Map for O(1) lookups across 1,500+ cells
      const timetableMap = new Map();
      (weeklyTimetable || []).forEach(t => {
        timetableMap.set(`${t.course}__${t.section}__${t.day}`, t);
      });

      tbody.innerHTML = filteredDates.map(d => {
        const isToday = (d.dateKey === todayKey);
        const weekendClass = d.isWeekend ? 'bg-slate-300 text-slate-700 font-semibold' : 'bg-white text-slate-800';
        const dayWeekendBadge = d.isWeekend ? 'bg-slate-400 text-slate-900' : 'bg-slate-100 text-slate-700';

        let dateRowHtml = `
          <tr id="row-${d.dateKey}" class="transition border-b border-slate-200 matrix-row-height ${weekendClass} ${isToday ? 'row-today-active' : 'hover:bg-slate-50/80'}">
            <td class="sticky-col-day p-2 text-center font-bold border-r border-slate-200 ${d.isWeekend ? 'bg-slate-300' : 'bg-slate-50'}">
              <span class="inline-block px-1.5 py-0.5 rounded text-[11px] ${dayWeekendBadge}">${d.dayOfWeek}</span>
            </td>

            <td class="sticky-col-date p-2 text-center font-semibold font-mono text-xs border-r border-slate-200 ${d.isWeekend ? 'bg-slate-300 text-slate-800' : 'bg-slate-50 text-slate-700'}">
              ${d.displayDate}
            </td>
        `;

        courseData.subjects.forEach(sub => {
          sub.sections.forEach((sec, secIdx) => {
            const cellKey = d.dateKey + '__' + sub.code + '__' + sec;
            const colKey = sub.code + '__' + sec;
            const currentW = columnWidths[colKey] || 205;
            const entry = plannerEntries[cellKey];

            const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
            const scheduledSlot = timetableMap.get(`${sub.code}__${sec}__${fullDay}`);
            const accentBarClass = getSectionAccent(secIdx);

            if (d.isWeekend) {
              const weekendEntry = plannerEntries[cellKey];
              if (weekendEntry) {
                let badgeColor = sub.badgeBg;
                if (weekendEntry.type === 'Exam') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
                if (weekendEntry.type === 'No Class') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
                dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-300 bg-slate-300/80 cursor-pointer hover:bg-slate-200/90 transition align-middle overflow-hidden" onclick="openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1.5 rounded-lg border ${badgeColor} ${accentBarClass} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0">
                      <div class="flex items-center justify-between gap-1 overflow-hidden">
                        <span class="font-extrabold text-[9px] uppercase tracking-tight truncate">Weekend</span>
                        <span class="text-[8px] px-1 py-0.2 rounded font-bold bg-white/80 shrink-0">${escapeHtml(weekendEntry.type)}</span>
                      </div>
                      <div class="font-bold text-[11px] leading-tight truncate max-w-full" title="${escapeHtml(weekendEntry.topic || 'Planned Activity')}">${escapeHtml(weekendEntry.topic || 'Planned Activity')}</div>
                      ${weekendEntry.activity ? `<div class="text-[9px] opacity-80 truncate max-w-full" title="${escapeHtml(weekendEntry.activity)}">${escapeHtml(weekendEntry.activity)}</div>` : ''}
                    </div>
                  </td>
                `;
              } else {
                dateRowHtml += `<td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-300 bg-slate-300/80 cursor-pointer hover:bg-slate-200/90 transition align-middle overflow-hidden" onclick="openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})"></td>`;
              }
              return;
            }

            if (d.isNoClassDate) {
              dateRowHtml += `
                <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 bg-rose-50/50 text-center align-middle overflow-hidden">
                  <span id="card-${cellKey}" class="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-300">
                    No Class
                  </span>
                </td>
              `;
              return;
            }

            if (scheduledSlot) {
              if (entry) {
                const isNoClass = (entry.type === 'No Class') || (entry.topic && entry.topic.toLowerCase().includes('no class'));
                if (!isNoClass) {
                  meetingCounters[sub.code + '__' + sec]++;
                }
                const meetingNum = meetingCounters[sub.code + '__' + sec];

                const isEntryCompleted = (entry.status === 'Completed') || (d.dateKey < todayKey);
                let badgeColor = sub.badgeBg;
                if (entry.type === 'Exam') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
                if (entry.type === 'No Class') badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';

                dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1.5 rounded-lg border ${badgeColor} ${accentBarClass} shadow-xs space-y-0.5 overflow-hidden max-w-full min-w-0 transition-all duration-200 ease-out group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-xl group-hover/card-cell:scale-[1.02] ${badgeColor}">
                      <div class="flex items-center justify-between gap-1 overflow-hidden">
                        ${!isNoClass ? `<span class="font-extrabold text-[9px] uppercase tracking-tight truncate">Mtg #${meetingNum}</span>` : `<span class="font-extrabold text-[9px] uppercase tracking-tight text-rose-700 truncate">${escapeHtml(entry.type || 'No Class')}</span>`}
                        <div class="flex items-center gap-1 shrink-0">
                          ${isEntryCompleted ? '<span class="text-[8px] px-1 py-0.2 rounded font-black bg-emerald-600 text-white shrink-0">✓ Done</span>' : ''}
                          <span class="text-[8px] px-1 py-0.2 rounded font-bold bg-white/80 shrink-0">${escapeHtml(entry.type)}</span>
                        </div>
                      </div>
                      <div class="font-bold text-[11px] leading-tight truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(entry.topic || 'Planned Activity')}">${escapeHtml(entry.topic || 'Planned Activity')}</div>
                      ${entry.activity ? `<div class="text-[9px] opacity-80 truncate group-hover/card-cell:whitespace-normal group-hover/card-cell:overflow-visible transition-all max-w-full" title="${escapeHtml(entry.activity)}">${escapeHtml(entry.activity)}</div>` : ''}
                      <div class="hidden group-hover/card-cell:flex items-center justify-between text-[8.5px] font-mono font-bold pt-1 mt-1 border-t border-black/10 text-slate-700">
                        <span>🕒 ${formatTime12(scheduledSlot.startTime)} – ${formatTime12(scheduledSlot.endTime)}</span>
                        <span class="px-1 py-0.2 rounded bg-white/80 border border-slate-300/60 font-sans font-semibold">${escapeHtml(scheduledSlot.room || 'TBA')}</span>
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-black/10">
                        <button type="button" onclick="copyMatrixActivity('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Copy Activity">📋 Copy</button>
                        <button type="button" onclick="pasteMatrixActivity('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', event)" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})" class="p-1 rounded bg-white/90 hover:bg-white text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Edit Activity">✏️ Edit</button>
                      </div>
                    </div>
                  </td>
                `;
              } else {
                dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition align-top relative group/card-cell matrix-cell-slot" onclick="openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1.5 rounded-lg border border-dashed border-slate-300 hover:border-msu-maroon text-slate-500 hover:text-slate-800 bg-slate-50/60 hover:bg-white text-center ${accentBarClass} transition-all duration-200 group-hover/card-cell:absolute group-hover/card-cell:left-1 group-hover/card-cell:right-1 group-hover/card-cell:top-1 group-hover/card-cell:z-22 group-hover/card-cell:shadow-lg group-hover/card-cell:scale-[1.02] group-hover/card-cell:bg-white">
                      <div class="text-[10px] text-slate-500 font-semibold py-1">+ Click to plan</div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-center text-[8.5px] font-mono text-slate-500 pt-0.5 mt-0.5 border-t border-slate-200">
                        🕒 ${formatTime12(scheduledSlot.startTime)} – ${formatTime12(scheduledSlot.endTime)} • ${escapeHtml(scheduledSlot.room || 'TBA')}
                      </div>
                      <div class="hidden group-hover/card-cell:flex items-center justify-end gap-1 pt-1 mt-1 border-t border-slate-200">
                        <button type="button" onclick="pasteMatrixActivity('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', event)" class="p-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Paste Copied Activity">📥 Paste</button>
                        <button type="button" onclick="event.stopPropagation(); openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})" class="p-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-300 shadow-2xs" title="Open Planner">✏️ Edit</button>
                      </div>
                    </div>
                  </td>
                `;
              }
            } else {
              if (entry) {
                dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 cursor-pointer hover:bg-amber-50/40 transition align-middle overflow-hidden" onclick="openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})">
                    <div id="card-${cellKey}" class="p-1.5 rounded-lg border bg-slate-50 border-slate-200 text-slate-800 ${accentBarClass} overflow-hidden max-w-full min-w-0">
                      <div class="font-bold text-[9px] text-slate-600 truncate">Special Session</div>
                      <div class="font-bold text-[11px] truncate max-w-full" title="${escapeHtml(entry.topic)}">${escapeHtml(entry.topic)}</div>
                    </div>
                  </td>
                `;
              } else {
                dateRowHtml += `
                  <td id="cell-${cellKey}" data-cell-key="${cellKey}" data-col="${colKey}" style="width: ${currentW}px; min-width: ${currentW}px; max-width: ${currentW}px;" class="p-1 border-r border-slate-200 text-center text-slate-300 text-[11px] cursor-pointer hover:bg-slate-50 align-middle overflow-hidden" onclick="openLessonModal('${d.dateKey}', '${escapeHtml(sub.code)}', '${escapeHtml(sec)}', ${d.isWeekend})">
                    —
                  </td>
                `;
              }
            }
          });
        });

        const customNote = dailyNotes[d.dateKey] || '';
        let eventContent = '';
        if (d.event || customNote) {
          let badgeTheme = 'bg-blue-100 text-blue-900 border-blue-300';
          if (d.event && d.event.isNoClass) badgeTheme = 'bg-rose-100 text-rose-900 border-rose-300';
          else if (d.event && d.event.type === 'exam') badgeTheme = 'bg-amber-100 text-amber-900 border-amber-400';
          else if (d.event && d.event.type === 'milestone') badgeTheme = 'bg-emerald-100 text-emerald-900 border-emerald-300';

          eventContent = `
            <div id="card-${d.dateKey}__notes" class="p-1.5 rounded-lg border bg-slate-50 border-slate-200 shadow-xs space-y-1">
              ${d.event ? `
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-extrabold border ${badgeTheme}">
                    ${escapeHtml(d.event.activity)}
                  </span>
                  ${d.event.isNoClass ? `<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-700 border border-rose-200">No Class</span>` : ''}
                </div>
              ` : ''}
              ${customNote ? `<div class="text-[11px] text-slate-700 font-medium italic">${escapeHtml(customNote)}</div>` : ''}
            </div>
          `;
        } else {
          eventContent = `
            <div id="card-${d.dateKey}__notes" class="text-center text-slate-300 text-[11px] select-none py-1">—</div>
          `;
        }

        dateRowHtml += `
            <td id="cell-${d.dateKey}__notes" data-cell-key="${d.dateKey}__notes" class="p-1 border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition align-middle" onclick="openEventEditorModal('${d.dateKey}')">
              ${eventContent}
            </td>
          </tr>
        `;

        return dateRowHtml;
      }).join('');

      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => setupSynchronizedScrollbars());
      } else {
        setupSynchronizedScrollbars();
      }
      if (typeof updatePlannerSidebar === 'function') {
        updatePlannerSidebar();
      }
    }

    // High Performance Smooth Drag-Resizing via Colgroup, Th & Table Cells
    let activeResizeColKey = null;
    let resizeStartX = 0;
    let resizeStartWidth = 0;
    let minResizeWidth = 60;

    function updateMatrixTableWidth() {
      const table = document.getElementById('matrix-table');
      if (!table) return;
      let totalW = 54 + 84 + 66 + 300; // day + date + progress + notes
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => {
          const k = sub.code + '__' + sec;
          totalW += (columnWidths[k] || 205);
        });
      });
      table.style.width = totalW + 'px';
      table.style.minWidth = totalW + 'px';
    }

    function initColumnResize(e, colKey) {
      e.preventDefault();
      e.stopPropagation();

      activeResizeColKey = colKey;
      resizeStartX = e.clientX;
      resizeStartWidth = columnWidths[colKey] || 205;

      // Allow flexible shrinking even with long text down to 60px
      minResizeWidth = 60;

      document.body.style.cursor = 'col-resize';
      document.body.classList.add('select-none');

      document.addEventListener('mousemove', handleColumnResizeMove);
      document.addEventListener('mouseup', stopColumnResize);
    }

    function handleColumnResizeMove(e) {
      if (!activeResizeColKey) return;
      const delta = e.clientX - resizeStartX;
      const newWidth = Math.max(minResizeWidth, Math.min(600, Math.round(resizeStartWidth + delta)));

      columnWidths[activeResizeColKey] = newWidth;

      const cg = document.getElementById('cg-col-' + activeResizeColKey);
      if (cg) {
        cg.style.width = newWidth + 'px';
        cg.style.minWidth = newWidth + 'px';
        cg.style.maxWidth = newWidth + 'px';
      }

      const th = document.getElementById('th-col-' + activeResizeColKey);
      if (th) {
        th.style.width = newWidth + 'px';
        th.style.minWidth = newWidth + 'px';
        th.style.maxWidth = newWidth + 'px';
      }

      // Update cells in the active column so table respects width even with long text
      const cells = document.querySelectorAll(`td[data-col="${activeResizeColKey}"]`);
      cells.forEach(td => {
        td.style.width = newWidth + 'px';
        td.style.minWidth = newWidth + 'px';
        td.style.maxWidth = newWidth + 'px';
      });

      updateMatrixTableWidth();
      setupSynchronizedScrollbars();
    }

    function stopColumnResize() {
      if (!activeResizeColKey) return;

      document.removeEventListener('mousemove', handleColumnResizeMove);
      document.removeEventListener('mouseup', stopColumnResize);

      document.body.style.cursor = '';
      document.body.classList.remove('select-none');

      activeResizeColKey = null;
      setupSynchronizedScrollbars();
      saveAppState();
    }

    // ================= TIMETABLE WITH ONE-LINE TEXT & PERFECT ALIGNMENT =================
    function renderWeeklyTimetable() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const baseHour = 7;
      const hourHeight = 54;
      const pixelsPerMinute = hourHeight / 60;

      days.forEach(day => {
        const col = document.getElementById('timetable-col-' + day);
        if (!col) return;

        col.innerHTML = '';
        const daySlots = weeklyTimetable.filter(slot => slot.day === day);

        daySlots.forEach(slot => {
          const startMin = timeToMinutes(slot.startTime);
          const endMin = timeToMinutes(slot.endTime);
          const durationMin = Math.max(15, endMin - startMin);

          const topOffsetPx = Math.round((startMin - (baseHour * 60)) * pixelsPerMinute);
          const heightPx = Math.max(48, Math.round(durationMin * pixelsPerMinute));

          const isCompact = durationMin <= 60;
          const isMedium = durationMin > 60 && durationMin <= 90;
          const cardPadding = isCompact ? 'px-2.5 py-1' : (isMedium ? 'px-2.5 py-1.5' : 'p-2.5');

          const sub = courseData.subjects.find(s => s.code === slot.course) || {};
          const secIndex = sub.sections ? sub.sections.indexOf(slot.section) : 0;
          const accentBarClass = getSectionAccent(secIndex >= 0 ? secIndex : 0);

          // Detect schedule collision / overlap
          const hasOverlap = daySlots.some(other => {
            if (other === slot) return false;
            const otherStart = timeToMinutes(other.startTime);
            const otherEnd = timeToMinutes(other.endTime);
            return (startMin < otherEnd && endMin > otherStart);
          });

          const classroomLink = getClassroomLink(slot.course, slot.section);

          const card = document.createElement('div');
          card.className = `absolute left-1 right-1 rounded-xl ${cardPadding} border shadow-xs transition hover:shadow-md hover:z-20 cursor-pointer overflow-hidden flex flex-col justify-between ${hasOverlap ? 'border-rose-500 ring-2 ring-rose-400 bg-rose-50 text-rose-950' : (sub.color || 'bg-blue-50 border-blue-300 text-blue-950')} ${accentBarClass}`;
          card.style.top = topOffsetPx + 'px';
          card.style.height = heightPx + 'px';

          card.title = `${slot.course} (${slot.section}) - ${sub.title || slot.course}\nSchedule: ${formatTime12(slot.startTime)} - ${formatTime12(slot.endTime)}\nRoom: ${slot.room || 'TBA'} • Type: ${slot.type || 'Lecture'}`;

          card.onclick = () => openEditScheduleModalForSlot(slot.course, slot.section, slot.day, slot.startTime);

          card.innerHTML = `
            <div class="${isCompact ? 'space-y-0' : 'space-y-0.5'}">
              <div class="flex items-center justify-between gap-1 leading-tight">
                <span class="font-extrabold ${isCompact ? 'text-[11.5px]' : 'text-xs'} tracking-tight truncate">${escapeHtml(slot.course)}</span>
                <div class="flex items-center gap-1 shrink-0">
                  ${hasOverlap ? '<span class="text-[8px] px-1 py-0.5 rounded font-black bg-rose-600 text-white uppercase animate-pulse">Overlap</span>' : ''}
                  ${classroomLink ? `
                    <a href="${escapeHtml(classroomLink)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded font-black bg-white/95 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-300/80 hover:border-emerald-400 uppercase shadow-2xs transition group leading-none" title="Open Google Classroom for ${escapeHtml(slot.course)} ${escapeHtml(slot.section)} in new tab (${escapeHtml(classroomLink)})">
                      <span>${escapeHtml(slot.section)}</span>
                      <svg class="w-2.5 h-2.5 text-emerald-600 shrink-0 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                    </a>
                  ` : `
                    <button type="button" onclick="event.stopPropagation(); openClassroomModal('${escapeHtml(slot.course)}', '${escapeHtml(slot.section)}')" class="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded font-black bg-white/90 hover:bg-slate-100 text-slate-800 border border-slate-300/80 uppercase shadow-2xs transition leading-none" title="Click section to link Google Classroom for ${escapeHtml(slot.course)} ${escapeHtml(slot.section)}">
                      <span>${escapeHtml(slot.section)}</span>
                    </button>
                  `}
                </div>
              </div>
              <div class="text-[10px] font-semibold opacity-90 truncate leading-tight">${escapeHtml(sub.title || slot.course)}</div>
            </div>
            <div class="flex items-center justify-between ${isCompact ? 'text-[9px] pt-0.5' : 'text-[10px] mt-1 pt-1'} font-mono font-bold leading-tight border-t border-slate-900/10 whitespace-nowrap overflow-hidden gap-1">
              <span class="truncate">${formatTime12(slot.startTime)} - ${formatTime12(slot.endTime)}</span>
              <span class="${isCompact ? 'px-1 py-0.2 text-[8.5px]' : 'px-1.5 py-0.5'} rounded bg-white/80 border border-slate-300/70 font-sans shrink-0 leading-none">${escapeHtml(slot.room)}</span>
            </div>
          `;

          card.id = 'timetable-card-' + String(slot.course).replace(/\s+/g, '_') + '-' + String(slot.section).replace(/\s+/g, '_') + '-' + day;
          col.appendChild(card);
        });
      });
      if (typeof updateTimetableSidebar === 'function') {
        updateTimetableSidebar();
      }
    }

    // ================= ACADEMIC CALENDAR & VERIFIED MSU INGESTION =================
    let calendarTypeFilter = 'all';

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
          admin: { text: 'Administrative', class: 'bg-slate-100 text-slate-700 border-slate-300' },
          exam: { text: 'Major Examination', class: 'bg-amber-100 text-amber-800 border-amber-300' },
          milestone: { text: 'Term Milestone', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
          activity: { text: 'University Activity', class: 'bg-blue-100 text-blue-800 border-blue-300' },
          holiday: { text: 'Holiday / Suspended', class: 'bg-rose-100 text-rose-800 border-rose-300' }
        };

        const currentMeta = typeMetaMap[evt.type] || typeMetaMap.admin;
        const statusText = currentMeta.text;
        const badgeClass = currentMeta.class;
        const showNoClassTag = !!evt.isNoClass && evt.type !== 'holiday';

        return `
          <tr id="cal-event-row-${idx}" class="hover:bg-slate-50 transition border-b border-slate-200">
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1.5 flex-wrap">
                <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}">
                  ${statusText}
                </span>
                ${showNoClassTag ? `
                  <span class="inline-block px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs" title="Class sessions suspended">
                    No Class
                  </span>
                ` : ''}
              </div>
            </td>
            <td class="py-2.5 px-4 font-bold text-slate-800">${escapeHtml(evt.activity)}</td>
            <td class="py-2.5 px-4 font-semibold text-msu-maroon bg-amber-50/40 border-x border-amber-200/60">${escapeHtml(evt.firstSem || '—')}</td>
            <td class="py-2.5 px-4 font-semibold text-blue-900 bg-blue-50/20 border-r border-blue-200/60">${escapeHtml(evt.secondSem || '—')}</td>
            <td class="py-2.5 px-4 font-semibold text-emerald-900 bg-emerald-50/20 border-r border-emerald-200/60">${escapeHtml(evt.summer || '—')}</td>
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button onclick="openEditCalendarEvent(${idx})" title="Edit event" class="p-1.5 text-slate-500 hover:text-msu-maroon hover:bg-slate-100 rounded-lg transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button onclick="deleteCalendarEventByIndex(${idx})" title="Delete event" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
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

    // Load Official Verified MSU-GSC AY 2026-2027 Calendar Directly
    function loadOfficialMsuCalendar() {
      msuCalendarEvents = JSON.parse(JSON.stringify(DEFAULT_DATA.msuCalendarEvents));

      semesterDates = generateSemesterDateList();
      populateMonthFilter();
      renderMatrixTable();
      renderAcademicCalendarTable();
      updateSemesterProgressBar();
      saveAppState();
      closeUploadCalendarModal();
      showToast("Official MSU-GSC AY 2026–2027 Calendar loaded!");
    }

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
          if (!activityTitle) activityTitle = "MSU Academic Event";

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
      populateMonthFilter();
      renderMatrixTable();
      renderAcademicCalendarTable();
      updateSemesterProgressBar();
      saveAppState();
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
            // Scanned image PDF without text layer: automatically load verified MSU AY 2026-2027 calendar!
            loadOfficialMsuCalendar();
            showToast('Scanned PDF detected. Applied verified MSU AY 2026–2027 Calendar!');
          }

          statusBox.classList.add('hidden');
          closeUploadCalendarModal();
        } catch (err) {
          console.error("PDF upload error:", err);
          statusBox.classList.add('hidden');
          loadOfficialMsuCalendar();
          showToast('Loaded verified MSU AY 2026–2027 Calendar schedule!');
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
        populateMonthFilter();
        renderMatrixTable();
        renderAcademicCalendarTable();
        updateSemesterProgressBar();
        saveAppState();
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
          renderMatrixTable();
          renderAcademicCalendarTable();
          updateSemesterProgressBar();
          saveAppState();
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
      renderMatrixTable();
      renderAcademicCalendarTable();
      updateSemesterProgressBar();
      saveAppState();
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
      renderMatrixTable();
      renderAcademicCalendarTable();
      updateSemesterProgressBar();
      saveAppState();
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
        document.getElementById('filter-month').value = 'all';
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
      selectedMonthFilter = document.getElementById('filter-month').value;
      renderMatrixTable();
      saveAppState();
    }

    // ================= SEMESTER & BRANDING SETTINGS =================
    let tempUploadedLogo = undefined;

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

      // Attach Easter Egg trigger to School Logo & Name
      const brandLogo = document.getElementById('header-school-logo');
      const brandName = document.getElementById('header-school-name');
      if (brandLogo) brandLogo.addEventListener('click', handleLogoEasterEggTap);
      if (brandName) brandName.addEventListener('click', handleLogoEasterEggTap);

      document.getElementById('header-term-title').innerText = semesterConfig.title + ' • Course Planning & Activity Matrix';
      document.getElementById('planner-term-label').innerText = semesterConfig.title + ' Matrix';

      semesterDates = generateSemesterDateList();
      populateMonthFilter();
      renderMatrixTable();
      renderAcademicCalendarTable();
      updateSemesterProgressBar();
      saveAppState();
      closeTermSettingsModal();
      showToast("Portal branding & academic timeline updated successfully!");
    }

    // ================= TIMETABLE MODAL EDITING =================
    function openEditScheduleModalForSlot(course, section, day, startTime) {
      const idx = weeklyTimetable.findIndex(t => t.course === course && t.section === section && t.day === day && t.startTime === startTime);
      if (idx === -1) return;

      const slot = weeklyTimetable[idx];

      document.getElementById('sched-editor-title').innerText = 'Edit Section Schedule (' + course + ')';
      document.getElementById('sched-editor-subtitle').innerText = 'Update days, hours, and room for section ' + section + '.';
      document.getElementById('sched-edit-index').value = idx;
      document.getElementById('sched-delete-btn').classList.remove('hidden');

      populateScheduleModalDropdowns(course, section);

      const checkboxes = document.querySelectorAll('#sched-days-group input[type="checkbox"]');
      checkboxes.forEach(c => {
        c.checked = (c.value === day);
      });

      document.getElementById('sched-start-time').value = slot.startTime;
      document.getElementById('sched-end-time').value = slot.endTime;
      document.getElementById('sched-room-input').value = slot.room;
      document.getElementById('sched-type-input').value = slot.type || 'Lecture';

      const classroomInput = document.getElementById('sched-classroom-url');
      if (classroomInput) {
        classroomInput.value = (typeof getClassroomLink === 'function' ? getClassroomLink(course, section) : '') || '';
      }

      document.getElementById('schedule-modal').classList.remove('hidden');
    }

    function openAddScheduleModal() {
      document.getElementById('sched-editor-title').innerText = "Add Section Schedule";
      document.getElementById('sched-editor-subtitle').innerText = "Configure meeting hours and room allocation.";
      document.getElementById('sched-edit-index').value = "-1";
      document.getElementById('sched-delete-btn').classList.add('hidden');

      populateScheduleModalDropdowns();

      const checkboxes = document.querySelectorAll('#sched-days-group input[type="checkbox"]');
      checkboxes.forEach(c => c.checked = false);

      document.getElementById('sched-start-time').value = "07:30";
      document.getElementById('sched-end-time').value = "09:00";
      document.getElementById('sched-room-input').value = "Eng 201";

      const classroomInput = document.getElementById('sched-classroom-url');
      if (classroomInput) {
        classroomInput.value = '';
      }

      document.getElementById('schedule-modal').classList.remove('hidden');
    }

    function populateScheduleModalDropdowns(selectedCourse = null, selectedSec = null) {
      const courseSelect = document.getElementById('sched-course-select');
      courseSelect.innerHTML = courseData.subjects.map(s => `
        <option value="${s.code}" ${selectedCourse === s.code ? 'selected' : ''}>${escapeHtml(s.code)} - ${escapeHtml(s.title)}</option>
      `).join('');
      if (selectedCourse) courseSelect.value = selectedCourse;

      updateScheduleSectionDropdown(selectedSec);
    }

    function updateScheduleSectionDropdown(selectedSec = null) {
      const courseCode = document.getElementById('sched-course-select').value;
      const sub = courseData.subjects.find(s => s.code === courseCode);
      const secSelect = document.getElementById('sched-section-select');

      if (!sub || !sub.sections.length) {
        secSelect.innerHTML = '<option value="Main">Main</option>';
        secSelect.value = 'Main';
        return;
      }

      secSelect.innerHTML = sub.sections.map(sec => `
        <option value="${sec}" ${selectedSec === sec ? 'selected' : ''}>${escapeHtml(sec)}</option>
      `).join('');
      if (selectedSec) secSelect.value = selectedSec;

      const classroomInput = document.getElementById('sched-classroom-url');
      if (classroomInput && typeof getClassroomLink === 'function') {
        const activeSec = selectedSec || secSelect.value;
        classroomInput.value = (activeSec ? getClassroomLink(courseCode, activeSec) : '') || '';
      }
    }

    function closeScheduleEditorModal() {
      document.getElementById('schedule-modal').classList.add('hidden');
    }

    function saveScheduleEditorData() {
      const course = document.getElementById('sched-course-select').value;
      const section = document.getElementById('sched-section-select').value;
      const startTime = document.getElementById('sched-start-time').value;
      const endTime = document.getElementById('sched-end-time').value;
      const room = document.getElementById('sched-room-input').value.trim() || 'TBA';
      const type = document.getElementById('sched-type-input').value;
      const editIndex = parseInt(document.getElementById('sched-edit-index').value);
      const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');

      const classroomInput = document.getElementById('sched-classroom-url');
      if (classroomInput && typeof setClassroomLink === 'function') {
        let cleanClassUrl = classroomInput.value.trim();
        if (cleanClassUrl && !/^https?:\/\//i.test(cleanClassUrl)) {
          cleanClassUrl = 'https://' + cleanClassUrl;
        }
        setClassroomLink(course, section, cleanClassUrl);
      }

      const checkedDays = Array.from(document.querySelectorAll('#sched-days-group input[type="checkbox"]:checked')).map(c => c.value);

      if (checkedDays.length === 0) {
        showToast("Please select at least one day of the week.", "⚠️");
        return;
      }

      if (!startTime || !endTime || startTime >= endTime) {
        showToast("Start time must be strictly earlier than End time.", "⚠️");
        return;
      }

      if (editIndex >= 0) {
        weeklyTimetable.splice(editIndex, 1);
      }

      checkedDays.forEach(day => {
        const duplicateIdx = weeklyTimetable.findIndex(t => t.course === course && t.section === section && t.day === day && t.startTime === startTime);
        if (duplicateIdx >= 0) {
          weeklyTimetable.splice(duplicateIdx, 1);
        }

        weeklyTimetable.push({ course, section, day, startTime, endTime, room, type });
      });

      saveAppState();
      closeScheduleEditorModal();
      renderWeeklyTimetable();
      renderMatrixTable();
      if (wasManageModalOpen) {
        openManageCoursesModal();
      }
      updateSemesterProgressBar();
      showToast('Schedule saved for ' + course + ' (' + section + ')');
    }

    function deleteCurrentScheduleSlot() {
      const editIndex = parseInt(document.getElementById('sched-edit-index').value);
      const wasManageModalOpen = !document.getElementById('manage-courses-modal')?.classList.contains('hidden');
      if (editIndex >= 0) {
        weeklyTimetable.splice(editIndex, 1);
        saveAppState();
        closeScheduleEditorModal();
        renderWeeklyTimetable();
        renderMatrixTable();
        if (wasManageModalOpen) {
          openManageCoursesModal();
        }
        updateSemesterProgressBar();
        showToast("Schedule slot removed.");
      }
    }

    // ================= MANAGE COURSES & SECTIONS =================
    function moveSubjectOrder(index, direction) {
      if (!courseData || !courseData.subjects) return;
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= courseData.subjects.length) return;

      const item = courseData.subjects[index];
      const otherItem = courseData.subjects[newIndex];
      const safeCodeA = item.code.replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeCodeB = otherItem.code.replace(/[^a-zA-Z0-9_-]/g, '_');

      // 1. FIRST: Capture bounding rects before DOM re-render
      const cardA = document.getElementById(`manage-subject-card-${safeCodeA}`);
      const cardB = document.getElementById(`manage-subject-card-${safeCodeB}`);
      const rectA = cardA ? cardA.getBoundingClientRect() : null;
      const rectB = cardB ? cardB.getBoundingClientRect() : null;

      // 2. Mutate state
      courseData.subjects.splice(index, 1);
      courseData.subjects.splice(newIndex, 0, item);

      saveAppState();
      renderMatrixTable();
      openManageCoursesModal();

      // 3. LAST, INVERT, PLAY: Animate the physical card swap
      if (rectA && rectB) {
        const newCardA = document.getElementById(`manage-subject-card-${safeCodeA}`);
        const newCardB = document.getElementById(`manage-subject-card-${safeCodeB}`);
        if (newCardA && newCardB) {
          const newRectA = newCardA.getBoundingClientRect();
          const newRectB = newCardB.getBoundingClientRect();
          const deltaYA = rectA.top - newRectA.top;
          const deltaYB = rectB.top - newRectB.top;

          newCardA.style.transform = `translateY(${deltaYA}px)`;
          newCardA.style.transition = 'none';
          newCardA.style.willChange = 'transform';
          newCardA.style.zIndex = '10';

          newCardB.style.transform = `translateY(${deltaYB}px)`;
          newCardB.style.transition = 'none';
          newCardB.style.willChange = 'transform';
          newCardB.style.zIndex = '5';

          // Force reflow
          newCardA.offsetHeight;

          requestAnimationFrame(() => {
            newCardA.style.transition = 'transform 580ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 580ms ease';
            newCardA.style.transform = 'translateY(0)';
            newCardA.classList.add('ring-2', 'ring-msu-gold/80', 'shadow-md');

            newCardB.style.transition = 'transform 580ms cubic-bezier(0.22, 1, 0.36, 1)';
            newCardB.style.transform = 'translateY(0)';

            setTimeout(() => {
              newCardA.style.transform = '';
              newCardA.style.transition = '';
              newCardA.style.willChange = '';
              newCardA.style.zIndex = '';
              newCardA.classList.remove('ring-2', 'ring-msu-gold/80', 'shadow-md');

              newCardB.style.transform = '';
              newCardB.style.transition = '';
              newCardB.style.willChange = '';
              newCardB.style.zIndex = '';
            }, 640);
          });
        }
      }

      showToast(`Moved ${item.code} ${direction < 0 ? 'up (left in matrix)' : 'down (right in matrix)'}!`);
    }

    function moveSectionOrder(subIdx, secIdx, direction) {
      if (!courseData || !courseData.subjects || !courseData.subjects[subIdx]) return;
      const sub = courseData.subjects[subIdx];
      if (!sub.sections) return;
      const newIdx = secIdx + direction;
      if (newIdx < 0 || newIdx >= sub.sections.length) return;

      const sec = sub.sections[secIdx];
      const otherSec = sub.sections[newIdx];
      const safeSub = sub.code.replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeSecA = sec.replace(/[^a-zA-Z0-9_-]/g, '_');
      const safeSecB = otherSec.replace(/[^a-zA-Z0-9_-]/g, '_');

      // 1. FIRST: Capture bounding rects before DOM re-render
      const rowA = document.getElementById(`manage-sec-row-${safeSub}__${safeSecA}`);
      const rowB = document.getElementById(`manage-sec-row-${safeSub}__${safeSecB}`);
      const rectA = rowA ? rowA.getBoundingClientRect() : null;
      const rectB = rowB ? rowB.getBoundingClientRect() : null;

      // 2. Mutate state
      sub.sections.splice(secIdx, 1);
      sub.sections.splice(newIdx, 0, sec);

      saveAppState();
      renderMatrixTable();
      openManageCoursesModal();

      // 3. LAST, INVERT, PLAY: Animate the physical row swap
      if (rectA && rectB) {
        const newRowA = document.getElementById(`manage-sec-row-${safeSub}__${safeSecA}`);
        const newRowB = document.getElementById(`manage-sec-row-${safeSub}__${safeSecB}`);
        if (newRowA && newRowB) {
          const newRectA = newRowA.getBoundingClientRect();
          const newRectB = newRowB.getBoundingClientRect();
          const deltaYA = rectA.top - newRectA.top;
          const deltaYB = rectB.top - newRectB.top;

          newRowA.style.transform = `translateY(${deltaYA}px)`;
          newRowA.style.transition = 'none';
          newRowA.style.willChange = 'transform';
          newRowA.style.zIndex = '10';

          newRowB.style.transform = `translateY(${deltaYB}px)`;
          newRowB.style.transition = 'none';
          newRowB.style.willChange = 'transform';
          newRowB.style.zIndex = '5';

          // Force reflow
          newRowA.offsetHeight;

          requestAnimationFrame(() => {
            newRowA.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms ease';
            newRowA.style.transform = 'translateY(0)';
            newRowA.classList.add('ring-2', 'ring-msu-gold/80', 'shadow-xs');

            newRowB.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
            newRowB.style.transform = 'translateY(0)';

            setTimeout(() => {
              newRowA.style.transform = '';
              newRowA.style.transition = '';
              newRowA.style.willChange = '';
              newRowA.style.zIndex = '';
              newRowA.classList.remove('ring-2', 'ring-msu-gold/80', 'shadow-xs');

              newRowB.style.transform = '';
              newRowB.style.transition = '';
              newRowB.style.willChange = '';
              newRowB.style.zIndex = '';
            }, 550);
          });
        }
      }

      showToast(`Moved section ${sec} ${direction < 0 ? 'up (left in matrix)' : 'down (right in matrix)'}!`);
    }

    function openManageCoursesModal() {
      renderColorSwatches('new');
      const container = document.getElementById('manage-courses-list');
      if (!container) return;

      // Preserve scroll position inside modal if re-rendering while open
      const scrollParent = container.parentElement;
      const prevScrollTop = scrollParent ? scrollParent.scrollTop : 0;

      container.innerHTML = courseData.subjects.map((sub, subIdx) => {
        const subSlots = weeklyTimetable.filter(t => t.course === sub.code);
        const isFirstSub = (subIdx === 0);
        const isLastSub = (subIdx === courseData.subjects.length - 1);
        const safeSub = sub.code.replace(/[^a-zA-Z0-9_-]/g, '_');

        return `
          <div id="manage-subject-card-${safeSub}" class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 transition-shadow">
            <div class="flex items-center justify-between gap-2.5">
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <!-- Leftmost Stacked Reorder Arrows -->
                <div class="inline-flex flex-col border border-slate-300 rounded-md overflow-hidden bg-white shadow-2xs shrink-0 select-none">
                  <button type="button" onclick="moveSubjectOrder(${subIdx}, -1)" ${isFirstSub ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-b border-slate-200 transition ${isFirstSub ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move ${escapeHtml(sub.code)} Up (Shift Left in Matrix)">
                    <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
                  </button>
                  <button type="button" onclick="moveSubjectOrder(${subIdx}, 1)" ${isLastSub ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition ${isLastSub ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move ${escapeHtml(sub.code)} Down (Shift Right in Matrix)">
                    <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-extrabold text-sm text-slate-900">${escapeHtml(sub.code)}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded ${sub.headerBg}">${sub.units} Units</span>
                  </div>
                  <div class="text-xs text-slate-600 font-medium truncate">${escapeHtml(sub.title)}</div>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button onclick="openEditSubjectModal('${escapeJsString(sub.code)}')" class="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-semibold text-xs flex items-center gap-1">
                  ✎ Edit Details
                </button>
                <button onclick="requestRemoveSubject('${escapeJsString(sub.code)}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-700 font-semibold text-xs">
                  Delete
                </button>
              </div>
            </div>

            <div class="border-t border-slate-200 pt-2 space-y-1.5">
              <div class="flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span>Sections & Scheduled Hours:</span>
                <button onclick="openAddSectionModal('${escapeJsString(sub.code)}')" class="text-msu-maroon hover:underline font-bold text-[11px]">+ Add Section</button>
              </div>
              <div class="space-y-1.5">
                ${sub.sections.map((sec, secIdx) => {
                  const secSlots = subSlots.filter(s => s.section === sec);
                  const accentBar = getSectionAccent(secIdx);
                  const isFirstSec = (secIdx === 0);
                  const isLastSec = (secIdx === sub.sections.length - 1);
                  const safeSec = sec.replace(/[^a-zA-Z0-9_-]/g, '_');

                  return `
                    <div id="manage-sec-row-${safeSub}__${safeSec}" class="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${accentBar} transition-shadow">
                      <div class="flex items-center gap-2.5 min-w-0 flex-1">
                        <!-- Leftmost Stacked Reorder Arrows -->
                        <div class="inline-flex flex-col border border-slate-300 rounded-md overflow-hidden bg-white shadow-2xs shrink-0 select-none">
                          <button type="button" onclick="moveSectionOrder(${subIdx}, ${secIdx}, -1)" ${isFirstSec ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-b border-slate-200 transition ${isFirstSec ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move Section ${escapeHtml(sec)} Up (Shift Left in Matrix)">
                            <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
                          </button>
                          <button type="button" onclick="moveSectionOrder(${subIdx}, ${secIdx}, 1)" ${isLastSec ? 'disabled' : ''} class="w-5 h-3.5 flex items-center justify-center hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition ${isLastSec ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-95'}" title="Move Section ${escapeHtml(sec)} Down (Shift Right in Matrix)">
                            <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                          </button>
                        </div>
                        <span class="font-extrabold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-300 shrink-0">${escapeHtml(sec)}</span>
                        <div class="text-[11px] text-slate-600 font-medium truncate">
                          ${secSlots.length > 0 
                            ? secSlots.map(s => `<span class="inline-block mr-2 font-mono text-slate-700 font-semibold">${escapeHtml(s.day.substring(0,3))} ${formatTime12(s.startTime)}–${formatTime12(s.endTime)} (${escapeHtml(s.room)})</span>`).join('') 
                            : '<span class="text-slate-400 italic font-sans">No schedule assigned yet</span>'}
                        </div>
                      </div>
                      <div class="flex items-center gap-1.5 shrink-0 ml-auto">
                        <button type="button" onclick="openEditSectionModal('${escapeJsString(sub.code)}', '${escapeJsString(sec)}')" class="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg font-semibold text-xs flex items-center gap-1 transition shadow-2xs">
                          ✎ Edit Section
                        </button>
                        <button type="button" onclick="requestRemoveSection('${escapeJsString(sub.code)}', '${escapeJsString(sec)}')" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-700 font-semibold text-xs transition">
                          Remove
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (scrollParent) {
        scrollParent.scrollTop = prevScrollTop;
      }

      document.getElementById('manage-courses-modal').classList.remove('hidden');
    }

    function closeManageCoursesModal() {
      document.getElementById('manage-courses-modal').classList.add('hidden');
      closeScheduleEditorModal();
    }

    function openScheduleEditorForCourseSection(course, section) {
      openAddScheduleModal();
      document.getElementById('sched-course-select').value = course;
      updateScheduleSectionDropdown(section);
    }

    function openAddSectionModal(courseCode) {
      const sub = courseData.subjects.find(s => s.code === courseCode);
      if (!sub) return;

      document.getElementById('add-section-course-code').value = courseCode;
      document.getElementById('add-section-name').value = '';
      document.getElementById('add-section-classroom-url').value = '';

      // Reset schedule inputs
      const dayCheckboxes = document.querySelectorAll('#add-section-days-group input[type="checkbox"]');
      dayCheckboxes.forEach(cb => { cb.checked = false; });
      const startTimeInput = document.getElementById('add-section-start-time');
      if (startTimeInput) startTimeInput.value = '07:30';
      const endTimeInput = document.getElementById('add-section-end-time');
      if (endTimeInput) endTimeInput.value = '09:00';
      const roomInput = document.getElementById('add-section-room');
      if (roomInput) roomInput.value = '';
      const typeInput = document.getElementById('add-section-type');
      if (typeInput) typeInput.value = 'Lecture';

      const subtitle = document.getElementById('add-section-modal-subtitle');
      if (subtitle) {
        subtitle.innerText = `Configure new section for ${sub.code} • ${sub.title}`;
      }

      document.getElementById('add-section-modal').classList.remove('hidden');
      setTimeout(() => {
        const input = document.getElementById('add-section-name');
        if (input) input.focus();
      }, 50);
    }

    function closeAddSectionModal() {
      document.getElementById('add-section-modal').classList.add('hidden');
    }

    function submitAddSection(e) {
      if (e) e.preventDefault();
      const courseCode = document.getElementById('add-section-course-code').value;
      const secNameInput = document.getElementById('add-section-name').value.trim();
      let classroomUrl = document.getElementById('add-section-classroom-url').value.trim();

      if (!secNameInput) {
        showToast("Please enter a section name.", "⚠️");
        return;
      }

      const sub = courseData.subjects.find(s => s.code === courseCode);
      if (!sub) return;

      if (sub.sections.includes(secNameInput)) {
        showToast(`Section "${secNameInput}" already exists for ${courseCode}.`, "⚠️");
        return;
      }

      // Check optional schedule inputs
      const checkedDays = Array.from(document.querySelectorAll('#add-section-days-group input[type="checkbox"]:checked')).map(c => c.value);
      let startTime = '';
      let endTime = '';
      let room = 'TBA';
      let type = 'Lecture';

      if (checkedDays.length > 0) {
        startTime = (document.getElementById('add-section-start-time')?.value || '').trim();
        endTime = (document.getElementById('add-section-end-time')?.value || '').trim();
        room = (document.getElementById('add-section-room')?.value || '').trim() || 'TBA';
        type = document.getElementById('add-section-type')?.value || 'Lecture';

        if (!startTime || !endTime || startTime >= endTime) {
          showToast("Schedule start time must be strictly earlier than end time.", "⚠️");
          return;
        }
      }

      sub.sections.push(secNameInput);
      columnWidths[courseCode + '__' + secNameInput] = 205;

      if (classroomUrl) {
        if (!/^https?:\/\//i.test(classroomUrl)) {
          classroomUrl = 'https://' + classroomUrl;
        }
        setClassroomLink(courseCode, secNameInput, classroomUrl);
      }

      // Add weekly timetable schedule slots if specified
      if (checkedDays.length > 0) {
        checkedDays.forEach(day => {
          const dupIdx = weeklyTimetable.findIndex(t => t.course === courseCode && t.section === secNameInput && t.day === day && t.startTime === startTime);
          if (dupIdx >= 0) {
            weeklyTimetable.splice(dupIdx, 1);
          }
          weeklyTimetable.push({
            course: courseCode,
            section: secNameInput,
            day,
            startTime,
            endTime,
            room,
            type
          });
        });
      }

      saveAppState();
      closeAddSectionModal();
      openManageCoursesModal();
      renderMatrixTable();
      if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
      renderStudentRoster();
      renderGradebook();
      updateSemesterProgressBar();

      const toastMsg = checkedDays.length > 0
        ? `Added section ${secNameInput} (${checkedDays.map(d => d.slice(0,3)).join(', ')}) to ${courseCode}!`
        : `Added section ${secNameInput} to ${courseCode}!`;
      showToast(toastMsg);
    }

    function promptAddSection(courseCode) {
      openAddSectionModal(courseCode);
    }

    function openEditSectionModal(courseCode, sectionName) {
      const sub = courseData.subjects.find(s => s.code === courseCode);
      if (!sub) return;

      document.getElementById('edit-section-course-code').value = courseCode;
      document.getElementById('edit-section-original-name').value = sectionName;
      document.getElementById('edit-section-name').value = sectionName;

      // Preload current Google Classroom URL
      const currentClassroomUrl = (typeof getClassroomLink === 'function') ? getClassroomLink(courseCode, sectionName) : '';
      const classroomInput = document.getElementById('edit-section-classroom-url');
      if (classroomInput) {
        classroomInput.value = currentClassroomUrl || '';
      }

      const subtitle = document.getElementById('edit-section-modal-subtitle');
      if (subtitle) {
        subtitle.innerText = `Update section for ${courseCode} • ${sub.title}`;
      }

      // Preload current schedules for this section
      const secSlots = (weeklyTimetable || []).filter(t => t.course === courseCode && t.section === sectionName);
      const dayCheckboxes = document.querySelectorAll('#edit-section-days-group input[type="checkbox"]');
      
      const activeDays = secSlots.map(s => s.day);
      dayCheckboxes.forEach(cb => {
        cb.checked = activeDays.includes(cb.value);
      });

      const firstSlot = secSlots[0] || {};
      document.getElementById('edit-section-start-time').value = firstSlot.startTime || '07:30';
      document.getElementById('edit-section-end-time').value = firstSlot.endTime || '09:00';
      document.getElementById('edit-section-room').value = firstSlot.room || 'TBA';
      document.getElementById('edit-section-type').value = firstSlot.type || 'Lecture';

      document.getElementById('edit-section-modal').classList.remove('hidden');
    }

    function closeEditSectionModal() {
      document.getElementById('edit-section-modal').classList.add('hidden');
    }

    function submitEditSection(e) {
      if (e) e.preventDefault();
      const courseCode = document.getElementById('edit-section-course-code').value;
      const origName = document.getElementById('edit-section-original-name').value;
      const newName = document.getElementById('edit-section-name').value.trim();
      let classroomUrl = (document.getElementById('edit-section-classroom-url')?.value || '').trim();

      if (!newName) {
        showToast("Please enter a section name.", "⚠️");
        return;
      }

      const sub = courseData.subjects.find(s => s.code === courseCode);
      if (!sub) return;

      // Check if renamed name conflicts with another existing section
      if (newName !== origName && sub.sections.includes(newName)) {
        showToast(`Section "${newName}" already exists for ${courseCode}.`, "⚠️");
        return;
      }

      // Format URL protocol if specified
      if (classroomUrl && !/^https?:\/\//i.test(classroomUrl)) {
        classroomUrl = 'https://' + classroomUrl;
      }

      const checkedDays = Array.from(document.querySelectorAll('#edit-section-days-group input[type="checkbox"]:checked')).map(c => c.value);
      const startTime = (document.getElementById('edit-section-start-time')?.value || '').trim();
      const endTime = (document.getElementById('edit-section-end-time')?.value || '').trim();
      const room = (document.getElementById('edit-section-room')?.value || '').trim() || 'TBA';
      const type = document.getElementById('edit-section-type')?.value || 'Lecture';

      if (checkedDays.length > 0 && (!startTime || !endTime || startTime >= endTime)) {
        showToast("Start time must be strictly earlier than End time.", "⚠️");
        return;
      }

      // 1. Rename Section Cascade across all data stores if name changed
      if (newName !== origName) {
        const secIdx = sub.sections.indexOf(origName);
        if (secIdx !== -1) sub.sections[secIdx] = newName;

        // Column widths
        if (columnWidths[`${courseCode}__${origName}`] !== undefined) {
          columnWidths[`${courseCode}__${newName}`] = columnWidths[`${courseCode}__${origName}`];
          delete columnWidths[`${courseCode}__${origName}`];
        }

        // Clean up old Google Classroom link key if name changed
        if (courseData.classroomLinks && courseData.classroomLinks[`${courseCode}__${origName}`]) {
          delete courseData.classroomLinks[`${courseCode}__${origName}`];
        }

        // Timetable sections
        weeklyTimetable.forEach(t => {
          if (t.course === courseCode && t.section === origName) {
            t.section = newName;
          }
        });

        // Lesson Planner entries
        const newPlanner = {};
        Object.keys(plannerEntries).forEach(k => {
          if (k.includes(`__${courseCode}__${origName}`)) {
            const replaced = k.replace(`__${courseCode}__${origName}`, `__${courseCode}__${newName}`);
            newPlanner[replaced] = plannerEntries[k];
          } else {
            newPlanner[k] = plannerEntries[k];
          }
        });
        plannerEntries = newPlanner;

        // Student Roster enrollment
        studentRoster.forEach(s => {
          if (s.section === `${courseCode} - ${origName}` || s.section === origName) {
            s.section = `${courseCode} - ${newName}`;
          }
        });
      }

      // 2. Persist the Google Classroom link under the active section name
      if (typeof setClassroomLink === 'function') {
        setClassroomLink(courseCode, newName, classroomUrl);
      }

      // 3. Re-assign schedules for this section
      weeklyTimetable = weeklyTimetable.filter(t => !(t.course === courseCode && t.section === newName));

      if (checkedDays.length > 0) {
        checkedDays.forEach(day => {
          weeklyTimetable.push({
            course: courseCode,
            section: newName,
            day,
            startTime,
            endTime,
            room,
            type
          });
        });
      }

      saveAppState();
      closeEditSectionModal();
      openManageCoursesModal();
      renderMatrixTable();
      if (typeof renderWeeklyTimetable === 'function') renderWeeklyTimetable();
      renderStudentRoster();
      renderGradebook();
      updateSemesterProgressBar();
      showToast(`Updated section ${newName} for ${courseCode}!`);
    }

    function addNewSubject() {
      const code = document.getElementById('new-course-code').value.trim().toUpperCase();
      const title = document.getElementById('new-course-title').value.trim();
      const theme = document.getElementById('new-course-color').value;

      if (!code) {
        showToast("Please enter a subject code.", "⚠️");
        return;
      }

      if (courseData.subjects.some(s => s.code === code)) {
        showToast("Subject code already exists.", "⚠️");
        return;
      }

      const pal = COLOR_PALETTES[theme] || COLOR_PALETTES.blue;

      courseData.subjects.push({
        code,
        title: title || code,
        units: 3,
        colorTheme: theme,
        color: pal.color,
        headerBg: pal.headerBg,
        badgeBg: pal.badgeBg,
        sections: ["Main"]
      });

      columnWidths[code + '__Main'] = 190;

      document.getElementById('new-course-code').value = '';
      document.getElementById('new-course-title').value = '';
      const newColorEl = document.getElementById('new-course-color');
      if (newColorEl) newColorEl.value = 'blue';

      saveAppState();
      openManageCoursesModal();
      renderMatrixTable();
      renderWeeklyTimetable();
      renderStudentRoster();
      renderGradebook();
      updateSemesterProgressBar();
      showToast('Subject ' + code + ' added.');
    }

    function showConfirmation(title, message, onConfirm) {
      document.getElementById('confirm-title').innerText = title;
      document.getElementById('confirm-message').innerText = message;
      pendingConfirmationAction = onConfirm;
      document.getElementById('confirm-modal').classList.remove('hidden');
    }

    function executeConfirmation() {
      if (typeof pendingConfirmationAction === 'function') {
        pendingConfirmationAction();
      }
      cancelConfirmation();
    }

    function cancelConfirmation() {
      pendingConfirmationAction = null;
      document.getElementById('confirm-modal').classList.add('hidden');
    }

    function requestRemoveSubject(courseCode) {
      showConfirmation(
        'Delete Subject ' + courseCode + '?',
        'This will remove ' + courseCode + ', all its sections, weekly schedules, enrolled students, and planned lesson records.',
        () => {
          courseData.subjects = courseData.subjects.filter(s => s.code !== courseCode);
          weeklyTimetable = weeklyTimetable.filter(t => t.course !== courseCode);

          Object.keys(plannerEntries).forEach(k => {
            if (k.includes('__' + courseCode + '__')) delete plannerEntries[k];
          });

          studentRoster = studentRoster.filter(s => !s.section || !s.section.startsWith(courseCode + ' - '));
          cleanupOrphanedStudents();

          saveAppState();
          openManageCoursesModal();
          renderMatrixTable();
          renderWeeklyTimetable();
          renderStudentRoster();
          renderGradebook();
          updateSemesterProgressBar();
          showToast('Subject ' + courseCode + ' deleted.');
        }
      );
    }

    function requestRemoveSection(courseCode, section) {
      showConfirmation(
        'Remove Section ' + section + '?',
        'Remove section ' + section + ' from ' + courseCode + ' and clear its scheduled periods and enrolled students?',
        () => {
          const sub = courseData.subjects.find(s => s.code === courseCode);
          if (sub) {
            sub.sections = sub.sections.filter(sec => sec !== section);
            weeklyTimetable = weeklyTimetable.filter(t => !(t.course === courseCode && t.section === section));

            Object.keys(plannerEntries).forEach(k => {
              if (k.includes('__' + courseCode + '__' + section)) delete plannerEntries[k];
            });

            studentRoster = studentRoster.filter(s => !(s.section === `${courseCode} - ${section}` || s.section === section));
            cleanupOrphanedStudents();

            saveAppState();
            openManageCoursesModal();
            renderMatrixTable();
            renderWeeklyTimetable();
            renderStudentRoster();
            renderGradebook();
            updateSemesterProgressBar();
            showToast('Removed section ' + section + ' from ' + courseCode + '.');
          }
        }
      );
    }

    function openEditSubjectModal(code) {
      const sub = courseData.subjects.find(s => s.code === code);
      if (!sub) return;

      document.getElementById('edit-course-original-code').value = sub.code;
      document.getElementById('edit-course-code').value = sub.code;
      document.getElementById('edit-course-title').value = sub.title;
      document.getElementById('edit-course-units').value = sub.units || 3;
      document.getElementById('edit-course-color').value = sub.colorTheme || 'blue';
      renderColorSwatches('edit');

      document.getElementById('edit-course-modal').classList.remove('hidden');
    }

    function closeEditSubjectModal() {
      document.getElementById('edit-course-modal').classList.add('hidden');
    }

    function saveEditSubject() {
      const origCode = document.getElementById('edit-course-original-code').value;
      const newCode = document.getElementById('edit-course-code').value.trim().toUpperCase();
      const newTitle = document.getElementById('edit-course-title').value.trim();
      const newUnits = parseInt(document.getElementById('edit-course-units').value) || 3;
      const newTheme = document.getElementById('edit-course-color').value;

      if (!newCode) {
        showToast("Please specify a course code.", "⚠️");
        return;
      }

      const sub = courseData.subjects.find(s => s.code === origCode);
      if (!sub) return;

      const pal = COLOR_PALETTES[newTheme] || COLOR_PALETTES.blue;

      sub.code = newCode;
      sub.title = newTitle || newCode;
      sub.units = newUnits;
      sub.colorTheme = newTheme;
      sub.color = pal.color;
      sub.headerBg = pal.headerBg;
      sub.badgeBg = pal.badgeBg;

      if (origCode !== newCode) {
        weeklyTimetable.forEach(t => {
          if (t.course === origCode) t.course = newCode;
        });

        const newPlanner = {};
        Object.keys(plannerEntries).forEach(k => {
          if (k.includes('__' + origCode + '__')) {
            const replaced = k.replace('__' + origCode + '__', '__' + newCode + '__');
            newPlanner[replaced] = plannerEntries[k];
          } else {
            newPlanner[k] = plannerEntries[k];
          }
        });
        plannerEntries = newPlanner;

        studentRoster.forEach(s => {
          if (s.section && s.section.startsWith(origCode + ' - ')) {
            s.section = s.section.replace(origCode + ' - ', newCode + ' - ');
          }
        });
      }

      saveAppState();
      closeEditSubjectModal();
      openManageCoursesModal();
      renderMatrixTable();
      renderWeeklyTimetable();
      renderStudentRoster();
      renderGradebook();
      showToast('Subject ' + newCode + ' updated.');
    }

    // ================= LESSON PLANNING & FORWARD SHIFTING =================
    function openLessonModal(dateKey, subject, section, isWeekend) {

      currentEditingCell = { dateKey, subject, section };
      const cellKey = dateKey + '__' + subject + '__' + section;
      const entry = plannerEntries[cellKey] || {};

      document.getElementById('modal-title').innerText = 'Plan Activity: ' + subject + ' (' + section + ')';
      document.getElementById('modal-subtitle').innerText = 'Date: ' + dateKey;

      document.getElementById('modal-topic').value = entry.topic || '';
      document.getElementById('modal-activity').value = entry.activity || '';
      document.getElementById('modal-type').value = entry.type || 'Lecture';
      document.getElementById('modal-status').value = entry.status || 'Planned';
      document.getElementById('modal-notes').value = entry.notes || '';

      const isNoClass = entry && (entry.type === 'No Class' || (entry.topic && entry.topic.toLowerCase().includes('no class')));
      const hasExistingActivity = !isNoClass && entry && (
        (entry.topic && entry.topic.trim() && !entry.topic.toLowerCase().includes('no class')) ||
        (entry.activity && entry.activity.trim() && !entry.activity.toLowerCase().includes('no class'))
      );

      const shiftContainer = document.getElementById('modal-shift-actions');
      if (shiftContainer) {
        if (isNoClass) {
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

      if (!topic && !activity) {
        delete plannerEntries[cellKey];
      } else {
        plannerEntries[cellKey] = { topic, activity, type, status, notes };
      }

      saveAppState();
      closeLessonModal();
      renderMatrixTable();
      updateSemesterProgressBar();
      showToast('Lesson saved for ' + subject + ' (' + section + ') on ' + dateKey);
    }

    function clearLessonModalData() {
      if (!currentEditingCell) return;
      pushPlannerUndo('Clear Lesson Details');
      const { dateKey, subject, section } = currentEditingCell;
      const cellKey = dateKey + '__' + subject + '__' + section;
      delete plannerEntries[cellKey];
      saveAppState();
      closeLessonModal();
      renderMatrixTable();
      updateSemesterProgressBar();
      showToast("Lesson details cleared.");
    }

    // Undo / Redo history stacks for Lesson Planner (up to 50 actions saved)
    let plannerUndoStack = [];
    let plannerRedoStack = [];
    const MAX_PLANNER_HISTORY = 50;

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
      saveAppState();
      renderMatrixTable();
      updateSemesterProgressBar();
      updateUndoRedoButtonState();
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
      saveAppState();
      renderMatrixTable();
      updateSemesterProgressBar();
      updateUndoRedoButtonState();
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
      renderMatrixTable();
      updateSemesterProgressBar();

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
      renderMatrixTable();
      updateSemesterProgressBar();
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
            renderMatrixTable();
            updateSemesterProgressBar();
            showToast('Pulled meeting back to ' + prevDateKey + '.', '◀');
          }
        );
        return;
      }

      pushPlannerUndo('Pull Back to ' + prevDateKey);
      pullMeetingBackward(dateKey, subject, section);
      saveAppState();
      closeLessonModal();
      renderMatrixTable();
      updateSemesterProgressBar();
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
            renderMatrixTable();
            updateSemesterProgressBar();
            showToast('Moved activity forward to ' + nextDateKey + '.', '▶');
          }
        );
        return;
      }

      pushPlannerUndo('Move to Next Slot (' + nextDateKey + ')');
      shiftScheduleForward(dateKey, subject, section);
      saveAppState();
      closeLessonModal();
      renderMatrixTable();
      updateSemesterProgressBar();
      showToast('Moved activity to next viable slot (' + nextDateKey + ').', '▶');
    }

    // ================= DECLARE NO CLASS =================
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
          <button type="button" onclick="removeNoClassDay('${d}')" class="text-rose-600 hover:text-rose-900 font-extrabold text-sm leading-none">&times;</button>
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
      renderMatrixTable();
      renderAcademicCalendarTable();
      updateSemesterProgressBar();
      showToast('Applied suspension to ' + targetDates.length + ' day(s).');
    }

    function openUploadCalendarModal() {
      document.getElementById('upload-calendar-modal').classList.remove('hidden');
    }

    function closeUploadCalendarModal() {
      document.getElementById('upload-calendar-modal').classList.add('hidden');
    }

    // ================= STUDENT ROSTER MANAGEMENT =================
    let rosterSortState = { col: 'default', direction: 'asc' };

    function getRosterSortIndicator(colKey) {
      if (rosterSortState.col !== colKey) {
        return '<span class="text-[10px] text-slate-400 opacity-60 ml-1 inline-block">⇅</span>';
      }
      return rosterSortState.direction === 'asc'
        ? '<span class="text-[11px] text-msu-maroon font-black ml-1 inline-block">▲</span>'
        : '<span class="text-[11px] text-msu-maroon font-black ml-1 inline-block">▼</span>';
    }

    function toggleRosterSort(colKey) {
      if (rosterSortState.col === colKey) {
        rosterSortState.direction = rosterSortState.direction === 'asc' ? 'desc' : 'asc';
      } else {
        rosterSortState.col = colKey;
        rosterSortState.direction = (colKey === 'date') ? 'desc' : 'asc';
      }
      renderStudentRoster();
    }

    function renderStudentRoster() {
      const tbody = document.getElementById('student-table-body');
      const filterSelect = document.getElementById('roster-section-filter');
      if (!tbody) return;

      ['id', 'name', 'date', 'grade'].forEach(k => {
        const el = document.getElementById(`roster-sort-${k}`);
        if (el) el.innerHTML = getRosterSortIndicator(k);
      });

      const allSections = [];
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
      });

      if (filterSelect) {
        const currentVal = filterSelect.value;
        if (allSections.length === 0) {
          filterSelect.innerHTML = '<option value="">No sections added</option>';
        } else {
          filterSelect.innerHTML = allSections.map(s => `
            <option value="${s}" ${(currentVal === s || (!currentVal && s === allSections[0]) || (currentVal === 'all' && s === allSections[0])) ? 'selected' : ''}>${escapeHtml(s)}</option>
          `).join('');

          if (allSections.includes(currentVal)) {
            filterSelect.value = currentVal;
          } else {
            filterSelect.value = allSections[0];
          }
        }
      }

      // Precalculate and attach Final Grades to each student for the Roster
      studentRoster.forEach(s => {
        const cfg = getGradingConfig(s.section);
        ensureStudentScores(s, cfg);
        s._gradeResult = calculateStudentGrade(s, cfg, s.section);
      });

      let sortedStudents = [...studentRoster];
      if (rosterSortState.col === 'name') {
        sortedStudents.sort((a, b) => {
          const cmp = (a.last || '').localeCompare(b.last || '', undefined, { sensitivity: 'base' });
          return rosterSortState.direction === 'asc' ? cmp : -cmp;
        });
      } else if (rosterSortState.col === 'date') {
        sortedStudents.sort((a, b) => {
          const dA = a.dateAdded || '2026-08-10';
          const dB = b.dateAdded || '2026-08-10';
          return rosterSortState.direction === 'asc' ? dA.localeCompare(dB) : dB.localeCompare(dA);
        });
      } else if (rosterSortState.col === 'id') {
        sortedStudents.sort((a, b) => {
          const cmp = (a.id || '').localeCompare(b.id || '', undefined, { numeric: true });
          return rosterSortState.direction === 'asc' ? cmp : -cmp;
        });
      } else if (rosterSortState.col === 'grade') {
        sortedStudents.sort((a, b) => {
          const totalA = a._gradeResult ? a._gradeResult.total : 0;
          const totalB = b._gradeResult ? b._gradeResult.total : 0;
          return rosterSortState.direction === 'asc' ? (totalA - totalB) : (totalB - totalA);
        });
      }

      tbody.innerHTML = sortedStudents.map(s => {
        const res = s._gradeResult || { total: 0, msu: { grade: '—', class: 'bg-slate-100 text-slate-600', status: 'Pending' } };
        const gradeText = res.msu.grade;
        const gradeBadgeClass = res.msu.class || 'bg-slate-100 text-slate-700 border-slate-300';
        const mailtoSubject = encodeURIComponent(`MSU-GSC Academic Notice: ${s.section}`);

        return `
          <tr data-student-id="${escapeHtml(s.id)}" data-section="${escapeHtml(s.section)}" data-grade="${escapeHtml(gradeText)}" data-email="${escapeHtml(s.email)}" class="hover:bg-slate-50 transition border-b border-slate-200">
            <td class="py-2.5 px-4 font-mono font-bold text-slate-800">${escapeHtml(s.id)}</td>
            <td class="py-2.5 px-4 font-bold text-slate-900">${escapeHtml(s.last)}</td>
            <td class="py-2.5 px-4 text-slate-700 font-medium">${escapeHtml(s.first)}</td>
            <td class="py-2.5 px-4 text-slate-500 font-mono text-[11px]">${escapeHtml(s.email)}</td>
            <td class="py-2.5 px-4">
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 border border-slate-300 text-slate-800">
                ${escapeHtml(s.section)}
              </span>
            </td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">
              <span class="grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${gradeBadgeClass}" title="Weighted Score: ${res.total.toFixed(2)}% • Status: ${escapeHtml(res.msu.status)}">
                ${escapeHtml(gradeText)}
              </span>
            </td>
            <td class="py-2.5 px-4 font-mono text-[11px] text-slate-600 font-semibold">${escapeHtml(s.dateAdded || '2026-08-10')}</td>
            <td class="py-2.5 px-4 text-center whitespace-nowrap">
              <div class="flex items-center justify-center gap-2">
                <button type="button" onclick="sendIndividualStudentEmail('${escapeJsString(s.email)}', '${escapeJsString(s.section)}', '${escapeJsString(s.first)}', '${escapeJsString(s.last)}')" class="roster-email-btn text-blue-600 hover:text-blue-800 font-semibold text-xs hover:underline inline-flex items-center gap-1 cursor-pointer" title="Send email to ${escapeHtml(s.first)} ${escapeHtml(s.last)} (${escapeHtml(s.email)})">
                  <svg class="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>Email</span>
                </button>
                <span class="text-slate-300">|</span>
                <button onclick="removeStudent('${escapeJsString(s.id)}', '${escapeJsString(s.section)}')" class="text-rose-600 hover:text-rose-800 font-semibold text-xs hover:underline cursor-pointer">
                  Remove
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      filterStudentTable();
    }

    function filterStudentTable() {
      const term = (document.getElementById('roster-search')?.value || '').toLowerCase().trim();
      const secFilter = document.getElementById('roster-section-filter')?.value || '';
      const gradeFilter = document.getElementById('roster-grade-filter')?.value || 'all';

      const rosterClassroomContainer = document.getElementById('roster-classroom-btn-container');
      if (rosterClassroomContainer) {
        if (secFilter) {
          const parts = secFilter.split(' - ');
          const code = parts[0];
          const sec = parts[1];
          const link = getClassroomLink(code, sec);
          if (link) {
            rosterClassroomContainer.innerHTML = `
              <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center justify-center transition shrink-0 group shadow-2xs" title="Open Google Classroom for ${escapeHtml(secFilter)} in new tab (${escapeHtml(link)})">
                <svg class="w-4 h-4 text-emerald-700 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </a>
            `;
          } else {
            rosterClassroomContainer.innerHTML = `
              <button type="button" onclick="openClassroomModal('${escapeHtml(code)}', '${escapeHtml(sec)}')" class="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-dashed border-slate-300 hover:border-emerald-300 rounded-lg text-xs flex items-center justify-center transition shrink-0 group" title="Link Google Classroom for ${escapeHtml(secFilter)}">
                <svg class="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </button>
            `;
          }
        } else {
          rosterClassroomContainer.innerHTML = '';
        }
      }

      const rows = document.querySelectorAll('#student-table-body tr');
      let visibleCount = 0;
      let totalForSection = 0;

      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        const matchesTerm = !term || text.includes(term);
        const rowSec = r.getAttribute('data-section') || '';
        const rowGrade = r.getAttribute('data-grade') || '';
        const matchesSec = secFilter ? (rowSec === secFilter || secFilter.endsWith(' - ' + rowSec) || (rowSec && secFilter.includes(rowSec))) : true;
        const matchesGrade = (gradeFilter === 'all') || (rowGrade === gradeFilter);

        if (matchesSec) totalForSection++;
        const isVisible = matchesTerm && matchesSec && matchesGrade;
        r.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
      });

      const countBadge = document.getElementById('roster-count-badge');
      if (countBadge) {
        if (gradeFilter !== 'all' || term) {
          countBadge.innerText = `Showing: ${visibleCount} of ${totalForSection} Students${gradeFilter !== 'all' ? ` (${gradeFilter})` : ''}`;
        } else {
          countBadge.innerText = `Section Count: ${totalForSection} Students`;
        }
      }

      const removeAllBtn = document.getElementById('roster-remove-all-btn');
      if (removeAllBtn) {
        removeAllBtn.disabled = (totalForSection === 0);
        if (totalForSection === 0) {
          removeAllBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          removeAllBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      const emailFilteredBtn = document.getElementById('roster-email-filtered-btn');
      if (emailFilteredBtn) {
        emailFilteredBtn.disabled = (visibleCount === 0);
        if (visibleCount === 0) {
          emailFilteredBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
          emailFilteredBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }

      if (typeof updateRosterSidebar === 'function') {
        updateRosterSidebar();
      }
    }

    function removeStudent(studentId, section = null) {
      const confirmMsg = section
        ? `Remove student ID ${studentId} from section ${section}?`
        : `Remove student ID ${studentId} from the class roster and records?`;

      showConfirmation(
        "Remove Student?",
        confirmMsg,
        () => {
          if (section) {
            studentRoster = studentRoster.filter(s => !(s.id === studentId && s.section === section));
          } else {
            studentRoster = studentRoster.filter(s => s.id !== studentId);
          }
          saveAppState();
          renderStudentRoster();
          renderGradebook();
          showToast('Student ' + studentId + (section ? ' removed from ' + section + '.' : ' removed.'));
        }
      );
    }

    function removeAllStudentsFromSection() {
      const filterSelect = document.getElementById('roster-section-filter');
      const sec = filterSelect ? filterSelect.value : '';
      if (!sec) {
        showToast("Please select a section first.", "⚠️");
        return;
      }

      const count = studentRoster.filter(s => s.section === sec || sec.endsWith(' - ' + s.section) || (s.section && sec.includes(s.section))).length;
      if (count === 0) {
        showToast(`No enrolled students in ${sec} to remove.`, "ℹ️");
        return;
      }

      showConfirmation(
        `Remove All Students in ${sec}?`,
        `Are you sure you want to remove all ${count} enrolled student(s) from ${sec}? This action cannot be undone.`,
        () => {
          studentRoster = studentRoster.filter(s => !(s.section === sec || sec.endsWith(' - ' + s.section) || (s.section && sec.includes(s.section))));
          saveAppState();
          renderStudentRoster();
          renderGradebook();
          showToast(`Removed all ${count} student(s) from ${sec}.`);
        }
      );
    }

    function openBulkImportModal() {
      const secSelect = document.getElementById('bulk-target-section');
      const allSections = [];
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
      });

      const currentSelectedSection = document.getElementById('roster-section-filter')?.value;

      secSelect.innerHTML = allSections.map(s => `
        <option value="${s}" ${s === currentSelectedSection ? 'selected' : ''}>${escapeHtml(s)}</option>
      `).join('');

      if (currentSelectedSection && allSections.includes(currentSelectedSection)) {
        secSelect.value = currentSelectedSection;
      } else if (allSections.length > 0) {
        secSelect.value = allSections[0];
      }

      document.getElementById('bulk-paste-area').value = '';
      document.getElementById('bulk-preview-summary').innerText = 'Ready to parse clipboard data.';
      parsedBulkStudents = [];
      document.getElementById('bulk-import-modal').classList.remove('hidden');
    }

    function closeBulkImportModal() {
      document.getElementById('bulk-import-modal').classList.add('hidden');
    }

    function previewBulkData() {
      const text = document.getElementById('bulk-paste-area').value.trim();
      const summary = document.getElementById('bulk-preview-summary');
      parsedBulkStudents = [];

      if (!text) {
        summary.innerText = "Ready to parse clipboard data.";
        return;
      }

      const lines = text.split('\n');
      lines.forEach(line => {
        const parts = line.includes('\t') ? line.split('\t') : line.split(',');
        if (parts.length >= 3) {
          const id = parts[0].trim();
          const last = parts[1].trim();
          const first = parts[2].trim();
          const email = parts[3] ? parts[3].trim() : (first.toLowerCase() + '.' + last.toLowerCase() + '@msugensan.edu.ph');

          if (id && last) {
            parsedBulkStudents.push({ id, last, first, email });
          }
        }
      });

      summary.innerHTML = 'Found <strong class="text-emerald-700">' + parsedBulkStudents.length + '</strong> valid student entries ready to enroll.';
    }

    function commitBulkImport() {
      const targetSec = document.getElementById('bulk-target-section').value;
      if (parsedBulkStudents.length === 0) {
        showToast("No valid student rows found.", "⚠️");
        return;
      }

      parsedBulkStudents.forEach(st => {
        if (!studentRoster.some(s => s.id === st.id && s.section === targetSec)) {
          studentRoster.push({
            id: st.id,
            last: st.last,
            first: st.first,
            email: st.email,
            section: targetSec,
            dateAdded: new Date().toISOString().slice(0, 10),
            qz: 85,
            lab: 85,
            p1: 85,
            p2: 85,
            fin: 85
          });
        }
      });

      saveAppState();
      closeBulkImportModal();
      const filterSelect = document.getElementById('roster-section-filter');
      if (filterSelect) {
        filterSelect.value = targetSec;
      }
      renderStudentRoster();
      renderGradebook();
      showToast('Enrolled ' + parsedBulkStudents.length + ' students into ' + targetSec + '!');
    }

    function openAddSingleStudentModal() {
      const secSelect = document.getElementById('stud-section');
      const allSections = [];
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
      });

      const currentSelectedSection = document.getElementById('roster-section-filter')?.value;

      secSelect.innerHTML = allSections.map(s => `
        <option value="${s}" ${s === currentSelectedSection ? 'selected' : ''}>${escapeHtml(s)}</option>
      `).join('');

      if (currentSelectedSection && allSections.includes(currentSelectedSection)) {
        secSelect.value = currentSelectedSection;
      } else if (allSections.length > 0) {
        secSelect.value = allSections[0];
      }

      document.getElementById('stud-id').value = '';
      document.getElementById('stud-last').value = '';
      document.getElementById('stud-first').value = '';
      document.getElementById('stud-email').value = '';

      document.getElementById('single-student-modal').classList.remove('hidden');
    }

    function closeSingleStudentModal() {
      document.getElementById('single-student-modal').classList.add('hidden');
    }

    function saveSingleStudent() {
      const id = document.getElementById('stud-id').value.trim();
      const last = document.getElementById('stud-last').value.trim();
      const first = document.getElementById('stud-first').value.trim();
      const email = document.getElementById('stud-email').value.trim();
      const section = document.getElementById('stud-section').value;

      if (!id || !last || !first) {
        showToast("ID, Last Name, and First Name are required.", "⚠️");
        return;
      }

      studentRoster.push({
        id,
        last,
        first,
        email: email || (first.toLowerCase() + '.' + last.toLowerCase() + '@msugensan.edu.ph'),
        section,
        dateAdded: new Date().toISOString().slice(0, 10),
        qz: 85,
        lab: 85,
        p1: 85,
        p2: 85,
        fin: 85
      });

      saveAppState();
      closeSingleStudentModal();
      const filterSelect = document.getElementById('roster-section-filter');
      if (filterSelect && section) {
        filterSelect.value = section;
      }
      renderStudentRoster();
      renderGradebook();
      showToast('Student ' + first + ' ' + last + ' added.');
    }

    // ================= CLASS RECORD & REAL-TIME GRADING =================
    const DEFAULT_MSU_SCALE = [
      { grade: "1.00", min: 95.56, desc: "Excellent", class: "text-emerald-700 bg-emerald-50 border-emerald-300 font-black", status: "Passed" },
      { grade: "1.25", min: 91.11, desc: "Very Good", class: "text-emerald-700 bg-emerald-50 border-emerald-300 font-bold", status: "Passed" },
      { grade: "1.50", min: 86.67, desc: "Very Good", class: "text-emerald-700 bg-emerald-50 border-emerald-300 font-bold", status: "Passed" },
      { grade: "1.75", min: 82.22, desc: "Good", class: "text-emerald-700 bg-emerald-50 border-emerald-300 font-bold", status: "Passed" },
      { grade: "2.00", min: 77.78, desc: "Good", class: "text-blue-700 bg-blue-50 border-blue-300 font-bold", status: "Passed" },
      { grade: "2.25", min: 73.33, desc: "Satisfactory", class: "text-blue-700 bg-blue-50 border-blue-300 font-bold", status: "Passed" },
      { grade: "2.50", min: 68.89, desc: "Satisfactory", class: "text-blue-700 bg-blue-50 border-blue-300 font-bold", status: "Passed" },
      { grade: "2.75", min: 64.44, desc: "Fair", class: "text-amber-700 bg-amber-50 border-amber-300 font-bold", status: "Passed" },
      { grade: "3.00", min: 60.00, desc: "Pass", class: "text-amber-700 bg-amber-50 border-amber-300 font-bold", status: "Passed" },
      { grade: "INC", min: 30.00, desc: "Incomplete", class: "text-orange-700 bg-orange-100 border-orange-300 font-black", status: "Incomplete" },
      { grade: "5.00", min: 0.00, desc: "Failed", class: "text-rose-800 bg-rose-100 border-rose-300 font-black", status: "Failed" }
    ];

    const DEFAULT_GRADING_CONFIG = {
      categories: [
        {
          id: 'cat_quiz',
          name: 'Quizzes',
          weight: 20,
          subActivities: [
            { id: 'sub_quiz_1', name: 'Quiz #1', maxScore: 50, weight: 50 },
            { id: 'sub_quiz_2', name: 'Quiz #2', maxScore: 50, weight: 50 }
          ]
        },
        {
          id: 'cat_lab',
          name: 'Lab/Acts',
          weight: 20,
          subActivities: [
            { id: 'sub_lab_1', name: 'Act #1', maxScore: 100, weight: 50 },
            { id: 'sub_lab_2', name: 'Act #2', maxScore: 100, weight: 50 }
          ]
        },
        {
          id: 'cat_p1',
          name: '1st Prelim',
          weight: 20,
          subActivities: [
            { id: 'sub_p1_exam', name: '1st Prelim Exam', maxScore: 100, weight: 100 }
          ]
        },
        {
          id: 'cat_p2',
          name: '2nd Prelim',
          weight: 20,
          subActivities: [
            { id: 'sub_p2_exam', name: '2nd Prelim Exam', maxScore: 100, weight: 100 }
          ]
        },
        {
          id: 'cat_fin',
          name: 'Final Exam',
          weight: 20,
          subActivities: [
            { id: 'sub_fin_exam', name: 'Final Exam', maxScore: 100, weight: 100 }
          ]
        }
      ]
    };

    function autoBalanceSubActivities(category) {
      if (!category.subActivities || category.subActivities.length === 0) return;
      const n = category.subActivities.length;
      const baseWeight = Math.floor((100 / n) * 100) / 100;
      const remainder = Math.round((100 - (baseWeight * n)) * 100) / 100;
      category.subActivities.forEach((sub, idx) => {
        sub.weight = idx === n - 1 ? Math.round((baseWeight + remainder) * 100) / 100 : baseWeight;
      });
    }

    function getActiveGradingScale(sectionKey) {
      if (!courseData.gradingScales) {
        courseData.gradingScales = { default: JSON.parse(JSON.stringify(DEFAULT_MSU_SCALE)), sections: {} };
      }
      if (courseData.gradingScales.sections && sectionKey && courseData.gradingScales.sections[sectionKey]) {
        return {
          scale: courseData.gradingScales.sections[sectionKey],
          isDefault: false
        };
      }
      const defaultScale = (courseData.gradingScales.default && courseData.gradingScales.default.length)
        ? courseData.gradingScales.default
        : DEFAULT_MSU_SCALE;
      return {
        scale: defaultScale,
        isDefault: true
      };
    }

    function getMsuGrade(total, statusOverride, sectionKey) {
      if (statusOverride === 'WDRW') return { grade: "WDRW", status: "Withdrawn", class: "text-slate-700 bg-slate-100 border-slate-300 font-bold" };
      if (statusOverride === 'DRP') return { grade: "DRP", status: "Dropped", class: "text-slate-700 bg-slate-100 border-slate-300 font-bold" };
      if (statusOverride === 'INC') return { grade: "INC", status: "Incomplete", class: "text-orange-700 bg-orange-100 border-orange-300 font-bold" };

      const num = parseFloat(total) || 0;
      const { scale } = getActiveGradingScale(sectionKey);
      const sorted = [...scale].sort((a, b) => b.min - a.min);

      for (const item of sorted) {
        if (num >= item.min) {
          let badgeClass = item.class;
          if (!badgeClass) {
            if (item.grade === '1.00') badgeClass = "text-emerald-700 bg-emerald-50 border-emerald-300 font-black";
            else if (parseFloat(item.grade) <= 1.75) badgeClass = "text-emerald-700 bg-emerald-50 border-emerald-300 font-bold";
            else if (parseFloat(item.grade) <= 2.50) badgeClass = "text-blue-700 bg-blue-50 border-blue-300 font-bold";
            else if (parseFloat(item.grade) <= 3.00) badgeClass = "text-amber-700 bg-amber-50 border-amber-300 font-bold";
            else if (item.grade === 'INC') badgeClass = "text-orange-700 bg-orange-100 border-orange-300 font-black";
            else badgeClass = "text-rose-800 bg-rose-100 border-rose-300 font-black";
          }
          return {
            grade: item.grade,
            status: item.status || (item.grade === 'INC' ? 'Incomplete' : (item.grade === '5.00' ? 'Failed' : 'Passed')),
            class: badgeClass
          };
        }
      }
      return { grade: "5.00", status: "Failed", class: "text-rose-800 bg-rose-100 border-rose-300 font-black" };
    }

    function getGradingConfig(sectionKey) {
      if (!courseData.gradingConfigs) courseData.gradingConfigs = {};
      if (sectionKey && courseData.gradingConfigs[sectionKey]) {
        return courseData.gradingConfigs[sectionKey];
      }
      if (sectionKey) {
        const code = sectionKey.split(' - ')[0];
        if (courseData.gradingConfigs[code]) {
          return courseData.gradingConfigs[code];
        }
      }
      return DEFAULT_GRADING_CONFIG;
    }

    function ensureStudentScores(student, config) {
      if (!student) return;
      if (!student.scores || typeof student.scores !== 'object') student.scores = {};
      if (!config || !config.categories) return;
      config.categories.forEach(cat => {
        if (cat.subActivities && cat.subActivities.length > 0) {
          cat.subActivities.forEach(sub => {
            if (student.scores[sub.id] === undefined || student.scores[sub.id] === null || isNaN(student.scores[sub.id])) {
              const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
              let legacyPct = 85;
              if (cat.id === 'cat_quiz' && student.qz !== undefined) legacyPct = student.qz;
              else if (cat.id === 'cat_lab' && student.lab !== undefined) legacyPct = student.lab;
              else if (cat.id === 'cat_p1' && student.p1 !== undefined) legacyPct = student.p1;
              else if (cat.id === 'cat_p2' && student.p2 !== undefined) legacyPct = student.p2;
              else if (cat.id === 'cat_fin' && student.fin !== undefined) legacyPct = student.fin;
              student.scores[sub.id] = Math.round(((legacyPct || 0) / 100) * maxScore);
            }
          });
        }
      });
    }

    function getStudentScore(student, subId, catId, maxScore) {
      if (student.scores && student.scores[subId] !== undefined) {
        return parseFloat(student.scores[subId]) || 0;
      }
      // Migration fallback from legacy fields:
      if (catId === 'cat_quiz' && student.qz !== undefined) return Math.round(((student.qz || 0) / 100) * maxScore);
      if (catId === 'cat_lab' && student.lab !== undefined) return Math.round(((student.lab || 0) / 100) * maxScore);
      if (catId === 'cat_p1' && student.p1 !== undefined) return Math.round(((student.p1 || 0) / 100) * maxScore);
      if (catId === 'cat_p2' && student.p2 !== undefined) return Math.round(((student.p2 || 0) / 100) * maxScore);
      if (catId === 'cat_fin' && student.fin !== undefined) return Math.round(((student.fin || 0) / 100) * maxScore);
      return 0;
    }

    function calculateStudentGrade(student, config, sectionKey) {
      let finalWeightedPercent = 0;
      const categoryTotals = {};

      config.categories.forEach(cat => {
        const catWeight = parseFloat(cat.weight) || 0;
        let catPercent = 0;
        if (cat.subActivities && cat.subActivities.length > 0) {
          let subWeightedSum = 0;
          cat.subActivities.forEach(sub => {
            const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
            const subWeight = parseFloat(sub.weight) || 0;
            const scoreVal = getStudentScore(student, sub.id, cat.id, maxScore);
            const subRatio = maxScore > 0 ? (scoreVal / maxScore) : 0;
            subWeightedSum += subRatio * (subWeight / 100);
          });
          catPercent = subWeightedSum * 100;
        }
        categoryTotals[cat.id] = Math.round(catPercent * 100) / 100;
        finalWeightedPercent += (catPercent * (catWeight / 100));
      });

      finalWeightedPercent = Math.round(finalWeightedPercent * 100) / 100;
      const msu = getMsuGrade(finalWeightedPercent, student.statusOverride, sectionKey);

      return {
        categoryTotals,
        total: finalWeightedPercent,
        msu
      };
    }

    function renderGradingScaleDrawer(sectionKey) {
      const { scale, isDefault } = getActiveGradingScale(sectionKey);
      const titleEl = document.getElementById('grading-scale-drawer-title');
      const badgeEl = document.getElementById('grading-scale-drawer-badge');
      const gridEl = document.getElementById('grading-scale-cards-grid');

      if (titleEl) {
        titleEl.innerText = sectionKey ? `Grading Scale: ${sectionKey}` : 'Default MSU-GSC Grading Scale';
      }
      if (badgeEl) {
        if (isDefault) {
          badgeEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900';
          badgeEl.innerText = 'Default Scale';
        } else {
          badgeEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900';
          badgeEl.innerText = 'Custom Section Scale';
        }
      }
      if (gridEl) {
        gridEl.innerHTML = scale.map(item => `
          <div class="p-1.5 rounded bg-white border ${item.grade === '5.00' ? 'border-rose-300' : (item.grade === 'INC' ? 'border-orange-300' : (parseFloat(item.grade) <= 1.75 ? 'border-emerald-300' : (parseFloat(item.grade) <= 2.50 ? 'border-blue-300' : 'border-amber-300')))}">
            <div class="text-[10px] text-slate-500 font-sans">${item.min.toFixed(2)}%</div>
            <div class="font-black text-xs ${item.grade === '5.00' ? 'text-rose-700' : (item.grade === 'INC' ? 'text-orange-700' : (parseFloat(item.grade) <= 1.75 ? 'text-emerald-700' : (parseFloat(item.grade) <= 2.50 ? 'text-blue-700' : 'text-amber-700')))}">${item.grade}</div>
          </div>
        `).join('') + `
          <div class="p-1.5 rounded bg-white border border-slate-300">
            <div class="text-[10px] text-slate-500 font-sans">Special</div>
            <div class="font-bold text-slate-700 text-xs">WDRW / DRP</div>
          </div>
        `;
      }
    }

    let gradebookCollapsedCats = {};
    let isAllGradebookSubActivitiesCollapsed = false;

    function toggleGradebookCategoryCollapse(catId) {
      if (draggedCategoryIdx !== null) return;
      gradebookCollapsedCats[catId] = !gradebookCollapsedCats[catId];
      renderGradebook();
    }

    let draggedCategoryIdx = null;
    function handleCategoryDragStart(e, idx) {
      draggedCategoryIdx = idx;
      if (e.dataTransfer) e.dataTransfer.setData('text/plain', idx);
    }

    function handleCategoryDrop(e, targetIdx) {
      e.preventDefault();
      e.currentTarget.classList.remove('grade-cat-drag-over');
      if (draggedCategoryIdx === null || draggedCategoryIdx === targetIdx) {
        draggedCategoryIdx = null;
        return;
      }
      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';
      const config = getGradingConfig(selectedSec);
      
      const [movedCat] = config.categories.splice(draggedCategoryIdx, 1);
      config.categories.splice(targetIdx, 0, movedCat);
      draggedCategoryIdx = null;
      
      if (!courseData.gradingConfigs) courseData.gradingConfigs = {};
      courseData.gradingConfigs[selectedSec] = config;
      
      saveAppState();
      renderGradebook();
      showToast(`Moved "${movedCat.name}" category!`);
    }

    function toggleAllGradebookSubActivities() {
      isAllGradebookSubActivitiesCollapsed = !isAllGradebookSubActivitiesCollapsed;
      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';
      const config = getGradingConfig(selectedSec);
      config.categories.forEach(cat => {
        gradebookCollapsedCats[cat.id] = isAllGradebookSubActivitiesCollapsed;
      });
      renderGradebook();
    }

    
    // ================= GRADEBOOK SORTING & STATS STATE =================
    let gradebookSortState = { col: 'default', direction: 'asc' };
    let gradebookStatsView = 'overview'; // 'overview' | 'distribution' | 'activities'

    function getGradebookSortIndicator(colKey) {
      if (gradebookSortState.col !== colKey) {
        return '<span class="text-[10px] text-slate-400 opacity-60 ml-1 inline-block">⇅</span>';
      }
      return gradebookSortState.direction === 'asc'
        ? '<span class="text-[11px] text-msu-maroon font-black ml-1 inline-block">▲</span>'
        : '<span class="text-[11px] text-msu-maroon font-black ml-1 inline-block">▼</span>';
    }

    function toggleGradebookSort(colKey) {
      saveAppState(true);
      if (gradebookSortState.col === colKey) {
        gradebookSortState.direction = gradebookSortState.direction === 'asc' ? 'desc' : 'asc';
      } else {
        gradebookSortState.col = colKey;
        // Default to descending (highest first) for numeric/score columns
        if (colKey === 'total' || colKey.startsWith('sub_') || colKey.startsWith('cat_')) {
          gradebookSortState.direction = 'desc';
        } else {
          gradebookSortState.direction = 'asc';
        }
      }
      renderGradebook();
    }

    function toggleGradingScaleDrawer() {
      const scaleDrawer = document.getElementById('grading-scale-drawer');
      const statsDrawer = document.getElementById('gradebook-stats-drawer');
      const scaleBtn = document.getElementById('gradebook-scale-toggle-btn');
      const statsBtn = document.getElementById('gradebook-stats-toggle-btn');
      if (!scaleDrawer) return;

      const willOpen = scaleDrawer.classList.contains('hidden');
      if (willOpen) {
        if (statsDrawer) statsDrawer.classList.add('hidden');
        if (statsBtn) {
          statsBtn.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-100', 'shadow-inner');
          statsBtn.classList.add('bg-emerald-50');
        }
      }
      scaleDrawer.classList.toggle('hidden');
      const isOpen = !scaleDrawer.classList.contains('hidden');
      if (scaleBtn) {
        if (isOpen) {
          scaleBtn.classList.add('ring-2', 'ring-amber-500', 'bg-amber-100', 'shadow-inner');
          scaleBtn.classList.remove('bg-amber-50');
        } else {
          scaleBtn.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-100', 'shadow-inner');
          scaleBtn.classList.add('bg-amber-50');
        }
      }
    }

    function toggleGradebookStatsDrawer() {
      const statsDrawer = document.getElementById('gradebook-stats-drawer');
      const scaleDrawer = document.getElementById('grading-scale-drawer');
      const statsBtn = document.getElementById('gradebook-stats-toggle-btn');
      const scaleBtn = document.getElementById('gradebook-scale-toggle-btn');
      if (!statsDrawer) return;

      const willOpen = statsDrawer.classList.contains('hidden');
      if (willOpen) {
        if (scaleDrawer) scaleDrawer.classList.add('hidden');
        if (scaleBtn) {
          scaleBtn.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-100', 'shadow-inner');
          scaleBtn.classList.add('bg-amber-50');
        }
      }
      statsDrawer.classList.toggle('hidden');
      const isOpen = !statsDrawer.classList.contains('hidden');
      if (statsBtn) {
        if (isOpen) {
          statsBtn.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-100', 'shadow-inner');
          statsBtn.classList.remove('bg-emerald-50');
        } else {
          statsBtn.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-100', 'shadow-inner');
          statsBtn.classList.add('bg-emerald-50');
        }
      }
      renderGradebook();
    }

    function setGradebookStatsView(viewMode) {
      gradebookStatsView = viewMode;
      renderGradebook();
    }

    function renderGradebookStats(selectedSec, studentsList, config) {
      const drawer = document.getElementById('gradebook-stats-drawer');
      if (!drawer) return;
      if (drawer.classList && typeof drawer.classList.contains === 'function' && drawer.classList.contains('hidden')) return;

      if (!studentsList || studentsList.length === 0) {
        drawer.innerHTML = `
          <div class="flex items-center justify-between text-slate-500 italic py-2">
            <span>No students enrolled in section ${escapeHtml(selectedSec)} to calculate statistics.</span>
            <button onclick="document.getElementById('gradebook-stats-drawer').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
          </div>
        `;
        return;
      }

      const count = studentsList.length;
      let sumTotal = 0;
      let passCount = 0;
      let failCount = 0;
      let otherCount = 0;
      const totals = [];
      const studentMetrics = [];

      // MSU Grade distribution brackets
      const gradeBrackets = {
        '1.00-1.25': { label: '1.00 - 1.25 (Superior)', count: 0, color: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
        '1.50-1.75': { label: '1.50 - 1.75 (Very Good)', count: 0, color: 'bg-teal-500', bg: 'bg-teal-50 text-teal-900 border-teal-200' },
        '2.00-2.25': { label: '2.00 - 2.25 (Good)', count: 0, color: 'bg-sky-500', bg: 'bg-sky-50 text-sky-900 border-sky-200' },
        '2.50-2.75': { label: '2.50 - 2.75 (Fair)', count: 0, color: 'bg-indigo-500', bg: 'bg-indigo-50 text-indigo-900 border-indigo-200' },
        '3.00':      { label: '3.00 (Passing)', count: 0, color: 'bg-amber-500', bg: 'bg-amber-50 text-amber-900 border-amber-200' },
        '5.00':      { label: '5.00 (Failed)', count: 0, color: 'bg-rose-500', bg: 'bg-rose-50 text-rose-900 border-rose-200' },
        'other':     { label: 'INC / Dropped', count: 0, color: 'bg-slate-400', bg: 'bg-slate-50 text-slate-800 border-slate-200' }
      };

      studentsList.forEach(s => {
        const gradeResult = calculateStudentGrade(s, config, selectedSec);
        const tot = gradeResult.total;
        sumTotal += tot;
        totals.push(tot);
        studentMetrics.push({ student: s, gradeResult });

        const msuGrade = gradeResult.msu.grade;
        if (msuGrade === '1.00' || msuGrade === '1.25') gradeBrackets['1.00-1.25'].count++;
        else if (msuGrade === '1.50' || msuGrade === '1.75') gradeBrackets['1.50-1.75'].count++;
        else if (msuGrade === '2.00' || msuGrade === '2.25') gradeBrackets['2.00-2.25'].count++;
        else if (msuGrade === '2.50' || msuGrade === '2.75') gradeBrackets['2.50-2.75'].count++;
        else if (msuGrade === '3.00') gradeBrackets['3.00'].count++;
        else if (msuGrade === '5.00') gradeBrackets['5.00'].count++;
        else gradeBrackets['other'].count++;

        if (gradeResult.msu.status === 'Passed') passCount++;
        else if (gradeResult.msu.status === 'Failed') failCount++;
        else otherCount++;
      });

      totals.sort((a, b) => a - b);
      const avgTotal = sumTotal / count;
      const medianTotal = (count % 2 === 0) ? (totals[count / 2 - 1] + totals[count / 2]) / 2 : totals[Math.floor(count / 2)];
      const passRate = (count > 0) ? (passCount / count) * 100 : 0;
      const avgMsu = getMsuGrade(avgTotal, null, selectedSec);

      studentMetrics.sort((a, b) => b.gradeResult.total - a.gradeResult.total);
      const topStudent = studentMetrics[0];
      const lowStudent = studentMetrics[studentMetrics.length - 1];

      // Sub-activity item analysis
      const subAnalytics = [];
      config.categories.forEach(cat => {
        if (cat.subActivities && cat.subActivities.length > 0) {
          cat.subActivities.forEach(sub => {
            let subScoreSum = 0;
            studentsList.forEach(s => {
              subScoreSum += parseFloat(getStudentScore(s, sub.id, cat.id, sub.maxScore)) || 0;
            });
            const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
            const avgScore = subScoreSum / count;
            const avgPct = (avgScore / maxScore) * 100;
            subAnalytics.push({
              id: sub.id,
              name: sub.name,
              catName: cat.name,
              maxScore,
              weight: sub.weight,
              avgScore: Math.round(avgScore * 100) / 100,
              avgPct: Math.round(avgPct * 100) / 100
            });
          });
        }
      });

      subAnalytics.sort((a, b) => b.avgPct - a.avgPct);
      const topActivity = subAnalytics.length > 0 ? subAnalytics[0] : null;
      const lowActivity = subAnalytics.length > 0 ? subAnalytics[subAnalytics.length - 1] : null;

      // Drawer Header with View Mode Switchers
      let html = `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <span class="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </span>
            <div>
              <span class="font-extrabold text-slate-900 text-sm">Class Performance & Intelligent Analytics</span>
              <span class="ml-2 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-300">${escapeHtml(selectedSec)} • ${count} Students</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-bold">
              <button onclick="setGradebookStatsView('overview')" class="px-2.5 py-1 rounded-md transition ${gradebookStatsView === 'overview' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">Overview</button>
              <button onclick="setGradebookStatsView('distribution')" class="px-2.5 py-1 rounded-md transition ${gradebookStatsView === 'distribution' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">Grade Distribution</button>
              <button onclick="setGradebookStatsView('activities')" class="px-2.5 py-1 rounded-md transition ${gradebookStatsView === 'activities' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}">Activity Rankings</button>
            </div>
            <button onclick="document.getElementById('gradebook-stats-drawer').classList.add('hidden')" class="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 text-base leading-none transition" title="Close Statistics">&times;</button>
          </div>
        </div>
      `;

      // VIEW MODE 1: OVERVIEW & KPIS
      if (gradebookStatsView === 'overview') {
        html += `
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <!-- Card 1: Class Average -->
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Class Average</div>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-xl font-black text-slate-900 font-mono">${avgTotal.toFixed(2)}%</span>
                <span class="px-1.5 py-0.5 rounded text-[11px] font-bold ${avgMsu.class}">${avgMsu.grade}</span>
              </div>
              <div class="text-[10.5px] text-slate-500 mt-1">Status: <strong class="${avgMsu.status === 'Passed' ? 'text-emerald-700' : 'text-rose-700'}">${avgMsu.status}</strong></div>
            </div>

            <!-- Card 2: Passing Rate -->
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Passing Rate</div>
              <div class="flex items-baseline gap-2 mt-1">
                <span class="text-xl font-black font-mono ${passRate >= 75 ? 'text-emerald-700' : 'text-rose-700'}">${passRate.toFixed(2)}%</span>
                <span class="text-xs text-slate-600 font-bold">${passCount}/${count}</span>
              </div>
              <div class="text-[10.5px] text-slate-500 mt-1">${failCount} Failed ${otherCount > 0 ? '• ' + otherCount + ' INC/DRP' : ''}</div>
            </div>

            <!-- Card 3: Median & Spread -->
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Median Score</div>
              <div class="text-xl font-black text-slate-900 font-mono mt-1">${medianTotal.toFixed(2)}%</div>
              <div class="text-[10.5px] text-slate-500 mt-1">Spread: <span class="font-mono font-semibold">${(topStudent.gradeResult.total - lowStudent.gradeResult.total).toFixed(2)}%</span></div>
            </div>

            <!-- Card 4: High / Low -->
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Performance Range</div>
              <div class="text-[11.5px] font-bold text-emerald-800 truncate mt-1">▲ High: <span class="font-mono">${topStudent.gradeResult.total.toFixed(2)}%</span> <span class="font-normal text-slate-600">(${escapeHtml(topStudent.student.last)})</span></div>
              <div class="text-[11.5px] font-bold text-rose-800 truncate mt-1">▼ Low: <span class="font-mono">${lowStudent.gradeResult.total.toFixed(2)}%</span> <span class="font-normal text-slate-600">(${escapeHtml(lowStudent.student.last)})</span></div>
            </div>
          </div>

          <!-- Pedagogical Insights -->
          <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
            <span class="text-base">💡</span>
            <div class="flex-1 leading-relaxed">
              <strong>Curricular Insight:</strong>
              ${topActivity ? `Students excelled most in <strong>${escapeHtml(topActivity.name)}</strong> (${escapeHtml(topActivity.catName)}) with a class average of <strong class="text-emerald-800 font-mono">${topActivity.avgPct.toFixed(2)}%</strong>.` : ''}
              ${lowActivity && lowActivity.id !== topActivity?.id ? ` The most challenging activity was <strong>${escapeHtml(lowActivity.name)}</strong> with a class average of <strong class="text-rose-800 font-mono">${lowActivity.avgPct.toFixed(2)}%</strong>. Consider a brief review session for this topic.` : ''}
            </div>
          </div>
        `;
      }

      // VIEW MODE 2: GRADE DISTRIBUTION
      else if (gradebookStatsView === 'distribution') {
        html += `
          <div class="space-y-3">
            <div class="text-xs font-bold text-slate-700">MSU Scale Grade Distribution Breakdown:</div>

            <!-- Proportional Segmented Progress Bar -->
            <div class="h-5 w-full bg-slate-100 rounded-lg overflow-hidden flex border border-slate-300">
              ${Object.entries(gradeBrackets).map(([key, item]) => {
                const pct = (item.count / count) * 100;
                if (pct === 0) return '';
                return `<div class="${item.color} h-full transition-all" style="width: ${pct}%" title="${item.label}: ${item.count} (${pct.toFixed(1)}%)"></div>`;
              }).join('')}
            </div>

            <!-- Distribution Cards Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center">
              ${Object.entries(gradeBrackets).map(([key, item]) => {
                const pct = (item.count / count) * 100;
                return `
                  <div class="p-2 rounded-lg border ${item.bg}">
                    <div class="text-[10px] font-bold text-slate-600 uppercase tracking-tighter truncate" title="${item.label}">${key}</div>
                    <div class="text-base font-black font-mono my-0.5">${item.count}</div>
                    <div class="text-[10px] font-semibold text-slate-500">${pct.toFixed(1)}%</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      // VIEW MODE 3: ACTIVITY RANKINGS
      else if (gradebookStatsView === 'activities') {
        html += `
          <div class="space-y-2">
            <div class="text-xs font-bold text-slate-700">Class Performance by Graded Activity (Highest to Lowest):</div>
            <div class="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              ${subAnalytics.map((sub, idx) => {
                const barColor = sub.avgPct >= 80 ? 'bg-emerald-500' : (sub.avgPct >= 75 ? 'bg-amber-500' : 'bg-rose-500');
                const badgeColor = sub.avgPct >= 80 ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : (sub.avgPct >= 75 ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-rose-100 text-rose-900 border-rose-300');
                return `
                  <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition gap-3">
                    <div class="flex items-center gap-2 min-w-[160px] truncate">
                      <span class="font-mono text-slate-400 font-bold text-xs w-5">#${idx + 1}</span>
                      <div>
                        <div class="font-bold text-slate-900 text-xs truncate">${escapeHtml(sub.name)}</div>
                        <div class="text-[10px] text-slate-500 font-semibold">${escapeHtml(sub.catName)} • Max ${sub.maxScore} pts</div>
                      </div>
                    </div>
                    <div class="flex-1 max-w-xs bg-slate-200 rounded-full h-2 overflow-hidden hidden sm:block">
                      <div class="${barColor} h-full rounded-full" style="width: ${Math.min(100, Math.max(0, sub.avgPct))}%"></div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0 font-mono">
                      <span class="text-xs text-slate-700 font-semibold">${sub.avgScore.toFixed(1)} / ${sub.maxScore}</span>
                      <span class="px-2 py-0.5 rounded-full text-xs font-black border ${badgeColor}">${sub.avgPct.toFixed(2)}%</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      drawer.innerHTML = html;
    }

    function renderGradebook() {
      const secSelect = document.getElementById('gradebook-section-select');
      const tbody = document.getElementById('gradebook-table-body');
      const thead = document.getElementById('gradebook-table-head');
      if (!tbody) return;

      const allSections = [];
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
      });

      if (secSelect) {
        const prevVal = secSelect.value;
        secSelect.innerHTML = allSections.map(s => `
          <option value="${s}">${escapeHtml(s)}</option>
        `).join('');
        if (prevVal && allSections.includes(prevVal)) {
          secSelect.value = prevVal;
        } else if (allSections.length > 0) {
          secSelect.value = allSections[0];
        }
      }

      const selectedSec = secSelect ? secSelect.value : (allSections[0] || '');

      // Icon-only Google Classroom link container
      const gradebookClassroomContainer = document.getElementById('gradebook-classroom-btn-container');
      if (gradebookClassroomContainer) {
        if (selectedSec) {
          const parts = selectedSec.split(' - ');
          const code = parts[0];
          const sec = parts[1];
          const link = getClassroomLink(code, sec);
          if (link) {
            gradebookClassroomContainer.innerHTML = `
              <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center justify-center transition shadow-2xs" title="Open Google Classroom for ${escapeHtml(selectedSec)}">
                <svg class="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </a>
            `;
          } else {
            gradebookClassroomContainer.innerHTML = `
              <button type="button" onclick="openClassroomModal('${escapeHtml(code)}', '${escapeHtml(sec)}')" class="p-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-800 border border-dashed border-slate-300 hover:border-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center transition" title="+ Link Google Classroom for ${escapeHtml(selectedSec)}">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              </button>
            `;
          }
        } else {
          gradebookClassroomContainer.innerHTML = '';
        }
      }

      // Update Grading Scale Drawer content
      renderGradingScaleDrawer(selectedSec);

      // Load section configuration
      const config = getGradingConfig(selectedSec);

      // Update collapse/expand toolbar button state
      const collapseText = document.getElementById('gradebook-collapse-text');
      const collapseIcon = document.getElementById('gradebook-collapse-icon');
      const allCollapsed = config.categories.length > 0 && config.categories.every(c => gradebookCollapsedCats[c.id]);
      if (collapseText && collapseIcon) {
        collapseText.innerText = allCollapsed ? 'Expand Sub-activities' : 'Collapse Sub-activities';
        collapseIcon.innerText = allCollapsed ? '⊟' : '⊞';
      }

      // Calculate total category percentage weight
      let totalCatWeight = 0;
      config.categories.forEach(cat => {
        totalCatWeight += parseFloat(cat.weight) || 0;
      });
      totalCatWeight = Math.round(totalCatWeight * 100) / 100;
      const isUnbalanced = Math.abs(totalCatWeight - 100) > 0.01;

      const weightAlertEl = document.getElementById('gradebook-weight-alert');
      const weightAlertMsg = document.getElementById('gradebook-weight-alert-msg');
      if (weightAlertEl) {
        if (isUnbalanced) {
          weightAlertEl.classList.remove('hidden');
          if (weightAlertMsg) {
            const diff = Math.round(Math.abs(100 - totalCatWeight) * 100) / 100;
            const diffDesc = totalCatWeight < 100 ? `${diff}% short of 100%` : `${diff}% over 100%`;
            weightAlertMsg.innerHTML = `Total activity weight currently adds up to <strong class="underline decoration-rose-500 font-black text-rose-950">${totalCatWeight}%</strong> (${diffDesc}). Final grades and MSU scale evaluation cannot be computed accurately until categories add up to exactly 100%.`;
          }
        } else {
          weightAlertEl.classList.add('hidden');
        }
      }

      const categoryPalette = [
        {
          tier1: 'bg-sky-100/90 text-sky-950 border-sky-300',
          tier2: 'bg-sky-50 text-sky-900 border-sky-200',
          groupBorder: 'border-r-2 border-sky-300',
          badge: 'bg-sky-100 text-sky-900 border border-sky-300'
        },
        {
          tier1: 'bg-violet-100/90 text-violet-950 border-violet-300',
          tier2: 'bg-violet-50 text-violet-900 border-violet-200',
          groupBorder: 'border-r-2 border-violet-300',
          badge: 'bg-violet-100 text-violet-900 border border-violet-300'
        },
        {
          tier1: 'bg-amber-100/90 text-amber-950 border-amber-300',
          tier2: 'bg-amber-50 text-amber-900 border-amber-200',
          groupBorder: 'border-r-2 border-amber-300',
          badge: 'bg-amber-100 text-amber-900 border border-amber-300'
        },
        {
          tier1: 'bg-emerald-100/90 text-emerald-950 border-emerald-300',
          tier2: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          groupBorder: 'border-r-2 border-emerald-300',
          badge: 'bg-emerald-100 text-emerald-900 border border-emerald-300'
        },
        {
          tier1: 'bg-rose-100/90 text-rose-950 border-rose-300',
          tier2: 'bg-rose-50 text-rose-900 border-rose-200',
          groupBorder: 'border-r-2 border-rose-300',
          badge: 'bg-rose-100 text-rose-900 border border-rose-300'
        },
        {
          tier1: 'bg-teal-100/90 text-teal-950 border-teal-300',
          tier2: 'bg-teal-50 text-teal-900 border-teal-200',
          groupBorder: 'border-r-2 border-teal-300',
          badge: 'bg-teal-100 text-teal-900 border border-teal-300'
        },
        {
          tier1: 'bg-indigo-100/90 text-indigo-950 border-indigo-300',
          tier2: 'bg-indigo-50 text-indigo-900 border-indigo-200',
          groupBorder: 'border-r-2 border-indigo-300',
          badge: 'bg-indigo-100 text-indigo-900 border border-indigo-300'
        }
      ];

      // Render 2-tier spreadsheet thead with interactive column sorting
      if (thead) {
        let tier1Html = `
          <tr class="border-b border-slate-300 text-slate-700 font-bold bg-slate-100">
            <th rowspan="2" onclick="toggleGradebookSort('default')" class="sticky-grade-head-1 py-2.5 px-2 text-center border-r border-slate-200 bg-slate-100 cursor-pointer select-none hover:bg-slate-200 transition" title="Click to reset to default student roster order">
              <div class="flex items-center justify-center gap-0.5">
                <span>#</span>
                ${getGradebookSortIndicator('default')}
              </div>
            </th>
            <th rowspan="2" onclick="toggleGradebookSort('id')" class="sticky-grade-head-2 py-2.5 px-2.5 border-r border-slate-200 whitespace-nowrap bg-slate-100 cursor-pointer select-none hover:bg-slate-200 transition" title="Click to sort by Student ID (Ascending/Descending)">
              <div class="flex items-center justify-center gap-1">
                <span>Student ID</span>
                ${getGradebookSortIndicator('id')}
              </div>
            </th>
            <th rowspan="2" onclick="toggleGradebookSort('name')" class="sticky-grade-head-3 py-2.5 px-3 border-r border-slate-200 whitespace-nowrap bg-slate-100 cursor-pointer select-none hover:bg-slate-200 transition" title="Click to sort by Student Name (A-Z / Z-A)">
              <div class="flex items-center justify-center gap-1">
                <span>Student Name</span>
                ${getGradebookSortIndicator('name')}
              </div>
            </th>
        `;

        let tier2Html = `
          <tr class="border-b border-slate-300 text-slate-600 font-medium bg-slate-50 text-[11px]">
        `;

        config.categories.forEach((cat, catIdx) => {
          const catTheme = categoryPalette[catIdx % categoryPalette.length];
          const isCollapsed = !!gradebookCollapsedCats[cat.id];

          if (isCollapsed) {
            tier1Html += `
              <th colspan="1" draggable="true" ondragstart="handleCategoryDragStart(event, ${catIdx})" ondragover="event.preventDefault(); this.classList.add('grade-cat-drag-over')" ondragleave="this.classList.remove('grade-cat-drag-over')" ondrop="handleCategoryDrop(event, ${catIdx})" onclick="toggleGradebookCategoryCollapse('${cat.id}')" class="cursor-grab active:cursor-grabbing py-2.5 px-2 text-center font-extrabold ${catTheme.tier1} ${catTheme.groupBorder} select-none hover:brightness-95 transition-all" title="Click to expand ${escapeHtml(cat.name)} sub-activities (or drag to reorder)">
                <div class="flex items-center justify-center gap-1.5">
                  <span class="text-xs tracking-tight">${escapeHtml(cat.name)} (${cat.weight}%)</span>
                  <span class="text-[11px] font-bold text-slate-500">▸</span>
                </div>
              </th>
            `;
            tier2Html += `
              <th onclick="toggleGradebookSort('cat_${cat.id}')" class="py-1.5 px-2 text-center whitespace-nowrap text-slate-700 font-bold text-[10.5px] ${catTheme.tier2} ${catTheme.groupBorder} cursor-pointer select-none hover:brightness-95 transition" title="Click to sort by ${escapeHtml(cat.name)} Subtotal %">
                <div class="flex items-center justify-center gap-0.5">
                  <span>Subtotal %</span>
                  ${getGradebookSortIndicator('cat_' + cat.id)}
                </div>
              </th>
            `;
          } else {
            const subCount = (cat.subActivities && cat.subActivities.length > 0) ? cat.subActivities.length : 1;
            tier1Html += `
              <th colspan="${subCount}" draggable="true" ondragstart="handleCategoryDragStart(event, ${catIdx})" ondragover="event.preventDefault(); this.classList.add('grade-cat-drag-over')" ondragleave="this.classList.remove('grade-cat-drag-over')" ondrop="handleCategoryDrop(event, ${catIdx})" onclick="toggleGradebookCategoryCollapse('${cat.id}')" class="cursor-grab active:cursor-grabbing py-2.5 px-2 text-center font-extrabold ${catTheme.tier1} ${catTheme.groupBorder} select-none hover:brightness-95 transition-all" title="Click to collapse ${escapeHtml(cat.name)} sub-activities (or drag to reorder)">
                <div class="flex items-center justify-center gap-1.5">
                  <span class="text-xs tracking-tight">${escapeHtml(cat.name)} (${cat.weight}%)</span>
                  ${(cat.subActivities && cat.subActivities.length > 0) ? `<span class="text-[11px] font-bold text-slate-500">▾</span>` : ''}
                </div>
              </th>
            `;
            if (cat.subActivities && cat.subActivities.length > 0) {
              cat.subActivities.forEach((sub, subIdx) => {
                const isLast = (subIdx === cat.subActivities.length - 1);
                const borderClass = isLast ? catTheme.groupBorder : 'border-r border-slate-200';
                tier2Html += `
                  <th onclick="toggleGradebookSort('sub_${sub.id}')" class="py-1.5 px-1.5 text-center whitespace-nowrap ${catTheme.tier2} ${borderClass} cursor-pointer select-none hover:brightness-95 transition" title="Click to sort by ${escapeHtml(sub.name)} score (Highest/Lowest)">
                    <div class="flex items-center justify-center gap-0.5">
                      <span class="font-bold text-slate-800 text-[11px]">${escapeHtml(sub.name)}</span>
                      ${getGradebookSortIndicator('sub_' + sub.id)}
                    </div>
                    <div class="text-[9.5px] text-slate-500 font-mono font-normal">${sub.maxScore} pts • ${sub.weight}%</div>
                  </th>
                `;
              });
            } else {
              tier2Html += `
                <th class="py-1.5 px-1.5 text-center italic text-slate-400 ${catTheme.tier2} ${catTheme.groupBorder}">No items</th>
              `;
            }
          }
        });

        if (isUnbalanced) {
          tier1Html += `
            <th class="py-2 px-2 text-center border-r border-rose-300 bg-rose-100/90 text-rose-950 font-extrabold whitespace-nowrap" title="Total activity percentage must equal 100%">
              <span class="inline-flex items-center gap-1 text-[11px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse shadow-2xs">
                ⚠️ Sum: ${totalCatWeight}% (≠ 100%)
              </span>
            </th>
          `;
          tier2Html += `
            <th class="py-1.5 px-1.5 text-center border-r border-rose-200 bg-rose-50 text-[10px] text-rose-700 font-bold whitespace-nowrap">
              Weight Error
            </th>
          `;
        }

        tier1Html += `
            <th rowspan="2" onclick="toggleGradebookSort('total')" class="py-2.5 px-2 text-center bg-slate-200 font-black border-r border-slate-300 min-w-[85px] cursor-pointer select-none hover:bg-slate-300 transition" title="Click to sort by Total Percentage (Highest/Lowest)">
              <div class="flex items-center justify-center gap-1">
                <span>Total %</span>
                ${getGradebookSortIndicator('total')}
              </div>
            </th>
            <th rowspan="2" class="py-2.5 px-2 text-center bg-slate-200 font-black border-r border-slate-300 min-w-[85px]">Final Grade</th>
            <th rowspan="2" class="py-2.5 px-2 text-center bg-slate-100 border-l border-slate-200 font-bold min-w-[105px]">Status</th>
          </tr>
        `;
        tier2Html += `</tr>`;

        thead.innerHTML = tier1Html + tier2Html;
      }

      // Filter students by selected section
      const sectionStudents = studentRoster.filter(s => s.section === selectedSec);
      sectionStudents.forEach(s => ensureStudentScores(s, config));

      // Memoize student grade calculations for this render pass to eliminate O(N log N) recalculations
      const gradeCache = new Map();
      sectionStudents.forEach(s => {
        gradeCache.set(s.id, calculateStudentGrade(s, config, selectedSec));
      });

      // Update statistics drawer with all enrolled students in section
      renderGradebookStats(selectedSec, sectionStudents, config);

      // Apply Grade and Status dropdown filters
      const gradeFilter = document.getElementById('gradebook-grade-filter')?.value || 'all';
      const statusFilter = document.getElementById('gradebook-status-filter')?.value || 'all';

      let filtered = sectionStudents.filter(s => {
        const res = gradeCache.get(s.id) || calculateStudentGrade(s, config, selectedSec);
        const matchesGrade = (gradeFilter === 'all') || (res.msu.grade === gradeFilter);
        const matchesStatus = (statusFilter === 'all') || (res.msu.status.toLowerCase() === statusFilter.toLowerCase());
        return matchesGrade && matchesStatus;
      });

      // Apply intelligent column sorting
      if (gradebookSortState.col === 'id') {
        filtered.sort((a, b) => {
          const cmp = (a.id || '').localeCompare(b.id || '', undefined, { numeric: true, sensitivity: 'base' });
          return gradebookSortState.direction === 'asc' ? cmp : -cmp;
        });
      } else if (gradebookSortState.col === 'name') {
        filtered.sort((a, b) => {
          const nameA = `${a.last || ''}, ${a.first || ''}`.trim().toLowerCase();
          const nameB = `${b.last || ''}, ${b.first || ''}`.trim().toLowerCase();
          const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
          return gradebookSortState.direction === 'asc' ? cmp : -cmp;
        });
      } else if (gradebookSortState.col === 'total') {
        filtered.sort((a, b) => {
          const gradeA = (gradeCache.get(a.id) || calculateStudentGrade(a, config, selectedSec)).total || 0;
          const gradeB = (gradeCache.get(b.id) || calculateStudentGrade(b, config, selectedSec)).total || 0;
          return gradebookSortState.direction === 'asc' ? (gradeA - gradeB) : (gradeB - gradeA);
        });
      } else if (gradebookSortState.col.startsWith('sub_')) {
        const subCol = gradebookSortState.col;
        let targetCat = null;
        let targetSub = null;
        config.categories.forEach(cat => {
          if (cat.subActivities) {
            const found = cat.subActivities.find(sub => sub.id === subCol || 'sub_' + sub.id === subCol);
            if (found) { targetCat = cat; targetSub = found; }
          }
        });
        const actualSubId = targetSub ? targetSub.id : subCol.replace(/^sub_sub_/, 'sub_');
        const catId = targetCat ? targetCat.id : '';
        const maxScore = targetSub ? targetSub.maxScore : 100;

        filtered.sort((a, b) => {
          const valA = parseFloat(getStudentScore(a, actualSubId, catId, maxScore)) || 0;
          const valB = parseFloat(getStudentScore(b, actualSubId, catId, maxScore)) || 0;
          return gradebookSortState.direction === 'asc' ? (valA - valB) : (valB - valA);
        });
      } else if (gradebookSortState.col.startsWith('cat_')) {
        const catCol = gradebookSortState.col;
        let targetCat = config.categories.find(c => c.id === catCol || 'cat_' + c.id === catCol);
        const actualCatId = targetCat ? targetCat.id : catCol.replace(/^cat_cat_/, 'cat_');
        filtered.sort((a, b) => {
          const gradeA = gradeCache.get(a.id) || calculateStudentGrade(a, config, selectedSec);
          const gradeB = gradeCache.get(b.id) || calculateStudentGrade(b, config, selectedSec);
          const valA = (gradeA.categoryTotals && gradeA.categoryTotals[actualCatId] !== undefined) ? gradeA.categoryTotals[actualCatId] : 0;
          const valB = (gradeB.categoryTotals && gradeB.categoryTotals[actualCatId] !== undefined) ? gradeB.categoryTotals[actualCatId] : 0;
          return gradebookSortState.direction === 'asc' ? (valA - valB) : (valB - valA);
        });
      }

      // Update statistics drawer
      renderGradebookStats(selectedSec, filtered, config);

      const tfoot = document.getElementById('gradebook-table-foot');

      if (filtered.length === 0) {
        if (tfoot) tfoot.innerHTML = '';
        const gradeFilter = document.getElementById('gradebook-grade-filter')?.value || 'all';
        const statusFilter = document.getElementById('gradebook-status-filter')?.value || 'all';
        const isFilteredOut = (gradeFilter !== 'all' || statusFilter !== 'all') && sectionStudents.length > 0;

        tbody.innerHTML = `
          <tr>
            <td colspan="30" class="py-8 text-center text-slate-400 italic">
              ${isFilteredOut
                ? `No students in ${escapeHtml(selectedSec)} match the selected Grade (${escapeHtml(gradeFilter)}) or Status (${escapeHtml(statusFilter)}) filter.`
                : `No students enrolled in section ${escapeHtml(selectedSec)}. Use the Class List tab to enroll students.`}
            </td>
          </tr>
        `;
        return;
      }

      // Render rows with Excel-style keyboard navigation and alternating zebra striping
      tbody.innerHTML = filtered.map((s, rowIdx) => {
        const gradeResult = gradeCache.get(s.id) || calculateStudentGrade(s, config, selectedSec);
        let colIdx = 0;
        const isEven = (rowIdx % 2 === 0);
        const rowClass = isEven ? 'grade-row-even bg-white' : 'grade-row-odd bg-slate-50/70';
        const stickyCellBg = isEven ? 'bg-white' : 'bg-slate-50';

        let cellsHtml = '';
        config.categories.forEach((cat, catIdx) => {
          const catTheme = categoryPalette[catIdx % categoryPalette.length];
          const isCollapsed = !!gradebookCollapsedCats[cat.id];
          if (isCollapsed) {
            const catScore = (gradeResult.categoryTotals && gradeResult.categoryTotals[cat.id] !== undefined) ? gradeResult.categoryTotals[cat.id] : 0;
            cellsHtml += `
              <td class="py-2 px-2 text-center ${catTheme.groupBorder} font-mono font-black text-xs" data-cat-summary="${cat.id}">
                <span class="inline-block px-2 py-0.5 rounded-full text-xs font-bold ${catTheme.badge}">${(parseFloat(catScore) || 0).toFixed(2)}%</span>
              </td>
            `;
          } else {
            if (cat.subActivities && cat.subActivities.length > 0) {
              cat.subActivities.forEach((sub, subIdx) => {
                const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
                const val = getStudentScore(s, sub.id, cat.id, maxScore);
                const numVal = parseFloat(val);
                const isOverMax = !isNaN(numVal) && numVal > maxScore;
                const inputClass = isOverMax ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-400 font-black' : 'bg-white border-slate-300';
                const inputTitle = isOverMax ? `⚠️ Warning: Score (${val}) exceeds maximum possible items (${maxScore})!` : `Score (max ${maxScore})`;
                const isLast = (subIdx === cat.subActivities.length - 1);
                const cellBorder = isLast ? catTheme.groupBorder : 'border-r border-slate-100';

                cellsHtml += `
                  <td class="py-2 px-1 text-center ${cellBorder}">
                    <input type="number" min="0" max="${maxScore}" step="any"
                      data-student="${escapeHtml(s.id)}"
                      data-sub="${escapeHtml(sub.id)}"
                      data-row="${rowIdx}"
                      data-col="${colIdx}"
                      value="${val}"
                      title="${inputTitle}"
                      onfocus="this.select()"
                      onkeydown="handleGradeGridKey(event, ${rowIdx}, ${colIdx})"
                      oninput="updateDynamicScore('${escapeHtml(s.id)}', '${escapeHtml(sub.id)}', this.value)"
                      onchange="updateDynamicScore('${escapeHtml(s.id)}', '${escapeHtml(sub.id)}', this.value, true)"
                      onblur="updateDynamicScore('${escapeHtml(s.id)}', '${escapeHtml(sub.id)}', this.value, true)"
                      class="grade-cell-input w-14 text-center font-mono font-bold rounded py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition border ${inputClass}">
                  </td>
                `;
                colIdx++;
              });
            } else {
              cellsHtml += `<td class="py-2 px-1 text-center text-slate-300 ${catTheme.groupBorder}">—</td>`;
            }
          }
        });

        return `
          <tr id="grade-row-${escapeHtml(s.id)}" data-student-id="${escapeHtml(s.id)}" class="${rowClass} hover:bg-blue-50/40 transition border-b border-slate-200 group">
            <td class="sticky-grade-col-1 py-2.5 px-2 font-mono text-slate-400 text-center border-r border-slate-200 ${stickyCellBg}">${rowIdx + 1}</td>
            <td class="sticky-grade-col-2 py-2.5 px-2.5 font-mono font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap ${stickyCellBg}">${escapeHtml(s.id)}</td>
            <td class="sticky-grade-col-3 py-2.5 px-3 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap ${stickyCellBg} overflow-hidden" title="${escapeHtml(s.last)}, ${escapeHtml(s.first)}">
              <div class="truncate max-w-[216px]">${escapeHtml(s.last)}, ${escapeHtml(s.first)}</div>
            </td>
            ${cellsHtml}
            ${isUnbalanced ? '<td class="py-2 px-1 text-center border-r border-rose-200 bg-rose-50/40 text-rose-600 font-bold text-xs" title="Total weight does not equal 100%">⚠️</td>' : ''}
            <td class="py-2.5 px-2 text-center font-extrabold text-xs font-mono text-slate-800 bg-slate-100/90 border-r border-slate-200 grade-total-cell">${(parseFloat(gradeResult.total) || 0).toFixed(2)}%</td>
            <td class="py-2.5 px-2 text-center border-r border-slate-200 bg-amber-50/70">
              <span class="grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${gradeResult.msu.class}">${gradeResult.msu.grade}</span>
            </td>
            <td class="py-2.5 px-2 text-center ${stickyCellBg} border-l border-slate-200">
              <select onchange="updateGradeStatusOverride('${escapeHtml(s.id)}', this.value)" class="grade-status-select text-[11px] font-bold rounded border border-slate-300 px-1 py-1 bg-white focus:ring-1 focus:ring-msu-maroon ${gradeResult.msu.status === 'Passed' ? 'text-emerald-700' : (gradeResult.msu.status === 'Incomplete' ? 'text-orange-700' : (gradeResult.msu.status === 'Withdrawn' || gradeResult.msu.status === 'Dropped' ? 'text-slate-600' : 'text-rose-700'))}">
                <option value="" ${!s.statusOverride ? 'selected' : ''}>Auto (${gradeResult.msu.status})</option>
                <option value="INC" ${s.statusOverride === 'INC' ? 'selected' : ''}>INC</option>
                <option value="WDRW" ${s.statusOverride === 'WDRW' ? 'selected' : ''}>WDRW</option>
                <option value="DRP" ${s.statusOverride === 'DRP' ? 'selected' : ''}>DRP</option>
              </select>
            </td>
          </tr>
        `;
      }).join('');

      // Render Class Average Summary Footer (tfoot)
      if (tfoot) {
        const isFiltered = (gradeFilter !== 'all' || statusFilter !== 'all');
        if (isFiltered) {
          tfoot.innerHTML = '';
          return;
        }

        let footCellsHtml = '';
        let classSumTotal = 0;
        let passCount = 0;

        filtered.forEach(s => {
          const res = gradeCache.get(s.id) || calculateStudentGrade(s, config, selectedSec);
          classSumTotal += res.total;
          if (res.msu.status === 'Passed') passCount++;
        });

        const classAvgTotal = filtered.length > 0 ? (classSumTotal / filtered.length) : 0;
        const classAvgMsu = getMsuGrade(classAvgTotal, null, selectedSec);
        const passRate = filtered.length > 0 ? ((passCount / filtered.length) * 100) : 0;

        config.categories.forEach((cat, catIdx) => {
          const catTheme = categoryPalette[catIdx % categoryPalette.length];
          const isCollapsed = !!gradebookCollapsedCats[cat.id];

          if (isCollapsed) {
            let catSum = 0;
            filtered.forEach(s => {
              const res = calculateStudentGrade(s, config, selectedSec);
              catSum += (res.categoryTotals && res.categoryTotals[cat.id]) ? res.categoryTotals[cat.id] : 0;
            });
            const catAvg = filtered.length > 0 ? (catSum / filtered.length) : 0;
            footCellsHtml += `
              <td class="py-2.5 px-2 text-center font-mono font-black text-xs ${catTheme.groupBorder} bg-slate-100" title="Class Average for ${escapeHtml(cat.name)}">
                <span class="inline-block px-2 py-0.5 rounded-full text-xs font-bold ${catTheme.badge}">${catAvg.toFixed(2)}%</span>
              </td>
            `;
          } else {
            if (cat.subActivities && cat.subActivities.length > 0) {
              cat.subActivities.forEach((sub, subIdx) => {
                let subScoreSum = 0;
                filtered.forEach(s => {
                  subScoreSum += parseFloat(getStudentScore(s, sub.id, cat.id, sub.maxScore)) || 0;
                });
                const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
                const avgScore = filtered.length > 0 ? (subScoreSum / filtered.length) : 0;
                const avgPct = (avgScore / maxScore) * 100;
                const isLast = (subIdx === cat.subActivities.length - 1);
                const cellBorder = isLast ? catTheme.groupBorder : 'border-r border-slate-200';

                footCellsHtml += `
                  <td class="py-2 px-1 text-center font-mono text-[11px] ${cellBorder} bg-slate-100" title="${escapeHtml(sub.name)}: Avg ${avgScore.toFixed(1)} / ${maxScore} (${avgPct.toFixed(2)}%)">
                    <div class="font-bold text-slate-800">${avgScore.toFixed(1)}</div>
                    <div class="text-[9.5px] text-slate-500 font-normal">${avgPct.toFixed(2)}%</div>
                  </td>
                `;
              });
            } else {
              footCellsHtml += `<td class="py-2 px-1 text-center text-slate-400 ${catTheme.groupBorder} bg-slate-100">—</td>`;
            }
          }
        });

        tfoot.innerHTML = `
          <tr class="border-t-2 border-slate-300 bg-slate-100 text-slate-800">
            <td class="sticky-grade-foot-1 py-2.5 px-2 text-center font-mono font-bold text-slate-400 border-r border-slate-200 bg-slate-100">—</td>
            <td class="sticky-grade-foot-2 py-2.5 px-2.5 font-mono font-black text-slate-800 border-r border-slate-200 whitespace-nowrap bg-slate-100 uppercase tracking-wider text-[11px]">AVERAGE</td>
            <td class="sticky-grade-foot-3 py-2.5 px-3 font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap bg-slate-100 text-xs">
              Class Mean (${filtered.length} Students)
            </td>
            ${footCellsHtml}
            ${isUnbalanced ? '<td class="py-2 px-1 text-center border-r border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs">—</td>' : ''}
            <td class="py-2.5 px-2 text-center font-black text-xs font-mono text-slate-900 bg-slate-200 border-r border-slate-300">
              ${classAvgTotal.toFixed(2)}%
            </td>
            <td class="py-2.5 px-2 text-center border-r border-slate-200 bg-amber-100/80">
              <span class="grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${classAvgMsu.class}">${classAvgMsu.grade}</span>
            </td>
            <td class="py-2.5 px-2 text-center bg-slate-100 border-l border-slate-200 whitespace-nowrap">
              <span class="text-[11px] font-black ${passRate >= 75 ? 'text-emerald-700' : 'text-rose-700'}">${passRate.toFixed(2)}% Pass</span>
            </td>
          </tr>
        `;
      }
      if (typeof updateGradebookSidebar === 'function') {
        updateGradebookSidebar();
      }
    }

    function handleGradeGridKey(e, row, col) {
      let targetRow = row;
      let targetCol = col;
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        targetRow = row + 1;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        targetRow = row - 1;
      } else if (e.key === 'ArrowRight') {
        let atEnd = true;
        try {
          if (e.target.selectionEnd !== null && e.target.selectionEnd !== undefined) {
            atEnd = (e.target.selectionEnd === e.target.value.length);
          }
        } catch (_) {}
        if (atEnd) targetCol = col + 1;
        else return;
      } else if (e.key === 'ArrowLeft') {
        let atStart = true;
        try {
          if (e.target.selectionStart !== null && e.target.selectionStart !== undefined) {
            atStart = (e.target.selectionStart === 0);
          }
        } catch (_) {}
        if (atStart) targetCol = col - 1;
        else return;
      } else {
        return;
      }
      const targetInput = document.querySelector(`input[data-row="${targetRow}"][data-col="${targetCol}"]`);
      if (targetInput) {
        targetInput.focus();
        targetInput.select();
      }
    }

    function updateGradeStatusOverride(studentId, overrideVal) {
      const student = studentRoster.find(s => s.id === studentId);
      if (!student) return;
      student.statusOverride = overrideVal || '';
      saveAppState();
      renderGradebook();
    }

    // High Performance In-Place Reactive Score Update
    function updateDynamicScore(studentId, subId, val, immediate = false) {
      const secSelect = document.getElementById('gradebook-section-select');
      const sectionKey = secSelect ? secSelect.value : '';

      // Find student matching both ID and current section
      let student = studentRoster.find(s => s.id === studentId && (s.section === sectionKey || !sectionKey));
      if (!student) {
        student = studentRoster.find(s => s.id === studentId);
      }
      if (!student) return;

      if (!student.scores || typeof student.scores !== 'object') {
        student.scores = {};
      }

      const activeSection = sectionKey || student.section;
      const config = getGradingConfig(activeSection);

      // Sub-activity max score validation
      let targetSub = null;
      config.categories.forEach(cat => {
        if (cat.subActivities) {
          const found = cat.subActivities.find(sub => sub.id === subId);
          if (found) targetSub = found;
        }
      });
      const maxScore = (targetSub && targetSub.maxScore > 0) ? targetSub.maxScore : 100;

      const numVal = Math.max(0, parseFloat(val) || 0);
      student.scores[subId] = numVal;

      const gradeResult = calculateStudentGrade(student, config, sectionKey);
      const isOverMax = (parseFloat(val) || 0) > maxScore;

      const inputEl = document.querySelector(`input[data-student="${studentId}"][data-sub="${subId}"]`);
      if (inputEl) {
        if (isOverMax) {
          inputEl.classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700', 'ring-2', 'ring-rose-400', 'font-black');
          inputEl.classList.remove('bg-white', 'border-slate-300');
          inputEl.title = `⚠️ Warning: Entered score (${val}) exceeds maximum possible items (${maxScore})!`;
          showToast(`⚠️ Warning: Score (${val}) exceeds max score (${maxScore}) for ${targetSub?.name || 'activity'}!`, "⚠️");
        } else {
          inputEl.classList.remove('border-rose-500', 'bg-rose-50', 'text-rose-700', 'ring-2', 'ring-rose-400', 'font-black');
          inputEl.classList.add('bg-white', 'border-slate-300');
          inputEl.title = `Score (max ${maxScore})`;
        }
      }

      // Sync legacy properties if standard IDs to preserve backward compatibility
      if (subId.startsWith('sub_quiz')) student.qz = gradeResult.categoryTotals['cat_quiz'] || student.qz;
      if (subId.startsWith('sub_lab')) student.lab = gradeResult.categoryTotals['cat_lab'] || student.lab;
      if (subId.startsWith('sub_p1')) student.p1 = gradeResult.categoryTotals['cat_p1'] || student.p1;
      if (subId.startsWith('sub_p2')) student.p2 = gradeResult.categoryTotals['cat_p2'] || student.p2;
      if (subId.startsWith('sub_fin')) student.fin = gradeResult.categoryTotals['cat_fin'] || student.fin;

      const row = document.getElementById('grade-row-' + studentId);
      if (row) {
        // Update category summary cells if in collapsed mode
        config.categories.forEach(cat => {
          const sumCell = row.querySelector(`[data-cat-summary="${cat.id}"]`);
          if (sumCell) {
            const badge = sumCell.querySelector('span');
            const formatted = (parseFloat(gradeResult.categoryTotals[cat.id]) || 0).toFixed(2) + '%';
            if (badge) badge.innerText = formatted;
            else sumCell.innerText = formatted;
          }
        });

        const totalCell = row.querySelector('.grade-total-cell');
        const msuCell = row.querySelector('.grade-msu-cell');
        const statusSelect = row.querySelector('.grade-status-select');

        if (totalCell) totalCell.innerText = (parseFloat(gradeResult.total) || 0).toFixed(2) + '%';
        if (msuCell) {
          msuCell.className = 'grade-msu-cell inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ' + gradeResult.msu.class;
          msuCell.innerText = gradeResult.msu.grade;
        }
        if (statusSelect && statusSelect.options && statusSelect.options.length > 0 && !student.statusOverride) {
          statusSelect.options[0].text = 'Auto (' + gradeResult.msu.status + ')';
          statusSelect.className = 'grade-status-select text-xs font-bold rounded border border-slate-300 px-1.5 py-1 bg-white focus:ring-1 focus:ring-msu-maroon ' + (gradeResult.msu.status === 'Passed' ? 'text-emerald-700' : (gradeResult.msu.status === 'Incomplete' ? 'text-orange-700' : 'text-rose-700'));
        }
      }

      // Save debounced to avoid freezing on rapid typing (immediate on blur/beforeunload)
      saveAppState(immediate);
      if (typeof updateGradebookSidebar === 'function') {
        updateGradebookSidebar();
      }
    }

    // Legacy fallback updateScore
    function updateScore(studentId, field, val) {
      updateDynamicScore(studentId, 'sub_' + field, val);
    }

    function exportGradebookCSV() {
      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';
      const config = getGradingConfig(selectedSec);

      let headerRow = ['Student ID', 'Last Name', 'First Name', 'Section'];
      config.categories.forEach(cat => {
        if (cat.subActivities && cat.subActivities.length > 0) {
          cat.subActivities.forEach(sub => {
            headerRow.push(`${cat.name} - ${sub.name} (${sub.maxScore}pts • ${sub.weight}%)`);
          });
        } else {
          headerRow.push(`${cat.name} (${cat.weight}%)`);
        }
      });
      headerRow.push('Total %', 'Final Grade', 'Status');

      let csv = headerRow.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';

      const filtered = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
      filtered.forEach(s => {
        const gradeResult = calculateStudentGrade(s, config, selectedSec);
        const row = [s.id, s.last, s.first, s.section];
        config.categories.forEach(cat => {
          if (cat.subActivities && cat.subActivities.length > 0) {
            cat.subActivities.forEach(sub => {
              const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
              row.push(getStudentScore(s, sub.id, cat.id, maxScore));
            });
          } else {
            row.push(0);
          }
        });
        row.push(gradeResult.total + '%', gradeResult.msu.grade, gradeResult.msu.status);
        csv += row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',') + '\n';
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'MSU_Class_Record_' + (selectedSec ? selectedSec.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' : '') + new Date().toISOString().slice(0, 10) + '.csv');
      a.click();
      showToast("Class Record CSV exported!");
    }

    // ================= GRADING SCALE MODAL CONTROLS =================
    let currentEditingScaleScope = '__default__';
    let currentEditingScaleMode = 'default';
    let currentEditingScaleData = [];

    function openGradingScaleModal() {
      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';

      const allSections = [];
      courseData.subjects.forEach(sub => {
        sub.sections.forEach(sec => allSections.push(sub.code + ' - ' + sec));
      });

      const scopeSelect = document.getElementById('grading-scale-scope-select');
      if (scopeSelect) {
        scopeSelect.innerHTML = `
          <option value="__default__">Default Grading Scale (All Sections)</option>
          ${allSections.map(s => `<option value="${s}">Section: ${escapeHtml(s)}</option>`).join('')}
        `;
        if (selectedSec && allSections.includes(selectedSec)) {
          scopeSelect.value = selectedSec;
        } else {
          scopeSelect.value = '__default__';
        }
      }

      onGradingScaleScopeChange();
      document.getElementById('grading-scale-modal').classList.remove('hidden');
    }

    function closeGradingScaleModal() {
      document.getElementById('grading-scale-modal').classList.add('hidden');
    }

    function onGradingScaleScopeChange() {
      const scopeSelect = document.getElementById('grading-scale-scope-select');
      const scope = scopeSelect ? scopeSelect.value : '__default__';
      currentEditingScaleScope = scope;

      const toggleContainer = document.getElementById('grading-scale-section-toggle-container');
      const hintEl = document.getElementById('grading-scale-scope-hint');

      if (scope === '__default__') {
        if (toggleContainer) toggleContainer.classList.add('hidden');
        if (hintEl) hintEl.innerText = 'Configuring global default grading scale. Sections without their own custom scale will automatically inherit these thresholds.';
        currentEditingScaleMode = 'custom';
        const { scale } = getActiveGradingScale('');
        currentEditingScaleData = JSON.parse(JSON.stringify(scale));
      } else {
        if (toggleContainer) toggleContainer.classList.remove('hidden');
        const hasCustom = !!(courseData.gradingScales && courseData.gradingScales.sections && courseData.gradingScales.sections[scope]);
        currentEditingScaleMode = hasCustom ? 'custom' : 'default';

        const radioDefault = document.getElementById('grading-scale-mode-default');
        const radioCustom = document.getElementById('grading-scale-mode-custom');
        if (radioDefault) radioDefault.checked = !hasCustom;
        if (radioCustom) radioCustom.checked = hasCustom;

        if (hasCustom) {
          if (hintEl) hintEl.innerText = `Section "${scope}" is currently using a custom grading scale. Click "Sync with Default" to revert.`;
          currentEditingScaleData = JSON.parse(JSON.stringify(courseData.gradingScales.sections[scope]));
        } else {
          if (hintEl) hintEl.innerText = `Section "${scope}" is currently inheriting the default grading scale. Select "Customize for this Section" to create specific thresholds.`;
          const { scale } = getActiveGradingScale('');
          currentEditingScaleData = JSON.parse(JSON.stringify(scale));
        }
      }

      renderGradingScaleInputs();
    }

    function onGradingScaleModeChange(mode) {
      currentEditingScaleMode = mode;
      const hintEl = document.getElementById('grading-scale-scope-hint');
      if (mode === 'default') {
        const { scale } = getActiveGradingScale('');
        currentEditingScaleData = JSON.parse(JSON.stringify(scale));
        if (hintEl) hintEl.innerText = `Section "${currentEditingScaleScope}" will inherit the default grading scale.`;
      } else {
        if (hintEl) hintEl.innerText = `Custom scale enabled for section "${currentEditingScaleScope}". Modify threshold values below.`;
      }
      renderGradingScaleInputs();
    }

    function resetSectionScaleToDefault() {
      if (currentEditingScaleScope === '__default__') return;
      currentEditingScaleMode = 'default';
      const radioDefault = document.getElementById('grading-scale-mode-default');
      if (radioDefault) radioDefault.checked = true;
      const { scale } = getActiveGradingScale('');
      currentEditingScaleData = deepClone(scale);
      renderGradingScaleInputs();
      showToast(`Reset ${currentEditingScaleScope} to default scale.`);
    }

    function restoreOfficialMsuScale() {
      currentEditingScaleData = deepClone(DEFAULT_MSU_SCALE);
      renderGradingScaleInputs();
      showToast("Reset to default grading scale (95.56% - 60.00%).");
    }

    function updateGradingScaleItemMin(grade, val) {
      const item = currentEditingScaleData.find(i => i.grade === grade);
      if (item) {
        item.min = parseFloat(val) || 0;
      }
    }

    function renderGradingScaleInputs() {
      const container = document.getElementById('grading-scale-inputs-container');
      if (!container) return;
      const isReadOnly = (currentEditingScaleScope !== '__default__' && currentEditingScaleMode === 'default');

      container.innerHTML = currentEditingScaleData.filter(item => item.grade !== '5.00').map(item => {
        return `
          <div class="p-2.5 rounded-xl border ${item.grade === 'INC' ? 'border-orange-200 bg-orange-50/40' : 'border-slate-200 bg-slate-50/60'} space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-black text-sm ${item.grade === 'INC' ? 'text-orange-700' : (parseFloat(item.grade) <= 1.75 ? 'text-emerald-700' : (parseFloat(item.grade) <= 2.50 ? 'text-blue-700' : 'text-amber-700'))}">${item.grade}</span>
              <span class="text-[10px] text-slate-500 font-sans font-medium">${escapeHtml(item.desc || item.status || '')}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-[10px] font-bold text-slate-400">Min:</span>
              <input type="number" min="0" max="100" step="any" ${isReadOnly ? 'disabled' : ''} value="${item.min}" oninput="updateGradingScaleItemMin('${item.grade}', this.value)" class="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono font-bold text-slate-800 ${isReadOnly ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'focus:ring-2 focus:ring-amber-500'}">
              <span class="text-xs font-bold text-slate-500">%</span>
            </div>
          </div>
        `;
      }).join('') + `
        <div class="p-2.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-black text-sm text-rose-700">5.00</span>
            <span class="text-[10px] text-rose-600 font-sans font-medium">Failed</span>
          </div>
          <div class="text-[11px] text-slate-500 font-sans pt-1">
            Automatic for all scores below INC
          </div>
        </div>
      `;
    }

    function saveGradingScaleModal() {
      const errorEl = document.getElementById('grading-scale-error-msg');
      if (errorEl) errorEl.classList.add('hidden');

      if (!courseData.gradingScales) {
        courseData.gradingScales = { default: JSON.parse(JSON.stringify(DEFAULT_MSU_SCALE)), sections: {} };
      }

      if (currentEditingScaleScope === '__default__') {
        courseData.gradingScales.default = JSON.parse(JSON.stringify(currentEditingScaleData));
        showToast("Default grading scale saved!");
      } else {
        if (currentEditingScaleMode === 'default') {
          if (courseData.gradingScales.sections) {
            delete courseData.gradingScales.sections[currentEditingScaleScope];
          }
          showToast(`Section ${currentEditingScaleScope} set to use default scale.`);
        } else {
          if (!courseData.gradingScales.sections) courseData.gradingScales.sections = {};
          courseData.gradingScales.sections[currentEditingScaleScope] = JSON.parse(JSON.stringify(currentEditingScaleData));
          showToast(`Custom grading scale saved for ${currentEditingScaleScope}!`);
        }
      }

      saveAppState();
      closeGradingScaleModal();
      renderGradebook();
    }

    // ================= GRADING CRITERIA & ACTIVITIES MODAL CONTROLS =================
    let currentEditingGradingConfig = null;

    function openGradingCriteriaModal() {
      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';
      const parts = selectedSec.split(' - ');
      const courseCode = parts[0] || 'Course';

      const scopeSelect = document.getElementById('grading-criteria-scope');
      if (scopeSelect) {
        scopeSelect.innerHTML = `
          <option value="section__${escapeHtml(selectedSec)}">Section: ${escapeHtml(selectedSec)}</option>
          <option value="course__${escapeHtml(courseCode)}">All Sections of ${escapeHtml(courseCode)}</option>
        `;
        scopeSelect.value = `section__${selectedSec}`;
      }

      const existingConfig = getGradingConfig(selectedSec);
      currentEditingGradingConfig = JSON.parse(JSON.stringify(existingConfig));

      renderGradingCriteriaModal();
      document.getElementById('grading-criteria-modal').classList.remove('hidden');
    }

    function closeGradingCriteriaModal() {
      document.getElementById('grading-criteria-modal').classList.add('hidden');
    }

    function renderGradingCriteriaModal() {
      const container = document.getElementById('grading-criteria-categories-list');
      const totalWeightEl = document.getElementById('grading-criteria-total-weight');
      const indicatorEl = document.getElementById('grading-criteria-weight-indicator');
      if (!container || !currentEditingGradingConfig) return;

      let totalWeight = 0;
      currentEditingGradingConfig.categories.forEach(c => {
        totalWeight += parseFloat(c.weight) || 0;
      });
      totalWeight = Math.round(totalWeight * 100) / 100;

      if (totalWeightEl) totalWeightEl.innerText = totalWeight + '%';
      const errorBanner = document.getElementById('grading-criteria-error-msg');
      const errorText = document.getElementById('grading-criteria-error-text');

      if (indicatorEl) {
        if (Math.abs(totalWeight - 100) < 0.01) {
          indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-emerald-100 text-emerald-800';
          if (errorBanner) errorBanner.classList.add('hidden');
        } else {
          indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-rose-100 text-rose-800 border border-rose-300 animate-pulse';
          if (errorBanner && errorText) {
            const diff = Math.round(Math.abs(100 - totalWeight) * 100) / 100;
            const diffDesc = totalWeight < 100 ? `${diff}% short of 100%` : `${diff}% over 100%`;
            errorText.innerHTML = `Total activity percentage is currently <strong>${totalWeight}%</strong> (${diffDesc}). All categories must sum to exactly 100%.`;
            errorBanner.classList.remove('hidden');
          }
        }
      }

      container.innerHTML = currentEditingGradingConfig.categories.map((cat, catIdx) => {
        const subItems = cat.subActivities || [];
        let subWeightSum = 0;
        subItems.forEach(s => { subWeightSum += parseFloat(s.weight) || 0; });
        subWeightSum = Math.round(subWeightSum * 100) / 100;

        return `
          <div class="pt-4 first:pt-0 space-y-3">
            <div class="flex items-center justify-between gap-3 flex-wrap bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="flex items-center gap-2 flex-1 min-w-[200px]">
                <span class="w-6 h-6 rounded bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">${catIdx + 1}</span>
                <div class="flex-1">
                  <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category Name</label>
                  <input type="text" value="${escapeHtml(cat.name)}" oninput="updateGradingCategoryField(${catIdx}, 'name', this.value)" class="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Quizzes, Exams, Labs">
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div>
                  <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category Weight %</label>
                  <div class="flex items-center gap-1">
                    <input type="number" min="0" max="100" step="any" value="${cat.weight}" oninput="updateGradingCategoryField(${catIdx}, 'weight', this.value)" class="w-18 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono font-bold text-center text-slate-800 focus:ring-2 focus:ring-indigo-500">
                    <span class="font-bold text-slate-500">%</span>
                  </div>
                </div>
                ${currentEditingGradingConfig.categories.length > 1 ? `
                  <button type="button" onclick="removeGradingCategory(${catIdx})" class="mt-4 p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition" title="Delete Category">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                ` : ''}
              </div>
            </div>

            <div class="pl-4 pr-1 space-y-2">
              <div class="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
                <span>Sub-Activities (${subItems.length}) • Sub-Weight Sum: <strong class="${Math.abs(subWeightSum - 100) < 0.01 ? 'text-emerald-700' : 'text-amber-700'}">${subWeightSum}%</strong></span>
                <div class="flex items-center gap-2">
                  <button type="button" onclick="autoBalanceCategorySubActivities(${catIdx})" class="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-800 border border-slate-200 rounded text-[10px] font-bold transition" title="Distribute 1/N equal percentage">
                    ⚖️ Auto-balance (1/N)
                  </button>
                  <button type="button" onclick="addGradingSubActivity(${catIdx})" class="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold flex items-center gap-1 transition">
                    <span>+ Add Sub-Activity</span>
                  </button>
                </div>
              </div>

              <div class="space-y-1.5">
                ${subItems.map((sub, subIdx) => `
                  <div class="flex items-center gap-2 bg-slate-50/70 p-2 rounded-lg border border-slate-200 text-xs">
                    <span class="text-slate-400 font-mono text-[10px] w-4 text-center">${subIdx + 1}</span>
                    <input type="text" value="${escapeHtml(sub.name)}" oninput="updateGradingSubActivityField(${catIdx}, ${subIdx}, 'name', this.value)" class="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800" placeholder="e.g. Quiz #1">
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] text-slate-400">Total Items:</span>
                      <input type="number" min="1" max="1000" step="any" value="${sub.maxScore}" oninput="updateGradingSubActivityField(${catIdx}, ${subIdx}, 'maxScore', this.value)" class="w-16 bg-white border border-slate-300 rounded px-1.5 py-1 text-xs text-center font-mono" placeholder="50">
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] text-slate-400">Weight:</span>
                      <input type="number" min="0" max="100" step="any" value="${sub.weight}" oninput="updateGradingSubActivityField(${catIdx}, ${subIdx}, 'weight', this.value)" class="w-14 bg-white border border-slate-300 rounded px-1.5 py-1 text-xs text-center font-mono font-bold" placeholder="25">
                      <span class="text-[10px] text-slate-400">%</span>
                    </div>
                    <button type="button" onclick="removeGradingSubActivity(${catIdx}, ${subIdx})" class="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition" title="Delete Sub-Activity">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function addGradingCategory() {
      if (!currentEditingGradingConfig) return;
      const num = currentEditingGradingConfig.categories.length + 1;
      const catId = 'cat_' + Date.now();
      currentEditingGradingConfig.categories.push({
        id: catId,
        name: 'Category ' + num,
        weight: 10,
        subActivities: [
          { id: 'sub_' + catId + '_1', name: 'Activity 1', maxScore: 50, weight: 100 }
        ]
      });
      renderGradingCriteriaModal();
    }

    function removeGradingCategory(catIdx) {
      if (!currentEditingGradingConfig || currentEditingGradingConfig.categories.length <= 1) return;
      currentEditingGradingConfig.categories.splice(catIdx, 1);
      renderGradingCriteriaModal();
    }

    function addGradingSubActivity(catIdx) {
      if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
      const cat = currentEditingGradingConfig.categories[catIdx];
      if (!cat.subActivities) cat.subActivities = [];
      const num = cat.subActivities.length + 1;
      cat.subActivities.push({
        id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        name: cat.name.replace(/s$/i, '') + ' #' + num,
        maxScore: 50,
        weight: 0
      });
      autoBalanceSubActivities(cat);
      renderGradingCriteriaModal();
    }

    function removeGradingSubActivity(catIdx, subIdx) {
      if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
      const cat = currentEditingGradingConfig.categories[catIdx];
      if (!cat.subActivities) return;
      cat.subActivities.splice(subIdx, 1);
      autoBalanceSubActivities(cat);
      renderGradingCriteriaModal();
    }

    function autoBalanceCategorySubActivities(catIdx) {
      if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
      autoBalanceSubActivities(currentEditingGradingConfig.categories[catIdx]);
      renderGradingCriteriaModal();
    }

    function updateGradingCategoryField(catIdx, field, val) {
      if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
      if (field === 'weight') {
        currentEditingGradingConfig.categories[catIdx].weight = parseFloat(val) || 0;
        const totalWeightEl = document.getElementById('grading-criteria-total-weight');
        const indicatorEl = document.getElementById('grading-criteria-weight-indicator');
        const errorBanner = document.getElementById('grading-criteria-error-msg');
        const errorText = document.getElementById('grading-criteria-error-text');

        let tw = 0;
        currentEditingGradingConfig.categories.forEach(c => { tw += parseFloat(c.weight) || 0; });
        tw = Math.round(tw * 100) / 100;
        if (totalWeightEl) totalWeightEl.innerText = tw + '%';
        if (indicatorEl) {
          if (Math.abs(tw - 100) < 0.01) {
            indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-emerald-100 text-emerald-800';
            if (errorBanner) errorBanner.classList.add('hidden');
          } else {
            indicatorEl.className = 'flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs bg-rose-100 text-rose-800 border border-rose-300 animate-pulse';
            if (errorBanner && errorText) {
              const diff = Math.round(Math.abs(100 - tw) * 100) / 100;
              const diffDesc = tw < 100 ? `${diff}% short of 100%` : `${diff}% over 100%`;
              errorText.innerHTML = `Total activity percentage is currently <strong>${tw}%</strong> (${diffDesc}). All categories must sum to exactly 100%.`;
              errorBanner.classList.remove('hidden');
            }
          }
        }
      } else {
        currentEditingGradingConfig.categories[catIdx][field] = val;
      }
    }

    function updateGradingSubActivityField(catIdx, subIdx, field, val) {
      if (!currentEditingGradingConfig || !currentEditingGradingConfig.categories[catIdx]) return;
      const sub = currentEditingGradingConfig.categories[catIdx].subActivities[subIdx];
      if (!sub) return;
      if (field === 'maxScore' || field === 'weight') {
        sub[field] = parseFloat(val) || 0;
      } else {
        sub[field] = val;
      }
    }

    function resetGradingCriteriaToDefault() {
      currentEditingGradingConfig = JSON.parse(JSON.stringify(DEFAULT_GRADING_CONFIG));
      renderGradingCriteriaModal();
      showToast("Reset criteria to standard template.");
    }

    function saveGradingCriteriaModal() {
      if (!currentEditingGradingConfig) return;

      // Validate total category weight equals exactly 100%
      let totalWeight = 0;
      currentEditingGradingConfig.categories.forEach(c => {
        totalWeight += parseFloat(c.weight) || 0;
      });
      totalWeight = Math.round(totalWeight * 100) / 100;

      if (Math.abs(totalWeight - 100) > 0.01) {
        const diff = Math.round(Math.abs(100 - totalWeight) * 100) / 100;
        const diffDesc = totalWeight < 100 ? `short of 100% by ${diff}%` : `exceeds 100% by ${diff}%`;
        const errorBanner = document.getElementById('grading-criteria-error-msg');
        const errorText = document.getElementById('grading-criteria-error-text');
        if (errorBanner && errorText) {
          errorText.innerHTML = `<strong>Cannot Save:</strong> Total percentage of activities is <strong>${totalWeight}%</strong> (${diffDesc}). All categories must add up to exactly 100%.`;
          errorBanner.classList.remove('hidden');
          errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        showToast(`⚠️ Error: Total activity percentage is ${totalWeight}% (${diffDesc}). It must add up to exactly 100%!`, '⚠️');
        return;
      }

      const scopeVal = document.getElementById('grading-criteria-scope')?.value || '';
      if (!courseData.gradingConfigs) courseData.gradingConfigs = {};

      if (scopeVal.startsWith('course__')) {
        const courseCode = scopeVal.replace('course__', '');
        courseData.gradingConfigs[courseCode] = JSON.parse(JSON.stringify(currentEditingGradingConfig));
        // Clear any specific section overrides of this course so all follow course
        Object.keys(courseData.gradingConfigs).forEach(key => {
          if (key.startsWith(courseCode + ' - ')) {
            delete courseData.gradingConfigs[key];
          }
        });
        showToast(`Grading criteria applied to all sections of ${courseCode}!`);
      } else {
        const sectionKey = scopeVal.replace('section__', '');
        courseData.gradingConfigs[sectionKey] = JSON.parse(JSON.stringify(currentEditingGradingConfig));
        showToast(`Grading criteria saved for section ${sectionKey}!`);
      }

      saveAppState();
      closeGradingCriteriaModal();
      renderGradebook();
    }

    // ================= WINDOW EVENT LISTENERS & BOOTSTRAP =================
    window.addEventListener('resize', () => {
      setupSynchronizedScrollbars();
      renderWeeklyTimetable();
    });

    window.addEventListener('beforeunload', () => {
      saveAppState(true);
    });

    
    // ================= VISUAL COLOR PICKER WITH SWATCHES & LIVE PREVIEW =================
    const PALETTE_META = {
      blue: { name: 'Blue', hex: '#2563eb', bg: 'bg-blue-600', text: 'text-white' },
      emerald: { name: 'Emerald', hex: '#059669', bg: 'bg-emerald-600', text: 'text-white' },
      amber: { name: 'Amber', hex: '#d97706', bg: 'bg-amber-600', text: 'text-white' },
      purple: { name: 'Purple', hex: '#7c3aed', bg: 'bg-purple-600', text: 'text-white' },
      teal: { name: 'Teal', hex: '#0d9488', bg: 'bg-teal-600', text: 'text-white' },
      rose: { name: 'Rose', hex: '#e11d48', bg: 'bg-rose-600', text: 'text-white' },
      indigo: { name: 'Indigo', hex: '#4f46e5', bg: 'bg-indigo-600', text: 'text-white' },
      cyan: { name: 'Cyan', hex: '#0891b2', bg: 'bg-cyan-600', text: 'text-white' },
      orange: { name: 'Orange', hex: '#ea580c', bg: 'bg-orange-600', text: 'text-white' },
      slate: { name: 'Slate', hex: '#475569', bg: 'bg-slate-600', text: 'text-white' },
      lime: { name: 'Lime', hex: '#65a30d', bg: 'bg-lime-600', text: 'text-white' },
      sky: { name: 'Sky', hex: '#0284c7', bg: 'bg-sky-600', text: 'text-white' },
      pink: { name: 'Pink', hex: '#db2777', bg: 'bg-pink-600', text: 'text-white' },
      fuchsia: { name: 'Fuchsia', hex: '#c026d3', bg: 'bg-fuchsia-600', text: 'text-white' },
      red: { name: 'Red', hex: '#dc2626', bg: 'bg-red-600', text: 'text-white' },
      maroon: { name: 'Maroon', hex: '#800000', bg: 'bg-msu-maroon', text: 'text-white' }
    };

    function renderColorSwatches(mode) {
      const container = document.getElementById(mode + '-course-color-swatches');
      const select = document.getElementById(mode + '-course-color');
      const label = document.getElementById(mode + '-course-color-label');
      if (!container || !select) return;

      const activeTheme = select.value || 'blue';
      if (label && PALETTE_META[activeTheme]) {
        label.innerText = PALETTE_META[activeTheme].name + ' (' + PALETTE_META[activeTheme].hex + ')';
      }

      container.innerHTML = Object.keys(PALETTE_META).map(k => {
        const meta = PALETTE_META[k];
        const isActive = (k === activeTheme);
        return `
          <button type="button" onclick="selectColorTheme('${mode}', '${k}')" 
            class="color-swatch-btn w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center cursor-pointer ${isActive ? 'color-swatch-active' : 'opacity-85 hover:opacity-100'}" 
            style="background-color: ${meta.hex};" 
            title="${meta.name} Palette">
            ${isActive ? '<span class="text-white text-[11px] font-black leading-none drop-shadow">✓</span>' : ''}
          </button>
        `;
      }).join('');

      updateColorPreview(mode);
    }

    function selectColorTheme(mode, themeKey) {
      const select = document.getElementById(mode + '-course-color');
      if (!select) return;
      select.value = themeKey;
      renderColorSwatches(mode);
    }

    function onColorThemeSelectChange(mode) {
      renderColorSwatches(mode);
    }

    function updateColorPreview(mode) {
      const preview = document.getElementById(mode + '-course-color-preview');
      const select = document.getElementById(mode + '-course-color');
      if (!preview || !select) return;

      const codeInput = document.getElementById(mode + '-course-code');
      const titleInput = document.getElementById(mode + '-course-title');
      const code = (codeInput && codeInput.value.trim()) ? codeInput.value.trim().toUpperCase() : (mode === 'new' ? 'CVE120' : 'COURSE');
      const title = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : (mode === 'new' ? 'Sample Course Title' : 'Subject Description');

      const theme = select.value || 'blue';
      const pal = COLOR_PALETTES[theme] || COLOR_PALETTES.blue;
      const meta = PALETTE_META[theme] || PALETTE_META.blue;

      preview.className = 'p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ' + pal.color;
      preview.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-xs tracking-tight">${escapeHtml(code)}</span>
            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${pal.badgeBg}">3 Units</span>
          </div>
          <div class="text-[11px] font-medium opacity-90 truncate max-w-[220px] sm:max-w-xs mt-0.5">${escapeHtml(title)}</div>
        </div>
        <div class="text-right shrink-0">
          <span class="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${pal.badgeBg}">
            <span class="w-2 h-2 rounded-full" style="background-color: ${meta.hex}"></span>
            ${pal.name}
          </span>
        </div>
      `;
    }

    function initColorPickerListeners() {
      ['new', 'edit'].forEach(mode => {
        const codeInput = document.getElementById(mode + '-course-code');
        const titleInput = document.getElementById(mode + '-course-title');
        if (codeInput) codeInput.addEventListener('input', () => updateColorPreview(mode));
        if (titleInput) titleInput.addEventListener('input', () => updateColorPreview(mode));
      });
    }

    // ================= TAB SIDEBARS ARCHITECTURE & LOGIC =================
    function toggleTabSidebar(tabId) {
      const sidebar = document.getElementById('sidebar-' + tabId);
      if (!sidebar) return;
      const isCurrentlyCollapsed = sidebar.classList.contains('tab-sidebar-collapsed');
      if (isCurrentlyCollapsed) {
        sidebar.classList.remove('tab-sidebar-collapsed', 'hidden');
        sidebar.classList.add('tab-sidebar-expanded');
        const c = sidebar.closest('.tab-layout-container'); if(c) { c.classList.remove('sidebar-collapsed'); c.classList.add('sidebar-expanded'); }
        localStorage.setItem('sidebar_collapsed_' + tabId, '0');
        updateSidebarToggleButton(tabId, false);
      } else {
        sidebar.classList.remove('tab-sidebar-expanded');
        sidebar.classList.add('tab-sidebar-collapsed');
        const c = sidebar.closest('.tab-layout-container'); if(c) { c.classList.remove('sidebar-expanded'); c.classList.add('sidebar-collapsed'); }
        localStorage.setItem('sidebar_collapsed_' + tabId, '1');
        updateSidebarToggleButton(tabId, true);
      }
    }

    function closeAllSidebars() {
      ['planner', 'timetable', 'calendar', 'roster', 'gradebook'].forEach(tabId => {
        const sidebar = document.getElementById('sidebar-' + tabId);
        if (sidebar && sidebar.classList.contains('tab-sidebar-expanded')) {
          sidebar.classList.remove('tab-sidebar-expanded');
          sidebar.classList.add('tab-sidebar-collapsed');
          localStorage.setItem('sidebar_collapsed_' + tabId, '1');
          updateSidebarToggleButton(tabId, true);
        }
      });
    }

    function checkAndSyncBackdrop() {
      // Backdrop removed: main display window is permanently 100% crisp and unblurred
    }

    const tabSidebarTitles = {
      planner: 'Planner Overview',
      timetable: 'Timetable Overview',
      calendar: 'Calendar Overview',
      roster: 'Roster Overview',
      gradebook: 'Gradebook Overview'
    };

    function updateSidebarToggleButton(tabId, isCollapsed) {
      const btn = document.getElementById('btn-toggle-' + tabId + '-sidebar');
      if (!btn) return;
      const title = tabSidebarTitles[tabId] || 'Overview';

      if (btn.setAttribute) btn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
      btn.title = isCollapsed ? 'Show Sidebar' : 'Hide Sidebar';

      if (isCollapsed) {
        btn.classList.add('sidebar-tag-collapsed');
        btn.classList.remove('sidebar-tag-expanded');
        btn.innerHTML = `
          <svg class="w-4 h-4 text-amber-700 transition-transform group-hover:translate-x-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
          <span class="sr-only sidebar-toggle-text">Sidebar</span>
        `;
      } else {
        btn.classList.remove('sidebar-tag-collapsed');
        btn.classList.add('sidebar-tag-expanded');
        btn.innerHTML = `
          <div class="flex items-center justify-center gap-2 w-full min-w-0">
            <svg class="w-4 h-4 text-slate-600 transition-transform group-hover:-translate-x-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
            </svg>
            <span class="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight truncate sidebar-tab-title text-center">${title}</span>
          </div>
          <span class="sr-only sidebar-toggle-text">Hide</span>
        `;
      }
    }

    function initDraggableSidebarWidgets(sidebarId) {
      const sidebar = document.getElementById(sidebarId);
      if (!sidebar) return;
      const widgets = Array.from(sidebar.querySelectorAll(':scope > div[id]'));

      // 1. Restore widget vertical ordering
      const savedOrder = JSON.parse(localStorage.getItem(`widget_order_${sidebarId}`) || '[]');
      if (savedOrder.length > 0) {
        savedOrder.forEach(id => {
          const el = document.getElementById(id);
          if (el && el.parentElement === sidebar) sidebar.appendChild(el);
        });
      }

      // 2. Restore saved user-resized heights
      widgets.forEach(w => {
        const savedHeight = localStorage.getItem(`widget_height_${w.id}`);
        if (savedHeight) {
          w.style.height = savedHeight;
        }
      });

      // 3. Attach drag-reorder and double-click height reset
      widgets.forEach(w => {
        const handle = w.querySelector('.widget-drag-handle') || w.firstElementChild;
        if (handle) {
          handle.classList.add('widget-drag-handle');
          handle.setAttribute('draggable', 'true');
          handle.setAttribute('title', 'Drag to rearrange • Double-click header to reset height');

          // Double-click header to reset custom height back to default
          handle.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            if (w.style.height) {
              w.style.height = '';
              localStorage.removeItem(`widget_height_${w.id}`);
              showToast('Reset widget height to default.');
            }
          });

          handle.addEventListener('dragstart', (e) => {
            if (e.dataTransfer) {
              e.dataTransfer.setData('text/plain', w.id);
              e.dataTransfer.effectAllowed = 'move';
            }
            sidebar.classList.add('is-dragging');
            setTimeout(() => w.classList.add('is-being-dragged'), 0);
          });

          handle.addEventListener('dragend', () => {
            sidebar.classList.remove('is-dragging');
            w.classList.remove('is-being-dragged');
            sidebar.querySelectorAll('.widget-drag-over').forEach(el => el.classList.remove('widget-drag-over'));
            const currentIds = Array.from(sidebar.querySelectorAll(':scope > div[id]')).map(el => el.id);
            localStorage.setItem(`widget_order_${sidebarId}`, JSON.stringify(currentIds));
          });
        }

        w.addEventListener('dragover', (e) => {
          e.preventDefault();
          const draggingEl = sidebar.querySelector('.is-being-dragged');
          if (draggingEl && draggingEl !== w && draggingEl.parentElement === sidebar) {
            const rect = w.getBoundingClientRect();
            const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            const targetNode = next ? w.nextSibling : w;
            if (draggingEl !== targetNode && draggingEl.nextSibling !== targetNode) {
              sidebar.insertBefore(draggingEl, targetNode);
            }
          }
        });
      });
    }

    function initSidebarStates() {
      ['planner', 'timetable', 'calendar', 'roster', 'gradebook'].forEach(tabId => {
        const isCollapsed = localStorage.getItem('sidebar_collapsed_' + tabId) === '1';
        const sidebar = document.getElementById('sidebar-' + tabId);
        if (sidebar) {
          if (isCollapsed) {
            sidebar.classList.add('tab-sidebar-collapsed');
            sidebar.classList.remove('tab-sidebar-expanded');
            updateSidebarToggleButton(tabId, true);
          } else {
            sidebar.classList.remove('tab-sidebar-collapsed', 'hidden');
            sidebar.classList.add('tab-sidebar-expanded');
            updateSidebarToggleButton(tabId, false);
          }
        }
      });

      ['sidebar-planner', 'sidebar-timetable', 'sidebar-calendar', 'sidebar-roster', 'sidebar-gradebook'].forEach(sId => {
        initDraggableSidebarWidgets(sId);
      });

      // Global resize monitor: Save height when user finishes dragging resize grip
      const saveResizedWidgetHeights = () => {
        document.querySelectorAll('.tab-sidebar > div[id]').forEach(w => {
          if (w.style.height) {
            localStorage.setItem(`widget_height_${w.id}`, w.style.height);
          }
        });
      };
      window.addEventListener('pointerup', saveResizedWidgetHeights);
      window.addEventListener('mouseup', saveResizedWidgetHeights);
    }

    function updateTabSidebar(tabId) {
      if (tabId === 'planner') updatePlannerSidebar();
      if (tabId === 'timetable') updateTimetableSidebar();
      if (tabId === 'calendar') updateCalendarSidebar();
      if (tabId === 'roster') updateRosterSidebar();
      if (tabId === 'gradebook') updateGradebookSidebar();
    }

    function updateAllSidebars() {
      updatePlannerSidebar();
      updateTimetableSidebar();
      updateCalendarSidebar();
      updateRosterSidebar();
      updateGradebookSidebar();
    }

    // 1. Planner Sidebar Updates & Navigation
    function jumpToMatrixDate(dateKey, courseCode = '', section = '', isMilestone = false) {
      if (!dateKey) return;
      switchTab('planner');

      // Ensure full semester dates are visible if month filter excluded this date
      const parts = dateKey.split('-');
      const month = parts[1];
      if (selectedMonthFilter !== 'all') {
        const monthFilter = document.getElementById('filter-month');
        if (monthFilter) monthFilter.value = 'all';
        selectedMonthFilter = 'all';
        renderMatrixTable();
      }

      setTimeout(() => {
        const wrapper = document.getElementById('matrix-scroll-wrapper');
        const thead = document.getElementById('matrix-head');
        const theadHeight = (thead && typeof thead.offsetHeight === 'number' && !isNaN(thead.offsetHeight)) ? thead.offsetHeight : 86;

        let targetTop = wrapper ? wrapper.scrollTop : 0;
        let targetLeft = wrapper ? wrapper.scrollLeft : 0;

        // 1. Locate the week containing the navigated date
        let targetEntry = semesterDates.find(d => d.dateKey === dateKey);
        let targetWeekNumber = targetEntry ? targetEntry.weekNumber : null;

        if (targetWeekNumber) {
          currentWeekViewIndex = targetWeekNumber;
          const totalWeeks = semesterDates.length > 0 ? semesterDates[0].totalWeeks : 18;
          const navLabel = document.getElementById('current-week-nav-label');
          if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;
          saveAppState();

          // Display the week starting from Sunday at the top row (do NOT bring navigated date to top row)
          const sundayEntry = semesterDates.find(d => d.weekNumber === targetWeekNumber && d.dayOfWeek === 'Sun') ||
                              semesterDates.find(d => d.weekNumber === targetWeekNumber);
          if (sundayEntry) {
            const sundayRow = document.getElementById('row-' + sundayEntry.dateKey);
            if (sundayRow) {
              targetTop = Math.max(0, sundayRow.offsetTop - theadHeight);
            }
          }
        } else {
          // Fallback if week number not found
          const row = document.getElementById('row-' + dateKey);
          if (row) targetTop = Math.max(0, row.offsetTop - theadHeight);
        }

        // 2. Identify the navigated target cell/card for horizontal scroll calculation
        const targetRow = document.getElementById('row-' + dateKey);
        let targetCell = null;
        let targetCard = null;

        if (courseCode && section) {
          const cellKey = dateKey + '__' + courseCode + '__' + section;
          targetCell = document.getElementById('cell-' + cellKey);
          targetCard = document.getElementById('card-' + cellKey);
        } else if (isMilestone) {
          targetCell = document.getElementById('cell-' + dateKey + '__notes');
          targetCard = document.getElementById('card-' + dateKey + '__notes');
        } else if (targetRow) {
          // If called with only dateKey, look for the first planned activity in this row
          targetCell = targetRow.querySelector('.matrix-cell-slot') || targetRow.querySelector('[id^="cell-"]');
          if (targetCell) {
            targetCard = targetCell.querySelector('[id^="card-"]') || targetCell.querySelector('div');
          }
        }

        if (targetCell && wrapper) {
          const stickyLeftWidth = 204; // 54px Day + 84px Date sticky columns
          const cellLeft = targetCell.offsetLeft;
          const cellWidth = targetCell.offsetWidth;
          const cellRight = cellLeft + cellWidth;

          const viewLeft = wrapper.scrollLeft + stickyLeftWidth;
          const viewRight = wrapper.scrollLeft + wrapper.clientWidth;

          if (cellLeft < viewLeft) {
            targetLeft = Math.max(0, cellLeft - stickyLeftWidth - 12);
          } else if (cellRight > viewRight) {
            targetLeft = cellRight - wrapper.clientWidth + 24;
          }
        }

        // 3. Coordinated scroll on both axes at once
        if (wrapper) {
          wrapper.scrollTo({ top: targetTop, left: targetLeft, behavior: 'smooth' });
        }

        // 4. Clear any lingering flash highlights before triggering a new one
        document.querySelectorAll('.row-flash-highlight').forEach(r => r.classList.remove('row-flash-highlight'));
        document.querySelectorAll('.day-navigated-highlight').forEach(el => el.classList.remove('day-navigated-highlight'));
        document.querySelectorAll('.activity-navigated-highlight').forEach(el => el.classList.remove('activity-navigated-highlight'));

        // 5. Highlight the navigated date & day badge with automatic removal
        if (targetRow) {
          const dayBadge = targetRow.querySelector('.sticky-col-day span');
          if (dayBadge) {
            void dayBadge.offsetWidth;
            dayBadge.classList.add('day-navigated-highlight');
            setTimeout(() => dayBadge.classList.remove('day-navigated-highlight'), 1400);
          }

          const dateCell = targetRow.querySelector('.sticky-col-date');
          if (dateCell) {
            void dateCell.offsetWidth;
            dateCell.classList.add('day-navigated-highlight');
            setTimeout(() => dateCell.classList.remove('day-navigated-highlight'), 1400);
          }

          void targetRow.offsetWidth;
          targetRow.classList.add('row-flash-highlight');
          setTimeout(() => targetRow.classList.remove('row-flash-highlight'), 1600);
        }

        // 6. Highlight activity card / cell and show toast with automatic removal
        if (targetCell) {
          const elToHighlight = targetCard || targetCell;
          void elToHighlight.offsetWidth;
          elToHighlight.classList.add('activity-navigated-highlight');
          setTimeout(() => elToHighlight.classList.remove('activity-navigated-highlight'), 1400);

          const activityDesc = courseCode ? `${courseCode} (${section})` : (isMilestone ? 'Academic Event' : 'Activity');
          showToast(`Navigated to: ${activityDesc} • ${dateKey}`);
        } else if (targetRow) {
          showToast('Navigated to: ' + dateKey);
        } else {
          showToast('Date ' + dateKey + ' not in current view.', '⚠️');
        }
      }, 50);
    }

    window.jumpToMatrixDate = jumpToMatrixDate;

    function updatePlannerSidebar() {
      const actualNow = (typeof window !== 'undefined' && window._overrideCurrentDate)
        ? new Date(window._overrideCurrentDate)
        : new Date();
      const currentHours = actualNow.getHours();
      const currentMinutes = actualNow.getMinutes();
      const currentTotalMinutes = currentHours * 60 + currentMinutes;

      const now = new Date(actualNow.getFullYear(), actualNow.getMonth(), actualNow.getDate());
      const nowYear = now.getFullYear();
      const nowMonth = String(now.getMonth() + 1).padStart(2, '0');
      const nowDay = String(now.getDate()).padStart(2, '0');
      const todayStr = `${nowYear}-${nowMonth}-${nowDay}`;
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      // =========================================================
      // 1. NEXT ACTIVITIES (Matrix Planned Entries + School Calendar Milestones)
      // =========================================================
      const nextActivitiesList = document.getElementById('planner-milestones-list');
      const nextBadge = document.getElementById('planner-next-activities-badge');

      if (nextActivitiesList) {
        const upcomingItems = [];

        // A. Planned activities from Schedule & Activity Matrix
        if (typeof plannerEntries === 'object' && plannerEntries !== null) {
          Object.entries(plannerEntries).forEach(([cellKey, entry]) => {
            if (!entry) return;
            // Requirement: Remove activities/milestones that are completed or cancelled
            if (entry.status === 'Completed' || entry.status === 'Cancelled') return;

            const parts = cellKey.split('__');
            if (parts.length < 3) return;
            const [dateKey, course, section] = parts;

            const topic = (entry.topic || '').trim();
            const activity = (entry.activity || '').trim();
            const type = entry.type || entry.activityType || 'Lecture';

            // Skip entries that are completely blank unless explicitly marked No Class
            if (!topic && !activity && type !== 'No Class') return;

            const dateParts = dateKey.split('-').map(Number);
            let targetDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            if (isNaN(targetDate.getTime())) return;

            const diffDays = Math.round((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            // Only upcoming or today's activities within up to 1 month (30 days) in advance
            if (diffDays < 0 || diffDays > 30) return;

            // Day of week for timetable lookup
            const targetDayName = dayNames[targetDate.getDay()];
            let slot = null;
            if (Array.isArray(weeklyTimetable)) {
              slot = weeklyTimetable.find(t => t.course === course && t.section === section && t.day === targetDayName);
              if (!slot) {
                slot = weeklyTimetable.find(t => t.course === course && t.section === section);
              }
            }

            const startTime = entry.startTime || (slot ? slot.startTime : '');
            const endTime = entry.endTime || (slot ? slot.endTime : '');
            const room = entry.room || (slot ? slot.room : '');

            // Requirement: Consider class time! Remove class once its end time has passed (e.g. remove 9:00-11:30 class at 11:31)
            if (diffDays === 0 && endTime) {
              const endMin = timeToMinutes(endTime);
              if (endMin > 0 && currentTotalMinutes > endMin) {
                return; // Class has already concluded
              }
            }

            upcomingItems.push({
              source: 'matrix',
              dateKey,
              targetDate,
              diffDays,
              course,
              section,
              type,
              startTime,
              endTime,
              room,
              topic: topic || (type === 'No Class' ? 'No Class Scheduled' : (activity || 'Class Session')),
              activity: activity,
              notes: entry.notes || '',
              status: entry.status || 'Planned',
              isSchoolMilestone: false
            });
          });
        }

        // B. School Calendar Milestones & Major University Events
        if (Array.isArray(msuCalendarEvents)) {
          msuCalendarEvents.forEach(evt => {
            if (!evt) return;
            let targetDate = null;
            let dateKey = evt.dateKey || '';

            if (dateKey) {
              const dParts = dateKey.split('-').map(Number);
              targetDate = new Date(dParts[0], dParts[1] - 1, dParts[2]);
            } else if (evt.firstSem || evt.sem1) {
              const text = evt.firstSem || evt.sem1 || '';
              const dateMatch = text.match(/(\w+\s+\d+)/);
              if (dateMatch) {
                const year = semesterConfig.academicYear ? semesterConfig.academicYear.substring(0, 4) : '2026';
                targetDate = new Date(dateMatch[1] + ', ' + year);
                if (!isNaN(targetDate.getTime())) {
                  const mStr = String(targetDate.getMonth() + 1).padStart(2, '0');
                  const dStr = String(targetDate.getDate()).padStart(2, '0');
                  dateKey = `${targetDate.getFullYear()}-${mStr}-${dStr}`;
                }
              }
            }

            if (!targetDate || isNaN(targetDate.getTime())) return;
            targetDate.setHours(0, 0, 0, 0);

            const diffDays = Math.round((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            // Requirement: Remove activities/milestones that are completed (past dates)
            // or farther than 1 month (30 days) in advance
            if (diffDays < 0 || diffDays > 30) return;

            const evtStartTime = evt.startTime || '';
            const evtEndTime = evt.endTime || '';

            // If milestone has an explicit end time today, remove it once passed
            if (diffDays === 0 && evtEndTime) {
              const endMin = timeToMinutes(evtEndTime);
              if (endMin > 0 && currentTotalMinutes > endMin) return;
            }

            // Include university milestones, exams, holidays, and campus events
            const isMilestone = (evt.type === 'milestone' || evt.type === 'exam' || evt.type === 'holiday' || evt.isNoClass);
            if (!isMilestone) return;

            upcomingItems.push({
              source: 'calendar',
              dateKey,
              targetDate,
              diffDays,
              type: evt.type || 'milestone',
              startTime: evtStartTime,
              endTime: evtEndTime,
              topic: evt.activity || evt.title || 'Academic Milestone',
              activity: evt.firstSem || evt.sem1 || dateKey || '',
              isNoClass: !!evt.isNoClass,
              isSchoolMilestone: true
            });
          });
        }

        // Sort upcoming items chronologically by date and startTime
        upcomingItems.sort((a, b) => {
          if (a.dateKey !== b.dateKey) {
            return a.dateKey.localeCompare(b.dateKey);
          }
          // On the same date, order chronologically by startTime
          const aTime = a.startTime ? timeToMinutes(a.startTime) : (a.isSchoolMilestone ? -1 : 9999);
          const bTime = b.startTime ? timeToMinutes(b.startTime) : (b.isSchoolMilestone ? -1 : 9999);
          if (aTime !== bTime) {
            return aTime - bTime;
          }
          // Prioritize School Calendar Milestones first on same date if times are equal
          if (a.isSchoolMilestone && !b.isSchoolMilestone) return -1;
          if (!a.isSchoolMilestone && b.isSchoolMilestone) return 1;
          return (a.course || '').localeCompare(b.course || '');
        });

        // Limit to upcoming 10 items within next 30 days
        const displayList = upcomingItems.slice(0, 10);

        if (nextBadge) {
          nextBadge.textContent = upcomingItems.length + (upcomingItems.length === 1 ? ' Activity' : ' Activities');
          nextBadge.title = 'Activities scheduled in the next 30 days';
        }

        if (displayList.length === 0) {
          nextActivitiesList.innerHTML = `
            <div class="text-slate-400 italic text-[11px] py-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              No activities scheduled in the next 30 days.<br><span class="text-[10px] text-slate-400">Add lessons, quizzes, or exams in the matrix.</span>
            </div>
          `;
        } else {
          nextActivitiesList.innerHTML = displayList.map(item => {
            let daysBadge = '';
            if (item.diffDays === 0) {
              const startMin = item.startTime ? timeToMinutes(item.startTime) : 0;
              const endMin = item.endTime ? timeToMinutes(item.endTime) : 0;
              const isOngoing = startMin > 0 && endMin > 0 && currentTotalMinutes >= startMin && currentTotalMinutes <= endMin;

              if (isOngoing) {
                daysBadge = `<span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-white shadow-2xs shrink-0 animate-pulse">Now</span>`;
              } else {
                daysBadge = `<span class="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0 shadow-2xs">Today</span>`;
              }
            } else if (item.diffDays === 1) {
              daysBadge = `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 shrink-0">Tmrw</span>`;
            } else {
              daysBadge = `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">${item.diffDays}d left</span>`;
            }

            const cursorClass = item.dateKey ? 'cursor-pointer hover:shadow-xs transition' : '';

            // Render School Calendar Milestone with prominent highlight (Gold/Amber theme, Star icon)
            if (item.isSchoolMilestone) {
              const clickAttr = item.dateKey ? `onclick="jumpToMatrixDate('${item.dateKey}', '', '', true)"` : '';
              let milestoneTypeLabel = 'School Milestone';
              let milestoneBg = 'bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 border-2 border-amber-300 ring-1 ring-amber-200/60 shadow-2xs';
              if (item.type === 'exam') {
                milestoneTypeLabel = 'Major Exam Period';
              } else if (item.type === 'holiday' || item.isNoClass) {
                milestoneTypeLabel = 'University Holiday / No Class';
              }

              return `
                <div ${clickAttr} title="${item.dateKey ? 'Click to view event in matrix' : ''}"
                  class="p-2.5 rounded-xl ${milestoneBg} flex items-start justify-between gap-2.5 ${cursorClass}">
                  <div class="min-w-0 flex-1 space-y-1">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 border border-amber-300 flex items-center gap-1 shrink-0">
                        ⭐ ${milestoneTypeLabel}
                      </span>
                      <span class="text-[10px] font-bold text-amber-800 font-mono">${escapeHtml(item.dateKey || item.activity)}</span>
                    </div>
                    <div class="font-bold text-slate-900 text-xs leading-snug break-words">
                      <span>${escapeHtml(item.topic)}</span>
                    </div>
                  </div>
                  <div class="shrink-0 pt-0.5">${daysBadge}</div>
                </div>
              `;
            }

            // Render Planned Matrix Activity
            const clickAttr = item.dateKey ? `onclick="jumpToMatrixDate('${item.dateKey}', '${escapeHtml(item.course || '')}', '${escapeHtml(item.section || '')}')"` : '';
            let typeColor = 'bg-blue-100 text-blue-800 border-blue-200';
            if (item.type === 'Quiz') {
              typeColor = 'bg-purple-100 text-purple-800 border-purple-200';
            } else if (item.type === 'Exam') {
              typeColor = 'bg-rose-100 text-rose-800 border-rose-200';
            } else if (item.type === 'Laboratory') {
              typeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
            } else if (item.type === 'No Class') {
              typeColor = 'bg-rose-100 text-rose-800 border-rose-200';
            }

            const typeBadge = `<span class="text-[9px] font-black px-1.5 py-0.5 rounded ${typeColor} border shrink-0">${escapeHtml(item.type)}</span>`;
            const timeBadge = (item.startTime && item.endTime) ? `
              <span class="text-[10px] text-indigo-700 font-semibold font-mono bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/70 shrink-0 flex items-center gap-0.5" title="Class Schedule">
                <span>🕒</span>
                <span>${formatTime12(item.startTime)} – ${formatTime12(item.endTime)}</span>
              </span>
            ` : '';
            const roomBadge = item.room ? `
              <span class="text-[9px] text-slate-500 font-semibold bg-slate-100 px-1 py-0.5 rounded border border-slate-200 shrink-0" title="Room">
                Rm ${escapeHtml(item.room)}
              </span>
            ` : '';

            return `
              <div ${clickAttr} title="${item.dateKey ? 'Click to jump to ' + item.dateKey + ' in matrix' : ''}"
                class="p-2.5 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-200 flex items-start justify-between gap-2.5 ${cursorClass}">
                <div class="min-w-0 flex-1 space-y-1">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="text-[10px] font-extrabold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      ${escapeHtml(item.course)} (${escapeHtml(item.section)})
                    </span>
                    ${typeBadge}
                    <span class="text-[10px] text-slate-500 font-mono">${escapeHtml(item.dateKey)}</span>
                    ${timeBadge}
                    ${roomBadge}
                  </div>
                  <div class="font-bold text-slate-800 text-xs leading-snug break-words">
                    <span>${escapeHtml(item.topic)}</span>
                  </div>
                  ${item.activity && item.activity !== item.topic ? `<div class="text-[11px] text-slate-500 truncate">${escapeHtml(item.activity)}</div>` : ''}
                </div>
                <div class="shrink-0 pt-0.5">${daysBadge}</div>
              </div>
            `;
          }).join('');
        }
      }

      // =========================================================
      // 2. TEACHING DAYS DISTRIBUTION (Unified Single Source of Truth)
      // =========================================================
      const pacingStats = document.getElementById('planner-pacing-stats');
      const pacingPctBadge = document.getElementById('planner-pacing-pct-badge');

      if (pacingStats && Array.isArray(semesterDates) && semesterDates.length > 0) {
        const stats = calculateTeachingDaysStats();

        if (pacingPctBadge) {
          pacingPctBadge.textContent = stats.termElapsedPct.toFixed(2) + '% Term Elapsed';
        }

        pacingStats.innerHTML = `
          <div class="p-2 bg-slate-50 rounded-lg border border-slate-200">
            <div class="text-sm font-black text-slate-900">${stats.totalTeachingDays}</div>
            <div class="text-[10px] text-slate-500 font-semibold">Teaching Days</div>
          </div>
          <div class="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
            <div class="text-sm font-black text-emerald-800">${stats.heldTeachingDays}</div>
            <div class="text-[10px] text-emerald-600 font-semibold">Held / Conducted</div>
          </div>
          <div class="p-2 bg-rose-50 rounded-lg border border-rose-200">
            <div class="text-sm font-black text-rose-800">${stats.noClassDays}</div>
            <div class="text-[10px] text-rose-600 font-semibold">No Class / Off</div>
          </div>
          <div class="p-2 bg-amber-50 rounded-lg border border-amber-200">
            <div class="text-sm font-black text-amber-900">${stats.remainingDays}</div>
            <div class="text-[10px] text-amber-700 font-semibold">Remaining Days</div>
          </div>
        `;
      }

      const subjectPaceList = document.getElementById('planner-subject-pace-list');
      if (subjectPaceList && courseData && courseData.subjects) {
        const noClassDates = new Set();
        if (Array.isArray(msuCalendarEvents)) {
          msuCalendarEvents.forEach(evt => {
            if (evt && evt.isNoClass && evt.dateKey) noClassDates.add(evt.dateKey);
          });
        }

        let paceItems = [];
        courseData.subjects.forEach(sub => {
          (sub.sections || []).forEach(sec => {
            const secSlots = (weeklyTimetable || []).filter(t => t.course === sub.code && t.section === sec);
            const secDays = secSlots.map(t => t.day);

            let totalMtgs = 0;
            let doneMtgs = 0;

            (semesterDates || []).forEach(d => {
              if (d.isWeekend) return;
              const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
              if (!secDays.includes(fullDay)) return;

              const cellKey = `${d.dateKey}__${sub.code}__${sec}`;
              const entry = plannerEntries ? plannerEntries[cellKey] : null;
              const isSuspended = d.isNoClassDate || noClassDates.has(d.dateKey) ||
                (entry && (entry.type === 'No Class' || entry.status === 'Cancelled'));

              if (isSuspended) return;

              totalMtgs++;

              const slot = secSlots.find(s => s.day === fullDay);
              const endMin = slot && slot.endTime ? timeToMinutes(slot.endTime) : 0;
              const isPastDate = d.dateKey < todayStr;
              const isPastTimeToday = (d.dateKey === todayStr) && (endMin > 0 ? currentTotalMinutes >= endMin : true);
              const isCompleted = (entry && entry.status === 'Completed') || isPastDate || isPastTimeToday;

              if (isCompleted) doneMtgs++;
            });

            const pct = totalMtgs > 0 ? ((doneMtgs / totalMtgs) * 100).toFixed(1) : '0.0';
            paceItems.push({ course: sub.code, sec, doneMtgs, totalMtgs, pct, color: sub.color || 'bg-blue-600' });
          });
        });

        if (paceItems.length === 0) {
          subjectPaceList.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No sections configured.</div>';
        } else {
          subjectPaceList.innerHTML = paceItems.map(it => `
            <div class="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800 text-[11px]">${escapeHtml(it.course)} (${escapeHtml(it.sec)})</span>
                <span class="font-mono text-[10px] font-bold text-indigo-700">${it.doneMtgs} / ${it.totalMtgs} mtgs (${it.pct}%)</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-600 h-full rounded-full transition-all duration-300" style="width: ${it.pct}%"></div>
              </div>
            </div>
          `).join('');
        }
      }
    }



    // 2. Timetable Sidebar Updates & Daily Agenda
    let activeAgendaDay = null;

    function setAgendaDay(day) {
      activeAgendaDay = day;
      updateTimetableSidebar();
    }

    function highlightTimetableClass(course, section, day) {
      switchTab('timetable');
      setTimeout(() => {
        const cardId = 'timetable-card-' + String(course).replace(/\s+/g, '_') + '-' + String(section).replace(/\s+/g, '_') + '-' + day;
        const card = document.getElementById(cardId);
        const wrapper = document.getElementById('timetable-scroll-wrapper');
        const col = document.getElementById('timetable-col-' + day);

        if (wrapper && col) {
          const targetLeft = Math.max(0, col.offsetLeft - 90);
          wrapper.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }

        if (card) {
          card.classList.remove('activity-navigated-highlight');
          void card.offsetWidth;
          card.classList.add('activity-navigated-highlight');
          setTimeout(() => card.classList.remove('activity-navigated-highlight'), 2200);
          showToast('Located ' + course + ' (' + section + ') on ' + day);
        }
      }, 60);
    }

    function updateTimetableSidebar() {
      const loadStats = document.getElementById('timetable-load-stats');
      const loadBadge = document.getElementById('timetable-load-badge');
      const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const now = (typeof window !== 'undefined' && window._overrideCurrentDate) ? new Date(window._overrideCurrentDate) : new Date();
      const currentSystemDay = allDays[now.getDay()];
      const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

      // Contact hours calculation
      let totalMinutes = 0;
      const dayMinutes = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };
      weeklyTimetable.forEach(t => {
        const startM = timeToMinutes(t.startTime);
        const endM = timeToMinutes(t.endTime);
        if (endM > startM) {
          const dur = endM - startM;
          totalMinutes += dur;
          if (dayMinutes[t.day] !== undefined) dayMinutes[t.day] += dur;
        }
      });
      const hours = (totalMinutes / 60).toFixed(1);
      if (loadBadge) loadBadge.innerText = hours + ' Hrs/Wk';

      if (loadStats) {
        loadStats.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="text-slate-600 font-semibold">Weekly Contact Hours:</span>
            <span class="font-bold text-slate-900 text-sm">${hours} hrs / week</span>
          </div>
        `;
      }

      // Next Upcoming Class Countdown Widget
      const nextClassCard = document.getElementById('timetable-next-class-card');
      const nextClassStatus = document.getElementById('timetable-next-class-status');
      if (nextClassCard) {
        const todaySlots = weeklyTimetable.filter(t => t.day === currentSystemDay).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
        const upcomingToday = todaySlots.find(s => timeToMinutes(s.endTime) > currentTotalMinutes);

        if (upcomingToday) {
          const startMin = timeToMinutes(upcomingToday.startTime);
          const isOngoing = currentTotalMinutes >= startMin;
          const diffMin = startMin - currentTotalMinutes;

          // Format countdown into human-readable hours and minutes (e.g., 7h 58m)
          let countdownText = `${diffMin}m`;
          if (diffMin >= 60) {
            const hrs = Math.floor(diffMin / 60);
            const mins = diffMin % 60;
            countdownText = mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
          }

          if (nextClassStatus) {
            nextClassStatus.className = isOngoing 
              ? 'text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500 text-white animate-pulse' 
              : 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300';
            nextClassStatus.innerText = isOngoing ? 'Class In Progress' : `Starts in ${countdownText}`;
          }
          const classroomLink = (typeof getClassroomLink === 'function') ? getClassroomLink(upcomingToday.course, upcomingToday.section) : '';
          nextClassCard.innerHTML = `
            <div id="timetable-upcoming-active-card"
              class="p-2.5 rounded-xl border ${isOngoing ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-900'} space-y-1 cursor-pointer transition hover:border-emerald-400 hover:shadow-sm group"
              title="${classroomLink ? `Open Google Classroom for ${escapeHtml(upcomingToday.course)} ${escapeHtml(upcomingToday.section)} in new tab` : 'No Google Classroom link configured'}">
              <div class="flex items-center justify-between">
                <span class="font-black text-xs flex items-center gap-1.5 min-w-0">
                  <span class="truncate">${escapeHtml(upcomingToday.course)} (${escapeHtml(upcomingToday.section)})</span>
                  <svg class="w-3.5 h-3.5 ${classroomLink ? 'text-emerald-700' : 'text-slate-400'} shrink-0 group-hover:scale-110 transition" viewBox="0 0 24 24" fill="currentColor" title="${classroomLink ? 'Google Classroom Linked' : 'Google Classroom Not Configured'}">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                  </svg>
                </span>
                <span class="font-mono font-bold text-[10px] shrink-0">${formatTime12(upcomingToday.startTime)} - ${formatTime12(upcomingToday.endTime)}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-600">
                <span class="truncate">${escapeHtml(upcomingToday.room || 'TBA')} • ${escapeHtml(upcomingToday.type || 'Lecture')}</span>
                ${classroomLink ? `<span class="text-[10px] font-bold text-emerald-700 group-hover:underline shrink-0 ml-1">Classroom ↗</span>` : ''}
              </div>
            </div>
          `;

          const activeCardEl = document.getElementById('timetable-upcoming-active-card');
          if (activeCardEl) {
            activeCardEl.onclick = () => {
              if (classroomLink) {
                window.open(classroomLink, '_blank');
              } else {
                showToast(`No Google Classroom link configured for ${upcomingToday.course} (${upcomingToday.section}).`, '⚠️');
              }
            };
          }
        } else {
          if (nextClassStatus) {
            nextClassStatus.className = 'text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600';
            nextClassStatus.innerText = 'Done for Today';
          }
          nextClassCard.innerHTML = `<div class="text-slate-400 italic text-[11px] py-2 text-center">No more classes scheduled today.</div>`;
        }
      }

      // Peak Teaching Hours / Daily Distribution Meter
      const distEl = document.getElementById('timetable-daily-distribution');
      if (distEl) {
        const maxDayMin = Math.max(1, ...Object.values(dayMinutes));
        distEl.innerHTML = `
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Daily Distribution:</div>
          ${weekDays.map(d => {
            const mins = dayMinutes[d];
            const dayHrs = (mins / 60).toFixed(1);
            const barPct = Math.round((mins / maxDayMin) * 100);
            return `
              <div class="flex items-center gap-2 text-[10px]">
                <span class="w-7 font-semibold text-slate-600">${d.substring(0, 3)}</span>
                <div class="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div class="h-full rounded-full ${mins > 0 ? 'bg-blue-600' : 'bg-transparent'}" style="width: ${barPct}%"></div>
                </div>
                <span class="font-mono font-bold w-10 text-right text-slate-700">${dayHrs}h</span>
              </div>
            `;
          }).join('')}
        `;
      }

      // Conflict Auditor
      const conflictCont = document.getElementById('timetable-conflicts-container');
      if (conflictCont && weeklyTimetable) {
        const conflicts = [];
        for (let i = 0; i < weeklyTimetable.length; i++) {
          for (let j = i + 1; j < weeklyTimetable.length; j++) {
            const a = weeklyTimetable[i];
            const b = weeklyTimetable[j];
            if (a.day === b.day && a.room && b.room && a.room.trim().toLowerCase() === b.room.trim().toLowerCase()) {
              const aStart = timeToMinutes(a.startTime);
              const aEnd = timeToMinutes(a.endTime);
              const bStart = timeToMinutes(b.startTime);
              const bEnd = timeToMinutes(b.endTime);
              if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
                conflicts.push({ day: a.day, room: a.room, a: a.course + ' (' + a.section + ')', b: b.course + ' (' + b.section + ')' });
              }
            }
          }
        }

        if (conflicts.length === 0) {
          conflictCont.innerHTML = `
            <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-[11px] font-bold">
              <span class="text-emerald-600">✓</span>
              <span>0 Room / Schedule Conflicts Detected</span>
            </div>
          `;
        } else {
          conflictCont.innerHTML = conflicts.map(c => `
            <div class="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-[11px] space-y-1 mb-1.5">
              <div class="font-extrabold text-rose-800">⚠️ Room Conflict: ${escapeHtml(c.room)}</div>
              <div>${c.day}: ${escapeHtml(c.a)} overlaps with ${escapeHtml(c.b)}</div>
            </div>
          `).join('');
        }
      }

      // Today's Agenda & Weekday Picker
      const todayAgenda = document.getElementById('timetable-today-agenda');
      const todayLabel = document.getElementById('timetable-today-day-label');
      const dayPillsCont = document.getElementById('timetable-agenda-day-pills');

      if (todayAgenda && weeklyTimetable) {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentSystemDay = allDays[new Date().getDay()];
        const displayDay = activeAgendaDay || currentSystemDay;

        if (todayLabel) {
          todayLabel.innerText = displayDay + (displayDay === currentSystemDay ? ' (Today)' : '');
        }

        if (dayPillsCont) {
          dayPillsCont.innerHTML = weekDays.map(d => {
            const isSelected = (d === displayDay);
            const isToday = (d === currentSystemDay);
            const shortName = d.substring(0, 3);
            const activeClasses = isSelected ? 'bg-msu-maroon text-white font-black shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium';
            return `
              <button onclick="setAgendaDay('${d}')" 
                class="px-2 py-1 rounded-md transition ${activeClasses} relative" 
                title="View ${d} Schedule">
                ${shortName}
                ${isToday ? '<span class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full"></span>' : ''}
              </button>
            `;
          }).join('');
        }

        const daySlots = weeklyTimetable
          .filter(t => t.day === displayDay)
          .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

        if (daySlots.length === 0) {
          todayAgenda.innerHTML = `<div class="text-slate-400 italic text-[11px] py-3 text-center">No classes scheduled for ${displayDay}.</div>`;
        } else {
          todayAgenda.innerHTML = daySlots.map(s => `
            <div onclick="highlightTimetableClass('${s.course}', '${s.section}', '${s.day}')"
              class="p-2 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 rounded-lg flex items-center justify-between gap-2 text-xs transition cursor-pointer group">
              <div class="min-w-0">
                <div class="font-extrabold text-slate-800 text-[11px] group-hover:text-blue-900 transition">
                  <span>${escapeHtml(s.course)} - ${escapeHtml(s.section)}</span>
                </div>
                <div class="text-[10px] text-slate-500 font-mono">${formatTime12(s.startTime)} - ${formatTime12(s.endTime)} • Rm ${escapeHtml(s.room)}</div>
              </div>
              <div class="shrink-0" onclick="event.stopPropagation()">
                ${getClassroomLink(s.course, s.section) 
                  ? `<a href="${escapeHtml(getClassroomLink(s.course, s.section))}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg flex items-center justify-center transition shadow-2xs group/btn" title="Open Google Classroom for ${escapeHtml(s.course)} (${escapeHtml(s.section)})">
                      <svg class="w-3.5 h-3.5 text-emerald-700 group-hover/btn:scale-110 transition" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </a>`
                  : ''}
              </div>
            </div>
          `).join('');
        }
      }
    }

    // 3. Calendar Sidebar Updates & Navigation
    function jumpToCalendarEvent(idx) {
      switchTab('calendar');
      if (calendarTypeFilter !== 'all') {
        setCalendarTypeFilter('all');
      }
      setTimeout(() => {
        const row = document.getElementById('cal-event-row-' + idx);
        const wrapper = document.getElementById('calendar-scroll-wrapper');
        if (row && wrapper) {
          const thead = wrapper.querySelector('thead');
          const theadHeight = thead ? thead.offsetHeight : 42;
          const targetTop = Math.max(0, row.offsetTop - theadHeight);
          wrapper.scrollTo({ top: targetTop, behavior: 'smooth' });

          row.classList.remove('row-flash-highlight');
          void row.offsetWidth;
          row.classList.add('row-flash-highlight');
          setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
          showToast('Highlighted calendar event #' + (idx + 1));
        } else if (row) {
          row.classList.remove('row-flash-highlight');
          void row.offsetWidth;
          row.classList.add('row-flash-highlight');
          setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
        }
      }, 60);
    }

    function updateCalendarSidebar() {
      // Upcoming Deadlines
      const deadlinesList = document.getElementById('calendar-upcoming-deadlines');
      if (deadlinesList && msuCalendarEvents) {
        const now = (typeof window !== 'undefined' && window._overrideCurrentDate) ? new Date(window._overrideCurrentDate) : new Date();
        now.setHours(0, 0, 0, 0);
        const validDeadlines = msuCalendarEvents.filter(ev => {
          const dStr = ev.dateKey || (ev.firstSem ? parseDateRangeString(ev.firstSem)?.start : '');
          if (!dStr) return false;
          const parts = dStr.split('-').map(Number);
          const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
          const diffDays = Math.round((targetDate - now) / (1000 * 60 * 60 * 24));
          ev._diffDays = diffDays;
          return diffDays >= 0 && diffDays <= 60;
        }).sort((a, b) => a._diffDays - b._diffDays).slice(0, 6);

        if (validDeadlines.length === 0) {
          deadlinesList.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No upcoming events in next 60 days.</div>';
        } else {
          deadlinesList.innerHTML = validDeadlines.map(ev => {
            const originalIdx = msuCalendarEvents.indexOf(ev);
            const title = ev.activity || ev.title || 'University Event';
            const dateStr = ev.firstSem || ev.sem1 || ev.dateKey || '—';
            return `
              <div onclick="jumpToCalendarEvent(${originalIdx >= 0 ? originalIdx : 0})" title="Click to view event in calendar table"
                class="p-2 bg-slate-50 hover:bg-rose-50/70 border border-slate-200 hover:border-rose-300 rounded-lg space-y-0.5 cursor-pointer transition group">
                <div class="font-bold text-slate-800 group-hover:text-rose-900 text-[11px] truncate">
                  <span class="truncate">${escapeHtml(title)}</span>
                </div>
                <div class="text-[10px] text-slate-500 font-mono">${escapeHtml(dateStr)}</div>
              </div>
            `;
          }).join('');
        }
      }

      // Lost Days Impact Analysis
      const lostDaysList = document.getElementById('calendar-lost-days-list');
      if (lostDaysList && courseData && courseData.subjects) {
        const noClassDates = new Set();
        const calEventReasons = {};
        if (Array.isArray(msuCalendarEvents)) {
          msuCalendarEvents.forEach(evt => {
            if (evt && evt.isNoClass && evt.dateKey) {
              noClassDates.add(evt.dateKey);
              if (!calEventReasons[evt.dateKey]) {
                calEventReasons[evt.dateKey] = evt.activity || evt.title || 'Academic Calendar Suspension';
              }
            }
          });
        }

        lostDaysBySection = {};
        let items = [];
        courseData.subjects.forEach(sub => {
          (sub.sections || []).forEach(sec => {
            const secKey = `${sub.code}__${sec}`;
            const secDays = (weeklyTimetable || [])
              .filter(t => t.course === sub.code && t.section === sec)
              .map(t => t.day);

            let totalMeetings = 0;
            let lostCount = 0;
            const lostDetails = [];

            (semesterDates || []).forEach(d => {
              if (d.isWeekend) return;
              const fullDay = FULL_DAY_NAMES[d.dayOfWeek] || d.dayOfWeek;
              if (secDays.includes(fullDay)) {
                totalMeetings++;
                const cellKey = `${d.dateKey}__${sub.code}__${sec}`;
                const entry = plannerEntries ? plannerEntries[cellKey] : null;
                const isSuspended = d.isNoClassDate || noClassDates.has(d.dateKey) ||
                  (entry && (entry.type === 'No Class' || entry.status === 'Cancelled'));

                if (isSuspended) {
                  lostCount++;
                  let reason = '';
                  if (entry && (entry.reason || entry.notes || entry.topic)) {
                    reason = entry.reason || entry.notes || entry.topic;
                  } else if (calEventReasons[d.dateKey]) {
                    reason = calEventReasons[d.dateKey];
                  } else if (d.event && (d.event.activity || d.event.title)) {
                    reason = d.event.activity || d.event.title;
                  } else if (dailyNotes && dailyNotes[d.dateKey]) {
                    reason = dailyNotes[d.dateKey];
                  } else if (entry && entry.type === 'No Class') {
                    reason = 'Class Suspension';
                  } else {
                    reason = 'University Suspension / Holiday';
                  }

                  lostDetails.push({
                    dateKey: d.dateKey,
                    displayDate: d.displayDate || d.dateKey,
                    dayOfWeek: fullDay,
                    reason: reason
                  });
                }
              }
            });

            lostDetails.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
            lostDaysBySection[secKey] = {
              course: sub.code,
              sec: sec,
              lostCount,
              totalMeetings,
              lostDetails
            };

            const pct = totalMeetings > 0 ? ((lostCount / totalMeetings) * 100).toFixed(1) : '0.0';
            items.push({ course: sub.code, sec, lostCount, totalMeetings, pct });
          });
        });

        if (items.length === 0) {
          lostDaysList.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No subjects or sections configured.</div>';
        } else {
          lostDaysList.innerHTML = `
            <div class="space-y-1.5">
              ${items.map(it => `
                <div onclick="openLostDaysModal('${escapeHtml(it.course)}', '${escapeHtml(it.sec)}')"
                  title="Click to view detailed lost teaching dates for ${escapeHtml(it.course)} (${escapeHtml(it.sec)})"
                  class="p-2 ${it.lostCount > 0 ? 'bg-amber-50/70 border-amber-200 hover:bg-amber-100 hover:border-amber-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'} border rounded-lg flex items-center justify-between text-xs cursor-pointer transition group shadow-2xs">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="font-bold text-slate-800 text-[11px] group-hover:text-msu-maroon transition truncate">${escapeHtml(it.course)} - ${escapeHtml(it.sec)}</span>
                  </div>
                  <span class="text-[10px] font-bold ${it.lostCount > 0 ? 'text-amber-900 bg-amber-100' : 'text-slate-600 bg-slate-200'} px-1.5 py-0.5 rounded shrink-0">
                    ${it.lostCount} / ${it.totalMeetings} Days Lost (${it.pct}%)
                  </span>
                </div>
              `).join('')}
            </div>
          `;
        }
      }

      // Event Distribution with Click-to-Filter
      const distCont = document.getElementById('calendar-events-distribution');
      if (distCont && msuCalendarEvents) {
        const counts = { holiday: 0, exam: 0, milestone: 0, activity: 0 };
        msuCalendarEvents.forEach(e => {
          if (counts[e.type] !== undefined) counts[e.type]++;
        });

        const activeFilter = calendarTypeFilter;
        const getRing = (type) => (activeFilter === type ? 'ring-2 ring-slate-800 ring-offset-1 shadow-sm' : '');

        distCont.innerHTML = `
          <button onclick="setCalendarTypeFilter('${activeFilter === 'holiday' ? 'all' : 'holiday'}')" 
            class="p-2 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 text-center transition cursor-pointer ${getRing('holiday')}"
            title="Filter by Holidays">
            <div class="font-black text-rose-800 text-xs">${counts.holiday}</div>
            <div class="text-[10px] text-rose-600 font-semibold">Holidays 🔍</div>
          </button>
          <button onclick="setCalendarTypeFilter('${activeFilter === 'exam' ? 'all' : 'exam'}')" 
            class="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 text-center transition cursor-pointer ${getRing('exam')}"
            title="Filter by Exams">
            <div class="font-black text-amber-900 text-xs">${counts.exam}</div>
            <div class="text-[10px] text-amber-700 font-semibold">Exams 🔍</div>
          </button>
          <button onclick="setCalendarTypeFilter('${activeFilter === 'milestone' ? 'all' : 'milestone'}')" 
            class="p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 text-center transition cursor-pointer ${getRing('milestone')}"
            title="Filter by Milestones">
            <div class="font-black text-emerald-800 text-xs">${counts.milestone}</div>
            <div class="text-[10px] text-emerald-600 font-semibold">Milestones 🔍</div>
          </button>
          <button onclick="setCalendarTypeFilter('${activeFilter === 'activity' ? 'all' : 'activity'}')" 
            class="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-center transition cursor-pointer ${getRing('activity')}"
            title="Filter by Activities">
            <div class="font-black text-blue-900 text-xs">${counts.activity}</div>
            <div class="text-[10px] text-blue-600 font-semibold">Activities 🔍</div>
          </button>
        `;
      }
    }

    let lostDaysBySection = {};

    function openLostDaysModal(course, section) {
      const modal = document.getElementById('lost-days-modal');
      const titleEl = document.getElementById('lost-days-modal-title');
      const listEl = document.getElementById('lost-days-modal-list');
      if (!modal) return;

      const secKey = `${course}__${section}`;
      const data = (lostDaysBySection && lostDaysBySection[secKey]) ? lostDaysBySection[secKey] : null;

      if (titleEl) {
        titleEl.innerText = `${course} (${section}) — Lost Teaching Days Impact`;
      }

      if (listEl) {
        if (!data || !data.lostDetails || data.lostDetails.length === 0) {
          listEl.innerHTML = `
            <div class="text-center py-6 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <div class="text-2xl mb-1">🎉</div>
              <p class="text-xs font-bold text-slate-700">No Teaching Days Lost</p>
              <p class="text-[11px] text-slate-500 mt-0.5">All scheduled class sessions fall on regular instructional days.</p>
            </div>
          `;
        } else {
          listEl.innerHTML = `
            <div class="flex items-center justify-between text-xs px-1 pb-1 text-slate-500 font-medium">
              <span>Impacted Class Sessions: <strong class="text-slate-800">${data.lostCount}</strong> of ${data.totalMeetings}</span>
              <span class="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">${((data.lostCount / (data.totalMeetings || 1)) * 100).toFixed(1)}% Lost</span>
            </div>
            <div class="space-y-1.5">
              ${data.lostDetails.map((item, idx) => `
                <div class="p-2.5 bg-slate-50 hover:bg-amber-50/40 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs transition">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      ${idx + 1}
                    </span>
                    <div class="min-w-0">
                      <div class="font-bold text-slate-900 text-xs">${formatDateKeyToText(item.dateKey)}</div>
                      <div class="text-[11px] text-slate-500 font-medium">${escapeHtml(item.dayOfWeek)} • <span class="font-mono text-[10px] text-slate-400">${item.dateKey}</span></div>
                    </div>
                  </div>
                  <div class="shrink-0 max-w-[50%] text-right">
                    <span class="block w-full px-2 py-1 rounded-md text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 truncate" title="${escapeHtml(item.reason)}">
                      ${escapeHtml(item.reason)}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }
      }

      modal.classList.remove('hidden');
    }

    function closeLostDaysModal() {
      const modal = document.getElementById('lost-days-modal');
      if (modal) modal.classList.add('hidden');
    }

    if (typeof window !== 'undefined') {
      window.openLostDaysModal = openLostDaysModal;
      window.closeLostDaysModal = closeLostDaysModal;
    }

    // 4. Roster Sidebar Updates
    function selectRosterSection(sec) {
      const filter = document.getElementById('roster-section-filter');
      if (filter) {
        let matchedVal = '';
        for (let i = 0; i < filter.options.length; i++) {
          const optVal = filter.options[i].value;
          if (optVal === sec || optVal.endsWith(' - ' + sec) || optVal.includes(sec)) {
            matchedVal = optVal;
            break;
          }
        }
        filter.value = matchedVal;
        filterStudentTable();
      }
    }

    function updateRosterSidebar() {
      const breakdown = document.getElementById('roster-sections-breakdown');
      const totalBadge = document.getElementById('roster-total-students-badge');
      const healthStatus = document.getElementById('roster-health-status');
      if (!breakdown || !studentRoster) return;

      if (totalBadge) totalBadge.innerText = studentRoster.length + ' Total';

      // 1. Only display valid active sections
      const validSections = new Set();
      if (courseData && courseData.subjects) {
        courseData.subjects.forEach(sub => {
          (sub.sections || []).forEach(sec => validSections.add(`${sub.code} - ${sec}`));
        });
      }

      const secCounts = {};
      validSections.forEach(s => { secCounts[s] = 0; });
      studentRoster.forEach(s => {
        if (validSections.has(s.section)) {
          secCounts[s.section] = (secCounts[s.section] || 0) + 1;
        }
      });

      const sections = Array.from(validSections);
      if (sections.length === 0) {
        breakdown.innerHTML = '<div class="text-slate-400 italic text-[11px] py-2 text-center">No active sections.</div>';
      } else {
        const maxCount = sections.reduce((max, sec) => Math.max(max, secCounts[sec] || 0), 0);
        breakdown.innerHTML = sections.map(sec => {
          const count = secCounts[sec] || 0;
          const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
          return `
            <div onclick="selectRosterSection('${escapeHtml(sec)}')" title="Click to filter table by ${escapeHtml(sec)}"
              class="space-y-1 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-slate-800 truncate">${escapeHtml(sec)}</span>
                <span class="text-indigo-700 font-mono text-[11px]">${count}</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-600 h-full rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          `;
        }).join('');
      }

      // 2. Health status: only check duplicate IDs between sections of the same subject
      if (healthStatus) {
        const subjectIdMap = new Map();
        const dupes = [];
        studentRoster.forEach(s => {
          if (!validSections.has(s.section)) return;
          const courseCode = (s.section || '').split(' - ')[0].trim();
          if (!courseCode || !s.id) return;
          const key = `${courseCode}__${s.id}`;
          if (subjectIdMap.has(key)) {
            dupes.push(`${s.id} in ${courseCode} (${subjectIdMap.get(key)} & ${s.section})`);
          } else {
            subjectIdMap.set(key, s.section);
          }
        });

        if (dupes.length === 0) {
          healthStatus.innerHTML = `
            <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
              <span>✓</span>
              <span>Student IDs unique within each subject</span>
            </div>
          `;
        } else {
          healthStatus.innerHTML = `
            <div class="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-[11px]">
              <span class="font-bold">⚠️ Duplicate in Same Subject:</span> ${dupes.join(', ')}
            </div>
          `;
        }
      }
    }

    function dispatchEmail({ to = '', bcc = '', subject = '', body = '' }) {
      const authUser = (semesterConfig && semesterConfig.facultyEmail) ? semesterConfig.facultyEmail.trim() : '';

      if (authUser) {
        const url = new URL('https://mail.google.com/mail/');
        url.searchParams.set('view', 'cm');
        url.searchParams.set('fs', '1');
        url.searchParams.set('authuser', authUser);
        if (to) url.searchParams.set('to', to);
        if (bcc) url.searchParams.set('bcc', bcc);
        if (subject) url.searchParams.set('su', subject);
        if (body) url.searchParams.set('body', body);

        window.open(url.toString(), '_blank', 'noopener,noreferrer');
      } else {
        const params = [];
        if (bcc) params.push(`bcc=${encodeURIComponent(bcc)}`);
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);
        const query = params.length > 0 ? `?${params.join('&')}` : '';

        window.location.href = `mailto:${encodeURIComponent(to)}${query}`;
      }
    }

    function getCurrentlyFilteredRosterEmails() {
      const rows = document.querySelectorAll('#student-table-body tr');
      const emails = [];
      rows.forEach(r => {
        if (r.style.display !== 'none') {
          const email = r.getAttribute('data-email');
          if (email && email.trim()) emails.push(email.trim());
        }
      });
      return emails;
    }

    function sendIndividualStudentEmail(email, section, firstName = '', lastName = '') {
      if (!email) {
        showToast("Student does not have an email address recorded.", "⚠️");
        return;
      }
      const subject = `MSU-GSC Academic Notice: ${section}`;
      dispatchEmail({ to: email, subject });
      const targetAccount = semesterConfig.facultyEmail ? ` via ${semesterConfig.facultyEmail}` : '';
      showToast(`Composing email to ${firstName || email}${targetAccount}...`, '✉️');
    }

    function emailFilteredStudentsBCC() {
      const emails = getCurrentlyFilteredRosterEmails();
      const secFilter = document.getElementById('roster-section-filter')?.value || 'All Sections';
      const gradeFilter = document.getElementById('roster-grade-filter')?.value || 'all';

      if (emails.length === 0) {
        showToast("No students found in current filtered view.", "⚠️");
        return;
      }

      const gradeContext = gradeFilter !== 'all' ? ` [Grade: ${gradeFilter}]` : '';
      const subject = `MSU-GSC Academic Notice: ${secFilter}${gradeContext}`;

      dispatchEmail({ bcc: emails.join(','), subject });
      const targetAccount = semesterConfig.facultyEmail ? ` from ${semesterConfig.facultyEmail}` : '';
      showToast(`Drafting BCC email to ${emails.length} student(s)${targetAccount}.`, '✉️');
    }

    function emailSectionBCC() {
      const filter = document.getElementById('roster-section-filter');
      const selectedSec = filter ? filter.value : '';
      const list = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
      const emails = list.map(s => s.email).filter(Boolean);

      if (emails.length === 0) {
        showToast("No emails found for this section.", "⚠️");
        return;
      }

      const subject = `MSU-GSC Course Announcement: ${selectedSec || 'All Sections'}`;
      dispatchEmail({ bcc: emails.join(','), subject });
      const targetAccount = semesterConfig.facultyEmail ? ` from ${semesterConfig.facultyEmail}` : '';
      showToast(`Drafting announcement to all ${emails.length} students in ${selectedSec || 'all sections'}${targetAccount}.`, '📢');
    }

    function copySectionEmails() {
      const filteredEmails = getCurrentlyFilteredRosterEmails();
      let emails = filteredEmails;

      if (emails.length === 0) {
        const filter = document.getElementById('roster-section-filter');
        const selectedSec = filter ? filter.value : '';
        const list = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
        emails = list.map(s => s.email).filter(Boolean);
      }

      if (emails.length === 0) {
        showToast("No emails found for current selection.", "⚠️");
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(emails.join(', '));
        showToast(`Copied ${emails.length} student email(s)!`, '📋');
      } else {
        showToast(`Found ${emails.length} student email(s).`);
      }
    }

    // 5. Gradebook Sidebar Updates
    function updateGradebookSidebar() {
      const errorsList = document.getElementById('gradebook-errors-list');
      const errorsBadge = document.getElementById('gradebook-errors-badge');
      const atRiskList = document.getElementById('gradebook-atrisk-list');
      const atRiskBadge = document.getElementById('gradebook-atrisk-badge');
      const weightsList = document.getElementById('gradebook-weights-list');
      const weightsBadge = document.getElementById('gradebook-weights-sum-badge');
      const distCont = document.getElementById('gradebook-grade-distribution');

      const secSelect = document.getElementById('gradebook-section-select');
      const selectedSec = secSelect ? secSelect.value : '';
      const config = getGradingConfig(selectedSec);

      // Card 0: Input Error Radar
      if (errorsList && studentRoster) {
        const filteredStudents = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
        const errorEntries = [];

        filteredStudents.forEach(s => {
          config.categories.forEach(cat => {
            (cat.subActivities || []).forEach(sub => {
              const maxScore = (sub.maxScore && sub.maxScore > 0) ? sub.maxScore : 100;
              const rawVal = s.scores ? s.scores[sub.id] : undefined;
              const numVal = parseFloat(rawVal);

              if (!isNaN(numVal) && numVal > maxScore) {
                errorEntries.push({
                  student: s,
                  sub,
                  type: 'over_max',
                  msg: `${sub.name}: Score (${numVal}) exceeds max (${maxScore})`
                });
              } else if (!isNaN(numVal) && numVal < 0) {
                errorEntries.push({
                  student: s,
                  sub,
                  type: 'negative',
                  msg: `${sub.name}: Negative score (${numVal})`
                });
              } else if (rawVal !== undefined && rawVal !== null && rawVal !== '' && isNaN(numVal)) {
                errorEntries.push({
                  student: s,
                  sub,
                  type: 'invalid',
                  msg: `${sub.name}: Non-numeric score entered`
                });
              }
            });
          });
        });

        if (errorsBadge) {
          if (errorEntries.length === 0) {
            errorsBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800';
            errorsBadge.innerText = '0 Errors';
          } else {
            errorsBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300';
            errorsBadge.innerText = `${errorEntries.length} ${errorEntries.length === 1 ? 'Error' : 'Errors'}`;
          }
        }

        if (errorEntries.length === 0) {
          errorsList.innerHTML = '<div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bold">✓ All scores valid and within limits!</div>';
        } else {
          errorsList.innerHTML = errorEntries.map(err => `
            <div onclick="highlightStudentScoreError('${escapeJsString(err.student.id)}', '${escapeJsString(err.sub.id)}', '${escapeJsString(err.student.section)}')"
              class="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg cursor-pointer transition text-xs group"
              title="Click to focus input">
              <div class="font-bold text-slate-900 truncate text-[11px] group-hover:text-rose-900">${escapeHtml(err.student.last)}, ${escapeHtml(err.student.first)}</div>
              <div class="text-[10px] text-rose-700 font-semibold truncate mt-0.5">${escapeHtml(err.msg)}</div>
            </div>
          `).join('');
        }
      }

      // At-Risk Radar
      if (atRiskList && studentRoster) {
        const filteredStudents = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
        const atRisk = [];

        filteredStudents.forEach(s => {
          const res = calculateStudentGrade(s, config, selectedSec);
          const msuNum = parseFloat(res.msu.grade);
          const isFailingGrade = !isNaN(msuNum) && msuNum > 3.00;
          const isNonPassingStatus = res.msu.status !== 'Passed';
          const isSpecialAtRisk = res.msu.grade === '5.00' || res.msu.grade === 'INC';

          if (isFailingGrade || isNonPassingStatus || isSpecialAtRisk) {
            atRisk.push({ student: s, res });
          }
        });

        if (atRiskBadge) {
          if (atRisk.length === 0) {
            atRiskBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800';
            atRiskBadge.innerText = '0 At-Risk';
          } else {
            atRiskBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800';
            atRiskBadge.innerText = atRisk.length + ' At-Risk';
          }
        }

        if (atRisk.length === 0) {
          atRiskList.innerHTML = '<div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-bold">✓ All students currently passing!</div>';
        } else {
          atRiskList.innerHTML = atRisk.map(item => `
            <div onclick="highlightStudentInGradebook('${escapeJsString(item.student.id)}', '${escapeJsString(item.student.section)}')" 
              class="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center justify-between cursor-pointer transition text-xs">
              <div class="min-w-0">
                <div class="font-bold text-slate-900 truncate text-[11px]">${escapeHtml(item.student.last)}, ${escapeHtml(item.student.first)}</div>
                <div class="text-[10px] text-slate-500 font-mono">${escapeHtml(item.student.id)} • ${escapeHtml(item.student.section)}</div>
              </div>
              <div class="text-right shrink-0">
                <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-200 text-rose-900">${item.res.total}%</span>
                <div class="text-[9px] font-bold text-rose-700 mt-0.5">Grade: ${item.res.msu.grade}</div>
              </div>
            </div>
          `).join('');
        }
      }

      // Weights & 100% Validator
      if (weightsList && config && config.categories) {
        const sum = config.categories.reduce((acc, c) => acc + (parseFloat(c.weight) || 0), 0);
        if (weightsBadge) {
          if (Math.abs(sum - 100) < 0.01) {
            weightsBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800';
            weightsBadge.innerText = '100% Valid';
          } else {
            weightsBadge.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800';
            weightsBadge.innerText = sum + '% (Must be 100%)';
          }
        }

        weightsList.innerHTML = config.categories.map(c => `
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-slate-700">${escapeHtml(c.name)}</span>
            <span class="font-mono font-bold text-indigo-700">${c.weight}%</span>
          </div>
        `).join('');
      }

      // Grade Distribution Histogram
      if (distCont && studentRoster) {
        const filteredStudents = studentRoster.filter(s => !selectedSec || s.section === selectedSec);
        const brackets = {
          '1.00 - 1.25': { count: 0, color: 'bg-emerald-600', label: 'Superior' },
          '1.50 - 2.00': { count: 0, color: 'bg-blue-600', label: 'Very Good' },
          '2.25 - 3.00': { count: 0, color: 'bg-amber-500', label: 'Passing' },
          'INC': { count: 0, color: 'bg-slate-400', label: 'Incomplete' },
          '5.00': { count: 0, color: 'bg-rose-600', label: 'Failed' }
        };

        filteredStudents.forEach(s => {
          const res = calculateStudentGrade(s, config, selectedSec);
          const g = parseFloat(res.msu.grade);
          if (isNaN(g)) {
            brackets['INC'].count++;
          } else if (g >= 1.00 && g <= 1.25) {
            brackets['1.00 - 1.25'].count++;
          } else if (g > 1.25 && g <= 2.00) {
            brackets['1.50 - 2.00'].count++;
          } else if (g > 2.00 && g <= 3.00) {
            brackets['2.25 - 3.00'].count++;
          } else {
            brackets['5.00'].count++;
          }
        });

        const totalStudents = Math.max(1, filteredStudents.length);

        distCont.innerHTML = Object.keys(brackets).map(k => {
          const b = brackets[k];
          const pct = Math.round((b.count / totalStudents) * 100);
          return `
            <div class="space-y-0.5">
              <div class="flex justify-between text-[11px]">
                <span class="font-bold text-slate-700">${k} <span class="font-normal text-slate-400 text-[10px]">(${b.label})</span></span>
                <span class="font-mono font-bold text-slate-800">${b.count} (${pct}%)</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div class="${b.color} h-full rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    function highlightStudentInGradebook(studentId, section = null) {
      const secSelect = document.getElementById('gradebook-section-select');
      const activeSec = secSelect ? secSelect.value : '';
      const targetSection = section || activeSec;

      // Lock lookup strictly to the student's exact section to prevent cross-section shifts
      let student = studentRoster.find(s => s.id === studentId && s.section === targetSection);
      if (!student && !section) {
        student = studentRoster.find(s => s.id === studentId);
      }

      let switchedSection = false;
      if (student && secSelect && student.section && secSelect.value !== student.section) {
        secSelect.value = student.section;
        renderGradebook();
        switchedSection = true;
      }
      setTimeout(() => {
        const row = document.getElementById('grade-row-' + studentId) || document.querySelector(`tr[data-student-id="${studentId}"]`);
        const wrapper = document.getElementById('gradebook-scroll-wrapper');
        if (row && wrapper) {
          const thead = document.getElementById('gradebook-table-head');
          const theadHeight = thead ? thead.offsetHeight : 72;
          const targetTop = Math.max(0, row.offsetTop - theadHeight);
          wrapper.scrollTo({ top: targetTop, behavior: 'smooth' });

          row.classList.remove('row-flash-highlight');
          void row.offsetWidth; // trigger reflow
          row.classList.add('row-flash-highlight');
          setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
          showToast('Highlighted: ' + (student ? student.last + ', ' + student.first : studentId));
        } else if (row) {
          row.classList.remove('row-flash-highlight');
          void row.offsetWidth;
          row.classList.add('row-flash-highlight');
          setTimeout(() => row.classList.remove('row-flash-highlight'), 2200);
          showToast('Highlighted: ' + (student ? student.last + ', ' + student.first : studentId));
        } else {
          showToast("Student not in active section view.", "⚠️");
        }
      }, switchedSection ? 100 : 40);
    }

    function highlightStudentScoreError(studentId, subId, section = null) {
      highlightStudentInGradebook(studentId, section);
      setTimeout(() => {
        const targetInput = document.querySelector(`input[data-student="${studentId}"][data-sub="${subId}"]`);
        if (targetInput) {
          targetInput.focus({ preventScroll: true });
          targetInput.select();
          targetInput.classList.remove('input-beacon-pulse');
          void targetInput.offsetWidth;
          targetInput.classList.add('input-beacon-pulse');
          setTimeout(() => targetInput.classList.remove('input-beacon-pulse'), 2500);
        }
      }, 120);
    }

    const GUIDE_STEPS = ['setup', 'courses', 'roster', 'planner', 'gradebook', 'backup'];

    function openUserGuideModal(tabId = 'setup') {
      const modal = document.getElementById('user-guide-modal');
      if (!modal) return;
      switchGuideTab(tabId);
      modal.classList.remove('hidden');
    }

    function closeUserGuideModal() {
      const modal = document.getElementById('user-guide-modal');
      if (modal) modal.classList.add('hidden');
    }

    function switchGuideTab(tabId) {
      const select = document.getElementById('guide-step-select');
      if (select && select.value !== tabId) {
        select.value = tabId;
      }
      GUIDE_STEPS.forEach(t => {
        const panel = document.getElementById('guide-panel-' + t);
        if (panel) {
          if (t === tabId) panel.classList.remove('hidden');
          else panel.classList.add('hidden');
        }
      });
    }

    function navigateGuideStep(direction) {
      const select = document.getElementById('guide-step-select');
      const current = select ? select.value : 'setup';
      const currentIndex = GUIDE_STEPS.indexOf(current);
      const nextIndex = Math.max(0, Math.min(GUIDE_STEPS.length - 1, currentIndex + direction));
      switchGuideTab(GUIDE_STEPS[nextIndex]);
    }

    function toggleGuideMinimize() {
      const content = document.getElementById('user-guide-content-area');
      const btn = document.getElementById('btn-guide-minimize');
      if (!content) return;
      const isMinimized = content.classList.contains('hidden');
      if (isMinimized) {
        content.classList.remove('hidden');
        if (btn) btn.innerText = '–';
      } else {
        content.classList.add('hidden');
        if (btn) btn.innerText = '□';
      }
    }

    // ================= DATA MANAGEMENT & EXPORT / IMPORT CENTER =================
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
            btn.className = 'ei-tab px-3 py-1.5 rounded-lg border border-transparent bg-slate-900 text-white font-bold transition';
          }
          if (panel) panel.classList.remove('hidden');
        } else {
          if (btn) {
            btn.className = 'ei-tab px-3 py-1.5 rounded-lg border border-transparent text-slate-500 hover:bg-slate-100 transition';
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
      a.setAttribute('download', 'MSU_Lesson_Schedule_' + new Date().toISOString().slice(0, 10) + '.csv');
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
      a.setAttribute('download', 'MSU_Lesson_Schedule_' + new Date().toISOString().slice(0, 10) + '.json');
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
              saveAppState();
              renderMatrixTable();
              updateSemesterProgressBar();
              updatePlannerSidebar();
              showToast("Schedule entries restored from JSON!");
            }
          } else {
            // Parse CSV
            const lines = content.split(/\r?\n/).filter(Boolean);
            let importedCount = 0;
            for (let i = 1; i < lines.length; i++) {
              const parts = lines[i].split(',').map(s => s.replace(/^"|"$/g, '').trim());
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
            saveAppState();
            renderMatrixTable();
            updateSemesterProgressBar();
            updatePlannerSidebar();
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
      a.setAttribute('download', 'MSU_Subjects_Timetable_' + new Date().toISOString().slice(0, 10) + '.json');
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
            saveAppState();
            renderMatrixTable();
            renderWeeklyTimetable();
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
      a.setAttribute('download', 'MSU_Student_Roster_' + (selectedSec ? selectedSec.replace(/[^a-zA-Z0-9_-]/g, '_') + '_' : '') + new Date().toISOString().slice(0, 10) + '.csv');
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
            const parts = line.includes('\t') ? line.split('\t') : line.split(',');
            if (parts.length >= 3) {
              const id = parts[0].replace(/^"|"$/g, '').trim();
              const last = parts[1].replace(/^"|"$/g, '').trim();
              const first = parts[2].replace(/^"|"$/g, '').trim();
              const email = parts[3] ? parts[3].replace(/^"|"$/g, '').trim() : (first.toLowerCase() + '.' + last.toLowerCase() + '@msugensan.edu.ph');
              const section = parts[4] ? parts[4].replace(/^"|"$/g, '').trim() : 'Main';

              if (id && last) {
                if (!studentRoster.some(s => s.id === id && s.section === section)) {
                  studentRoster.push({ id, last, first, email, section, scores: {}, qz: 85, lab: 85, p1: 85, p2: 85, fin: 85 });
                  addedCount++;
                }
              }
            }
          }

          saveAppState();
          renderStudentRoster();
          renderGradebook();
          updateRosterSidebar();
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

          const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
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
            const parts = lines[i].split(',').map(s => s.replace(/^"|"$/g, '').trim());
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

          saveAppState();
          renderGradebook();
          updateGradebookSidebar();
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
          if (typeof updatePlannerSidebar === 'function') updatePlannerSidebar();
          if (typeof updateTimetableSidebar === 'function') updateTimetableSidebar();
        }
      }

      updateClock();
      if (typeof setInterval === 'function') {
        setInterval(updateClock, 1000);
      }
    }

    // ================= FACULTY QUICK TIPS & FEATURE HIGHLIGHTS =================
    const FACULTY_TIPS = PORTAL_TIPS;

    let currentTipIndex = 0;

    function renderCurrentTip() {
      const tipsList = (typeof PORTAL_TIPS !== 'undefined' && Array.isArray(PORTAL_TIPS) && PORTAL_TIPS.length > 0)
        ? PORTAL_TIPS
        : (typeof FACULTY_TIPS !== 'undefined' ? FACULTY_TIPS : []);
      if (tipsList.length === 0) return;

      const tip = tipsList[currentTipIndex % tipsList.length];

      const iconBox = document.getElementById('tip-icon-box');
      const badge = document.getElementById('tip-badge');
      const counter = document.getElementById('tip-counter');
      const title = document.getElementById('tip-title');
      const desc = document.getElementById('tip-desc');

      const isDidYouKnow = tip.type === 'Did You Know?';
      if (iconBox) iconBox.textContent = tip.icon || (isDidYouKnow ? '💡' : '📌');
      if (badge) {
        badge.textContent = tip.type || tip.badge || 'Tip';
        if (isDidYouKnow) {
          badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30';
        } else {
          badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-msu-maroon/10 text-msu-maroon border border-msu-maroon/20';
        }
      }
      if (counter) counter.textContent = 'Tip of the Day';
      if (title) title.textContent = tip.title;
      if (desc) desc.innerHTML = tip.content || tip.desc;
    }

    function getActiveTipsCount() {
      return (typeof PORTAL_TIPS !== 'undefined' && Array.isArray(PORTAL_TIPS) && PORTAL_TIPS.length > 0)
        ? PORTAL_TIPS.length
        : 8;
    }

    function nextTip() {
      const total = getActiveTipsCount();
      currentTipIndex = (currentTipIndex + 1) % total;
      renderCurrentTip();
    }

    function prevTip() {
      const total = getActiveTipsCount();
      currentTipIndex = (currentTipIndex - 1 + total) % total;
      renderCurrentTip();
    }

    function goToTip(idx) {
      const total = getActiveTipsCount();
      if (idx >= 0 && idx < total) {
        currentTipIndex = idx;
        renderCurrentTip();
      }
    }

    function openTipsModal(force = false) {
      const modal = document.getElementById('tips-modal');
      if (!modal) return;
      if (force) {
        const checkbox = document.getElementById('tips-hide-today-checkbox');
        if (checkbox) checkbox.checked = false;
      }
      renderCurrentTip();
      modal.classList.remove('hidden');
    }

    function closeTipsModal() {
      const modal = document.getElementById('tips-modal');
      if (modal) modal.classList.add('hidden');

      const checkbox = document.getElementById('tips-hide-today-checkbox');
      if (checkbox && checkbox.checked) {
        const todayStr = new Date().toLocaleDateString('en-CA');
        localStorage.setItem('msu_hide_tips_date', todayStr);
      }
    }

    function checkDailyTipsOnStartup() {
      try {
        const savedDate = localStorage.getItem('msu_hide_tips_date');
        const todayStr = new Date().toLocaleDateString('en-CA');
        if (savedDate === todayStr) {
          return; // Hidden for today
        }

        // Cycle through tips based on day of year
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const dayOfYear = Math.floor((new Date() - startOfYear) / (1000 * 60 * 60 * 24));
        const total = getActiveTipsCount();
        currentTipIndex = Math.abs(dayOfYear) % total;

        // Slight delay so the UI cleanly renders before popup opens
        setTimeout(() => {
          openTipsModal(false);
        }, 600);
      } catch (e) {
        console.warn("Could not check daily tips state:", e);
      }
    }


    // ================= EASTER EGG: SECRET KNOWLEDGE VAULT (ALL 25 TIPS) =================
    let vaultActiveCategory = 'all';
    let vaultSearchTerm = '';

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
    let logoTapCount = 0;
    let logoTapTimer = null;

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
    const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

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
    window.openSecretVault = openEasterEggModal;

    window.onload = function() {
      const hasStoredData = loadAppState();

      // Apply customized or default institution branding immediately
      applyHeaderBranding();

      // Attach Easter Egg trigger to School Logo & Name
      const brandLogo = document.getElementById('header-school-logo');
      const brandName = document.getElementById('header-school-name');
      if (brandLogo) brandLogo.addEventListener('click', handleLogoEasterEggTap);
      if (brandName) brandName.addEventListener('click', handleLogoEasterEggTap);

      // Ensure all students across all subject sections have explicit scores initialized
      if (courseData && courseData.subjects) {
        courseData.subjects.forEach(sub => {
          if (sub.sections) {
            sub.sections.forEach(sec => {
              const secKey = sub.code + ' - ' + sec;
              const cfg = getGradingConfig(secKey);
              studentRoster.filter(s => s.section === secKey || s.section === sec).forEach(s => {
                ensureStudentScores(s, cfg);
              });
            });
          }
        });
      }

      semesterDates = generateSemesterDateList();
      populateMonthFilter();

      // Resolve present week index on startup
      initializeCurrentWeekView();

      renderMatrixTable();
      renderWeeklyTimetable();
      renderAcademicCalendarTable();
      renderStudentRoster();
      renderGradebook();
      updateSemesterProgressBar();
      setupSynchronizedScrollbars();

      initSidebarStates();
      updateAllSidebars();
      initColorPickerListeners();
      initLiveHeaderClock();
      initDarkModeTheme();

      // Auto-scroll matrix to display the present week's starting row
      scrollToPresentWeekOnLoad();

      if (hasStoredData) {
        showToast("Restored your saved course & lesson data!");
      }

      // Check and present Tip of the Day if not hidden for today
      checkDailyTipsOnStartup();
    };

    // ================= PRESENT WEEK INITIALIZATION =================
    function initializeCurrentWeekView() {
      if (!Array.isArray(semesterDates) || semesterDates.length === 0) return;

      const totalWeeks = semesterDates[0].totalWeeks || 18;
      const now = (typeof window !== 'undefined' && window._overrideCurrentDate)
        ? new Date(window._overrideCurrentDate)
        : new Date();

      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const todayKey = `${y}-${m}-${d}`;

      const firstDateKey = semesterDates[0].dateKey;
      const lastDateKey = semesterDates[semesterDates.length - 1].dateKey;

      if (todayKey < firstDateKey) {
        currentWeekViewIndex = 1;
      } else if (todayKey > lastDateKey) {
        currentWeekViewIndex = totalWeeks;
      } else {
        const matched = semesterDates.find(entry => entry.dateKey === todayKey);
        if (matched) {
          currentWeekViewIndex = matched.weekNumber;
        } else {
          const pastEntries = semesterDates.filter(entry => entry.dateKey <= todayKey);
          currentWeekViewIndex = pastEntries.length > 0 ? pastEntries[pastEntries.length - 1].weekNumber : 1;
        }
      }

      const navLabel = document.getElementById('current-week-nav-label');
      if (navLabel) navLabel.innerText = `Week ${currentWeekViewIndex}/${totalWeeks}`;
    }

    function scrollToPresentWeekOnLoad() {
      setTimeout(() => {
        const targetEntry = semesterDates.find(d => d.weekNumber === currentWeekViewIndex && d.dayOfWeek === 'Sun') ||
                            semesterDates.find(d => d.weekNumber === currentWeekViewIndex);
        if (targetEntry) {
          const targetRow = document.getElementById('row-' + targetEntry.dateKey);
          if (targetRow) {
            scrollMatrixToRow(targetRow, 'auto');
          }
        }
      }, 60);
    }

    // ================= DARK MODE THEME SWITCHER =================
    function initDarkModeTheme() {
      const savedTheme = localStorage.getItem('msu_dark_mode') || 'light';
      applyDarkTheme(savedTheme, false);
    }

    function toggleDarkModeTheme() {
      const isDark = document.documentElement.classList.contains('theme-dark');
      const nextTheme = isDark ? 'light' : 'dark';
      applyDarkTheme(nextTheme, true);
    }

    function applyDarkTheme(theme, showNotice = true) {
      const label = document.getElementById('theme-toggle-label');
      const icon = document.getElementById('theme-toggle-icon');
      const sunSvg = '<svg class="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
      const moonSvg = '<svg class="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
      if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark', 'dark');
        localStorage.setItem('msu_dark_mode', 'dark');
        if (label) label.innerText = 'Light Mode';
        if (icon) icon.innerHTML = sunSvg;
        if (showNotice) showToast('Switched to Dark Mode theme!');
      } else {
        document.documentElement.classList.remove('theme-dark', 'dark');
        localStorage.setItem('msu_dark_mode', 'light');
        if (label) label.innerText = 'Dark Mode';
        if (icon) icon.innerHTML = moonSvg;
        if (showNotice) showToast('Switched to Light Mode.');
      }
    }

    // ================= SECURE FEEDBACK & BUG REPORTING =================
    // Set your Google Apps Script Web App URL below to receive reports directly in your inbox.
    // Your email address stays completely private on Google Cloud and is never visible in client code.
    const FEEDBACK_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycby51F25dqIylNIX4R81dxFmrLDqxg2WaKZCfrw4GA2xoheVi6zlI-xE-CulmbIGOGSS/exec";

    function openFeedbackModal() {
      const modal = document.getElementById("feedback-modal");
      if (!modal) return;
      document.getElementById("feedback-title").value = "";
      document.getElementById("feedback-desc").value = "";
      const defaultEmail = (semesterConfig && semesterConfig.facultyEmail) ? semesterConfig.facultyEmail : "";
      const emailInput = document.getElementById("feedback-sender-email");
      if (emailInput) emailInput.value = defaultEmail;
      modal.classList.remove("hidden");
    }

    function closeFeedbackModal() {
      const modal = document.getElementById("feedback-modal");
      if (modal) modal.classList.add("hidden");
    }

    async function submitFeedbackForm(e) {
      if (e) e.preventDefault();
      const title = document.getElementById("feedback-title").value.trim();
      const description = document.getElementById("feedback-desc").value.trim();
      const userEmail = document.getElementById("feedback-sender-email")?.value.trim() || "";
      const typeRadio = document.querySelector('input[name="feedback-type"]:checked');
      const type = typeRadio ? typeRadio.value : "Bug Report";

      if (!title || !description) {
        showToast("Please fill in both the summary and description.", "⚠️");
        return;
      }

      // Determine active tab for context
      const tabs = ["planner", "timetable", "calendar", "roster", "gradebook"];
      const activeTab = tabs.find(t => {
        const el = document.getElementById("tab-content-" + t);
        return el && !el.classList.contains("hidden");
      }) || "planner";

      const payload = {
        type,
        title,
        description,
        userEmail,
        activeTab,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      const submitBtn = document.getElementById("feedback-submit-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Sending...</span>";
      }

      try {
        if (FEEDBACK_ENDPOINT_URL) {
          await fetch(FEEDBACK_ENDPOINT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        }
        closeFeedbackModal();
        showToast(`${type} successfully submitted! Thank you.`, "✓");
      } catch (err) {
        console.error("Feedback dispatch error:", err);
        closeFeedbackModal();
        showToast("Feedback recorded offline.", "ℹ️");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Send Feedback</span><span>✉️</span>";
        }
      }
    }

// ================= TOP HORIZONTAL SCROLLBAR SYNCHRONIZATION =================
function setupDualScrollbar(topWrapperId, bottomWrapperId, trackId) {
  const topEl = document.getElementById(topWrapperId);
  const bottomEl = document.getElementById(bottomWrapperId);
  const trackEl = document.getElementById(trackId);
  if (!topEl || !bottomEl || !trackEl) return;

  function syncTrackWidth() {
    const scrollW = bottomEl.scrollWidth;
    const clientW = bottomEl.clientWidth;
    if (clientW === 0) return; // Tab is hidden

    const maxScroll = Math.max(0, scrollW - clientW);
    const topClientW = topEl.clientWidth || clientW;
    trackEl.style.width = (topClientW + maxScroll) + "px";
    topEl.style.display = maxScroll > 2 ? "block" : "none";
    topEl.scrollLeft = bottomEl.scrollLeft;
  }

  let activeScroller = null;
  topEl.addEventListener("scroll", () => {
    if (activeScroller === "bottom") return;
    activeScroller = "top";
    bottomEl.scrollLeft = topEl.scrollLeft;
    requestAnimationFrame(() => { if (activeScroller === "top") activeScroller = null; });
  }, { passive: true });

  bottomEl.addEventListener("scroll", () => {
    if (activeScroller === "top") return;
    activeScroller = "bottom";
    topEl.scrollLeft = bottomEl.scrollLeft;
    requestAnimationFrame(() => { if (activeScroller === "bottom") activeScroller = null; });
  }, { passive: true });

  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => syncTrackWidth());
    ro.observe(bottomEl);
    if (bottomEl.firstElementChild) ro.observe(bottomEl.firstElementChild);
  }
  window.addEventListener("resize", syncTrackWidth);
  setTimeout(syncTrackWidth, 150);
}

function initAllDualScrollbars() {
  setupDualScrollbar("matrix-top-scroll-wrapper", "matrix-scroll-wrapper", "matrix-top-scroll-track");
  setupDualScrollbar("gradebook-top-scroll-wrapper", "gradebook-scroll-wrapper", "gradebook-top-scroll-track");
  
  const rosterTable = document.getElementById("table-roster") || document.getElementById("roster-table");
  if (rosterTable && rosterTable.parentElement) {
    const parent = rosterTable.parentElement;
    if (!parent.id) parent.id = "roster-scroll-wrapper";
    setupDualScrollbar("roster-top-scroll-wrapper", parent.id, "roster-top-scroll-track");
  } else if (document.getElementById("roster-scroll-wrapper")) {
    setupDualScrollbar("roster-top-scroll-wrapper", "roster-scroll-wrapper", "roster-top-scroll-track");
  }
}

function prevGuideStep() {
  if (typeof navigateGuideStep === 'function') navigateGuideStep(-1);
}

function nextGuideStep() {
  if (typeof navigateGuideStep === 'function') navigateGuideStep(1);
}

// Reset activity list scroll to top on render to avoid chopped cards
function fixNextActivitiesScroll() {
  const list = document.getElementById("planner-milestones-list") || document.getElementById("next-activities-list") || document.querySelector(".next-activities-scroll-area");
  if (list) {
    list.scrollTop = 0;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initAllDualScrollbars();
  fixNextActivitiesScroll();
  setTimeout(checkBackupReminder, 3500);
  setInterval(checkBackupReminder, 30 * 60 * 1000);
});
