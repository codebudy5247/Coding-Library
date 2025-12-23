const path = require('path');

const INPUT_FILE = path.join(__dirname, 'input-data.jsonl');
const OUTPUT_FILE = path.join(__dirname, 'output-data.jsonl.gz');

module.exports = {
    INPUT_FILE,
    OUTPUT_FILE
};
