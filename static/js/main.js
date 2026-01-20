/**
 * Main application module - initializes and coordinates all components
 */

const App = (function() {
    // State
    let selectedAlgorithm = null;
    let isRunning = false;
    let isPaused = false;

    // Algorithm registry
    const algorithms = {
        bubble: bubbleSort,
        selection: selectionSort,
        insertion: insertionSort,
        merge: mergeSort,
        quick: quickSort,
        heap: heapSort,
    };

    // DOM Elements
    let algorithmSelect = null;
    let playBtn = null;
    let pauseBtn = null;
    let retryBtn = null;
    let loadingContainer = null;
    let errorContainer = null;
    let chartContainer = null;

    /**
     * Initialize the application
     */
    function init() {
        // Get DOM elements
        algorithmSelect = document.getElementById('algorithm-select');
        playBtn = document.getElementById('play-btn');
        pauseBtn = document.getElementById('pause-btn');
        retryBtn = document.getElementById('retry-btn');
        loadingContainer = document.getElementById('loading-container');
        errorContainer = document.getElementById('error-container');
        chartContainer = document.getElementById('chart-container');

        // Initialize chart
        Chart.init('chart');

        // Initialize metrics
        Metrics.init({
            comparisons: 'comparisons',
            swaps: 'swaps',
            time: 'time'
        });

        // Set up event listeners
        setupEventListeners();

        // Generate and render initial data
        const initialData = Chart.generateRandomData(100);
        console.log('Generated data:', initialData.length, 'elements');
        Chart.render(initialData);

        // Debug: verify bars were created
        const chartEl = document.getElementById('chart');
        console.log('Chart element:', chartEl);
        console.log('Number of bars:', chartEl ? chartEl.children.length : 0);

        console.log('Sorting Algorithm Visualizer initialized');
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Algorithm selection
        algorithmSelect.addEventListener('change', handleAlgorithmChange);

        // Play button
        playBtn.addEventListener('click', handlePlay);

        // Pause button
        pauseBtn.addEventListener('click', handlePause);

        // Retry button
        if (retryBtn) {
            retryBtn.addEventListener('click', handleRetry);
        }
    }

    /**
     * Handle algorithm selection change
     */
    function handleAlgorithmChange(event) {
        selectedAlgorithm = event.target.value;

        // Stop any running sort and reset chart for fresh start
        if (isRunning || isPaused) {
            stop();
        }
        Chart.reset();
        Metrics.reset();

        // Enable/disable play button based on selection
        playBtn.disabled = !selectedAlgorithm;
    }

    /**
     * Handle play button click
     */
    function handlePlay() {
        if (!selectedAlgorithm || !algorithms[selectedAlgorithm]) {
            console.error('No algorithm selected or algorithm not found');
            return;
        }

        if (isPaused) {
            // Resume
            resume();
            return;
        }

        // Start new sort
        start();
    }

    /**
     * Handle pause button click
     */
    function handlePause() {
        if (isRunning && !isPaused) {
            pause();
        }
    }

    /**
     * Start sorting
     */
    function start() {
        isRunning = true;
        isPaused = false;

        // Update UI
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        algorithmSelect.disabled = true;

        // Reset metrics
        Metrics.reset();
        Metrics.startTimer();

        // Reset chart to original data
        Chart.reset();

        // Get current data and create generator
        const data = Chart.getData();
        const algorithmFn = algorithms[selectedAlgorithm];
        const generator = algorithmFn(data);

        // Start animation
        Chart.animate(
            generator,
            handleStep,
            handleComplete
        );
    }

    /**
     * Pause sorting
     */
    function pause() {
        isPaused = true;
        Chart.pause();
        Metrics.pauseTimer();

        // Update UI
        pauseBtn.classList.add('hidden');
        playBtn.classList.remove('hidden');
        playBtn.textContent = 'Resume';
        algorithmSelect.disabled = false; // Allow changing algorithm while paused
    }

    /**
     * Resume sorting
     */
    function resume() {
        isPaused = false;
        Chart.resume();
        Metrics.resumeTimer();

        // Update UI
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }

    /**
     * Stop sorting
     */
    function stop() {
        isRunning = false;
        isPaused = false;
        Chart.stop();
        Metrics.stopTimer();

        // Update UI
        pauseBtn.classList.add('hidden');
        playBtn.classList.remove('hidden');
        playBtn.textContent = 'Play';
        playBtn.disabled = !selectedAlgorithm;
        algorithmSelect.disabled = false;
    }

    /**
     * Handle step callback from animation
     */
    function handleStep(metrics) {
        Metrics.update(metrics);
    }

    /**
     * Handle sorting complete
     */
    function handleComplete() {
        Metrics.stopTimer();
        stop();
        // Keep sorted state visible until user selects another algorithm
    }

    /**
     * Handle retry button click
     */
    function handleRetry() {
        // Hide error, show loading
        errorContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');

        // Attempt to reload data
        loadData();
    }

    /**
     * Load data from API (placeholder for future implementation)
     */
    async function loadData() {
        try {
            // For now, generate random data
            // In Task 4.0, this will fetch from an external API
            const data = Chart.generateRandomData(100);

            // Hide loading, show chart
            loadingContainer.classList.add('hidden');
            chartContainer.classList.remove('hidden');

            Chart.setData(data);
        } catch (error) {
            console.error('Failed to load data:', error);

            // Hide loading, show error
            loadingContainer.classList.add('hidden');
            errorContainer.classList.remove('hidden');
        }
    }

    /**
     * Show loading state
     */
    function showLoading() {
        loadingContainer.classList.remove('hidden');
        chartContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
    }

    /**
     * Show error state
     */
    function showError() {
        errorContainer.classList.remove('hidden');
        loadingContainer.classList.add('hidden');
        chartContainer.classList.add('hidden');
    }

    /**
     * Show chart
     */
    function showChart() {
        chartContainer.classList.remove('hidden');
        loadingContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
    }

    return {
        init,
        loadData,
        showLoading,
        showError,
        showChart
    };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
