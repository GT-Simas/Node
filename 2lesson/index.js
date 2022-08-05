const http = require('http');
const { hostname } = require('os');
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('content-Type', "text/plain");
    res.end("hello world");
});

server.listen(port, hostname, () => {
    console.log(`serveris paleistas http://${hostname}:${port}/`)
});