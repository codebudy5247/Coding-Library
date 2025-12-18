/**
 * CONCURRENCY LIMITER (TASK SCHEDULER) - INTERVIEW QUESTION
 * ---------------------------------------------------------
 * Problem: Design a scheduler that limits the number of parallel async tasks.
 * Example: "Allow max 2 downloads at the same time."
 */

class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.runningCount = 0;
        this.queue = []; // Array of Pending Tasks
    }

    /**
     * Adds a task to the scheduler.
     * @param {Function} taskFn - A function that returns a Promise.
     */
    addTask(taskFn) {
        console.log(`[Queue] Task added.`);
        this.queue.push(taskFn);
        this.runNext();
    }

    runNext() {
        // Check if we can run more tasks
        if (this.runningCount < this.concurrency && this.queue.length > 0) {
            const taskFn = this.queue.shift(); // FIFO
            this.runningCount++;

            // Execute the task
            taskFn().finally(() => {
                this.runningCount--;
                this.runNext(); // Trigger next task after completion
            });
        }
    }
}

// ==========================================
// TEST CASES
// ==========================================

// Helper: Returns a promise that resolves after 'ms' milliseconds
const delay = (id, ms) => {
    return new Promise((resolve) => {
        console.log(`[Start] Task ${id} (Duration: ${ms}ms)`);
        setTimeout(() => {
            console.log(`[Done ] Task ${id}`);
            resolve();
        }, ms);
    });
};

console.log("--- Concurrency Test (Max 2 Parallel) ---");

const scheduler = new TaskScheduler(2); // Max 2 tasks at once

// Add 5 tasks
// Timelines:
// T1 (1000ms): 0s -> 1s
// T2 (500ms):  0s -> 0.5s -> T3 starts here
// T3 (300ms):  0.5s -> 0.8s -> T4 starts here
// T4 (400ms):  0.8s -> 1.2s
// T5 (100ms):  1s (After T1) -> 1.1s

scheduler.addTask(() => delay(1, 1000));
scheduler.addTask(() => delay(2, 500));
scheduler.addTask(() => delay(3, 300)); // Should wait for T2
scheduler.addTask(() => delay(4, 400)); // Should wait for T3
scheduler.addTask(() => delay(5, 100)); // Should wait for T1
