export function runNarrowingDemo() {
    console.log("%c--- 5. NARROWING & TYPE GUARDS (MATURITY) ---", "color: #E91E63; font-weight: bold;");

    // ==========================================
    // 1. typeof (Primitives)
    // ==========================================
    // Best for: string, number, boolean, symbol
    function padLeft(padding: number | string, input: string) {
        if (typeof padding === "number") {
            return " ".repeat(padding) + input; // TS knows 'padding' is number here
        }
        return padding + input; // TS knows 'padding' must be string here
    }
    console.log("typeof Narrowing:", padLeft(4, "Hello"));


    // ==========================================
    // 2. instanceof (Classes)
    // ==========================================
    // Best for: Error handling, Date, DOM Elements, custom Classes
    class Dog { bark() { console.log("Woof!"); } }
    class Cat { meow() { console.log("Meow!"); } }

    function communicate(pet: Dog | Cat) {
        if (pet instanceof Dog) {
            pet.bark(); // TS narrows to Dog
        } else {
            pet.meow(); // TS narrows to Cat
        }
    }
    console.log("instanceof Narrowing:");
    communicate(new Dog());


    // ==========================================
    // 3. 'in' Operator (Properties)
    // ==========================================
    // Best for: Interfaces / Plain Objects (JSON) where classes don't exist
    type Admin = { privileges: string[] };
    type User = { email: string };

    function checkAuth(person: Admin | User) {
        if ("privileges" in person) {
            console.log("Admin Privileges:", person.privileges);
        } else {
            console.log("User Email:", person.email);
        }
    }
    checkAuth({ email: "test@example.com" });


    // ==========================================
    // 4. User-Defined Type Guards (The "Is" Syntax)
    // ==========================================
    // Best for: Complex logic checks
    interface Fish { swim: () => void; }
    interface Bird { fly: () => void; }

    // logic to determine if it IS a fish
    function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
    }

    const myPet: Fish | Bird = { swim: () => console.log("Glub glub") };

    if (isFish(myPet)) {
        myPet.swim();
    }


    // ==========================================
    // BONUS: Discriminated Unions (State Flags)
    // ==========================================
    // Best for: Redux Actions, Response States
    interface Success { status: "success"; data: string; }
    interface Failed { status: "error"; error: Error; }
    type Response = Success | Failed;

    function handleResponse(res: Response) {
        if (res.status === "success") {
            console.log("Data:", res.data);
        } else {
            console.log("Error:", res.error.message);
        }
    }
    handleResponse({ status: "success", data: "Payload" });

    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: When to use 'in' vs 'instanceof'?
     * A: Use 'instanceof' for Classes. Use 'in' for Interfaces/POJOs (data from API), 
     *    because interfaces disappear at runtime, but object keys remain.
     * 
     * Q2: What is the benefit of a User-Defined Type Guard?
     * A: It encapsulates messy runtime checks (like checking properties) into a reuseable 
     *    function that informs the TypeScript compiler about the type change.
     */
}
