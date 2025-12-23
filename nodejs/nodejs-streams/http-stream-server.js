const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const { INPUT_FILE } = require('./constants');

/**
 * Real World Example 2: HTTP File Streaming Server
 * 
 * Scenario: You have a 10GB log file you want to let a user download.
 * BAD WAY: fs.readFileSync(file) -> res.send(data). This loads 10GB into RAM. Server crashes.
 * GOOD WAY: fs.createReadStream(file).pipe(res). This reads chunk by chunk and sends it. RAM usage is minimal.
 */

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>NodeJS Stream Server</h1>
            <p>Download the large dataset efficiently:</p>
            <a href="/stream">Download input-data.jsonl (Streamed)</a>
        `);
    }
    else if (req.url === '/stream') {
        // Check if file exists first
        if (!fs.existsSync(INPUT_FILE)) {
            res.writeHead(404);
            res.end('File not found. Run "npm run generate" first.');
            return;
        }

        const stat = fs.statSync(INPUT_FILE);

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': stat.size,
            'Content-Disposition': 'attachment; filename="large-data.json"'
        });

        // The Magic Line: Pipe the read stream (file) directly to the write stream (response)
        // This handles backpressure automatically. If the client is on slow 2G, 
        // the file stream will pause reading until the client is ready for more.
        const readStream = fs.createReadStream(INPUT_FILE);

        readStream.pipe(res);

        readStream.on('error', (err) => {
            console.error('Stream error:', err);
            res.end(); // End response if stream fails
        });

        console.log('Streaming file to client...');
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
