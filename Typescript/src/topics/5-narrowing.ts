export function runNarrowingDemo() {
    console.log("%c--- 5. TYPE NARROWING PATTERNS ---", "color: #E91E63; font-weight: bold;");

    // 1. Discriminated Unions (Tagged Unions) - THE standard pattern in TS
    interface Square { kind: "square"; size: number; }
    interface Circle { kind: "circle"; radius: number; }
    type Shape = Square | Circle;

    function getArea(s: Shape): number {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "circle": return Math.PI * s.radius ** 2;
            default:
                // Exhaustiveness Check: Ensures all cases are handled
                const _exhaustiveCheck: never = s;
                return _exhaustiveCheck;
        }
    }
    console.log("Area (Discriminated):", getArea({ kind: "square", size: 4 }));

    // 2. The 'in' operator check
    type Admin = { name: string; privileges: string[] };
    type Employee = { name: string; startDate: Date };
    type Person = Admin | Employee;

    function printInfo(p: Person) {
        if ("privileges" in p) {
            console.log("Admin Privileges:", p.privileges);
        } else {
            console.log("Employee Start Date:", p.startDate);
        }
    }
    printInfo({ name: "Alice", privileges: ["delete-users"] });

    // 3. User-Defined Type Predicates (isFish)
    // A function that returns a boolean AND narrows the type
    interface Fish { swim: () => void; }
    interface Bird { fly: () => void; }

    function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
    }

    const myPet: Fish | Bird = { swim: () => console.log("Swimming...") };

    if (isFish(myPet)) {
        myPet.swim(); // TS knows this is Fish here
    }

    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: What is a "Type Predicate"?
     * A: A function return type syntax "parameterName is Type" (e.g., pet is Fish).
     *    If the function returns true, TS narrows the variable to that type in the calling block.
     * 
     * Q2: Why use Discriminated Unions over 'instanceof'?
     * A: 'instanceof' only works for classes. Discriminated Unions work for Plain Old JS Objects 
     *    (POJOs), which is typical in network responses (JSON).
     */
}
