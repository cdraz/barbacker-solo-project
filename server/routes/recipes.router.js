const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/search/:q', (req, res) => {
  // GET route code here
  console.log('in /api/recipes/search');
  console.log('req.params.q is', req.params.q);
  console.log('req.user is', req.user);
  axios({
    method: 'GET',
    url: `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?i=`,
    params: {
        i: req.params.q
    }
  })
  .then( apiRes => console.log(apiRes.data) );

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
