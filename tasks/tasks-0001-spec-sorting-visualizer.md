# Tasks: Sorting Algorithm Visualizer

## Relevant Files

- `index.html` - Main HTML entry point with page structure and dark theme setup
- `static/css/styles.css` - Global styles, dark theme, responsive layout, and bar chart styling
- `static/js/main.js` - Application entry point, initialization, and state management
- `static/js/main.test.js` - Unit tests for main application logic
- `static/js/chart.js` - Bar chart rendering and animation logic
- `static/js/chart.test.js` - Unit tests for chart rendering
- `static/js/algorithms/bubbleSort.js` - Bubble Sort algorithm implementation (generator-based)
- `static/js/algorithms/bubbleSort.test.js` - Unit tests for Bubble Sort
- `static/js/algorithms/selectionSort.js` - Selection Sort algorithm implementation
- `static/js/algorithms/selectionSort.test.js` - Unit tests for Selection Sort
- `static/js/algorithms/insertionSort.js` - Insertion Sort algorithm implementation
- `static/js/algorithms/insertionSort.test.js` - Unit tests for Insertion Sort
- `static/js/algorithms/mergeSort.js` - Merge Sort algorithm implementation
- `static/js/algorithms/mergeSort.test.js` - Unit tests for Merge Sort
- `static/js/algorithms/quickSort.js` - Quick Sort algorithm implementation
- `static/js/algorithms/quickSort.test.js` - Unit tests for Quick Sort
- `static/js/algorithms/heapSort.js` - Heap Sort algorithm implementation
- `static/js/algorithms/heapSort.test.js` - Unit tests for Heap Sort
- `static/js/api.js` - API fetching logic with error handling
- `static/js/api.test.js` - Unit tests for API module
- `static/js/metrics.js` - Metrics tracking and display (comparisons, swaps, time)
- `static/js/metrics.test.js` - Unit tests for metrics module
- `app.py` - Flask backend (if needed for CORS proxy or static file serving)
- `requirements.txt` - Python dependencies for Flask
- `railway.json` - Railway deployment configuration
- `Procfile` - Process file for Railway deployment

### Notes

- Unit tests should be placed alongside the code files they test (e.g., `chart.js` and `chart.test.js` in the same directory)
- Use `npx jest [optional/path/to/test/file]` to run tests
- Color palette: `#f79256` (coral), `#fbd1a2` (peach), `#7dcfb6` (mint), `#00b2ca` (cyan), `#1d4e89` (navy)
- Background color: `#121212` (dark gray)
- Sorting algorithms use generator functions to yield each step for animation
- This is a greenfield project - no existing codebase to integrate with

## Tasks

- [ ] 1.0 Build Static Bar Chart Display with Dark Theme
  - Demo Criteria: "Open index page and see 50-200 bars of varying heights rendered on a dark background using the specified color palette"
  - Proof Artifact(s): "URL: localhost showing rendered bar chart; Screenshot of static visualization"
  - [ ] 1.1 Create project folder structure (`static/css/`, `static/js/`, `static/js/algorithms/`)
  - [ ] 1.2 Create `index.html` with HTML5 boilerplate, meta viewport tag, and link to CSS/JS files
  - [ ] 1.3 Implement dark theme base styles in `styles.css` (background: `#121212`, light text, CSS reset)
  - [ ] 1.4 Create responsive layout structure in CSS (header, main chart area, controls section, metrics section)
  - [ ] 1.5 Implement `chart.js` module with function to generate random data array (50-200 elements)
  - [ ] 1.6 Implement bar chart rendering function in `chart.js` using DOM elements or Canvas API
  - [ ] 1.7 Apply default bar color (`#1d4e89` navy) and ensure bars scale to container width
  - [ ] 1.8 Initialize and render static chart on page load in `main.js`
  - [ ] 1.9 Write unit tests for data generation and chart rendering functions

- [ ] 2.0 Implement Single Sorting Algorithm Animation (Bubble Sort)
  - Demo Criteria: "Click Play button, watch Bubble Sort animate with color state changes (comparing, swapping, sorted) and metrics (comparisons, swaps, time) updating in real-time; Pause and resume functionality works"
  - Proof Artifact(s): "Screen recording or live URL demonstrating animation with metrics; Test: bubbleSort.test.js"
  - [ ] 2.1 Implement Bubble Sort as a generator function in `bubbleSort.js` that yields state after each comparison/swap
  - [ ] 2.2 Define step object structure: `{ array, comparing: [i, j], swapped: [i, j], sorted: [...indices] }`
  - [ ] 2.3 Create animation loop in `chart.js` using `requestAnimationFrame` to process generator steps
  - [ ] 2.4 Implement color state rendering: comparing (`#fbd1a2` peach), swapping (`#f79256` coral), sorted (`#7dcfb6` mint)
  - [ ] 2.5 Create `metrics.js` module with functions to track and display comparisons, swaps, and elapsed time
  - [ ] 2.6 Add metrics display elements to `index.html` and style in `styles.css`
  - [ ] 2.7 Add Play and Pause buttons to `index.html` with appropriate styling
  - [ ] 2.8 Implement Play button click handler in `main.js` to start sorting animation
  - [ ] 2.9 Implement Pause/Resume functionality with state tracking
  - [ ] 2.10 Implement auto-reset: after sorting completes, reset array to original unsorted state after brief delay
  - [ ] 2.11 Write unit tests for Bubble Sort algorithm correctness
  - [ ] 2.12 Write unit tests for metrics tracking functions

- [ ] 3.0 Add All Sorting Algorithms with Dropdown Selection
  - Demo Criteria: "Dropdown lists all 6 algorithms (Bubble, Selection, Insertion, Merge, Quick, Heap); selecting each one and clicking Play runs that specific sort correctly"
  - Proof Artifact(s): "Live URL or recording showing dropdown selection and different sorts running; Test files for each algorithm"
  - [ ] 3.1 Add algorithm dropdown `<select>` element to `index.html` with placeholder "Select Algorithm" option
  - [ ] 3.2 Style dropdown to match dark theme (dark background, light text, accent border on focus)
  - [ ] 3.3 Implement Selection Sort generator in `selectionSort.js` with step yields
  - [ ] 3.4 Implement Insertion Sort generator in `insertionSort.js` with step yields
  - [ ] 3.5 Implement Merge Sort generator in `mergeSort.js` with step yields (note: needs auxiliary array visualization)
  - [ ] 3.6 Implement Quick Sort generator in `quickSort.js` with step yields (highlight pivot with `#00b2ca` cyan)
  - [ ] 3.7 Implement Heap Sort generator in `heapSort.js` with step yields
  - [ ] 3.8 Create algorithm registry/map in `main.js` linking dropdown values to algorithm functions
  - [ ] 3.9 Add dropdown change handler to store selected algorithm
  - [ ] 3.10 Modify Play button to use selected algorithm from dropdown (disable if none selected)
  - [ ] 3.11 Write unit tests for Selection Sort correctness
  - [ ] 3.12 Write unit tests for Insertion Sort correctness
  - [ ] 3.13 Write unit tests for Merge Sort correctness
  - [ ] 3.14 Write unit tests for Quick Sort correctness
  - [ ] 3.15 Write unit tests for Heap Sort correctness

- [ ] 4.0 Implement Data Loading with API Integration
  - Demo Criteria: "On page load, indeterminate progress bar displays while fetching data from API; data loads successfully and populates visualization; error state shows 'Retry' button if API fails"
  - Proof Artifact(s): "Network tab showing API call; Screenshot of loading state; Screenshot of error state with retry button"
  - [ ] 4.1 Create indeterminate progress bar component in `index.html` (pulsing/spinning animation)
  - [ ] 4.2 Style progress bar in `styles.css` with CSS animation using accent colors
  - [ ] 4.3 Create `api.js` module with async function to fetch data from external API
  - [ ] 4.4 Implement data transformation function to convert API response to numeric array for visualization
  - [ ] 4.5 Add loading state management in `main.js` (show progress bar, hide chart during load)
  - [ ] 4.6 Create error state UI: error message container and "Retry" button in `index.html`
  - [ ] 4.7 Style error state elements to match dark theme (red/coral accent for error)
  - [ ] 4.8 Implement error handling in `api.js`: catch fetch failures, return error state
  - [ ] 4.9 Implement Retry button click handler to re-attempt data fetch
  - [ ] 4.10 Replace hardcoded random data with fetched API data on successful load
  - [ ] 4.11 Write unit tests for API fetch function (mock successful and failed responses)
  - [ ] 4.12 Write unit tests for data transformation function

- [ ] 5.0 Finalize Mobile Responsiveness and Deploy to Railway
  - Demo Criteria: "App is fully functional on mobile viewports (320px-768px) with touch-friendly controls and responsive bar sizing; app is accessible via public Railway URL"
  - Proof Artifact(s): "Screenshots on mobile simulator at 320px, 375px, 768px widths; Live Railway URL"
  - [ ] 5.1 Add CSS media queries for mobile breakpoints (320px, 375px, 768px)
  - [ ] 5.2 Adjust bar chart sizing for narrow viewports (reduce bar count or bar width)
  - [ ] 5.3 Ensure controls (dropdown, buttons) have minimum 44px touch target size
  - [ ] 5.4 Stack layout vertically on mobile (chart, then controls, then metrics)
  - [ ] 5.5 Test on mobile viewport sizes using browser dev tools; fix any overflow or sizing issues
  - [ ] 5.6 Create `app.py` Flask application to serve static files (if needed)
  - [ ] 5.7 Create `requirements.txt` with Flask dependency
  - [ ] 5.8 Create `Procfile` with web process command (`web: python app.py` or `gunicorn`)
  - [ ] 5.9 Create `railway.json` with build and deploy configuration
  - [ ] 5.10 Push code to GitHub repository
  - [ ] 5.11 Connect Railway to GitHub repo and trigger deployment
  - [ ] 5.12 Verify application works correctly on Railway public URL
  - [ ] 5.13 Test deployed application on actual mobile device (if available)
