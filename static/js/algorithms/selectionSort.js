/**
 * Selection Sort Algorithm - Generator Implementation
 *
 * Selection Sort divides the array into a sorted and unsorted region.
 * It repeatedly selects the smallest element from the unsorted region
 * and moves it to the end of the sorted region.
 *
 * Time Complexity: O(n²) for all cases
 * Space Complexity: O(1)
 */

/**
 * Selection Sort generator function
 * @param {number[]} inputArray - Array to sort
 * @yields {Object} State object with array, comparing indices, swapped indices, sorted indices, and metrics
 */
function* selectionSort(inputArray) {
    const array = [...inputArray];
    const n = array.length;
    const sorted = [];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Find minimum element in unsorted portion
        for (let j = i + 1; j < n; j++) {
            comparisons++;

            // Yield comparing state
            yield {
                array: [...array],
                comparing: [minIndex, j],
                swapped: [],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Swap if minimum is not already in position
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            swaps++;

            // Yield swapped state
            yield {
                array: [...array],
                comparing: [],
                swapped: [i, minIndex],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };
        }

        // Mark position as sorted
        sorted.push(i);

        // Yield state showing newly sorted element
        yield {
            array: [...array],
            comparing: [],
            swapped: [],
            sorted: [...sorted],
            metrics: { comparisons, swaps }
        };
    }

    // Mark last element as sorted
    sorted.push(n - 1);

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
    module.exports = selectionSort;
}
