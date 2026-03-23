/**
 * Reverse a array
 * Input :  arr[] = {4, 5, 1, 2}
 * Output : arr[] = {2, 1, 5, 4}
 */

let arr = [1, 2, 3, 4, 5];

// Using reverse method
const reverseArray = (arr) => arr.reverse();
// console.log(reverseArray(arr));

// Without using built in method
function reverseArr(arr) {
  var newArr = [];
  for (var i = 0, j = arr.length - 1; i < arr.length; i++, j--) {      
      newArr[i] = arr[j];
  }   
  return newArr;
}
console.log(reverseArr(arr));

/*
[1, 2, 3, 4, 5]
[5, 4, 3, 2, 1]

Iteration 1 (i = 0, j = 4):
newArr[i] = arr[j] assigns the element at index j of arr to index i of newArr:
newArr[0] = arr[4] (newArr[0] = 5)
newArr = [5]

Iteration 2 (i = 1, j = 3):
newArr[i] = arr[j] assigns the element at index j of arr to index i of newArr:
newArr[1] = arr[3] (newArr[1] = 4)
newArr = [5, 4]

Iteration 3 (i = 2, j = 2):
newArr[i] = arr[j] assigns the element at index j of arr to index i of newArr:
newArr[2] = arr[2] (newArr[2] = 3)
newArr = [5, 4, 3]

Iteration 4 (i = 3, j = 1):
newArr[i] = arr[j] assigns the element at index j of arr to index i of newArr:
newArr[3] = arr[1] (newArr[3] = 2)
newArr = [5, 4, 3, 2]

Iteration 5 (i = 4, j = 0):
newArr[i] = arr[j] assigns the element at index j of arr to index i of newArr:
newArr[4] = arr[0] (newArr[4] = 1)
newArr = [5, 4, 3, 2, 1]

*/