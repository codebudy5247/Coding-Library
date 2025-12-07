/* 
   WHAT IS "this"?
   - Special keyword that refers to the execution context
   - Value is determined by HOW a function is called (runtime binding)
   - Not determined by WHERE a function is written (lexical scope)
   - Different behavior in strict mode vs non-strict mode
   - Arrow functions have lexical 'this' (different rules)
*/

// ============================================
// 1️⃣ THE 4 BINDING RULES (Priority Order)
// ============================================

/*
   Priority (Highest to Lowest):
   1. new binding
   2. Explicit binding (call, apply, bind)
   3. Implicit binding (method call)
   4. Default binding (global or undefined)
*/

// ============================================
// 2️⃣ DEFAULT BINDING (Lowest Priority)
// ============================================

//✅ Non-Strict Mode - Global Object
function showThis() {
  console.log(this); // Window (browser) or global (Node.js)
}
// showThis(); // Uncomment to test

//✅ Strict Mode - undefined
'use strict';
function showThisStrict() {
  console.log(this); // undefined in strict mode
}
// showThisStrict(); // Uncomment to test

//✅ Global Context
console.log(this); // Window (browser) or {} (Node.js module)

// ============================================
// 3️⃣ IMPLICIT BINDING (Method Calls)
// ============================================

//✅ Object Method - this = object
const person = {
  name: 'Alice',
  age: 25,
  greet: function () {
    console.log(`Hello, I'm ${this.name}`); // this = person
  },
  getAge() {
    return this.age; // Shorthand method syntax
  }
};

person.greet(); // "Hello, I'm Alice"
console.log(person.getAge()); // 25

//✅ Nested Objects - this = immediate parent
const company = {
  name: 'Tech Corp',
  ceo: {
    name: 'Bob',
    introduce() {
      console.log(`I'm ${this.name}`); // this = ceo (not company)
    }
  }
};

company.ceo.introduce(); // "I'm Bob"

//✅ Implicit Binding Loss (Common Pitfall!)
const user = {
  name: 'Charlie',
  greet: function () {
    console.log(`Hello, ${this.name}`);
  }
};

user.greet(); // "Hello, Charlie" - works!

// Lost binding - function called without object context
const greetFunc = user.greet;
// greetFunc(); // "Hello, undefined" - this is global/undefined!

// Lost in callback
setTimeout(user.greet, 1000); // "Hello, undefined" after 1s

//✅ Solution 1: Arrow Function Wrapper
setTimeout(() => user.greet(), 1000); // "Hello, Charlie"

//✅ Solution 2: bind()
setTimeout(user.greet.bind(user), 1000); // "Hello, Charlie"

// ============================================
// 4️⃣ EXPLICIT BINDING (call, apply, bind)
// ============================================

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

//✅ call() - Invoke immediately with arguments
introduce.call(person1, 'Hello', '!'); // "Hello, I'm Alice!"
introduce.call(person2, 'Hi', '.'); // "Hi, I'm Bob."

//✅ apply() - Invoke immediately with array of arguments
introduce.apply(person1, ['Hello', '!']); // "Hello, I'm Alice!"
introduce.apply(person2, ['Hi', '.']); // "Hi, I'm Bob."

//✅ bind() - Returns new function with bound this
const introducePerson1 = introduce.bind(person1);
introducePerson1('Hey', '!!!'); // "Hey, I'm Alice!!!"

// Partial application with bind
const sayHelloToAlice = introduce.bind(person1, 'Hello');
sayHelloToAlice('!'); // "Hello, I'm Alice!"

//✅ Real-world Example: Event Handlers
const button = {
  content: 'Click me',
  click: function () {
    console.log(`Button says: ${this.content}`);
  }
};

// Without bind - loses context in DOM event
// document.querySelector('button').addEventListener('click', button.click); // Wrong!

// With bind - maintains context
// document.querySelector('button').addEventListener('click', button.click.bind(button)); // Correct!

//✅ Multiple bind() - First one wins!
function showName() {
  console.log(this.name);
}

const obj1 = { name: 'First' };
const obj2 = { name: 'Second' };

const boundOnce = showName.bind(obj1);
const boundTwice = boundOnce.bind(obj2);
// boundTwice(); // "First" - first binding is permanent!

// ============================================
// 5️⃣ new BINDING (Highest Priority)
// ============================================

//✅ Constructor Function
function Person(name, age) {
  // When called with 'new':
  // 1. New empty object is created
  // 2. this = new object
  // 3. Prototype is linked
  // 4. Return this (unless you explicitly return object)

  this.name = name;
  this.age = age;
  this.greet = function () {
    return `Hello, I'm ${this.name}`;
  };
}

const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

console.log(alice.greet()); // "Hello, I'm Alice"
console.log(bob.greet()); // "Hello, I'm Bob"

//✅ ES6 Class (Syntactic sugar over constructor functions)
class Animal {
  constructor(species) {
    this.species = species;
  }

  makeSound(sound) {
    console.log(`${this.species} says ${sound}`);
  }
}

const dog = new Animal('Dog');
dog.makeSound('Woof!'); // "Dog says Woof!"

//✅ new vs regular call
function Product(name) {
  this.name = name;
  console.log(this);
}

const laptop = new Product('MacBook'); // this = new Product object
// Product('iPhone'); // this = global/undefined (no 'new')

//✅ Returning objects from constructor
function createObject(name) {
  this.name = name;

  // Explicit return overrides 'this'
  return { customName: name }; // Returns this instead
}

const obj3 = new createObject('Test');
console.log(obj3); // { customName: 'Test' } - not { name: 'Test' }

// Returning primitives doesn't override
function createObject2(name) {
  this.name = name;
  return 'ignored'; // Ignored - returns 'this'
}

const obj4 = new createObject2('Test');
console.log(obj4); // { name: 'Test' }

// ============================================
// 6️⃣ ARROW FUNCTIONS (Lexical this)
// ============================================

/*
   Arrow Functions:
   - Do NOT have their own 'this'
   - Inherit 'this' from surrounding scope (lexically)
   - Cannot be used as constructors
   - Cannot change 'this' with call/apply/bind
*/

//✅ Arrow Function vs Regular Function
const obj5 = {
  name: 'Object',

  regularFunc: function () {
    console.log(this.name); // this = obj5
  },

  arrowFunc: () => {
    console.log(this.name); // this = global/undefined (NOT obj5!)
  }
};

obj5.regularFunc(); // "Object"
obj5.arrowFunc(); // undefined (this is not obj5)

//✅ Arrow Functions in Callbacks (Solves common problem!)
const counter = {
  count: 0,

  // Problem with regular function
  startBad: function () {
    setInterval(function () {
      this.count++; // Error! this = global/undefined
      console.log(this.count);
    }, 1000);
  },

  // Solution 1: Arrow function
  startGood: function () {
    setInterval(() => {
      this.count++; // Works! this = counter
      console.log(this.count);
    }, 1000);
  },

  // Solution 2: Store 'this' reference
  startAlternative: function () {
    const self = this;
    setInterval(function () {
      self.count++; // Works!
      console.log(self.count);
    }, 1000);
  },

  // Solution 3: bind()
  startBind: function () {
    setInterval(function () {
      this.count++;
      console.log(this.count);
    }.bind(this), 1000);
  }
};

// counter.startGood(); // Uncomment to test

//✅ Arrow Functions Cannot Be Bound
const arrowFunc = () => {
  console.log(this);
};

const testObj = { name: 'Test' };
const boundArrow = arrowFunc.bind(testObj);
// boundArrow(); // this is still not testObj - binding ignored!

//✅ Arrow Functions Cannot Use 'new'
const ArrowConstructor = () => {
  this.name = 'Test';
};

// const instance = new ArrowConstructor(); // TypeError: not a constructor

//✅ Nested Arrow Functions
const obj6 = {
  name: 'Outer',

  method: function () {
    console.log(this.name); // "Outer"

    const inner = () => {
      console.log(this.name); // "Outer" - inherits from method()

      const deeperInner = () => {
        console.log(this.name); // "Outer" - still inherits
      };

      deeperInner();
    };

    inner();
  }
};

obj6.method();

// ============================================
// 7️⃣ STRICT MODE VS NON-STRICT MODE
// ============================================

//✅ Non-Strict Mode
function nonStrictFunction() {
  console.log(this); // Window / global
}
// nonStrictFunction();

//✅ Strict Mode
function strictFunction() {
  'use strict';
  console.log(this); // undefined
}
// strictFunction();

//✅ Strict Mode in Method (default binding)
const obj7 = {
  method: function () {
    'use strict';

    function innerFunc() {
      console.log(this); // undefined (strict mode)
    }

    innerFunc();
  }
};

// obj7.method();

//✅ Strict Mode Doesn't Affect Implicit Binding
const obj8 = {
  name: 'Test',
  method: function () {
    'use strict';
    console.log(this.name); // Still works! this = obj8
  }
};

obj8.method(); // "Test"

// ============================================
// 8️⃣ COMMON INTERVIEW QUESTIONS
// ============================================

//❓ Q1: What will this output?
const quiz1 = {
  name: 'Quiz',
  getName: function () {
    return this.name;
  }
};

const getName = quiz1.getName;
console.log(getName()); // undefined - lost implicit binding

//❓ Q2: What will this output?
const quiz2 = {
  name: 'Quiz 2',
  getName: () => this.name
};

console.log(quiz2.getName()); // undefined - arrow function has lexical this

//❓ Q3: Fix the callback issue
const quiz3 = {
  count: 0,
  increment: function () {
    setTimeout(function () {
      this.count++; // Won't work!
    }, 100);
  }
};

// Solutions:
const quiz3Fixed = {
  count: 0,
  increment: function () {
    setTimeout(() => {
      this.count++; // Works!
    }, 100);
  }
};

//❓ Q4: What's the output?
function A() {
  this.name = 'A';
}
A.prototype.getName = function () {
  return this.name;
};

const a = new A();
console.log(a.getName()); // "A"

const getNameFunc = a.getName;
console.log(getNameFunc()); // undefined - lost context

//❓ Q5: Chaining with proper 'this'
const calculator = {
  result: 0,

  add: function (n) {
    this.result += n;
    return this; // Return 'this' for chaining
  },

  subtract: function (n) {
    this.result -= n;
    return this;
  },

  multiply: function (n) {
    this.result *= n;
    return this;
  },

  getResult: function () {
    return this.result;
  }
};

console.log(calculator.add(5).multiply(2).subtract(3).getResult()); // 7

//❓ Q6: Implement your own bind()
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function testBind(a, b) {
  console.log(this.name, a, b);
}

const boundFunc = testBind.myBind({ name: 'Custom' }, 1);
boundFunc(2); // "Custom 1 2"

//❓ Q7: What's the output?
const obj9 = {
  name: 'Obj 9',

  method1: function () {
    console.log(this.name); // "Obj 9"

    const method2 = function () {
      console.log(this.name); // undefined (lost context)
    };

    method2();
  }
};

obj9.method1();

//❓ Q8: Event Loop and 'this'
const obj10 = {
  name: 'Async Object',

  asyncMethod: function () {
    console.log(this.name); // "Async Object"

    Promise.resolve().then(function () {
      console.log(this.name); // undefined
    });

    Promise.resolve().then(() => {
      console.log(this.name); // "Async Object" - arrow function
    });
  }
};

obj10.asyncMethod();

//❓ Q9: Class Methods
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const myCounter = new Counter();
myCounter.increment();
console.log(myCounter.count); // 1

// Lost context problem
const incrementFunc = myCounter.increment;
// incrementFunc(); // Error: Cannot read property 'count' of undefined

// Solution: Arrow property (class field)
class CounterFixed {
  count = 0;

  // Arrow function as class field - lexically bound
  increment = () => {
    this.count++;
  }
}

const myCounter2 = new CounterFixed();
const incrementFunc2 = myCounter2.increment;
incrementFunc2(); // Works!
console.log(myCounter2.count); // 1

//❓ Q10: Implement call()
Function.prototype.myCall = function (context, ...args) {
  // Handle null/undefined
  context = context || globalThis;

  // Create unique property
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  // Call function with context
  const result = context[fnSymbol](...args);

  // Clean up
  delete context[fnSymbol];

  return result;
};

function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

greet.myCall({ name: 'Test' }, 'Hello'); // "Hello, Test"

// ============================================
// 9️⃣ REAL-WORLD PATTERNS
// ============================================

//🔥 PATTERN 1: Event Handlers (React-style)
class Component {
  constructor(name) {
    this.name = name;

    // Bind in constructor (common in React)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(`Clicked: ${this.name}`);
  }

  render() {
    // Can safely pass this.handleClick
    return this.handleClick;
  }
}

const comp = new Component('MyComponent');
const handler = comp.render();
handler(); // "Clicked: MyComponent"

//🔥 PATTERN 2: Builder Pattern with 'this'
class QueryBuilder {
  constructor() {
    this.query = {};
  }

  select(fields) {
    this.query.select = fields;
    return this; // Enable chaining
  }

  from(table) {
    this.query.from = table;
    return this;
  }

  where(condition) {
    this.query.where = condition;
    return this;
  }

  build() {
    return this.query;
  }
}

const query = new QueryBuilder()
  .select(['id', 'name'])
  .from('users')
  .where('age > 18')
  .build();

console.log(query);

//🔥 PATTERN 3: Module Pattern with 'this'
const Module = (function () {
  let privateVar = 0;

  return {
    publicVar: 100,

    increment: function () {
      privateVar++;
      this.publicVar++;
      return this;
    },

    getPrivate: function () {
      return privateVar;
    }
  };
})();

Module.increment().increment();
console.log(Module.publicVar); // 102
console.log(Module.getPrivate()); // 2

//🔥 PATTERN 4: Mixin Pattern
const canEat = {
  eat: function (food) {
    console.log(`${this.name} is eating ${food}`);
  }
};

const canWalk = {
  walk: function () {
    console.log(`${this.name} is walking`);
  }
};

class Human {
  constructor(name) {
    this.name = name;
  }
}

// Mix in methods
Object.assign(Human.prototype, canEat, canWalk);

const human = new Human('Alice');
human.eat('apple'); // "Alice is eating apple"
human.walk(); // "Alice is walking"

//🔥 PATTERN 5: Debounce with Context
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    // Preserve 'this' context
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const obj11 = {
  name: 'Debounced',

  handleInput: debounce(function (value) {
    console.log(`${this.name}: ${value}`);
  }, 300)
};

// obj11.handleInput('test'); // "Debounced: test" after 300ms

// ============================================
// 🔟 EDGE CASES & GOTCHAS
// ============================================

//⚠️ GOTCHA 1: Object methods extracted from object
const obj12 = {
  value: 42,
  getValue: function () {
    return this.value;
  }
};

const getValue2 = obj12.getValue;
console.log(getValue2()); // undefined! Lost context

//⚠️ GOTCHA 2: Array methods
const numbers = [1, 2, 3];
const obj13 = {
  multiplier: 2,

  multiplyAll: function (arr) {
    return arr.map(function (num) {
      return num * this.multiplier; // this is undefined!
    });
  },

  multiplyAllFixed: function (arr) {
    // Solution 1: Arrow function
    return arr.map(num => num * this.multiplier);
  },

  multiplyAllFixed2: function (arr) {
    // Solution 2: thisArg parameter
    return arr.map(function (num) {
      return num * this.multiplier;
    }, this); // Pass 'this' as second argument
  }
};

console.log(obj13.multiplyAllFixed(numbers)); // [2, 4, 6]

//⚠️ GOTCHA 3: Nested functions
const obj14 = {
  name: 'Outer',

  method: function () {
    console.log(this.name); // "Outer"

    function inner() {
      console.log(this.name); // undefined! New function scope
    }

    inner();
  }
};

obj14.method();

//⚠️ GOTCHA 4: 'this' in eval() and with()
const obj15 = {
  value: 10,

  test: function () {
    eval('console.log(this.value)'); // 10 - uses outer 'this'
  }
};

obj15.test();

//⚠️ GOTCHA 5: DOM event handlers
// const button = document.querySelector('button');
// button.addEventListener('click', function() {
//   console.log(this); // The button element, not global!
// });

//⚠️ GOTCHA 6: setTimeout and setInterval
const obj16 = {
  name: 'Timer',

  start: function () {
    setTimeout(function () {
      console.log(this.name); // undefined - lost context
    }, 100);
  },

  startFixed: function () {
    setTimeout(() => {
      console.log(this.name); // "Timer" - arrow function
    }, 100);
  }
};

// obj16.startFixed();

/* ============================================
   💡 KEY TAKEAWAYS FOR INTERVIEWS:
   ============================================
   1. 'this' is determined by HOW function is called (runtime)
   2. 4 binding rules (priority): new > explicit > implicit > default
   3. Arrow functions inherit 'this' lexically (no own 'this')
   4. Common pitfall: losing implicit binding in callbacks
   5. Solutions: arrow functions, bind(), or store reference
   6. Strict mode: default binding is undefined (not global)
   7. call/apply invoke immediately, bind returns new function
   8. new creates new object and sets 'this' to it
   9. Class methods lose context when extracted
   10. Use arrow class fields for auto-binding in classes
   ============================================ */

/* ============================================
   🎯 INTERVIEW QUESTION PATTERNS:
   ============================================
   - "What is the value of 'this'?" → Apply binding rules
   - "Fix the callback" → Use arrow function or bind()
   - "Implement bind/call/apply" → Understand mechanics
   - "Explain arrow function 'this'" → Lexical scoping
   - "Class method context loss" → Arrow class fields
   - "Event handler context" → bind() in constructor
   - "Method chaining" → Return 'this'
   - "Strict vs non-strict" → Know the differences
   ============================================ */

