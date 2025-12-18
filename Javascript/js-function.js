/**
 * JAVASCRIPT FUNCTIONS - INTERVIEW PREPARATION GUIDE
 * --------------------------------------------------
 * Functions are first-class citizens in JavaScript.
 * Understanding the different ways to define and use them is crucial.
 */

// ==========================================
// 1. DECLARATION vs EXPRESSION (HOISTING)
// ==========================================
console.log("--- 1. Hoisting & Definitions ---");

// A. Function Declaration
// HOISTED: Can be called BEFORE it is defined in the code.
greet("User");

function greet(name) {
    console.log(`Hello, ${name} (Declaration)`);
}

// B. Function Expression
// NOT HOISTED (variable is hoisted as undefined if 'var', or TDZ if 'let/const').
// sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function () {
    console.log("Hi (Expression)");
};
sayHi(); // Works here



// ==========================================
// 2. ARROW FUNCTIONS (ES6)
// ==========================================
console.log("\n--- 2. Arrow Functions ---");

// Syntax: Concise
const add = (a, b) => a + b;
console.log(`Add: ${add(5, 3)}`);

// 💡 INTERVIEW CRITICAL: Compare Regular vs Arrow
// ==============================================
console.log("\n[Comparison: Regular vs Arrow]");

// 1. Syntax & Implicit Return
const squareArrow = x => x * x; // Implicit return (one-liner)
const squareRegular = function (x) { return x * x; }; // Explicit return

// 2. 'this' Binding
// - Regular: 'this' depends on HOW the function is called (dynamic).
// - Arrow: 'this' is inherited from the outer scope (lexical).

const user = {
    name: "Alice",
    regularSayKey: function () { console.log("Regular:", this.name); },
    arrowSayKey: () => { console.log("Arrow:", this.name); }
};
user.regularSayKey(); // "Alice" (called on user)
user.arrowSayKey();   // undefined (inherits global/module scope)

// 3. Constructors
// - Regular: Can be used with 'new'.
// - Arrow: CANNOT be used with 'new'.
try {
    const Person = (name) => { this.name = name; };
    new Person("Bob");
} catch (e) {
    console.log("Arrow Constructor Error:", e.message); // Not a constructor
}

// 4. Arguments Object
const showArguments = () => {
    // console.log(arguments); // ❌ ReferenceError
    console.log("Arrow functions do not have 'arguments'. Use Rest (...) instead.");
};
showArguments(1, 2, 3);


// ==========================================
// 3. FIRST-CLASS FUNCTIONS
// ==========================================
// Meaning: Functions can be assigned to vars, passed as args, and returned.

console.log("\n--- 3. First-Class Citizens ---");

function operate(fn, a, b) {
    return fn(a, b);
}

// Passing 'add' function as an argument (Callback)
const result = operate(add, 10, 5);
console.log(`Callback Result: ${result}`);


// ==========================================
// 4. IIFE (Immediately Invoked Function Expression)
// ==========================================
// Pattern: Runs as soon as it is defined. Used to create private scope.

console.log("\n--- 4. IIFE ---");

(function () {
    const secret = "I am hidden";
    console.log("IIFE executed immediately!");
})();
// console.log(secret); // ❌ ReferenceError (Private)


// ==========================================
// 5. PARAMETERS: REST vs ARGUMENTS
// ==========================================
console.log("\n--- 5. Parameters ---");

// Legacy: 'arguments' object (Array-like)
function sumES5() {
    // console.log(arguments); // [1, 2, 3]
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(`ES5 Sum: ${sumES5(1, 2, 3)}`);

// Modern: Rest Parameters (...args) -> Real Array
function sumES6(...nums) {
    return nums.reduce((acc, curr) => acc + curr, 0);
}
console.log(`ES6 Sum: ${sumES6(1, 2, 3)}`);


// ==========================================
// 6. CURRYING
// ==========================================
// Pattern: Transforming f(a, b) into f(a)(b)

console.log("\n--- 6. Currying ---");

// Normal
function multiply(a, b) {
    return a * b;
}

// Curried
function curriedMultiply(a) {
    return function (b) {
        return a * b;
    };
}

// Arrow version
const arrowCurry = (a) => (b) => a * b;

console.log(`Curried (2)(3): ${curriedMultiply(2)(3)}`);
console.log(`Arrow Curry (5)(5): ${arrowCurry(5)(5)}`);