/**
 * CLOSURES - INTERVIEW PREPARATION GUIDE
 * --------------------------------------
 * Definition: A closure is a function bundled together (enclosed) with references 
 * to its surrounding state (the lexical environment). 
 * 
 * In simple terms: A function remembering the variables around it even when 
 * executed elsewhere.
 */

// ==========================================
// 1. BASIC CLOSURE EXAMPLE
// ==========================================

console.log("--- 1. Basic Closure ---");

function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer: ${outerVariable}`);
        console.log(`Inner: ${innerVariable}`);
    };
}

const newFunction = outerFunction("outside");
newFunction("inside");
// Output: "Outer: outside", "Inner: inside"
// Explanation: 'newFunction' still has access to 'outerVariable' 
// even after 'outerFunction' has finished executing.


// ==========================================
// 2. DATA PRIVACY (ENCAPSULATION)
// ==========================================
// Pattern: Creating private variables that can't be modified directly.

console.log("\n--- 2. Data Privacy ---");

function createCounter() {
    let count = 0; // Private variable

    return {
        increment: () => {
            count++;
            console.log(`Count: ${count}`);
        },
        decrement: () => {
            count--;
            console.log(`Count: ${count}`);
        },
        getCount: () => count // Getter
    };
}

const counter = createCounter();
counter.increment(); // Count: 1
counter.increment(); // Count: 2
counter.decrement(); // Count: 1
// console.log(counter.count); // undefined (cannot access directly)


// ==========================================
// 3. FUNCTION FACTORIES
// ==========================================
// Pattern: Making functions that create other specific functions.

console.log("\n--- 3. Function Factory ---");

function multiplyBy(factor) {
    return function (number) {
        return number * factor;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(`Double 5: ${double(5)}`); // 10
console.log(`Triple 5: ${triple(5)}`); // 15


// ==========================================
// 4. INTERVIEW QUESTION: OPTIMIZATION (MEMOIZATION)
// ==========================================
// Q: Implement a function that caches its results to avoid expensive calculations.

console.log("\n--- 4. Memoization (Caching) ---");

// A generic memoization function
function memoize(fn) {
    const cache = {}; // Closure captures this Object

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Fetching from cache...");
            return cache[key];
        } else {
            console.log("Calculating result...");
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
    };
}

// Simulating slow function
const slowSquare = (num) => {
    for (let i = 0; i < 10000000; i++) { } // Artificial delay
    return num * num;
};

const fastSquare = memoize(slowSquare);

console.time("First Call");
console.log(fastSquare(9467)); // Calculating...
console.timeEnd("First Call");

console.time("Second Call");
console.log(fastSquare(9467)); // Fetching from cache...
console.timeEnd("Second Call");
