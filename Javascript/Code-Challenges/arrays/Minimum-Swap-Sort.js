function minimumSwaps(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != i + 1) {
      let temp = arr[i];
      arr[arr.indexOf(i + 1)] = temp;
      arr[i] = i + 1;
      count = count + 1;
    }
  }
  return count;
}
console.log(minimumSwaps([7, 1, 2, 3, 4, 5, 8, 6]));
console.log(minimumSwaps([33, 12, 20, 16, 5, 54, 21]));




