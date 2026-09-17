/* =============================================================================
 * SERVICE WORKER - offline shell for the MSU-GSC Course & Lesson Manager
 * -----------------------------------------------------------------------------
 * Changes from the previous version:
 *
 *   1. The asset list referenced "./app.js", which no longer exists after the
 *      split. It is now generated from the same module order index.html uses.
 *
 *   2. `cache.addAll()` rejects the WHOLE install if any single entry 404s.
 *      The old list included "./msu-logo.png", which is optional, so a missing
 *      logo silently disabled offline support entirely. Assets are now cached
 *      individually and a miss is logged rather than fatal.
 *
 *   3. The old fetch handler was cache-first with no revalidation, so a user
 *      who had ever loaded the app could never receive an update. Navigations
 *      now use network-first (falling back to the cached shell when offline),
 *      while static assets stay cache-first for speed.
 *
 * Bump CACHE_NAME on every release; `activate` purges older caches.
 * ========================================================================== */

const CACHE_NAME = 'msu-gsc-manager-v2.00';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './tailwind.cdn.js',
  './pdf.min.js',
  './pdf.worker.min.js'
];

// Must stay in sync with the <script> order in index.html.
const MODULES = [
  './src/core/tips-data.js',
  './src/core/constants.js',
  './src/core/state.js',
  './src/core/utils.js',
  './src/core/render.js',
  './src/core/storage.js',
  './src/core/backup-reminder.js',
  './src/features/semester.js',
  './src/features/classroom.js',
  './src/features/planner-matrix.js',
  './src/features/timetable.js',
  './src/features/calendar.js',
  './src/features/branding.js',
  './src/features/timetable-editor.js',
  './src/features/courses.js',
  './src/features/lesson-planner.js',
  './src/features/no-class.js',
  './src/features/roster.js',
  './src/features/gradebook.js',
  './src/features/grading-scale.js',
  './src/features/grading-criteria.js',
  './src/features/present-week.js',
  './src/io/data-center.js',
  './src/ui/tabs.js',
  './src/ui/color-picker.js',
  './src/ui/sidebars.js',
  './src/ui/guide.js',
  './src/ui/tips.js',
  './src/ui/easter-egg.js',
  './src/ui/theme.js',
  './src/ui/feedback.js',
  './src/ui/layout.js',
  './src/sidebars/planner.js',
  './src/sidebars/timetable.js',
  './src/sidebars/calendar.js',
  './src/sidebars/roster.js',
  './src/sidebars/gradebook.js',
  './src/bootstrap.js'
];

// Nice to have, but never fatal if absent.
const OPTIONAL = ['./msu-logo.png'];

const REQUIRED = [...SHELL, ...MODULES];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(
        [...REQUIRED, ...OPTIONAL].map((url) => cache.add(url))
      );
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          const url = [...REQUIRED, ...OPTIONAL][i];
          const fatal = REQUIRED.includes(url);
          console[fatal ? 'error' : 'warn'](`[sw] could not cache ${url}`, r.reason);
        }
      });
      await self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Navigations: network-first so a deployed update is picked up immediately,
  // with the cached shell as the offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Static assets: cache-first, refreshing the entry in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
