/* ===========================================================================
 * SIDEBAR SHELL
 * ---------------------------------------------------------------------------
 * Open/close behaviour, backdrop syncing, draggable widget ordering, and the
 * dispatcher that routes each tab to its own sidebar updater.
 * ======================================================================== */

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
    if (tabId === 'planner' && typeof window !== 'undefined' && window._plannerSidebarStale) {
      updatePlannerSidebar();
    }
  } else {
    sidebar.classList.remove('tab-sidebar-expanded');
    sidebar.classList.add('tab-sidebar-collapsed');
    const c = sidebar.closest('.tab-layout-container'); if(c) { c.classList.remove('sidebar-expanded'); c.classList.add('sidebar-collapsed'); }
    localStorage.setItem('sidebar_collapsed_' + tabId, '1');
    updateSidebarToggleButton(tabId, true);
  }
  if (typeof autoResizeContentWindows === 'function') setTimeout(autoResizeContentWindows, 50);
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

  // 1. Restore widget vertical ordering with stale ID cleanup
  try {
    const savedOrder = JSON.parse(localStorage.getItem(`widget_order_${sidebarId}`) || '[]');
    if (Array.isArray(savedOrder) && savedOrder.length > 0) {
      const currentValidIds = widgets.map(el => el.id);
      savedOrder.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.parentElement === sidebar) sidebar.appendChild(el);
      });
      const sanitized = savedOrder.filter(id => currentValidIds.includes(id));
      if (sanitized.length !== savedOrder.length) {
        localStorage.setItem(`widget_order_${sidebarId}`, JSON.stringify(sanitized));
      }
    }
  } catch (err) {}

  // 2. Restore saved user-resized heights
  widgets.forEach(w => {
    const savedHeight = localStorage.getItem(`widget_height_${w.id}`);
    if (savedHeight) {
      const numH = parseInt(savedHeight, 10);
      if ((w.id === 'planner-widget-next-activities' && numH < 120) || numH < 70) {
        w.style.height = '';
        localStorage.removeItem(`widget_height_${w.id}`);
      } else {
        w.style.height = savedHeight;
      }
    }
  });

  // 3. Attach drag-reorder and double-click height reset
  if (!sidebar.dataset.dragOverInit) {
    sidebar.dataset.dragOverInit = 'true';
    sidebar.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggingEl = sidebar.querySelector('.is-being-dragged');
      if (draggingEl && e.target === sidebar) {
        sidebar.appendChild(draggingEl);
      }
    });
  }

  widgets.forEach(w => {
    const handle = w.querySelector('.widget-drag-handle') || w.firstElementChild;
    if (handle) {
      handle.classList.add('widget-drag-handle');
      handle.setAttribute('draggable', 'true');
      handle.setAttribute('title', 'Drag to rearrange • Double-click header to reset height');
    }

    if (w.dataset.dragInit === 'true') return;
    w.dataset.dragInit = 'true';

    if (handle) {
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

      const onDragEnd = () => {
        sidebar.classList.remove('is-dragging');
        w.classList.remove('is-being-dragged');
        sidebar.querySelectorAll('.widget-drag-over').forEach(el => el.classList.remove('widget-drag-over'));
        const currentIds = Array.from(sidebar.querySelectorAll(':scope > div[id]')).map(el => el.id);
        localStorage.setItem(`widget_order_${sidebarId}`, JSON.stringify(currentIds));
      };

      handle.addEventListener('dragend', onDragEnd);
      w.addEventListener('dragend', onDragEnd);
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

  // 4. Attach Full-Width Bottom Resizer to each widget card for effortless vertical height adjustment
  widgets.forEach(w => {
    if (!w.querySelector('.widget-bottom-resizer')) {
      const resizer = document.createElement('div');
      resizer.className = 'widget-bottom-resizer';
      resizer.title = 'Drag bottom edge to adjust height • Double-click to reset';
      resizer.innerHTML = '<div class="widget-resizer-grip"></div>';

      resizer.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const startY = e.clientY;
        const startH = w.getBoundingClientRect().height;
        const minH = (w.id === 'planner-widget-next-activities') ? 110 : 70;
        const maxH = Math.max(minH, Math.floor(window.innerHeight * 0.88));

        try {
          resizer.setPointerCapture(e.pointerId);
        } catch (err) {}

        document.body.classList.add('resizing-widget-active');
        w.classList.add('widget-resizing');

        let targetH = startH;
        let rafId = null;

        const applyHeight = () => {
          rafId = null;
          w.style.height = targetH + 'px';
        };

        const onPointerMove = (moveEv) => {
          const deltaY = moveEv.clientY - startY;
          targetH = Math.min(maxH, Math.max(minH, Math.round(startH + deltaY)));
          if (!rafId) {
            rafId = requestAnimationFrame(applyHeight);
          }
        };

        const onPointerUp = () => {
          if (rafId) {
            cancelAnimationFrame(rafId);
            applyHeight();
          }
          try {
            if (resizer.hasPointerCapture(e.pointerId)) {
              resizer.releasePointerCapture(e.pointerId);
            }
          } catch (err) {}
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointercancel', onPointerUp);
          resizer.removeEventListener('pointermove', onPointerMove);
          resizer.removeEventListener('pointerup', onPointerUp);
          resizer.removeEventListener('lostpointercapture', onPointerUp);
          document.body.classList.remove('resizing-widget-active');
          w.classList.remove('widget-resizing');
          if (w.style.height) {
            localStorage.setItem(`widget_height_${w.id}`, w.style.height);
          }
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
        resizer.addEventListener('pointermove', onPointerMove, { passive: true });
        resizer.addEventListener('pointerup', onPointerUp);
        resizer.addEventListener('lostpointercapture', onPointerUp);
      });

      resizer.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        if (w.style.height) {
          w.style.height = '';
          localStorage.removeItem(`widget_height_${w.id}`);
          showToast('Reset widget height to default.');
        }
      });

      w.appendChild(resizer);
    }
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
}

function updateTabSidebar(tabId) {
  if (tabId === 'planner') updatePlannerSidebar();
  if (tabId === 'timetable') updateTimetableSidebar();
  if (tabId === 'calendar') updateCalendarSidebar();
  if (tabId === 'roster') updateRosterSidebar();
  if (tabId === 'gradebook') updateGradebookSidebar();
  initDraggableSidebarWidgets('sidebar-' + tabId);
}

function updateAllSidebars() {
  updatePlannerSidebar();
  updateTimetableSidebar();
  updateCalendarSidebar();
  updateRosterSidebar();
  updateGradebookSidebar();
}
