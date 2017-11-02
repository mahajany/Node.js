const express = require('express');
const bodyParser = require('body-parser');

const logger = require ('../logger');

const promotionsRouter = express.Router(); //It declares promotionsRouter as an express router
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/') 
/* get*/
.get((req, res, next) =>{
    res.end('Will send all the promotions. to you!');
})
/* post - look up for some form data*/
.post((req, res, next) =>{
    logger.info("Route through promotionsRouter:::You sent:" + JSON.stringify(req.body, null,2));
    res.end('Route through promotionsRouter:::Will send all the promotions. to you! '+ 
    'name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* put*/
.put((req, res, next) =>{
    res.end('Route through promotionsRouter:::PUT: Update it now for /promotions.! ');
})
/* delete*/
.delete((req, res, next) =>{
    res.end('Route through promotionsRouter:::Deleting all the promotions.! ');
});

promotionsRouter.route('/:promotionsId')
/* get - with a parameter*/
.get((req, res, next) =>{
    res.end('Route through promotionsRouter:::Will send the promotions ' + req.params.promotionsId + ' to you!');
})
///* post - not allowed with parameters*/
.post((req, res, next) =>{
    res.end('Route through promotionsRouter:::POST - Update this particular promotion supported on promotion:'+ req.params.promotionsId +
    ', name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* put - update*/
.put((req, res, next) =>{
    res.end('Route through promotionsRouter:::promotions ' + req.params.promotionsId + ' will be updated to: ' +
    'name:' + req.body.name + ' ,details: ' + req.body.description);
})
/* delete a promotions*/
.delete((req, res, next) =>{
    res.end('Route through promotionsRouter:::promotions ' + req.params.promotionsId + '   will   be deleted');
});

module.exports = promotionsRouter;