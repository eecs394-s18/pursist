var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));

var json2csv = require('json2csv').parse;
var moment = require('moment');
var fs = require('fs');

const fields = ['goal', 'need', 'current_solution', 'problem', 'solution_ideas', 'current_benefits', 'comment', 'email', 'var1', 'link12', 'var2', 'link23', 'var3'];

router.post('/', function(req, res, next) {
    var id = null;

    if (req.session && req.session.loggedIn)
    {
        queries.fetchTable((tableData) =>
        {
            if (tableData.length > 0)
            {
                try {
                    const csv = json2csv(tableData, { fields });
                    var fileName = moment().unix() + ".csv";
                    !fs.existsSync("_temp") && fs.mkdirSync("_temp");
                    fs.appendFile('_temp/' + fileName, csv, (err) =>
                    {
                        if (err) throw err;
                        res.download('./_temp/' + fileName, fileName, (err) =>
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
            }
            else
            {
                console.log("[Alert] No data to export!");
                res.redirect('/');
            }
        });
    }
    else
    {
        res.redirect('/signin');
    }
});

module.exports = router;