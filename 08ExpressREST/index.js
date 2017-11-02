const express=require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json()); //Allows you to use json requess in body

//Handle /dishes REST API End point - just _ALL_ of them!!
// app.router('/dishes', (req, res, next) =>{ 
    /***** this was present in version 3.x - NOT needed in 4.x now******/
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });

/* get*/
app.get('/dishes', (req, res, next) =>{
    res.end('Will send all the dishes to you!');
});

/* post - look up for some form data*/
app.post('/dishes', (req, res, next) =>{
    console.log("You sent:" + JSON.stringify(req.body, null,2));
    res.end('Will send all the dishes to you! '+ 
    'name:' + req.body.name + ' ,details: ' + req.body.description);
});

/* put*/
app.put('/dishes', (req, res, next) =>{
    res.statusCode=403;
    res.end('PUT Operation not supported on /dishes! ');
});

/* delete*/
app.delete('/dishes', (req, res, next) =>{
    res.end('Deleting all the dishes! ');
});

/* get - with a parameter*/
app.get('/dishes/:dishId', (req, res, next) =>{
    res.end('Will send the dish ' + req.params.dishId + ' to you!');
});

///* post - not allowed with parameters*/
app.post('/dishes/:dishId', (req, res, next) =>{
    res.statusCode=403;
    res.end('POST Operation not supported on dishes/'+ req.params.dishId );
});

/* put - update*/
app.put('/dishes/:dishId', (req, res, next) =>{
    res.end('Dish ' + req.params.dishId + ' will be updated to: ' +
    'name:' + req.body.name + ' ,details: ' + req.body.description);
    
    
});

/* delete a dish*/
app.delete('/dishes/:dishId', (req, res, next) =>{
    res.end('Dish ' + req.params.dishId + '   will   be deleted');
});

app.use(express.static(__dirname+'/public')); //For static files

//If nothing else from above fits the bill, then control would fall down here - just send this page.
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