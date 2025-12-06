/* 
   WHAT IS AN OBJECT?
   - A collection of key-value pairs (properties)
   - Keys are strings or symbols
   - Values can be any data type
   - Most fundamental data structure in JavaScript
   - Reference type (passed by reference)
*/

// ============================================
// 1️⃣ CREATING OBJECTS - DIFFERENT WAYS
// ============================================

//✅ METHOD 1: Object Literal (Most Common)
const person = {
  name: 'Alice',
  age: 25,
  city: 'NYC'
};
console.log(person); // {name: 'Alice', age: 25, city: 'NYC'}

//✅ METHOD 2: Object Constructor
const car = new Object();
car.brand = 'Toyota';
car.model = 'Camry';
car.year = 2023;
console.log(car); // {brand: 'Toyota', model: 'Camry', year: 2023}

//✅ METHOD 3: Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    return `Hello, I'm ${this.name}`;
  };
}
const person1 = new Person('Bob', 30);
console.log(person1.greet()); // "Hello, I'm Bob"

//✅ METHOD 4: ES6 Class (Syntactic Sugar over Constructor Functions)
class Animal {
  constructor(species, sound) {
    this.species = species;
    this.sound = sound;
  }

  makeSound() {
    return `${this.species} says ${this.sound}`;
  }
}
const dog = new Animal('Dog', 'Woof');
console.log(dog.makeSound()); // "Dog says Woof"

//✅ METHOD 5: Object.create() - Create object with specific prototype
const prototypeObj = {
  greet() {
    return `Hello from ${this.name}`;
  }
};
const user = Object.create(prototypeObj);
user.name = 'Charlie';
console.log(user.greet()); // "Hello from Charlie"

//✅ METHOD 6: Factory Function
function createProduct(name, price) {
  return {
    name,
    price,
    getDetails() {
      return `${this.name}: $${this.price}`;
    }
  };
}
const laptop = createProduct('MacBook', 1999);
console.log(laptop.getDetails()); // "MacBook: $1999"

// ============================================
// 2️⃣ ACCESSING & MODIFYING PROPERTIES
// ============================================

const student = {
  name: 'John',
  age: 20,
  'favorite subject': 'Math' // Property with space
};

//✅ Dot Notation
console.log(student.name); // 'John'
student.age = 21;

//✅ Bracket Notation (required for dynamic keys, spaces, special chars)
console.log(student['favorite subject']); // 'Math'
const key = 'name';
console.log(student[key]); // 'John'

//✅ Adding new properties
student.grade = 'A';
student['university'] = 'MIT';

//✅ Deleting properties
delete student.age;
console.log(student.age); // undefined

//✅ Checking if property exists
console.log('name' in student); // true
console.log(student.hasOwnProperty('name')); // true
console.log('age' in student); // false

//✅ Optional Chaining (?.) - Safe property access
const user1 = { profile: { email: 'test@email.com' } };
const userB = {};
console.log(user1.profile?.email); // 'test@email.com'
console.log(userB.profile?.email); // undefined (no error!)

//✅ Nullish Coalescing (??) - Default values
const config = { timeout: 0 };
console.log(config.timeout ?? 5000); // 0 (0 is not nullish)
console.log(config.retries ?? 3); // 3 (undefined is nullish)

// ============================================
// 3️⃣ OBJECT METHODS - STATIC METHODS
// ============================================

const obj = {
  name: 'Test',
  age: 25,
  active: true
};

//✅ Object.keys() - Get all keys as array
console.log(Object.keys(obj)); // ['name', 'age', 'active']

//✅ Object.values() - Get all values as array
console.log(Object.values(obj)); // ['Test', 25, true]

//✅ Object.entries() - Get [key, value] pairs
console.log(Object.entries(obj)); // [['name', 'Test'], ['age', 25], ['active', true]]

//✅ Object.fromEntries() - Create object from entries
const entries = [['x', 1], ['y', 2]];
const targetObj = Object.fromEntries(entries);
console.log(targetObj); // {x: 1, y: 2}

//✅ Object.assign() - Shallow copy / Merge objects
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log(result); // {a: 1, b: 3, c: 4}
console.log(target); // {a: 1, b: 3, c: 4} - target is mutated!

// Better: Create new object without mutating
const merged = Object.assign({}, target, source);

//✅ Spread Operator - Modern way to merge (shallow copy)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const spread = { ...obj1, ...obj2 };
console.log(spread); // {a: 1, b: 3, c: 4}

//✅ Object.freeze() - Make object immutable
const frozen = Object.freeze({ name: 'Frozen' });
frozen.name = 'Changed'; // Silently fails (throws in strict mode)
console.log(frozen.name); // 'Frozen'

//✅ Object.seal() - Prevent adding/removing properties
const sealed = Object.seal({ x: 10 });
sealed.x = 20; // OK - can modify existing
sealed.y = 30; // Fails - cannot add new
delete sealed.x; // Fails - cannot delete
console.log(sealed); // {x: 20}

//✅ Object.isFrozen() & Object.isSealed()
console.log(Object.isFrozen(frozen)); // true
console.log(Object.isSealed(sealed)); // true

//✅ Object.preventExtensions() - Prevent adding new properties
const noExtend = Object.preventExtensions({ a: 1 });
noExtend.a = 2; // OK
noExtend.b = 3; // Fails
console.log(Object.isExtensible(noExtend)); // false

//✅ Object.getOwnPropertyNames() - Get all own properties (including non-enumerable)
const objWithSymbol = { a: 1, b: 2 };
Object.defineProperty(objWithSymbol, 'hidden', {
  value: 'secret',
  enumerable: false
});
console.log(Object.keys(objWithSymbol)); // ['a', 'b']
console.log(Object.getOwnPropertyNames(objWithSymbol)); // ['a', 'b', 'hidden']

//✅ Object.getOwnPropertySymbols() - Get symbol properties
const sym = Symbol('id');
const objSym = { [sym]: 123, name: 'Test' };
console.log(Object.getOwnPropertySymbols(objSym)); // [Symbol(id)]

//✅ Object.getPrototypeOf() & Object.setPrototypeOf()
const proto = { version: '1.0' };
const instance = Object.create(proto);
console.log(Object.getPrototypeOf(instance) === proto); // true

// ============================================
// 4️⃣ PROPERTY DESCRIPTORS
// ============================================

/*
   Property Descriptors control behavior of object properties:
   - value: the value of the property
   - writable: can the value be changed?
   - enumerable: will it show up in loops?
   - configurable: can the descriptor be changed/deleted?
   - get: getter function
   - set: setter function
*/

//✅ Object.defineProperty() - Define property with descriptor
const product = {};
Object.defineProperty(product, 'name', {
  value: 'Laptop',
  writable: false,      // Cannot change value
  enumerable: true,     // Shows in loops
  configurable: false   // Cannot delete or reconfigure
});

product.name = 'Phone'; // Fails silently
console.log(product.name); // 'Laptop'

//✅ Object.defineProperties() - Define multiple properties
const book = {};
Object.defineProperties(book, {
  title: {
    value: '1984',
    writable: true,
    enumerable: true
  },
  author: {
    value: 'George Orwell',
    writable: false,
    enumerable: true
  },
  pages: {
    value: 328,
    enumerable: false  // Won't show in Object.keys()
  }
});
console.log(Object.keys(book)); // ['title', 'author'] - no 'pages'

//✅ Getters and Setters
const circle = {
  _radius: 5,  // Convention: _ prefix for "private"

  get radius() {
    return this._radius;
  },

  set radius(value) {
    if (value < 0) throw new Error('Radius must be positive');
    this._radius = value;
  },

  get area() {
    return Math.PI * this._radius ** 2;
  }
};

console.log(circle.radius); // 5
circle.radius = 10;
console.log(circle.area); // 314.159...

//✅ Object.getOwnPropertyDescriptor()
const descriptor = Object.getOwnPropertyDescriptor(product, 'name');
console.log(descriptor);
// {value: 'Laptop', writable: false, enumerable: true, configurable: false}

// ============================================
// 5️⃣ PROTOTYPAL INHERITANCE
// ============================================

//✅ Prototype Chain
function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.getType = function () {
  return this.type;
};

function Car(brand) {
  Vehicle.call(this, 'car'); // Call parent constructor
  this.brand = brand;
}

// Set up inheritance
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.getBrand = function () {
  return this.brand;
};

const myCar = new Car('Tesla');
console.log(myCar.getType()); // 'car' (from Vehicle)
console.log(myCar.getBrand()); // 'Tesla' (from Car)

//✅ ES6 Class Inheritance (cleaner syntax)
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    return `A ${this.color} shape`;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color); // Call parent constructor
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  describe() {
    return `${super.describe()} - Rectangle`;
  }
}

const rect = new Rectangle('blue', 10, 5);
console.log(rect.describe()); // "A blue shape - Rectangle"
console.log(rect.area()); // 50

//✅ instanceof - Check prototype chain
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
console.log(rect instanceof Object); // true

// ============================================
// 6️⃣ COMMON INTERVIEW PATTERNS
// ============================================

//🔥 PATTERN 1: Deep Clone Object - O(n)
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') return obj;

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  // Handle Date
  if (obj instanceof Date) return new Date(obj);

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item, hash);
    });
    return arrCopy;
  }

  // Handle Object
  const objCopy = {};
  hash.set(obj, objCopy);
  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });

  return objCopy;
}

const original = {
  a: 1,
  b: { c: 2, d: [3, 4] },
  date: new Date()
};
const cloned = deepClone(original);
cloned.b.c = 999;
console.log(original.b.c); // 2 (not affected)
console.log(cloned.b.c); // 999

//🔥 PATTERN 2: Flatten Nested Object
function flattenObject(obj, prefix = '', result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

const nested = {
  user: {
    name: 'Alice',
    address: {
      city: 'NYC',
      zip: 10001
    }
  }
};
console.log(flattenObject(nested));
// {'user.name': 'Alice', 'user.address.city': 'NYC', 'user.address.zip': 10001}

//🔥 PATTERN 3: Deep Merge Objects
function deepMerge(target, source) {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

const obj3 = { a: 1, b: { x: 10, y: 20 } };
const obj4 = { b: { y: 30, z: 40 }, c: 3 };
console.log(deepMerge(obj3, obj4));
// {a: 1, b: {x: 10, y: 30, z: 40}, c: 3}

//🔥 PATTERN 4: Group By Property
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {});
}

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];
console.log(groupBy(people, 'age'));
// {25: [{name: 'Alice', age: 25}, {name: 'Charlie', age: 25}], 30: [{name: 'Bob', age: 30}]}

//🔥 PATTERN 5: Pick/Omit Properties
function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (key in obj) result[key] = obj[key];
    return result;
  }, {});
}

function omit(obj, keys) {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

const data = { a: 1, b: 2, c: 3, d: 4 };
console.log(pick(data, ['a', 'c'])); // {a: 1, c: 3}
console.log(omit(data, ['a', 'c'])); // {b: 2, d: 4}

//🔥 PATTERN 6: Object Comparison (Deep Equality)
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 })); // false

//🔥 PATTERN 7: Transform Object Keys/Values
function mapKeys(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [fn(key), value])
  );
}

function mapValues(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  );
}

const nums = { a: 1, b: 2, c: 3 };
console.log(mapKeys(nums, key => key.toUpperCase())); // {A: 1, B: 2, C: 3}
console.log(mapValues(nums, val => val * 2)); // {a: 2, b: 4, c: 6}

//🔥 PATTERN 8: Invert Object (swap keys and values)
function invert(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
}

console.log(invert({ a: 'x', b: 'y', c: 'z' })); // {x: 'a', y: 'b', z: 'c'}

//🔥 PATTERN 9: Filter Object
function filterObject(obj, predicate) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(value, key))
  );
}

const scores = { math: 85, english: 92, science: 78, history: 95 };
console.log(filterObject(scores, val => val >= 90)); // {english: 92, history: 95}

//🔥 PATTERN 10: Merge with Custom Logic
function mergeWith(obj1, obj2, merger) {
  const result = { ...obj1 };

  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (key in result) {
        result[key] = merger(result[key], obj2[key], key);
      } else {
        result[key] = obj2[key];
      }
    }
  }

  return result;
}

const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };
console.log(mergeWith(a, b, (v1, v2) => v1 + v2)); // {x: 1, y: 5, z: 4}

// ============================================
// 7️⃣ INTERVIEW QUESTIONS WITH SOLUTIONS
// ============================================

//❓ Q1: Implement Object.create()
function myObjectCreate(proto) {
  function F() { }
  F.prototype = proto;
  return new F();
}

const protoTest = { greet: () => 'Hello' };
const testObj = myObjectCreate(protoTest);
console.log(testObj.greet()); // 'Hello'

//❓ Q2: Count Property Occurrences
function countProperties(arr, prop) {
  return arr.reduce((acc, obj) => {
    const key = obj[prop];
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

const items = [
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'veggie', name: 'carrot' }
];
console.log(countProperties(items, 'type')); // {fruit: 2, veggie: 1}

//❓ Q3: Implement _.get() (Lodash) - Safe nested property access
function get(obj, path, defaultValue = undefined) {
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;

  for (let key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
}

const testData = { a: { b: { c: 42 } } };
console.log(get(testData, 'a.b.c')); // 42
console.log(get(testData, 'a.x.y', 'default')); // 'default'
console.log(get(testData, ['a', 'b', 'c'])); // 42

//❓ Q4: Implement _.set() - Set nested property
function set(obj, path, value) {
  const keys = Array.isArray(path) ? path : path.split('.');
  const lastKey = keys.pop();

  let current = obj;
  for (let key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
}

const setTest = {};
set(setTest, 'a.b.c', 100);
console.log(setTest); // {a: {b: {c: 100}}}

//❓ Q5: Find Differences Between Two Objects
function objectDiff(obj1, obj2) {
  const diff = {};

  // Check all keys in obj1
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (!(key in obj2)) {
        diff[key] = { old: obj1[key], new: undefined };
      } else if (obj1[key] !== obj2[key]) {
        diff[key] = { old: obj1[key], new: obj2[key] };
      }
    }
  }

  // Check for new keys in obj2
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key) && !(key in obj1)) {
      diff[key] = { old: undefined, new: obj2[key] };
    }
  }

  return diff;
}

const oldObj = { a: 1, b: 2, c: 3 };
const updatedObj = { a: 1, b: 5, d: 4 };
console.log(objectDiff(oldObj, updatedObj));
// {b: {old: 2, new: 5}, c: {old: 3, new: undefined}, d: {old: undefined, new: 4}}

//❓ Q6: Remove Falsy Values from Object
function compactObject(obj) {
  const result = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      result[key] = obj[key];
    }
  }

  return result;
}

const messy = { a: 1, b: null, c: 0, d: false, e: '', f: 'valid', g: undefined };
console.log(compactObject(messy)); // {a: 1, f: 'valid'}

//❓ Q7: Convert Array to Object (Index as Key)
function arrayToObject(arr, keyProp) {
  return arr.reduce((acc, item) => {
    const key = keyProp ? item[keyProp] : item;
    acc[key] = item;
    return acc;
  }, {});
}

const users2 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
console.log(arrayToObject(users2, 'id'));
// {1: {id: 1, name: 'Alice'}, 2: {id: 2, name: 'Bob'}}

//❓ Q8: Implement Object Memoization
function memoizeObject(fn) {
  const cache = {};

  return function (obj) {
    const key = JSON.stringify(obj);
    if (key in cache) {
      console.log('Cache hit!');
      return cache[key];
    }
    console.log('Computing...');
    const result = fn(obj);
    cache[key] = result;
    return result;
  };
}

const expensiveCalc = memoizeObject((obj) => {
  return Object.values(obj).reduce((sum, val) => sum + val, 0);
});

console.log(expensiveCalc({ a: 1, b: 2, c: 3 })); // Computing... 6
console.log(expensiveCalc({ a: 1, b: 2, c: 3 })); // Cache hit! 6

// ============================================
// 8️⃣ EDGE CASES & GOTCHAS
// ============================================

//⚠️ Reference vs Value
const original1 = { a: 1 };
const copy1 = original1; // Reference copy!
copy1.a = 2;
console.log(original1.a); // 2 - original is affected!

const copy2 = { ...original1 }; // Shallow copy
copy2.a = 3;
console.log(original1.a); // 2 - not affected

//⚠️ Shallow Copy Issue with Nested Objects
const nestedObj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...nestedObj };
shallowCopy.b.c = 999;
console.log(nestedObj.b.c); // 999 - nested object is still referenced!

//⚠️ Property Order (Generally preserved in modern JS)
const ordered = {};
ordered.b = 2;
ordered.a = 1;
ordered.c = 3;
console.log(Object.keys(ordered)); // ['b', 'a', 'c'] - insertion order

//⚠️ Object.keys() vs for...in
const parent = { inherited: true };
const child = Object.create(parent);
child.own = true;

console.log(Object.keys(child)); // ['own'] - only own properties
for (let key in child) {
  console.log(key); // 'own', 'inherited' - includes inherited
}

//⚠️ JSON.stringify() Limitations
const complex = {
  fn: () => 'test',          // Lost
  undef: undefined,           // Lost
  sym: Symbol('id'),         // Lost
  date: new Date(),          // Converted to string
  num: NaN,                  // Becomes null
  inf: Infinity              // Becomes null
};
console.log(JSON.parse(JSON.stringify(complex)));
// {date: "2024-...", num: null, inf: null}

//⚠️ this Binding
const obj5 = {
  name: 'Object',
  greet: function () {
    console.log(this.name);
  },
  arrowGreet: () => {
    console.log(this.name); // Arrow functions don't have own 'this'
  }
};
obj5.greet(); // 'Object'
const greetFn = obj5.greet;
greetFn(); // undefined (lost context)
greetFn.call(obj5); // 'Object' (explicit binding)

//⚠️ Property Deletion and undefined
const delTest = { a: 1, b: undefined };
console.log('b' in delTest); // true
delete delTest.b;
console.log('b' in delTest); // false

// ============================================
// 9️⃣ PERFORMANCE & BEST PRACTICES
// ============================================

/*
   BEST PRACTICES:
   1. Use object literals for simple objects
   2. Use classes for complex objects with methods
   3. Use Object.create() for prototypal inheritance
   4. Avoid modifying built-in prototypes
   5. Use const for objects (prevents reassignment, not mutation)
   6. Use Object.freeze() for true immutability
   7. Prefer spread operator over Object.assign()
   8. Use destructuring for cleaner code
   9. Cache Object.keys() results if used in loops
   10. Use Map for frequent additions/deletions
*/

//💡 Destructuring
const userData = { id: 1, username: 'alice', email: 'alice@email.com', age: 25 };

// Object destructuring
const { username, email } = userData;
console.log(username, email); // 'alice' 'alice@email.com'

// With renaming
const { username: name, age: years } = userData;
console.log(name, years); // 'alice' 25

// With default values
const { phone = 'N/A' } = userData;
console.log(phone); // 'N/A'

// Nested destructuring
const company = {
  name: 'Tech Corp',
  ceo: { name: 'John Doe', age: 45 }
};
const { ceo: { name: ceoName } } = company;
console.log(ceoName); // 'John Doe'

//💡 Rest operator
const { id, ...rest } = userData;
console.log(rest); // {username: 'alice', email: 'alice@email.com', age: 25}

//� Shorthand Property Names
const x = 10, y = 20;
const point = { x, y }; // Same as {x: x, y: y}
console.log(point); // {x: 10, y: 20}

//� Computed Property Names
const propName = 'dynamic';
const dynamic = {
  [propName]: 'value',
  [`${propName}Key`]: 'another value'
};
console.log(dynamic); // {dynamic: 'value', dynamicKey: 'another value'}

//💡 Method Shorthand
const calculator = {
  // Old way
  add: function (a, b) { return a + b; },

  // Shorthand
  subtract(a, b) { return a - b; },

  // Computed method name
  [Symbol.iterator]() { /* ... */ }
};

/* ============================================
   💡 KEY TAKEAWAYS FOR INTERVIEWS:
   ============================================
   1. Objects are reference types - passed by reference
   2. Many ways to create objects: literal, constructor, class, factory
   3. Shallow vs deep copy - crucial difference
   4. Object methods: keys, values, entries, assign, freeze, seal
   5. Property descriptors control property behavior
   6. Prototypal inheritance - understand prototype chain
   7. Common patterns: deep clone, flatten, merge, pick/omit
   8. this binding varies by context (regular vs arrow functions)
   9. Use Map for non-string keys or frequent mutations
   10. Destructuring, spread, rest for cleaner code
   ============================================ */
