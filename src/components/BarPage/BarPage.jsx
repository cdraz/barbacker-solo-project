import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function BarPage() {

    // Store access, dispatch hook
    const ingredients = useSelector(store => store.cocktaildb.ingredientsReducer.data);
    const dispatch = useDispatch();

    // Declare getIngredients
    const getIngredients = () => {
        dispatch({
            type: 'GET_INGREDIENTS'
        });
    }

    // Call getIngredients on component load
    useEffect(() => {
        getIngredients();
    }, []);

    return (
        <div>
            <h3>Bar Page</h3>
            
                    { Array.isArray(ingredients) ? 
                    <select>
                        {ingredients.map(ingredient => (
                            <option value={ingredient.strIngredient1}>
                                {ingredient.strIngredient1}
                            </option>
                        ))}
                    </select>
                    : <p>Loading ingredients...</p>}
            
        </div>
    )
}

export default BarPage;