const express = require('express');
const bodyParser = require('body-parser');

const logger = require ('../logger');

const leadersRouter = express.Router(); //It declares leadersRouter as an express router
leadersRouter.use(bodyParser.json());

leadersRouter.route('/') 
/* get*/
.get((req, res, next) =>{
    res.end('Will send all the leaderses to you!');
})
/* post - look up for some form data*/
.post((req, res, next) =>{
    logger.info("Route through leadersRouter:::You sent:" + JSON.stringify(req.body, null,2));
    res.end('Route through leadersRouter:::Will send all the leaderses to you! '+ 
    'name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* put*/
.put((req, res, next) =>{
    res.statusCode=403;
    res.end('Route through leadersRouter:::PUT Operation not supported on /leaderses! ');
})
/* delete*/
.delete((req, res, next) =>{
    res.end('Route through leadersRouter:::Deleting all the leaderses! ');
});

leadersRouter.route('/:leadersId')
/* get - with a parameter*/
.get((req, res, next) =>{
    res.end('Route through leadersRouter:::Will send the leaders ' + req.params.leadersId + ' to you!');
})
///* post - not allowed with parameters*/
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Route through leadersRouter:::POST Operation not supported on leaderses/'+ req.params.leadersId );
})
/* put - update*/
.put((req, res, next) =>{
    res.end('Route through leadersRouter:::leaders ' + req.params.leadersId + ' will be updated to: ' +
    'name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* delete a leaders*/
.delete((req, res, next) =>{
    res.end('Route through leadersRouter:::leaders ' + req.params.leadersId + '   will   be deleted');
});

module.exports = leadersRouter;