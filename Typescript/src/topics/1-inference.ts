export function runInferenceDemo() {
    console.log("%c--- 1. TYPE INFERENCE & BEST PRACTICES ---", "color: #4CAF50; font-weight: bold;");

    /*
     * INTERVIEW KNOWLEDGE:
     * TypeScript infers types in 2 ways:
     * 1. Best Common Type (when initializing from values)
     * 2. Contextual Typing (when inferring from function signatures)
     */

    // 1. Basic Inference (Best Common Type)
    let username = "CodeBuddy"; // inferred as 'string'
    let numbers = [1, 2, 3, null]; // inferred as '(number | null)[]'

    console.log(`Inferred String: '${username}'`);
    console.log("Inferred Array:", numbers);

    // 2. Contextual Typing (The "Smart" Inference)
    // TS knows 'mouseEvent' is a MouseEvent because of the 'click' event type.
    document.addEventListener("click", (mouseEvent) => {
        console.log(`Contextual Type Check: Button detected at ${mouseEvent.button}`);
        // We didn't need to write (mouseEvent: MouseEvent)
    });

    // 3. const assertion (Literal Inference)
    const config = {
        endpoint: "https://api.example.com",
        method: "GET"
    } as const;

    // Without 'as const', 'method' would be inferred as 'string'.
    // With 'as const', 'method' is inferred as literal type '"GET"'.
    // config.method = "POST"; // Error: Cannot assign to 'method' because it is read-only property.

    console.log("Const Assertion Config:", config);

    /*
     * INTERVIEW QUESTIONS:
     * 
     * Q1: When should you use explicit types vs inference?
     * A: Use inference for simple variables and initializations. Use explicit types 
     *    for function parameters, complex return types, and public API interfaces 
     *    documentation.
     * 
     * Q2: What is the benefit of 'as const'?
     * A: It locks primitives to their literal values and makes objects/arrays readonly, 
     *    which is crucial for Redux action types or precise union matching.
     */
}
