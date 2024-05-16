/**
 * Calculate the sum of all numbers in an array.
 * I/P arr = [1, 2, 3, 4, 5]
 * O/P 15
 */

let arr = [1, 2, 3, 4, 5];

// Using reduce method
const totalSum = (arr) =>
  arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(totalSum(arr));

function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log(calculateSum(arr));
