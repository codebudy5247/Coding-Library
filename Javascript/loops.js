/**
 * JAVASCRIPT LOOPS - INTERVIEW PREPARATION GUIDE
 * ----------------------------------------------
 * This file covers standard loops, modern iteration methods, control flow,
 * and common interview questions/pitfalls.
 */

// ==========================================
// 1. STANDARD LOOPS
// ==========================================

console.log("--- 1. Standard Loops ---");

// A. The 'for' loop
// Best for: Iterating when you know how many times you want to loop.
console.log("Running for loop:");
for (let i = 0; i < 3; i++) {
  console.log(`Iteration ${i}`);
}

// B. The 'while' loop
// Best for: Looping as long as a condition is true.
console.log("\nRunning while loop:");
let count = 0;
while (count < 3) {
  console.log(`Count is ${count}`);
  count++;
}

// C. The 'do...while' loop
// Best for: Changing a loop that must run at least once.
console.log("\nRunning do...while loop:");
let num = 5;
do {
  console.log(`Number is ${num} (runs at least once)`);
  num++;
} while (num < 5); // Condition is false, but ran once.


// ==========================================
// 2. MODERN ITERATION
// ==========================================

console.log("\n--- 2. Modern Iteration ---");

const techCompanies = ["Google", "Facebook", "Amazon", "Apple"];
const person = { name: "John", age: 30, city: "New York" };

// A. 'for...of' loop (ES6)
// Best for: Arrays, Strings, Maps, Sets (Iterables).
// ❌ NOT for Objects (unless you use Object.keys/values/entries)
console.log("Running for...of (Arrays):");
for (const company of techCompanies) {
  console.log(company);
}

// B. 'for...in' loop
// Best for: Iterating over key-value pairs of OBJECTS.
// ⚠️ CAUTION: Iterates over prototype chain properties too!
console.log("\nRunning for...in (Objects):");
for (const key in person) {
  if (person.hasOwnProperty(key)) { // Good practice: filter prototype props
    console.log(`${key}: ${person[key]}`);
  }
}

// ==========================================
// 3. ARRAY METHODS (Brief Mention)
// ==========================================

console.log("\n--- 3. Array High-Order Methods ---");

// A. forEach
// Limitation: Cannot use 'break' or 'continue'. Returns undefined.
techCompanies.forEach((company, index) => {
  if (index === 0) console.log(`forEach: ${company}`);
});


// ==========================================
// 4. CONTROL FLOW (interview checks)
// ==========================================

console.log("\n--- 4. Control Flow ---");

// 'break': Exits the loop entirely.
// 'continue': Skips to the next iteration.

for (let i = 0; i < 5; i++) {
  if (i === 1) continue; // Skip 1
  if (i === 3) break;    // Stop at 3
  console.log(`Control flow check: ${i}`); // Prints 0, 2
}


// ==========================================
// 5. INTERVIEW QUESTIONS & PATTERNS
// ==========================================

console.log("\n--- 5. Interview Questions ---");

/*
  Q1: How do you break out of a .forEach() loop?
  A: You can't using `break`. You must use `try...catch` and throw an exception (hacky) 
     or just use a regular `for` or `for...of` loop.
*/

/*
  Q2: for...in vs for...of?
  A: 
  - `for...in` iterates over KEYS (property names). Good for Objects.
  - `for...of` iterates over VALUES. Good for Arrays/Strings.
*/

/*
  Q3: The "Closure in Loop" Problem
  What does this print?
  
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
  
  Outcome: Prints "3, 3, 3" because `var` is function-scoped (shared binding).
  Fix: Use `let` (block-scoped) to create a new binding for each iteration.
*/
console.log("Q3 Demo (Async): Value of i with let:");
for (let j = 0; j < 3; j++) {
  setTimeout(() => process.stdout.write(` ${j}`), 0); // Prints 0 1 2
}
// Adding a timeout to cleanup output format for next logs
setTimeout(() => console.log("\n"), 100);


/*
  Q4: Performance Optimization in 'for' loops
  Instead of: for (let i = 0; i < arr.length; i++)
  Use:        for (let i = 0, len = arr.length; i < len; i++)
  Why? Caches the length property so it's not accessed every iteration.
*/
