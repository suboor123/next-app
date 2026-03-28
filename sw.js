const CACHE_NAME = 'site-assets-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  ''
];

// 1. Install Event: Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Force the waiting service worker to become active
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of pages immediately
});

// 3. Fetch Event: Network-First (for HTML) / Cache-First (for Assets)
self.addEventListener('fetch', (event) => {
  // Logic: Check cache first, then network. 
  // Good for performance but requires versioning CACHE_NAME to update assets.
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        // Optional: Dynamically cache new requests
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith('http')) { 
             // Only cache http/https requests (prevents chrome-extension errors)
             cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    }).catch(() => {
        // Fallback for offline (e.g., return an offline page)
    })
  );
});