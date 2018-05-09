var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcryptjs');

const HASH_ROUNDS = 20;
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

var writeCard = (userEmail, callback) =>
{
    var writeCard = fs.readFileSync(path.join(__dirname + '/sql/new_card.sql')).toString();

    db.none(prepSQL(writeCard), [userEmail])
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