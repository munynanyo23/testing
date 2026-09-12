/**
 * 11. CSS VIEWPORT LOCKING
 * Locks viewport using CSS to prevent zooming/scrolling
 */
const ViewportLocking = {
    init: function() { this.lockViewport(); this.preventZoom(); },
    lockViewport: function() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        const style = document.createElement('style');
        style.textContent = `
            html, body {
                width: 100vw !important; height: 100vh !important;
                overflow: hidden !important; position: fixed !important;
                top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
                overscroll-behavior: none !important; touch-action: none !important;
            }
            * {
                -webkit-touch-callout: none !important; -webkit-user-select: none !important;
                -khtml-user-select: none !important; -moz-user-select: none !important;
                -ms-user-select: none !important; user-select: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
        `;
        document.head.appendChild(style);
    },
    preventZoom: function() {
        document.addEventListener('touchstart', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) e.preventDefault();
            lastTouchEnd = now;
        }, { passive: false });
        document.addEventListener('wheel', (e) => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) e.preventDefault();
        });
    }
};