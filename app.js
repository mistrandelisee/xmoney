

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('xmoney:app');
const {NODE_ENV,SYNC}=process.env;
const {checkSession}=require('./utilities/authorize');

//routes imports ---START
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/utilisateur');
//routes imports ---END

//functions imports ---START
if(SYNC=='true' ) require('./utilities/synchronize').syncAll(); //for sync database
//functions imports ---END

// App Settings ---START

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//ALLOW ACCESS START
app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
//ALOW ACCESS END


app.use('/', indexRouter);
app.use('/api/users',checkSession, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// synchronizer.syncAll();
console.log(' ---------------------- ',NODE_ENV,SYNC)
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send({ko:true, ...res.locals});
});




module.exports = app;
