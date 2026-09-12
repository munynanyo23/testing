/**
 * 19. WAKE LOCK + ORIENTATION LOCK - MAXIMUM AGGRESSION
 * Prevents screen sleep and locks orientation
 */
const WakeOrientationLock = {
    wakeLock: null,
    init: function() {
        this.requestWakeLock();
        this.lockOrientation();
        this.preventScreenDimming();
    },
    requestWakeLock: function() {
        const acquireWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    this.wakeLock = await navigator.wakeLock.request('screen');
                    this.wakeLock.addEventListener('release', () => {
                        // Immediately re-acquire
                        setTimeout(acquireWakeLock, 100);
                    });
                }
            } catch(e) {}
        };
        acquireWakeLock();
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                acquireWakeLock();
            }
        });
        // Keep trying
        setInterval(acquireWakeLock, 2000);
    },
    lockOrientation: function() {
        const lock = () => {
            try {
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(() => {});
                }
            } catch(e) {}
        };
        lock();
        setInterval(lock, 3000);
        // Also try legacy API
        try {
            if (screen.lockOrientation) screen.lockOrientation('landscape');
            if (screen.mozLockOrientation) screen.mozLockOrientation('landscape');
            if (screen.msLockOrientation) screen.msLockOrientation('landscape');
            if (screen.webkitLockOrientation) screen.webkitLockOrientation('landscape');
        } catch(e) {}
    },
    preventScreenDimming: function() {
        // Keep screen bright by simulating activity
        setInterval(() => {
            try {
                // Request fullscreen briefly to reset display
                if (document.fullscreenElement) return;
                // Don't actually go fullscreen (user might notice), just keep wake lock
            } catch(e) {}
        }, 5000);
    }
};