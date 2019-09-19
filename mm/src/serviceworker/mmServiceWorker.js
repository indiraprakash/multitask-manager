
/* global workbox */

// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.core.setCacheNameDetails({prefix: "mmApp"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// Cache all successfull GET requests to the database. Those
// cached results will only be used when the database is not
// reachable. After every request the cache will be updated.

workbox.routing.registerRoute(
  new RegExp('^https://multitaskmanager-60d66.firebaseio.com/'),
  workbox.strategies.networkFirst({
    cacheName: 'mm-data-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json; charset=utf-8"
        }
      })
    ]
  })
);