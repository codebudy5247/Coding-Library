class TaskQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    x;

    while (this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.isProcessing = false;
  }

  addTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.processQueue();
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

// Example usage
(async () => {
  const queue = new TaskQueue();

  await queue.addTask(exampleTask1("Alice"));
  await queue.addTask(exampleTask2("Bob"));
  await queue.addTask(exampleTask1("Charlie"));

  console.log("All tasks are complete!");
})();
