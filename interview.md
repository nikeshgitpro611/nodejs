1. What is the difference between `process.nextTick()`, `setImmediate()`, and `setTimeout()`?

# 2. Explain the Event Loop in Node.js with phases.

✅ Event Loop Phases

Timers Phase – handles setTimeout() and setInterval() callbacks.

Pending Callbacks – executes some deferred system callbacks.

Poll Phase – waits and retrieves new I/O events.

Check Phase – executes setImmediate() callbacks.

Close Callbacks – executes clean-up events like socket closures.

🚫Use Cases

Web servers handling multiple clients.

File operations without freezing the app.

Real-time apps like chat or gaming servers.

# 3. What are streams in Node.js? How are they different from buffers?

Streams are objects in Node.js that allow you to read or write data continuously, in chunks, rather than loading the entire dataset into memory at once. They are designed to handle large amounts of data efficiently, such as reading from a file, receiving network data, or processing data in real-time. Streams are particularly useful for tasks where data is too large to fit in memory or arrives incrementally.

Types of Streams
Node.js provides four main types of streams:

Readable: Used to read data (e.g., reading a file or HTTP request body). Examples: fs.createReadStream, HTTP request streams.
Writable: Used to write data (e.g., writing to a file or HTTP response). Examples: fs.createWriteStream, HTTP response streams.
Duplex: Streams that are both readable and writable (e.g., TCP sockets).
Transform: A type of duplex stream that can modify or transform data as it is read or written (e.g., zlib for compression).

| Aspect              | Streams                                                                      | Buffers                                                                      |
| ------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Purpose**         | Handle continuous data flow in chunks, ideal for large or streaming data.    | Store and manipulate fixed-size binary data in memory.                       |
| **Memory Usage**    | Memory-efficient; processes data in small chunks without loading everything. | Loads entire data into memory, which can be memory-intensive for large data. |
| **Data Processing** | Processes data incrementally, often asynchronously, using events.            | Processes data all at once, synchronously or asynchronously.                 |
| **Use Case**        | Reading/writing large files, network I/O, real-time data processing.         | Handling binary data, encoding/decoding, small data manipulation.            |
| **Type**            | Event-driven objects (Readable, Writable, Duplex, Transform).                | Raw binary data container (fixed-size byte array).                           |
| **Examples**        | `fs.createReadStream`, HTTP request/response, zlib streams.                  | `Buffer.from('text')`, reading file content into memory.                     |
| **Piping**          | Supports piping to chain streams (e.g., `readStream.pipe(writeStream)`).     | No piping; buffers are static and don’t inherently support streaming.        |
| **Backpressure**    | Handles backpressure to manage data flow between producer and consumer.      | No backpressure; entire buffer is processed at once.                         |

✅ Example – Reading a File Using a Readable Stream

```
const fs = require('fs');

// Create a readable stream from a file
const readableStream = fs.createReadStream('large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 1024 // bytes per chunk
});

readableStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

readableStream.on('end', () => {
    console.log('Finished reading file');
});

readableStream.on('error', (err) => {
    console.error('Error reading file:', err);
});
```

```
const fs = require('fs');

// Create a writable stream to a file
const writableStream = fs.createWriteStream('output.txt');

// Write some data to the file
writableStream.write('Hello, streaming!\n');
writableStream.write('Writing another line.\n');

// Close the stream
writableStream.end(() => {
    console.log('Finished writing to file');
});
```

```
Copy data from one to another..
const fs = require('fs');

// Create readable and writable streams
const readable = fs.createReadStream('large-file.txt');
const writable = fs.createWriteStream('copy-file.txt');

// Pipe data from readable stream to writable stream
readable.pipe(writable);

writable.on('finish', () => {
    console.log('File copied successfully!');
});

```

                |

4. How does Node.js handle child processes?

| Use Case                        | Example                                       |
| ------------------------------- | --------------------------------------------- |
| Running shell commands          | File management, system monitoring            |
| Parallel processing             | Performing heavy computations                 |
| Communication between processes | Managing tasks across multiple Node instances |
| Working with external tools     | Running Python scripts, image conversion      |
| Microservices architecture      | Splitting tasks into smaller processes        |

5. What is middleware in Express.js?

middleware refers to functions that have access to the request (req) and response (res) objects, and the next() function in the application’s request-response cycle. Middleware functions can perform tasks such as executing code, modifying requests and responses, ending the request-response cycle, or calling the next middleware in the stack.

✅ Types of Middleware

✅ Application-level middleware – Defined on the Express app using app.use() or app.METHOD().

✅ Router-level middleware – Defined on routers.

✅ Error-handling middleware – Handles errors specifically with four arguments: (err, req, res, next).

✅ Built-in middleware – Provided by Express like express.json(), express.static().

✅ Third-party middleware – Libraries like cors, body-parser, morgan, etc.

# What’s the difference between synchronous and asynchronous file system methods?

| Feature        | Synchronous (`readFileSync`)         | Asynchronous (`readFile`)                |
| -------------- | ------------------------------------ | ---------------------------------------- |
| Execution      | Blocks until operation completes     | Continues running other code             |
| Complexity     | Simple and linear                    | Requires callbacks or async              |
| Use case       | Scripts where blocking is acceptable | Servers or apps needing high concurrency |
| Error handling | `try...catch`                        | Callback error or `.catch()`             |
| Performance    | Slower under multiple operations     | More efficient for I/O-heavy tasks       |

# Explain clustering in Node.js.

Clustering in Node.js is a technique to improve the performance and scalability of applications by leveraging multiple CPU cores.

Node.js process typically uses only one CPU core.The `cluster` module allows you to create multiple worker processes that share the `same server port, enabling parallel processing` to handle more concurrent requests efficiently.

The cluster module enables a `master process` and spawn `multiple worker processes` These workers can handle incoming requests concurrently, distributing the load across multiple CPU cores.

`How Clustering Works`

**Master Process:** The main process that `creates and manages worker processes`. It doesn’t handle application logic but forks workers and monitors their health.

**Worker Processes:** Child processes that execute the `actual application code` (e.g., handling HTTP requests). Each worker runs in its own memory space and has its own event loop.

**Port Sharing:** The`master process listens on a port and distributes incoming connections to workers`using a round-robin scheduling algorithm (by default on most platforms).

**Inter-Process Communication (IPC):** The master and workers can communicate using message passing (via worker.send() and process.on('message')).

**Scalability:** By creating one worker per CPU core, you maximize CPU utilization, as each worker can process requests independently.

> Key Features of the `cluster` Module

Forking Workers: The cluster.fork() method creates a new worker process.

Load Balancing: The operating system (or Node.js on Windows) distributes incoming connections among workers.

Worker Management: The master can detect when workers exit (e.g., due to crashes) and restart them.

Zero-Downtime Restarts: Workers can be restarted individually without stopping the entire application.
Platform Support: Works on all major platforms, though load balancing behavior differs slightly (e.g., round-robin on Linux, handled by Node.js on Windows).

**When to Avoid Clustering**

`For I/O-bound tasks `(e.g., **file reading, database queries**), Node.js’s single-threaded model is often sufficient.

If your application is not CPU-intensive or doesn’t handle high concurrency, clustering may add unnecessary complexity.

For **microservices**, consider containerization (Docker, Kubernetes) instead of clustering within a single Node.js process.

```
const cluster = require('cluster');
const http = require('http');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  // Master process
  const numCPUs = os.cpus().length; // Number of CPU cores
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and restart
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code}, signal ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });

} else {
  // Worker process
  const app = express();

  app.get('/', (req, res) => {
    res.json({ message: `Hello from worker ${process.pid}` });
  });

  // Simulate a CPU-intensive task
  app.get('/compute', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e7; i++) sum += i; // Heavy computation
    res.json({ worker: process.pid, sum });
  });

  // Start server
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} listening on port 3000`);
  });
}
```

# What are environment variables and how do you manage them?

they are used to store configuration settings that **should not be hard-coded into the application**, such as:

**API keys**

Database connection strings

**Port numbers**

Environment-specific settings (development, testing, production)

// Accessing environment variables
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL ||

- Using .env files with the dotenv package. require('dotenv').config();

**This makes the app more secure, flexible, and easier to configure across different environments.**

# Explain CORS and how you would enable/disable it in Node.js.



🔵 Hard Level (Applied Concepts + Performance)

# Explain back pressure in streams. How do you handle it?

What are worker threads in Node.js? When should you use them over clustering?

Explain the difference between CommonJS and ES Modules in Node.js.

How do you optimize a Node.js application for high performance?

How does Node.js manage memory? What are memory leaks, and how do you detect them?

Explain JWT authentication and how you would implement it in a Node.js app.

What’s the difference between Redis and in-memory caching in Node.js?

How do you handle graceful shutdown of a Node.js application?

Can you explain what libuv is and its role in Node.js?

🟣 Advanced Level (System Design + Internals)

How would you design a real-time chat system in Node.js?

Explain how Node.js handles DNS lookups internally.

What is the difference between horizontal scaling and vertical scaling in Node.js?

Explain the difference between load balancing and clustering in Node.js.

How does V8 compile and execute JavaScript code under the hood?

Explain zero-downtime deployments in Node.js.

How would you handle millions of requests per second in Node.js?

What are async hooks in Node.js? Provide a use case.

Explain Node.js garbage collection and how to optimize it.

How would you debug a memory leak or performance bottleneck in a production Node.js app?

🔴 Super Advanced Level (Deep Internals + Edge Cases)

How does Node.js handle async I/O under the hood with libuv’s thread pool?

Explain the difference between event delegation in JavaScript vs. Node.js event emitters.

How would you implement your own custom event loop in Node.js?

How does Node.js handle HTTP/2 compared to HTTP/1.1?

What is the difference between native addons in C++ and normal Node.js modules?

Explain the difference between microtasks and macrotasks in Node.js with actual scheduling order.

How does Node.js handle TLS/SSL internally?

What are the trade-offs between using worker threads and message queues (e.g., RabbitMQ, Kafka) in Node.js for distributed systems?

How would you implement backpressure handling across microservices in Node.js?

Can you walk through how Node.js internally handles await / async (Promises + microtask queue)?
