/**
 * RETRY LOGIC - INTERVIEW IMPLEMENTATION
 * --------------------------------------
 * Pattern: Automatically retrying a failed operation a defined number of times.
 * Critical for network resilience.
 */

/**
 * Retries a function that returns a promise.
 * @param {Function} attemptFn - Function to retry
 * @param {number} retries - Max number of retries
 * @param {number} delayMs - Delay in ms between attempts
 * @returns {Promise<any>}
 */
async function retry(attemptFn, retries = 3, delayMs = 1000) {
    try {
        return await attemptFn();
    } catch (err) {
        if (retries <= 0) {
            // No more retries left, bubble up the error
            console.log(`[Fail] Final attempt failed. Error: ${err}`);
            throw err;
        }

        console.log(`[Retry] Failed. Retrying in ${delayMs}ms... (${retries} left)`);

        // Wait for the delay
        await new Promise(res => setTimeout(res, delayMs));

        // Recursive call with decremented retry count
        return retry(attemptFn, retries - 1, delayMs);
    }
}


// ==========================================
// TEST CASES (Mocking an API)
// ==========================================

console.log("--- Retry Logic Tests ---");

// Helper to simulate an API that fails 'n' times before succeeding
function createUnstableApi(failuresBeforeSuccess) {
    let attempts = 0;
    return async () => {
        attempts++;
        console.log(`\n> Calling API (Attempt #${attempts})...`);

        if (attempts <= failuresBeforeSuccess) {
            throw "Network Error (503)";
        }
        return "Success: Data Loaded";
    };
}

// TEST 1: API fails 2 times, then succeeds.
// We allow 3 retries, so this SHOULD succeed.
(async () => {
    console.log("TEST 1: Transient Failure (Fails 2x, then OK)");
    const api1 = createUnstableApi(2);

    try {
        const result = await retry(api1, 3, 500); // 3 Retries, 500ms delay
        console.log(`RESULT: ${result}`);
    } catch (e) {
        console.log("TEST 1 FAILED UNEXPECTEDLY");
    }

    // TEST 2: API fails 5 times.
    // We allow 3 retries, so this SHOULD fail.
    // We wrap in another block to run sequentially
    setTimeout(async () => {
        console.log("\nTEST 2: Persistent Failure (Fails 5x)");
        const api2 = createUnstableApi(5);

        try {
            await retry(api2, 3, 200);
        } catch (e) {
            console.log(`RESULT: Caught Expected Error -> ${e}`);
        }
    }, 2500); // Wait enough time for Test 1 to finish

})();
