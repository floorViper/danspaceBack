// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
//const auth = require('./utils/auth');
const db = require('./db.js');
const passport = require('passport');

app.use(cors()); //cors
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

//API router
app.use('/api/auth', require('./api/auth'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error('DEV ERROR!!!', err);
    res.status(err.status || 500);
    res.json({
      result: err.code || 99999,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('prodErr');
  res.status(err.status || 500);
  res.json({
    result: err.code || 99999,
    message: err.message,
    error: {}
  });
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({ error: err.message });
// });
module.exports = app;
