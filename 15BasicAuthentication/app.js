var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');
const URL = 'mongodb://localhost:27017/ognom';

var index = require('./routes/index');
var users = require('./routes/users');
var dishesRouter = require('./routes/dishRouter');
var promotionRouter =  require('./routes/promoRouter');
var leadersRouter = require('./routes/leadersRouter');

const dbConnection = mongoose.connect(URL, {useMongoClient: true});
dbConnection.then((db) => {
  console.log('Connected successfully to MongoDB Server');
}, (err) => { console.log(err)});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req, res, next){
  console.log("AUTH FUNCTION:" + req.headers);
  var authHeader =  req.headers.authorization;
  
  if(!authHeader){
    var err = new Error('Unauthenticated user');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status=401;
    next(err);
    return;
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64') //Strinnng will be          splitttttted        ina n arrao of two items
              .toString()
              .split(':');      //You'll get an array of 2 - user-name and password
  var username = auth[0];
  var password = auth[1];
  
  if(username === 'admin' && password === 'password'){
    next();
  } else {
    var err = new Error('Unauthenticated user - invalid ID or password');
    res.setHeader('WWW-Authenicate', 'Basic');
    err.sstatus=401;
    next(err);

  }
}
//Add authentication layer for any piont to be accessed after this point
console.log("...added auth layer as well");
app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use('/dishes', dishesRouter);
app.use('/leaders',leadersRouter);
app.use('/promotions',promotionRouter);

console.log(".....after mapping all the routes");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
console.log("Server started...");
