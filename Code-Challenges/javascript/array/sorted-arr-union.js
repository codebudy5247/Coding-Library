/*
The union of two arrays can be defined as the common and distinct elements in the two arrays.
NOTE: Elements in the union should be in ascending order.

Input:
n = 5,m = 5.
arr1[] = {1,2,3,4,5}  
arr2[] = {2,3,4,4,5}
Output:
{1,2,3,4,5}
Explanation: 
Common Elements in arr1 and arr2  are:  2,3,4,5
Distnict Elements in arr1 are : 1
Distnict Elemennts in arr2 are : No distinct elements.
Union of arr1 and arr2 is {1,2,3,4,5}

Input:
n = 10,m = 7.
arr1[] = {1,2,3,4,5,6,7,8,9,10}
arr2[] = {2,3,4,4,5,11,12}
Output:
{1,2,3,4,5,6,7,8,9,10,11,12}
Explanation:
Common Elements in arr1 and arr2  are:  2,3,4,5
Distnict Elements in arr1 are : 1,6,7,8,9,10
Distnict Elemennts in arr2 are : 11,12
Union of arr1 and arr2 is {1,2,3,4,5,6,7,8,9,10,11,12}

*/

// Solution 1
// function sortedArrUnion(arr1, arr2) {
//   let mergedArr = [];
//   let i = 0;
//   let j = 0;

//   // Merge the two sorted arrays while removing duplicates
//   while (i < arr1.length && j < arr2.length) {
//     if (arr1[i] < arr2[j]) {
//       if (
//         mergedArr.length === 0 ||
//         mergedArr[mergedArr.length - 1] !== arr1[i]
//       ) {
//         mergedArr.push(arr1[i]);
//       }
//       i++;
//     } else if (arr1[i] > arr2[j]) {
//       if (
//         mergedArr.length === 0 ||
//         mergedArr[mergedArr.length - 1] !== arr2[j]
//       ) {
//         mergedArr.push(arr2[j]);
//       }
//       j++;
//     } else {
//       // Handle equal elements
//       if (
//         mergedArr.length === 0 ||
//         mergedArr[mergedArr.length - 1] !== arr1[i]
//       ) {
//         mergedArr.push(arr1[i]);
//       }
//       i++;
//       j++;
//     }
//   }

//   // Handle remaining elements in arr1
//   while (i < arr1.length) {
//     if (mergedArr.length === 0 || mergedArr[mergedArr.length - 1] !== arr1[i]) {
//       mergedArr.push(arr1[i]);
//     }
//     i++;
//   }

//   // Handle remaining elements in arr2
//   while (j < arr2.length) {
//     if (mergedArr.length === 0 || mergedArr[mergedArr.length - 1] !== arr2[j]) {
//       mergedArr.push(arr2[j]);
//     }
//     j++;
//   }
//   return mergedArr;
// }


// Solution 2
function sortedArrUnion(arr1, arr2) {
  let mergedArr = [...arr1, ...arr2];
  return [...new Set(mergedArr)].sort((a, b) => a - b);
}

console.log(sortedArrUnion([1, 2, 3, 4, 5], [2, 3, 4, 4, 5]));
console.log(
  sortedArrUnion([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [2, 3, 4, 4, 5, 11, 12])
);
