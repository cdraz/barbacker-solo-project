import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIngredientsButton from './AddIngredientsButton/AddIngredientsButton';
import BarIngredient from './BarIngredient/BarIngredient';

// Material UI imports

function BarPage() {

    // Store access, dispatch hook
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
        dispatch({ type: 'GET_INGREDIENTS' });
        // Get ingredients from Postgres for current user bar
        dispatch({ type: 'GET_BAR_INGREDIENTS' });
    }, []);

    return (
        <div>
            <AddIngredientsButton />
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