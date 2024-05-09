/* Before ES6 (enheritence not possible) */

// function Animals(name, age) {
//   let newAnimal = Object.create(animalConstructor);
//   newAnimal.name = name;
//   newAnimal.age = age;
//   return newAnimal;
// }
// let animalConstructor = {
//   sing: function() {
//       return `${this.name} can sing`;
//   },
//   dance: function() {
//       return `${this.name} can dance`;
//   }
// }
// function Cats(name, age, whiskerColor) {
//   let newCat = Animals(name, age);
//   Object.setPrototypeOf(newCat, catConstructor);
//   newCat.whiskerColor = whiskerColor;
//   return newCat;
// }
// let catConstructor = {
//   whiskers() {
//       return `I have ${this.whiskerColor} whiskers`;
//   }
// }
// Object.setPrototypeOf(catConstructor, animalConstructor);
// const clara = Cats("Clara", 33, "purple");
// clara.sing();
// clara.whiskers();

// function Persons(name,age){
//   let newPerson = Object.create(personConstructor)
//   newPerson.name=name
//   newPerson.age=age
//   return newPerson
// }

// let personConstructor = {
//   isAdult:function(){
//     return his.age >= 18;
//   },
//   dance: function() {
//     return `${this.name} can dance`;
// }
// }
// function Students(name,age,grade){
//   let newStudents = Persons(name, age);
//    Object.setPrototypeOf(newStudents, studentsConstructor);
//    newStudents.grade=grade
//    return newStudents
// }
// Object.setPrototypeOf(studentsConstructor, personConstructor);
// let student1 = new Students("aditya",23,12)

//Class (Introduced in ES6 2015)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  isAdult() {
    return this.age >= 18;
  }
}
let p1 = new Person("John Doe", 22);
let p2 = new Person("Jane Doe", 15);

console.log(p1.isAdult());
console.log(p2.isAdult());

// function; there is NO new datatype called 'class'
console.log(typeof Person);
console.log(p1.__proto__ == Person.prototype);
console.log(p1.__proto__.__proto__ == Object.prototype);

//SubClassing
/*This is a feature in OOP where a class inherits features from a parent class but possesses extra 
  features which the parent doesn't. */

//Super Keyword
/* The super keyword is used to access and call functions on an object's parent. */

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
}

let s1 = new Student("Harry Potter", 13, 5);
let s2 = new Student("Hermoine Granger", 14, 6);

console.log(s1.isAdult());
console.log(s1.grade);

console.log(s1.__proto__ == Student.prototype); //true
console.log(s1.__proto__.__proto__ == Person.prototype); //true
console.log(s1.__proto__.__proto__.__proto__ == Object.prototype); //true

// Inheritance chain
// Object.prototype -> Person.prototype -> Student.prototype

// No Inheritance between the classes (actually they are functions)
// Object -x-> Person -x-> Student
