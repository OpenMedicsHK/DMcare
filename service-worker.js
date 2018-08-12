importScripts('workbox-sw.prod.v2.1.1.js')

// Create Workbox service worker instance
const workboxSW = new WorkboxSW({ clientsClaim: true })
const cacheParams = (name) => {
return {
    cacheName: name,
    cacheExpiration: {
        maxEntries: 2147483647,
        maxAgeSeconds: 2147483647
    }, cacheableResponse: {statuses: [0, 200]}}
}
const cacheFirstStrategy = (name) => workboxSW.strategies.cacheFirst(cacheParams(name))
const networkFirstStrategy = (name) => workboxSW.strategies.networkFirst(cacheParams(name))


// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([
  {
    "url": "/index.html",
    "revision": "a3cb17a06ab1528116370b9d652c08e1"
  },
  {
    "url": "OneSignalSDKUpdaterWorker.js",
    "revision": "a4f31b84d594856359f740d4fa3f088d"
  },
  {
    "url": "OneSignalSDKWorker.js",
    "revision": "a4f31b84d594856359f740d4fa3f088d"
  },
  {
    "url": "service-worker.js",
    "revision": "04a1f858bec793c2ed22d1bb9832646f"
  },
  {
    "url": "/static/css/app.333f30ebac819f2baaaae5524d8f9b1e.css",
    "revision": "d06735e04e6f6c0f5adf928e9f50342a"
  },
  {
    "url": "/static/img/icons/android-chrome-192x192.png",
    "revision": "fa651aecfc4c1f21fb9c7c0ec60974ed"
  },
  {
    "url": "/static/img/icons/android-chrome-512x512.png",
    "revision": "9b9c6c89c92e5bb841067944de3e466c"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "/static/img/icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "/static/img/icons/apple-touch-icon.png",
    "revision": "e06552396e954fc6ddabea07ba308492"
  },
  {
    "url": "/static/img/icons/favicon-16x16.png",
    "revision": "ab827c537ba95dc20585b5e8ceacc601"
  },
  {
    "url": "/static/img/icons/favicon-32x32.png",
    "revision": "499fb32654b66fcaa0b8d9729c1dbbbd"
  },
  {
    "url": "/static/img/icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "/static/img/icons/mstile-150x150.png",
    "revision": "744b3f2c9bc3f0b7339082d73954177f"
  },
  {
    "url": "/static/js/app.58c04837fe7b7437fe51.js",
    "revision": "0f6f659416824554f2bf75e712de6041"
  },
  {
    "url": "/static/js/manifest.9944038d8634c59b2473.js",
    "revision": "586e3e515f39c559be3e719ba4f302c4"
  },
  {
    "url": "/static/js/vendor.b705f013b411880df5e8.js",
    "revision": "3262d440fb6f4135fc5f5d993b161fc9"
  },
  {
    "url": "workbox-sw.prod.v2.1.1.js",
    "revision": "2a5638f9e33d09efc487b96804a0aa11"
  }
])


workboxSW.router.registerRoute(/^https:\/\/fonts\.googleapis\.com\//, cacheFirstStrategy('static-resource'))
workboxSW.router.registerRoute(/^https:\/\/fonts\.gstatic\.com\//, cacheFirstStrategy('static-resource'))
workboxSW.router.registerRoute(/^https:\/\/code\.getmdl\.io\//, cacheFirstStrategy('static-resource'))
workboxSW.router.registerRoute(/^https:\/\/(.+)\.(.+)\.blogspot\.com\//, cacheFirstStrategy('manga-images'))
workboxSW.router.registerRoute(/^http:\/\/(.+)\.(.+)\.blogspot\.com\//, cacheFirstStrategy('manga-images'))
workboxSW.router.registerRoute('https://www.googleapis.com/(.*)', networkFirstStrategy('blog-content'))
workboxSW.router.registerRoute('http://www.googleapis.com/(.*)', networkFirstStrategy('blog-content'))

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Jap Manga Club';
  const options = {
    body: '新漫畫上架！點此瀏覽更多',
    icon: 'static/img/icons/android-chrome-512x512.png',
    badge: 'static/img/icons/android-chrome-512x512.png'
  };
  
  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});