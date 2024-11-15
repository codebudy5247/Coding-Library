/*
Create a function that will accept 2 arrays arr1 and arr2.The function should return 
true if every val in arr1 has its corresponding value squared IN arr2.The frequency of 
value must be same.

[2,3,5,2] ,[4,9,25,4] ==> true
[2,3,5,2] ,[4,9,25,3] ==> false

*/

function checkSquaredArr(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let sortedArr1 = arr1.slice().sort((a, b) => a - b);
  let sortedArr2 = arr2.slice().sort((a, b) => a - b);
  
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] ** 2 !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

console.log(checkSquaredArr([2, 3, 5, 2], [4, 9, 25, 4]));
console.log(checkSquaredArr([2, 3, 5, 2], [4, 9, 7, 3]));
