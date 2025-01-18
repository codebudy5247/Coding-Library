class TaskQueue {
  constructor() {
    this.queue = []; // Initialize an empty array to hold the tasks
    this.isProcessing = false; // Flag to indicate if the queue is currently being processed
  }

  async processQueue() {
    if (this.isProcessing) return; // If already processing, exit the function
    this.isProcessing = true; // Set the flag to indicate processing has started

    // Process all tasks currently in the queue
    for (const { task, resolve, reject } of this.queue) {
      try {
        const result = await task(); // Execute the task and wait for it to complete
        resolve(result); // Resolve the promise with the result of the task
      } catch (error) {
        reject(error); // Reject the promise if the task throws an error
      }
    }

    // Clear the queue after processing
    this.queue = []; // Reset the queue to an empty array
    this.isProcessing = false; // Reset the flag to indicate processing has finished
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject }); // Add the task and its associated promise handlers to the queue
      this.processQueue(); // Start processing the queue
    });
  }
}

// Example tasks
const exampleTask1 = (name) => async () => {
  console.log(`Starting task 1 for ${name}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Finished task 1 for ${name}`);
};

const exampleTask2 = (name) => async () => {
  console.log(`Starting task 2 for ${name}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Finished task 2 for ${name}`);
};

const exampleTaskWithError = (name) => async () => {
  console.log(`Starting task 3 for ${name}`);
  await new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error(`Task failed for ${name}`)), 1500)
  );
};

// Example usage
(async () => {
  const queue = new TaskQueue(); // Create a new instance of TaskQueue

  try {
    await queue.addTask(exampleTask1("Alice"));
  } catch (err) {
    console.error("Caught error for Alice:", err);
  }

  try {
    await queue.addTask(exampleTask2("Bob"));
  } catch (err) {
    console.error("Caught error for Bob:", err);
  }

  try {
    await queue.addTask(exampleTaskWithError("Charlie"));
  } catch (err) {
    console.error("Caught error for Charlie:", err);
  }

  console.log("All tasks are complete!");
})();
