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
            res.render('index', {title: 'Home Page', data: tableData, isEmpty: false});
        }
        else
        {
            res.render('index', {title: 'Home Page', data: null, isEmpty: true});
        }
    });
});

module.exports = router;
