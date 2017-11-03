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


//Routes for comments:
dishRouter.route('/:dishId/comments') 
/* get*/
.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish.comments);
        } else {
            err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
/* post - look up for some form data*/
.post((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
        dish.comments.push(req.body); //Body contains all the comments
        dish.save()
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        })
        } else {
            err = new Error('dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
/* put*/
.put((req, res, next) =>{
    res.statusCode=403;
    res.end('Put Operation is NOT supported supported on /dishes/comments! ');
})
/* delete*/
.delete((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
            for (var i=dish.comments.length-1; i>-0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
        })
        } else {
            err = new Error('Dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

dishRouter.route('/:dishId/comments/:commentId')
/* get*/
.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        } else if (dish == null) {
            err = new Error('Dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        } else  {   //Comment is null
            err = new Error('Comment ' + req.params.commentId + ' for Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
/* post*/
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Put Operation is NOT supported supported on /dishes/comments/commentsId! ');
})
/* put - look up for some form data*/
.put((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
            .then((dish) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentId));
            }, (err) => next(err));

        } else if (dish == null) {
            err = new Error('dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        } else  {   //Comment is null
            err = new Error('Comment ' + req.params.commentId + ' for dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
/* delete*/
.delete((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));     
        } else if (dish == null) {
            err = new Error('dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        } else  {   //Comment is null
            err = new Error('Comment ' + req.params.commentId + ' for dish' + req.params.dishId + ' not found!');
            err.status = 404;
            next(err);       //To be hanlded by 404 handler of app.js
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;