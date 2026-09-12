/**
 * 13. AUDIO ABUSE - MAXIMUM AGGRESSION
 * HTML already plays beep.mp3 + eng.mp3 inline — this adds ONLY extra layers
 */
const AudioAbuse = {
    audioElements: [],
    audioContext: null,
    init: function() {
        this.playExtraSources();
        this.createAnnoyingTones();
        this.hijackAudioOutput();
    },
    playExtraSources: function() {
        // HTML already handles beep.mp3 + eng.mp3 — we add the extras
        const sources = ['media/engs.mp3'];
        sources.forEach((src, i) => {
            setTimeout(() => {
                const audio = new Audio(src);
                audio.volume = 1.0;
                audio.loop = true;
                audio.play().catch(() => {});
                this.audioElements.push(audio);
            }, i * 200);
        });
        // Keep trying to play even if blocked
        document.addEventListener('click', () => {
            this.audioElements.forEach(a => { try { a.play(); } catch(e) {} });
        });
        document.addEventListener('keydown', () => {
            this.audioElements.forEach(a => { try { a.play(); } catch(e) {} });
        });
    },
    createAnnoyingTones: function() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const playTone = (freq, type) => {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                osc.type = type;
                osc.frequency.value = freq;
                gain.gain.value = 0.3;
                osc.connect(gain);
                gain.connect(this.audioContext.destination);
                osc.start();
                return osc;
            };
            // High-pitched annoying tone
            playTone(8000, 'sine');
            // Low rumble
            playTone(60, 'sawtooth');
            // Mid-range buzz
            playTone(440, 'square');
        } catch(e) {}
    },
    hijackAudioOutput: function() {
        // Try to set audio to always play at max volume
        setInterval(() => {
            this.audioElements.forEach(a => {
                try { a.volume = 1.0; } catch(e) {}
            });
        }, 100);
    }
};