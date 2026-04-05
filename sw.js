// // --- Configuration ---
// const CACHE_VERSION = 'v1';
// const CORE_CACHE = `core-cache-${CACHE_VERSION}`;
// const DYNAMIC_CACHE = `dynamic-cache-${CACHE_VERSION}`;
// const IMAGE_CACHE = `image-cache-${CACHE_VERSION}`;

// // The URLs you provided, plus an offline fallback page if you create one
// const PRECACHE_URLS = [
//   '/',
//   '/about',
//   '/projects',
//   '/blogs',
//   '/performance',
//   '/resume',
//   '/contact',
// ];

// // Limit the number of items in a cache (to avoid eating up user storage)
// const limitCacheSize = (cacheName, maxItems) => {
//   caches.open(cacheName).then(cache => {
//     cache.keys().then(keys => {
//       if (keys.length > maxItems) {
//         cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
//       }
//     });
//   });
// };

// // --- Lifecycle Events ---

// // 1. Install Event: Precache core assets
// self.addEventListener('install', (event) => {
//   console.log('[Service Worker] Installing...');
//   event.waitUntil(
//     caches.open(CORE_CACHE)
//       .then((cache) => {
//         console.log('[Service Worker] Precaching App Shell');
//         return cache.addAll(PRECACHE_URLS);
//       })
//       .then(() => self.skipWaiting()) // Force the waiting service worker to become the active service worker
//   );
// });

// // 2. Activate Event: Clean up old caches
// self.addEventListener('activate', (event) => {
//   console.log('[Service Worker] Activating...');
//   const activeCaches = [CORE_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!activeCaches.includes(cacheName)) {
//             console.log('[Service Worker] Deleting old cache:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//     .then(() => self.clients.claim()) // Claim control of all open clients immediately
//   );
// });

// // --- Fetch Event & Caching Strategies ---

// self.addEventListener('fetch', (event) => {
//   // Ignore non-GET requests and external API calls (modify as needed)
//   if (event.request.method !== 'GET') return;

//   const url = new URL(event.request.url);

//   // Strategy 1: Network First, falling back to Cache
//   // Best for HTML documents/pages to ensure the user gets the freshest content.
//   if (event.request.mode === 'navigate' || event.request.headers.get('accept').includes('text/html')) {
//     event.respondWith(
//       fetch(event.request)
//         .then((networkResponse) => {
//           // Put a copy of the new network response in the dynamic cache
//           return caches.open(DYNAMIC_CACHE).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             limitCacheSize(DYNAMIC_CACHE, 50);
//             return networkResponse;
//           });
//         })
//         .catch(() => {
//           // If network fails, try the cache
//           return caches.match(event.request).then((cachedResponse) => {
//             if (cachedResponse) {
//               return cachedResponse;
//             }
//             // Optional: return an offline fallback page here if cache also fails
//             // return caches.match('/offline.html');
//           });
//         })
//     );
//     return;
//   }

//   // Strategy 2: Cache First, falling back to Network
//   // Best for Images, Fonts, and static assets that rarely change.
//   if (event.request.destination === 'image' || event.request.destination === 'font') {
//     const targetCache = event.request.destination === 'image' ? IMAGE_CACHE : DYNAMIC_CACHE;
    
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse; // Return from cache immediately
//         }
        
//         // If not in cache, fetch from network
//         return fetch(event.request).then((networkResponse) => {
//           return caches.open(targetCache).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             if (event.request.destination === 'image') {
//               limitCacheSize(IMAGE_CACHE, 60); // Keep max 60 images cached
//             }
//             return networkResponse;
//           });
//         });
//       })
//     );
//     return;
//   }

//   // Strategy 3: Stale-While-Revalidate
//   // Best for CSS and JS files. Serves the cached version instantly, but fetches a fresh copy in the background to use next time.
//   if (event.request.destination === 'style' || event.request.destination === 'script') {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         const fetchPromise = fetch(event.request).then((networkResponse) => {
//           caches.open(DYNAMIC_CACHE).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             limitCacheSize(DYNAMIC_CACHE, 50);
//           });
//           return networkResponse;
//         });
        
//         // Return cached response immediately if available, otherwise wait for network
//         return cachedResponse || fetchPromise; 
//       })
//     );
//     return;
//   }
// });