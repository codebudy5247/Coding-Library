/*
Given an array numbers of size n storing n different integers which fall within the 
range [0, n], implement a function to identify the missing element in the array. All numbers 
except one are present in the array. Find the missing number.

Input: numbers = [1,3,0]
Output: 2
Explanation: The array has a size of 3, and within the range from 0 to 3, the number 2 is 
missing from the array

Input: numbers = [1]
Output: 0
Explanation: The array has a size of 1, and within the range from 0 to 1, the number 0 is 
missing from the array

*/

// Using js functions
function findMissingNumberInSequence(numbers) {
  let n = numbers.length;
  let sum = (n * (n + 1)) / 2;
  let total = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum - total;
}

// Without using js functions
function findMissingNumberInSequence1(numbers) {
  let n = numbers.length;
  let sum = (n * (n + 1)) / 2;
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += numbers[i];
  }
  return sum - total;
}

console.log(findMissingNumberInSequence([1, 3, 0])); // 2
console.log(findMissingNumberInSequence([1])); // 0

console.log(findMissingNumberInSequence1([1, 3, 0])); // 2
console.log(findMissingNumberInSequence1([1])); // 0
