import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import AddRecipeButton from '../AddRecipeButton/AddRecipeButton';
import UserRecipeCard from '../UserRecipeCard/UserRecipeCard';

// Material UI imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function RecipePage() {

  // Dispatch hook
  const dispatch = useDispatch();
  const savedRecipes = useSelector(store => store.recipes.savedReducer);
  const userRecipes = useSelector(store => store.recipes.userRecipeReducer);
  const bar = useSelector(store => store.bar.userIngredientsReducer);

  useEffect(() => {
    dispatch({ type: 'GET_SAVED_RECIPES' });
    dispatch({ type: 'GET_USER_RECIPES' });
    dispatch({ type: 'GET_BAR_INGREDIENTS' });
  }, []);

  return (
    <div className="container">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="h3">
            Saved Recipes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Array.isArray(savedRecipes) ?
              savedRecipes.map(recipe => (
                <Grid item xs={6}>
                  <RecipeCard key={recipe.idDrink} recipe={recipe} bar={bar} />
                </Grid>
              ))
              : <Typography component="p">Loading recipes...</Typography>
            }
          </Grid>
        </AccordionDetails>
      </Accordion>
      <br></br>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="h3">
            My Recipes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AddRecipeButton />
            </Grid>
            {Array.isArray(userRecipes) ?
              userRecipes.map(recipe => (
                <Grid item xs={6}>
                  <UserRecipeCard key={recipe.id} recipe={recipe} bar={bar} />
                </Grid>
              ))
              : <Typography component="p">Loading recipes...</Typography>
            }
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default RecipePage;
