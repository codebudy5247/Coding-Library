const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { pipeline, Transform } = require("stream");
const crypto = require("crypto");

const INPUT_FILE = path.join(__dirname, "input-data.jsonl");
const OUTPUT_FILE = path.join(__dirname, "output-data.jsonl.gz");

// 1. Source: Read Stream
// In a real app, this could be downloading a large file from S3 or an HTTP request
const sourceStream = fs.createReadStream(INPUT_FILE, { encoding: "utf8" });

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

/**
 * A Transform stream that:
 * - Parses JSON
 * - Filters out 'deleted' records
 * - Anonymizes emails
 * - Stringifies back to JSON
 */
const dataProcessor = new Transform({
  objectMode: true, // We are processing objects, not string/buffer chunks directly from previous stream (LineSplitter emits strings, but we want to think in 'records')
  // Actually, LineSplitter emits strings. We iterate logic per object.

  transform(chunk, encoding, callback) {
    try {
      const line = chunk.toString();
      if (!line.trim()) {
        return callback(); // Skip empty lines
      }

      const record = JSON.parse(line);

      // Filter logic: Skip deleted records
      if (record.isDeleted) {
        return callback();
      }

      // Transformation logic: Anonymize email
      const hash = crypto.createHash("md5").update(record.email).digest("hex");
      record.email = `${hash}@anonymized.com`;

      // Enriched metadata
      record.processedAt = new Date().toISOString();

      // Push the transformed record followed by newline
      this.push(JSON.stringify(record) + "\n");
      callback();
    } catch (err) {
      // In a real app, you might log error to a separate error stream and continue
      console.error("Error processing line:", err.message);
      callback(); // Continue despite error
    }
  },
});

// 2. Processing Pipeline
console.log("Starting stream pipeline...");
console.time("Pipeline Duration");

pipeline(
  sourceStream,
  new LineSplitter(),
  dataProcessor,
  zlib.createGzip(), // Compression stream
  fs.createWriteStream(OUTPUT_FILE), // Sink: Write stream
  (err) => {
    console.timeEnd("Pipeline Duration");
    if (err) {
      console.error("Pipeline failed:", err);
    } else {
      console.log(
        "Pipeline succeeded. Data processed and compressed to",
        OUTPUT_FILE
      );

      // Print stats
      const inputStats = fs.statSync(INPUT_FILE);
      const outputStats = fs.statSync(OUTPUT_FILE);
      console.log(
        `Input Size: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`
      );
      console.log(
        `Output Size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`
      );
    }
  }
);
