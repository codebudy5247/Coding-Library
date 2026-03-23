/*
Given an array of integers numbers, determine whether the array contains any duplicate values. 
A duplicate is defined as any number that appears more than once in the array.

Input: numbers = [5,7,1,3]
Output: false
*/

function findDuplicates(numbers) {
  const seen = new Set();
  for (let num of numbers) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

console.log(findDuplicates([5, 7, 1, 3]));
console.log(findDuplicates([10, 7, 0, 0, 9]));

// Without using Set method
function findDuplicates1(numbers) {
  const seen = {};
  for (let num of numbers) {
    if (seen[num]) {
      return true;
    }
    seen[num] = true;
  }
  return false;
}

console.log(findDuplicates1([5, 7, 1, 3]));
