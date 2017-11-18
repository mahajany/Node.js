var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var passport=require('passport');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("GET for /users");
  res.send('respond with a resource '+ JSON.stringify(User));
});

router.post('/signup', function (req, res, next) {
  console.log("SIGNUP1:"+req.body.username + "/" + req.body.password);
  console.log("SIGNUP2:"+JSON.stringify(req.body));
  User.register(new User({username: req.body.username}), req.body.password, 
            (err, user)=>{
              if(err){
                res.statusCode = 500;
                //res.send('Content-Type', 'application/json');
                res.status(500).send({err:err});
                //res.json({err:err});
              } else {
                passport.authenticate('local')(req, res, ()=>{
                  res.statusCode = 200;
                  res.setHeader('content-Type', 'application/json');
                  res.json({success: true, 
                            status: 'Registration Successful!', 
                            username: req.body.username,
                            username2: req.username
                          });
                });
                }
            })
});

router.post('/login', 
            passport.authenticate('local'),           //It will automaticaly add user property - req.user to the incoming request.
           (req, res, next) => {
             console.log("WHAT DID I GET:"+req.body.username+"/"+req.body.password );
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json({ success: true, 
                        status: 'You are successfully logged in!',
                        username: req.body.username});
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
