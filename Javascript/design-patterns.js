/**
 * JAVASCRIPT DESIGN PATTERNS - INTERVIEW PREPARATION
 * --------------------------------------------------
 * Proven solutions to common software design problems.
 * These patterns demonstrate engineering maturity.
 */

// ==========================================
// 1. MODULE PATTERN
// ==========================================
// Purpose: Encapsulation. Keeps variables private using Closures/IIFE.

console.log("--- 1. Module Pattern ---");

const BankAccount = (function () {
    let balance = 0; // Private variable

    return {
        deposit: function (amount) {
            balance += amount;
            console.log(`Deposited: ${amount}`);
        },
        getBalance: function () {
            return balance;
        }
    };
})();

BankAccount.deposit(100);
console.log(`Balance: ${BankAccount.getBalance()}`);
// console.log(BankAccount.balance); // undefined (Private)


// ==========================================
// 2. SINGLETON PATTERN
// ==========================================
// Purpose: Ensure a class has only ONE instance.

console.log("\n--- 2. Singleton Pattern ---");

class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        this.connectionId = Math.random();
        DatabaseConnection.instance = this;
    }
}

const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log(`DB1 ID: ${db1.connectionId}`);
console.log(`DB2 ID: ${db2.connectionId}`);
console.log(`Is same instance? ${db1 === db2}`);


// ==========================================
// 3. FACTORY PATTERN
// ==========================================
// Purpose: Centralize object creation logic.

console.log("\n--- 3. Factory Pattern ---");

class Car {
    constructor(model) {
        this.type = "Car";
        this.model = model;
    }
}

class Truck {
    constructor(model) {
        this.type = "Truck";
        this.model = model;
    }
}

class VehicleFactory {
    createVehicle(type, model) {
        if (type === "car") return new Car(model);
        if (type === "truck") return new Truck(model);
    }
}

const factory = new VehicleFactory();
const myCar = factory.createVehicle("car", "Civic");
console.log(`Created: ${myCar.type} - ${myCar.model}`);


// ==========================================
// 4. OBSERVER PATTERN (Pub/Sub)
// ==========================================
// Purpose: One-to-many dependency. When one object changes, others are notified.

console.log("\n--- 4. Observer Pattern ---");

class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const youTubeChannel = new Subject();

// Subscribers
const user1 = (video) => console.log(`User 1 notified: New video '${video}'`);
const user2 = (video) => console.log(`User 2 notified: New video '${video}'`);

youTubeChannel.subscribe(user1);
youTubeChannel.subscribe(user2);

youTubeChannel.notify("Design Patterns Guide");


// ==========================================
// 5. STRATEGY PATTERN
// ==========================================
// Purpose: Interchangeable algorithms (families of algorithms).

console.log("\n--- 5. Strategy Pattern ---");

// Strategies
const payPalStrategy = amount => console.log(`Paid ${amount} via PayPal`);
const cardStrategy = amount => console.log(`Paid ${amount} via Credit Card`);

class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }

    execute(amount) {
        this.strategy(amount);
    }
}

const purchase1 = new PaymentProcessor(payPalStrategy);
purchase1.execute(100);

const purchase2 = new PaymentProcessor(cardStrategy);
purchase2.execute(200);


// ==========================================
// 6. MIDDLEWARE PATTERN (Chain of Responsibility)
// ==========================================
// Purpose: Process data in stages (pipeline). Common in Express/Redux.

console.log("\n--- 6. Middleware Pattern ---");

class MiddlewarePipeline {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
    }

    execute(data) {
        return this.middlewares.reduce((prevData, fn) => fn(prevData), data);
    }
}

const pipeline = new MiddlewarePipeline();

// Add middleware stages
pipeline.use((str) => str.trim());
pipeline.use((str) => str.toUpperCase());
pipeline.use((str) => `[LOG]: ${str}`);

const result = pipeline.execute("   hello world   ");
console.log(result);


// ==========================================
// 7. DEPENDENCY INJECTION (Manual)
// ==========================================
// Purpose: Passing dependencies (services) to a function/class instead of importing them.
// Makes code testable (easy to mock).

console.log("\n--- 7. Dependency Injection ---");

class UserService {
    constructor(database) { // Injected here!
        this.db = database;
    }

    getUser(id) {
        return this.db.find(id);
    }
}

// Mock Database for testing
const mockDb = {
    find: (id) => ({ id, name: "Test User" }) // Fake response
};

const userService = new UserService(mockDb);
console.log(userService.getUser(99));
