export function runPitfallsDemo() {
    console.log("%c--- 6. TS PITFALLS & BEST PRACTICES ---", "color: #F44336; font-weight: bold;");

    // 1. Excess Property Check (The "Freshness" Glitch)
    interface Options {
        id: number;
        color?: string;
    }

    // Passing literal directly triggers check
    // const o1: Options = { id: 1, colour: "red" }; // Error: 'colour' does not exist (typo check)

    // Assigning to variable first BYPASSES check (Weak Type Detection requires at least one common property if strict, but if there's no overlap it errors. Adding 'id' makes overlap easier to reason about)
    const obj = { id: 1, colour: "red" };
    const o2: Options = obj; // No Error! Be careful.
    console.log("Freshness Pitfall (o2):", o2);


    // 2. Dangerous Assertions (as)
    // 'as' tells TS to shut up. It hides bugs.
    type User = { name: string };
    const json = "{}";
    const user = JSON.parse(json) as User; // LIAR!

    // Runtime Error: undefined is not a function (if we tried user.name.toUpperCase())
    console.log("Dangerous Assertion Result:", user.name); // undefined


    // 3. The 'void' function return quirk
    // A function typed to return void CAN return a value, it's just ignored.
    // This allows passing callbacks that return things to places that don't care.
    const callback: () => void = () => {
        return true; // Valid!
    };
    /* Why? e.g. Array.prototype.push returns number, 
       but forEach expects void. TS allows this compatibility. */
    console.log("Void function returned:", callback());

    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: Is 'as' matching safe?
     * A: No. It is a Type Assertion (casting). Only use it if you are 100% sure 
     *    (e.g., document.getElementById). Prefer Type Guards (narrowing) instead.
     * 
     * Q2: Difference between 'any' and 'unknown'?
     * A: 'any' allows you to do anything (unsafe). 'unknown' forces you to check 
     *    the type before using it (safe). Always prefer 'unknown' for dynamic inputs.
     */
}
