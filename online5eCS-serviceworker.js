const CACHE_NAME = 'online5eCS';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
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
        });i
    );
});

self.addEventListener('fetch', function(event) {
    var updateCache = function(request){
        return caches.open(CACHE_NAME).then(function (cache) {
            return fetch(request).then(function (response) {
                console.log(CACHE_NAME+': add page to offline'+response.url)
                return cache.put(request, response);
            });
        });
    };
  
    event.waitUntil(updateCache(event.request));
  
    event.respondWith(
        fetch(event.request)
        .catch(function(error) {
            console.log( CACHE_NAME+': Network request Failed. Serving content from cache: ' + error );
            //Check to see if you have it in the cache
            //Return response
            //If not in the cache, then return error page
            return caches.open(CACHE_NAME)
                .then(function (cache) {
                    return cache.match(event.request)
                        .then(function (matching) {
                            var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
                            return report
                        });
                });
        })
    );
});
