# MSU-GSC Course & Lesson Manager (v2.2.0)

[![Offline Ready](https://img.shields.io/badge/Offline-100%25%20Ready-success?style=flat-square&logo=pwa)](file:///p:/apps/msu-course-manager-v2/index.html)
[![Zero Build](https://img.shields.io/badge/Build%20Step-Zero%20Bundler-blue?style=flat-square)](file:///p:/apps/msu-course-manager-v2/index.html)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20Vanilla%20JS-amber?style=flat-square)](file:///p:/apps/msu-course-manager-v2/src/)
[![License: Academic](https://img.shields.io/badge/License-MSU--GSC%20Faculty-maroon?style=flat-square)](file:///p:/apps/msu-course-manager-v2/LICENSE)

A high-performance, offline-first faculty portal and academic management system tailored for the faculty of **Mindanao State University – General Santos City (MSU-GSC)**.

Designed for complete local privacy and zero server dependencies, it allows instructors to plan semester syllabus matrices, audit timetable room conflicts, track lost teaching days, manage student rosters, and calculate institutional grades (1.00–5.00) directly inside the browser.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Capabilities & Workspaces](#key-capabilities--workspaces)
   - [1. Lesson Planner Matrix](#1-lesson-planner-matrix)
   - [2. Weekly Timetable & Conflict Auditor](#2-weekly-timetable--conflict-auditor)
   - [3. Academic Calendar & Lost Days Impact](#3-academic-calendar--lost-days-impact)
   - [4. Class List (Roster) & Communications](#4-class-list-roster--communications)
   - [5. Class Record & Gradebook](#5-class-record--gradebook)
   - [6. Data Center & Vault](#6-data-center--vault)
3. [Quick Start & Instructions](#quick-start--instructions)
4. [Architecture & Code Organization](#architecture--code-organization)
5. [Event Delegation Engine](#event-delegation-engine)
6. [Offline & Service Worker Operation](#offline--service-worker-operation)
7. [Version History & Changelog](#version-history--changelog)

---

## Project Overview

Modern academic environments demand reliable digital tooling that works regardless of campus internet availability. The **MSU-GSC Course & Lesson Manager** provides:
- **Zero Build, Zero Bundler**: No Node build step, Webpack, Vite, or Babel required.
- **Double-Click Executable (`file:///`)**: Runs natively by double-clicking `index.html` from Windows Explorer, macOS Finder, or Linux file managers.
- **GitHub Pages Ready**: Fully static, deployable directly to GitHub Pages or any static CDN.
- **Client-Side Persistence**: Stores all courses, lesson topics, timetable slots, student records, and grades in `localStorage` with automated periodic backup reminders and complete JSON/CSV export capabilities.
- **Institutional Compliance**: Built-in support for the official MSU-GSC 11-tier grading scale (1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, INC, 5.00).

---

## Key Capabilities & Workspaces

### 1. Lesson Planner Matrix
- **Matrix View**: Calendar grid mapping class dates to individual course sections with weekday vs. weekend visual rhythm.
- **Interactive Drag & Drop**: Drag lecture topic cards across calendar dates and sections to reschedule topics seamlessly.
- **Multi-Level Undo/Redo**: 50-step action history (`Ctrl+Z` / `Ctrl+Y`) for confident planning and quick reversals.
- **Column Resizing**: Smooth drag-resizing on course column dividers with double-click reset.
- **Syllabus Backlog**: Stashes unassigned topics and activities in a dedicated drawer for flexible assignment.
- **Subject Pace & Pacing Stats**: Sidebar metrics monitoring curriculum completion percentages and upcoming deadlines.

### 2. Weekly Timetable & Conflict Auditor
- **Visual Timetable Grid**: 7:00 AM – 6:00 PM weekly grid displaying subject meeting hours, classroom assignments, and color-coded courses.
- **Automated Conflict Auditor**: Detects overlapping class hours and room collisions across sections in real time.
- **Faculty Teaching Load Summary**: Summarizes lecture units, lab contact hours, and daily load distribution.
- **Today's Pocket Agenda**: Day-by-day quick picker showing class schedules at a glance.

### 3. Academic Calendar & Lost Days Impact
- **Semester Timeline**: Full academic calendar tracking institutional holidays, exam periods, midterms, and university events.
- **Lost Teaching Days Engine**: Automatically tallies holiday collisions per section and displays lost instructional hours.
- **Event Distribution**: Color-coded categorization (Holidays, Exams, Milestones, Activities) with single-click filtering.
- **No-Class Overrides**: Configure university-wide or section-specific suspensions with custom reasons.

### 4. Class List (Roster) & Communications
- **Student Roster Management**: ID, Last Name, First Name, Gender, Email, and Section assignment.
- **Enrollment Meters**: Real-time capacity and breakdown progress bars per section.
- **Duplicate ID Auditor**: Detects and highlights student ID anomalies across roster entries.
- **One-Click Broadcast Emailing**: Generates pre-addressed `mailto:` BCC email drafts targeting active search results, failing students, or entire sections.
- **CSV Roster Import/Export**: Import class lists from standard spreadsheet CSV files with multi-column autodetection.

### 5. Class Record & Gradebook
- **Real-Time Weighted Grading**: Dynamic calculations supporting weighted categories (e.g., Quizzes 20%, Labs 20%, Prelims 20%, Midterms 20%, Finals 20%) and custom sub-activities with arbitrary max scores.
- **Institutional MSU Scale**: Dynamic conversion to official MSU numeric grades (1.00–5.00) with status flags (Passed, Failed, Incomplete, Dropped, Withdrawn).
- **Interactive Radar Cohort Filtering (New in v2.2)**:
  - **At-Risk Student Radar Badge (`[ X At-Risk ]`)**: One-click filtering of the table to students with grades $> 3.00$, INC, or failing. Re-click toggles back to all students.
  - **Input Error Radar Badge (`[ X Errors ]`)**: One-click filtering to students with score validation issues (over-max items, negative numbers, or invalid inputs).
- **Class Standing & Analytics**: Average, median, pass rate percentages, standard deviation ($\sigma$), score range spread, and high/low performer recognition.
- **Grade Distribution Histogram**: Switch between 5 grouped summary tiers (Superior, Very Good, Passing, Incomplete, Failed) or the full 11-grade MSU institutional scale with single-click cohort filtering.
- **Spreadsheet Editing & Keyboard Navigation**: Arrow-key grid navigation, in-place reactive score recalculation, category collapsing, and CSV Gradebook export.

### 6. Data Center & Vault
- **Complete Backup & Restore**: One-click JSON export/import of the entire portal database with backup structure validation and orphaned student record cleanup.
- **Grading Scale Editor**: Customize section or course-level cutoff scales with descending monotonic validation ($1.00 > 1.25 > \dots > 3.00$).
- **Branding & Easter Egg Vault**: Custom institutional logos, dark/light theme switching, and secret mini-games.

---

## Quick Start & Instructions

### Running Locally (Offline Mode)
No dependencies or installations are necessary:
1. Download or clone this repository:
   ```bash
   git clone https://github.com/jfvp3769/course-management.git
   ```
2. Navigate to the project folder and double-click [`index.html`](file:///p:/apps/msu-course-manager-v2/index.html) to open directly in any modern browser (Microsoft Edge, Google Chrome, Mozilla Firefox, Safari).

### Running via Local HTTP Server (Optional)
If you prefer running through a local web server (e.g., to enable full PWA service worker background features):
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```
Then navigate to `http://localhost:8000` in your browser.

### Helpful Keyboard Shortcuts
- `Ctrl + Z`: Undo last lesson planner change
- `Ctrl + Y` or `Ctrl + Shift + Z`: Redo last lesson planner change
- `Arrow Keys / Enter`: Navigate between cells in Gradebook spreadsheet view
- `Esc`: Close open modals or drawers

---

## Architecture & Code Organization

The codebase follows an offline-first modular architecture with zero external compilation:

```
msu-course-manager-v2/
├── index.html                   # Core application markup & ordered classic scripts
├── manifest.json                # PWA manifest
├── sw.js                        # Offline service worker cache & update manager
├── css/
│   ├── 00-index.css             # CSS architecture catalog & load manifest
│   ├── 01-tokens.css            # MSU Maroon/Gold color tokens, surfaces, borders
│   ├── 02-dark-components.css   # Dark theme surface & widget styling
│   ├── 03-dark-grades.css       # Dark theme grade badges & distribution styles
│   ├── 04-dark-planner.css      # Dark theme matrix cells & cards
│   ├── 05-dark-gradebook.css    # Dark theme gradebook inputs & headers
│   ├── 07-components.css        # Core component classes, widget drag handles, resizers
│   ├── 08-dark-modals.css       # Dark theme modal dialogs & drawers
│   ├── 09-responsive.css        # Mobile, tablet, & desktop media queries
│   └── 10-components.css        # Specialized utilities & enhancements
├── src/
│   ├── bootstrap.js             # Ordered application startup & event initialization
│   ├── core/
│   │   ├── constants.js         # Default configurations & grading templates
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
│   │   ├── tabs.js              # Tab switching & view state management
│   │   ├── sidebars.js          # Sidebar collapse & vertical drag reordering
│   │   ├── theme.js             # Dark / Light theme toggle & sync
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

In v2.1.0+, all inline `onclick`, `onchange`, `oninput`, and `onkeydown` attributes were eliminated in favor of a modern **Centralized Event Delegation & Action Registry** ([`src/core/events.js`](file:///p:/apps/msu-course-manager-v2/src/core/events.js)):
- **Performance**: A single document-level listener dispatches actions without attaching memory-heavy event handlers to thousands of table cells.
- **Declarative Markup**: Interactive HTML elements declare actions via `data-action="..."` (e.g. `data-action="filterGradebookByCohort"`).
- **Graceful Fallback**: Supports direct parameters via `data-*` dataset attributes while maintaining compatibility with global handlers.

---

## Offline & Service Worker Operation

The application uses an enhanced Service Worker ([`sw.js`](file:///p:/apps/msu-course-manager-v2/sw.js)) configured with:
- **Resilient Cache Strategy**: Caches application assets individually so missing optional assets do not abort installation.
- **Network-First for Navigations**: Ensures that online deployments automatically fetch the newest application code while falling back seamlessly to cache when offline.
- **Local Cache Reset**: Updates to version `msu-gsc-manager-v2.20` automatically purge obsolete asset versions.

---

## Version History & Changelog

### Version 2.2.0 (September 2026) — *Current Release*
- **Interactive Radar Cohort Filtering**:
  - Upper-right badge pills in the Gradebook sidebar (`[ X At-Risk ]` and `[ X Errors ]`) are now interactive buttons.
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
- **Grading Scale Monotonic Validation**:
  - Enforced strictly descending cutoff validation ($1.00 > 1.25 > 1.50 > \dots > 3.00$) in [`src/features/grading-scale.js`](file:///p:/apps/msu-course-manager-v2/src/features/grading-scale.js) before saving.
- **Smooth double-rAF Scrolling**:
  - Migrated remaining jump and highlight `setTimeout(..., 50)` delays to double `requestAnimationFrame` for buttery-smooth scrolling on all devices.
- **Dead File Cleanup**:
  - Removed empty legacy stylesheet `css/06-dark-grading-modals.css`.

### Version 2.1.0 (September 2026)
- **Centralized Event Delegation (`src/core/events.js`)**:
  - Migrated over 290 inline `on*` handlers to document-level delegated event listeners.
- **RFC 4180 Multi-Line CSV Parser**:
  - Implemented robust quoted CSV parsing in [`src/core/utils.js`](file:///p:/apps/msu-course-manager-v2/src/core/utils.js) handling commas, quotes, and newlines.
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
- Prototype all-in-one MSU Course & Lesson Manager with spreadsheet matrix, timetable, calendar, roster, and local storage.

---

## License & Attribution
Developed for the faculty and administration of **Mindanao State University – General Santos City**.  
All rights reserved © 2026.
