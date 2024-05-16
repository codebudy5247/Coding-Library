/**
 * Remove Duplicate characters from array of element.
 * I/P arr = ["apple", "mango", "apple", "orange", "mango", "mango"];
 * O/P arr = [ 'apple', 'mango', 'orange' ]
 */

let arr = ["apple", "mango", "apple", "orange", "mango", "mango"];

//1st method
function removeDuplicates(arr) {
  const uniqueArray = [];

  for (let i = 0; i < arr.length; i++) {
    if (uniqueArray.indexOf(arr[i]) === -1) {
      uniqueArray.push(arr[i]);
    }
  }
  return uniqueArray;
}
console.log(removeDuplicates(arr));

// JS filter method
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log(removeDuplicates(arr));

//JS set method
let unique = [...new Set(arr)];
console.log(unique);
