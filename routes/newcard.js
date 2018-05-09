var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var sampleText = "";
    res.render('newcard', { title: 'Participant Input Page' }); /*info: sampleText*/
});

module.exports = router;
