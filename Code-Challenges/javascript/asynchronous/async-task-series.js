/*
Execute async functions in Series
Implement a function that takes a list of async functions as input and executes them in a series that is 
one at a time. The next task is executed only when the previous task is completed.

Input:
[
  asyncTask(3),
  asyncTask(1),
  asyncTask(2)
]
Output:
3
1
2
*/

const asyncSeriesExecuter = async function (promises) {
  for (let promise of promises) {
    try {
      const result = await promise;
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
};

const promises = [
  new Promise((resolve) => setTimeout(() => resolve("First Promise"), 1000)),
  new Promise((resolve) => setTimeout(() => resolve("Second Promise"), 2000)),
  new Promise((resolve) => setTimeout(() => resolve("Third Promise"), 3000)),
];

// const asyncTask = function (i) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(`Completing ${i}`), 100 * i);
//   });
// };

// const promises = [
//   asyncTask(3),
//   asyncTask(1),
//   asyncTask(7),
//   asyncTask(2),
//   asyncTask(5),
// ];

asyncSeriesExecuter(promises);
