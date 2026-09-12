/**
 * 20. CSS ANIMATION OVERLOAD - MAXIMUM AGGRESSION
 * Heavy CSS animations to slow rendering to a crawl
 */
const CSSAnimationOverload = {
    init: function() {
        this.injectHeavyStyles();
        this.createAnimatedElements();
        this.injectKeyframes();
    },
    injectHeavyStyles: function() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation: shake 0.1s infinite !important;
                transition: all 0.05s !important;
            }
            body::before, body::after {
                content: '';
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: repeating-linear-gradient(
                    45deg,
                    rgba(255,0,0,0.1),
                    rgba(255,0,0,0.1) 10px,
                    rgba(0,0,255,0.1) 10px,
                    rgba(0,0,255,0.1) 20px
                );
                animation: strobe 0.05s infinite !important;
                pointer-events: none;
                z-index: 999999;
            }
            @keyframes shake {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                10% { transform: translate(-2px, -2px) rotate(-1deg); }
                20% { transform: translate(2px, -2px) rotate(1deg); }
                30% { transform: translate(-2px, 2px) rotate(0deg); }
                40% { transform: translate(2px, 2px) rotate(1deg); }
                50% { transform: translate(-2px, -2px) rotate(-1deg); }
                60% { transform: translate(2px, -2px) rotate(0deg); }
                70% { transform: translate(-2px, 2px) rotate(1deg); }
                80% { transform: translate(2px, 2px) rotate(-1deg); }
                90% { transform: translate(-2px, -2px) rotate(0deg); }
            }
            @keyframes strobe {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes glitch {
                0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
                20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, -2px); }
                40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 2px); }
                60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
                80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
                100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -2px); }
            }
        `;
        document.head.appendChild(style);
    },
    createAnimatedElements: function() {
        // Create 50 animated overlay elements
        for (let i = 0; i < 50; i++) {
            const div = document.createElement('div');
            div.style.cssText = `
                position: fixed;
                width: ${Math.random() * 200 + 50}px;
                height: ${Math.random() * 200 + 50}px;
                background: rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.3);
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                z-index: ${1000000 + i};
                pointer-events: none;
                animation: spin ${Math.random() * 2 + 0.5}s linear infinite,
                           pulse ${Math.random() * 1 + 0.2}s ease-in-out infinite,
                           glitch ${Math.random() * 0.5 + 0.1}s steps(5) infinite;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                mix-blend-mode: difference;
                filter: blur(${Math.random() * 5}px);
            `;
            document.body.appendChild(div);
        }
    },
    injectKeyframes: function() {
        // Add more keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            @keyframes zoom {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.5); }
            }
        `;
        document.head.appendChild(style);
        // Apply rainbow to everything
        setInterval(() => {
            try {
                document.body.style.animation = 'rainbow 2s linear infinite';
            } catch(e) {}
        }, 100);
    }
};