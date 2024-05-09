let str = "Asdasd"; // 3 levels from null
let num = 233; // 3 levels from null
let bool = true; // 3 levels from null
let arr = [246, 436, 6, 346]; // 3 levels from null
let obj = { a: 10, b: "asdasd" }; // 2 levels from null
let fun = function () {
  console.log("yay!");
}; // 3 levels from null

// if x and y are not primitive
// x == y : true <- what does this mean ?
// this means they are reference to the same object in memory

console.log("======= types =======");
console.log("typeof String", typeof String);
console.log("typeof Boolean", typeof Boolean);
console.log("typeof Number", typeof Number);
console.log("typeof Array", typeof Array);
console.log("typeof Object", typeof Object);
console.log("typeof Function", typeof Function);

console.log("======= proto chain =======");
//console.log(str.__proto__.__proto__ == obj.__proto__)//true
//console.log(num.__proto__.__proto__ == obj.__proto__)//true
//console.log(bool.__proto__.__proto__ == obj.__proto__)//true
//console.log(arr.__proto__.__proto__ == obj.__proto__)//true
//console.log(fun.__proto__.__proto__ == obj.__proto__)//true

// Everything indirectly inherits from the same thing
// that obj is inherited from
// i.e. in Javascript, everything is essentially an Object
//null is the origin of everything
//Everything is enherit from object prototype

console.log("======= prototypes ======= ");
//console.log(obj.__proto__ == Object.prototype)//true
//console.log(str.__proto__ == String.prototype)//true
//console.log(num.__proto__ == Number.prototype)//true
//console.log(bool.__proto__ == Boolean.prototype)//true
//console.log(arr.__proto__ == Array.prototype)//true
//console.log(fun.__proto__ == Function.prototype)//true

// String.prototype inherits from Object.prototype

// typeof Object.create(Boolean.prototype) -> [object]
/*
 let x = Object.create(Boolean.prototype)
     x.__proto == bool.__proto__  //true
     typeof x == typeof bool  //false
     Two items will have same proto but their typeof will not same
*/
console.log(str.charAt(4)); //"X"
console.log(typeof str.charAt); // "function"
let str2 = "dgndgn";
console.log(str.charAt == str2.charAt); // true

str.charAt = function () {
  return "X";
}; // does not make a difference

//change default class
String.prototype.charAt = function () {
  return "X";
};
console.log(str.charAt(1)); //X

// String.prototype contains all default string functions
// like charAt, indexOf, substring, slice etc

Array.prototype.joinOriginal = Array.prototype.join;

Array.prototype.join = function () {
  console.log("join called on", this);
  return this.joinOriginal(...arguments);
};
/**
 * Array.prototype
 * {
 *  ....
 *  joinOriginal: function () {},
 *  join: function () { our fun },
 *  ....
 * }
 */
