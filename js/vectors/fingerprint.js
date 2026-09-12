/**
 * 9. CANVAS/WebGL FINGERPRINTING
 * Fingerprints user using canvas and WebGL
 */
const CanvasFingerprinting = {
    init: function() { this.fingerprint(); },
    fingerprint: function() {
        const fp = {};
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 200; canvas.height = 50;
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top'; ctx.font = '14px Arial';
            ctx.fillStyle = '#f60'; ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069'; ctx.fillText('Fingerprint', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'; ctx.fillText('Fingerprint', 4, 17);
            fp.canvas = this.hashString(canvas.toDataURL());
        } catch(e) {}
        try {
            const glCanvas = document.createElement('canvas');
            glCanvas.width = 200; glCanvas.height = 100;
            const gl = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    fp.webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                    fp.webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
                fp.webglExtensions = gl.getSupportedExtensions();
                fp.webglMaxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
                fp.webglVersion = gl.getParameter(gl.VERSION);
            }
        } catch(e) {}
        fp.screenResolution = screen.width + 'x' + screen.height;
        fp.colorDepth = screen.colorDepth;
        fp.pixelRatio = window.devicePixelRatio;
        fp.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        fp.languages = navigator.languages || [navigator.language];
        fp.platform = navigator.platform;
        fp.userAgent = navigator.userAgent;
        fp.hardwareConcurrency = navigator.hardwareConcurrency;
        fp.deviceMemory = navigator.deviceMemory;
        console.log('Device fingerprint:', JSON.stringify(fp, null, 2));
        return fp;
    },
    hashString: function(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
};