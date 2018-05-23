var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));

var json2csv = require('json2csv').parse;
var moment = require('moment');
var fs = require('fs');

const fields = ['goal', 'need', 'current_solution', 'problem', 'solution_ideas', 'current_benefits', 'comment', 'email']

router.get('/', function(req, res, next) {
    // this is for just fetching and showing the table I think
    queries.fetchTable((tableData) =>
    {
        if (tableData.length > 0)
        {
            res.render('organizer', {title: 'Organizer', data: tableData, isEmpty: false});
        }
        else
        {
            res.render('organizer', {title: 'Organizer', data: null, isEmpty: true});
        }
    });
});

router.post('/', function(req, res, next) {
    var id = null;
    console.log(req.body);
    Object.keys(req.body).forEach((key) =>
    {
        if (key != "var1" && key != "link12" && key != "var2" && key != "link23" && key != "var3")
        {
            id = parseInt(key);
        }
    });
    queries.updateCard([id, req.body.var1, req.body.link12, req.body.var2, req.body.link23, req.body.var3], (response) => {
        if (!response){
            console.log("[Alert] Updating card failed.");
        }
    });
    res.redirect('/organizer');
});

module.exports = router;
