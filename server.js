const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
 
  const filePath = path.join(PUBLIC_DIR, req.url);


  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
     
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }

    
    fs.readFile(filePath, (err, data) => {
      if (err) {
       
        res.statusCode = 500;
        res.end('500 Internal Server Error');
        return;
      }

     
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

     
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
