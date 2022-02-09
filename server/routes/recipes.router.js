const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/search/:q', (req, res) => {
  // GET route code here
  axios({
    method: 'GET',
    url: `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?i=`,
    params: {
        i: req.params.q
    }
  })
  .then(apiRes => res.send(apiRes.data) )
  .catch( err => console.error(`Error in GET /search/${req.params.q}`, err));
});

router.get('/detail/:id', (req, res) => {
  // GET route code here
  axios({
    method: 'GET',
    url: `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=`,
    params: {
        i: req.params.id
    }
  })
  .then(apiRes => {
    console.log('details are', apiRes.data);
    res.send(apiRes.data);
  })
  .catch( err => console.error(`Error in GET /detail/${req.params.i}`, err));
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
