var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

/* GET diagrams page */
router.get('/', function(req, res, next) {
  queries.fetchTable((tableData) =>
  {
    console.log("printing tableData " + tableData);
      if (tableData.length > 0)
      {
          res.render('diagrams', {title: 'Diagrams', data: tableData, isEmpty: false});
      }
      else
      {
          res.render('diagrams', {title: 'Diagrams', data: null, isEmpty: true});
      }
  });
});

module.exports = router;
