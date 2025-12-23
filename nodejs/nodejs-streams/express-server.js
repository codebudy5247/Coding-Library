const express = require('express');
const fs = require('fs');
const { INPUT_FILE } = require('./constants');

const app = express();
const PORT = 3000;

/**
 * Real World Example 2: Express File Streaming Server
 */

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1>Express Stream Server</h1>
        <p>Download the large dataset efficiently:</p>
        <a href="/stream">Download input-data.jsonl (Streamed)</a>
    `);
});

// Stream Route
app.get('/stream', (req, res) => {
    // Check if file exists
    if (!fs.existsSync(INPUT_FILE)) {
        return res.status(404).send('File not found. Run "npm run generate" first.');
    }

    const stat = fs.statSync(INPUT_FILE);

    // Set Headers
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="large-data.json"');

    // Create Stream and Pipe to Response
    const readStream = fs.createReadStream(INPUT_FILE);

    // Pipe the data to the response object (which is a Writable stream)
    readStream.pipe(res);

    // Error handling
    readStream.on('error', (err) => {
        console.error('Stream error:', err);
        res.end();
    });

    console.log('Streaming file to client via Express...');
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
