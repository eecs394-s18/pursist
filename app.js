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
    Set up user session handling
*/

var     session = require('express-session');
        RedisStore = require('connect-redis')(session)
        url = require('url');

if (currentENV === "development")
{
    console.log("[Alert] Attempting to connect to Redis launched in development.")

    app.use(session({       secret: process.env.REDIS_SECRET,
                            store: new RedisStore({
                                host: "localhost",
                                port: 6379
                            }),
                            resave: false,
                            saveUninitialized: false,
                            cookie: {maxAge: 60 * 60 * 1000} // expire after an hour
                    }));
}
else if (currentENV === "production")
{
    console.log("[Alert] Attempting to connect to Redis launched in production.")
    var redisURL   = require("url").parse(process.env.REDISTOGO_URL);
    var redisAuth = redisURL.auth.split(':');
    const DB_NUMBER = 0;
    app.use(session({       secret: process.env.REDIS_SECRET,
                            store: new RedisStore({
                                host: redisURL.hostname,
                                port: redisURL.port,
                                db: DB_NUMBER,
                                pass: redisAuth[1]
                            }),
                            resave: false,
                            saveUninitialized: false,
                            cookie: {maxAge: 60 * 60 * 1000} // expire after an hour
                    }));
}
else
{
    console.log("[Error]: NODE_ENV is not valid.");
}

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
var newCardRouter = require('./routes/newcard');
var signinRouter = require('./routes/signin');
var signoutRouter = require('./routes/logout');
var newuserRouter = require('./routes/newuser');
var organizerDeleteRouter = require('./routes/organizerdelete');
var exportRouter = require('./routes/export');

app.use('/', indexRouter);
app.use('/organizer', organizerRouter);
app.use('/organizerdelete', organizerDeleteRouter);
app.use('/newcard', newCardRouter);
app.use('/signin', signinRouter);
app.use('/logout', signoutRouter);
app.use('/newuser', newuserRouter);
app.use('/export', exportRouter);

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
})

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
