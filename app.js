var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // HTML and Pug files have access to this folder
require('dotenv').load();

var currentENV = process.env.NODE_ENV;

/*
    Postgres set-up and connection:
*/

var queries = require(path.join(__dirname + '/lib/queries'));
// Set up database if not done yet
queries.dbExists((exists) => {
    if (!(exists))
    {
        console.log("[Alert] First run; setting up tables in database.")
        queries.setup(path.join(__dirname + "/lib/sql/first_run.sql"));
    }
    else
    {
        console.log("[Alert] Connected to " + currentENV + " database.");
    }
});

/*
    Routers
*/
var indexRouter = require('./routes/index');
var organizerRouter = require('./routes/organizer');

app.use('/', indexRouter);
app.use('/organizer', organizerRouter);

/*
    Error Handling
*/

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
