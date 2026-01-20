/**
 * Quick Sort Algorithm - Generator Implementation
 *
 * Quick Sort is a divide-and-conquer algorithm that selects a 'pivot'
 * element and partitions the array around it, placing smaller elements
 * before and larger elements after the pivot.
 *
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n)
 */

/**
 * Quick Sort generator function
 * @param {number[]} inputArray - Array to sort
 * @yields {Object} State object with array, comparing indices, swapped indices, sorted indices, pivot, and metrics
 */
function* quickSort(inputArray) {
    const array = [...inputArray];
    const n = array.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted = [];

    /**
     * Partition the array around a pivot
     */
    function* partition(low, high) {
        // Use last element as pivot
        const pivotValue = array[high];
        const pivotIndex = high;

        // Yield showing pivot selection
        yield {
            array: [...array],
            comparing: [],
            swapped: [],
            sorted: [...sorted],
            pivot: pivotIndex,
            metrics: { comparisons, swaps }
        };

        let i = low - 1;

        for (let j = low; j < high; j++) {
            comparisons++;

            // Yield comparing state
            yield {
                array: [...array],
                comparing: [j, pivotIndex],
                swapped: [],
                sorted: [...sorted],
                pivot: pivotIndex,
                metrics: { comparisons, swaps }
            };

            if (array[j] < pivotValue) {
                i++;

                if (i !== j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    swaps++;

                    // Yield swapped state
                    yield {
                        array: [...array],
                        comparing: [],
                        swapped: [i, j],
                        sorted: [...sorted],
                        pivot: pivotIndex,
                        metrics: { comparisons, swaps }
                    };
                }
            }
        }

        // Place pivot in correct position
        const newPivotPos = i + 1;
        if (newPivotPos !== high) {
            [array[newPivotPos], array[high]] = [array[high], array[newPivotPos]];
            swaps++;

            // Yield showing pivot placement
            yield {
                array: [...array],
                comparing: [],
                swapped: [newPivotPos, high],
                sorted: [...sorted],
                pivot: newPivotPos,
                metrics: { comparisons, swaps }
            };
        }

        // Mark pivot position as sorted
        if (!sorted.includes(newPivotPos)) {
            sorted.push(newPivotPos);
        }

        // Yield showing pivot is now sorted
        yield {
            array: [...array],
            comparing: [],
            swapped: [],
            sorted: [...sorted],
            pivot: -1,
            metrics: { comparisons, swaps }
        };

        return newPivotPos;
    }

    /**
     * Recursive quick sort
     */
    function* quickSortRecursive(low, high) {
        if (low < high) {
            // Partition and get pivot position
            const pivotPos = yield* partition(low, high);

            // Recursively sort left partition
            yield* quickSortRecursive(low, pivotPos - 1);

            // Recursively sort right partition
            yield* quickSortRecursive(pivotPos + 1, high);
        } else if (low === high && !sorted.includes(low)) {
            // Single element is sorted
            sorted.push(low);

            yield {
                array: [...array],
                comparing: [],
                swapped: [],
                sorted: [...sorted],
                pivot: -1,
                metrics: { comparisons, swaps }
            };
        }
    }

    // Run the recursive sort
    yield* quickSortRecursive(0, n - 1);

    // Final yield with all elements sorted
    yield {
        array: [...array],
        comparing: [],
        swapped: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        pivot: -1,
        metrics: { comparisons, swaps }
    };

    return { array, comparisons, swaps };
}

// Export for testing (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quickSort;
}
