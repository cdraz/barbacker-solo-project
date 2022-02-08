import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI imports
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function BarPage() {

    // Store access, dispatch hook
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer);
    const dispatch = useDispatch();
    const userIngredients = ['Bourbon', 'Sugar', 'Sweet Vermouth']

    // Declare getIngredients
    const getIngredients = () => {
        dispatch({
            type: 'GET_INGREDIENTS'
        });
    }

    // Set state variable
    const [ formInput, setFormInput ] = useState([]);

    // Declare handleSubmit
    const handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit', formInput );
    }

    // Declare handleChange
    const handleChange = event => {
        console.log('in handleChange');
        // Turn our selected options into an array
        let array = [...event.target.selectedOptions]
        // Map our array to get the values for our form input
        setFormInput(array.map( option => (
            option.innerText
        )));
    }

    // Call getIngredients on component load
    // useEffect(() => {
    //     getIngredients();
    // }, []);

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
                {Array.isArray(userIngredients) ?
                userIngredients.map( ingredient => (
                    <li key={ingredient}> {ingredient} </li>
                ))
                : <li>Loading user ingredients...</li>
            }
            </ul>
        </div>
    )
}

export default BarPage;