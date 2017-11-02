const express=require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3100;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json()); //Allows you to use json requess in body


app.route('/dishes')
    /* get*/
    .get((req, res, next) =>{
        res.end('Will send all the dishes to you!');
    })
    /* post - look up for some form data*/
    .post((req, res, next) =>{
        console.log("Version 4.x:You sent:" + JSON.stringify(req.body, null,2));
        res.end('Version 4.x:Will send all the dishes to you! '+ 
        'name:' + req.body.name + ' ,details: ' + req.body.description);
    })
    /* put*/
    .put((req, res, next) =>{
        res.statusCode=403;
        res.end('Version 4.x:PUT Operation not supported on /dishes! ');
    })
    /* delete*/
    .delete((req, res, next) =>{
        res.end('Version 4.x:Deleting all the dishes! ');
    });
    app.route('/dishes/:dishId')
    /* get - with a parameter*/
    .get((req, res, next) =>{
        res.end('Version 4.x:Will send the dish ' + req.params.dishId + ' to you!');
    })
    ///* post - not allowed with parameters*/
    .post((req, res, next) =>{
        res.statusCode=403;
        res.end('Version 4.x:POST Operation not supported on dishes/'+ req.params.dishId );
    })
    /* put - update*/
    .put((req, res, next) =>{
        res.end('Version 4.x:Dish ' + req.params.dishId + ' will be updated to: ' +
        'name:' + req.body.name + ' ,details: ' + req.body.description);
    })
    /* delete a dish*/
    .delete((req, res, next) =>{
        res.end('Version 4.x:Dish ' + req.params.dishId + '   will   be deleted');
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
    console.log(`Version 4.x:server running at http://${hostname}:${port}`);
})