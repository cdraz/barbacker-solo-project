import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';

// Material UI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function SearchPage() {

  // Dispatch hook, store access
  const dispatch = useDispatch();
  const discoverResults = useSelector(store => store.cocktaildb.discoverResultsReducer);
  const barIngredients = useSelector(store => store.bar.userIngredientsReducer);
  const bar = useSelector(store => store.bar.userIngredientsReducer);


  // Declare handleSubmit
  const handleClick = event => {
    event.preventDefault();
    console.log('in handleClick');
    console.log(barIngredients);
    // TODO: get two random ingredients from bar
    let array = barIngredients
    const random = array.sort(() => .5 - Math.random()).slice(0, 2);
    dispatch({
      type: 'GET_DISCOVER_RESULTS',
      payload: `${random[0].apiString},${random[1].apiString}`
    });
  }

  // Get bar ingredients on component load
  useEffect(() => {
    dispatch({ type: 'GET_BAR_INGREDIENTS' });
  }, []);

  return (
    <div className="container">
      <div>
        <h3>Discover</h3>
      </div>
      <Button
        variant="contained"
        onClick={handleClick}
      >
        Show Me Recipes
      </Button>
      <Grid container spacing={2}>
        {Array.isArray(discoverResults) ?
          discoverResults.map(recipe => (
            <Grid item xs={6}>
              <RecipeCard key={recipe.id} recipe={recipe} bar={bar} />
            </Grid>
          ))
          : <Typography component="p">No results to display.</Typography>}
      </Grid>
    </div>
  );
}

export default SearchPage;
