/**
 * Bubble Sort Algorithm - Generator Implementation
 *
 * Bubble Sort repeatedly steps through the list, compares adjacent elements,
 * and swaps them if they are in the wrong order. The pass through the list
 * is repeated until the list is sorted.
 *
 * Time Complexity: O(n²) average and worst case, O(n) best case
 * Space Complexity: O(1)
 */

/**
 * Bubble Sort generator function
 * @param {number[]} inputArray - Array to sort
 * @yields {Object} State object with array, comparing indices, swapped indices, sorted indices, and metrics
 */
function* bubbleSort(inputArray) {
    const array = [...inputArray];
    const n = array.length;
    const sorted = [];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            // Yield comparing state
            comparisons++;
            yield {
                array: [...array],
                comparing: [j, j + 1],
                swapped: [],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                swapped = true;

                // Yield swapped state
                yield {
                    array: [...array],
                    comparing: [],
                    swapped: [j, j + 1],
                    sorted: [...sorted],
                    metrics: { comparisons, swaps }
                };
            }
        }

        // Mark the last unsorted element as sorted
        sorted.unshift(n - i - 1);

        // Yield state showing newly sorted element
        yield {
            array: [...array],
            comparing: [],
            swapped: [],
            sorted: [...sorted],
            metrics: { comparisons, swaps }
        };

        // If no swaps occurred, array is sorted
        if (!swapped) {
            // Mark all remaining elements as sorted
            for (let k = 0; k < n - i - 1; k++) {
                if (!sorted.includes(k)) {
                    sorted.push(k);
                }
            }
            break;
        }
    }

    // Ensure first element is marked as sorted
    if (!sorted.includes(0)) {
        sorted.push(0);
    }

    // Sort the sorted array for consistent display
    sorted.sort((a, b) => a - b);

    // Final yield with all elements sorted
    yield {
        array: [...array],
        comparing: [],
        swapped: [],
        sorted: [...sorted],
        metrics: { comparisons, swaps }
    };

    return { array, comparisons, swaps };
}

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bubbleSort;
}
