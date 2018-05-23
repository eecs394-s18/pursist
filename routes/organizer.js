var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));

var json2csv = require('json2csv').parse;
var moment = require('moment');
var fs = require('fs');

const fields = ['goal', 'need', 'current_solution', 'problem', 'comment', 'email']

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
        if (key != "goal_tag" && key != "need_tag" && key != "challenge_tag")
        {
            id = parseInt(key);
        }
    });
    queries.updateCard([id, req.body.goal_tag, req.body.need_tag, req.body.challenge_tag], (response) => {
        if (!response){
            console.log("[Alert] Updating card failed.");
        }
    });
    res.redirect('/organizer');
});

module.exports = router;
