var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/', function(req, res, next) {
    var userVar = null;
    if (req.session && req.session.loggedIn)
    {
        userVar = req.session;
    }

    if (req.session && req.session.loggedIn)
    {
        res.redirect('/');
    }
    else
    {
        res.render('newuser', { title: 'Create Account', user: userVar});
    }
});

router.post('/', function(req, res, next) {
    if (req.body.password === req.body.passconf && req.body.password.length >= 6)
    {
        queries.addUser(req.body.email, req.body.password, (response) =>
        {
            if (response.length > 0)
            {
                if (response == "usernameUsed")
                {
                    // no session
                    res.redirect('/spencer?usernameUsed=true');
                }
                else
                {
                    // no session
                    res.redirect('/spencer?generalError=true');
                }
            }
            else
            {
                // user should get valid session
                res.redirect('/signin')
            }
        });
    }
    else if (req.body.password.length < 6)
    {
        res.redirect('/spencer?shortPassword=true');
    }
    else
    {
        res.redirect('/spencer?passwordMismatch=true');
    }
});

module.exports = router;