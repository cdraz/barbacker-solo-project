
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET all ingredients from the third party api
  console.log('in /api/ingredient');
  // console.log('api key is', process.env.COCKTAIL_API_KEY);
  axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/list.php?i=list`)
  .then( apiRes => {
    console.log('api response received in get /ingredient');
    res.send(apiRes.data.drinks);
  })
  .catch( err => {
    console.error('error in get /ingredient', err);
    res.sendStatus(500);
  });

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
