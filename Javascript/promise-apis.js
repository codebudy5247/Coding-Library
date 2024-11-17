/**
  Promise.all()
  Promise.allSettled()
  Promise.race()
  Promise.any()
 */
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("P1 Success");
    }, 3000);
//   setTimeout(() => {
//     reject("P1 Fail");
//   }, 1000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("P2 Success");
    }, 5000);
//   setTimeout(() => {
//     reject("P2 Fail");
//   }, 1000);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("P3 Success");
    }, 2000);
//   setTimeout(() => {
//     reject("P3 Fail");
//   }, 1000);
});

// ✅Promise.all
// Suppose, you have to make parallel API call and get the result, how one can do? This is where Promise.
// all can be utilized. It is used to handle multiple promises together.
// waits for all promises to resolve and returns an array of their results. If any of the given
// promises rejects, it becomes the error of Promise.all, and all other results are ignored.
// Fail Fast
Promise.all([p1, p2, p3])
  .then((results) => {
    console.log(results, "Promise.all________res");
  })
  .catch((err) => console.error(err));

// ✅Promise.allSettled()
// Promise.allSettled() method that accepts a list of Promises and returns a new promise that resolves
// after all the input promises have settled, either resolved or rejected.
// This is safest among all Promises API
Promise.allSettled([p1, p2, p3])
  .then((results) => console.log(results, "Promise.allSettled__________"))
  .catch((err) => console.error(err));

// ✅Promise.race()
// waits for the first promise to settle, and its result/error becomes the outcome.
// It will return as soon as first promise is resolved or rejected.
// Once promise is settled, it means -> got the result {settled -> fulfilled,rejected}
Promise.race([p1, p2, p3])
  .then((results) => console.log(results, "Promise.race__________"))
  .catch((err) => console.error(err));

// ✅Promise.any()
// It will wait for first settled **success** 
// When all are rejected, so it will give "aggregate error" as output
// AggregateError: All promises were rejected
// To get AggregateError array you need to write "err.errors"
Promise.any([p1, p2, p3])
  .then((results) => console.log(results, "Promise.any__________"))
  .catch((err) => {
    console.error(err);
    console.error(err.errors); // ['P1 Fail', 'P2 Fail', 'P3 Fail']
  });
