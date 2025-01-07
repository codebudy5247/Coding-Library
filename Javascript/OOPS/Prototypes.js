// Define a constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add a method to the prototype
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Create a new object using the constructor function
let john = new Person('John', 30);

// The new object has access to the methods defined on the prototype
john.sayHello(); // "Hello, my name is John and I am 30 years old."

// The prototype of the new object is the prototype of the constructor function
console.log(john.__proto__ === Person.prototype); // true

// You can also get the prototype using Object.getPrototypeOf()
console.log(Object.getPrototypeOf(john) === Person.prototype); // true

// You can set the prototype of an object using Object.setPrototypeOf()
let newProto = {
  sayGoodbye: function () {
    console.log(`Goodbye, my name is ${this.name}`);
  },
};

Object.setPrototypeOf(john, newProto);

// Now john has access to the methods defined on the new prototype
john.sayGoodbye(); // "Goodbye, my name is John"

// But no longer has access to the methods defined on the old prototype
console.log(john.sayHello); // undefined
