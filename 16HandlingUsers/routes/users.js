var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("GET for /users");
  res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
  console.log(JSON.stringify(req.body));
  console.log("User " + req.body.username + "/" + req.body.password + " trying to signup!");
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        var err = new Error('User ' + req.body.username + ' alredy exists.');
        err.status = 403;
        next(err);
      } else {
        return User.create({
          username: req.body.username,
          password: req.body.password
        });
      }
    })
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        staus: 'Registration Successful!',
        user: user
      })
    }, (err) => next(err))
    .catch((err) => next(err));

});

router.post('/login', (req, res, next) => {
  console.log("---LOG-IN------------");
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('Unauthenticated user');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64') //Strinnng will be          splitttttted        ina n arrao of two items
      .toString()
      .split(':');      //You'll get an array of 2 - user-name and password
    var username = auth[0];
    var password = auth[1];

    console.log("Trying to login:" + username + "/" + password);
    User.findOne({ username: username })
      .then((user) => {
        if (user.username === username && user.password === password) {
          console.log("Successfuly authenticated!");
          req.session.user = 'authenticated';
          // res.statusCode = 200;
          // res.setHeader('Content-Type', 'text/plain');
          // res.end('User ' + username + ' is authenticated');


          res.render('index', {
            title: 'Application Home Page',
            message: 'User ' + username + ' is authenticated'
          });

        } else if (user.password != password) {
          var err = new Error('Incorrect password');
          err.status = 403;
          return next(err);
        } else if (user == null) {
          var err = new ('User ' + username + ' does NOT exist!');
          err.status = 403;
          return next(err);
        }
        console.log("...it didn't catch anywhere else!");
      }
      ).catch((err) => { next(err) });
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('User ' + username + ' is already logged in');
  }
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
