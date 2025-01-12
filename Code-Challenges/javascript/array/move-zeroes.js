/*
You are given an array of integers, your task is to move all the zeros in the array to the end of the 
array and move non-negative integers to the front by maintaining their order.

Input:
 1 ,0 ,2 ,3 ,0 ,4 ,0 ,1
Output:
 1 ,2 ,3 ,4 ,1 ,0 ,0 ,0
Explanation:
All the zeros are moved to the end and non-negative integers are moved to front by maintaining order

*/

// Solution 1
function moveZeroes(arr) {
  let nonZero = arr.filter((num) => num !== 0);
  let zero = arr.filter((num) => num === 0);
  return [...nonZero, ...zero];
}

// Solution 2
function moveZeroes(arr) {
  let nonZero = [];
  let zero = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      nonZero.push(arr[i]);
    } else {
      zero.push(arr[i]);
    }
  }
  return nonZero.concat(zero);
}

console.log(moveZeroes([1, 0, 2, 3, 0, 4, 0, 1])); // [1,2,3,4,1,0,0,0]
