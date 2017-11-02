const express=require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require ('./logger');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leadersRouter = require('./routes/leadersRouter');

const HOSTNAME = 'localhost';
const PORT = 3000;

const app = express();

/* Morgan settings...*/
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.get('/', function (req, res) {
    logger.debug('Debug statement');
    logger.info('Info statement');
    res.send('Hello World!');
});
/**/
app.use(bodyParser.json()); //Allows you to use json requess in body

app.use('/dishes', dishRouter);  //All requests for /dishes will go to dishRouter.
app.use('/promotions', promoRouter);
app.use('/leaders', leadersRouter);

app.use(express.static(__dirname+'/public')); //For static files

//If nothing else from above fits the bill, then control would fall down here - just send this page.
app.use((req, res, next)=>{
    logger.error('404 page requested');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    //res.status(404).send('This page does not exist!');    
    res.end('<html><body><h1>Express Server - Bingo with Middleware!</h1>'
            + '<br />'
            + ' Showing up here because a route / static file '
            + ' in the public folder didn\'t meet the URL\'s resource path.'
            + ' Now notice that you need to restart service if this text is changed.</body></html>');
});

const server = http.createServer(app);
server.listen(PORT, HOSTNAME, ()=>{
    logger.info('server running at http://' + HOSTNAME +':' + PORT);
})