/* ===========================================================================
 * CONSTANTS & SEED DATA
 * ---------------------------------------------------------------------------
 * Every frozen value in the app: storage key, colour palettes, section accent
 * cycles, the default MSU grading scale, and the AY 2026-2027 seed dataset.
 * Previously these were scattered across nine places in app.js.
 * ======================================================================== */

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


const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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
