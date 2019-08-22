if('ServiceWorker' in navigator){
  navigator.ServiceWorker.register('/colorTap_sw.js')
  .then((reg) => console.log('service worker registered', reg))
  .catch((err) => console.log('service worker not registered', err))
}
