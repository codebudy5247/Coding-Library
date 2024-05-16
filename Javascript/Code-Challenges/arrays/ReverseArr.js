/**
 * Reverse a array
 * Input :  arr[] = {4, 5, 1, 2}
 * Output : arr[] = {2, 1, 5, 4}
 */

let arr = [4, 5, 1, 2];

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