const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    // GET all ingredients from the third party api
    console.log('in GET /api/bar');
    axios.get()
        .then(dbRes => {
            console.log('response received in get /bar');
        })
        .catch(err => {
            console.error('error in get /bar', err);
            res.sendStatus(500);
        });

});

router.post('/', rejectUnauthenticated, (req, res) => {
    // POST ingredients from API to bar. Need to GET the IDs then send ID and string to Postgres
    console.log('in POST /api/bar');
    
    // For each ingredient sent over, post to Postgres
    let queryText ='INSERT INTO "bar_ingredients" ("userId", "apiString") VALUES ';
    let queryParams = [req.user.id];

    // Loop through ingredients being posted to build SQL query
    for (let i = 0; i < req.body.length; i++) {
        queryText += `($1, $${i+2})`
        queryParams.push(req.body[i])
        // If its the last ingredient being entered, add semicolon to end SQL query,
        // Otherwise add ', ' before concatenating next values
        if (i === req.body.length - 1) {
            queryText += ';';
        } else {
            queryText +=', ';
        }
    }

    // Post to Posgres
    pool.query(queryText, queryParams)
    .then( dbRes => res.sendStatus(200))
    .catch( err => console.error('Error in POST /api/bar', err));
});

module.exports = router;
