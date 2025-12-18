/**
 * POLYFILLS - INTERVIEW PREPARATION GUIDE
 * ---------------------------------------
 * A "polyfill" is code that implements a feature on web browsers that do not support the feature.
 * Writing them proves you understand how the built-in methods work internally.
 */

// Sample Data
const nums = [1, 2, 3, 4, 5];

// ==========================================
// 1. Array.prototype.map
// ==========================================
console.log("--- 1. Polyfill: .map() ---");

Array.prototype.myMap = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        // 'this' refers to the array calling myMap
        result.push(callback(this[i], i, this));
    }
    return result;
};

const squares = nums.myMap(num => num * 2);
console.log(squares); // [2, 4, 6, 8, 10]


// ==========================================
// 2. Array.prototype.filter
// ==========================================
console.log("\n--- 2. Polyfill: .filter() ---");

Array.prototype.myFilter = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

const evens = nums.myFilter(num => num % 2 === 0);
console.log(evens); // [2, 4]


// ==========================================
// 3. Array.prototype.reduce
// ==========================================
console.log("\n--- 3. Polyfill: .reduce() ---");

Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator = initialValue;
    // If no initialValue provided, use first element as accumulator
    // and start loop from second element (index 1)
    let startIndex = 0;

    if (arguments.length === 1) { // Only callback provided
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

const sum = nums.myReduce((acc, curr) => acc + curr, 0);
console.log(`Sum: ${sum}`); // 15


// ==========================================
// 4. Promise.all
// ==========================================
console.log("\n--- 4. Polyfill: Promise.all() ---");

Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedCount = 0;

        if (promises.length === 0) {
            resolve(results);
            return;
        }

        promises.forEach((p, index) => {
            // Use Promise.resolve(p) to handle non-promise values
            Promise.resolve(p).then(res => {
                results[index] = res; // Maintain order
                completedCount++;

                if (completedCount === promises.length) {
                    resolve(results);
                }
            }).catch(err => {
                reject(err); // Fail fast
            });
        });
    });
};

// Testing Promise.myAll
const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve) => setTimeout(resolve, 100, 'foo'));

Promise.myAll([p1, p2, p3]).then(values => {
    console.log("Promise.myAll result:", values); // [3, 42, "foo"]
}).catch(err => console.error(err));
