// Flattening array
// Given an array of arrays, flatten it into a single array.
// Input: [[1, 2], [3, 4], [5, 6, 7]]
// Output: [1, 2, 3, 4, 5, 6, 7]

// Method 1
function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

// Method 2
function flatten1(arr) {
  return arr.flat();
}

// Method 3
function flatten2(arr) {
  return [].concat(...arr);
}

// Method 4 {Recursive}
function flatten3(arr) {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flatten3(val)) : acc.concat(val);
  }, []);
}

// Method 5 {without using Js built-in methods}
function flatten4(arr) {
  let result = [];
  arr.forEach((val) => {
    if (Array.isArray(val)) {
      result = result.concat(flatten4(val));
    } else {
      result.push(val);
    }
  });
  return result;
}

// Method 6 {recursive}
function flatten5(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten5(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(
  flatten([
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);
console.log(
  flatten1([
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);
console.log(
  flatten2([
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);
console.log(
  flatten3([
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);
console.log(
  flatten4([
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);
console.log(
  flatten5([
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);
