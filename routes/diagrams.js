var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));
const fields = ['goal', 'need', 'current_solution', 'problem', 'comment', 'email'];

/* GET diagrams page */
router.get('/', function(req, res, next) {
  queries.fetchTable((tableData) =>
  {
    console.log("printing tableData from diagrams.js " + tableData);
      if (tableData.length > 0)
      {
          console.log("case 1");
          res.render('diagrams', {title: 'Organizer', data: tableData, isEmpty: false});
      }
      else
      {
          console.log("case 2");
          res.render('diagrams', {title: 'Organizer', data: null, isEmpty: true});
      }
  });
});

module.exports = router;
