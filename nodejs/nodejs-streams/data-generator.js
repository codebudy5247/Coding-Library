const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'input-data.jsonl');
const TOTAL_RECORDS = 10000;

const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
const domains = ['example.com', 'test.co', 'dummy.org', 'mail.net'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRecord(id) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const age = getRandomInt(10, 80);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@${getRandomElement(domains)}`;

    return JSON.stringify({
        id,
        firstName,
        lastName,
        age,
        email,
        isDeleted: Math.random() < 0.1, // 10% chance of being marked deleted
        timestamp: new Date().toISOString()
    });
}

const stream = fs.createWriteStream(FILE_PATH);

console.log(`Generating ${TOTAL_RECORDS} records to ${FILE_PATH}...`);

let i = 0;
function write() {
    let ok = true;
    while (i < TOTAL_RECORDS && ok) {
        i++;
        const record = generateRecord(i);
        // Write record followed by newline
        if (i === TOTAL_RECORDS) {
            stream.write(record + '\n');
            stream.end();
            console.log('Generation complete.');
        } else {
            ok = stream.write(record + '\n');
        }
    }
    if (i < TOTAL_RECORDS) {
        stream.once('drain', write);
    }
}

write();
