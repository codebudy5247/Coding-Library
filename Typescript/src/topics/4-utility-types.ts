export function runUtilityTypesDemo() {
    console.log("%c--- 4. UTILITY TYPES (MUST KNOW) ---", "color: #FF9800; font-weight: bold;");

    // DATA MODEL
    interface Todo {
        title: string;
        description: string;
        completed?: boolean; // Optional property
    }

    // ==========================================
    // 1. OBJECT TRANSFORMATIONS
    // ==========================================

    // A. Partial<T> (Makes everything optional)
    // Internal: { [P in keyof T]?: T[P] }
    const partialTodo: Partial<Todo> = { title: "Just a title" };

    // B. Required<T> (Makes everything required)
    // Internal: { [P in keyof T]-?: T[P] } (-? removes optionality)
    const requiredTodo: Required<Todo> = {
        title: "Title",
        description: "Desc",
        completed: false // Must be present now!
    };

    // C. Readonly<T> (Makes everything readonly)
    // Internal: { readonly [P in keyof T]: T[P] }
    const readonlyTodo: Readonly<Todo> = { title: "Read", description: "Only" };
    // readonlyTodo.title = "Edit"; // Error: Cannot assign to 'title' because it is a read-only property.

    // D. Record<K, V> (Creates map of Key -> Value)
    // Internal: { [P in K]: V }
    const pageConfig: Record<string, number> = {
        "home": 100,
        "about": 200
    };

    // Usage to satisfy compiler
    console.log("Transformations:", { partialTodo, requiredTodo, pageConfig, readonlyTodo });


    // ==========================================
    // 2. KEY FILTERING
    // ==========================================

    // E. Pick<T, K> (Select subset of keys)
    // Internal: { [P in K]: T[P] }
    const picked: Pick<Todo, "title" | "completed"> = {
        title: "Picked",
        completed: true
    };

    // F. Omit<T, K> (Remove subset of keys)
    // Internal: Pick<T, Exclude<keyof T, K>>
    const omitted: Omit<Todo, "description"> = {
        title: "Omitted",
        completed: false
    };

    console.log("Filters:", { picked, omitted });


    // ==========================================
    // 3. FUNCTION HELPERS
    // ==========================================

    function createUser(name: string, age: number) {
        return { name, age, id: Date.now() };
    }

    // G. ReturnType<T> (Extract return type)
    // Internal: T extends (...args: any) => infer R ? R : any
    type UserObj = ReturnType<typeof createUser>;

    // H. Parameters<T> (Extract args as Tuple)
    // Internal: T extends (...args: infer P) => any ? P : never
    type UserParams = Parameters<typeof createUser>;

    // Usage to satisfy compiler
    const _u: UserObj = { name: "Test", age: 10, id: 1 };
    const _p: UserParams = ["Test", 10];
    console.log("Function Helpers:", { _u, _p });


    // ==========================================
    // 💡 INTERVIEW TRICK: IMPLEMENTATION DEEP DIVE
    // ==========================================
    console.log("%c--- DEEP DIVE: HOW PARTIAL WORKS ---", "color: #9C27B0; font-style: italic;");

    /**
     * Q: How does Partial<T> work internally?
     * A: It uses a Mapped Type with the '?' modifier.
     */

    type MyPartial<T> = {
        [P in keyof T]?: T[P];
    };
    /*
     * Breakdown:
     * 1. keyof T  -> Gets union of keys ("title" | "description" | "completed")
     * 2. [P in K] -> Loops over each key.
     * 3. ?        -> Adds assignment optionality.
     * 4. T[P]     -> Keeps the original type.
     */

    type MyRequired<T> = {
        [P in keyof T]-?: T[P]; // '-?' REMOVES the optional modifier
    };

    const demo: MyPartial<Todo> = { title: "Custom Partial" };
    // Dummy usage
    const _req: MyRequired<{ a?: string }> = { a: "Now Required" };

    console.log("Custom Implementation:", { demo, _req });
}
