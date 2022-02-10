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
    res.send(apiRes.data);
  })
  .catch( err => {
    console.error(`Error in GET /detail/${req.params.i}`, err);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('in POST /recipes, req.body is', req.body, 'req.user is', req.user);
  // Write SQL query to save recipe to Postgres
  const queryText = `
    INSERT INTO saved_api_recipes ("apiId", "userId")
    VALUES ($1, $2);
  `;
  const queryParams = [
    req.body.id,
    req.user.id
  ];
  pool.query(queryText, queryParams)
  .then(dbRes => {
    console.log('POST success in /api/recipes');
    res.sendStatus(200);
  })
  .catch( err => {
    console.error('Error in POST /api/recipes', err);
    res.sendStatus(500);
  });
});

module.exports = router;
