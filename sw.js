// Cache ownership is limited to this repository path.
const PREFIX = 'half-coach-' + encodeURIComponent(new URL(self.registration.scope).pathname) + '-';
const VERSION = PREFIX + 'v10';
const FILES = ["./", "index.html", "app.js", "run-core.js", "plan.js", "manifest.webmanifest", "plan.ics",
  "fonts/BigShoulders.ttf", "fonts/Atkinson-Regular.ttf", "fonts/Atkinson-Bold.ttf",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
const absolute = path => new URL(path, self.registration.scope).href;
// Wait until the app asks (Update now button, blocked during a run); never activate a replacement mid-run.
self.addEventListener("message", e => { if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(absolute)))); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  if(url.pathname.endsWith('/plan.ics')) {
    e.respondWith(fetch(e.request).then(response => {
      if(response.ok) { const copy=response.clone(); e.waitUntil(caches.open(VERSION).then(cache => cache.put(absolute('plan.ics'),copy))); }
      return response;
    }).catch(() => caches.open(VERSION).then(cache => cache.match(absolute('plan.ics')))));
    return;
  }
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit=await cache.match(e.request,{ignoreSearch:true});
    if(hit) return hit;
    try { return await fetch(e.request); }
    catch(error) {
      if(e.request.mode==='navigate') return cache.match(absolute('index.html'));
      return Response.error();
    }
  }));
});
