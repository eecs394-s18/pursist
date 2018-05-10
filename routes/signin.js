var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/', function(req, res, next) {
    res.render('signin', { title: 'Sign In' });
});

router.post('/', function(req, res, next) {
    email = req.body.email;
    password = req.body.password;

    queries.validateLogin(email, password, (response) => 
    {
        if (response == undefined || response.length == 0) 
        {
            // set up a valid user session
            res.redirect('/organizer');
        }
        else
        {
            res.redirect('/signin?loginFailed=true');
        }
    });
});

module.exports = router;