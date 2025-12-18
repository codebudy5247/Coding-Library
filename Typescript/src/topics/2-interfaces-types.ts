export function runInterfacesDemo() {
    console.log("%c--- 2. INTERFACES VS TYPES ---", "color: #2196F3; font-weight: bold;");

    /*
     * INTERVIEW KNOWLEDGE:
     * - Interfaces: Better for defining object shapes and easier to extend (merging).
     * - Types: Better for Union types, Intersections, and Primitives.
     */

    // 1. Declaration Merging (Interface Exclusive Feature)
    interface Window {
        customProperty?: string;
    }
    interface Window {
        anotherProperty?: number;
    }
    // Merged Result: { customProperty?: string; anotherProperty?: number; }

    const w: Window = { customProperty: "Hello", anotherProperty: 42 };
    console.log("Merged Interface:", w);


    // 2. Implements with Classes
    interface Runnable {
        run(): void;
    }

    class Task implements Runnable {
        run() {
            console.log("Task is running...");
        }
    }
    new Task().run();

    // 3. Intersection Types (Type Exclusive Power)
    type ID = { id: string };
    type Timestamp = { createdAt: Date };
    type LogEntry = ID & Timestamp & { message: string }; // 3-way intersection

    const log: LogEntry = {
        id: "abc-123",
        createdAt: new Date(),
        message: "System Start"
    };
    console.log("Complex Intersection:", log);

    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: Can a Type implement a Class?
     * A: No, but a Class can implement a Type (or Interface).
     * 
     * Q2: Can types merge like interfaces?
     * A: No. Two types with the same name throw a "Duplicate identifier" error.
     *    This makes Interfaces preferable for libraries (users can add properties).
     */
}
