/*
Given 2 arrays that are sorted [0,3,4,31] and [4,6,30].Merge them and sort.
[0,3,4,31] [4,6,30] ==> [0,3,4,4,6,30,31]
*/

function mergeSort(arr1, arr2) {
  let mergedArr = [...arr1, ...arr2];
  return mergedArr.sort((a, b) => a - b);
}

console.log(mergeSort([0, 3, 4, 31], [4, 6, 30]));
