self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('online5eCS').then(function(cache) {
     return cache.addAll([
       '/online5eCS/',
       '/online5eCS/index.html',
       '/online5eCS/fallback.html',
       '/online5eCS/manifest.json',
       '/online5eCS/js/Backstories.js',
       '/online5eCS/js/Classes.js',
       '/online5eCS/js/GameEngine.js',
       '/online5eCS/js/Init.js',
       '/online5eCS/js/Races.js',
       '/online5eCS/js/Skills.js',
       '/online5eCS/css/core.css',
       '/online5eCS/images/icons-192.png',
       '/online5eCS/images/icons-512.png'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    }).catch(function() {
      console.log("Failed to extract file: "+event.request.url);
      return caches.match("/online5eCS/fallback.html");
    })
  );
});
