import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';

// Material UI imports
import Grid from '@mui/material/Grid';

function RecipePage() {

  // Dispatch hook
  const dispatch = useDispatch();
  const savedRecipes = useSelector(store => store.recipes.savedReducer);

  useEffect(() => {
    dispatch({ type: 'GET_SAVED_RECIPES' });
  }, []);
  

  return (
    <div className="container">
      <button onClick={() => console.log('savedRecipes:', savedRecipes)}>Log saved</button>
      <Grid container>
        { Array.isArray(savedRecipes) ?
          savedRecipes.map( recipe => (
          <RecipeCard recipe={recipe} />
        ))
            : <p>Loading recipes...</p>
        }
      </Grid>
    </div>
  );
}

export default RecipePage;
