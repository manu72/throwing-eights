// Cache name with version - update version when resources change
const CACHE_NAME = "flappy-game-cache-v1";

// Resources to cache - using relative paths
const RESOURCES_TO_CACHE = [
  "./",
  "./index.html",
  "./flappygame.html",
  "./about.html",
  "./assets/css/main.css",
  "./assets/css/font-awesome.min.css",
  "./assets/css/self-hosted-fonts.css",
  "./assets/js/jquery.min.js",
  "./assets/js/jquery.scrolly.min.js",
  "./assets/js/jquery.scrollex.min.js",
  "./assets/js/skel.min.js",
  "./assets/js/util.js",
  "./assets/js/main.js",
  "./bg.jpg",
  "./pam.png",
  "./coin.mp3",
  "./squawk.mp3",
  "./images/banner2.jpg",
  "./assets/fonts/google/lobster.woff2",
  "./assets/fonts/google/opensans.woff2",
  "./assets/fonts/google/opensans-bold.woff2",
  "./assets/fonts/google/opensans-light.woff2",
  "./assets/fonts/google/opensans-semibold.woff2",
  "./assets/fonts/google/opensans-extrabold.woff2",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(RESOURCES_TO_CACHE);
      })
      .catch((error) => {
        console.error("Error during service worker installation:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request
      const fetchRequest = event.request.clone();

      // Make network request and cache the response
      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Open cache and store response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // You can return a custom offline page here if needed
        });
    })
  );
});
