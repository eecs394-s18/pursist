var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));
const fields = ['goal', 'need', 'current_solution', 'problem', 'comment', 'email'];

/* GET diagrams page */
router.get('/', function(req, res, next) {
  var diagramUrl = path.join(__dirname, '..', 'public/resources/newDiagram.bpmn');
  console.log(__dirname, '..', '/resources/newDiagram.bpmn');
  console.log("printing xmlfile " + diagramUrl);
  queries.fetchTable((tableData) =>
  {
    console.log("printing tableData from diagrams.js " + tableData);
      if (tableData.length > 0)
      {
          res.render('diagrams', {title: 'Organizer', data: tableData, isEmpty: false, xmlFile: diagramUrl});
      }
      else
      {
          console.log("case 2");
          res.render('diagrams', {title: 'Organizer', data: null, isEmpty: true, xmlFile: diagramUrl});
      }
  });
});

module.exports = router;
