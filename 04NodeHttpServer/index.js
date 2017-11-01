const http = require('http');
const hostname = 'localhost';
const port=3000;

const server = http.createServer((req, res) =>{
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    //res.end("Hello world");
    res.end('<html><body><h1>Hello, O http-node world!');
    });

    server.listen(port, hostname, ()=>{
        console.log(`Server runnnnnnning at http://${hostname}:${port} started`)
    })