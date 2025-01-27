//1.
// console.log("Start");
// setTimeout(() => {
//   console.log("Timeout");
// }, 5000);
// Promise.resolve().then(() => {
//   console.log("Promise");
// });
// console.log("End");

//2.
// let arr = [1, 2, 3, 4, 5, -6, 7];
// arr.length = 0;
// console.log(arr);

//3.
// x = 10;
// console.log(x);
// var x;

//4.
// let a = { x: 1, y: 2 }
// let b = a;
// b.x = 3;
// console.log(a);
// console.log(b);

//5.
// for(var i = 0; i < 10; i++){
//   setTimeout(function(){
//     console.log("value is " + i);
// })
// }

//6.
// for(let i = 0; i < 10; i++){
//   setTimeout(function(){
//     console.log("value is " + i);
// })
// }

//7.
// function hello() {
//   console.log("1");
//     setTimeout(() => {
//         console.log("2");
//     })
//   console.log("3");
// }
// hello();

// 8.
// let f = "8";
// let a = 1;
// console.log((+f)+a+1);

//9.
// let a = 10;
// if(true){
//    let a = 20;
//    console.log(a, "inside");
// }
// console.log(a, "outside");

//10.
// var a = "xyz";
// var a = "pqr";
// console.log(a)

//11.
// const arr1 = [1, 2, 3, 4];
// const arr2 = [6, 7, 5];
// const result = [...arr1, ...arr2];
// console.log(result);

//12.
// const person1 = { name: 'xyz', age: 21 };
// const person2 = { city: 'abc', ...person1 };
// console.log(person2);

//13.
// console.log(5 < 6 < 7);

//14.
// console.log(7 > 6 > 5);

//15.
// console.log(0 == false);
// console.log(1 == true);

//16.
// console.log([11, 2, 31] + [4, 5, 6]);

//17.
// let a = [];
// let b = [];
// console.log(a == b);
// console.log(a === b);

//18.
// let a = []
// let b = a
// console.log(a == b);
// console.log(a === b);

//19.
// console.log({} == {});
// console.log({} === {});

//20.
// let x = 5;
// let y = x++;
// console.log(y);
// console.log(x)

//21.
// let x = 5;
// let y = ++x;
// console.log(y);
// console.log(x)

//22.
// console.log('apple'.split(''));

//23.
// const arr = [2,3,5,2,8,10,5];
// console.log(arr.indexOf(5))

//24.
// const array = [8, 18, 28, 38];
// const result = array
//   .map((element) => element + 2)
//   .filter((element) => element > 25);
// console.log(result);

//25.
// function checkValue(value) {
//   var result = Array.isArray(value);
//   console.log(result);
// }
// checkValue([1, 2, 3]);

//26.
// function sum(a = 5, b = 7) {
//   return a + b;
// }
// console.log(sum(undefined, 20));

//27.
// console.log(10 + "5");
// console.log("5" + 10);

//28.
// console.log(10 - "5");
// console.log("5" - 10);

//29.
// console.log(printName());
// function printName() {
//   return "Hi my name is Bob";
// }

//30.
// console.log(printName());
// const printName = () => {
//     return "Hi my name is Bob"
// }

//31.
// const userDetails = {
//   firstName: "Surbhi",
//   lastName: "Dighe",
//   age: 20,
//   address: {
//     city: "Hyderabad",
//     country: "India",
//   },
// };
// let cloneUserDetails = { ...userDetails };
// userDetails.age = 22;
// userDetails.address.city = "Banglore";
// console.log(cloneUserDetails.age);
// console.log(cloneUserDetails.address.city);

//32.
// function hello() {
//   console.log(name);
//   console.log(age);
//   var name = "Alice";
//   let age = 21;
// }
// hello();

//33.
// const arr1 = [1,2,3];
// const arr2 = [1,2,3];
// const str = "1,2,3";
// console.log(arr1 == str);
// console.log(arr1 == arr2);

//34.
// const a = {x : 1};
// const b = {x : 1};
// console.log(a === b);
// console.log(a.x === b.x)

//35.
// const arr = [10, -1, 2];
// arr.sort((a, b) => a - b);
// console.log(arr);

//36.
// const arr = [11, 0, '', false, 2, 1];
// const filtered = arr.filter(Boolean);
// console.log(filtered);

//37.
// var x = 0;
// var y = 10;
// if (x) {
//   console.log(x);
// }
// if (y) {
//   console.log(y);
// }

//38.
// const obj = {
//   var1: 1,
//   var2: 2,
// };
// const { var1, var2 } = obj;
// console.log(var1, var2);

//39.
// const user = {
//   name: "Surbhi dighe",
//   country: "India",
// };
// const { name: fullname, country } = user;
// console.log(fullname);
// console.log(name);

//40.
// const person = {
//   firstName: "Surbhi",
// };
// const { lastName = "dighe" } = person;
// console.log(lastName);

//41.
// const person = {
//   firstName: "Surbhi",
// };
// const { firstName = "Henry" } = person;
// console.log(firstName);

//42.
// var a = 10;
// let a = 20;
// console.log(a)

//43.
// const arr = ["A","B","C","D","E"]
// console.log(Object.keys(arr));

//44.
// const obj = {
//   text: "LOGGING",
//   list: ["1", "2", "3"],
//   log() {
//     this.list.forEach(function (item) {
//       console.log(this.text + item); // OUTPUT ????
//     });
//   },
// };
// obj.log();

//45.
// const obj = {
//     text: 'LOGGING',
//     list: ['1', '2', '3'],
//     log() {
//         this.list.forEach((item) => {
//             console.log(this.text + item); // OUTPUT ????
//         });
//     },
// };
// obj.log()

//46.
// function testHack() {
//   var test = [];
//   for (var z = 0; z < 5; z++) {
//     test[z] = function foo() {
//       return z;
//     };
//   }
//   return test;
// }
// var testArray = testHack();
// console.log(testArray[2]());
//What can we do to achieve answer 2?

//47.
// setTimeout(() => console.log(1));
// (async () => {
//     console.log(2);
//     await Promise.resolve();
//     console.log(3);
// })()
// Promise.resolve().then(() => Promise.resolve().then(() => console.log(4)))

//48.
// setTimeout(() => console.log(1), 0);
// console.log(2);
// new Promise(res => {
//   console.log(3)
//   res();
// }).then(() => console.log(4));
// console.log(5);

//49.
// const nums = [1, 2, 3, 4, 5, 6, 7];
// for (let n of nums) {
//   if (n % 2 === 0) break;
//   console.log(n);
// }

//50.
// function foo() {
//   return "I'm the outer function";
// }
// function test() {
//   console.log(bar);
//   return foo();
//   var bar = "I'm a variable";
//   function foo() {
//     return "I'm the inner function";
//   }
// }
// console.log(test());

//51.
// let a = true;
// setTimeout(() => {
//   a = false;
// }, 2000);
// while (a) {
//   console.log(" -- inside whilee -- ");
// }

//52.
// async function foo() {
//   console.log("A");
//   await Promise.resolve();
//   console.log("B");
//   await new Promise((resolve) => setTimeout(resolve, 0));
//   console.log("C");
// }
// console.log("D");
// foo();
// console.log("E");
