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
    "url": "/DMcare/index.html",
    "revision": "9aa8ec5106e223a4eae5c959a00fd347"
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
    "revision": "55f8e1f84597b6cf5586e6e31d3b63df"
  },
  {
    "url": "/DMcare/static/css/app.a3a95ff885a8fd7be161d00aea7af08b.css",
    "revision": "2a43c4a3ddb80c56bc9253e1ad7f2815"
  },
  {
    "url": "/DMcare/static/img/hypergly.jpg",
    "revision": "9ab8ae5125b63ad6753e0cf1440ca2e6"
  },
  {
    "url": "/DMcare/static/img/hypogly.jpg",
    "revision": "221989e82b38077b607299b798473a19"
  },
  {
    "url": "/DMcare/static/img/icons/android-chrome-192x192.png",
    "revision": "fa651aecfc4c1f21fb9c7c0ec60974ed"
  },
  {
    "url": "/DMcare/static/img/icons/android-chrome-512x512.png",
    "revision": "9b9c6c89c92e5bb841067944de3e466c"
  },
  {
    "url": "/DMcare/static/img/icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "/DMcare/static/img/icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "/DMcare/static/img/icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "/DMcare/static/img/icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "/DMcare/static/img/icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "/DMcare/static/img/icons/apple-touch-icon.png",
    "revision": "e06552396e954fc6ddabea07ba308492"
  },
  {
    "url": "/DMcare/static/img/icons/favicon-16x16.png",
    "revision": "ab827c537ba95dc20585b5e8ceacc601"
  },
  {
    "url": "/DMcare/static/img/icons/favicon-32x32.png",
    "revision": "499fb32654b66fcaa0b8d9729c1dbbbd"
  },
  {
    "url": "/DMcare/static/img/icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "/DMcare/static/img/icons/mstile-150x150.png",
    "revision": "744b3f2c9bc3f0b7339082d73954177f"
  },
  {
    "url": "/DMcare/static/js/app.6e28bc64287aa7c1df58.js",
    "revision": "9b278de4f7d0a321bb405a82e424bc57"
  },
  {
    "url": "/DMcare/static/js/manifest.9fd789c5aa10c8a8d05f.js",
    "revision": "189aff71f67f871581c6814254e4a17c"
  },
  {
    "url": "/DMcare/static/js/vendor.5392b4592a0995c70e58.js",
    "revision": "cc469b1ee11dc2a330f0ed1a920530fe"
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

  const title = 'DM care';
  const options = {
    body: 'News about DM!',
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