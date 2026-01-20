/**
 * Metrics module - handles tracking and display of sorting metrics
 */

const Metrics = (function() {
    let comparisons = 0;
    let swaps = 0;
    let startTime = null;
    let elapsedTime = 0;
    let timerInterval = null;

    // DOM elements
    let comparisonsEl = null;
    let swapsEl = null;
    let timeEl = null;

    /**
     * Initialize metrics with DOM element IDs
     * @param {Object} elementIds - Object with comparisons, swaps, time IDs
     */
    function init(elementIds = {}) {
        comparisonsEl = document.getElementById(elementIds.comparisons || 'comparisons');
        swapsEl = document.getElementById(elementIds.swaps || 'swaps');
        timeEl = document.getElementById(elementIds.time || 'time');
    }

    /**
     * Reset all metrics to zero
     */
    function reset() {
        comparisons = 0;
        swaps = 0;
        elapsedTime = 0;
        startTime = null;

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        updateDisplay();
    }

    /**
     * Start the timer
     */
    function startTimer() {
        startTime = performance.now();

        // Update timer display every 10ms
        timerInterval = setInterval(() => {
            if (startTime) {
                elapsedTime = (performance.now() - startTime) / 1000;
                updateTimeDisplay();
            }
        }, 10);
    }

    /**
     * Stop the timer
     */
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        if (startTime) {
            elapsedTime = (performance.now() - startTime) / 1000;
            updateTimeDisplay();
        }
    }

    /**
     * Pause the timer
     */
    function pauseTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        if (startTime) {
            elapsedTime = (performance.now() - startTime) / 1000;
        }
    }

    /**
     * Resume the timer
     */
    function resumeTimer() {
        // Adjust start time to account for paused duration
        startTime = performance.now() - (elapsedTime * 1000);

        timerInterval = setInterval(() => {
            if (startTime) {
                elapsedTime = (performance.now() - startTime) / 1000;
                updateTimeDisplay();
            }
        }, 10);
    }

    /**
     * Update metrics from sorting step
     * @param {Object} metrics - Object with comparisons and swaps counts
     */
    function update(metrics) {
        if (typeof metrics.comparisons === 'number') {
            comparisons = metrics.comparisons;
        }
        if (typeof metrics.swaps === 'number') {
            swaps = metrics.swaps;
        }
        updateDisplay();
    }

    /**
     * Increment comparison count
     */
    function incrementComparisons() {
        comparisons++;
        updateComparisonsDisplay();
    }

    /**
     * Increment swap count
     */
    function incrementSwaps() {
        swaps++;
        updateSwapsDisplay();
    }

    /**
     * Update all display elements
     */
    function updateDisplay() {
        updateComparisonsDisplay();
        updateSwapsDisplay();
        updateTimeDisplay();
    }

    /**
     * Update comparisons display
     */
    function updateComparisonsDisplay() {
        if (comparisonsEl) {
            comparisonsEl.textContent = comparisons.toLocaleString();
        }
    }

    /**
     * Update swaps display
     */
    function updateSwapsDisplay() {
        if (swapsEl) {
            swapsEl.textContent = swaps.toLocaleString();
        }
    }

    /**
     * Update time display
     */
    function updateTimeDisplay() {
        if (timeEl) {
            timeEl.textContent = elapsedTime.toFixed(2) + 's';
        }
    }

    /**
     * Get current metrics values
     * @returns {Object} Current metrics
     */
    function getMetrics() {
        return {
            comparisons,
            swaps,
            elapsedTime
        };
    }

    return {
        init,
        reset,
        startTimer,
        stopTimer,
        pauseTimer,
        resumeTimer,
        update,
        incrementComparisons,
        incrementSwaps,
        getMetrics
    };
})();

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Metrics;
}
