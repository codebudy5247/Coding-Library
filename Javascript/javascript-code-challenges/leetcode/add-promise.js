/*
Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve 
with a number. The returned promise should resolve with the sum of the two numbers.

Input: 
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)), 
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
Output: 7

Input: 
promise1 = new Promise(resolve => setTimeout(() => resolve(10), 50)), 
promise2 = new Promise(resolve => setTimeout(() => resolve(-12), 30))
Output: -2

*/

async function addPromise(p1, p2) {
  return Promise.all([p1, p2]).then((values) =>
    values.reduce((sum, value) => sum + value, 0)
  );
}

async function addPromise1(promise1, promise2) {
  return Promise.all([promise1, promise2]).then((values) => {
    const sum = values[0] + values[1];
    return sum;
  });
}

let promise1 = new Promise((resolve) => setTimeout(() => resolve(2), 20));
let promise2 = new Promise((resolve) => setTimeout(() => resolve(5), 60));
addPromise(promise1, promise2).then((result) => {
  console.log(result);
});
addPromise1(promise1, promise2).then((result) => {
    console.log(result);
  });
