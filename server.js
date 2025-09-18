const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

function serveStatic(req, res) {
    let fileName = '.' + url.parse(req.url).pathname;
    let ext = path.extname(fileName);

    fs.readFile(fileName, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found\n');
        } else if (ext === '.txt') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        } else if (ext === '.jpg') {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        }
    });
}

const myserver = http.createServer(serveStatic);
myserver.listen(80, function () {
    console.log("Listening on port 80");
});

