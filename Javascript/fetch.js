/**
 * THE FETCH API - INTERVIEW PREPARATION GUIDE
 * -------------------------------------------
 * Fetch is the modern way to make asynchronous HTTP requests in JavaScript.
 * It returns a Promise.
 * 
 * ⚠️ NOTE: This code uses the Fetch API, which is standard in browsers.
 * If running in Node.js, you need Node v18+ or a polyfill like 'node-fetch'.
 */

// URL for testing (JSONPlaceholder - free fake API)
const GET_URL = "https://jsonplaceholder.typicode.com/posts/1";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

// ==========================================
// 1. BASIC GET REQUEST (Async/Await)
// ==========================================

async function basicFetch() {
  console.log("--- 1. Basic Fetch ---");
  try {
    const response = await fetch(GET_URL);

    // 💡 IMPORTANT INTERVIEW CHECK:
    // Fetch ONLY rejects on network failure. 
    // It does NOT reject on 404/500 errors. You MUST check .ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parsing JSON is also async!
    console.log("Title:", data.title);
  } catch (error) {
    console.error("Fetch Error:", error.message);
  }
}


// ==========================================
// 2. MAKING A POST REQUEST
// ==========================================

async function postData() {
  console.log("\n--- 2. POST Request ---");
  try {
    const response = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "My New Post",
        body: "This is the content.",
        userId: 1,
      }),
    });

    const result = await response.json();
    console.log("Created ID:", result.id);
  } catch (error) {
    console.error("Post Error:", error);
  }
}


// ==========================================
// 3. ADVANCED: CANCELLING REQUESTS (AbortController)
// ==========================================
// Question: How do you cancel a fetch request if the user navigates away?

async function cancellableFetch() {
  console.log("\n--- 3. AbortController ---");
  const controller = new AbortController();
  const signal = controller.signal;

  // Simulate user cancelling after 10ms
  setTimeout(() => {
    controller.abort();
    console.log("🛑 Request manually aborted!");
  }, 10);

  try {
    await fetch(GET_URL, { signal });
    console.log("This won't run if aborted.");
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log("Caught AbortError: Fetch operation was cancelled.");
    } else {
      console.error("Real Error:", err);
    }
  }
}


// ==========================================
// 4. MAIN RUNNER (Sequential Execution)
// ==========================================

// Helper to run examples sequentially so console logs don't mix
async function runAll() {
  await basicFetch();
  await postData();
  await cancellableFetch();
}

runAll();
