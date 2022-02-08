const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
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

/**
 * POST route template
 */
// POST ingredients from API to bar. Need to GET the IDs then send ID and string to Postgres
router.post('/', (req, res) => {
    // POST route code here
    console.log('in POST /api/bar');
    console.log('req.user is', req.user);
    console.log('req.body is', req.body);
});

module.exports = router;
