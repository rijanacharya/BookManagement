// app.js

// Load the built-in 'http' module
const http = require('http');

// Create an HTTP server that responds with "Hello, World!" to all requests
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
});

// Listen on port 3000 and IP address 127.0.0.1
server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
