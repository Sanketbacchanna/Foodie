const cacheName = "food-delivery-v1";

const filesToCache = [
  "./",
  "./signup.html",
  "./login.html",
  "./order.html",
  "./payment.html",
  "./about.html",
  "./homepage.html",
  "./contact.html",
  "./fastfood.html",
  "./fastrestaurant.html",
  "./last.html",
  "./nonveg.html",
  "./ninvegrestaurant.html",
  "./service.html",
  "./vegfood.html",
  "./vegrestaurant.html",
  "./style.css",
  "./homestyle.css",
  "./order.css",
  "./index.js",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        console.log("Caching files");
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
