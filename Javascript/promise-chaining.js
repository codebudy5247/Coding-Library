// -> A Promise is an object representing the eventual completion or failure of an asynchronous
//   operation.
const cart = ["shoes", "pants", "kurta"];
// Consuming Promise
// -> for this we will assume after createOrder we have to invoke proceedToPayment
// -> In promise chaining, whatever is returned from first .then become data for next .then and so on...
// -> At any point of promise chaining, if promise is rejected, the execution will fallback to .catch 
//    and others promise won't run.

createOrder(cart)
  .then(function (orderId) {
    // ✅ success aka resolved promise handling
    // 💡 we have return data or promise so that we can keep chaining the promises, here we
    //   are returning data
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    // Promise chaining
    // 💡 we will make sure that `proceedToPayment` returns a promise too
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    // from above, `proceedToPayment` is returning a promise so we can consume using `.then`
    console.log(paymentInfo);
  })
  .catch(function (err) {
    // ⚠️ failure aka reject handling
    console.log(err);
  });

// Producing Promise
// Here we are creating Promise
function createOrder(cart) {
  // JS provides a Promise constructor through which we can create promise
  // It accepts a callback function with two parameter `resolve` & `reject`
  const promise = new Promise(function (resolve, reject) {
    // What is this `resolve` and `reject`?
    // These are function which are passed by javascript to us in order to handle success
    // and failure of function call.
    if (!validateCart(cart)) {
      const err = new Error("Cart is not Valid!!");
      reject(err);
    }
    const orderId = "12345";
    if (orderId) {
      setTimeout(() => {
        resolve(orderId);
      }, 3000);
    }
  });
  return promise;
}
function proceedToPayment(cart) {
  return new Promise(function (resolve, reject) {
    resolve("Payment Successfull!!!");
    // const err = new Error("Payment Unsuccessfull.Try again later!!");
    // reject(err)
  });
}
function validateCart() {
  return true;
}
