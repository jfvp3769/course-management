/* =============================================================================
 * src/core/events.js
 * Centralized Event Delegation & Action Registry for Faculty Course & Lesson Manager
 * -----------------------------------------------------------------------------
 * Eliminates inline on* handlers from HTML and template strings.
 * Dispatches UI interactions via data-action attributes on document level.
 * Provides seamless fallback to global functions for zero regressions.
 * ========================================================================== */

(function () {
  'use strict';

  const ActionRegistry = new Map();
  let isInitialized = false;

  /**
   * Register one or multiple actions in the registry.
   *
   * Overloads:
   *   registerActions('namespace', { actionName: (e, target, data) => {} })
   *   registerActions({ actionName: (e, target, data) => {} })
   *
   * @param {string|Object} namespaceOrMap
   * @param {Object} [actionMap]
   */
  function registerActions(namespaceOrMap, actionMap) {
    const map = (typeof namespaceOrMap === 'string') ? actionMap : namespaceOrMap;
    if (!map || typeof map !== 'object') return;

    for (const [name, fn] of Object.entries(map)) {
      if (typeof fn === 'function') {
        ActionRegistry.set(name, fn);
      }
    }
  }

  /**
   * Dispatch an action by name.
   *
   * @param {string} actionName
   * @param {Event} e
   * @param {HTMLElement} target
   * @param {string} eventType
   * @returns {boolean} Whether an action was executed
   */
  function dispatchAction(actionName, e, target, eventType) {
    if (!actionName) return false;

    if (target.dataset.stopPropagation === 'true') {
      e.stopPropagation();
    }
    if (target.dataset.preventDefault === 'true' || eventType === 'submit') {
      e.preventDefault();
    }

    // 1. Check ActionRegistry first
    const handler = ActionRegistry.get(actionName);
    if (typeof handler === 'function') {
      handler(e, target, target.dataset);
      return true;
    }

    // 2. Graceful fallback to global function (supports progressive migration)
    if (typeof window[actionName] === 'function') {
      window[actionName](e, target, target.dataset);
      return true;
    }

    console.warn(`[AppEvents] Unhandled action "${actionName}" for event "${eventType}"`, target);
    return false;
  }

  /**
   * Initialize delegated event listeners on the document.
   * Safe to call multiple times (idempotent).
   */
  function initEventDelegation() {
    if (isInitialized) return;
    isInitialized = true;

    // 1. Click events
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      dispatchAction(target.dataset.action, e, target, 'click');
    });

    // 2. Change events (selects, checkboxes, file inputs)
    document.addEventListener('change', (e) => {
      const target = e.target.closest('[data-action-change], select[data-action], input[data-action]');
      if (!target) return;
      const action = target.dataset.actionChange || target.dataset.action;
      dispatchAction(action, e, target, 'change');
    });

    // 3. Input events (live search, dynamic score entries)
    document.addEventListener('input', (e) => {
      const target = e.target.closest('[data-action-input]');
      if (!target) return;
      dispatchAction(target.dataset.actionInput, e, target, 'input');
    });

    // 4. Submit events (forms)
    document.addEventListener('submit', (e) => {
      const target = e.target.closest('form[data-action-submit], form[data-action]');
      if (!target) return;
      const action = target.dataset.actionSubmit || target.dataset.action;
      dispatchAction(action, e, target, 'submit');
    });

    // 5. Keydown events (grid navigation)
    document.addEventListener('keydown', (e) => {
      const target = e.target.closest('[data-action-keydown]');
      if (!target) return;
      dispatchAction(target.dataset.actionKeydown, e, target, 'keydown');
    });

    // 6. Drag & drop events (gradebook column drag reordering)
    document.addEventListener('dragstart', (e) => {
      const target = e.target.closest('[data-action-dragstart]');
      if (target) dispatchAction(target.dataset.actionDragstart, e, target, 'dragstart');
    });
    document.addEventListener('dragover', (e) => {
      const target = e.target.closest('[data-action-dragover]');
      if (target) dispatchAction(target.dataset.actionDragover, e, target, 'dragover');
    });
    document.addEventListener('dragleave', (e) => {
      const target = e.target.closest('[data-action-dragleave]');
      if (target) dispatchAction(target.dataset.actionDragleave, e, target, 'dragleave');
    });
    document.addEventListener('drop', (e) => {
      const target = e.target.closest('[data-action-drop]');
      if (target) dispatchAction(target.dataset.actionDrop, e, target, 'drop');
    });
    document.addEventListener('dragend', (e) => {
      const target = e.target.closest('[data-action-dragend]');
      if (target) dispatchAction(target.dataset.actionDragend, e, target, 'dragend');
      if (typeof window.handleMatrixCardDragEnd === 'function') {
        window.handleMatrixCardDragEnd(e);
      }
    });

    // 7. Mousedown events (e.g. column resizers)
    document.addEventListener('mousedown', (e) => {
      const target = e.target.closest('[data-action-mousedown]');
      if (!target) return;
      dispatchAction(target.dataset.actionMousedown, e, target, 'mousedown');
    });

    // 8. Focus & Blur events (using bubbling focusin/focusout)
    document.addEventListener('focusin', (e) => {
      const target = e.target.closest('[data-action-focus]');
      if (!target) return;
      dispatchAction(target.dataset.actionFocus, e, target, 'focus');
    });
    document.addEventListener('focusout', (e) => {
      const target = e.target.closest('[data-action-blur]');
      if (!target) return;
      dispatchAction(target.dataset.actionBlur, e, target, 'blur');
    });
  }

  const AppEvents = {
    registerActions,
    dispatchAction,
    initEventDelegation,
    registry: ActionRegistry
  };

  // Export globally
  window.AppEvents = {
    registerActions,
    dispatchAction,
    initEventDelegation,
    registry: ActionRegistry
  };

  // Shortcut alias
  window.registerActions = registerActions;

  // Built-in common action adapters for shell and modals
  registerActions('core', {
    clickTarget: (e, target, data) => {
      if (!data.target) return;
      const el = document.getElementById(data.target);
      if (el) el.click();
    },
    switchTab: (e, target, data) => {
      if (typeof window.switchTab === 'function') window.switchTab(data.tab);
    },
    toggleTabSidebar: (e, target, data) => {
      if (typeof window.toggleTabSidebar === 'function') window.toggleTabSidebar(data.tab);
    },
    navigateWeek: (e, target, data) => {
      if (typeof window.navigateWeek === 'function') window.navigateWeek(parseInt(data.delta, 10) || 0);
    },
    setRadarFilter: (e, target, data) => {
      if (typeof window.setRadarFilter === 'function') window.setRadarFilter(data.filter);
    },
    setCalendarTypeFilter: (e, target, data) => {
      if (typeof window.setCalendarTypeFilter === 'function') window.setCalendarTypeFilter(data.filter);
    },
    toggleCalendarTypeDropdown: (e) => {
      if (typeof window.toggleCalendarTypeDropdown === 'function') window.toggleCalendarTypeDropdown(e);
    },
    setGradeDistScaleMode: (e, target, data) => {
      if (typeof window.setGradeDistScaleMode === 'function') window.setGradeDistScaleMode(data.mode);
    },
    setNoClassMode: (e, target, data) => {
      if (typeof window.setNoClassMode === 'function') window.setNoClassMode(data.mode);
    },
    switchExportImportTab: (e, target, data) => {
      if (typeof window.switchExportImportTab === 'function') window.switchExportImportTab(data.tab);
    },
    openUserGuideModal: (e, target, data) => {
      if (typeof window.openUserGuideModal === 'function') window.openUserGuideModal(data?.tab || 'setup');
    },
    closeUserGuideModal: () => {
      if (typeof window.closeUserGuideModal === 'function') window.closeUserGuideModal();
    },
    toggleGuideMinimize: () => {
      if (typeof window.toggleGuideMinimize === 'function') window.toggleGuideMinimize();
    },
    switchGuideTab: (e, target) => {
      if (typeof window.switchGuideTab === 'function') window.switchGuideTab(target.value);
    },
    navigateGuideStep: (e, target, data) => {
      if (typeof window.navigateGuideStep === 'function') window.navigateGuideStep(parseInt(data.step, 10) || 0);
    },
    filterVaultTips: (e, target, data) => {
      if (typeof window.filterVaultTips === 'function') window.filterVaultTips(data.category);
    },
    updateEventTermInputs: (e, target, data) => {
      if (typeof window.updateEventTermInputs === 'function') window.updateEventTermInputs(data.term || target.value);
    },
    onGradingScaleScopeChange: (e, target, data) => {
      if (typeof window.onGradingScaleScopeChange === 'function') window.onGradingScaleScopeChange();
    },
    onGradingScaleModeChange: (e, target, data) => {
      if (typeof window.onGradingScaleModeChange === 'function') window.onGradingScaleModeChange(data.mode || target.value);
    },
    snoozeBackupReminder: (e, target, data) => {
      if (typeof window.snoozeBackupReminder === 'function') window.snoozeBackupReminder(parseInt(data.days, 10) || 3);
    },
    dismissBackupReminderBanner: (e, target, data) => {
      if (typeof window.dismissBackupReminderBanner === 'function') window.dismissBackupReminderBanner(data.remember === 'true');
    },
    toggleRosterSort: (e, target, data) => {
      if (typeof window.toggleRosterSort === 'function') window.toggleRosterSort(data.col);
    },
    closeModalOnBackdrop: (e, target, data) => {
      if (e.target !== target) return;
      const modalId = data.modal;
      if (!modalId) return;
      if (modalId === 'lost-days-modal' && typeof window.closeLostDaysModal === 'function') window.closeLostDaysModal();
      else if (modalId === 'feedback-modal' && typeof window.closeFeedbackModal === 'function') window.closeFeedbackModal();
      else if (modalId === 'tips-modal' && typeof window.closeTipsModal === 'function') window.closeTipsModal();
      else if (modalId === 'easter-egg-modal' && typeof window.closeEasterEggModal === 'function') window.closeEasterEggModal();
      else if (modalId === 'theme-settings-modal' && typeof window.closeThemeModal === 'function') window.closeThemeModal();
      else {
        const el = document.getElementById(modalId);
        if (el) el.classList.add('hidden');
      }
    },
    closeAndOpen: (e, target, data) => {
      if (data.close) {
        const el = document.getElementById(data.close);
        if (el) el.classList.add('hidden');
      }
      if (data.open) {
        if (data.open === 'bulk-import-modal' && typeof window.openBulkImportModal === 'function') window.openBulkImportModal();
        else if (data.open === 'user-guide-modal' && typeof window.openUserGuideModal === 'function') window.openUserGuideModal();
        else {
          const el = document.getElementById(data.open);
          if (el) el.classList.remove('hidden');
        }
      }
    },
    importBackupAndClose: (e) => {
      if (typeof window.importBackupJSON === 'function') window.importBackupJSON(e);
      if (typeof window.closeExportImportModal === 'function') window.closeExportImportModal();
    },
    noop: () => {},
    // Courses
    moveSubjectOrder: (e, target, data) => {
      if (typeof window.moveSubjectOrder === 'function') window.moveSubjectOrder(parseInt(data.subIdx, 10), parseInt(data.dir, 10));
    },
    openEditSubjectModal: (e, target, data) => {
      if (typeof window.openEditSubjectModal === 'function') window.openEditSubjectModal(data.code);
    },
    requestRemoveSubject: (e, target, data) => {
      if (typeof window.requestRemoveSubject === 'function') window.requestRemoveSubject(data.code);
    },
    openAddSectionModal: (e, target, data) => {
      if (typeof window.openAddSectionModal === 'function') window.openAddSectionModal(data.code);
    },
    moveSectionOrder: (e, target, data) => {
      if (typeof window.moveSectionOrder === 'function') window.moveSectionOrder(parseInt(data.subIdx, 10), parseInt(data.secIdx, 10), parseInt(data.dir, 10));
    },
    openEditSectionModal: (e, target, data) => {
      if (typeof window.openEditSectionModal === 'function') window.openEditSectionModal(data.code, data.sec);
    },
    requestRemoveSection: (e, target, data) => {
      if (typeof window.requestRemoveSection === 'function') window.requestRemoveSection(data.code, data.sec);
    },
    // Grading Criteria & Scale
    updateGradingCategoryField: (e, target, data) => {
      if (typeof window.updateGradingCategoryField === 'function') window.updateGradingCategoryField(parseInt(data.catIdx, 10), data.field, target.value);
    },
    removeGradingCategory: (e, target, data) => {
      if (typeof window.removeGradingCategory === 'function') window.removeGradingCategory(parseInt(data.catIdx, 10));
    },
    autoBalanceCategorySubActivities: (e, target, data) => {
      if (typeof window.autoBalanceCategorySubActivities === 'function') window.autoBalanceCategorySubActivities(parseInt(data.catIdx, 10));
    },
    addGradingSubActivity: (e, target, data) => {
      if (typeof window.addGradingSubActivity === 'function') window.addGradingSubActivity(parseInt(data.catIdx, 10));
    },
    updateGradingSubActivityField: (e, target, data) => {
      if (typeof window.updateGradingSubActivityField === 'function') window.updateGradingSubActivityField(parseInt(data.catIdx, 10), parseInt(data.subIdx, 10), data.field, target.value);
    },
    removeGradingSubActivity: (e, target, data) => {
      if (typeof window.removeGradingSubActivity === 'function') window.removeGradingSubActivity(parseInt(data.catIdx, 10), parseInt(data.subIdx, 10));
    },
    updateGradingScaleItemMin: (e, target, data) => {
      if (typeof window.updateGradingScaleItemMin === 'function') window.updateGradingScaleItemMin(data.grade, target.value);
    },
    // No-Class
    removeNoClassDay: (e, target, data) => {
      if (typeof window.removeNoClassDay === 'function') window.removeNoClassDay(data.date);
    },
    // Calendar
    openEditCalendarEvent: (e, target, data) => {
      if (typeof window.openEditCalendarEvent === 'function') window.openEditCalendarEvent(parseInt(data.idx, 10));
    },
    deleteCalendarEventByIndex: (e, target, data) => {
      if (typeof window.deleteCalendarEventByIndex === 'function') window.deleteCalendarEventByIndex(parseInt(data.idx, 10));
    },
    jumpToCalendarEvent: (e, target, data) => {
      if (typeof window.jumpToCalendarEvent === 'function') window.jumpToCalendarEvent(parseInt(data.idx, 10));
    },
    openLostDaysModal: (e, target, data) => {
      if (typeof window.openLostDaysModal === 'function') window.openLostDaysModal(data.course, data.section);
    },
    // Classroom
    openClassroomModal: (e, target, data) => {
      if (typeof window.openClassroomModal === 'function') window.openClassroomModal(data.course, data.section);
    },
    // Roster
    sendIndividualStudentEmail: (e, target, data) => {
      if (typeof window.sendIndividualStudentEmail === 'function') window.sendIndividualStudentEmail(data.email, data.section, data.first, data.last);
    },
    removeStudent: (e, target, data) => {
      if (typeof window.removeStudent === 'function') window.removeStudent(data.id, data.section);
    },
    selectRosterSection: (e, target, data) => {
      if (typeof window.selectRosterSection === 'function') window.selectRosterSection(data.section);
    },
    // Lesson Planner Modal Actions
    closeLessonModal: () => {
      if (typeof window.closeLessonModal === 'function') window.closeLessonModal();
    },
    saveLessonModalData: () => {
      if (typeof window.saveLessonModalData === 'function') window.saveLessonModalData();
    },
    clearLessonModalData: () => {
      if (typeof window.clearLessonModalData === 'function') window.clearLessonModalData();
    },
    removeNoClassFromModal: () => {
      if (typeof window.removeNoClassFromModal === 'function') window.removeNoClassFromModal();
    },
    markMeetingAsNoClassAndShift: () => {
      if (typeof window.markMeetingAsNoClassAndShift === 'function') window.markMeetingAsNoClassAndShift();
    },
    pullBackScheduleFromModal: () => {
      if (typeof window.pullBackScheduleFromModal === 'function') window.pullBackScheduleFromModal();
    },
    moveToNextViableSlotFromModal: () => {
      if (typeof window.moveToNextViableSlotFromModal === 'function') window.moveToNextViableSlotFromModal();
    },
    // Planner Matrix
    initColumnResize: (e, target, data) => {
      if (typeof window.initColumnResize === 'function') window.initColumnResize(e, data.col);
    },
    openLessonModal: (e, target, data) => {
      if (typeof isDraggingMatrixCard !== 'undefined' && isDraggingMatrixCard) return;
      if (typeof window.openLessonModal === 'function') window.openLessonModal(data.date, data.course, data.section, data.weekend === 'true');
    },
    handleMatrixCardDragStart: (e, target, data) => {
      if (typeof window.handleMatrixCardDragStart === 'function') window.handleMatrixCardDragStart(e, target, data);
    },
    handleMatrixCardDragEnd: (e, target, data) => {
      if (typeof window.handleMatrixCardDragEnd === 'function') window.handleMatrixCardDragEnd(e, target, data);
    },
    handleMatrixCellDragOver: (e, target, data) => {
      if (typeof window.handleMatrixCellDragOver === 'function') window.handleMatrixCellDragOver(e, target, data);
    },
    handleMatrixCellDragLeave: (e, target, data) => {
      if (typeof window.handleMatrixCellDragLeave === 'function') window.handleMatrixCellDragLeave(e, target, data);
    },
    handleMatrixCellDrop: (e, target, data) => {
      if (typeof window.handleMatrixCellDrop === 'function') window.handleMatrixCellDrop(e, target, data);
    },
    copyMatrixActivity: (e, target, data) => {
      if (typeof window.copyMatrixActivity === 'function') window.copyMatrixActivity(data.date, data.course, data.section, e);
    },
    pasteMatrixActivity: (e, target, data) => {
      if (typeof window.pasteMatrixActivity === 'function') window.pasteMatrixActivity(data.date, data.course, data.section, e);
    },
    openEventEditorModal: (e, target, data) => {
      if (typeof window.openEventEditorModal === 'function') window.openEventEditorModal(data.date);
    },
    jumpToMatrixDate: (e, target, data) => {
      if (typeof window.jumpToMatrixDate === 'function') window.jumpToMatrixDate(data.date, data.course || '', data.section || '', data.isSchool === 'true');
    },
    // Gradebook Table & Sorting
    toggleGradebookSort: (e, target, data) => {
      if (typeof window.toggleGradebookSort === 'function') window.toggleGradebookSort(data.sort);
    },
    toggleGradebookCategoryCollapse: (e, target, data) => {
      if (typeof window.toggleGradebookCategoryCollapse === 'function') window.toggleGradebookCategoryCollapse(data.catId);
    },
    handleCategoryDragStart: (e, target, data) => {
      if (typeof window.handleCategoryDragStart === 'function') window.handleCategoryDragStart(e, parseInt(data.catIdx, 10));
    },
    handleCategoryDragOver: (e, target) => {
      e.preventDefault();
      target.classList.add('grade-cat-drag-over');
    },
    handleCategoryDragLeave: (e, target) => {
      target.classList.remove('grade-cat-drag-over');
    },
    handleCategoryDrop: (e, target, data) => {
      if (typeof window.handleCategoryDrop === 'function') window.handleCategoryDrop(e, parseInt(data.catIdx, 10));
    },
    selectOnFocus: (e, target) => {
      if (typeof target.select === 'function') target.select();
    },
    handleGradeGridKey: (e, target, data) => {
      if (typeof window.handleGradeGridKey === 'function') window.handleGradeGridKey(e, parseInt(data.row, 10), parseInt(data.col, 10));
    },
    updateDynamicScore: (e, target, data) => {
      if (typeof window.updateDynamicScore === 'function') window.updateDynamicScore(data.student, data.sub, target.value, false);
    },
    updateDynamicScoreCommit: (e, target, data) => {
      if (typeof window.updateDynamicScore === 'function') window.updateDynamicScore(data.student, data.sub, target.value, true);
    },
    updateGradeStatusOverride: (e, target, data) => {
      if (typeof window.updateGradeStatusOverride === 'function') window.updateGradeStatusOverride(data.student, target.value);
    },
    resetGradebookFilters: () => {
      if (typeof window.resetGradebookFilters === 'function') window.resetGradebookFilters();
    },
    // Gradebook Sidebar
    highlightStudentScoreError: (e, target, data) => {
      if (typeof window.highlightStudentScoreError === 'function') window.highlightStudentScoreError(data.studentId, data.subId, data.section);
    },
    highlightStudentInGradebook: (e, target, data) => {
      if (typeof window.highlightStudentInGradebook === 'function') window.highlightStudentInGradebook(data.studentId, data.section);
    },
    filterGradebookByCohort: (e, target, data) => {
      if (typeof window.filterGradebookByCohort === 'function') {
        const ids = data.studentIds ? data.studentIds.split(',').filter(Boolean) : [];
        window.filterGradebookByCohort(ids, data.cohortLabel);
      }
    },
    // Timetable Sidebar
    setAgendaDay: (e, target, data) => {
      if (typeof window.setAgendaDay === 'function') window.setAgendaDay(data.day);
    },
    highlightTimetableClass: (e, target, data) => {
      if (typeof window.highlightTimetableClass === 'function') window.highlightTimetableClass(data.course, data.section, data.day);
    },
    // UI Theme & Easter Egg
    selectColorTheme: (e, target, data) => {
      if (typeof window.selectColorTheme === 'function') window.selectColorTheme(data.mode, data.theme);
    },
    selectHeaderTheme: (e, target, data) => {
      if (typeof window.selectHeaderTheme === 'function') window.selectHeaderTheme(data.theme || target.dataset.theme);
    },
    selectWindowTheme: (e, target, data) => {
      if (typeof window.selectWindowTheme === 'function') window.selectWindowTheme(data.theme || target.dataset.theme);
    },
    onCustomHeaderColorInput: (e, target, data) => {
      if (typeof window.onCustomHeaderColorInput === 'function') window.onCustomHeaderColorInput(data.type, target.value);
    },
    onCustomWindowColorInput: (e, target, data) => {
      if (typeof window.onCustomWindowColorInput === 'function') window.onCustomWindowColorInput(data.type, target.value);
    },
    resetThemePalettes: () => {
      if (typeof window.resetThemePalettes === 'function') window.resetThemePalettes();
    },
    openThemeModal: () => {
      if (typeof window.openThemeModal === 'function') window.openThemeModal();
    },
    closeThemeModal: () => {
      if (typeof window.closeThemeModal === 'function') window.closeThemeModal();
    },
    saveThemeSettings: () => {
      if (typeof window.saveThemeSettings === 'function') window.saveThemeSettings();
    },
    setThemeMode: (e, target, data) => {
      if (typeof window.setThemeMode === 'function') window.setThemeMode(data.mode || target.dataset.mode);
    },
    clearVaultSearch: () => {
      const input = document.getElementById('vault-search-input');
      if (input) input.value = '';
      if (typeof window.searchVaultTips === 'function') window.searchVaultTips();
    }
  });

  // Auto-initialize as soon as DOM is interactive or ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initEventDelegation);
    } else {
      initEventDelegation();
    }
  }
})();