/* 
   WHAT IS A SET?
   - A Set is a collection of unique values
   - Values can be of any type (primitives or objects)
   - Maintains insertion order
   - Special handling for NaN (NaN === NaN in Sets)
   - Time Complexity: O(1) for add, has, delete
*/

// ============================================
// 1️⃣ BASIC SET OPERATIONS
// ============================================

//✅ Creating a Set
const set1 = new Set(); // Empty set
const set2 = new Set([1, 2, 3, 4, 4, 5]); // From array - duplicates removed
console.log(set2); // Set(5) {1, 2, 3, 4, 5}
console.log(set2.size); // 5

//✅ Adding items to set - O(1)
set1.add(1);
set1.add(2);
set1.add(3);
set1.add(4);
set1.add(4); // Ignored - duplicates not allowed
set1.add("4"); // Different type, so it's added
set1.add(undefined);
set1.add(null);
set1.add(NaN);
set1.add(NaN); // Ignored - NaN is treated as equal to NaN
console.log(set1.size); // 7

//✅ Method chaining (add returns the set)
const chainedSet = new Set().add(1).add(2).add(3);
console.log(chainedSet); // Set(3) {1, 2, 3}

//✅ Checking if item exists - O(1)
console.log(set1.has(4)); // true
console.log(set1.has("4")); // true
console.log(set1.has(NaN)); // true
console.log(set1.has(5)); // false

//✅ Deleting items - O(1)
console.log(set1.delete(null)); // true - successfully deleted
console.log(set1.delete(100)); // false - item didn't exist
console.log(set1.size); // 6

//✅ Clearing all items - O(n)
set1.clear();
console.log(set1.size); // 0

// ============================================
// 2️⃣ ITERATING THROUGH SETS
// ============================================

const languages = new Set(['JavaScript', 'Python', 'Java', 'Go']);

//💡 forEach loop
languages.forEach((value, valueAgain, set) => {
  // Note: Set doesn't have keys, so value appears twice for consistency with Map
  console.log(value); // JavaScript, Python, Java, Go
});

//💡 for...of loop (most common)
for (let lang of languages) {
  console.log(lang);
}

//💡 Using keys() - same as values() for Sets
for (let key of languages.keys()) {
  console.log(key);
}

//💡 Using values()
for (let value of languages.values()) {
  console.log(value);
}

//💡 Using entries() - returns [value, value] pairs
for (let [key, value] of languages.entries()) {
  console.log(key, value); // key and value are the same
}

//💡 Using iterator manually
const iterator = languages.values();
console.log(iterator.next().value); // JavaScript
console.log(iterator.next().value); // Python
console.log(iterator.next().value); // Java
console.log(iterator.next().value); // Go
console.log(iterator.next().done); // true

//💡 Convert Set to Array
const arr = [...languages]; // or Array.from(languages)
console.log(arr); // ['JavaScript', 'Python', 'Java', 'Go']

// ============================================
// 3️⃣ COMMON INTERVIEW PATTERNS
// ============================================

//🔥 PATTERN 1: Remove duplicates from array - O(n)
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]

//🔥 PATTERN 2: Check if array has duplicates - O(n)
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}
console.log(hasDuplicates([1, 2, 3, 4])); // false
console.log(hasDuplicates([1, 2, 2, 3])); // true

//🔥 PATTERN 3: Union of two arrays - O(n + m)
function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}
console.log(union([1, 2, 3], [3, 4, 5])); // [1, 2, 3, 4, 5]

//🔥 PATTERN 4: Intersection of two arrays - O(n + m)
function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}
console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]

//🔥 PATTERN 5: Difference of two arrays (arr1 - arr2) - O(n + m)
function difference(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}
console.log(difference([1, 2, 3, 4], [3, 4, 5, 6])); // [1, 2]

//🔥 PATTERN 6: Symmetric Difference (XOR) - O(n + m)
function symmetricDifference(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [
    ...arr1.filter(x => !set2.has(x)),
    ...arr2.filter(x => !set1.has(x))
  ];
}
console.log(symmetricDifference([1, 2, 3], [3, 4, 5])); // [1, 2, 4, 5]

//🔥 PATTERN 7: Check if subset - O(n)
function isSubset(subset, superset) {
  const superSet = new Set(superset);
  return subset.every(item => superSet.has(item));
}
console.log(isSubset([1, 2], [1, 2, 3, 4])); // true
console.log(isSubset([1, 5], [1, 2, 3, 4])); // false

//🔥 PATTERN 8: Check if superset - O(n)
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) return false;
  }
  return true;
}
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([1, 2]);
console.log(isSuperset(setA, setB)); // true

//🔥 PATTERN 9: Find unique characters in string - O(n)
function uniqueChars(str) {
  return [...new Set(str)].join('');
}
console.log(uniqueChars("hello")); // "helo"

//🔥 PATTERN 10: Count unique elements
function countUnique(arr) {
  return new Set(arr).size;
}
console.log(countUnique([1, 2, 2, 3, 3, 3, 4])); // 4

// ============================================
// 4️⃣ INTERVIEW QUESTIONS WITH SOLUTIONS
// ============================================

//❓ Q1: Find first repeated character in string
function firstRepeatedChar(str) {
  const seen = new Set();
  for (let char of str) {
    if (seen.has(char)) return char;
    seen.add(char);
  }
  return null;
}
console.log(firstRepeatedChar("abcdefgha")); // "a"
console.log(firstRepeatedChar("abcdef")); // null

//❓ Q2: Find all unique pairs that sum to target
function findUniquePairs(arr, target) {
  const seen = new Set();
  const pairs = new Set();

  for (let num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      // Store as sorted pair to avoid duplicates
      const pair = [Math.min(num, complement), Math.max(num, complement)].toString();
      pairs.add(pair);
    }
    seen.add(num);
  }

  return Array.from(pairs).map(p => p.split(',').map(Number));
}
console.log(findUniquePairs([1, 2, 3, 4, 5], 6)); // [[1,5], [2,4]]

//❓ Q3: Longest substring without repeating characters
function longestSubstring(s) {
  let maxLen = 0;
  let start = 0;
  const seen = new Set();

  for (let end = 0; end < s.length; end++) {
    while (seen.has(s[end])) {
      seen.delete(s[start]);
      start++;
    }
    seen.add(s[end]);
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
}
console.log(longestSubstring("abcabcbb")); // 3 ("abc")
console.log(longestSubstring("bbbbb")); // 1 ("b")

//❓ Q4: Check if two arrays are disjoint (have no common elements)
function areDisjoint(arr1, arr2) {
  const set1 = new Set(arr1);
  return !arr2.some(item => set1.has(item));
}
console.log(areDisjoint([1, 2, 3], [4, 5, 6])); // true
console.log(areDisjoint([1, 2, 3], [3, 4, 5])); // false

//❓ Q5: Missing numbers in range
function findMissingNumbers(arr, min, max) {
  const set = new Set(arr);
  const missing = [];
  for (let i = min; i <= max; i++) {
    if (!set.has(i)) missing.push(i);
  }
  return missing;
}
console.log(findMissingNumbers([1, 2, 4, 6], 1, 6)); // [3, 5]

// ============================================
// 5️⃣ EDGE CASES & GOTCHAS
// ============================================

//⚠️ Objects are compared by reference, not value
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const objSet = new Set([obj1, obj2]);
console.log(objSet.size); // 2 - different references!

//⚠️ NaN handling (special case)
const nanSet = new Set();
nanSet.add(NaN);
nanSet.add(NaN);
console.log(nanSet.size); // 1 - NaN === NaN in Sets
console.log(nanSet.has(NaN)); // true

//⚠️ -0 and +0 are considered equal
const zeroSet = new Set([-0, +0]);
console.log(zeroSet.size); // 1

//⚠️ undefined and null are different
const specialSet = new Set([undefined, null]);
console.log(specialSet.size); // 2

//⚠️ Type coercion doesn't happen
const typeSet = new Set([1, "1", true]);
console.log(typeSet.size); // 3 - all different types

// ============================================
// 6️⃣ WEAKSET
// ============================================

/* 
   WEAKSET CHARACTERISTICS:
   - Can only store objects (no primitives)
   - Objects are held weakly (can be garbage collected)
   - Not enumerable (no iteration)
   - No size property
   - No clear() method
   - Use cases: tracking object states, preventing memory leaks
*/

let user1 = { name: "Alice", id: 1 };
let user2 = { name: "Bob", id: 2 };
let user3 = { name: "Charlie", id: 3 };

const loggedInUsers = new WeakSet();

//✅ Adding objects
loggedInUsers.add(user1);
loggedInUsers.add(user2);
loggedInUsers.add(user3);

//✅ Checking membership
console.log(loggedInUsers.has(user2)); // true

//✅ Deleting objects
loggedInUsers.delete(user2);
console.log(loggedInUsers.has(user2)); // false

//✅ Garbage collection demo
console.log(loggedInUsers.has(user3)); // true
user3 = null; // Remove reference
// After garbage collection, user3 will be automatically removed from WeakSet

//❌ Cannot add primitives
try {
  loggedInUsers.add(1); // TypeError
} catch (e) {
  console.log("WeakSet only accepts objects");
}

//❌ Cannot iterate
// loggedInUsers.forEach() // NOT available
// for...of // NOT available
// loggedInUsers.size // NOT available

//💡 Real-world use case: Track DOM elements
const processedElements = new WeakSet();

function processElement(element) {
  if (processedElements.has(element)) {
    console.log("Already processed");
    return;
  }
  // Process element...
  processedElements.add(element);
}

// ============================================
// 7️⃣ PERFORMANCE COMPARISON
// ============================================

/* 
   TIME COMPLEXITY:
   Set.add()    : O(1)
   Set.has()    : O(1)
   Set.delete() : O(1)
   Set.clear()  : O(n)
   
   Array vs Set for lookups:
   Array.includes() : O(n)
   Set.has()        : O(1)
   
   ✅ Use Set when: frequent lookups, ensuring uniqueness
   ✅ Use Array when: order matters, need indexing, duplicates allowed
*/

//💡 Performance example: checking membership
const largeArray = Array.from({ length: 100000 }, (_, i) => i);
const largeSet = new Set(largeArray);

console.time('Array lookup');
largeArray.includes(99999); // O(n)
console.timeEnd('Array lookup');

console.time('Set lookup');
largeSet.has(99999); // O(1)
console.timeEnd('Set lookup');

// ============================================
// 8️⃣ BONUS: PRACTICAL UTILITIES
// ============================================

//🎯 Deep equality check for sets
function areSetsEqual(set1, set2) {
  if (set1.size !== set2.size) return false;
  for (let item of set1) {
    if (!set2.has(item)) return false;
  }
  return true;
}

//🎯 Clone a set
function cloneSet(set) {
  return new Set(set);
}

//🎯 Filter set
function filterSet(set, predicate) {
  return new Set([...set].filter(predicate));
}

//🎯 Map set
function mapSet(set, mapper) {
  return new Set([...set].map(mapper));
}

const numbers = new Set([1, 2, 3, 4, 5]);
console.log(filterSet(numbers, x => x > 3)); // Set {4, 5}
console.log(mapSet(numbers, x => x * 2)); // Set {2, 4, 6, 8, 10}

/* ============================================
   💡 KEY TAKEAWAYS FOR INTERVIEWS:
   ============================================
   1. Sets provide O(1) lookup, unlike arrays O(n)
   2. Automatically handle duplicates
   3. Perfect for uniqueness checks and deduplication
   4. Common operations: union, intersection, difference
   5. Remember NaN and object reference edge cases
   6. WeakSet for object tracking without memory leaks
   ============================================ */
