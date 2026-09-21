/* ===========================================================================
 * CONSTANTS & SEED DATA
 * ---------------------------------------------------------------------------
 * Every frozen value in the app: storage key, colour palettes, section accent
 * cycles, the default institutional grading scale, and the AY 2026-2027 seed dataset.
 * Previously these were scattered across nine places in app.js.
 * ======================================================================== */

/* =========================================================
   FACULTY COURSE & LESSON MANAGER - HIGH PERFORMANCE ENGINE
   ========================================================= */

const STORAGE_KEY = 'FACULTY_COURSE_MANAGER_DATA_V2';
const LEGACY_STORAGE_KEY = 'MSU_GSC_COURSE_MANAGER_DATA_V2';

const COLOR_PALETTES = {
  blue: {
    name: 'Blue',
    color: 'bg-blue-50/90 dark:bg-[#0e203c] border-blue-300 dark:border-blue-600 text-blue-950 dark:text-blue-100',
    headerBg: 'bg-blue-600 text-white',
    badgeBg: 'bg-blue-100 dark:bg-[#0f274a] text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-600'
  },
  emerald: {
    name: 'Emerald',
    color: 'bg-emerald-50/90 dark:bg-[#072a1e] border-emerald-300 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100',
    headerBg: 'bg-emerald-700 text-white',
    badgeBg: 'bg-emerald-100 dark:bg-[#063526] text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-600'
  },
  amber: {
    name: 'Amber',
    color: 'bg-amber-50/90 dark:bg-[#2b1803] border-amber-300 dark:border-amber-600 text-amber-950 dark:text-amber-100',
    headerBg: 'bg-amber-600 text-white',
    badgeBg: 'bg-amber-100 dark:bg-[#3b2306] text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-600'
  },
  purple: {
    name: 'Purple',
    color: 'bg-purple-50/90 dark:bg-[#240e3b] border-purple-300 dark:border-purple-600 text-purple-950 dark:text-purple-100',
    headerBg: 'bg-purple-700 text-white',
    badgeBg: 'bg-purple-100 dark:bg-[#2b1245] text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-600'
  },
  teal: {
    name: 'Teal',
    color: 'bg-teal-50/90 dark:bg-[#072a1e] border-teal-300 dark:border-teal-600 text-teal-950 dark:text-teal-100',
    headerBg: 'bg-teal-700 text-white',
    badgeBg: 'bg-teal-100 dark:bg-[#063526] text-teal-800 dark:text-teal-200 border-teal-300 dark:border-teal-600'
  },
  rose: {
    name: 'Rose',
    color: 'bg-rose-50/90 dark:bg-[#2d0e19] border-rose-300 dark:border-rose-600 text-rose-950 dark:text-rose-100',
    headerBg: 'bg-rose-700 text-white',
    badgeBg: 'bg-rose-100 dark:bg-[#3b0d18] text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-600'
  },
  indigo: {
    name: 'Indigo',
    color: 'bg-indigo-50/90 dark:bg-[#0e203c] border-indigo-300 dark:border-indigo-600 text-indigo-950 dark:text-indigo-100',
    headerBg: 'bg-indigo-700 text-white',
    badgeBg: 'bg-indigo-100 dark:bg-[#1f1b4d] text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-600'
  },
  cyan: {
    name: 'Cyan',
    color: 'bg-cyan-50/90 dark:bg-[#0e203c] border-cyan-300 dark:border-cyan-600 text-cyan-950 dark:text-cyan-100',
    headerBg: 'bg-cyan-700 text-white',
    badgeBg: 'bg-cyan-100 dark:bg-[#0f274a] text-cyan-800 dark:text-cyan-200 border-cyan-300 dark:border-cyan-600'
  },
  orange: {
    name: 'Orange',
    color: 'bg-orange-50/90 dark:bg-[#2b1803] border-orange-300 dark:border-orange-600 text-orange-950 dark:text-orange-100',
    headerBg: 'bg-orange-600 text-white',
    badgeBg: 'bg-orange-100 dark:bg-[#431407] text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-600'
  },
  slate: {
    name: 'Slate',
    color: 'bg-slate-100/90 dark:bg-[#141d2b] border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100',
    headerBg: 'bg-slate-700 text-white',
    badgeBg: 'bg-slate-200 dark:bg-[#1e293b] text-slate-800 dark:text-slate-300 border-slate-400 dark:border-slate-600'
  },
  lime: {
    name: 'Lime',
    color: 'bg-lime-50/90 dark:bg-[#072a1e] border-lime-300 dark:border-lime-600 text-lime-950 dark:text-lime-100',
    headerBg: 'bg-lime-700 text-white',
    badgeBg: 'bg-lime-100 dark:bg-[#063526] text-lime-800 dark:text-lime-200 border-lime-300 dark:border-lime-600'
  },
  sky: {
    name: 'Sky',
    color: 'bg-sky-50/90 dark:bg-[#0e203c] border-sky-300 dark:border-sky-600 text-sky-950 dark:text-sky-100',
    headerBg: 'bg-sky-700 text-white',
    badgeBg: 'bg-sky-100 dark:bg-[#0f274a] text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-600'
  },
  pink: {
    name: 'Pink',
    color: 'bg-pink-50/90 dark:bg-[#240e3b] border-pink-300 dark:border-pink-600 text-pink-950 dark:text-pink-100',
    headerBg: 'bg-pink-700 text-white',
    badgeBg: 'bg-pink-100 dark:bg-[#2b1245] text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-600'
  },
  fuchsia: {
    name: 'Fuchsia',
    color: 'bg-fuchsia-50/90 dark:bg-[#240e3b] border-fuchsia-300 dark:border-fuchsia-600 text-fuchsia-950 dark:text-fuchsia-100',
    headerBg: 'bg-fuchsia-700 text-white',
    badgeBg: 'bg-fuchsia-100 dark:bg-[#2b1245] text-fuchsia-800 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-600'
  },
  red: {
    name: 'Red',
    color: 'bg-red-50/90 dark:bg-[#2d0e19] border-red-300 dark:border-red-600 text-red-950 dark:text-red-100',
    headerBg: 'bg-red-700 text-white',
    badgeBg: 'bg-red-100 dark:bg-[#3b0d18] text-red-800 dark:text-red-200 border-red-300 dark:border-red-600'
  },
  maroon: {
    name: 'Maroon',
    color: 'bg-rose-50/90 dark:bg-[#2d0e19] border-rose-300 dark:border-rose-600 text-rose-950 dark:text-rose-100',
    headerBg: 'bg-msu-maroon text-white',
    badgeBg: 'bg-rose-100 dark:bg-[#3b0d18] text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-600'
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

// Default Seed Data for Academic Year 2026-2027
const DEFAULT_DATA = {
  semesterConfig: {
    schoolName: "University Faculty Portal",
    schoolLogo: "",
    title: "1st Semester, Academic Year 2026–2027",
    startDate: "2026-08-10",
    endDate: "2026-12-11",
    facultyEmail: ""
  },
  courseData: {
    classroomLinks: {
      'CVE111__B15.1': 'https://classroom.google.com'
    },
    subjects: [
      {
        code: "CVE111",
        title: "Hydraulics 1",
        units: 4.55,
        colorTheme: "blue",
        color: COLOR_PALETTES.blue.color,
        headerBg: COLOR_PALETTES.blue.headerBg,
        badgeBg: COLOR_PALETTES.blue.badgeBg,
        sections: ["B15.1", "E15", "N15.2"]
      },
      {
        code: "CVE155",
        title: "Mechanics of Deformable Bodies",
        units: 4.00,
        colorTheme: "emerald",
        color: COLOR_PALETTES.emerald.color,
        headerBg: COLOR_PALETTES.emerald.headerBg,
        badgeBg: COLOR_PALETTES.emerald.badgeBg,
        sections: ["I15"]
      },
      {
        code: "CVE169",
        title: "Civil Engineering Refresher Course",
        units: 3.00,
        colorTheme: "amber",
        color: COLOR_PALETTES.amber.color,
        headerBg: COLOR_PALETTES.amber.headerBg,
        badgeBg: COLOR_PALETTES.amber.badgeBg,
        sections: ["R15"]
      }
    ]
  },
  columnWidths: {
    'CVE111__B15.1': 190,
    'CVE111__E15': 190,
    'CVE111__N15.2': 190,
    'CVE155__I15': 190,
    'CVE169__R15': 200
  },
  weeklyTimetable: [
    { course: "CVE111", section: "B15.1", day: "Monday", startTime: "09:00", endTime: "11:30", room: "ELAB-6", type: "Lecture" },
    { course: "CVE111", section: "B15.1", day: "Thursday", startTime: "09:00", endTime: "11:30", room: "ELAB-6", type: "Lecture" },
    { course: "CVE111", section: "E15", day: "Monday", startTime: "13:00", endTime: "15:30", room: "H2-02", type: "Lecture" },
    { course: "CVE111", section: "E15", day: "Thursday", startTime: "13:00", endTime: "15:30", room: "H2-02", type: "Lecture" },
    { course: "CVE111", section: "N15.2", day: "Tuesday", startTime: "14:30", endTime: "17:00", room: "ELAB-6", type: "Lecture" },
    { course: "CVE111", section: "N15.2", day: "Friday", startTime: "14:30", endTime: "17:00", room: "ELAB-6", type: "Lecture" },
    { course: "CVE155", section: "I15", day: "Tuesday", startTime: "08:30", endTime: "10:30", room: "H2-15", type: "Lecture" },
    { course: "CVE155", section: "I15", day: "Friday", startTime: "08:30", endTime: "10:30", room: "H2-15", type: "Lecture" },
    { course: "CVE169", section: "R15", day: "Wednesday", startTime: "09:00", endTime: "12:00", room: "ELAB-3", type: "Lecture" }
  ],
  academicCalendarEvents: [
    { num: 1, activity: "Regular Registration (Freshmen)", firstSem: "July 1 – 31, 2026", secondSem: "—", summer: "—", dateKey: "", isNoClass: false, type: "admin" },
    { num: 2, activity: "First Day of Report to Office of Faculty Members", firstSem: "August 3, 2026", secondSem: "January 4, 2027", summer: "—", dateKey: "2026-08-03", isNoClass: false, type: "admin" },
    { num: 3, activity: "General Faculty Assembly & Planning Conference", firstSem: "August 3, 2026", secondSem: "January 11, 2027", summer: "June 7, 2027", dateKey: "2026-08-03", isNoClass: false, type: "admin" },
    { num: 4, activity: "Regular Registration (Old Students/Returning)", firstSem: "August 3 – 7, 2026", secondSem: "January 11 – 15, 2027", summer: "June 7 – 8, 2027", dateKey: "2026-08-07", isNoClass: false, type: "admin" },
    { num: 5, activity: "START OF CLASSES (Undergraduate Students)", firstSem: "August 10, 2026", secondSem: "January 18, 2027", summer: "June 9, 2027", dateKey: "2026-08-10", isNoClass: false, type: "milestone" },
    { num: 6, activity: "Start of Classes (Graduate Students)", firstSem: "August 17, 2026", secondSem: "January 25, 2027", summer: "—", dateKey: "2026-08-17", isNoClass: false, type: "milestone" },
    { num: 7, activity: "INSTITUTIONAL FOUNDATION DAY (Charter Day)", firstSem: "September 1, 2026", secondSem: "—", summer: "—", dateKey: "2026-09-01", isNoClass: true, type: "holiday" },
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
    "2026-08-10__CVE111__B15.1": {
        "topic": "Course Orientation & Fluid Properties",
        "activity": "Syllabus discussion, mass density & specific gravity",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Provide link to syllabus"
    },
    "2026-08-13__CVE111__B15.1": {
        "topic": "Viscosity & Surface Tension",
        "activity": "Newton's law of viscosity and shear stress derivation",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Seatwork #1 assigned"
    },
    "2026-08-17__CVE111__B15.1": {
        "topic": "Principles of Hydrostatic Pressure",
        "activity": "Pressure variation with depth (dp = -gamma*dz)",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-20__CVE111__B15.1": {
        "topic": "Manometers & Pressure Transducers",
        "activity": "Multi-fluid open & differential U-tube calculations",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #1 due"
    },
    "2026-08-24__CVE111__B15.1": {
        "topic": "Hydrostatic Force on Plane Surfaces",
        "activity": "Center of pressure and centroidal moment of inertia",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-27__CVE111__B15.1": {
        "topic": "Hydrostatic Force on Curved Surfaces",
        "activity": "Resolving horizontal & vertical pressure prisms",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Quiz #1 in ELAB-6"
    },
    "2026-08-31__CVE111__B15.1": {
        "topic": "Buoyancy & Archimedes' Principle",
        "activity": "Submerged volume analysis and draft calculations",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-09-03__CVE111__B15.1": {
        "topic": "Stability of Floating Bodies",
        "activity": "Metacentric height (MG) derivation on barge hulls",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #2 assigned"
    },
    "2026-09-07__CVE111__B15.1": {
        "topic": "Fluid Kinematics & Continuity Equation",
        "activity": "Streamlines, pathlines, and 1D conservation of mass",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Pre-Exam Review"
    },
    "2026-09-10__CVE111__B15.1": {
        "topic": "FIRST PRELIMINARY EXAMINATION",
        "activity": "Major exam on Fluid Properties, Hydrostatics & Buoyancy",
        "type": "Exam",
        "status": "Planned",
        "notes": "Room: ELAB-6 (09:00 - 11:30)"
    },
    "2026-08-10__CVE111__E15": {
        "topic": "Course Orientation & Fluid Properties",
        "activity": "Syllabus discussion, mass density & specific gravity",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Distribute course outline"
    },
    "2026-08-13__CVE111__E15": {
        "topic": "Viscosity & Surface Tension",
        "activity": "Newton's law of viscosity and shear stress derivation",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Seatwork #1 assigned"
    },
    "2026-08-17__CVE111__E15": {
        "topic": "Principles of Hydrostatic Pressure",
        "activity": "Pressure variation with depth (dp = -gamma*dz)",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-20__CVE111__E15": {
        "topic": "Manometers & Pressure Transducers",
        "activity": "Multi-fluid open & differential U-tube calculations",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #1 due"
    },
    "2026-08-24__CVE111__E15": {
        "topic": "Hydrostatic Force on Plane Surfaces",
        "activity": "Center of pressure and centroidal moment of inertia",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-27__CVE111__E15": {
        "topic": "Hydrostatic Force on Curved Surfaces",
        "activity": "Resolving horizontal & vertical pressure prisms",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Quiz #1 in H2-02"
    },
    "2026-08-31__CVE111__E15": {
        "topic": "Buoyancy & Archimedes' Principle",
        "activity": "Submerged volume analysis and draft calculations",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-09-03__CVE111__E15": {
        "topic": "Stability of Floating Bodies",
        "activity": "Metacentric height (MG) derivation on barge hulls",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #2 assigned"
    },
    "2026-09-07__CVE111__E15": {
        "topic": "Fluid Kinematics & Continuity Equation",
        "activity": "Streamlines, pathlines, and 1D conservation of mass",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Pre-Exam Review"
    },
    "2026-09-10__CVE111__E15": {
        "topic": "FIRST PRELIMINARY EXAMINATION",
        "activity": "Major exam on Fluid Properties, Hydrostatics & Buoyancy",
        "type": "Exam",
        "status": "Planned",
        "notes": "Room: H2-02 (13:00 - 15:30)"
    },
    "2026-08-11__CVE111__N15.2": {
        "topic": "Course Orientation & Fluid Properties",
        "activity": "Syllabus discussion, mass density & specific gravity",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Provide link to syllabus"
    },
    "2026-08-14__CVE111__N15.2": {
        "topic": "Viscosity & Surface Tension",
        "activity": "Newton's law of viscosity and shear stress derivation",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Seatwork #1 assigned"
    },
    "2026-08-18__CVE111__N15.2": {
        "topic": "Principles of Hydrostatic Pressure",
        "activity": "Pressure variation with depth (dp = -gamma*dz)",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-21__CVE111__N15.2": {
        "topic": "Manometers & Pressure Transducers",
        "activity": "Multi-fluid open & differential U-tube calculations",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #1 due"
    },
    "2026-08-25__CVE111__N15.2": {
        "topic": "Hydrostatic Force on Plane Surfaces",
        "activity": "Center of pressure and centroidal moment of inertia",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-28__CVE111__N15.2": {
        "topic": "Hydrostatic Force on Curved Surfaces",
        "activity": "Resolving horizontal & vertical pressure prisms",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Quiz #1 in ELAB-6"
    },
    "2026-09-01__CVE111__N15.2": {
        "topic": "INSTITUTIONAL FOUNDATION DAY (No Classes)",
        "activity": "University Charter Day Celebrations",
        "type": "Activity",
        "status": "Suspended",
        "notes": "Campus holiday"
    },
    "2026-09-04__CVE111__N15.2": {
        "topic": "Buoyancy & Archimedes' Principle",
        "activity": "Submerged volume analysis and draft calculations",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #2 assigned"
    },
    "2026-09-08__CVE111__N15.2": {
        "topic": "Stability of Floating Bodies & Fluid Kinematics",
        "activity": "Metacentric height (MG) & continuity equation",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Pre-Exam Review"
    },
    "2026-09-11__CVE111__N15.2": {
        "topic": "FIRST PRELIMINARY EXAMINATION",
        "activity": "Major exam on Fluid Properties, Hydrostatics & Buoyancy",
        "type": "Exam",
        "status": "Planned",
        "notes": "Room: ELAB-6 (14:30 - 17:00)"
    },
    "2026-08-11__CVE155__I15": {
        "topic": "Course Introduction & Review of Statics",
        "activity": "Internal forces and method of sections review",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Prerequisite diagnostic"
    },
    "2026-08-14__CVE155__I15": {
        "topic": "Concept of Normal & Direct Shear Stress",
        "activity": "Axial bar stresses and bolted shear connection calculations",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Seatwork #1 assigned"
    },
    "2026-08-18__CVE155__I15": {
        "topic": "Bearing Stress & Thin-Walled Vessels",
        "activity": "Bearing contact area and cylindrical hoop stresses",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-21__CVE155__I15": {
        "topic": "Concept of Normal Strain & Hooke's Law",
        "activity": "Stress-strain diagrams, elastic modulus, Poisson's ratio",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #1 due"
    },
    "2026-08-25__CVE155__I15": {
        "topic": "Axial Elongation & Statically Indeterminate Bars",
        "activity": "Deformation formulas (delta = PL/AE) and compatibility",
        "type": "Lecture",
        "status": "Planned",
        "notes": ""
    },
    "2026-08-28__CVE155__I15": {
        "topic": "Thermal Stresses & Temperature Changes",
        "activity": "Restrained bar expansions and induced thermal stress",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Quiz #1 in H2-15"
    },
    "2026-09-01__CVE155__I15": {
        "topic": "INSTITUTIONAL FOUNDATION DAY (No Classes)",
        "activity": "University Charter Day Celebrations",
        "type": "Activity",
        "status": "Suspended",
        "notes": "Campus holiday"
    },
    "2026-09-04__CVE155__I15": {
        "topic": "Torsion of Circular Shafts & Torque Diagram",
        "activity": "Derivation of torsion formula (tau = Tr/J)",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set #2 assigned"
    },
    "2026-09-08__CVE155__I15": {
        "topic": "Angle of Twist & Power Transmission",
        "activity": "Shaft rotation formulas and horsepower design problems",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Pre-Exam Review"
    },
    "2026-09-11__CVE155__I15": {
        "topic": "FIRST PRELIMINARY EXAMINATION",
        "activity": "Major exam on Stress, Strain, Axial Members & Torsion",
        "type": "Exam",
        "status": "Planned",
        "notes": "Room: H2-15 (08:30 - 10:30)"
    },
    "2026-08-12__CVE169__R15": {
        "topic": "Orientation & CE Board Exam Mechanics",
        "activity": "Diagnostic exam on Mathematics & Surveying",
        "type": "Lecture",
        "status": "Completed",
        "notes": "Board syllabus review"
    },
    "2026-08-19__CVE169__R15": {
        "topic": "Refresher Module 1: Structural Engineering & Mechanics",
        "activity": "Forces, moments, and statically determinate truss analysis",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Problem Set 1 (15 items)"
    },
    "2026-08-26__CVE169__R15": {
        "topic": "Refresher Module 2: Geotechnical Engineering Review",
        "activity": "Soil phase relationships, compaction, and classification",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Timed Quiz #1 (1 hr)"
    },
    "2026-09-02__CVE169__R15": {
        "topic": "Refresher Module 3: Hydraulics & Water Resources Review",
        "activity": "Hydrostatic forces, buoyancy, and Bernoulli theorem review",
        "type": "Lecture",
        "status": "Planned",
        "notes": "Board problems compilation"
    },
    "2026-09-09__CVE169__R15": {
        "topic": "FIRST PRELIMINARY DIAGNOSTIC EXAM",
        "activity": "Timed 50-item simulated board exam covering Modules 1 to 3",
        "type": "Exam",
        "status": "Planned",
        "notes": "Venue: ELAB-3 (09:00 - 12:00)"
    }
},
  studentRoster: [
    {
        "id": "2023-0101",
        "last": "Alvarez",
        "first": "Marco",
        "email": "marco.alvarez@university.edu",
        "section": "CVE111 - E15",
        "qz": 92,
        "lab": 90,
        "p1": 94,
        "p2": 91,
        "fin": 93
    },
    {
        "id": "2023-0102",
        "last": "Bernardo",
        "first": "Camille",
        "email": "camille.bernardo@university.edu",
        "section": "CVE111 - E15",
        "qz": 88,
        "lab": 85,
        "p1": 89,
        "p2": 87,
        "fin": 88
    },
    {
        "id": "2023-0103",
        "last": "Castillo",
        "first": "Danilo",
        "email": "danilo.castillo@university.edu",
        "section": "CVE111 - E15",
        "qz": 76,
        "lab": 78,
        "p1": 74,
        "p2": 78,
        "fin": 79
    },
    {
        "id": "2023-0104",
        "last": "De Leon",
        "first": "Elena",
        "email": "elena.deleon@university.edu",
        "section": "CVE111 - E15",
        "qz": 95,
        "lab": 94,
        "p1": 96,
        "p2": 95,
        "fin": 96
    },
    {
        "id": "2023-0105",
        "last": "Espino",
        "first": "Gabriel",
        "email": "gabriel.espino@university.edu",
        "section": "CVE111 - E15",
        "qz": 82,
        "lab": 84,
        "p1": 80,
        "p2": 83,
        "fin": 85
    },
    {
        "id": "2023-0106",
        "last": "Flores",
        "first": "Hannah",
        "email": "hannah.flores@university.edu",
        "section": "CVE111 - E15",
        "qz": 90,
        "lab": 89,
        "p1": 92,
        "p2": 90,
        "fin": 91
    },
    {
        "id": "2023-0107",
        "last": "Garcia",
        "first": "Ian",
        "email": "ian.garcia@university.edu",
        "section": "CVE111 - E15",
        "qz": 68,
        "lab": 72,
        "p1": 65,
        "p2": 70,
        "fin": 72
    },
    {
        "id": "2023-0108",
        "last": "Hernandez",
        "first": "Jasmine",
        "email": "jasmine.hernandez@university.edu",
        "section": "CVE111 - E15",
        "qz": 84,
        "lab": 86,
        "p1": 85,
        "p2": 84,
        "fin": 86
    },
    {
        "id": "2023-0109",
        "last": "Ilagan",
        "first": "Kevin",
        "email": "kevin.ilagan@university.edu",
        "section": "CVE111 - E15",
        "qz": 79,
        "lab": 81,
        "p1": 78,
        "p2": 80,
        "fin": 82
    },
    {
        "id": "2023-0110",
        "last": "Jimenez",
        "first": "Lara",
        "email": "lara.jimenez@university.edu",
        "section": "CVE111 - E15",
        "qz": 94,
        "lab": 92,
        "p1": 95,
        "p2": 93,
        "fin": 94
    },
    {
        "id": "2023-0201",
        "last": "Aquino",
        "first": "Rafael",
        "email": "rafael.aquino@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 91,
        "lab": 89,
        "p1": 92,
        "p2": 90,
        "fin": 91
    },
    {
        "id": "2023-0202",
        "last": "Bautista",
        "first": "Bianca",
        "email": "bianca.bautista@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 85,
        "lab": 88,
        "p1": 86,
        "p2": 84,
        "fin": 87
    },
    {
        "id": "2023-0203",
        "last": "Cruz",
        "first": "Christian",
        "email": "christian.cruz@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 73,
        "lab": 75,
        "p1": 70,
        "p2": 74,
        "fin": 76
    },
    {
        "id": "2023-0204",
        "last": "Domingo",
        "first": "Diane",
        "email": "diane.domingo@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 96,
        "lab": 95,
        "p1": 97,
        "p2": 96,
        "fin": 97
    },
    {
        "id": "2023-0205",
        "last": "Estrella",
        "first": "Edward",
        "email": "edward.estrella@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 80,
        "lab": 82,
        "p1": 81,
        "p2": 83,
        "fin": 84
    },
    {
        "id": "2023-0206",
        "last": "Francisco",
        "first": "Faith",
        "email": "faith.francisco@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 87,
        "lab": 86,
        "p1": 88,
        "p2": 89,
        "fin": 88
    },
    {
        "id": "2023-0207",
        "last": "Gomez",
        "first": "Gerald",
        "email": "gerald.gomez@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 62,
        "lab": 65,
        "p1": 60,
        "p2": 64,
        "fin": 66
    },
    {
        "id": "2023-0208",
        "last": "Hilario",
        "first": "Hazel",
        "email": "hazel.hilario@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 89,
        "lab": 91,
        "p1": 90,
        "p2": 88,
        "fin": 90
    },
    {
        "id": "2023-0209",
        "last": "Ignacio",
        "first": "Ivan",
        "email": "ivan.ignacio@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 83,
        "lab": 80,
        "p1": 82,
        "p2": 85,
        "fin": 84
    },
    {
        "id": "2023-0210",
        "last": "Javier",
        "first": "Joy",
        "email": "joy.javier@university.edu",
        "section": "CVE111 - B15.1",
        "qz": 93,
        "lab": 94,
        "p1": 95,
        "p2": 92,
        "fin": 94
    },
    {
        "id": "2023-0301",
        "last": "Lacsamana",
        "first": "Adrian",
        "email": "adrian.lacsamana@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 89,
        "lab": 87,
        "p1": 90,
        "p2": 88,
        "fin": 90
    },
    {
        "id": "2023-0302",
        "last": "Magno",
        "first": "Bea",
        "email": "bea.magno@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 84,
        "lab": 86,
        "p1": 85,
        "p2": 83,
        "fin": 85
    },
    {
        "id": "2023-0303",
        "last": "Navarro",
        "first": "Carlo",
        "email": "carlo.navarro@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 78,
        "lab": 80,
        "p1": 76,
        "p2": 79,
        "fin": 81
    },
    {
        "id": "2023-0304",
        "last": "Ocampo",
        "first": "Denise",
        "email": "denise.ocampo@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 93,
        "lab": 91,
        "p1": 94,
        "p2": 92,
        "fin": 93
    },
    {
        "id": "2023-0305",
        "last": "Pascual",
        "first": "Enrico",
        "email": "enrico.pascual@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 81,
        "lab": 83,
        "p1": 82,
        "p2": 80,
        "fin": 82
    },
    {
        "id": "2023-0306",
        "last": "Quizon",
        "first": "Faye",
        "email": "faye.quizon@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 86,
        "lab": 85,
        "p1": 87,
        "p2": 88,
        "fin": 87
    },
    {
        "id": "2023-0307",
        "last": "Ramos",
        "first": "Glenn",
        "email": "glenn.ramos@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 69,
        "lab": 71,
        "p1": 68,
        "p2": 70,
        "fin": 73
    },
    {
        "id": "2023-0308",
        "last": "Salazar",
        "first": "Hannah",
        "email": "hannah.salazar@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 90,
        "lab": 92,
        "p1": 91,
        "p2": 89,
        "fin": 91
    },
    {
        "id": "2023-0309",
        "last": "Tolentino",
        "first": "Isaac",
        "email": "isaac.tolentino@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 82,
        "lab": 84,
        "p1": 83,
        "p2": 81,
        "fin": 83
    },
    {
        "id": "2023-0310",
        "last": "Umali",
        "first": "Janine",
        "email": "janine.umali@university.edu",
        "section": "CVE111 - N15.2",
        "qz": 95,
        "lab": 96,
        "p1": 97,
        "p2": 94,
        "fin": 96
    },
    {
        "id": "2023-0401",
        "last": "Valdez",
        "first": "Aaron",
        "email": "aaron.valdez@university.edu",
        "section": "CVE155 - I15",
        "qz": 90,
        "lab": 92,
        "p1": 91,
        "p2": 89,
        "fin": 92
    },
    {
        "id": "2023-0402",
        "last": "Villanueva",
        "first": "Brenda",
        "email": "brenda.villanueva@university.edu",
        "section": "CVE155 - I15",
        "qz": 86,
        "lab": 88,
        "p1": 87,
        "p2": 85,
        "fin": 87
    },
    {
        "id": "2023-0403",
        "last": "Yambao",
        "first": "Cedric",
        "email": "cedric.yambao@university.edu",
        "section": "CVE155 - I15",
        "qz": 75,
        "lab": 77,
        "p1": 72,
        "p2": 76,
        "fin": 78
    },
    {
        "id": "2023-0404",
        "last": "Zamora",
        "first": "Dianne",
        "email": "dianne.zamora@university.edu",
        "section": "CVE155 - I15",
        "qz": 94,
        "lab": 95,
        "p1": 96,
        "p2": 93,
        "fin": 95
    },
    {
        "id": "2023-0405",
        "last": "Abad",
        "first": "Ezekiel",
        "email": "ezekiel.abad@university.edu",
        "section": "CVE155 - I15",
        "qz": 83,
        "lab": 81,
        "p1": 84,
        "p2": 82,
        "fin": 84
    },
    {
        "id": "2023-0406",
        "last": "Beltran",
        "first": "Franchesca",
        "email": "franchesca.beltran@university.edu",
        "section": "CVE155 - I15",
        "qz": 88,
        "lab": 89,
        "p1": 90,
        "p2": 87,
        "fin": 89
    },
    {
        "id": "2023-0407",
        "last": "Corpuz",
        "first": "Gian",
        "email": "gian.corpuz@university.edu",
        "section": "CVE155 - I15",
        "qz": 65,
        "lab": 68,
        "p1": 63,
        "p2": 66,
        "fin": 69
    },
    {
        "id": "2023-0408",
        "last": "David",
        "first": "Hazel",
        "email": "hazel.david@university.edu",
        "section": "CVE155 - I15",
        "qz": 91,
        "lab": 93,
        "p1": 92,
        "p2": 90,
        "fin": 92
    },
    {
        "id": "2023-0409",
        "last": "Enriquez",
        "first": "Ian",
        "email": "ian.enriquez@university.edu",
        "section": "CVE155 - I15",
        "qz": 80,
        "lab": 82,
        "p1": 81,
        "p2": 83,
        "fin": 83
    },
    {
        "id": "2023-0410",
        "last": "Fuentes",
        "first": "Joyce",
        "email": "joyce.fuentes@university.edu",
        "section": "CVE155 - I15",
        "qz": 96,
        "lab": 94,
        "p1": 97,
        "p2": 95,
        "fin": 96
    },
    {
        "id": "2022-0501",
        "last": "Guevarra",
        "first": "Alvin",
        "email": "alvin.guevarra@university.edu",
        "section": "CVE169 - R15",
        "qz": 88,
        "lab": 90,
        "p1": 89,
        "p2": 87,
        "fin": 90
    },
    {
        "id": "2022-0502",
        "last": "Hilario",
        "first": "Bernadette",
        "email": "bernadette.hilario@university.edu",
        "section": "CVE169 - R15",
        "qz": 85,
        "lab": 87,
        "p1": 86,
        "p2": 84,
        "fin": 86
    },
    {
        "id": "2022-0503",
        "last": "Inocencio",
        "first": "Crispin",
        "email": "crispin.inocencio@university.edu",
        "section": "CVE169 - R15",
        "qz": 77,
        "lab": 79,
        "p1": 75,
        "p2": 78,
        "fin": 80
    },
    {
        "id": "2022-0504",
        "last": "Jacinto",
        "first": "Danica",
        "email": "danica.jacinto@university.edu",
        "section": "CVE169 - R15",
        "qz": 95,
        "lab": 96,
        "p1": 97,
        "p2": 94,
        "fin": 96
    },
    {
        "id": "2022-0505",
        "last": "Katigbak",
        "first": "Emil",
        "email": "emil.katigbak@university.edu",
        "section": "CVE169 - R15",
        "qz": 82,
        "lab": 84,
        "p1": 83,
        "p2": 81,
        "fin": 83
    },
    {
        "id": "2022-0506",
        "last": "Laurel",
        "first": "Florence",
        "email": "florence.laurel@university.edu",
        "section": "CVE169 - R15",
        "qz": 89,
        "lab": 91,
        "p1": 90,
        "p2": 88,
        "fin": 90
    },
    {
        "id": "2022-0507",
        "last": "Mendoza",
        "first": "Gilbert",
        "email": "gilbert.mendoza@university.edu",
        "section": "CVE169 - R15",
        "qz": 71,
        "lab": 73,
        "p1": 69,
        "p2": 72,
        "fin": 74
    },
    {
        "id": "2022-0508",
        "last": "Nolasco",
        "first": "Hazel",
        "email": "hazel.nolasco@university.edu",
        "section": "CVE169 - R15",
        "qz": 92,
        "lab": 93,
        "p1": 94,
        "p2": 91,
        "fin": 93
    },
    {
        "id": "2022-0509",
        "last": "Ortega",
        "first": "Ivan",
        "email": "ivan.ortega@university.edu",
        "section": "CVE169 - R15",
        "qz": 84,
        "lab": 86,
        "p1": 85,
        "p2": 83,
        "fin": 85
    },
    {
        "id": "2022-0510",
        "last": "Pineda",
        "first": "Jocelyn",
        "email": "jocelyn.pineda@university.edu",
        "section": "CVE169 - R15",
        "qz": 93,
        "lab": 95,
        "p1": 96,
        "p2": 92,
        "fin": 95
    }
],
  dailyNotes: {}
};

// Legacy backward-compatibility alias
DEFAULT_DATA.msuCalendarEvents = DEFAULT_DATA.academicCalendarEvents;

// Active Application State


const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const DEFAULT_GRADING_SCALE = [
  { grade: "1.00", min: 95.56, desc: "Excellent", class: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-[#063526] border-emerald-300 dark:border-emerald-600 font-black", status: "Passed" },
  { grade: "1.25", min: 91.11, desc: "Very Good", class: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-[#063526] border-emerald-300 dark:border-emerald-600 font-bold", status: "Passed" },
  { grade: "1.50", min: 86.67, desc: "Very Good", class: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-[#063526] border-emerald-300 dark:border-emerald-600 font-bold", status: "Passed" },
  { grade: "1.75", min: 82.22, desc: "Good", class: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-[#063526] border-emerald-300 dark:border-emerald-600 font-bold", status: "Passed" },
  { grade: "2.00", min: 77.78, desc: "Good", class: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#0f274a] border-blue-300 dark:border-blue-600 font-bold", status: "Passed" },
  { grade: "2.25", min: 73.33, desc: "Satisfactory", class: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#0f274a] border-blue-300 dark:border-blue-600 font-bold", status: "Passed" },
  { grade: "2.50", min: 68.89, desc: "Satisfactory", class: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-[#0f274a] border-blue-300 dark:border-blue-600 font-bold", status: "Passed" },
  { grade: "2.75", min: 64.44, desc: "Fair", class: "text-amber-700 dark:text-amber-200 bg-amber-50 dark:bg-[#3b2306] border-amber-300 dark:border-amber-600 font-bold", status: "Passed" },
  { grade: "3.00", min: 60.00, desc: "Pass", class: "text-amber-700 dark:text-amber-200 bg-amber-50 dark:bg-[#3b2306] border-amber-300 dark:border-amber-600 font-bold", status: "Passed" },
  { grade: "INC", min: 30.00, desc: "Incomplete", class: "text-orange-700 dark:text-orange-200 bg-orange-100 dark:bg-[#431407] border-orange-300 dark:border-orange-600 font-black", status: "Incomplete" },
  { grade: "5.00", min: 0.00, desc: "Failed", class: "text-rose-800 dark:text-rose-200 bg-rose-100 dark:bg-[#3b0d18] border-rose-300 dark:border-rose-600 font-black", status: "Failed" }
];

const DEFAULT_MSU_SCALE = DEFAULT_GRADING_SCALE; // Backward compatibility alias

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

const tabSidebarTitles = {
  planner: 'Planner Overview',
  timetable: 'Timetable Overview',
  calendar: 'Calendar Overview',
  roster: 'Roster Overview',
  gradebook: 'Gradebook Overview'
};

const GUIDE_STEPS = ['setup', 'courses', 'roster', 'planner', 'gradebook', 'backup'];

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];


const BACKUP_REMINDER_DAYS = 7;
const BACKUP_REMINDER_MS = BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000;
