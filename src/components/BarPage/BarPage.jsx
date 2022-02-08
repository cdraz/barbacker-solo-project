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
    const [formInput, setFormInput] = useState([]);

    // Declare handleSubmit
    const handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit', formInput);
        // Dispatch our submitted inputs to our Saga to POST to Postgres
        dispatch({
            type: 'POST_BAR_INGREDIENTS',
            payload: formInput
        });
    }

    // Declare handleChange
    const handleChange = event => {
        console.log('in handleChange');
        // Turn our selected options into an array
        let array = [...event.target.selectedOptions]
        // Map our array to get the values for our form input
        setFormInput(array.map(option => (
            option.innerText
        )));
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
                    <select multiple style={{ height: '200px' }} onChange={handleChange}>
                        {ingredients.map(ingredient => (
                            <option value={ingredient} key={ingredient}>
                                {ingredient}
                            </option>
                        ))}
                    </select>
                    : <p>Loading ingredients...</p>}
                <input type="submit" />
            </form>
            <h5> My Bar</h5>
            <ul>
                {Array.isArray(barIngredients) ?
                    barIngredients.map(ingredient => (
                        <BarIngredient ingredient={ingredient} key={ingredient.id}/>
                    ))
                    : <li>Loading user ingredients...</li>
                }
            </ul>
        </div>
    )
}

export default BarPage;