const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  '/',
  './index.html',
  './js/app.js',
  './js/myd3.js',
  './js/mygame.js',
  './js/ios-detection.js',
  './css/style.css',
  './img/colorTapTitle.svg',
  './img/gameOverTitle.svg',
  './img/playBtn.svg',
  './img/quitBtn.svg',
  './img/startHud.svg',
  './img/add2home.svg',
  './img/share.svg',
  './fallback.html',
];

// cache size limit function
const limitCachSize = (name, size) => {
  caches.open(name).then(cache =>{
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCachSize(name, size))
      }
    })
  })
}
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
      .filter(key => key !== staticCacheName && key !== dynamicCacheName)
      .map(key => caches.delete(key)))
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return cache.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCachSize(dynamicCacheName, 15);
          return fetchRes;
        })
      });
    }).catch(() => {
      if(evt.request.url.indexOf('.html') > -1){
        return caches.match('./fallback.html');
      }
    })
  );
});
