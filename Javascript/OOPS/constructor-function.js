// Define a constructor function
function Animal(name) {
  this.name = name;
}

// Add a method to the prototype
Animal.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

// Define a new constructor function
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Set the prototype of Dog to be a new instance of Animal
Dog.prototype = Object.create(Animal.prototype);

// Add a method to the Dog prototype
Dog.prototype.bark = function () {
  console.log("Woof!");
};

// Create a new object using the Dog constructor function
let fido = new Dog("Fido", "Labrador");

// The new object has access to the methods defined on its own prototype and the Animal prototype
fido.bark(); // "Woof!"
fido.sayName(); // "My name is Fido"

// If we try to access a method that doesn't exist on the Dog prototype or the Animal prototype, JavaScript will return undefined
console.log(fido.fly); // undefined
