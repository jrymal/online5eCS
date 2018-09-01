'use strict';

const CACHE_NAME = 'online5eCS';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '',
                'index.html',
                'fallback.html',
                'manifest.json',
                'css/core.css',
                'images/icons-192.png',
                'images/icons-512.png',
                'js/Backstories.js',
                'js/CharacterWizard.js',
                'js/Classes.js',
                'js/Coinage.js',
                'js/Colors.js',
                'js/Init.js',
                'js/Languages.js',
                'js/Races.js',
                'js/Random.js',
                'js/Skills.js',
                'js/Util.js',
                'template/createCharacter.html',
                'template/importFromFile.html',
                'template/purseUpdate.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    var updateCache = function(request){
        console.log(CACHE_NAME+': retrieving page '+request.url)
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
