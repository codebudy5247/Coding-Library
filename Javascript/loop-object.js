// Enumerating the objects in javascript.

// Using for...in loop
let obj = {
  name: "Prashant",
  age: 24,
  getDetails: function () {
    return `${this.name} is ${this.age} years old`;
  },
};

//Adding property to prototype
obj.prototype.gender = "Male";

for (let key in obj) {
  console.log(obj[key]);
}

// Using Object.Keys.
console.log(Object.keys(obj));

//For of loop
for (let key of Object.keys(obj)) {
  if (typeof obj[key] !== "function") {
    console.log(obj[key]);
  }
}

//For each loop
Object.keys(obj).forEach((key) => {
  if (typeof obj[key] !== "function") {
    console.log(obj[key]);
  }
});
