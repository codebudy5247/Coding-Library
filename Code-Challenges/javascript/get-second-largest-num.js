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

console.log(secondLargestNumber([12, 35, 1, 10, 34, 1]));
console.log(secondLargestNumber([10, 5, 10]));
