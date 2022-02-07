
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET all ingredients from the third party api
  console.log('in /api/ingredient');
  // axios.get(`www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/list.php?i=list`)

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
