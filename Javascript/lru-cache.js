/**
 * LRU CACHE - INTERVIEW IMPLEMENTATION
 * ------------------------------------
 * Least Recently Used (LRU) Cache.
 * Requirement: Get and Put operations must be O(1) time complexity.
 * 
 * Strategy: Use JavaScript's built-in Map.
 * - Map keeps insertion order.
 * - Re-inserting an item moves it to the end (Most Recently Used).
 * - The first item in the Map is the Least Recently Used.
 */

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Stores key -> value in order
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        // Refresh: remove and re-insert to mark as recently used
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);

        return val;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        // If exists, delete to refresh position
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);

        // Evict if over capacity
        if (this.cache.size > this.capacity) {
            // Map.keys().next().value returns the first inserted key (LRU)
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
            console.log(`Checking capacity... Evicted key: ${lruKey}`);
        }
    }

    // Helper to visualize cache
    printState() {
        console.log("Current Cache:", [...this.cache.entries()]);
    }
}

// ==========================================
// TEST CASES
// ==========================================

console.log("--- LRU Cache Test ---");

const lru = new LRUCache(2); // Capacity 2

console.log("Put 1, 1");
lru.put(1, 1);

console.log("Put 2, 2");
lru.put(2, 2);
lru.printState(); // [ [1,1], [2,2] ]

console.log("\nGet 1 (returns 1)");
console.log(`Value: ${lru.get(1)}`); // 1
// Cache is now: [ [2,2], [1,1] ] -> 1 is most recent
lru.printState();

console.log("\nPut 3, 3 (Evicts key 2)");
lru.put(3, 3); // 2 was least recently used
lru.printState(); // [ [1,1], [3,3] ]

console.log("\nGet 2 (returns -1)");
console.log(`Value: ${lru.get(2)}`); // -1 (Found to be missing)

console.log("\nPut 4, 4 (Evicts key 1)");
lru.put(4, 4); // 1 was least recently used
lru.printState(); // [ [3,3], [4,4] ]

console.log("\nGet 1 (returns -1)");
console.log(`Value: ${lru.get(1)}`); // -1

console.log("\nGet 3 (returns 3)");
console.log(`Value: ${lru.get(3)}`); // 3
lru.printState(); // [ [4,4], [3,3] ]
