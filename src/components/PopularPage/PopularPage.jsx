import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';

// Material UI imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function PopularPage() {

  // Dispatch hook, store access
  const dispatch = useDispatch();
  const popularRecipes = useSelector(store => store.cocktaildb.popularReducer);
  const bar = useSelector(store => store.bar.userIngredientsReducer);

  useEffect(() => {
    dispatch({ type: 'GET_BAR_INGREDIENTS' });
  }, []);

  return (
    <div className="container">
      <Grid container spacing={2}>
        {Array.isArray(popularRecipes) ?
          popularRecipes.map(recipe => (
            <Grid item xs={6}>
              <RecipeCard key={recipe.id} recipe={recipe} bar={bar} />
            </Grid>
          ))
          : <Typography component="p">No results to display.</Typography>}
      </Grid>
    </div>
  );
}

export default PopularPage;
