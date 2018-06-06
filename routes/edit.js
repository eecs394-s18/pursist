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
                    var causalNum = 0;
                    for (var property in response[0])
                    {
                        if (property.includes("var") && response[0][property] != null)
                        {
                            causalNum ++;
                        }
                    }
                    res.render('edit', { title: 'Edit Card', user: req.session, causalCount: causalNum, card: response[0] });
                }
                else
                {
                    res.render('edit', { title: 'Edit Card', user: req.session, causalCount: 0, card: null });
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

router.post('/', function(req, res, next) {
    var id = 0;
    for (var prop in req.body)
    {
        if (!(prop.includes("link") || prop.includes("var")))
        {
            id = prop;
        }
    }

    // id, var1 = $2, link12 = $3, var2 = $4, link23 = $5, var3 = $6, link34 = $7, var4 = $8, link45 = $9, var5 = $10
    var cardData = [id, req.body.var1, req.body.link12, req.body.var2, req.body.link23, req.body.var3, req.body.link34, req.body.var4, req.body.link45, req.body.var5];
    for (var i = 0; i < cardData.length; i ++) // translate undefineds into nulls for sql
    {
        if (cardData[i] == undefined)
        {
            cardData[i] = null;
        }
    }

    queries.updateCard(cardData, (cb) =>
    {
        if (!cb)
        {
            console.log("[Alert] An updating error has occurred.");
        }
    });

    res.redirect('/organizer');
});

module.exports = router;