const express=require('express');
const http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname+'/public')); //For static files

app.use((req, res, next)=>{

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Express Server - Bingo with Middleware!</h1>'
            + '<br />'
            + ' Showing up here because a route / static file '
            + ' in the public folder didn\'t meet the URL\'s resource path.'
            + ' Now notice that you need to restart service if this text is changed.</body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`);
})