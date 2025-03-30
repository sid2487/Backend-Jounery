const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

// Explanation:
// http.createServer() creates a server that listens for requests.

// req represents the incoming request from a client.

// res.writeHead(200, { "Content-Type": "text/plain" }) sets the status code(200 means OK) and response type.

// res.end("Hello, World!"); sends the response back to the client.

// server.listen(3000, ...) starts the server on port 3000.

