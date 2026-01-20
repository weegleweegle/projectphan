# Sorting Algorithm Visualizer

## 1. Introduction/Overview

This project is a web-based sorting algorithm visualizer designed for educational outreach to the general public. Users will be able to watch common sorting algorithms execute in real-time through an animated bar chart visualization with color-coded states.

The application loads data from an external API (TBD), displays a loading indicator while fetching, then allows users to select from various sorting algorithms and watch them sort the data visually. The visualization includes real-time metrics (comparisons, swaps, elapsed time) to help users understand algorithm efficiency.

**Tech Stack:** Python with Flask (if needed for backend), deployed on Railway.

---

## 2. Goals

1. **Educate** the general public about how different sorting algorithms work through visual demonstration
2. **Compare** algorithm efficiency by displaying real-time metrics during sorting
3. **Engage** users with a clean, dark-themed interface that works on both desktop and mobile
4. **Simplify** interaction with minimal controls (play/pause only)
5. **Deploy** a functional web application on Railway

---

## 3. User Stories

1. **As a visitor**, I want to see a loading indicator when I first visit the page so I know data is being fetched.
2. **As a visitor**, I want to select a sorting algorithm from a dropdown so I can choose which one to visualize.
3. **As a visitor**, I want to watch the sorting happen in real-time with animated bars so I can understand how the algorithm works.
4. **As a visitor**, I want to see color changes on bars during comparison and swap operations so I can follow the algorithm's logic.
5. **As a visitor**, I want to see live metrics (comparisons, swaps, time) so I can understand algorithm efficiency.
6. **As a visitor**, I want to pause and resume the visualization so I can study specific steps.
7. **As a visitor**, I want the data to auto-reset after sorting completes so I can try another algorithm.
8. **As a visitor**, I want to use the app on my phone so I can learn on any device.
9. **As a visitor**, I want to see a clear error message with a retry button if data fails to load.

---

## 4. Demoable Units of Work

### Unit 1: Static Bar Chart Display
**Purpose:** Prove we can render a responsive bar chart with the color palette.
**Demo Criteria:** A static page showing 50-200 bars of varying heights using the specified colors on a dark background.
**Proof Artifact:** Screenshot or URL showing the rendered bar chart.

### Unit 2: Single Sort Animation (Hardcoded Data)
**Purpose:** Prove sorting visualization works with one algorithm (e.g., Bubble Sort).
**Demo Criteria:** Click play, watch Bubble Sort animate with color state changes and metrics updating.
**Proof Artifact:** Screen recording or live URL demonstrating the animation.

### Unit 3: Algorithm Dropdown Selection
**Purpose:** Allow users to choose from all 6 sorting algorithms.
**Demo Criteria:** Dropdown lists all algorithms; selecting one and clicking play runs that specific sort.
**Proof Artifact:** Live URL or recording showing dropdown selection and different sorts running.

### Unit 4: Loading State with Indeterminate Progress Bar
**Purpose:** Show loading indicator while data is being fetched.
**Demo Criteria:** On page load, indeterminate progress bar displays until data is ready.
**Proof Artifact:** Screenshot or recording showing the loading state.

### Unit 5: API Data Integration
**Purpose:** Replace hardcoded data with real API data.
**Demo Criteria:** App fetches data from external API, transforms it for visualization, handles errors gracefully.
**Proof Artifact:** Network tab showing API call, error state with retry button if API fails.

### Unit 6: Mobile Responsiveness
**Purpose:** Ensure app works well on mobile devices.
**Demo Criteria:** Test on mobile viewport sizes; bars resize appropriately, controls are touch-friendly.
**Proof Artifact:** Screenshots on mobile simulator or actual device.

### Unit 7: Railway Deployment
**Purpose:** Deploy working application to production.
**Demo Criteria:** Accessible via public Railway URL.
**Proof Artifact:** Live URL.

---

## 5. Functional Requirements

### Data Loading
1. The system must display an indeterminate (spinning/pulsing) progress bar while loading data.
2. The system must fetch data from an external API (TBD, <5MB).
3. The system must store loaded data in memory (no database required).
4. The system must display an error message with a "Retry" button if API call fails.

### Sorting Algorithm Selection
5. The system must provide a dropdown menu listing the following algorithms:
   - Bubble Sort
   - Selection Sort
   - Insertion Sort
   - Merge Sort
   - Quick Sort
   - Heap Sort
6. The system must default to no algorithm selected (user must choose).

### Visualization
7. The system must display data as a bar chart with bars of varying heights.
8. The system must use the following color palette:
   - `#f79256` (coral/orange)
   - `#fbd1a2` (peach)
   - `#7dcfb6` (mint green)
   - `#00b2ca` (cyan)
   - `#1d4e89` (navy blue)
9. The system must apply colors to indicate sorting state (e.g., comparing, swapping, sorted).
10. The system must animate the sorting process in real-time.
11. The system must support 50-200 elements in the visualization.

### Controls
12. The system must provide a Play button to start the visualization.
13. The system must provide a Pause button to pause the visualization.
14. The system must allow resuming from the paused state.

### Metrics Display
15. The system must display the current number of comparisons in real-time.
16. The system must display the current number of swaps in real-time.
17. The system must display elapsed time in real-time.

### Post-Sort Behavior
18. The system must auto-reset the data to its original unsorted state after sorting completes.
19. The system must allow the user to select and run another algorithm after reset.

### Responsive Design
20. The system must be fully functional on desktop browsers (Chrome, Firefox, Safari, Edge).
21. The system must be fully functional on mobile browsers (iOS Safari, Android Chrome).
22. The system must adapt bar width and spacing based on viewport size.

### Styling
23. The system must use a dark mode / developer aesthetic theme.
24. The system must have a dark background with light/colored foreground elements.

---

## 6. Non-Goals (Out of Scope)

1. **User accounts or authentication** - No login required
2. **Persistent data storage** - Data is fetched fresh each session
3. **Custom data input** - Users cannot upload their own data
4. **Step-by-step controls** - No step forward/backward functionality
5. **Speed controls** - No slider to adjust animation speed
6. **Algorithm code display** - No code snippets shown alongside visualization
7. **Sound effects** - No audio feedback during sorting
8. **Comparison mode** - No side-by-side algorithm comparison
9. **Data caching** - Data is not cached between sessions

---

## 7. Design Considerations

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Coral/Orange | `#f79256` | Primary accent, active states |
| Peach | `#fbd1a2` | Secondary accent, comparing state |
| Mint Green | `#7dcfb6` | Success, sorted state |
| Cyan | `#00b2ca` | Highlights, current element |
| Navy Blue | `#1d4e89` | Default bar color, backgrounds |

### Layout (Mobile-First)
- Header: App title
- Main: Bar chart visualization (takes majority of viewport)
- Controls: Dropdown + Play/Pause button (below or overlaid on chart)
- Metrics: Comparisons | Swaps | Time (below controls or in header)

### Dark Theme
- Background: Dark gray/black (`#121212` or similar)
- Text: Light gray/white
- Controls: Subtle borders, accent colors on interaction

---

## 8. Technical Considerations

### Frontend
- Consider using vanilla JavaScript with Canvas API or a library like D3.js for visualization
- CSS animations or requestAnimationFrame for smooth bar transitions
- Responsive CSS (flexbox/grid) for mobile support

### Backend (Flask - if needed)
- May serve as a proxy for API calls if CORS is an issue
- Could serve static files
- Minimal backend logic expected

### Data
- API source TBD
- Data must be <5MB
- Data should be numeric or convertible to numeric values for bar heights
- Consider using array indices or simple generated data for MVP

### Deployment
- Railway deployment
- Environment variables for API keys (if needed)
- Static site possible if no backend needed

---

## 9. Success Metrics

1. **Functionality:** All 6 sorting algorithms visualize correctly without errors
2. **Performance:** Animation runs smoothly at 60fps on modern devices
3. **Responsiveness:** Usable on screens from 320px to 1920px+ width
4. **Reliability:** Error handling works; retry button successfully re-fetches data
5. **Deployment:** Successfully accessible via Railway public URL
6. **User Engagement:** (Future) Track page visits and algorithm selections if analytics added

---

## 10. Open Questions

1. **API Source:** What external API will provide the data? Options to consider:
   - Random number generator API
   - Public dataset API (e.g., weather data, stock prices)
   - Generated data on the backend

2. **Data Transformation:** How will API data be transformed into sortable numeric values?

3. **Animation Speed:** What should the default animation speed be? (milliseconds per step)

4. **Color State Mapping:** Exact mapping of colors to states:
   - Which color = default/unsorted?
   - Which color = currently comparing?
   - Which color = just swapped?
   - Which color = in sorted position?

5. **Mobile Breakpoints:** At what viewport widths should the layout adjust?

6. **Element Count:** Should the number of elements (50-200) be fixed or user-configurable in the future?

---

## Appendix: Sorting Algorithm Reference

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space |
|-----------|-------------|------------|--------------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
