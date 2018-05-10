var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

/* GET home page. */
router.get('/', function(req, res, next) {
    queries.fetchTable((tableData) => 
    {
        if (tableData.length > 0)
        {
            res.render('organizer', {title: 'Organizer', data: tableData});
        }
        else
        {
            res.render('organizer', {title: 'Organizer', data: null});
        }
    });
});

module.exports = router;
