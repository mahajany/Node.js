const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const logger = require ('../others/logger');

const dishRouter = express.Router(); //It declares dishRouter as an express router
dishRouter.use(bodyParser.json());

dishRouter.route('/') 
/* get*/
.get((req, res, next) =>{
    Dishes.find({})
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
/* post - look up for some form data*/
.post((req, res, next) =>{
    Dishes.create(req.body)
    .then((dish)=> {
        logger.info("Added new dish:" + dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
/* put*/
.put((req, res, next) =>{
    res.statusCode=403;
    res.end('Put Operation is NOT supported supported on /dishes! ');
})
/* delete*/
.delete((req, res, next) =>{
    Dishes.remove({})
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=>{next(err)} )
    .catch((err)=>{next(err)});
})

dishRouter.route('/:dishId')
/* get - with a parameter*/
.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.status=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
///* post - not allowed with parameters*/
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('POST Operation not supported on dishes/'+ req.params.dishId );
})
/* put - update*/
.put((req, res, next) =>{
    Dishes.findByIdAndUpdate(req.params.dishId, 
                            {$set: req.body},
                            {new:true})
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    },(err)=> next(err))
    .catch((err)=>next(err))
})
/* delete a dish*/
.delete((req, res, next) =>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        logger.info("Deleted dish:"+ resp);
        res.status=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (er)=> next(er))
    .catch((whatTheHellError) => next(whatTheHellError));
});

module.exports = dishRouter;