import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function BarPage() {

    // Store access, dispatch hook
    const ingredients = useSelector(store => store.ingredientsReducer);
    const dispatch = useDispatch();

    // Declare onGetIngredients
    const onGetIngredients = () => {
        dispatch({
            type: 'GET_INGREDIENTS'
        });
    }
    return (
        <div>
        <h3>Bar Page</h3>
        <button onClick={onGetIngredients}>Get ingredients</button>
        <select>
            
        </select>
        </div>
    )
}

export default BarPage;