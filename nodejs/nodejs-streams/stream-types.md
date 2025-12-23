# Understanding NodeJS Stream Types

NodeJS streams are efficient ways to handle data. There are four fundamental stream types that serve different purposes.

## 1. Readable Streams
**Source of data.** You "read" from these.
*   **Examples**: `fs.createReadStream`, `req` (in http server), `process.stdin`.
*   **Modes**:
    *   **Flowing**: Data is pushed as soon as it's available (like a faucet turned on).
    *   **Paused**: You must manually call `.read()` to get data.

```javascript
const fs = require('fs');
const readable = fs.createReadStream('file.txt');

readable.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
});
```

## 2. Writable Streams
**Destination for data.** You "write" to these.
*   **Examples**: `fs.createWriteStream`, `res` (in http server), `process.stdout`.
*   **Key Concept**: `write()` returns `false` if the internal buffer is full (backpressure), signaling you should stop writing until the `drain` event fires.

```javascript
const fs = require('fs');
const writable = fs.createWriteStream('output.txt');

writable.write('Hello World\n');
writable.end('Finished.');
```

## 3. Duplex Streams
**Both Readable and Writable.** Implementing both interfaces.
*   **Examples**: TCS Sockets (`net.Socket`), Websockets.
*   **Behavior**: You can write data to it AND read data from it. The input and output can be independent.

```javascript
const { Duplex } = require('stream');

const myDuplex = new Duplex({
  read(size) {
    this.push('Data from stream');
    this.push(null); // No more data
  },
  write(chunk, encoding, callback) {
    console.log('Writing to stream:', chunk.toString());
    callback();
  }
});

myDuplex.write('Hello'); // Triggers write()
myDuplex.on('data', (chunk) => console.log(chunk.toString())); // Triggers read()
```

## 4. Transform Streams
**A special type of Duplex Stream where the output is related to the input.**
*   **Examples**: `zlib.createGzip`, `crypto.createCipher`.
*   **Purpose**: Modify data as it flows through (Compression, Encryption, Parsing).

```javascript
const { Transform } = require('stream');

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    // Transform chunk to uppercase and push it out
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
// Type in terminal, see it echoed in CAPS
```
