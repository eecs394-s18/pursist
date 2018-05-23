var express = require('express');
var router = express.Router();
var path = require('path');
var queries = require(path.join('../lib/queries'));

router.post('/', function(req, res) {
    var id = null;
    Object.keys(req.body).forEach((key) =>
    {
        if (key != "goal_tag" && key != "need_tag" && key != "challenge_tag")
        {
            id = parseInt(key);
        }
    });
    queries.deleteCard(id, (response) => {
        if (!response) {
            console.log("[Alert] Could not delete.");
        }
    });
    res.redirect('/organizer');
});

module.exports = router;
