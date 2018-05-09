var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/', function(req, res, next) {
    var sampleText = "";
    res.render('newcard', { title: 'Participant Input Page' }); /*info: sampleText*/
});

router.post('/', function(req, res, next) {
    // card data broken out here in case the form format changes later
    cardData = {
        goal: req.body.goal,
        need: req.body.need,
        current: req.body.current,
        problem: req.body.problem,
        comment: req.body.comment,
        email: req.body.email
    };
    queries.writeCard(cardData, (response) => {
        if (!response)
        {
            console.log("[Alert] Writing card failed.");
        }
    });
    res.redirect('/');
});

module.exports = router;
