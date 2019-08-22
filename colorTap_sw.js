const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
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
  '/img/add2home.svg',
  '/img/share.svg',
  '/fallback.html',
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
        return caches.match('/fallback.html');
      }
    })
  );
});

function addToHomeScreen() {
  let a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
  a2hsBtn.style.display = 'none';  // Show the prompt
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function(choiceResult){
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }
  deferredPrompt = null;
});}
function showAddToHomeScreen() {
  let a2hsBtn = document.querySelector(".ad2hs-prompt");
  a2hsBtn.style.display = "block";
  a2hsBtn.addEventListener("click", addToHomeScreen);
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  showAddToHomeScreen();
});

function showIosInstall() {
  let iosPrompt = document.querySelector(".ios-prompt");
  iosPrompt.style.display = "block";
  iosPrompt.addEventListener("click", () => {
    iosPrompt.style.display = "none";
  });
}

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  this.setState({ showInstallMessage: true });
}
