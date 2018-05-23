var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/', function(req, res, next) {
    if (req.session && req.session.loggedIn)
    {
        res.redirect('/');
    }
    else
    {
        res.render('signin', {  title: 'Sign In', 
                                user: {loggedIn: false}});
    }
});

router.post('/', function(req, res, next) {
    email = req.body.email;
    password = req.body.password;

    queries.validateLogin(email, password, (response) => 
    {
        if (response == undefined || response.length == 0) 
        {
            req.session.loggedIn = true;
            res.redirect('/organizer');
        }
        else
        {
            res.redirect('/signin?loginFailed=true');
        }
    });
});

module.exports = router;