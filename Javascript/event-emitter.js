/**
 * EVENT EMITTER - INTERVIEW IMPLEMENTATION
 * ----------------------------------------
 * A core pattern in Node.js and frontend libraries.
 * It allows decoupled communication between different parts of an application.
 */

class EventEmitter {
    constructor() {
        this.events = {}; // Map eventName -> [listeners]
    }

    /**
     * Subscribe to an event
     * @param {string} eventName 
     * @param {Function} listener 
     */
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
        return this; // Enable chaining
    }

    /**
     * Unsubscribe a specific listener
     * @param {string} eventName 
     * @param {Function} listenerToRemove 
     */
    off(eventName, listenerToRemove) {
        if (!this.events[eventName]) return this;

        // Filter out the listener to remove
        this.events[eventName] = this.events[eventName].filter(
            (listener) => listener !== listenerToRemove
        );
        return this;
    }

    /**
     * Trigger an event
     * @param {string} eventName 
     * @param  {...any} args - Arguments to pass to listeners
     */
    emit(eventName, ...args) {
        if (!this.events[eventName]) return false;

        this.events[eventName].forEach((listener) => {
            listener(...args); // Spread args to listener
        });
        return true;
    }

    /**
     * Subscribe once (auto-unsubscribe after first trigger)
     * @param {string} eventName 
     * @param {Function} listener 
     */
    once(eventName, listener) {
        // Wrapper function that calls listener then removes itself
        const onceWrapper = (...args) => {
            listener(...args);
            this.off(eventName, onceWrapper);
        };

        this.on(eventName, onceWrapper);
        return this;
    }
}

// ==========================================
// TEST CASES
// ==========================================

const myEmitter = new EventEmitter();

// 1. Basic Subscription
function responseToHello(name) {
    console.log(`Hello received! Name: ${name}`);
}

function logger(data) {
    console.log(`[Log]: ${data}`);
}

console.log("--- 1. Basic On/Emit ---");
myEmitter.on('hello', responseToHello);
myEmitter.on('hello', logger);

myEmitter.emit('hello', 'Alice');
// Expected: 
// Hello received! Name: Alice
// [Log]: Alice


// 2. Off (Unsubscribe)
console.log("\n--- 2. Off (Unsubscribe) ---");
myEmitter.off('hello', logger); // Remove logger
myEmitter.emit('hello', 'Bob');
// Expected: Only "Hello received! Name: Bob" (No log)


// 3. Once (Single Trigger)
console.log("\n--- 3. Once ---");
myEmitter.once('special', (msg) => console.log(`Special Event: ${msg}`));

myEmitter.emit('special', 'First Time'); // Should print
myEmitter.emit('special', 'Second Time'); // Should NOT print
