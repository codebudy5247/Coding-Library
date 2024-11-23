// -> Sets are the unique collections of values of any types, Which also includes NaN and undefined.
// let set = new Set([iterable]);

//✅Adding item to set
let set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(4);
set.add(4); //ignores the duplicate values
set.add("4");
set.add("My name is Aditya");
set.add(undefined);
set.add({ a: 0, b: 1 });
set.add(null);
console.log(set);
console.log(set.size);

//✅Checking if item is present in the set
console.log(set.has(4));

//✅Remove item from the set
console.log(set.size); // 9
set.delete(null); // Remove null
console.log(set.size); // 8

set.clear(); // Remove all items
console.log(set.size); // 0

//✅Iterating
let set1 = new Set();
set1.add(1);
set1.add(2);
set1.add(3);
set1.add(4);

//💡foreach loop
set1.forEach((e) => {
  console.log(e);
});

//💡for of loop
for (let item of set1) {
  console.log(item);
}

//✅Iterating objects
let set2 = new Set();
set2.add(1);
set2.add("aditya");
set2.add({ a: 1, b: 2, c: 3, d: 4 });

for (let item of set2.keys()) {
  console.log(item);
}
for (let item of set2.values()) {
  console.log(item);
}
for (let [key, value] of set2.entries()) {
  console.log(key, value);
}

//💡using `.next()`
const iterator = set2.values();

console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);

// ✅Weakset
// A WeakSet is same as the Set except it can only store objects.
// -> WeakSets can only store objects unlike the Sets.
// -> The add() method throws error when non-oject item is passed to the WeakSet.
// -> The has() and delete() method returns false for non-object.
// -> WeakSets are not Iteratable.
// -> They do not have size and foreach as well.

let user = { name: "Prashant Yadav", age: 23 };
let user2 = { name: "Prashant Yadav", age: 23 };
let user3 = { name: "Prashant Yadav", age: 23 };

const users = new WeakSet();
users.add(user);
users.add(user2);
users.add(user3);

console.log(users.has(user2));

users.delete(user2);

console.log(users.has(user2));

//💡The WeakSet cleans itself once the object is deleted or if there is no reference to the object.
console.log(users);
user3 = null;
console.log(users);

//Wait for few seconds
console.log(users);
//It automatically garbage collect the object.
