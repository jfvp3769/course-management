/* ===========================================================================
 * MUTABLE APPLICATION STATE
 * ---------------------------------------------------------------------------
 * The ~45 module-level `let` bindings that were previously declared wherever
 * they happened to be first used. Collecting them here makes it possible to see
 * the full mutable surface of the app in one screen.
 *
 * These stay as globals on purpose: the HTML uses inline on* handlers, so the
 * functions that read them must remain in global scope.
 * ======================================================================== */

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

// High Performance Smooth Drag-Resizing via Colgroup, Th & Table Cells
let activeResizeColKey = null;
let resizeStartX = 0;
let resizeStartWidth = 0;
let minResizeWidth = 60;

let calendarTypeFilter = 'all';

let tempUploadedLogo = undefined;

// Undo / Redo history stacks for Lesson Planner (up to 50 actions saved)
let plannerUndoStack = [];
let plannerRedoStack = [];
const MAX_PLANNER_HISTORY = 50;

let rosterSortState = { col: 'default', direction: 'asc' };

let gradebookCollapsedCats = {};
let isAllGradebookSubActivitiesCollapsed = false;

let draggedCategoryIdx = null;

let gradebookSortState = { col: 'default', direction: 'asc' };
let gradebookStatsView = 'overview'; // 'overview' | 'distribution' | 'activities'

let currentEditingScaleScope = '__default__';
let currentEditingScaleMode = 'default';
let currentEditingScaleData = [];

let currentEditingGradingConfig = null;

let currentRadarFilter = 'all';

let activeAgendaDay = null;

let lostDaysBySection = {};

let gradeDistScaleMode = 'grouped'; // 'grouped' or 'full'
let gradebookCohortFilter = null; // { label: string, studentIds: string[] }
let lastRenderedGradebookSection = '';

let currentTipIndex = 0;

let vaultActiveCategory = 'all';
let vaultSearchTerm = '';

let logoTapCount = 0;
let logoTapTimer = null;

let konamiIndex = 0;
