var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));


/* GET home page. */
router.get('/', function(req, res, next) {
    var userVar = null;
    if (req.session && req.session.loggedIn)
    {
        userVar = req.session;
    }

    queries.fetchTable((tableData) =>
    {
        if (tableData.length > 0)
        {
            res.render('index', {title: 'Home Page', data: tableData, isEmpty: false, user: userVar});
        }
        else
        {
            res.render('index', {title: 'Home Page', data: null, isEmpty: true, user: userVar});
        }
    });
});

module.exports = router;
