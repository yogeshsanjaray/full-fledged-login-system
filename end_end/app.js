var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var studentsRouter = require('./routes/students');    //using mongodb
var todosRouter = require('./routes/todos');    //using mongodb todo

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students',studentsRouter);      //creating students url by using mongoDB
app.use('/todos',todosRouter);            //creating todo url by using mongoDB
 

var mongoose = require('mongoose'); 
var mongoConnUrl = 'mongodb://localhost/zenrays';//zenrays means select the database like use zenrays u write in mongo

mongoose.connect(mongoConnUrl,{useNewUrlParser:true,useUnifiedTopology: true});
var db = mongoose.connection;

db.on("error",function () {
  console.log("error came in connecting")
})
//this line runs the function if there is any error  in connecting to hr mongodb by mongoose


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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







