const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  // Construct the file path from the public directory and requested URL
  const filePath = path.join(PUBLIC_DIR, req.url);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Return a 404 response if the file doesn't exist
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }

    // Read the file and return it in the response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Return a 500 response if there's an error reading the file
        res.statusCode = 500;
        res.end('500 Internal Server Error');
        return;
      }

      // Set the content type based on the file extension
      let contentType;
      if (filePath.endsWith('.html')) {
        contentType = 'text/html';
      } else if (filePath.endsWith('.css')) {
        contentType = 'text/css';
      } else if (filePath.endsWith('.js')) {
        contentType = 'text/javascript';
      } else {
        contentType = 'application/octet-stream';
      }

      // Set the response headers and write the file data to the response
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
