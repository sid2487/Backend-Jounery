const fs = require("fs") // Get the file system tools

// File we'll work with
const filePath = "./notes.txt";

// 1. Write a note (creates the file if it doesn't exist)
fs.writeFileSync(filePath, "First note: Buy milk\n");
console.log("Wrote the first note");

// 2. Read the note
let content = fs.readFileSync(filePath, "utf8"); // utf8 makes it readable text
console.log("Reading the file");
console.log(content);

// 3. Update the note by adding more (fs.writeFileSync overwrites the file again, but since we included the old content, it keeps the first note and adds the second.)
fs.writeFileSync(filePath, content + "Second note: Call mom\n");
console.log("Updated the file with a second note");

// 4. Read it again to see the update
content = fs.readFileSync(filePath, "utf-8");
console.log("Reading the updated file:");
console.log(content);






