var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

/* GET diagrams page */
router.get('/', function(req, res, next) {
  var userVar = null;
  if (req.session && req.session.loggedIn)
  {
      userVar = req.session;
  }

  queries.fetchTable((tableData) =>
  {
    console.log("printing tableData " + tableData);
      if (tableData.length > 0)
      {
          res.render('diagrams', {title: 'Diagrams', data: tableData, isEmpty: false, user: userVar});
      }
      else
      {
          res.render('diagrams', {title: 'Diagrams', data: null, isEmpty: true, user: userVar});
      }
  });
});

module.exports = router;
