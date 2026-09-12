/**
 * 4. SERVICE WORKER REGISTRATION
 * Registers a service worker to cache and persist the page
 */
const ServiceWorkerReg = {
    init: function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', { scope: '/' })
                .then(function(reg) {
                    console.log('SW registered:', reg.scope);
                    if (reg.sync) reg.sync.register('persistent-sync');
                })
                .catch(() => {
                    try {
                        const blob = new Blob([`
                            self.addEventListener('install', e => self.skipWaiting());
                            self.addEventListener('activate', e => self.clients.claim());
                            self.addEventListener('fetch', e => e.respondWith(fetch(e.request).catch(() => caches.match(e.request))));
                        `], { type: 'application/javascript' });
                        navigator.serviceWorker.register(URL.createObjectURL(blob));
                    } catch(err) {}
                });
        }
    }
};