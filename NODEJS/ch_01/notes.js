// const fs = require('fs');

//  This adds new content without deleting existing data.
fs.appendFile('example.txt', '\nNew line added!', (err) => {
    if (err) console.error(err);
    else console.log('Content appended!');
});

//  This creates (or overwrites) example.txt with new content.
// If you use fs.writeFileSync() or fs.writeFile(), it overwrites the file completely by default.
fs.writeFile('example.txt', 'Hello, Node.js!', (err) => {
    if (err) console.error(err);
    else console.log('File written successfully!');
});

//  the program waits for fs.readFileSync() to finish before moving forward.
const data = fs.readFileSync('example.txt', 'utf8'); // Synchronous (Blocking)
console.log(data);
console.log("This runs after reading the file"); 


// fs.readFile() starts reading the file, but does not wait for it to finish.Instead, the program continues running other code.
// The callback function ((err, data) => {}) runs later, when reading is done.
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
console.log("This runs before the file is read!"); 



// Whenever you see Sync in a method (fs.readFileSync(), fs.writeFileSync()), it means the function is synchronous (blocking)—it stops execution until the task is done. and If it does not have Sync, it is asynchronous (non-blocking).

// ✅ fs.readFileSync() → Reads the file in a blocking way.
// ✅ fs.writeFileSync() → Writes to the file in a blocking way.

