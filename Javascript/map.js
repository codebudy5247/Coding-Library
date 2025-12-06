/* 
   WHAT IS A MAP?
   - A Map is a collection of key-value pairs
   - Keys can be of ANY type (objects, functions, primitives)
   - Maintains insertion order
   - Remembers the original insertion order of keys
   - Time Complexity: O(1) for get, set, has, delete
*/

// ============================================
// 1️⃣ BASIC MAP OPERATIONS
// ============================================

//✅ Creating a Map
const map1 = new Map(); // Empty map
const map2 = new Map([
    ['name', 'Alice'],
    ['age', 25],
    ['city', 'New York']
]); // From array of [key, value] pairs
console.log(map2); // Map(3) {'name' => 'Alice', 'age' => 25, 'city' => 'New York'}
console.log(map2.size); // 3

//✅ Adding/Updating key-value pairs - O(1)
map1.set('name', 'Bob');
map1.set('age', 30);
map1.set(1, 'number key');
map1.set(true, 'boolean key');
map1.set(null, 'null key');
map1.set(undefined, 'undefined key');

// Keys can be ANY type - even objects and functions!
const objKey = { id: 1 };
const funcKey = () => console.log('func');
map1.set(objKey, 'object as key');
map1.set(funcKey, 'function as key');
console.log(map1.size); // 8

//✅ Method chaining (set returns the map)
const chainedMap = new Map()
    .set('a', 1)
    .set('b', 2)
    .set('c', 3);
console.log(chainedMap); // Map(3) {'a' => 1, 'b' => 2, 'c' => 3}

//✅ Getting values - O(1)
console.log(map2.get('name')); // 'Alice'
console.log(map2.get('age')); // 25
console.log(map2.get('missing')); // undefined

//✅ Checking if key exists - O(1)
console.log(map2.has('name')); // true
console.log(map2.has('email')); // false

//✅ Deleting entries - O(1)
console.log(map1.delete('age')); // true - successfully deleted
console.log(map1.delete('nonexistent')); // false - key didn't exist
console.log(map1.size); // 7

//✅ Clearing all entries - O(n)
map1.clear();
console.log(map1.size); // 0

//✅ Important: Keys are compared using SameValueZero algorithm
const numMap = new Map();
numMap.set(5, 'number');
numMap.set('5', 'string');
console.log(numMap.get(5)); // 'number'
console.log(numMap.get('5')); // 'string'
console.log(numMap.size); // 2 - different types, different keys

// ============================================
// 2️⃣ ITERATING THROUGH MAPS
// ============================================

const languages = new Map([
    ['js', 'JavaScript'],
    ['py', 'Python'],
    ['java', 'Java'],
    ['go', 'Go']
]);

//💡 forEach loop
languages.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});

//💡 for...of with entries() (most common)
for (let [key, value] of languages.entries()) {
    console.log(`${key} => ${value}`);
}

//💡 for...of (default iterator is entries())
for (let [key, value] of languages) {
    console.log(`${key} => ${value}`);
}

//💡 Iterating keys only
for (let key of languages.keys()) {
    console.log(key); // js, py, java, go
}

//💡 Iterating values only
for (let value of languages.values()) {
    console.log(value); // JavaScript, Python, Java, Go
}

//💡 Convert Map to Array
const entriesArray = [...languages]; // or Array.from(languages)
console.log(entriesArray); // [['js', 'JavaScript'], ['py', 'Python'], ...]

const keysArray = [...languages.keys()];
console.log(keysArray); // ['js', 'py', 'java', 'go']

const valuesArray = [...languages.values()];
console.log(valuesArray); // ['JavaScript', 'Python', 'Java', 'Go']

//💡 Convert Map to Object
const obj = Object.fromEntries(languages);
console.log(obj); // {js: 'JavaScript', py: 'Python', java: 'Java', go: 'Go'}

//💡 Convert Object to Map
const person = { name: 'John', age: 30, city: 'NYC' };
const personMap = new Map(Object.entries(person));
console.log(personMap); // Map(3) {'name' => 'John', 'age' => 30, 'city' => 'NYC'}

// ============================================
// 3️⃣ MAP VS OBJECT - WHEN TO USE WHICH?
// ============================================

/*
   MAP vs OBJECT:
   
   ✅ Use MAP when:
   - Keys are not strings/symbols (any type as key)
   - Need to maintain insertion order
   - Frequent additions/deletions
   - Need to know size easily (map.size)
   - Iterating over entries frequently
   - Keys are unknown until runtime
   
   ✅ Use OBJECT when:
   - Keys are always strings/symbols
   - Need JSON serialization
   - Working with simple key-value pairs
   - Need to access via dot notation
   - Using with class instances
*/

//💡 Key differences demonstration
const mapExample = new Map();
const objExample = {};

// 1. Any type as key in Map
mapExample.set(1, 'one');
mapExample.set('1', 'string one');
mapExample.set(true, 'boolean');
mapExample.set({}, 'object key');
console.log(mapExample.size); // 4

objExample[1] = 'one'; // Converted to string
objExample['1'] = 'overwritten'; // Same as above
console.log(Object.keys(objExample).length); // 1

// 2. Size property
console.log(mapExample.size); // Direct
console.log(Object.keys(objExample).length); // Need to count

// 3. Iteration order (Maps maintain insertion order)
const orderedMap = new Map([['z', 1], ['a', 2], ['m', 3]]);
for (let [key] of orderedMap) {
    console.log(key); // z, a, m (insertion order)
}

// ============================================
// 4️⃣ COMMON INTERVIEW PATTERNS
// ============================================

//🔥 PATTERN 1: Frequency Counter / Character Count - O(n)
function countOccurrences(arr) {
    const freq = new Map();
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}
console.log(countOccurrences([1, 2, 2, 3, 3, 3, 4]));
// Map(4) {1 => 1, 2 => 2, 3 => 3, 4 => 1}

//🔥 PATTERN 2: Group By Property - O(n)
function groupBy(arr, key) {
    const grouped = new Map();
    for (let item of arr) {
        const groupKey = item[key];
        if (!grouped.has(groupKey)) {
            grouped.set(groupKey, []);
        }
        grouped.get(groupKey).push(item);
    }
    return grouped;
}

const users = [
    { name: 'Alice', department: 'Engineering' },
    { name: 'Bob', department: 'Sales' },
    { name: 'Charlie', department: 'Engineering' }
];
console.log(groupBy(users, 'department'));
// Map(2) {'Engineering' => [{...}, {...}], 'Sales' => [{...}]}

//🔥 PATTERN 3: LRU Cache (Least Recently Used) - O(1)
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        // Delete if exists (to update position)
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Add to end
        this.cache.set(key, value);

        // Remove oldest if over capacity
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}

const cache = new LRUCache(3);
cache.put(1, 'a');
cache.put(2, 'b');
cache.put(3, 'c');
console.log(cache.get(1)); // 'a'
cache.put(4, 'd'); // Evicts key 2
console.log(cache.get(2)); // -1 (not found)

//🔥 PATTERN 4: Two Sum with Indices - O(n)
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return null;
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]

//🔥 PATTERN 5: Anagram Grouping - O(n * k log k) where k is max word length
function groupAnagrams(words) {
    const groups = new Map();

    for (let word of words) {
        const sorted = word.split('').sort().join('');
        if (!groups.has(sorted)) {
            groups.set(sorted, []);
        }
        groups.get(sorted).push(word);
    }

    return [...groups.values()];
}
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]

//🔥 PATTERN 6: Memoization / Caching - O(1) lookup
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('Cache hit!');
            return cache.get(key);
        }
        console.log('Computing...');
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Computing... 55
console.log(fibonacci(10)); // Cache hit! 55

//🔥 PATTERN 7: Index Mapping - O(n)
function arrayToMap(arr) {
    return new Map(arr.map((item, index) => [index, item]));
}
console.log(arrayToMap(['a', 'b', 'c']));
// Map(3) {0 => 'a', 1 => 'b', 2 => 'c'}

//🔥 PATTERN 8: Counting Unique Values by Category - O(n)
function countByCategory(items, categoryKey, valueKey) {
    const counts = new Map();

    for (let item of items) {
        const category = item[categoryKey];
        const value = item[valueKey];

        if (!counts.has(category)) {
            counts.set(category, new Set());
        }
        counts.get(category).add(value);
    }

    // Convert Sets to counts
    const result = new Map();
    for (let [category, set] of counts) {
        result.set(category, set.size);
    }
    return result;
}

//🔥 PATTERN 9: Default Values with Map
function getWithDefault(map, key, defaultValue) {
    if (!map.has(key)) {
        map.set(key, defaultValue);
    }
    return map.get(key);
}

const settings = new Map();
console.log(getWithDefault(settings, 'theme', 'dark')); // 'dark'
console.log(getWithDefault(settings, 'theme', 'light')); // 'dark' (already set)

//🔥 PATTERN 10: Merge Maps - O(n + m)
function mergeMaps(...maps) {
    const result = new Map();
    for (let map of maps) {
        for (let [key, value] of map) {
            result.set(key, value); // Later maps override earlier ones
        }
    }
    return result;
}

const map3 = new Map([['a', 1], ['b', 2]]);
const map4 = new Map([['b', 3], ['c', 4]]);
console.log(mergeMaps(map3, map4)); // Map(3) {'a' => 1, 'b' => 3, 'c' => 4}

// ============================================
// 5️⃣ INTERVIEW QUESTIONS WITH SOLUTIONS
// ============================================

//❓ Q1: First Non-Repeating Character
function firstNonRepeating(str) {
    const freq = new Map();

    // Count frequencies
    for (let char of str) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }

    // Find first with count 1
    for (let char of str) {
        if (freq.get(char) === 1) return char;
    }

    return null;
}
console.log(firstNonRepeating("leetcode")); // "l"
console.log(firstNonRepeating("aabb")); // null

//❓ Q2: Isomorphic Strings
function isIsomorphic(s, t) {
    if (s.length !== t.length) return false;

    const mapST = new Map();
    const mapTS = new Map();

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        if (mapST.has(charS) && mapST.get(charS) !== charT) return false;
        if (mapTS.has(charT) && mapTS.get(charT) !== charS) return false;

        mapST.set(charS, charT);
        mapTS.set(charT, charS);
    }

    return true;
}
console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false

//❓ Q3: Subarray Sum Equals K
function subarraySum(nums, k) {
    const sumCount = new Map([[0, 1]]); // Handle edge case
    let sum = 0;
    let count = 0;

    for (let num of nums) {
        sum += num;
        if (sumCount.has(sum - k)) {
            count += sumCount.get(sum - k);
        }
        sumCount.set(sum, (sumCount.get(sum) || 0) + 1);
    }

    return count;
}
console.log(subarraySum([1, 1, 1], 2)); // 2
console.log(subarraySum([1, 2, 3], 3)); // 2

//❓ Q4: Clone Graph with Map
function cloneGraph(node) {
    if (!node) return null;

    const visited = new Map();

    function dfs(node) {
        if (visited.has(node)) {
            return visited.get(node);
        }

        const clone = { val: node.val, neighbors: [] };
        visited.set(node, clone);

        for (let neighbor of node.neighbors || []) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

//❓ Q5: Longest Consecutive Sequence
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    const visited = new Map();
    let maxLength = 0;

    for (let num of nums) {
        if (!numSet.has(num - 1)) { // Start of sequence
            let currentNum = num;
            let currentLength = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4 ([1,2,3,4])

//❓ Q6: Design HashMap (Without Built-in Map)
class MyHashMap {
    constructor() {
        this.size = 1000;
        this.buckets = new Array(this.size).fill(null).map(() => []);
    }

    hash(key) {
        return key % this.size;
    }

    put(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let [k, v] of bucket) {
            if (k === key) return v;
        }
        return -1;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}

// ============================================
// 6️⃣ EDGE CASES & GOTCHAS
// ============================================

//⚠️ Object keys are compared by reference, not value
const key1 = { id: 1 };
const key2 = { id: 1 };
const objKeyMap = new Map();
objKeyMap.set(key1, 'value1');
console.log(objKeyMap.get(key2)); // undefined - different references!
console.log(objKeyMap.get(key1)); // 'value1'

//⚠️ NaN as a key
const nanMap = new Map();
nanMap.set(NaN, 'NaN value');
console.log(nanMap.get(NaN)); // 'NaN value' - works correctly!

//⚠️ -0 and +0 are considered the same key
const zeroMap = new Map();
zeroMap.set(-0, 'negative zero');
zeroMap.set(+0, 'positive zero');
console.log(zeroMap.size); // 1 - only one entry
console.log(zeroMap.get(+0)); // 'positive zero'

//⚠️ undefined and null are different keys
const nullMap = new Map();
nullMap.set(undefined, 'undefined value');
nullMap.set(null, 'null value');
console.log(nullMap.size); // 2

//⚠️ Arrays/Objects as values are mutable
const mutMap = new Map();
const arr = [1, 2, 3];
mutMap.set('numbers', arr);
arr.push(4); // Mutates the array in the map!
console.log(mutMap.get('numbers')); // [1, 2, 3, 4]

// ============================================
// 7️⃣ WEAKMAP
// ============================================

/* 
   WEAKMAP CHARACTERISTICS:
   - Keys MUST be objects (no primitives)
   - Keys are held weakly (can be garbage collected)
   - Not enumerable (no iteration)
   - No size property
   - No clear() method
   - Only methods: get, set, has, delete
   - Use cases: private data, metadata, caching
*/

let user1 = { name: 'Alice' };
let user2 = { name: 'Bob' };

const privateData = new WeakMap();

//✅ Storing private data
privateData.set(user1, { password: 'secret123', email: 'alice@email.com' });
privateData.set(user2, { password: 'pw456', email: 'bob@email.com' });

console.log(privateData.get(user1)); // {password: 'secret123', email: 'alice@email.com'}

//✅ Automatic garbage collection
console.log(privateData.has(user2)); // true
user2 = null; // Remove reference
// After GC, user2 and its data will be removed from WeakMap

//❌ Cannot use primitives as keys
try {
    privateData.set('string-key', 'value'); // TypeError
} catch (e) {
    console.log('WeakMap keys must be objects');
}

//❌ Cannot iterate
// privateData.forEach() // NOT available
// for...of // NOT available
// privateData.size // NOT available

//💡 Real-world use case: DOM metadata without memory leaks
const elementMetadata = new WeakMap();

function attachMetadata(element, data) {
    elementMetadata.set(element, data);
}

function getMetadata(element) {
    return elementMetadata.get(element);
}

// When DOM element is removed, metadata is automatically cleaned up

//💡 Real-world use case: Private class fields (before # syntax)
const privateFields = new WeakMap();

class Person {
    constructor(name, ssn) {
        this.name = name; // public
        privateFields.set(this, { ssn }); // private
    }

    getSSN() {
        return privateFields.get(this).ssn;
    }
}

const person1 = new Person('Alice', '123-45-6789');
console.log(person1.name); // 'Alice'
console.log(person1.getSSN()); // '123-45-6789'
console.log(person1.ssn); // undefined - private!

// ============================================
// 8️⃣ PERFORMANCE TIPS
// ============================================

/* 
   TIME COMPLEXITY:
   Map.set()    : O(1) average
   Map.get()    : O(1) average
   Map.has()    : O(1) average
   Map.delete() : O(1) average
   Map.clear()  : O(n)
   
   SPACE COMPLEXITY: O(n) where n is number of entries
   
   ✅ Performance Benefits:
   - Faster than Object for frequent additions/deletions
   - Better iteration performance
   - No prototype chain lookup
   - Predictable key comparison
*/

//💡 Performance comparison: Map vs Object
const iterations = 100000;

// Map performance
console.time('Map operations');
const perfMap = new Map();
for (let i = 0; i < iterations; i++) {
    perfMap.set(i, i);
}
for (let i = 0; i < iterations; i++) {
    perfMap.get(i);
}
for (let i = 0; i < iterations; i++) {
    perfMap.delete(i);
}
console.timeEnd('Map operations');

// Object performance
console.time('Object operations');
const perfObj = {};
for (let i = 0; i < iterations; i++) {
    perfObj[i] = i;
}
for (let i = 0; i < iterations; i++) {
    perfObj[i];
}
for (let i = 0; i < iterations; i++) {
    delete perfObj[i];
}
console.timeEnd('Object operations');

// ============================================
// 9️⃣ BONUS: PRACTICAL UTILITIES
// ============================================

//🎯 Filter Map
function filterMap(map, predicate) {
    const result = new Map();
    for (let [key, value] of map) {
        if (predicate(value, key, map)) {
            result.set(key, value);
        }
    }
    return result;
}

//🎯 Map values (transform)
function mapValues(map, transformer) {
    const result = new Map();
    for (let [key, value] of map) {
        result.set(key, transformer(value, key, map));
    }
    return result;
}

//🎯 Invert Map (swap keys and values)
function invertMap(map) {
    const inverted = new Map();
    for (let [key, value] of map) {
        inverted.set(value, key);
    }
    return inverted;
}

//🎯 Deep clone Map
function cloneMap(map) {
    return new Map(map);
}

// Usage examples
const nums = new Map([[1, 10], [2, 20], [3, 30]]);
console.log(filterMap(nums, v => v > 15)); // Map(2) {2 => 20, 3 => 30}
console.log(mapValues(nums, v => v * 2)); // Map(3) {1 => 20, 2 => 40, 3 => 60}
console.log(invertMap(nums)); // Map(3) {10 => 1, 20 => 2, 30 => 3}

/* ============================================
   💡 KEY TAKEAWAYS FOR INTERVIEWS:
   ============================================
   1. Map provides O(1) operations for get/set/has/delete
   2. Keys can be ANY type (objects, functions, primitives)
   3. Maintains insertion order (unlike old objects)
   4. Common patterns: frequency counting, memoization, LRU cache, grouping
   5. Use Map over Object when keys aren't strings or need iteration
   6. WeakMap for private data and preventing memory leaks
   7. Remember NaN and object reference edge cases
   8. Perfect for two-sum, anagram, and graph problems
   ============================================ */