const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const streamifier = require('streamifier');
const fs = require('fs');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const upload = multer();

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

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in POST /api/recipes, req.body is', req.body, 'req.user is', req.user);
  // Write SQL query to save recipe to Postgres
  const queryText = `
    INSERT INTO "saved_api_recipes" ("apiId", "userId")
    VALUES ($1, $2);
  `;
  const queryParams = [
    req.body.id, // $1
    req.user.id // $2
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

router.get('/custom', rejectUnauthenticated, (req, res) => {
  console.log('in GET /api/recipes/custom');
  // Write SQL query to get custom user recipes for current user
  const queryText = `
    SELECT 
    "user_recipes"."id",
    "user_recipes"."userId",
    "user_recipes"."name",
    "user_recipes"."instructions",
    "user_recipes"."image",
    ARRAY_AGG("user_recipes_ingredients"."apiIngredientName") AS "ingredients"
    FROM "user_recipes"
    JOIN "user_recipes_ingredients"
    ON "user_recipes"."id" = "user_recipes_ingredients"."recipeId"
    WHERE "user_recipes"."userId" = $1
    GROUP BY "user_recipes"."id";
  `;
  const queryParams = [
    req.user.id // $1
  ];
  pool.query(queryText, queryParams)
    .then(dbRes => {
      console.log('GET /api/recipes/custom success');
      res.send(dbRes.rows);
    })
    .catch(err => {
      console.error('Error in GET /api/recipes/custom', err);
      res.sendStatus(500);
    });
});

router.post('/custom', rejectUnauthenticated, upload.single('image'), (req, res) => {
  console.log('in POST /api/recipes/custom, req.body is', req.body, 'req.file is', req.file, 'req.user is', req.user);
  // Write SQL query to save recipe to database, then save recipe ingredients
  // First: Upload image with multer and save filepath
  // Check file type before we upload
  if (req.file.mimetype != 'image/jpeg') {
    res.sendStatus(400);
    return;
  }

  // Set unique file name
  const imageName = Date.now() + '.jpg'

  // Set writePath and filePath (writePath for upload, filePath for database)
  const writePath = `${__dirname}/../../public/uploads/${imageName}`;
  const filePath = `/uploads/${imageName}`

  // Create writeStream that will take req.file.buffer and write the file to our public folder
  const writeStream = fs.createWriteStream(writePath);
  // Use streamifier to turn req.file.buffer from multer into a readStream and pipe it to our writeStream to write file
  streamifier.createReadStream(req.file.buffer).pipe(writeStream);

  // Save drink name, instructions, image filepath to database
  // Get ingredients as array
  const ingredients = req.body.ingredients.split(',')

  // Build the SQL query
  let queryText = `
    WITH recipe AS (
    INSERT INTO "user_recipes" ("userId", "name", "instructions", "image")
    VALUES ($1, $2, $3, $4)
    RETURNING id
    )
    INSERT INTO "user_recipes_ingredients" ("recipeId", "apiIngredientName")
    VALUES `

  const queryParams = [
    req.user.id, // $1
    req.body.name, // $2
    req.body.instructions, // $3
    filePath // $4
  ];

  for (let i = 0; i < ingredients.length; i++) {
    queryText += `((SELECT * FROM recipe), $${i + 5})`;
    queryParams.push(ingredients[i]);
    // If its the last ingredient being entered, add semicolon to end SQL query,
    // Otherwise add ', ' before concatenating next values
    if (i === ingredients.length - 1) {
      queryText += ';';
    } else {
      queryText += ', ';
    }
  }
  pool.query(queryText, queryParams)
    .then(dbRes => {
      console.log('POST /api/recipes/custom success');
      res.sendStatus(200);
    })
    .catch(err => {
      console.error('Error in POST /api/recipes/custom', err);
      res.sendStatus(500);
    })
});

router.put('/custom/:id/edit', rejectUnauthenticated, async (req, res) => {
  console.log(`in /api/custom/${req.params.id}/edit`, req.user, req.body);
  // Write SQL query to update recipe
  let queryText = `
    WITH clearPreviousIngredients AS (
    DELETE FROM "user_recipes_ingredients"
    WHERE "recipeId" = $1 ),
    updateRecipe AS (
    UPDATE "user_recipes"
    SET "name" = $2, "instructions" = $3
    WHERE "id" = $1 )
    INSERT INTO "user_recipes_ingredients" ("recipeId", "apiIngredientName")
    VALUES `;

  const queryParams = [
    req.params.id, // $1
    req.body.name, // $2
    req.body.instructions, //$3
  ];

  for (let i = 0; i < req.body.ingredients.length; i++) {
    queryText += `($1, $${i + 4})`;
    queryParams.push(req.body.ingredients[i]);
    // If its the last ingredient being entered, add semicolon to end SQL query,
    // Otherwise add ', ' before concatenating next values
    if (i === req.body.ingredients.length - 1) {
      queryText += ';';
    } else {
      queryText += ', ';
    }
  }

  pool.query(queryText, queryParams)
    .then(dbRes => {
      console.log(`PUT /api/recipes/custom/${req.params.id}/edit success`);
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(`Error in PUT /api/recipes/custom/${req.params.id}/edit`, err);
      res.sendStatus(500);
    });
});

router.delete('/custom/:id/delete', rejectUnauthenticated, (req, res) => {
  console.log(`in /api/custom/${req.params.id}/delete`);
  // Write SQL query to delete requested recipe
  const queryText = `
  WITH deleteIngredients AS (
    DELETE FROM "user_recipes_ingredients"
    WHERE "recipeId" = $1 )
  DELETE FROM "user_recipes"
  WHERE "id" = $1 AND "userId" = $2;
  `;
  const queryParams = [
    req.params.id, // $1
    req.user.id // $2
  ];
  pool.query(queryText, queryParams)
    .then(dbRes => {
      console.log(`DELETE /api/recipes/custom/${req.params.id}/delete success`);
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(`Error in DELETE /api/recipes/custom/${req.params.id}/delete`, err);
      res.sendStatus(500);
    })
});

router.delete('/:apiId', rejectUnauthenticated, (req, res) => {
  console.log(`in DELETE /api/recipes/${req.params.apiId}`, req.user);
  // Write SQL query to remove recipe from Postgres for current user
  const queryText = `
    DELETE FROM "saved_api_recipes"
    WHERE "apiId" = $1 AND "userId" = $2;
  `;
  const queryParams = [
    req.params.apiId, // $1
    req.user.id // $2
  ];
  pool.query(queryText, queryParams)
    .then(dbRes => {
      console.log(`DELETE success in /api/recipes/${req.params.apiId}`);
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(`Error in DELETE /api/recipes/${req.params.apiId}`, err);
      res.sendStatus(500);
    })
});

router.get('/popular', rejectUnauthenticated, (req, res) => {
  console.log('in GET /api/recipes/popular', req.user);
  // Write SQL query to get the 10 most saved recipes in Postgres
  const queryText = `
  SELECT COUNT("apiId"), "apiId"
  FROM "saved_api_recipes"
  GROUP BY "apiId"
  ORDER BY COUNT("apiId") DESC
  LIMIT 10;
  `
  pool.query(queryText)
    .then(dbRes => {
      console.log('GET success in /api/recipes/popular');
      const popularRecipes = dbRes.rows;
      // Create cocktaildb api endpoints based on the popular recipes returned from postgres
      const endpoints = popularRecipes.map(recipe => (
        `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/lookup.php?i=${recipe.apiId}`
      ));
      // Make our concurrent requests to the cocktaildb api, wrap up all responses and send to client together
      Promise.all(endpoints.map(endpoint => axios.get(endpoint)))
        .then(axios.spread((...responses) => {
          res.send(responses.map(response => response.data));
        }))
        // Catch the cocktaildb api concurrent requests
        .catch(err => {
          console.error('Error in GET /api/recipes/popular', err);
          res.sendStatus(500);
        });
    })
    // Catch first query
    .catch(err => {
      console.error('Error in GET /api/recipes/popular', err);
      res.sendStatus(500);
    });
});

router.get('/discover', rejectUnauthenticated, async (req, res) => {
  try {
    // GET current user's ingredients from Postgres
    const queryText = `
    SELECT ARRAY_AGG("apiString") AS "barIngredients"
    FROM "bar_ingredients"
    WHERE "userId" = $1;
  `
    const queryParams = [req.user.id];
    const dbRes = await pool.query(queryText, queryParams)
    const barIngredients = dbRes.rows[0].barIngredients;
    // Make 5 endpoints for 5 different random searches based on requesting user's bar ingredients
    // We make 5 to reduce chance of a search returning zero results
    // Then take the first response that has at least one recipe and send it to the client
    const randomArrays = [
      barIngredients.slice().sort(() => .5 - Math.random()),
      barIngredients.slice().sort(() => .5 - Math.random()),
      barIngredients.slice().sort(() => .5 - Math.random()),
      barIngredients.slice().sort(() => .5 - Math.random()),
      barIngredients.slice().sort(() => .5 - Math.random())
    ];
    const endpoints = randomArrays.map(arr => `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}/filter.php?i=${arr[0]},${arr[1]}`);

    const responsesAllData = await Promise.all(endpoints.map(endpoint => axios.get(endpoint)));

    const responses = responsesAllData.map(response => response.data.drinks);

    const recipesToSend = responses.find(response => Array.isArray(response));

    res.send(recipesToSend);
  }
  catch (err) {
    console.error('Error in GET /api/recipes/discover', err);
    res.sendStatus(500);
  }
});

module.exports = router;

