/**
 * Chart module - handles bar chart rendering and animation
 */

const Chart = (function() {
    let chartElement = null;
    let bars = [];
    let data = [];
    let originalData = [];
    let animationId = null;
    let isPaused = false;
    let generator = null;
    let onComplete = null;
    let onStep = null;

    /**
     * Generate random data array
     * @param {number} count - Number of elements (50-200)
     * @returns {number[]} Array of random values
     */
    function generateRandomData(count = 100) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(Math.floor(Math.random() * 100) + 1);
        }
        return arr;
    }

    /**
     * Initialize the chart with a container element
     * @param {string} containerId - ID of the chart container
     */
    function init(containerId) {
        chartElement = document.getElementById(containerId);
        if (!chartElement) {
            console.error(`Chart container #${containerId} not found`);
            return;
        }
    }

    /**
     * Render bars based on data array
     * @param {number[]} dataArray - Array of values to visualize
     */
    function render(dataArray) {
        if (!chartElement) {
            console.error('Chart not initialized. Call init() first.');
            return;
        }

        data = [...dataArray];
        originalData = [...dataArray];

        // Clear existing bars
        chartElement.innerHTML = '';
        bars = [];

        // Find max value for scaling
        const maxValue = Math.max(...data);

        // Get container height for pixel-based sizing
        const containerHeight = chartElement.offsetHeight || 250;

        // Create bars
        data.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            // Use pixel height for reliability
            const heightPx = Math.max(2, (value / maxValue) * containerHeight);
            bar.style.height = `${heightPx}px`;
            bar.dataset.index = index;
            bar.dataset.value = value;
            chartElement.appendChild(bar);
            bars.push(bar);
        });
    }

    /**
     * Update bar heights and colors based on current state
     * @param {Object} state - Current sorting state
     */
    function updateBars(state) {
        const { array, comparing = [], swapped = [], sorted = [], pivot = -1 } = state;
        const maxValue = Math.max(...array);
        const containerHeight = chartElement.offsetHeight || 250;

        array.forEach((value, index) => {
            const bar = bars[index];
            if (!bar) return;

            // Update height using pixels
            const heightPx = Math.max(2, (value / maxValue) * containerHeight);
            bar.style.height = `${heightPx}px`;
            bar.dataset.value = value;

            // Reset classes
            bar.className = 'bar';

            // Apply state classes
            if (sorted.includes(index)) {
                bar.classList.add('sorted');
            } else if (swapped.includes(index)) {
                bar.classList.add('swapping');
            } else if (comparing.includes(index)) {
                bar.classList.add('comparing');
            } else if (index === pivot) {
                bar.classList.add('pivot');
            }
        });

        // Update internal data reference
        data = [...array];
    }

    /**
     * Start animation with a sorting generator
     * @param {Generator} sortGenerator - Generator that yields sorting steps
     * @param {Function} stepCallback - Called on each step with metrics
     * @param {Function} completeCallback - Called when sorting is complete
     */
    function animate(sortGenerator, stepCallback, completeCallback) {
        generator = sortGenerator;
        onStep = stepCallback;
        onComplete = completeCallback;
        isPaused = false;

        function step() {
            if (isPaused) {
                return;
            }

            const result = generator.next();

            if (result.done) {
                // Mark all bars as sorted
                bars.forEach(bar => {
                    bar.className = 'bar sorted';
                });

                if (onComplete) {
                    onComplete();
                }
                return;
            }

            const state = result.value;
            updateBars(state);

            if (onStep && state.metrics) {
                onStep(state.metrics);
            }

            // Schedule next frame
            animationId = requestAnimationFrame(step);
        }

        // Start animation
        animationId = requestAnimationFrame(step);
    }

    /**
     * Pause the animation
     */
    function pause() {
        isPaused = true;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    /**
     * Resume the animation
     */
    function resume() {
        if (!generator) return;

        isPaused = false;

        function step() {
            if (isPaused) {
                return;
            }

            const result = generator.next();

            if (result.done) {
                bars.forEach(bar => {
                    bar.className = 'bar sorted';
                });

                if (onComplete) {
                    onComplete();
                }
                return;
            }

            const state = result.value;
            updateBars(state);

            if (onStep && state.metrics) {
                onStep(state.metrics);
            }

            animationId = requestAnimationFrame(step);
        }

        animationId = requestAnimationFrame(step);
    }

    /**
     * Stop the animation and reset
     */
    function stop() {
        isPaused = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        generator = null;
    }

    /**
     * Reset to original unsorted data
     */
    function reset() {
        stop();
        render(originalData);
    }

    /**
     * Get current data array
     * @returns {number[]} Current data
     */
    function getData() {
        return [...data];
    }

    /**
     * Get original unsorted data
     * @returns {number[]} Original data
     */
    function getOriginalData() {
        return [...originalData];
    }

    /**
     * Set data from external source
     * @param {number[]} newData - New data array
     */
    function setData(newData) {
        data = [...newData];
        originalData = [...newData];
        render(data);
    }

    /**
     * Check if animation is paused
     * @returns {boolean}
     */
    function getIsPaused() {
        return isPaused;
    }

    return {
        init,
        render,
        generateRandomData,
        updateBars,
        animate,
        pause,
        resume,
        stop,
        reset,
        getData,
        getOriginalData,
        setData,
        getIsPaused
    };
})();

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Chart;
}
