console.log('service worker running');
// version name
const cacheStorName = 'cacher-v2';
// tout ce qu'il y a a faire cache
const filesToCache = [
  '../css/styles.css',
  '../data/restaurants.json',
  '../img/1.jpg',
  '../img/2.jpg',
  '../img/3.jpg',
  '../img/4.jpg',
  '../img/5.jpg',
  '../img/6.jpg',
  '../img/7.jpg',
  '../img/8.jpg',
  '../img/9.jpg',
  '../img/10.jpg',
  '../js/dbhelper.js',
  '../js/main.js',
  '../js/restaurant_info.js',
  '../js/sw.js',
  '../index.html',
  '../README.md',
  '../restaurant.html'
]
// 
// 3 events.
// 'install', 'activate', 'fetch'

self.addEventListener('install', event => {
  console.log('install event launched');
  event.waitUntil( 
    caches.open(cacheStorName)
    .then((cacheStorage) => {
      console.log(cacheStorage);
      return cacheStorage.addAll(filesToCache);
    })
    .catch(error => 'something went wrong %0' + error)
    )
})

self.addEventListener('activate', event => {
  console.log('activate event launched');
  event.waitUntil(
    caches.keys()
    .then((browserCaches) => {
      return Promise.all(browserCaches.map((cacheName) => {
        if (cacheStorName !== cacheName) {
          return caches.delete(cacheName);
        }
      }))
    })
    .catch((error) => console.log('something went wrong %0' + error)))
})
    

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
})