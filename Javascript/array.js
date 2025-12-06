/* 
   WHAT IS AN ARRAY?
   - Ordered collection of elements
   - Can hold any data type (mixed types allowed)
   - Zero-indexed (first element at index 0)
   - Dynamic size (can grow or shrink)
   - Reference type (passed by reference)
*/

// ============================================
// 1️⃣ CREATING ARRAYS
// ============================================

//✅ Array Literal (Most Common)
const arr1 = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null, { a: 1 }, [1, 2]];
console.log(arr1); // [1, 2, 3, 4, 5]

//✅ Array Constructor
const arr2 = new Array(5); // Creates array with 5 empty slots
const arr3 = new Array(1, 2, 3); // Creates [1, 2, 3]
console.log(arr2.length); // 5
console.log(arr3); // [1, 2, 3]

//✅ Array.of() - Create array from arguments
const arr4 = Array.of(5); // [5] (not an array with 5 slots)
const arr5 = Array.of(1, 2, 3); // [1, 2, 3]
console.log(arr4); // [5]

//✅ Array.from() - Create array from iterable or array-like
const str = 'hello';
const chars = Array.from(str); // ['h', 'e', 'l', 'l', 'o']
const range = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
console.log(range);

//✅ Spread Operator
const original = [1, 2, 3];
const copy = [...original]; // Shallow copy
const combined = [...original, 4, 5, 6];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// ============================================
// 2️⃣ ACCESSING & MODIFYING ELEMENTS
// ============================================

const fruits = ['apple', 'banana', 'orange', 'mango'];

//✅ Access by Index
console.log(fruits[0]); // 'apple'
console.log(fruits[fruits.length - 1]); // 'mango' (last element)

//✅ at() Method - Supports negative indices
console.log(fruits.at(0)); // 'apple'
console.log(fruits.at(-1)); // 'mango' (last element)
console.log(fruits.at(-2)); // 'orange' (second to last)

//✅ Modify Elements
fruits[1] = 'blueberry';
console.log(fruits); // ['apple', 'blueberry', 'orange', 'mango']

//✅ Array Length
console.log(fruits.length); // 4
fruits.length = 2; // Truncate array
console.log(fruits); // ['apple', 'blueberry']

// ============================================
// 3️⃣ ADDING & REMOVING ELEMENTS
// ============================================

const nums = [1, 2, 3];

//✅ push() - Add to end - O(1)
nums.push(4);
nums.push(5, 6); // Can add multiple
console.log(nums); // [1, 2, 3, 4, 5, 6]

//✅ pop() - Remove from end - O(1)
const last = nums.pop();
console.log(last); // 6
console.log(nums); // [1, 2, 3, 4, 5]

//✅ unshift() - Add to beginning - O(n)
nums.unshift(0);
nums.unshift(-2, -1); // Can add multiple
console.log(nums); // [-2, -1, 0, 1, 2, 3, 4, 5]

//✅ shift() - Remove from beginning - O(n)
const first = nums.shift();
console.log(first); // -2
console.log(nums); // [-1, 0, 1, 2, 3, 4, 5]

//✅ splice() - Add/Remove at any position - O(n)
const items = [1, 2, 3, 4, 5];
// splice(startIndex, deleteCount, items to add...)
items.splice(2, 0, 2.5); // Insert 2.5 at index 2
console.log(items); // [1, 2, 2.5, 3, 4, 5]

items.splice(2, 1); // Remove 1 element at index 2
console.log(items); // [1, 2, 3, 4, 5]

const removed = items.splice(1, 2, 'a', 'b'); // Remove 2, add 'a', 'b'
console.log(items); // [1, 'a', 'b', 4, 5]
console.log(removed); // [2, 3]

// ============================================
// 4️⃣ ARRAY ITERATION METHODS
// ============================================

const numbers = [1, 2, 3, 4, 5];

//✅ forEach() - Execute function for each element
numbers.forEach((num, index, array) => {
    console.log(`Index ${index}: ${num}`);
});

//✅ map() - Transform each element - O(n)
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

//✅ filter() - Keep elements that pass test - O(n)
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

//✅ reduce() - Reduce to single value - O(n)
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

//✅ reduceRight() - Reduce from right to left
const reversed = numbers.reduceRight((acc, num) => [...acc, num], []);
console.log(reversed); // [5, 4, 3, 2, 1]

//✅ find() - Find first element that passes test - O(n)
const found = numbers.find(num => num > 3);
console.log(found); // 4

//✅ findIndex() - Find index of first match - O(n)
const index = numbers.findIndex(num => num > 3);
console.log(index); // 3

//✅ findLast() - Find last element that passes test
const lastEven = [1, 2, 3, 4, 5, 6].findLast(num => num % 2 === 0);
console.log(lastEven); // 6

//✅ findLastIndex() - Find index of last match
const lastIndex = [1, 2, 3, 4, 5, 6].findLastIndex(num => num % 2 === 0);
console.log(lastIndex); // 5

//✅ some() - Check if ANY element passes test - O(n)
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

//✅ every() - Check if ALL elements pass test - O(n)
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

//✅ includes() - Check if array contains value - O(n)
console.log(numbers.includes(3)); // true
console.log(numbers.includes(10)); // false

//✅ indexOf() - Find first index of value - O(n)
console.log(numbers.indexOf(3)); // 2
console.log(numbers.indexOf(10)); // -1

//✅ lastIndexOf() - Find last index of value - O(n)
const dup = [1, 2, 3, 2, 1];
console.log(dup.lastIndexOf(2)); // 3

// ============================================
// 5️⃣ ARRAY TRANSFORMATION METHODS
// ============================================

//✅ slice() - Extract portion (doesn't modify original) - O(n)
const letters = ['a', 'b', 'c', 'd', 'e'];
const sliced = letters.slice(1, 4); // From index 1 to 3 (4 not included)
console.log(sliced); // ['b', 'c', 'd']
console.log(letters); // ['a', 'b', 'c', 'd', 'e'] - unchanged

const lastTwo = letters.slice(-2); // Last 2 elements
console.log(lastTwo); // ['d', 'e']

//✅ concat() - Merge arrays - O(n + m)
const arr6 = [1, 2];
const arr7 = [3, 4];
const merged = arr6.concat(arr7, [5, 6]);
console.log(merged); // [1, 2, 3, 4, 5, 6]

//✅ join() - Convert to string - O(n)
const words = ['Hello', 'World'];
console.log(words.join(' ')); // 'Hello World'
console.log(words.join('-')); // 'Hello-World'

//✅ reverse() - Reverse in place (mutates) - O(n)
const original2 = [1, 2, 3, 4, 5];
original2.reverse();
console.log(original2); // [5, 4, 3, 2, 1]

//✅ sort() - Sort in place (mutates) - O(n log n)
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
unsorted.sort(); // Sorts as strings by default!
console.log(unsorted); // [1, 1, 2, 3, 4, 5, 6, 9]

// Numeric sort
const nums2 = [10, 2, 30, 1, 20];
nums2.sort((a, b) => a - b); // Ascending
console.log(nums2); // [1, 2, 10, 20, 30]

// Descending sort
nums2.sort((a, b) => b - a);
console.log(nums2); // [30, 20, 10, 2, 1]

// Sort objects
const users = [
    { name: 'Charlie', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 }
];
users.sort((a, b) => a.age - b.age);
console.log(users); // Sorted by age ascending

//✅ flat() - Flatten nested arrays - O(n)
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]] - 1 level
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6] - 2 levels
console.log(nested.flat(Infinity)); // Flatten all levels

//✅ flatMap() - Map then flatten - O(n)
const sentences = ['hello world', 'foo bar'];
const allWords = sentences.flatMap(s => s.split(' '));
console.log(allWords); // ['hello', 'world', 'foo', 'bar']

//✅ fill() - Fill with value - O(n)
const arr8 = new Array(5).fill(0);
console.log(arr8); // [0, 0, 0, 0, 0]

const arr9 = [1, 2, 3, 4, 5];
arr9.fill(9, 2, 4); // Fill with 9 from index 2 to 3
console.log(arr9); // [1, 2, 9, 9, 5]

//✅ copyWithin() - Copy part of array to another location - O(n)
const arr10 = [1, 2, 3, 4, 5];
arr10.copyWithin(0, 3); // Copy from index 3 to index 0
console.log(arr10); // [4, 5, 3, 4, 5]

// ============================================
// 6️⃣ ARRAY STATIC METHODS
// ============================================

//✅ Array.isArray() - Check if value is array
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello')); // false
console.log(Array.isArray({ length: 0 })); // false

//✅ Array.from() with mapping function
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2);
console.log(squares); // [1, 4, 9, 16, 25]

// Convert Set to Array
const set = new Set([1, 2, 2, 3, 3]);
const uniqueArr = Array.from(set);
console.log(uniqueArr); // [1, 2, 3]

// ============================================
// 7️⃣ COMMON INTERVIEW PATTERNS
// ============================================

//🔥 PATTERN 1: Remove Duplicates - O(n)
function removeDuplicates(arr) {
    return [...new Set(arr)];
}
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]

// Alternative with filter
function removeDuplicatesFilter(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

//🔥 PATTERN 2: Flatten Array Recursively
function flattenDeep(arr) {
    return arr.reduce((acc, val) =>
        Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []
    );
}
console.log(flattenDeep([1, [2, [3, [4, 5]]]])); // [1, 2, 3, 4, 5]

//🔥 PATTERN 3: Chunk Array - O(n)
function chunk(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}
console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1,2,3], [4,5,6], [7]]

//🔥 PATTERN 4: Array Intersection - O(n + m)
function intersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}
console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]

//🔥 PATTERN 5: Array Difference - O(n + m)
function difference(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => !set2.has(item));
}
console.log(difference([1, 2, 3, 4], [3, 4, 5, 6])); // [1, 2]

//🔥 PATTERN 6: Group By - O(n)
function groupBy(arr, key) {
    return arr.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        (result[groupKey] = result[groupKey] || []).push(item);
        return result;
    }, {});
}

const students = [
    { name: 'Alice', grade: 'A' },
    { name: 'Bob', grade: 'B' },
    { name: 'Charlie', grade: 'A' }
];
console.log(groupBy(students, 'grade'));
// {A: [{name: 'Alice', grade: 'A'}, {name: 'Charlie', grade: 'A'}], B: [...]}

//🔥 PATTERN 7: Array Rotation - O(n)
function rotateLeft(arr, k) {
    k = k % arr.length;
    return [...arr.slice(k), ...arr.slice(0, k)];
}

function rotateRight(arr, k) {
    k = k % arr.length;
    return [...arr.slice(-k), ...arr.slice(0, -k)];
}

console.log(rotateLeft([1, 2, 3, 4, 5], 2)); // [3, 4, 5, 1, 2]
console.log(rotateRight([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]

//🔥 PATTERN 8: Partition Array - O(n)
function partition(arr, predicate) {
    return arr.reduce(
        ([pass, fail], item) =>
            predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
        [[], []]
    );
}

const [evens2, odds] = partition([1, 2, 3, 4, 5, 6], num => num % 2 === 0);
console.log(evens2); // [2, 4, 6]
console.log(odds); // [1, 3, 5]

//🔥 PATTERN 9: Array Zip - O(min(n, m))
function zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    return Array.from({ length: maxLength }, (_, i) =>
        arrays.map(arr => arr[i])
    );
}

console.log(zip([1, 2, 3], ['a', 'b', 'c']));
// [[1, 'a'], [2, 'b'], [3, 'c']]

//🔥 PATTERN 10: Moving Average - O(n)
function movingAverage(arr, windowSize) {
    const result = [];
    for (let i = 0; i <= arr.length - windowSize; i++) {
        const window = arr.slice(i, i + windowSize);
        const avg = window.reduce((a, b) => a + b, 0) / windowSize;
        result.push(avg);
    }
    return result;
}

console.log(movingAverage([1, 2, 3, 4, 5], 3)); // [2, 3, 4]

// ============================================
// 8️⃣ INTERVIEW QUESTIONS WITH SOLUTIONS
// ============================================

//❓ Q1: Two Sum - Find indices of two numbers that add up to target
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return null;
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

//❓ Q2: Maximum Subarray Sum (Kadane's Algorithm)
function maxSubarraySum(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 ([4,-1,2,1])

//❓ Q3: Rotate Array In-Place
function rotateArray(nums, k) {
    k = k % nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
    return nums;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // [5, 6, 7, 1, 2, 3, 4]

//❓ Q4: Find Missing Number (1 to n)
function findMissingNumber(nums) {
    const n = nums.length + 1;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
console.log(findMissingNumber([1, 2, 4, 5, 6])); // 3

//❓ Q5: Product of Array Except Self (without division)
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]

//❓ Q6: Find All Duplicates in Array
function findDuplicates(nums) {
    const result = [];
    for (let num of nums) {
        const index = Math.abs(num) - 1;
        if (nums[index] < 0) {
            result.push(Math.abs(num));
        } else {
            nums[index] = -nums[index];
        }
    }
    return result;
}
// Note: This modifies input array
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2, 3]

//❓ Q7: Merge Sorted Arrays
function mergeSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i++]);
        } else {
            result.push(arr2[j++]);
        }
    }

    return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]

//❓ Q8: Move Zeros to End
function moveZeros(nums) {
    let writeIndex = 0;

    // Move non-zeros forward
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex++] = nums[readIndex];
        }
    }

    // Fill rest with zeros
    while (writeIndex < nums.length) {
        nums[writeIndex++] = 0;
    }

    return nums;
}
console.log(moveZeros([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]

//❓ Q9: Find Kth Largest Element
function findKthLargest(nums, k) {
    // Using sort - O(n log n)
    return nums.sort((a, b) => b - a)[k - 1];
}

// Better: Using QuickSelect - O(n) average
function quickSelect(arr, k) {
    k = arr.length - k; // Convert to kth smallest

    function partition(left, right, pivotIndex) {
        const pivotValue = arr[pivotIndex];
        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
                storeIndex++;
            }
        }

        [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
        return storeIndex;
    }

    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
        const pivotPosition = partition(left, right, pivotIndex);

        if (pivotPosition === k) return arr[k];
        else if (pivotPosition < k) left = pivotPosition + 1;
        else right = pivotPosition - 1;
    }
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5

//❓ Q10: Subarray with Given Sum
function subarraySum(nums, target) {
    const map = new Map([[0, -1]]); // sum -> index
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (map.has(sum - target)) {
            const start = map.get(sum - target) + 1;
            return nums.slice(start, i + 1);
        }
        map.set(sum, i);
    }

    return null;
}
console.log(subarraySum([1, 2, 3, 4, 5], 9)); // [2, 3, 4]

// ============================================
// 9️⃣ ADVANCED PATTERNS
// ============================================

//🔥 Sliding Window - Find max sum of k consecutive elements
function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;

    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;

    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
console.log(maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39

//🔥 Two Pointers - Container With Most Water
function maxArea(heights) {
    let maxArea = 0;
    let left = 0;
    let right = heights.length - 1;

    while (left < right) {
        const width = right - left;
        const height = Math.min(heights[left], heights[right]);
        maxArea = Math.max(maxArea, width * height);

        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49

//🔥 Dutch National Flag - Sort array of 0s, 1s, 2s
function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }

    return nums;
}
console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]

//🔥 Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 5)); // 4

// ============================================
// 🔟 EDGE CASES & GOTCHAS
// ============================================

//⚠️ Array Reference vs Copy
const arr11 = [1, 2, 3];
const ref = arr11; // Reference copy
ref.push(4);
console.log(arr11); // [1, 2, 3, 4] - original affected!

const copy1 = [...arr11]; // Shallow copy
copy1.push(5);
console.log(arr11); // [1, 2, 3, 4] - not affected

//⚠️ Shallow Copy Issue with Nested Arrays
const nested2 = [[1, 2], [3, 4]];
const shallowCopy = [...nested2];
shallowCopy[0].push(99);
console.log(nested2); // [[1, 2, 99], [3, 4]] - nested array affected!

//⚠️ sort() Default Behavior (converts to strings!)
const nums3 = [1, 2, 10, 20];
nums3.sort();
console.log(nums3); // [1, 10, 2, 20] - Wrong! Sorted as strings

nums3.sort((a, b) => a - b);
console.log(nums3); // [1, 2, 10, 20] - Correct

//⚠️ Sparse Arrays (holes)
const sparse = [1, , 3]; // Has a hole at index 1
console.log(sparse.length); // 3
console.log(sparse[1]); // undefined
console.log(1 in sparse); // false - no property at index 1

//⚠️ forEach vs for...of with empty slots
const sparseArr = [1, , 3];
sparseArr.forEach(x => console.log(x)); // 1, 3 (skips hole)
for (let x of sparseArr) console.log(x); // 1, undefined, 3

//⚠️ Array-like objects vs Arrays
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
// arrayLike.push('c'); // Error - not an array!
const realArray = Array.from(arrayLike);
realArray.push('c'); // OK
console.log(realArray); // ['a', 'b', 'c']

//⚠️ Mutating Methods
// These modify the original array:
// push, pop, shift, unshift, splice, reverse, sort, fill, copyWithin

// These return new arrays:
// map, filter, slice, concat, flat, flatMap

// ============================================
// 1️⃣1️⃣ PERFORMANCE TIPS
// ============================================

/*
   TIME COMPLEXITY CHEAT SHEET:
   
   Access by index: O(1)
   
   push/pop: O(1)
   shift/unshift: O(n) - need to reindex
   
   splice: O(n)
   slice: O(n)
   concat: O(n + m)
   
   indexOf/includes: O(n)
   find/filter/map/reduce: O(n)
   
   sort: O(n log n)
   
   SPACE COMPLEXITY:
   Most methods: O(n) for creating new arrays
   In-place methods (sort, reverse): O(1) extra space
*/

//💡 Performance Tips:
// 1. Use for loop for best performance in hot code
// 2. Cache array.length in loops if not changing
// 3. Use push() over concat() for adding single items
// 4. Avoid splice() in tight loops - expensive
// 5. Use Set for uniqueness checks instead of includes()

// Fast iteration
const arr12 = [1, 2, 3, 4, 5];
for (let i = 0, len = arr12.length; i < len; i++) {
    // Fastest iteration
}

// ============================================
// 1️⃣2️⃣ MODERN ARRAY FEATURES
// ============================================

//✅ Array Destructuring
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements
const [first2, , third] = [1, 2, 3];
console.log(first2, third); // 1 3

// Rest operator
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [5];
console.log(x, y); // 5 20

//✅ Swap variables
let var1 = 1, var2 = 2;
[var1, var2] = [var2, var1];
console.log(var1, var2); // 2 1

//✅ Array.prototype.with() - Immutable update at index
const arr13 = [1, 2, 3, 4, 5];
const arr14 = arr13.with(2, 99); // Update index 2 to 99
console.log(arr13); // [1, 2, 3, 4, 5] - unchanged
console.log(arr14); // [1, 2, 99, 4, 5] - new array

//✅ Array.prototype.toSorted() - Immutable sort
const arr15 = [3, 1, 4, 1, 5];
const sorted = arr15.toSorted();
console.log(arr15); // [3, 1, 4, 1, 5] - unchanged
console.log(sorted); // [1, 1, 3, 4, 5]

//✅ Array.prototype.toReversed() - Immutable reverse
const arr16 = [1, 2, 3, 4, 5];
const reversed2 = arr16.toReversed();
console.log(arr16); // [1, 2, 3, 4, 5] - unchanged
console.log(reversed2); // [5, 4, 3, 2, 1]

//✅ Array.prototype.toSpliced() - Immutable splice
const arr17 = [1, 2, 3, 4, 5];
const spliced = arr17.toSpliced(2, 1, 99);
console.log(arr17); // [1, 2, 3, 4, 5] - unchanged
console.log(spliced); // [1, 2, 99, 4, 5]

/* ============================================
   💡 KEY TAKEAWAYS FOR INTERVIEWS:
   ============================================
   1. Arrays are zero-indexed and dynamic in size
   2. Reference type - shallow copy vs deep copy matters
   3. sort() without comparator converts to strings!
   4. Common patterns: two pointers, sliding window, kadane's
   5. Time complexity: O(1) access, O(n) search, O(n log n) sort
   6. Mutating vs non-mutating methods - know the difference
   7. reduce() is powerful - can implement most other methods
   8. Use Set for O(1) lookups vs indexOf O(n)
   9. Modern methods: at(), flat(), flatMap(), with(), toSorted()
   10. Common questions: two sum, max subarray, rotate, merge sorted
   ============================================ */
