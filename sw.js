let staticCacheName = "restaurant-static-v1";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        "/",
        "js/sw_registration.js",
        "/index.html",
        "/restaurant.html",
        "/css/styles.css",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/restaurant_info.js",
        "/img/*"
      ])
      .catch(function(error) {
        console.log(error);
      });
    }));
});


self.addEventListener ("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith("restaurant-") &&
                  cacheName !== staticCacheName;
        }).map(function(cacheName) {
            console.log("cache removed.");
            return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response;
      }
      else {
        return fetch(event.request);
      }
    })
  );
});
