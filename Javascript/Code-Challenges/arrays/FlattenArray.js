/**
 * Flatten the array recursively and iteratively.
 * I/P: [1, [2, 3], [4, [5, 6]]]
 * O/P: [1, 2, 3, 4, 5, 6]
 */

function flattenArrayIteratively(arr) {
  const flattened = [];
  const stack = [...arr];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      flattened.unshift(next);
    }
  }

  return flattened;
}

function flattenArrayRecursively(arr) {
  let flattened = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      flattened = flattened.concat(flattenArrayRecursively(item));
    } else {
      flattened.push(item);
    }
  }
  return flattened;
}

console.log(flattenArrayRecursively([1, [2, 3], [4, [5, 6]]]));
console.log(flattenArrayIteratively([1, [2, 3], [4, [5, 6]]]));

// flat() method
console.log([1, [2, 3], [4, [5, 6]]].flat(2));  // 2 = depth of array.

/**
 * The depth of an array is the number of levels of bracket pairs in the array. Specifying 
 * the depth gives us the flexibility to flatten an array to the level we want to
 */

