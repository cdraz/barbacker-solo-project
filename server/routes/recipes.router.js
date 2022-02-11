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
  // GET current user's saved recipes from Postgres
  // Write our SQL query
  const queryText = `
    SELECT * FROM "saved_api_recipes"
    WHERE "userId" = $1;
  `;
  const queryParams = [req.user.id];
  pool.query(queryText, queryParams)
    .then(dbRes => {
      console.log('GET /api/recipes success');
      const savedRecipes = dbRes.rows;
      // Create cocktaildb api endpoints based on the saved recipes returned from postgres
      const endpoints = savedRecipes.map(recipe => (
        `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=${recipe.apiId}`
      ));
      // Make our concurrent requests to the cocktaildb api, wrap up all responses and send to client together
      Promise.all(endpoints.map(endpoint => axios.get(endpoint)))
        .then(axios.spread((...responses) => {
          res.send(responses.map(response => response.data));
        }))
        // Catch the cocktaildb api concurrent requests
        .catch(err => {
          console.error('Error in GET /api/recipes', err);
          res.sendStatus(500);
        })
    })
    // Catch Postgres GET request
    .catch(err => {
      console.error('Error in GET /api/recipes', err);
      res.sendStatus(500);
    })
});

router.get('/search/:q', rejectUnauthenticated, (req, res) => {
  // GET route code here
  axios({
    method: 'GET',
    url: `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?i=`,
    params: {
      i: req.params.q
    }
  })
    .then(apiRes => res.send(apiRes.data))
    .catch(err => console.error(`Error in GET /search/${req.params.q}`, err));
});

router.get('/detail/:id', rejectUnauthenticated, (req, res) => {
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
    .catch(err => {
      console.error(`Error in GET /detail/${req.params.i}`, err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
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
    .catch(err => {
      console.error('Error in POST /api/recipes', err);
      res.sendStatus(500);
    });
});

module.exports = router;
