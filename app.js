// Load the http module to create an HTTP server
const http = require('http');

// Configure the HTTP server to respond with "Hello, World!" to all requests
const server = http.createServer((req, res) => {
  // Set the response HTTP headers with a 200 OK status and Content-Type text/plain
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body "Hello, World!"
  res.end('Hello, World!\n');
});

// The server listens on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
