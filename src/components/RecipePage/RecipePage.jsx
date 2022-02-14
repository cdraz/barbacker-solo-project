import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import AddRecipeButton from '../AddRecipeButton/AddRecipeButton';
import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';

// Material UI imports
import Grid from '@mui/material/Grid';

function RecipePage() {

  // Dispatch hook
  const dispatch = useDispatch();
  const savedRecipes = useSelector(store => store.recipes.savedReducer);
  const userRecipes = useSelector(store => store.recipes.userRecipeReducer);
  const bar = useSelector(store => store.bar.userIngredientsReducer);

  useEffect(() => {
    dispatch({ type: 'GET_SAVED_RECIPES' });
    dispatch({ type: 'GET_USER_RECIPES'});
    dispatch({ type: 'GET_BAR_INGREDIENTS' });
  }, []);
  
  return (
    <div className="container">
      <AddRecipeButton />
      <h5>Saved Recipes</h5>
      <Grid container>
        { Array.isArray(savedRecipes) ?
          savedRecipes.map( recipe => (
          <RecipeCard key={recipe.idDrink} recipe={recipe} bar={bar}/>
        ))
            : <Typography component="p">Loading recipes...</Typography>
        }
      </Grid>
      <h5>My Recipes</h5>
      <Grid container>
        { Array.isArray(userRecipes) ?
          userRecipes.map( recipe => (
            <UserRecipeCard key={recipe.id} recipe={recipe} bar={bar}/>
          ))
            : <Typography component="p">Loading recipes...</Typography>
        }
      </Grid>
    </div>
  );
}

export default RecipePage;
