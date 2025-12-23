const fs = require('fs');
const path = require('path');

// 1. Data Generator
const { INPUT_FILE } = require('./constants');
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

const stream = fs.createWriteStream(INPUT_FILE);

console.log(`Generating ${TOTAL_RECORDS} records to ${INPUT_FILE}...`);

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
