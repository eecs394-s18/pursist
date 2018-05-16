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

    // here is where we're going to call the write card function again
    cardData = {
        goal: req.body.goal,
        need: req.body.need,
        current: req.body.current,
        problem: req.body.problem,
        comment: req.body.comment,
        email: req.body.email,
        // initialize these to null here - students don't sset them yet
        goal_tag: req.body.goal_tag,
        need_tag: req.body.need_tag,
        challenge_tag: req.body.challenge_tag
    };


    queries.updateCard(cardData, (response) => {
        if (!response){
            console.log("[Alert] Writing card failed.");
        }
    });

    // first fetch the table
    queries.fetchTable((tableData) =>
    {
        if (tableData.length > 0)
        {

            // EXPORTING CSV
            try {
                const csv = json2csv(tableData, { fields });
                var fileName = moment().unix() + ".csv";
                !fs.existsSync("_temp") && fs.mkdirSync("_temp");
                fs.appendFile('_temp/' + fileName, csv, (err) =>
                {
                    if (err) throw err;
                    res.download('_temp/' + fileName, fileName, (err) =>
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            fs.unlink('_temp/' + fileName, (err) =>
                            {
                                if (err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    console.log("[Alert] File " + fileName + " served and deleted.");
                                }
                            });
                        }
                    });
                });
            }
            catch(err) {
                console.log(err);
            }


            // res.redirect('/');
        }

        else
        {
            console.log("No data to export!");
            // this is a good place to redirect the page with some params to have it create an alert or something
            res.redirect('/');
        }
    });
});

module.exports = router;
