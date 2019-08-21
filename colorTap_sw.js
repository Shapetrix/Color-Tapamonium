const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/myd3.js',
  '/js/mygame.js',
  '/css/style.css',
  '/img/colorTapTitle.svg',
  '/img/gameOverTitle.svg',
  '/img/playBtn.svg',
  '/img/quitBtn.svg',
  '/img/startHud.svg',
];
// install serviceWorker
self.addEventListener('install', evt => {
  //console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
    console.log('caching shell assets');
    cache.addAll(assets);
    })
  );

});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys =>{
      //console.log(keys);
      return Promise.all(keys
      .filter(key => key !== staticCacheName)
      .map(key => caches.delete(key)))
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch', evt);
  evt.respondWith(
    caches.match(evt.request).then(casheRes =>{
      return casheRes || fetch(evt.request);
    })
  )
});
