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

// router.delete('/', function(req, res){
//     //var id = null;
//     console.log("TEST");
//     console.log(req.body);
//     Object.keys(req.body).forEach((key) =>{
//       if (key != "goal_tag" && key != "need_tag" && key != "challenge_tag")
//       {
//           id = parseInt(key);
//       }
//     })
//
//     queries.deleteCard([id], (response)=>{
//       if (!response){
//         console.log("[Alert] Could not delete.")
//       }
//     })
// });

router.post('/', function(req, res, next) {
    var id = null;
    console.log(req.body);
    Object.keys(req.body).forEach((key) =>
    {
        if (key != "goal_tag" && key != "need_tag" && key != "challenge_tag")
        {
            id = parseInt(key);
        }
    });
    if (req.body[id] == 'delete'){
      console.log("TESTT!!!!")
      queries.deleteCard(id, (response) => {
        if (!response){
          console.log("[Alert] Could not delete.");
        }
      });
    }
    else if (req.body[id] == 'submit'){
      queries.updateCard([id, req.body.goal_tag, req.body.need_tag, req.body.challenge_tag], (response) => {
          if (!response){
              console.log("[Alert] Updating card failed.");
          }
      });
    }
    res.redirect('/organizer');
        // // first fetch the table
        // queries.fetchTable((tableData) =>
        // {
        //     if (tableData.length > 0)
        //     {

        //         // EXPORTING CSV
        //         try {
        //             const csv = json2csv(tableData, { fields });
        //             var fileName = moment().unix() + ".csv";
        //             !fs.existsSync("_temp") && fs.mkdirSync("_temp");
        //             fs.appendFile('_temp/' + fileName, csv, (err) =>
        //             {
        //                 if (err) throw err;
        //                 res.download('_temp/' + fileName, fileName, (err) =>
        //                 {
        //                     if (err)
        //                     {
        //                         console.log(err);
        //                     }
        //                     else
        //                     {
        //                         fs.unlink('_temp/' + fileName, (err) =>
        //                         {
        //                             if (err)
        //                             {
        //                                 console.log(err);
        //                             }
        //                             else
        //                             {
        //                                 console.log("[Alert] File " + fileName + " served and deleted.");
        //                             }
        //                         });
        //                     }
        //                 });
        //             });
        //         }
        //         catch(err) {
        //             console.log(err);
        //         }


        //         // res.redirect('/');
        //     }

        //     else
        //     {
        //         console.log("No data to export!");
        //         // this is a good place to redirect the page with some params to have it create an alert or something
        //         res.redirect('/');
        //     }
        // });
});

module.exports = router;
