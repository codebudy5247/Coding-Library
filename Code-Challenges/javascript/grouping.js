const input = [
    { key: 'A', value: 1 },
    { key: 'B', value: 2 },
    { key: 'A', value: 3 },
    { key: 'C', value: 4 },
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

// 1 -> Initialize an empty result object: result = {}.

// 2 -> Start the forEach loop with the first element { key: 'A', value: 1 }.

// 3 -> Check if result['A'] exists (it doesn't), so create a new array for 'A' and add the element 
// to it: result = { A: [{ key: 'A', value: 1 }] }.

// 4 -> Move to the second element { key: 'B', value: 2 }.

// 5 -> Check if result['B'] exists (it doesn't), so create a new array for 'B' and add the 
// element to it: result = { A: [{ key: 'A', value: 1 }], B: [{ key: 'B', value: 2 }] }.

// 6 -> Move to the third element { key: 'A', value: 3 }.

// 7 -> Check if result['A'] exists (it does), so push the element into the existing array for 
// 'A': result = { A: [{ key: 'A', value: 1 }, { key: 'A', value: 3 }], 
// B: [{ key: 'B', value: 2 }] }.

// 8 -> Move to the fourth element { key: 'C', value: 4 }.

// 9 -> Check if result['C'] exists (it doesn't), so create a new array for 'C' and add the element 
// to it: result = { A: [{ key: 'A', value: 1 }, { key: 'A', value: 3 }], 
// B: [{ key: 'B', value: 2 }], C: [{ key: 'C', value: 4 }] }.



// Method 2
const groupItems2 = (arr) => {
  return arr.reduce((result, item) => {
    if (result[item.key]) {
      result[item.key].push(item);
    } else {
      result[item.key] = [item];
    }
    return result;
  }, {});
};

console.log(groupItems1(input));