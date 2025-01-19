var createError = require('http-errors');
var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jwtAuthRouter = require('./routes/jwtAuth.js')
var cors = require("cors");
const io = require("socket.io") 
var app = express();
app.set('view engine', 'ejs'); 

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', jwtAuthRouter)

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
  res.send('Welcome to this GREAT API');
});




module.exports = app;
