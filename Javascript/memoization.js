/**
 * MEMOIZATION UTILITY - INTERVIEW IMPLEMENTATION
 * ----------------------------------------------
 * Optimization technique to cache results of expensive function calls.
 * Concepts: Closures, High-Order Functions, Caching Strategies.
 */

/**
 * A generic memoization wrapper.
 * Uses a 'Map' to allow any type of keys and better performance than Objects.
 * 
 * @param {Function} fn - Function to be memoized
 * @param {Function} resolver - Optional key generator (defaults to JSON string)
 */
function memoize(fn, resolver) {
    const cache = new Map();

    return function (...args) {
        // Create a unique key for the arguments
        const key = resolver ? resolver(...args) : JSON.stringify(args);

        if (cache.has(key)) {
            // console.log(`[Cache Hit] Args: ${key}`);
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// ==========================================
// TEST CASE 1: Basic Function
// ==========================================
console.log("--- 1. Basic Caching ---");

const slowAdd = (a, b) => {
    // Simulate heavy work
    for (let i = 0; i < 1e6; i++) { }
    return a + b;
};

const fastAdd = memoize(slowAdd);

console.time("First Run (Slow)");
console.log(`Result: ${fastAdd(10, 20)}`);
console.timeEnd("First Run (Slow)");

console.time("Second Run (Fast)");
console.log(`Result: ${fastAdd(10, 20)}`);
console.timeEnd("Second Run (Fast)");


// ==========================================
// TEST CASE 2: Recursive Optimization (Dynamic Programming)
// ==========================================
// The classic Fibonacci Interview Problem.

console.log("\n--- 2. Fibonacci Optimization ---");

// Naive Recursive Solution: O(2^n) - Exponential Time
// Very slow for n > 35
let recursiveCalls = 0;
const fib = (n) => {
    recursiveCalls++;
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
};

// Optimized Solution: O(n) - Linear Time
let memoCalls = 0;
const fibMemo = memoize((n) => {
    memoCalls++;
    if (n <= 1) return n;
    return fibMemo(n - 1) + fibMemo(n - 2);
}, (n) => n); // Custom resolver: key is just 'n' (number)

const target = 35;

// Run Naive
console.log(`Calculating Fib(${target}) Naively...`);
console.time("Naive Fib");
// const res1 = fib(target); 
// console.log(`Result: ${res1}, Calls: ${recursiveCalls}`);
console.log("Skipping naive execution to save time (it takes ~150-200ms for 35, but huge for 40+)");
console.timeEnd("Naive Fib");

// Run Memoized
console.log(`\nCalculating Fib(${target}) Memoized...`);
console.time("Memoized Fib");
const res2 = fibMemo(target);
console.log(`Result: ${res2}, Calls to Fn: ${memoCalls}`);
console.timeEnd("Memoized Fib");

/*
  Explanation:
  Naive fib(35) calls the function ~18 million times.
  Memoized fib(35) calls the function only 36 times (once per number 0-35).
*/
