const { Transform } = require('stream');

/**
 * A Transform stream that buffers chunks and emits whole lines.
 * This is crucial because a chunk read from the file might end in the middle of a line/JSON.
 */
class LineSplitter extends Transform {
    constructor(options) {
        super(options);
        this.buffer = "";
    }

    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString();
        const lines = this.buffer.split("\n");

        // The last element is either an empty string (if the chunk ended with \n)
        // or a partial line that should be kept for the next chunk.
        this.buffer = lines.pop(); // Keep the incomplete line

        for (const line of lines) {
            this.push(line);
        }
        callback();
    }

    _flush(callback) {
        if (this.buffer) {
            this.push(this.buffer);
        }
        callback();
    }
}

module.exports = LineSplitter;
