import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarIngredient from './BarIngredient/BarIngredient';

// Material UI imports
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function BarPage() {

    // Store access, dispatch hook
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer);
    const barIngredients = useSelector(store => store.bar.userIngredientsReducer);
    const dispatch = useDispatch();

    // Set state variables
    const [ingredientInput, setIngredientInput] = useState([]);

    // Declare handleSubmit
    const handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit', ingredientInput);
        // Dispatch our submitted inputs to our Saga to POST to Postgres
        dispatch({
            type: 'POST_BAR_INGREDIENTS',
            payload: ingredientInput
        });
    }

    // Call getIngredients on component load
    useEffect(() => {
        // Get ingredients from API for add form
        // dispatch({ type: 'GET_INGREDIENTS' });
        // Get ingredients from Postgres for current user bar
        dispatch({ type: 'GET_BAR_INGREDIENTS' });
    }, []);

    // concurrent axios requests 
    // look into caching for using the requests
    // custom recipes could have no measures and just write them in instructions
    // ingredients should be a drpo down

    return (
        <div>
            <h3>Bar Page</h3>
            <form onSubmit={handleSubmit}>
                {/* Check if ingredients are pulled from api yet, if not then display loading ingredients... */}
                {Array.isArray(ingredients) ?
                    <Autocomplete
                        multiple
                        options={ingredients}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        onChange={(event, value) => setIngredientInput(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ingredients"
                                placeholder="Ingredients"
                            />
                        )}
                    />
                    : <p>Loading ingredients...</p>}
                <input type="submit" />
            </form>
            <h5> My Bar</h5>
            <ul>
                {Array.isArray(barIngredients) ?
                    barIngredients.map(ingredient => (
                        <BarIngredient ingredient={ingredient} key={ingredient.id} />
                    ))
                    : <li>Loading user ingredients...</li>
                }
            </ul>
        </div>
    )
}

export default BarPage;