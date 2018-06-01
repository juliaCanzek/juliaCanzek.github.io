var cacheFiles = [
    '.',
    'index.html',
    'game.html',
    'success.html',
    'langsam.html',
    'manifest.json',
    'style.css',
    'map.js',
    'sw.js',
    'img/favicon.ico',
    'img/hook.png',
    'img/icon_geo.png',
    'img/icon.png',
    'img/kitty.png',
    'img/mario.png',
    'package-lock.json',
    'package.json',
    'https://maps2.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139936.jpeg',
    'https://maps1.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139936.jpeg',
    'https://maps1.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139935.jpeg',
    'https://maps3.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139937.jpeg',
    'https://maps3.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139936.jpeg',
    'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139935.jpeg',
    'https://maps2.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139937.jpeg',
    'https://maps2.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139935.jpeg',
    'https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139937.jpeg',
    'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139934.jpeg',
    'https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139938.jpeg',
    'https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139934.jpeg',
    'https://maps3.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139938.jpeg',
    'https://maps1.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139934.jpeg',
    'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139938.jpeg',
    'https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139933.jpeg',
    'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139939.jpeg',
    'https://maps3.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139933.jpeg',
    'https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139939.jpeg',
    'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139933.jpeg',
    'https://maps1.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139939.jpeg',
    'https://maps3.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139932.jpeg',
    'https://maps1.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91576/139940.jpeg',
    'https://maps2.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139932.jpeg',
    'https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91575/139940.jpeg',
    'https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139932.jpeg',
    'https://maps2.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/18/91577/139940.jpeg'
]; 

var staticCacheName = 'pages-cache-v1';

    self.addEventListener('install', function(event) { 
        event.waitUntil( 
            caches.open(staticCacheName) .then(function(cache) { 
                return cache.addAll(cacheFiles); 
            })
        ); 
    });

    self.addEventListener('fetch', function(event) {
        console.log(event.request.url);    
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })      
        );      
    });
