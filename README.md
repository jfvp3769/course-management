# Faculty Course & Lesson Manager (v2.5.0)

[![Offline Ready](https://img.shields.io/badge/Offline-100%25%20Ready-success?style=flat-square&logo=pwa)](index.html)
[![Zero Build](https://img.shields.io/badge/Build%20Step-Zero%20Bundler-blue?style=flat-square)](index.html)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20Vanilla%20JS-amber?style=flat-square)](src/)
[![License: Academic](https://img.shields.io/badge/License-Faculty%20Academic%20Open-emerald?style=flat-square)](README.md)

A high-performance, offline-first faculty portal and academic productivity system designed for university and college educators across institutions.

Engineered with an uncompromising commitment to local privacy and zero server dependencies, it empowers instructors to plan semester syllabus matrices, audit timetable room collisions, track lost instructional days due to calendar events, manage student rosters, customize visual themes and workspace canvases, and calculate institutional grades (supporting 1.00–5.00, letter grades, and custom scales) directly inside any modern web browser.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Capabilities & Workspaces](#key-capabilities--workspaces)
   - [1. Lesson Planner Matrix](#1-lesson-planner-matrix)
   - [2. Weekly Timetable & Room Conflict Auditor](#2-weekly-timetable--room-conflict-auditor)
   - [3. Academic Calendar & Lost Days Engine](#3-academic-calendar--lost-days-engine)
   - [4. Class List (Roster) & Faculty Communications](#4-class-list-roster--faculty-communications)
   - [5. Class Record & Offline Gradebook](#5-class-record--offline-gradebook)
   - [6. Visual Themes & Custom Color Palettes](#6-visual-themes--custom-color-palettes)
   - [7. Data Center, Vault & Custom Branding](#7-data-center-vault--custom-branding)
3. [Quick Start & Instructions](#quick-start--instructions)
4. [Keyboard Shortcuts](#keyboard-shortcuts)
5. [Architecture & Code Organization](#architecture--code-organization)
6. [Event Delegation Engine](#event-delegation-engine)
7. [Offline PWA & Service Worker Operation](#offline-pwa--service-worker-operation)
8. [Data Privacy & Backward Compatibility Migration](#data-privacy--backward-compatibility-migration)
9. [Version History & Changelog](#version-history--changelog)
10. [License & Attribution](#license--attribution)

---

## Project Overview

Modern academic environments demand reliable digital tools that remain fully functional regardless of campus network outages or slow connections. The **Faculty Course & Lesson Manager** provides:

- **Zero Build, Zero Bundler**: No Node.js build step, Webpack, Vite, or Babel required. Edit any HTML, CSS, or JS file and refresh your browser.
- **Double-Click Executable (`file:///`)**: Runs natively by double-clicking `index.html` straight from Windows Explorer, macOS Finder, or Linux file managers.
- **Universal Multi-School Compatibility**: Flexible for any higher education institution, college, or polytechnic. Easily customize the institution name, department header, and school emblem in Portal Settings.
- **Dynamic Visual Theming**: 8 preset header gradients and 5 distinct workspace background palettes, plus full custom color pickers for institutional branding.
- **Client-Side Data Sovereignty**: All courses, syllabi, rosters, schedules, and grades stay 100% on the user's computer in browser `localStorage`. No cloud data collection, no account logins, and no tracking.
- **Automated Data Protection**: Includes periodic data safety backup reminders and comprehensive JSON import/export with schema validation.
- **Flexible Grading Compliance**: Ships with standard institutional numeric scales (1.00 to 5.00) and allows custom cutoffs, custom labels, and section-specific grading scales.

---

## Key Capabilities & Workspaces

### 1. Lesson Planner Matrix
- **Matrix Grid View**: Interactive calendar grid mapping each teaching date across all course sections with distinctive weekday vs. weekend visual rhythm.
- **Meeting Count & Remaining Term Badges**: Every planned activity card and scheduled empty slot displays crisp meeting indices (`Mtg #X`) and remaining meeting pills (`Y left` or `Final Mtg`), giving instructors immediate term pacing visibility.
- **Meeting Context Banner**: The Lesson Planner modal features a real-time meeting context banner showing `Meeting #X of Y`, remaining meetings in the term, and celebration tags for final meetings or out-of-schedule special sessions.
- **Context-Aware Cross-Section Copy & Paste**: Copying lesson plans between sections preserves pedagogical topics, activity types, and notes while dynamically inheriting the destination section's start time, end time, and assigned classroom venue.
- **Interactive Drag & Drop**: Drag lecture cards, exam checkpoints, and laboratory sessions across calendar dates and sections to easily reschedule lessons.
- **Multi-Level Undo/Redo Engine**: 50-step action history (`Ctrl+Z` / `Ctrl+Y`) for confident planning and instant reversal of mistakes.
- **Interactive Column Resizing**: Drag column dividers to adjust course section widths, with a double-click reset to restore default balanced widths.
- **Syllabus Backlog Drawer**: Stashes unassigned syllabus topics and learning outcomes in a dedicated slide-out drawer for flexible schedule planning.
- **Curriculum Pacing & Progress**: Real-time sidebar metrics tracking curriculum completion percentages, assigned lesson count, and upcoming topics.

### 2. Weekly Timetable & Room Conflict Auditor
- **Weekly Schedule Grid**: 7:00 AM – 6:00 PM weekly grid displaying subject meeting hours, classroom assignments, section tags, and color-coded course badges.
- **Automated Collision & Conflict Auditor**: Instantly detects and warns of overlapping class hours or double-booked rooms across courses in real time.
- **Faculty Teaching Load Summary**: Accurately summarizes total lecture units, laboratory contact hours, and daily teaching load distributions.
- **Today's Pocket Agenda**: Day-by-day quick agenda filter allowing instructors to view today's schedule at a glance during busy teaching days.

### 3. Academic Calendar & Lost Days Engine
- **Semester Timeline**: Full academic calendar tracking institutional holidays, exam periods, midterms, and university events.
- **Lost Teaching Days Impact Engine**: Automatically checks calendar events against scheduled class meeting days, quantifying lost instructional hours per course section.
- **Event Distribution & Filtering**: Categorizes events (Holidays, Exams, Milestones, Activities) with single-click filtering and inset highlight rings.
- **No-Class Overrides**: Configure school-wide suspensions, local weather disruptions, or course-specific class cancellations with custom reasons.

### 4. Class List (Roster) & Faculty Communications
- **Default Last Name (A-Z) Sorting**: Roster automatically sorts alphabetically by Last Name A-Z with 3-state cycling (A-Z `▲`, Z-A `▼`, default reset `▲`).
- **Automatic Placement for Late Enrollments**: Enrolling a student via single-student entry, bulk paste, or CSV import immediately positions them in alphabetical order rather than appending them to the bottom.
- **Student Roster Management**: ID, Last Name, First Name, Gender, Email, and Section assignment with instant sorting and multi-column search.
- **Enrollment Capacity Meters**: Live capacity and gender breakdown progress meters per course section.
- **Duplicate ID Auditor**: Detects and flags duplicate student ID anomalies across roster entries.
- **One-Click Broadcast Emailing**: Generates pre-addressed `mailto:` BCC email drafts targeting active search results, failing students, or entire sections with a single click.
- **RFC 4180 CSV Import/Export**: Import rosters from university SIS spreadsheet exports or copy-paste directly from Excel/Google Sheets.

### 5. Class Record & Offline Gradebook
- **Default Student Name (A-Z) Sorting & Auto-Update**: Gradebook automatically maintains alphabetical order (A-Z) by default and instantly incorporates late-added students into their proper position.
- **Dynamic Weighted Grading**: Fully customizable weighted grading categories (e.g., Quizzes 20%, Laboratory 20%, Midterm Exam 30%, Final Project 30%) with arbitrary sub-activities and max scores.
- **Institutional Scale Evaluation**: Real-time conversion to official numeric grades (1.00–5.00) with automatic academic status flags (Passed, Incomplete, Failed, Dropped).
- **Interactive Radar Cohort Filtering**:
  - **At-Risk Student Radar Badge (`[ X At-Risk ]`)**: Single-click filtering to isolate students with failing, near-failing, or incomplete grades ($> 3.00$, INC, 5.00). Re-clicking restores the full class list.
  - **Input Error Radar Badge (`[ X Errors ]`)**: Single-click filtering to highlight students with score entry anomalies (scores exceeding max points, negative values, or invalid inputs).
- **Class Standing Analytics**: Instant calculation of section average, median, pass rate percentages, standard deviation ($\sigma$), score distribution spread, and high/low performer cards.
- **Grade Distribution Histogram**: Toggle between 5 grouped tiers (Superior, Very Good, Passing, Incomplete, Failed) or the full 11-grade institutional scale.
- **Spreadsheet Keyboard Navigation**: Arrow-key and Enter-key grid navigation, in-place reactive recalculation, category collapsing, and CSV Class Record export.

### 6. Visual Themes & Custom Color Palettes
- **Visual Theme & Appearance Modal**: Dedicated modal accessible directly from the top header Theme button for streamlined personalization.
- **Header Color Palettes**: Choose from 8 rich preset gradients (Heritage Maroon, Academic Navy, Ocean Sapphire, Forest Emerald, Royal Violet, Executive Slate, Mahogany Bronze, Deep Teal) or create a bespoke institutional palette using RGB/Hex color pickers.
- **Workspace Window Background Canvases**: 5 distinct canvas palettes (Cool Slate, Studio Minimal, Warm Sand, Glacier Blue, Sage Green) with high-contrast light and dark variations.
- **Universal Themed Modals**: Consistent dynamic gradient headers, themed subtitles, and matching primary buttons across all 10 application dialogs and modals.
- **Translucent Glass Action Buttons**: Modern semi-transparent header buttons (`bg-white/10` with glass borders) featuring theme-reactive icons and labels that dynamically synchronize with the active date text color.

### 7. Data Center, Vault & Custom Branding
- **Complete Portal Backup & Restore**: One-click JSON backup export and restore of the entire portal database with schema validation and orphaned student record cleanup.
- **Monotonic Grading Scale Editor**: Customize section or course-level cutoff scales with descending monotonic validation ($1.00 > 1.25 > \dots > 3.00$).
- **Custom Institutional Branding**: Set your school or department name, upload custom SVG/PNG institution logos, and customize course color badges.
- **Dark / Light Theme Sync**: High-contrast theme tailored for late-night grading sessions and bright lecture halls.

---

## Quick Start & Instructions

### Running Locally (Offline Mode)
No dependencies, Node.js, or terminal installations are necessary:
1. Download or clone this repository:
   ```bash
   git clone https://github.com/jfvp3769/course-management.git
   ```
2. Open the project folder and double-click [`index.html`](index.html) to run directly in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave).

### Running via Local HTTP Server (Optional)
If you prefer running via a local web server (e.g., to enable full Progressive Web App service worker caching features):
```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx serve .
```
Then open `http://localhost:8000` in your web browser.

---

## Keyboard Shortcuts

| Shortcut | Action | Where Applicable |
|---|---|---|
| `Ctrl + Z` | Undo last lesson planner change | Lesson Planner Matrix |
| `Ctrl + Y` or `Ctrl + Shift + Z` | Redo last lesson planner change | Lesson Planner Matrix |
| `Arrow Keys` (`↑ ↓ ← →`) | Navigate adjacent cells in spreadsheet | Class Record Gradebook |
| `Enter` | Move down to next student row | Class Record Gradebook |
| `Tab` / `Shift + Tab` | Move right / left between activity columns | Class Record Gradebook |
| `Esc` | Close any active modal dialog or drawer | Global |

---

## Architecture & Code Organization

The application follows an offline-first modular architecture with zero external compilation:

```
course-management/
├── index.html                   # Core application markup & ordered classic scripts
├── manifest.json                # PWA manifest
├── sw.js                        # Offline service worker cache & update manager
├── logo.svg                     # Vector academic emblem (universal default)
├── css/
│   ├── 00-index.css             # CSS architecture catalog & load manifest
│   ├── 01-tokens.css            # Dynamic theme tokens, surfaces, borders, link styles
│   ├── 02-dark-components.css   # Dark theme surface & widget styling
│   ├── 03-dark-grades.css       # Dark theme grade badges & distribution styles
│   ├── 04-dark-planner.css      # Dark theme matrix cells & cards
│   ├── 05-dark-gradebook.css    # Dark theme gradebook inputs & headers
│   ├── 07-components.css        # Core component classes, widget drag handles, resizers
│   ├── 08-dark-modals.css       # Dark theme modal dialogs & drawers
│   ├── 09-responsive.css        # Mobile, tablet, & desktop media queries
│   └── 10-components.css        # Header expandable action buttons & backup banner
├── src/
│   ├── bootstrap.js             # Ordered application startup & event initialization
│   ├── core/
│   │   ├── constants.js         # Default configurations, grading templates & palettes
│   │   ├── state.js             # Centralized mutable application state
│   │   ├── events.js            # Centralized Event Delegation & Action Registry
│   │   ├── render.js            # Render pipeline coordinator & change sets
│   │   ├── storage.js           # LocalStorage persistence, backup validation & restore
│   │   ├── utils.js             # RFC 4180 CSV parser, date helpers, sanitizers
│   │   ├── tips-data.js         # Daily faculty workflow tips & recommendations
│   │   └── backup-reminder.js   # Automated weekly data safety prompt
│   ├── features/
│   │   ├── planner-matrix.js    # Lesson planner table grid & drag-and-drop
│   │   ├── lesson-planner.js    # Planner undo/redo history stacks & topics
│   │   ├── timetable.js         # Timetable grid & schedule calculations
│   │   ├── timetable-editor.js  # Add/Edit class schedule meeting modal
│   │   ├── calendar.js          # Academic calendar table & event rendering
│   │   ├── no-class.js          # Class suspension logic & date math
│   │   ├── present-week.js      # Current semester week indicator & jumping
│   │   ├── roster.js            # Student roster rendering, sorting & filtering
│   │   ├── gradebook.js         # Gradebook spreadsheet, formulas & recalculation
│   │   ├── grading-criteria.js  # Category & sub-activity weighting modal
│   │   ├── grading-scale.js     # Institutional grading scale editor & validator
│   │   ├── courses.js           # Course & section configuration management
│   │   ├── semester.js          # Semester date boundary configuration
│   │   ├── classroom.js         # Google Classroom integration links
│   │   └── branding.js          # Portal logo customization & easter eggs
│   ├── sidebars/
│   │   ├── planner.js           # Planner sidebar metrics & backlog
│   │   ├── timetable.js         # Faculty teaching load & pocket agenda
│   │   ├── calendar.js          # Upcoming deadlines, lost days & distribution
│   │   ├── roster.js            # Enrollment meters, communication buttons & health
│   │   └── gradebook.js         # At-Risk radar, Input Error radar, performance stats
│   ├── ui/
│   │   ├── layout.js            # Dual scrollbars & main window height resizers
│   │   ├── tabs.js              # Tab switching, theme synchronization & view state
│   │   ├── sidebars.js          # Sidebar collapse & vertical drag reordering
│   │   ├── theme.js             # Visual theme modal, palette customizer & dark mode sync
│   │   ├── color-picker.js      # Course color theme picker
│   │   ├── tips.js              # Faculty tip modal rotation
│   │   ├── feedback.js          # Toast notification alerts
│   │   ├── guide.js             # Quick start user guide modal
│   │   └── easter-egg.js        # Institutional mini-games & secret vault
│   └── io/
│       └── data-center.js       # JSON backups & RFC 4180 CSV imports/exports
└── tools/
    └── smoke-test.js            # Automated headless jsdom verification suite
```

---

## Event Delegation Engine

In v2.1.0+, all inline `onclick`, `onchange`, `oninput`, and `onkeydown` attributes were eliminated in favor of a modern **Centralized Event Delegation & Action Registry** ([`src/core/events.js`](src/core/events.js)):
- **Performance**: A single document-level listener dispatches actions without attaching memory-heavy event handlers to thousands of table cells.
- **Declarative Markup**: Interactive HTML elements declare actions via `data-action="..."` (e.g. `data-action="filterGradebookByCohort"`).
- **Graceful Fallback**: Supports direct parameters via `data-*` dataset attributes while maintaining compatibility with global handlers.

---

## Offline PWA & Service Worker Operation

The application uses an enhanced Service Worker ([`sw.js`](sw.js)) configured with:
- **Resilient Cache Strategy**: Caches application assets individually so missing optional assets do not abort installation.
- **Network-First for Navigations**: Ensures online deployments fetch the newest code while falling back seamlessly to cache when offline.
- **Cache Lifecycle Management**: Updates to cache name `faculty-course-manager-v2.35` automatically purge obsolete asset versions.

---

## Data Privacy & Backward Compatibility Migration

All user data is stored entirely on the client side via the browser's `localStorage` engine:
- **Primary Storage Key**: `FACULTY_COURSE_MANAGER_DATA_V2`
- **Legacy Migration Support**: The portal automatically detects existing data stored under legacy keys (e.g. `MSU_GSC_COURSE_MANAGER_DATA_V2`), migrating all courses, rosters, grades, and custom scales forward seamlessly with **zero data loss**.
- **Cross-Version Backup Compatibility**: Backup JSON files exported from previous versions remain fully valid and can be imported at any time.

---

## Version History & Changelog

### Version 2.5.0 (September 2026) — *Current Release*
- **Meeting Numbers & Semester Remaining Count in Planning Experience**:
  - **Matrix Activity Cards & Slots**: Every scheduled empty matrix slot and planned lesson card displays a meeting header (`Mtg #X`) and a remaining meetings pill (`Y left` or `Final Mtg`), giving instructors immediate term pacing visibility.
  - **Lesson Planner Meeting Context Banner**: Added a dedicated meeting context banner to the Lesson Planner modal showing `Meeting #X of Y`, remaining meetings left in the term, and celebration tags for the final scheduled meeting or out-of-schedule special sessions.
- **Context-Aware Cross-Section Activity Copy & Paste**:
  - When copying and pasting lesson activities between different course sections in the Semester Schedule & Activity Matrix, pedagogical topics, activity types, and notes are preserved while start time, end time, and room/venue are automatically inherited from the destination section's schedule.
- **Harmonized Lesson Planner Modal Action Buttons**:
  - Standardized all 6 footer action buttons (`Mark "No Class"`, `Clear Activity`, `Prev Slot`, `Next Slot`, `Cancel`, `Save Activity`) into a consistent `h-9` (36px height), `rounded-xl` design with `font-bold text-xs` typography and crisp inline SVGs.
- **Tab Header Button Hover State Harmonization**:
  - Toolbar action button hover fill colors seamlessly match the tab header card surface in both light mode (`#ffffff`) and dark mode (`#0f172a`).
- **Default A-Z Alphabetical Sorting with Automatic Placement on Enrollment**:
  - **Grading Matrix & Class Record (Tab 5)**: Defaults to sorting by Student Name (A-Z) with an active `▲` indicator and 3-state cycling. Late enrollments are automatically sorted alphabetically into place.
  - **Student Roster & Class Lists (Tab 4)**: Defaults to sorting by Last Name (A-Z) with an active `▲` indicator. Single student entry, bulk clipboard paste, and CSV import automatically re-sort the roster and place students in alphabetical order.
  - **Startup & Storage Sync**: Offline-cached rosters and restored backups are guaranteed to be sorted alphabetically upon application boot.
- **Full UI Dynamic Theme Harmonization (Tier 0 & Tier 1)**:
  - Synchronized remaining modals (`#grading-scale-modal`, `#grading-criteria-modal`, `#google-classroom-modal`) with `.app-themed-header` and `.app-themed-subtitle`.
  - Standardized all 8 primary save/commit buttons across all modals to `.app-themed-btn-primary`.
  - Added prominent `3.5px` top accent borders to all sidebar widget cards across all 5 sidebars bound to `--app-header-primary` (light) and `--app-header-accent` (dark).
  - Styled widget header titles and main tab section headers (`h2`) with active theme colors.
  - Global input focus rings and checkboxes/radios dynamically glow with active theme accents.
- **Unified Tab Header Action Buttons (`.tab-header-btn`)**:
  - Harmonized all action buttons across the toolbars of all 5 tabs (Lesson Planner, Weekly Timetable, Academic Calendar, Student Roster, Gradebook) into a consistent 32px height, 8px rounded card design.
  - Replaced inconsistent legacy pastel colors with clean white surfaces, slate borders, and active theme text/icons in light mode, and elevated slate cards in dark mode.
  - Dedicated danger variant (`.tab-header-btn-danger`) for destructive operations (`Remove All Students`, `Reset Filter`).
- **Themed Docked Sidebar Overview Toggles (`<< ... Overview`)**:
  - All 5 docked sidebar toggles (`Planner Overview`, `Timetable Overview`, `Calendar Overview`, `Roster Overview`, `Gradebook Overview`) dynamically inherit active theme colors and hover borders.
- **Service Worker & Cache Upgrade**:
  - Bumped service worker cache to `v2.38` for immediate update propagation across devices.

### Version 2.4.0 (September 2026)
- **Visual Theme & Appearance Customization**:
  - Added dedicated **Visual Theme & Appearance** modal directly in the top header (`#btn-theme-toggle`), decoupling visual theming from administrative term settings.
  - Implemented 8 rich preset header gradients: Heritage Maroon & Gold, Academic Navy & Gold, Ocean Sapphire & Sky, Forest Emerald & Mint, Royal Violet & Lavender, Executive Slate & Ice, Mahogany & Amber Bronze, and Deep Teal & Seafoam.
  - Added full Custom Primary and Accent color pickers with instant live preview and local storage persistence.
  - Implemented 5 distinctive workspace background canvases: Cool Slate, Studio Minimal / Ash, Warm Sand / Paper, Glacier Blue, and Sage Green.
- **Dynamic Theming Harmonization Across All Windows & Tabs**:
  - Tab title theme synchronization: active tab titles and indicators dynamically track the active header theme tokens (`--app-header-tab-text`, `--app-header-accent`).
  - Applied consistent `.app-themed-header` gradients, `.app-themed-subtitle` typography, and `.app-themed-btn-primary` actions across all 10 application dialogs (Portal Settings, Manage Courses, Edit Subject, Add/Edit Section, Export/Import Hub, Tips, User Guide, Secret Knowledge Vault, Feedback).
  - Dynamic `.app-themed-link` styling for inline action links (such as "+ Add Section" inside subject management cards).
- **Translucent White Glass Header Action Buttons**:
  - Unified all 5 header action buttons (`Portal Settings`, `Manage Subjects`, `Export / Import Hub`, `User Guide`, `Theme`) into clean, consistent translucent white glass pills (`bg-white/10 hover:bg-white/20 border-white/20`).
  - Dynamically bound button icons and expandable labels to `--app-header-tab-text`, perfectly matching the date text and active theme palette.
  - Harmonized real-time live clock icon, separator, and subtitle with theme text colors.
- **Service Worker & Cache Upgrade**:
  - Bumped service worker cache to `v2.35` for immediate update propagation across devices.

### Version 2.3.0 (September 2026)
- **Universal Institution & Multi-School Support**:
  - Removed hardcoded institutional restrictions; the portal is now universally applicable to faculty from any college, university, or academic institution.
  - Default portal title updated to `"University Faculty Portal"` with customizable school name and logo uploading in Portal Settings.
  - Added new clean, vector academic SVG emblem ([`logo.svg`](logo.svg)) featuring a laurel wreath, graduation cap, and open book.
  - Universal student email placeholders (`@university.edu`) across single enrollment, bulk paste, and settings.
  - Generalized export filenames (`Faculty_Course_Manager_Backup_YYYY-MM-DD.json`, `Class_Record_*.csv`, etc.).
- **Zero-Loss Data Migration Engine**:
  - Implemented dual-key fallback (`FACULTY_COURSE_MANAGER_DATA_V2` with legacy `MSU_GSC_COURSE_MANAGER_DATA_V2` detection) ensuring seamless, automatic migration for existing users.
  - Preserved dual-key compatibility for UI preferences (`faculty_dark_mode`, `faculty_main_win_h_*`, `faculty_last_backup_time`).
  - Generalized backup structure validator accepting both `academicCalendarEvents` and legacy event structures.
- **Technical Debt & Polish Remediations**:
  - **Grading Scale Monotonic Validation**: Added strictly descending cutoff validation ($1.00 > 1.25 > 1.50 > \dots > 3.00$) in [`src/features/grading-scale.js`](src/features/grading-scale.js) before saving.
  - **Smooth double-rAF Scrolling**: Migrated remaining jump and highlight `setTimeout(..., 50)` delays to double `requestAnimationFrame` for smooth scrolling on lower-end devices.
  - **Dead File Cleanup**: Removed empty legacy stylesheet `css/06-dark-grading-modals.css`.

### Version 2.2.0 (September 2026)
- **Interactive Radar Cohort Filtering**:
  - Upper-right badge pills in the Gradebook sidebar (`[ X At-Risk ]` and `[ X Errors ]`) upgraded to interactive filter buttons.
  - Clicking `[ X At-Risk ]` filters the table exclusively to students with failing or non-passing grades ($> 3.00$, INC, 5.00).
  - Clicking `[ X Errors ]` filters the table to students with score validation issues (over-max values, negative entries, invalid characters).
  - Clicking an active badge pill toggles off the filter, restoring the full roster view.
  - Connected directly to the table header's `[ ✕ Reset Filter ]` action banner.
- **Drag & Click Event Isolation on Widget Headers**:
  - Resolved event conflict where `.widget-drag-handle * { pointer-events: none; }` prevented mouse clicks on header badges.
  - Excluded all buttons, action badges, and links from drag interception with `pointer-events: auto !important` and `draggable="false"` on mousedown.
- **Visual Inset Ring Enhancements**:
  - Replaced outer outline rings with `ring-2 ring-inset` across Event Distribution category buttons and High Score / Low Score performer cards.
  - Completely eliminated container boundary clipping and sibling card border occlusion.

### Version 2.1.0 (September 2026)
- **Centralized Event Delegation (`src/core/events.js`)**:
  - Migrated over 290 inline `on*` handlers to document-level delegated event listeners.
- **RFC 4180 Multi-Line CSV Parser**:
  - Implemented robust quoted CSV parsing in [`src/core/utils.js`](src/core/utils.js) handling commas, quotes, and newlines.
- **Backup Structure Validation**:
  - Added schema integrity validation and orphaned student cleanup on JSON backup restoration.
- **Roster Communication Tools**:
  - Recovered and refined bulk BCC email drafting and clipboard export tools in the Roster sidebar.
- **Dark Mode High-Contrast Refinements**:
  - Overhauled contrast tokens for gradebook headers, sub-activity badges, and lost teaching days cards.

### Version 2.0.0 (August 2026)
- **Architectural Modularization**:
  - Decomposed monolithic 10,470-line `app.js` into 38 cleanly organized feature and core modules.
  - Structured 2,979-line `styles.css` into 10 ordered CSS files with preserved cascade order.
- **Centralized Render Pipeline (`src/core/render.js`)**:
  - Collapsed 44 inconsistent repaint sequences into a single unified `Render.after()` mutation coordinator.
- **Planner Matrix Race Condition Fixes**:
  - Resolved sidebar desynchronization when saving or editing lesson matrix topics.
- **Resilient Service Worker**:
  - Overhauled offline caching to prevent asset 404 installation aborts.

### Version 1.0.0 (Initial Release)
- Prototype all-in-one Course & Lesson Manager with spreadsheet matrix, timetable, calendar, roster, and local storage.

---

## License & Attribution

Developed for university, college, and higher education educators worldwide. Open academic productivity software.  
All rights reserved © 2026.
