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
    // Initializes a variable k with the index pointing to the last element of the sorted array.
    let k = sortArray.length - 1; 
    // Loop through the first half of the sorted arr
    for (let i = 0; i < sortArray.length / 2; i++) {
      alternateArray.push(sortArray[k]); // Adds the element from the end of the sorted array
      alternateArray.push(sortArray[i]); // Adds the element from the beginning of the sorted array
      k--; // Decrements k to point to the previous element from the end
    }
    return alternateArray;
  }
  console.log(alternativeSort([7, 1, 2, 3, 4, 5, 8, 6]));
  
  //another method
  // arr
  // .sort((a, b) => b - a)
  // .every((n, i, a) => (a.splice(i * 2 + 1, 0, a.pop()), i * 2 < a.length));
  