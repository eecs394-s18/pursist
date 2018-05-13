var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));
var myfields = ['goal', 'need', 'current_solution', 'problem', 'comment', 'email']

var json2csv = require('json2csv');
var fs = require('fs');
// var exportCSV;

/* GET home page. */
router.get('/', function(req, res, next) {
    queries.fetchTable((tableData) =>
    {
        if (tableData.length > 0)
        {
            console.log(tableData);
            res.render('organizer', {title: 'Organizer', data: tableData, isEmpty: false});
            queries.exportCSV(tableData, (response) => {
                console.log("did something")
                if (!response)
                {
                    console.log("[Alert] Writing card failed.");
                }
                else{
                    console.log("tell me anything")
                }
            });
        }
        else
        {
            res.render('organizer', {title: 'Organizer', data: null, isEmpty: true});
        }
    });
});

// router.post('/', function(req, res, next) {

//     queries.exportCSV(tableData, (response) => {
//         if (!response)
//         {
//             console.log("[Alert] Writing card failed.");
//         }
//     });
//     res.redirect('/');
// });



// function exportCSV {
//     console.log("exportCSV called");

//     var csv = json2csv({ data: tableData, fields: myfields });

//     fs.writeFile('/Users/juliawilkins/Desktop/output.csv', csv, function(err) {
//       if (err) throw err;
//       console.log('file saved');
//     });


// };


module.exports = router;
