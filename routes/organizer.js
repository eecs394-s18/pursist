var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));

var json2csv = require('json2csv').parse;
var moment = require('moment');
var fs = require('fs');

router.get('/', function(req, res, next) {
    // this is for just fetching and showing the table I think
    var userVar = null;
    if (req.session && req.session.loggedIn)
    {
        userVar = req.session;
    }

    queries.fetchTable((tableData) =>
    {
        if (tableData.length > 0)
        {
            res.render('organizer', {title: 'Organizer', data: tableData, isEmpty: false, user: userVar});
        }
        else
        {
            res.render('organizer', {title: 'Organizer', data: null, isEmpty: true, user: userVar});
        }
    });
});

router.post('/', function(req, res, next) {
    var id = null;
    Object.keys(req.body).forEach((key) =>
    {
        if (key != "var1" && key != "link12" && key != "var2" && key != "link23" && key != "var3" && key != "link34" && key != "var4" && key != "link45" && key != "var5")
        {
            id = parseInt(key);
        }
    });

    queries.updateCard([id, req.body.var1, req.body.link12, req.body.var2, req.body.link23, req.body.var3, req.body.link34, req.body.var4, req.body.link45, req.body, var5], (response) => {
        if (!response){
            console.log("[Alert] Updating card failed.");
        }
    });
    res.redirect('/organizer');
});

module.exports = router;
