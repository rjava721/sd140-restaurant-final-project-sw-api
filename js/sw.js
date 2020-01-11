console.log('service worker running');
// version name
const cacheStorName = 'cacher-v33';
// tout ce qu'il y a a faire cache
const filesToCache = [
  'https://sapolor.github.io/sd140-restaurant-final-project/css/styles.css',
  'https://sapolor.github.io/sd140-restaurant-final-project/data/restaurants.json',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/1.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/2.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/3.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/4.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/5.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/6.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/7.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/8.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/9.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/img/10.jpg',
  'https://sapolor.github.io/sd140-restaurant-final-project/js/dbhelper.js',
  'https://sapolor.github.io/sd140-restaurant-final-project/js/main.js',
  'https://sapolor.github.io/sd140-restaurant-final-project/js/restaurant_info.js',
  'https://sapolor.github.io/sd140-restaurant-final-project/index.html',
  'https://sapolor.github.io/sd140-restaurant-final-project/restaurant.html'
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
    caches.match(event.request).then((response) => {
      if (response !== null) {
        return response;
      }
      
      fetch(event.request);
    })
  );
})