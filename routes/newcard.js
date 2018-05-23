var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/', function(req, res, next) {
    var sampleText = "";
    var userVar = null;
    if (req.session && req.session.loggedIn)
    {
        userVar = req.session;
    }

    res.render('newcard', { title: 'Participant Input Page' , user: userVar}); /*info: sampleText*/
});

router.post('/', function(req, res, next) {
    // card data broken out here in case the form format changes later
    cardData = {
        goal: req.body.goal,
        need: req.body.need,
        current_solution: req.body.current_solution,
        problem: req.body.problem,
        solution_ideas: req.body.solution_ideas,
        current_benefits: req.body.current_benefits,
        comment: req.body.comment,
        email: req.body.email,
        // initialize these to null here - students don't sset them yet
        var1: null,
        link12: null,
        var2: null,
        link23: null,
        var3: null
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
