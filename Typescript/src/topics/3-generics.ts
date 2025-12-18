export function runGenericsDemo() {
    console.log("%c--- 3. GENERICS DEEP DIVE ---", "color: #9C27B0; font-weight: bold;");

    // 1. Constraints with 'keyof' (Very Common Interview Task)
    // Goal: Get a property from an object safely.
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    const user = { name: "Alice", age: 30 };
    const age = getProperty(user, "age"); // Type is 'number'
    // const fail = getProperty(user, "email"); // Error: Argument "email" is not assignable to "name" | "age"

    console.log(`Generic keyof access: ${age}`);

    // 2. Generic Classes (Data Structures)
    class Box<T> {
        private content: T;

        constructor(value: T) {
            this.content = value;
        }

        get(): T {
            return this.content;
        }
    }

    const numberBox = new Box<number>(100);
    console.log("Generic Box Value:", numberBox.get());

    // 3. Default Generic Parameters
    interface APIResponse<Data = object> {
        status: number;
        data: Data; // Defaults to 'object' if not provided
    }

    const response: APIResponse<{ id: number }> = {
        status: 200,
        data: { id: 1 }
    };
    console.log("Generic with default:", response);

    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: What is the 'keyof' operator?
     * A: It takes an object type and produces a string union of its keys.
     *    keyof { a: 1, b: 2 } => "a" | "b"
     * 
     * Q2: Why use generics instead of 'any'?
     * A: Generics preserve type information. If function identity(arg: any) returns any,
     *    we lose knowledge of what the return type is. With <T>, we know input=output.
     */
}
