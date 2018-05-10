var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/', function(req, res, next) {
    res.render('signin', { title: 'Sign In' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;