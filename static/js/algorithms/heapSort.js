/**
 * Heap Sort Algorithm - Generator Implementation
 *
 * Heap Sort builds a max-heap from the array, then repeatedly extracts
 * the maximum element and places it at the end of the sorted portion.
 *
 * Time Complexity: O(n log n) for all cases
 * Space Complexity: O(1)
 */

/**
 * Heap Sort generator function
 * @param {number[]} inputArray - Array to sort
 * @yields {Object} State object with array, comparing indices, swapped indices, sorted indices, and metrics
 */
function* heapSort(inputArray) {
    const array = [...inputArray];
    const n = array.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted = [];

    /**
     * Heapify a subtree rooted at index i
     * @param {number} heapSize - Size of the heap
     * @param {number} i - Root index of subtree
     */
    function* heapify(heapSize, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        // Compare with left child
        if (left < heapSize) {
            comparisons++;

            yield {
                array: [...array],
                comparing: [largest, left],
                swapped: [],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            if (array[left] > array[largest]) {
                largest = left;
            }
        }

        // Compare with right child
        if (right < heapSize) {
            comparisons++;

            yield {
                array: [...array],
                comparing: [largest, right],
                swapped: [],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            if (array[right] > array[largest]) {
                largest = right;
            }
        }

        // If largest is not root, swap and continue heapifying
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            swaps++;

            yield {
                array: [...array],
                comparing: [],
                swapped: [i, largest],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            // Recursively heapify the affected subtree
            yield* heapify(heapSize, largest);
        }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        swaps++;

        // Mark the extracted element as sorted
        sorted.push(i);

        yield {
            array: [...array],
            comparing: [],
            swapped: [0, i],
            sorted: [...sorted],
            metrics: { comparisons, swaps }
        };

        // Heapify the reduced heap
        yield* heapify(i, 0);
    }

    // Mark first element as sorted
    sorted.push(0);

    // Final yield with all elements sorted
    yield {
        array: [...array],
        comparing: [],
        swapped: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        metrics: { comparisons, swaps }
    };

    return { array, comparisons, swaps };
}

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = heapSort;
}
