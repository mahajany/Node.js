var express = require('express');
const bodyParser = require('body-parser');
var User = require('./models/user');

var router = express.Router();
router.user(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next){
  Uesr.findOne({username: req.body.username})
    .then((user)=>{
      if(user != null){
        var err = new Error ('user ' + req.body.username + ' alredy exists.');
        err.status = 403;
        next(err);
      } else {
        return User.create({
          username: req.body.user,
          password: req.body.password});
      }
    })
    .then((user)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({staus:'Registration Successful!', 
          user: user})
    }, (err) => next(err))
    .catch((err)=> next(er));
    
});

module.exports = router;
