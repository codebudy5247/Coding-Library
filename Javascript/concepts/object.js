// 👉👉 Different ways of creating an object

// 1 ->
const object1 = Object.create({ key: value });

// 2 ->
const object2 = {
  key: value,
};

// 3 ->
function getObject(key, value) {
  this[key] = value;
}

const object3 = new getObject("key", "value");

// 4 ->
class Obj {
  constructor(key, value) {
    this[key] = value;
  }
}

const object4 = new Obj("key", "value");

// 👉👉 Display all the keys of an object


