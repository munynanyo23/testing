/**
 * 8. WebRTC LOCAL IP DISCOVERY
 * Discovers local IP addresses using WebRTC
 */
const WebRTCDiscovery = {
    init: function() {
        this.discoverLocalIP();
    },
    discoverLocalIP: function() {
        const ips = [];
        const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        if (!RTCPeerConnection) return;
        try {
            const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
            pc.createDataChannel('');
            pc.onicecandidate = (event) => {
                if (!event || !event.candidate) return;
                const parts = event.candidate.candidate.split(' ');
                const ip = parts[4];
                if (ip && !ips.includes(ip)) {
                    ips.push(ip);
                    console.log('Local IP discovered:', ip);
                }
            };
            pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch(() => {});
            const stunServers = [
                'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302', 'stun:stun4.l.google.com:19302'
            ];
            stunServers.forEach((stunUrl, index) => {
                setTimeout(() => {
                    try {
                        const pc2 = new RTCPeerConnection({ iceServers: [{ urls: stunUrl }] });
                        pc2.createDataChannel('');
                        pc2.onicecandidate = (event) => {
                            if (!event || !event.candidate) return;
                            const parts = event.candidate.candidate.split(' ');
                            const ip = parts[4];
                            if (ip && !ips.includes(ip)) { ips.push(ip); console.log('Local IP (STUN ' + (index + 1) + '):', ip); }
                        };
                        pc2.createOffer().then(offer => pc2.setLocalDescription(offer)).catch(() => {});
                    } catch(e) {}
                }, index * 1000);
            });
        } catch(e) {}
    }
};