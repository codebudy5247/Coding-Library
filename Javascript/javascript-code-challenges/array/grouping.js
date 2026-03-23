const input = [
  { key: "A", value: 1 },
  { key: "B", value: 2 },
  { key: "A", value: 3 },
  { key: "C", value: 4 },
];

// Output
// {
//     A: [ { key: 'A', value: 1 }, { key: 'A', value: 3 } ],
//     B: [ { key: 'B', value: 2 } ],
//     C: [ { key: 'C', value: 4 } ]
//   }

// Method 1
const groupItems1 = (arr) => {
  const result = {};
  arr.forEach((element) => {
    if (result[element.key]) {
      result[element.key].push(element);
    } else {
      result[element.key] = [element];
    }
  });
  return result;
};

/*
const inputArray = [
  { key: 'a', value: 1 },
  { key: 'b', value: 2 },
  { key: 'a', value: 3 },
  { key: 'b', value: 4 },
  { key: 'c', value: 5 }
];

Iteration 1 (element = { key: 'a', value: 1 }):
result['a'] does not exist
Create a new array with the element: result['a'] = [{ key: 'a', value: 1 }]
result = { a: [{ key: 'a', value: 1 }] }

Iteration 2 (element = { key: 'b', value: 2 }):
result['b'] does not exist
Create a new array with the element: result['b'] = [{ key: 'b', value: 2 }]
result = { a: [{ key: 'a', value: 1 }], b: [{ key: 'b', value: 2 }] }

Iteration 3 (element = { key: 'a', value: 3 }):
result['a'] exists
Push the element into the existing array: result['a'].push({ key: 'a', value: 3 })
result = { a: [{ key: 'a', value: 1 }, { key: 'a', value: 3 }], b: [{ key: 'b', value: 2 }] }

Iteration 4 (element = { key: 'b', value: 4 }):
result['b'] exists
Push the element into the existing array: result['b'].push({ key: 'b', value: 4 })
result = { a: [{ key: 'a', value: 1 }, { key: 'a', value: 3 }], b: [{ key: 'b', value: 2 }, { key: 'b', value: 4 }] }

Iteration 5 (element = { key: 'c', value: 5 }):
result['c'] does not exist
Create a new array with the element: result['c'] = [{ key: 'c', value: 5 }]
result = { a: [{ key: 'a', value: 1 }, { key: 'a', value: 3 }], b: [{ key: 'b', value: 2 }, { key: 'b', value: 4 }], c: [{ key: 'c', value: 5 }] }

*/

console.log(groupItems1(input));
