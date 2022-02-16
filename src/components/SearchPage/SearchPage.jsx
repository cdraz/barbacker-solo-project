import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';

// Material UI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function SearchPage() {

  // Dispatch hook, store access
  const dispatch = useDispatch();
  const searchResults = useSelector(store => store.cocktaildb.searchResultsReducer);
  const bar = useSelector(store => store.bar.userIngredientsReducer);

  // Set state variable for search input
  const [searchInput, setSearchInput] = useState('');

  // Declare handleChange
  const handleChange = event => {
    console.log('in handleChange');
    setSearchInput(event.target.value);
  }

  // Declare handleSubmit
  const handleSubmit = event => {
    event.preventDefault();
    console.log('searchInput is:', searchInput);
    dispatch({
      type: 'GET_SEARCH_RESULTS',
      payload: searchInput
    });
  }

  useEffect(() => {
    // Get bar ingredients
    dispatch({ type: 'GET_BAR_INGREDIENTS' });
  }, []);

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={8}>
              <TextField
                id="searchInput"
                variant="outlined"
                label="Search by ingredient"
                onChange={handleChange}
                value={searchInput}
                placeholder="Ingredient name"
                sx={{ display: 'flex' }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                value="Search"
                variant="contained"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Grid container spacing={2}>
        {Array.isArray(searchResults) ?
          searchResults.map(recipe => (
            <Grid item xs={6} key={recipe.idDrink + 'grid'}>
              <RecipeCard key={recipe.idDrink} recipe={recipe} bar={bar} />
            </Grid>
          ))
          : <Typography component="p">No results to display.</Typography>}
      </Grid>
    </div>
  );
}

export default SearchPage;
