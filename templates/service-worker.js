const timestamp = '__timestamp__';
const ASSETS = `cache${timestamp}`;

// `shell` is an array of all the files generated by webpack,
// `assets` is an array of everything in the `assets` directory
const to_cache = __shell__.concat(__assets__);
const cached = new Set(to_cache);

// `routes` is an array of `{ pattern: RegExp }` objects that
// match the pages in your app
const routes = __routes__;

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(ASSETS)
      .then(cache => cache.addAll(to_cache))
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(async keys => {
      // delete old caches
      for (const key of keys) {
        if (key !== ASSETS) await caches.delete(key);
      }

      await self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // don't try to handle e.g. data: URIs
  if (!url.protocol.startsWith('http')) return;

  // always serve assets and webpack-generated files from cache
  if (cached.has(url.pathname)) {
    event.respondWith(caches.match(event.request));
    return;
  }

  // for pages, you might want to serve a shell `index.html` file,
  // which Sapper has generated for you. It's not right for every
  // app, but if it's right for yours then uncomment this section
  /*
  if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
    event.respondWith(caches.match('/index.html'));
    return;
  }
  */

  // for everything else, try the network first, falling back to
  // cache if the user is offline. (If the pages never change, you
  // might prefer a cache-first approach to a network-first one.)
  event.respondWith(
    caches
      .open(`offline${timestamp}`)
      .then(async cache => {
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch(err) {
          const response = await cache.match(event.request);
          if (response) return response;

          throw err;
        }
      })
  );
});
