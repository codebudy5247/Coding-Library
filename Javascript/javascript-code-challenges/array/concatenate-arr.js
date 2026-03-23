/**
 * Write a function which can concatenate 2 arrays. If only one array is passed it will duplicate it.
 * I/P arr1 = [1, 2, 3] arr2 = [4, 5, 6]
 * O/P arr =  [ 1, 2, 3, 4, 5, 6 ]
 */

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 1st method
function customConcatOrDuplicate(arr1, arr2) {
  if (arr1 && arr2) {
    // Concatenate two arrays
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push(arr1[i]);
    }
    for (let i = 0; i < arr2.length; i++) {
      result.push(arr2[i]);
    }
    return result;
  } else if (arr1) {
    // Duplicate a single array
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push(arr1[i]);
    }
    return result;
  } else {
    return [];
  }
}

// 2nd method
function concatenateOrDuplicateArrays(array1, array2) {
  // Check if the second argument is provided
  if (arguments.length === 2) {
    // Concatenate the two arrays
    return array1.concat(array2);
  } else if (arguments.length === 1) {
    // Duplicate the single array
    return array1.slice();
  } else {
    // Handle the case where no arguments are passed
    return [];
  }
}

const concatenatedArray = concatenateOrDuplicateArrays(arr1, arr2);
console.log("Concatenated Array:", concatenatedArray);

const duplicatedArray = concatenateOrDuplicateArrays(arr1);
console.log("Duplicated Array:", duplicatedArray);
