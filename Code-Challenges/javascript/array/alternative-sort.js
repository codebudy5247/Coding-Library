/**
 * Given an array of integers, print the array in such a way that the first element
 * is first maximum and second element is first minimum and so on.
 *
 * Input : arr[] = {7, 1, 2, 3, 4, 5, 6}
 * Output : 7 1 6 2 5 3 4
 *
 * Input : arr[] = {1, 6, 9, 4, 3, 7, 8, 2}
 * Output : 9 1 8 2 7 3 6 4
 */

function alternativeSort(arr) {
  var alternateArray = [];
  var sortArray = arr.sort((a, b) => {
    return a - b;
  });
  let k = sortArray.length - 1; // Points to the last element of the sorted array
  for (let i = 0; i < sortArray.length / 2; i++) {
    alternateArray.push(sortArray[k]); // Adds the element from the end of the sorted array
    alternateArray.push(sortArray[i]); // Adds the element from the beginning of the sorted array
    k--; // Decrements k to point to the previous element from the end
  }
  return alternateArray;
}
console.log(alternativeSort([7, 1, 2, 3, 4, 5, 8, 6]));

/*
[7, 1, 2, 3, 4, 5, 8, 6]
[8, 1, 7, 2, 6, 3, 5, 4]

Initialization:
alternateArray = []
sortArray = arr.sort((a, b) => a - b) sorts the array in ascending order:
sortArray = [1, 2, 3, 4, 5, 6, 7, 8]
k = sortArray.length - 1 points to the last element of the sorted array:
k = 7

Iteration 1 (i = 0):
alternateArray.push(sortArray[k]) adds the element from the end of the sorted array:
alternateArray = [8]
alternateArray.push(sortArray[i]) adds the element from the beginning of the sorted array:
alternateArray = [8, 1]
k-- decrements k to point to the previous element from the end:
k = 6

Iteration 2 (i = 1):
alternateArray.push(sortArray[k]) adds the element from the end of the sorted array:
alternateArray = [8, 1, 7]
alternateArray.push(sortArray[i]) adds the element from the beginning of the sorted array:
alternateArray = [8, 1, 7, 2]
k-- decrements k to point to the previous element from the end:
k = 5

Iteration 3 (i = 2):
alternateArray.push(sortArray[k]) adds the element from the end of the sorted array:
alternateArray = [8, 1, 7, 2, 6]
alternateArray.push(sortArray[i]) adds the element from the beginning of the sorted array:
alternateArray = [8, 1, 7, 2, 6, 3]
k-- decrements k to point to the previous element from the end:
k = 4

Iteration 4 (i = 3):
alternateArray.push(sortArray[k]) adds the element from the end of the sorted array:
alternateArray = [8, 1, 7, 2, 6, 3, 5]
alternateArray.push(sortArray[i]) adds the element from the beginning of the sorted array:
alternateArray = [8, 1, 7, 2, 6, 3, 5, 4]
k-- decrements k to point to the previous element from the end:
k = 3

*/
