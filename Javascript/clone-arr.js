let arr1 = [1,2,3]

// Using spread operator {Shallow cloning}
let arr2 = [...arr1]

// Using slice method {Shallow cloning}
let arr3 = arr1.slice()

// Using concat method {Shallow cloning}
let arr4 = arr1.concat()

// Using Array.from method {Shallow cloning}
let arr5 = Array.from(arr1)

let arrr6 = [1, 2, { a: 10 }]
// Using structuredClone() {Deep cloning}
let arr6 = structuredClone(arrr6)

// Using JSON.parse() and JSON.stringify() {Deep cloning}
let arr7 = JSON.parse(JSON.stringify(arrr6))