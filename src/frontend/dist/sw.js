// FastDeliver Service Worker — offline shell + catalog caching
const SHELL_CACHE = "fastdeliver-shell-v1";
const DATA_CACHE = "fastdeliver-data-v1";

// App-shell assets to pre-cache on install
const SHELL_URLS = ["/", "/index.html"];

// URL patterns that should use network-first with cache fallback (catalog data)
const CATALOG_PATTERNS = ["/browse", "/api/catalog", "/api/products", "/api/companies", "/api/offers"];

// URL patterns that must ALWAYS be online (never served from cache)
const ONLINE_ONLY_PATTERNS = [
  "/orders/new",
  "/payment",
  "/api/orders",
  "/api/payments",
  "/api/tracking",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== DATA_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

function isOnlineOnly(url) {
  return ONLINE_ONLY_PATTERNS.some((p) => url.includes(p));
}

function isCatalog(url) {
  return CATALOG_PATTERNS.some((p) => url.includes(p));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and chrome-extension requests
  if (request.method !== "GET" || url.protocol === "chrome-extension:") return;

  // Online-only routes: network only, no cache fallback
  if (isOnlineOnly(url.pathname)) {
    event.respondWith(fetch(request));
    return;
  }

  // Catalog data: network-first with cache fallback
  if (isCatalog(url.pathname)) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) =>
        fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cache.match(request))
      )
    );
    return;
  }

  // Navigation requests (SPA shell): cache-first then network fallback to index.html
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(SHELL_CACHE).then((cache) =>
        cache.match("/index.html").then((cached) => cached || fetch(request))
      )
    );
    return;
  }

  // JS/CSS/images: stale-while-revalidate
  event.respondWith(
    caches.open(SHELL_CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        });
        return cached || networkFetch;
      })
    )
  );
});
