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

4. How does Node.js handle child processes?

5. What is middleware in Express.js?

6. How do you handle errors in asynchronous code?

7. What’s the difference between synchronous and asynchronous file system methods?

8. Explain clustering in Node.js.

9. What are environment variables and how do you manage them?

10. Explain CORS and how you would enable/disable it in Node.js.
