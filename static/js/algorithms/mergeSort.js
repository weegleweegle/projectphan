/**
 * Merge Sort Algorithm - Generator Implementation
 *
 * Merge Sort is a divide-and-conquer algorithm that divides the array
 * into halves, recursively sorts them, and then merges the sorted halves.
 *
 * Time Complexity: O(n log n) for all cases
 * Space Complexity: O(n)
 */

/**
 * Merge Sort generator function
 * @param {number[]} inputArray - Array to sort
 * @yields {Object} State object with array, comparing indices, swapped indices, sorted indices, and metrics
 */
function* mergeSort(inputArray) {
    const array = [...inputArray];
    const n = array.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted = [];

    /**
     * Merge two sorted subarrays
     */
    function* merge(left, mid, right) {
        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;

            // Yield comparing state
            yield {
                array: [...array],
                comparing: [left + i, mid + 1 + j],
                swapped: [],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            if (leftArr[i] <= rightArr[j]) {
                array[k] = leftArr[i];
                i++;
            } else {
                array[k] = rightArr[j];
                j++;
            }
            swaps++;

            // Yield after placing element
            yield {
                array: [...array],
                comparing: [],
                swapped: [k],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            k++;
        }

        // Copy remaining elements from left array
        while (i < leftArr.length) {
            array[k] = leftArr[i];
            swaps++;

            yield {
                array: [...array],
                comparing: [],
                swapped: [k],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            i++;
            k++;
        }

        // Copy remaining elements from right array
        while (j < rightArr.length) {
            array[k] = rightArr[j];
            swaps++;

            yield {
                array: [...array],
                comparing: [],
                swapped: [k],
                sorted: [...sorted],
                metrics: { comparisons, swaps }
            };

            j++;
            k++;
        }
    }

    /**
     * Recursive merge sort
     */
    function* mergeSortRecursive(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            // Sort left half
            yield* mergeSortRecursive(left, mid);

            // Sort right half
            yield* mergeSortRecursive(mid + 1, right);

            // Merge the sorted halves
            yield* merge(left, mid, right);

            // If this is the final merge, mark all as sorted
            if (left === 0 && right === n - 1) {
                for (let i = 0; i < n; i++) {
                    if (!sorted.includes(i)) {
                        sorted.push(i);
                    }
                }
            }
        }
    }

    // Run the recursive sort
    yield* mergeSortRecursive(0, n - 1);

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
    module.exports = mergeSort;
}
