// Create web server
// Run with: node comments.js
// Then open in browser: http://localhost:3000
// To stop server: Ctrl+C

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/comments') {
        fs.readFile('comments.json', function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data);
            res.end();
        });
    } else if (req.url === '/new_comment' && req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var comment = JSON.parse(body);
            fs.readFile('comments.json', function (err, data) {
                var comments = JSON.parse(data);
                comments.push(comment);
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify(comments));
                    res.end();
                });
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Page not found');
        res.end();
    }
}).listen(3000);
console.log('Server running at http://localhost:3000/');