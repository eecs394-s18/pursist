var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var sampleText = "EXCITING TEXT THAT CAN BE DISPLAYED";
    res.render('organizer', { title: 'Organizer Page', info: sampleText });
});

module.exports = router;
