repo - https://github.com/StephenGrider/AdvancedNodeComplete

> # Module

- **crypto:** Used for secure operations like hashing (e.g., SHA-256 for passwords), encryption, and decryption.
- **fs:** Manages file system tasks, such as reading (fs.readFile) or writing (fs.writeFile) files, with both synchronous and asynchronous options. -**path:** Simplifies working with file paths, ensuring cross-platform compatibility (e.g., path.join() for directory paths).
- **os:** Offers system insights, like the number of CPU cores (os.cpus()), memory usage (os.freemem()), and platform type (os.platform()).
- **http:** Powers HTTP servers and clients, enabling request handling and responses (e.g., creating a basic server with http.createServer).

- **Note on os Module:** As mentioned, the os module doesn’t control threading. It provides data (e.g., os.cpus().length for CPU core count) that developers can use to make informed decisions about scaling, such as determining how many worker processes to fork in cluster mode.
  > # Threading Basics
  >
  > Node.js operates on a unique model, and the repo explains key components:
- **Thread:** A sequence of instructions executed by the CPU. In Node.js, the main thread handles JavaScript execution via the event loop.
- **V8:** Google’s JavaScript engine, which compiles and executes JavaScript, bridging it with C++ for performance.
- **libuv:** A C library that powers Node.js’s asynchronous I/O. It manages a thread pool (default: 4 threads) for blocking tasks and handles the event loop for non-blocking operations.

> # Why fs Uses a Thread Pool but http Does Not?

- fs (File System): File operations (e.g., fs.readFileSync) can be blocking, so libuv offloads them to its thread pool to prevent stalling the main thread. Asynchronous methods like fs.readFile use callbacks, promises, or async/await to return results once complete.
- http: Network requests are inherently asynchronous, managed by the operating system’s network stack and the event loop. No thread pool is needed, as libuv uses non-blocking I/O to handle HTTP operations efficiently.

# Q// Why Fs Using Threadpool but HTTP modal not using Thread Pool

- Ans - http directely run not invode in loop
  > # Cluster mode
- why using when multiple user req on url that time our application will little bit slow due to singal thred so for mitigate we are using Cluster menager its multiple thread and work kind of adminstrater
  on that cluster module called fork.(Cluster.fork()) if we are using fork node internally back to app.js file and menage every thing.
- Cluster mode is used to start up multiple copies of Node.js that are all running your server instances inside them.
- by starting up multiple copies,we get multiple instances of the event loop so it vaguely somewhat works in a similar fashion as making Node kind of multi-threaded.
- The cluster manager is responsible for monitoring the health of individual instances of our application that we're going to launch simultaneously on our computer.

# We can import node performance

- The repo outlines two key strategies:

1. **Use Cluster Mode**:

- Distributes incoming requests across multiple processes.
- Leverages all CPU cores, ideal for handling high traffic.

2. **Use Worker Threads:**

- Suited for CPU-intensive tasks (e.g., data processing, encryption).

```
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (msg) => console.log('Worker result:', msg));
} else {
  // Perform heavy computation in worker
  const result = /* some heavy computation */;
  parentPort.postMessage(result);
}
```

- **Explanation**: The main thread spawns a worker to handle heavy computation. The worker runs in parallel, sends the result back via parentPort.postMessage, and keeps the event loop free for other tasks.

> # is Nodejs Single thread language.

- Yes, Node.js is primarily single-threaded
- Node.js uses a single-threaded event loop model for handling requests and executing JavaScript code. This means that the core JavaScript execution in Node.js runs on a single thread, processing events (like HTTP requests, file I/O, etc.) asynchronously via an event-driven architecture.
- While the JavaScript execution is single-threaded, Node.js leverages libuv (one of its key dependencies) to offload I/O operations (e.g., file system access, network requests) to a thread pool. This allows Node.js to handle many tasks concurrently without blocking the main thread, making it efficient for I/O-heavy applications.
- We can make multiple thread by Since Node.js 10.5.0 (and stable in 12.x) the worker_threads module allows developers to run JavaScript in parallel on multiple threads for CPU-intensive tasks.
