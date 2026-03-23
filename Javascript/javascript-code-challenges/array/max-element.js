/**
 * Find the maximum number in an array.
 * I/P arr[] = {10, 324, 45, 90, 9808}
 * O/P 9808
 */

let arr = [10, 324, 45, 90, 9808];

//Iterative approach
function largest(arr) {
  let i;
  // Initialize maximum element
  let max = arr[0];
  // Traverse array elements
  // from second and compare
  // every element with current max
  for (i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }

  return max;
}
console.log(largest(arr));

//Using sort method
function findMax(arr) {
  // Sort the array in ascending order
  arr.sort((a,b) => a-b)

  // The maximum value will be the last element after sorting
  return arr[arr.length - 1];
}
console.log(findMax(arr));