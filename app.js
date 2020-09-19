var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var readerRouter = require('./routes/readerRouter');
var booksRouter = require('./routes/booksRouter');
var scriptsRouter = require('./routes/scriptsRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/favicon.ico", (req, res) => {
  res.sendFile("/images/stitchX.png", { root: process.env.NODE_PATH });
});

app.use(cors({
  "Access-Control-Allow-Origin": "*"
}));
app.get("/getOne", (req, res) => {
  res.send({ one: 1 });
});

app.use('/reader', readerRouter);
app.use('/book', booksRouter);
app.use('/scripts', scriptsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
