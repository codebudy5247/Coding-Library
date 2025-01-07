// Define a prototype object
let proto = {
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Use `Object.create()` to create a new object with the specified prototype
let person = Object.create(proto);
person.name = "John";

// The new object has access to the methods defined on the prototype
person.greet(); // "Hello, my name is John"

// Check if the object has a property
console.log(person.hasOwnProperty("name")); // true

// Create an object that does not inherit from Object.prototype
let animal = Object.create(null);
animal.name = "Rocky";

// The new object does not have any built-in properties or methods
console.log(animal.toString); // undefined
console.log(animal.hasOwnProperty); // undefined

// But you can still add and access custom properties
animal.describe = function () {
  console.log(`Name of the animal is ${this.name}`);
};

animal.describe(); // "Name of the animal is Rocky"
