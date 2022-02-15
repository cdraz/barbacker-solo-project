import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from '../RecipeCard/RecipeCard';

// Material UI imports
import Grid from '@mui/material/Grid';
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
    dispatch({ type: 'GET_BAR_INGREDIENTS' });
  }, []);

  return (
    <div className="container">
      <div>
        <h3>Search</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchInput">
            Search by ingredient
          </label>
          <input
            id="searchInput"
            type="text"
            onChange={handleChange}
            value={searchInput}
            placeholder="Ingredient name"
          />
          <input
            type="submit"
            value="Search"
          />
        </form>
      </div>
      <Grid container spacing={2}>
        {Array.isArray(searchResults) ?
          searchResults.map(recipe => (
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
