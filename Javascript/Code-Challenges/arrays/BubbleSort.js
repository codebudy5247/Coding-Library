/**
 * Implement bubble sort.
 * I/P arr = [12, 345, 4, 546, 122, 84, 98, 64, 9]
 * O/P arr = [4, 9, 12, 64, 84, 98, 122, 345, 546 ]
 */

let bubbleSort = (inputArr) => {
  let len = inputArr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      if (inputArr[i] > inputArr[i + 1]) {
        let tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);
  return inputArr;
};
console.log(bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9]));
