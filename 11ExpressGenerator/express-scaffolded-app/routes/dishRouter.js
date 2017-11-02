const express = require('express');
const bodyParser = require('body-parser');

const logger = require ('../logger');

const dishRouter = express.Router(); //It declares dishRouter as an express router
dishRouter.use(bodyParser.json());

dishRouter.route('/') 
/* get*/
.get((req, res, next) =>{
    res.end('Will send all the dishes to you!');
})
/* post - look up for some form data*/
.post((req, res, next) =>{
    logger.info("Route through dishRouter:::You sent:" + JSON.stringify(req.body, null,2));
    res.end('Route through dishRouter:::Will send all the dishes to you! '+ 
    'name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* put*/
.put((req, res, next) =>{
    res.statusCode=403;
    res.end('Route through dishRouter:::PUT Operation not supported on /dishes! ');
})
/* delete*/
.delete((req, res, next) =>{
    res.end('Route through dishRouter:::Deleting all the dishes! ');
});

dishRouter.route('/:dishId')
/* get - with a parameter*/
.get((req, res, next) =>{
    res.end('Route through dishRouter:::Will send the dish ' + req.params.dishId + ' to you!');
})
///* post - not allowed with parameters*/
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Route through dishRouter:::POST Operation not supported on dishes/'+ req.params.dishId );
})
/* put - update*/
.put((req, res, next) =>{
    res.end('Route through dishRouter:::Dish ' + req.params.dishId + ' will be updated to: ' +
    'name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* delete a dish*/
.delete((req, res, next) =>{
    res.end('Route through dishRouter:::Dish ' + req.params.dishId + '   will   be deleted');
});

module.exports = dishRouter;