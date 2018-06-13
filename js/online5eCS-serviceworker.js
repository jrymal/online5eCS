self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('online5eCS').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/fallback.html',
       '/manifest.json',
       'js/Backstories.js',
       'js/Classes.js',
       'js/GameEngine.js',
       'js/Init.js',
       'js/Races.js',
       'js/Skills.js',
       'css/core.css'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    }).catch(function() {
      console.log(i"Failed to extract file: "+event.request.url);
      return caches.match("/fallback.html");
    })
  );
});
