/// <reference lib="webworker" />

self.addEventListener("install", (event) => {
  const swEvent = event as ExtendableEvent;
  console.log("Service Worker installing.");
  swEvent.waitUntil(
    caches.open("static-v1").then((cache) => {
      return cache.addAll(["/", "/about", "/contact", "/icons/icon-192x192.png", "/icons/icon-512x512.png"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  const swEvent = event as ExtendableEvent;
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((response) => {
      return response || fetch(fetchEvent.request);
    })
  );
});
