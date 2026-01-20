/**
 * Insertion Sort Algorithm - Generator Implementation
 *
 * Insertion Sort builds the sorted array one element at a time by
 * repeatedly picking the next element and inserting it into its
 * correct position among the previously sorted elements.
 *
 * Time Complexity: O(n²) average/worst, O(n) best case
 * Space Complexity: O(1)
 */

/**
 * Insertion Sort generator function
 * @param {number[]} inputArray - Array to sort
 * @yields {Object} State object with array, comparing indices, swapped indices, sorted indices, and metrics
 */
function* insertionSort(inputArray) {
    const array = [...inputArray];
    const n = array.length;
    const sorted = [0]; // First element is considered sorted
    let comparisons = 0;
    let swaps = 0;

    // Yield initial state
    yield {
        array: [...array],
        comparing: [],
        swapped: [],
        sorted: [...sorted],
        metrics: { comparisons, swaps }
    };

    for (let i = 1; i < n; i++) {
        let j = i;

        // Compare and shift elements
        while (j > 0) {
            comparisons++;

            // Yield comparing state
            yield {
                array: [...array],
                comparing: [j - 1, j],
                swapped: [],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            if (array[j - 1] > array[j]) {
                // Swap elements
                [array[j - 1], array[j]] = [array[j], array[j - 1]];
                swaps++;

                // Yield swapped state
                yield {
                    array: [...array],
                    comparing: [],
                    swapped: [j - 1, j],
                    sorted: [...sorted],
                    metrics: { comparisons, swaps }
                };

                j--;
            } else {
                break;
            }
        }

        // Mark position as part of sorted region
        sorted.push(i);

        // Yield state showing expanded sorted region
        yield {
            array: [...array],
            comparing: [],
            swapped: [],
            sorted: [...sorted],
            metrics: { comparisons, swaps }
        };
    }

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
    module.exports = insertionSort;
}
