/*
Given an array of integers numbers, write a function that returns the indices of two integers within the 
numbers array that sum up to a target integer. The smaller index should appear first.

Input: numbers = [0,7,1,9], target = 7
Output: [0,1]
Explanation: numbers[0] plus numbers[1] = 7 which is target

Input: numbers = [4,4], target = 8
Output: [0,1]

*/

const pairSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

console.log(pairSum([0, 7, 1, 9], 7)); // [0, 1]
console.log(pairSum([4, 4], 8)); // [0, 1]

// Time complexity: O(n^2)

