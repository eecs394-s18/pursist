var express = require('express');
var router = express.Router();
var path = require('path');

var queries = require(path.join('../lib/queries'));

router.get('/:id?', function(req, res, next) {
    if (req.session && req.session.loggedIn)
    {
        if (req.query.id != null)
        {
            queries.getCardById(req.query.id, (response) =>
            {
                if (response.length > 0)
                {
                    res.render('edit', { title: 'Edit Card', user: req.session, isEmpty: false, card: response });
                }
                else
                {
                    res.render('edit', { title: 'Edit Card', user: req.session, isEmpty: true, card: null });
                }
            });
        }
        else
        {
            res.redirect('/');
        }
    }
    else
    {
        res.render('signin', {  title: 'Sign In', 
                                user: {loggedIn: false}});
    }
});

module.exports = router;