var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcryptjs');

const HASH_ROUNDS = 10;
require('dotenv').load();

function prepSQL(query) // replace {SCHEMA} with schema name in files
{
    var updated = query.replace(/{SCHEMA}/g, process.env.SCHEMA);
    return updated;
}

const initOptions = {};
const pgp = require('pg-promise')(initOptions);
const db = pgp(process.env.DATABASE_URL);

/*
    Startup Tools
*/

var dbExists = (callback) => {
    var sql = "SELECT to_regclass('{SCHEMA}.users');"

    db.any(prepSQL(sql))
    .then((response) => {
        var exists = Boolean(response[0].to_regclass);
        return callback(exists);
    })
    .catch((error) => {
        console.log(error);
    });
}

exports.dbExists = dbExists;

var setup = (setupPath) => {
    var sql = fs.readFileSync(setupPath).toString();

    db.none(prepSQL(sql))
    .catch((error) => {
        console.log('[Alert] Failed to setup database.');
        console.log(error);
    });
}

exports.setup = setup;

/*
    Writing
*/

var writeCard = (cardData, callback) =>
{
    var writeCard = fs.readFileSync(path.join(__dirname + '/sql/new_card.sql')).toString();

    // format as: goal, need, current_solution, problem, comments, email

    db.none(prepSQL(writeCard), [cardData.goal, cardData.need, cardData.current, cardData.problem, cardData.comment, cardData.email])
    .catch((error) => {
        console.log('[Alert] Failed to write new card to database.');
        console.log(error);
        return callback(false);
    });
}

exports.writeCard = writeCard;

/*
    Reading
*/

var fetchTable = (callback) =>
{
    var getTable = fs.readFileSync(path.join(__dirname + '/sql/retrieve_cards.sql')).toString();
    db.any(prepSQL(getTable), [])
    .then((response) =>
    {
        if (response !== undefined && response.length != 0)
        {
            return callback(response);
        }
        else
        {
            return callback("No entries in table.");
        }
    })
    .catch((error) =>
    {
        console.log('[Alert] Error retrieving data from the cards table.');
        console.log(error);
        return callback("");
    });
}

exports.fetchTable = fetchTable;

/*
    User Tools
*/

var addUser = (email, password, callback) =>
{
    var writeUser = fs.readFileSync(path.join(__dirname + '/sql/create_user.sql')).toString();

    var retrieveUser = fs.readFileSync(path.join(__dirname + '/sql/retrieve_user.sql')).toString();

    db.any(prepSQL(retrieveUser), [email])
    .then((resp) =>
    {
        if (resp !== undefined && resp.length > 0)
        {
            return callback("usernameUsed");
        }
        else
        {
            bcrypt.hash(password, HASH_ROUNDS, (err, hash) =>
            {
                if (err)
                {
                    console.log("[Alert] Hashing error.\n", err);
                    return callback("generalError");
                }
                else
                {
                    db.none(prepSQL(writeUser), [email, hash])
                    .then(() =>
                    {
                        return callback(""); // success
                    })
                    .catch((err) =>
                    {
                        console.log("[Alert] Error adding user.\n", err);
                        return callback("generalError");
                    });
                }
            });
        }
    })
    .catch((error) =>
    {
        console.log("[Alert] Error retrieving user.\n", error);
        return callback("generalError");
    });
}

exports.addUser = addUser;

var validateLogin = (email, password, callback) =>
{
    var sql = fs.readFileSync(path.join(__dirname + '/sql/retrieve_user.sql')).toString();

    db.any(prepSQL(sql), [email])
    .then((response) => {
        if (response !== undefined && response.length != 0)
        {
            bcrypt.compare(password, response[0].password, (err, match) =>
            {
                if (err) { console.log(err); }
                else
                {
                    if (match) // passwords match
                    {
                        return callback("");
                    }
                    else
                    {
                        return callback("passwordMismatch");
                    }
                }
            });
        }
        else
        {
            return callback("noAccount");
        }
    })
    .catch((error) => { console.log(error) });
}

exports.validateLogin = validateLogin;
