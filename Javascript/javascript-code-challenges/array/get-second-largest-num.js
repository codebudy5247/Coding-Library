/**
 * [2 4 4 6 5]  ==> 5
 * [10,5,10] ==> 5
 */

/**
 * Returns the second largest number in an array.
 * @param {number[]} arr - The input array.
 * @returns {number} The second largest number in the array, or -1 if there is no second largest number.
 */

// Method 1
function secondLargestNumber(arr) {
  const uniqueElement = Array.from(new Set(arr));

  if (arr.length > 2) {
    uniqueElement.sort((a, b) => b - a);
  } else {
    return -1;
  }
  return uniqueElement[1];
}

// Optimized method
function secondLargestNumberOptimized(arr) {
  let largest = Number.NEGATIVE_INFINITY;
  let secondLargest = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] != largest && arr[i] > secondLargest) {
      secondLargest = arr[i];
    }
  }
  return secondLargest;
}

/**
[12, 35, 1, 10, 34, 1]

Iteration 1 (i = 0):
arr[i] = 12
12 > largest (true)
secondLargest = largest (secondLargest = -Infinity)
largest = arr[i] (largest = 12)
Current state: largest = 12, secondLargest = -Infinity

Iteration 2 (i = 1):
arr[i] = 35
35 > largest (true)
secondLargest = largest (secondLargest = 12)
largest = arr[i] (largest = 35)
Current state: largest = 35, secondLargest = 12

Iteration 3 (i = 2):
arr[i] = 1
1 > largest (false)
1 != largest && 1 > secondLargest (false)
Current state: largest = 35, secondLargest = 12

Iteration 4 (i = 3):
arr[i] = 10
10 > largest (false)
10 != largest && 10 > secondLargest (false)
Current state: largest = 35, secondLargest = 12

Iteration 5 (i = 4):
arr[i] = 34
34 > largest (false)
34 != largest && 34 > secondLargest (true)
secondLargest = arr[i] (secondLargest = 34)
Current state: largest = 35, secondLargest = 34

Iteration 6 (i = 5):
arr[i] = 1
1 > largest (false)
1 != largest && 1 > secondLargest (false)
Current state: largest = 35, secondLargest = 34

 */

console.log(secondLargestNumber([12, 35, 1, 10, 34, 1]));
console.log(secondLargestNumber([10, 5, 10]));
