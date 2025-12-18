/**
 * CALL, APPLY, BIND - INTERVIEW PREPARATION GUIDE
 * -----------------------------------------------
 * These methods are used to set the context of 'this' explicitly.
 * Vital for borrowing methods and fixing 'this' binding issues.
 */

// Object we will "borrow" methods for
const person1 = {
    name: "Ujjwal",
    printName: function (city, country) {
        console.log(`${this.name} from ${city}, ${country}`);
    }
};

const person2 = {
    name: "CodeBuddy"
};

// ==========================================
// 1. CALL
// ==========================================
// Syntax: function.call(thisArg, arg1, arg2, ...)
// Executes function immediately with modified 'this'.

console.log("--- 1. Call ---");
// Borrowing printName from person1 for person2
person1.printName.call(person2, "New York", "USA");


// ==========================================
// 2. APPLY
// ==========================================
// Syntax: function.apply(thisArg, [argsArray])
// Same as call, but arguments are passed as an ARRAY.

console.log("\n--- 2. Apply ---");
person1.printName.apply(person2, ["Mumbai", "India"]);
// Hint: "A" for Array


// ==========================================
// 3. BIND
// ==========================================
// Syntax: const newFn = function.bind(thisArg, arg1, ...)
// Returns a NEW function with 'this' permanently bound. DOES NOT EXECUTE.

console.log("\n--- 3. Bind ---");
const printMyName = person1.printName.bind(person2, "London", "UK");
// Later execution...
console.log("Function bound, executing now...");
printMyName();


// ==========================================
// 4. INTERVIEW QUESTION: POLYFILL FOR BIND
// ==========================================
// Q: Implement Function.prototype.myBind

console.log("\n--- 4. Polyfill for Bind ---");

Function.prototype.myBind = function (context, ...args) {
    // 'this' refers to the function we are binding (e.g., printName)
    let fn = this;

    return function (...newArgs) {
        // combine initial args (from bind) and new args (from call)
        // use apply to execute the stored function with the desired context
        return fn.apply(context, [...args, ...newArgs]);
    };
};

// Testing the Polyfill
const printMyName2 = person1.printName.myBind(person2, "Paris");
printMyName2("France");
// Expected: CodeBuddy from Paris, France
