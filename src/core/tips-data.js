/* ===========================================================================
 * FACULTY TIPS CONTENT
 * ---------------------------------------------------------------------------
 * The 25 tip records shown in the Tip of the Day modal and the Secret Vault.
 * Content only - no behaviour. Edit freely without touching app logic.
 * ======================================================================== */

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
