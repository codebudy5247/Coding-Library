export function runInterfacesDemo() {
    console.log("%c--- 2. INTERFACES VS TYPES ---", "color: #2196F3; font-weight: bold;");

    /*
     * 📌 ANSWER:
     * - Use INTERFACE for: Object shapes & Public APIs (libraries).
     * - Use TYPE for: Unions, Tuples, Primitives & Utility compositions.
     * 
     * COMPARISON MATRIX:
     * ---------------------------------------------
     * Aspect              | Interface | Type
     * ---------------------------------------------
     * Declaration Merging | ✅ Yes     | ❌ No
     * Extending           | extends   | & (intersection)
     * Primitives          | ❌ No      | ✅ Yes
     * Public Libraries    | ✅ Best    | ⚠️ Avoid
     * ---------------------------------------------
     */

    // 1. Declaration Merging (✅ Interface ONLY)
    // Critical for libraries (adding props to Window, Express Request, etc.)
    interface Settings {
        theme: string;
    }
    interface Settings {
        apiKey: string;
    }
    // Merged: { theme: string; apiKey: string; }
    const config: Settings = { theme: "Dark", apiKey: "123-xyz" };
    console.log("Merged Interface:", config);


    // 2. Extending (Inheritance vs Intersection)

    // Interface Way (OOP style)
    interface Animal { name: string; }
    interface Dog extends Animal { bark(): void; }

    // Type Way (Functional composition)
    type Vehicle = { speed: number; };
    type Car = Vehicle & { brand: string; }; // & Intersection

    const myCar: Car = { speed: 100, brand: "Tesla" };

    // Usage of Dog
    const myDog: Dog = { name: "Buddy", bark: () => console.log("Woof") };
    console.log("Extending:", { myCar, myDog });


    // 3. Primitives & Tuples (✅ Type ONLY)
    type ID = string | number; // Union (Interface cannot do this)
    type Point = [x: number, y: number]; // Tuple

    const id: ID = "User-1";
    const pt: Point = [10, 20];

    console.log("Type Primitive/Union:", { id, pt });


    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: Why use Interfaces for libraries?
     * A: Because consumers of your library can extend them via Declaration Merging.
     *    Types are closed. If you export a Type, users cannot add properties to it.
     * 
     * Q2: Can a Class implement a Type?
     * A: Yes, as long as the Type represents an object shape.
     *    class User implements { name: string } (Works!)
     *    class ID implements (string | number) (Fails!)
     */
}
