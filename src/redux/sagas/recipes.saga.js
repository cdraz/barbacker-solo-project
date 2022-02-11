import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSavedRecipes() {
    try {
        console.log('in getSavedRecipes');
        // Get saved recipes from server
        const response = yield axios.get('/api/recipes');
        console.log('response is', response);
        // Map server response and only use data we need for dispatch to reducer
        const recipes = response.data.map( recipe => recipe.drinks[0]);
        yield put({
            type: 'SET_SAVED_RECIPES',
            payload: recipes
        });
    }
    catch(err) {
        console.error('Error in getSavedRecipes', err);
    }
}

function* saveRecipe(action) {
    try {
        console.log('in saveRecipe', action.payload);
        yield axios.post('/api/recipes', { id: action.payload });
    }
    catch(err) {
        console.error('Error with saveRecipe:', err);
    } 
}

function* removeRecipe(action) {
    try {
        console.log('in removeRecipe', action.payload);
        yield axios.delete(`/api/recipes/${action.payload}`);
        yield put({
            type: 'GET_SAVED_RECIPES'
        });
    }
    catch(err) {
        console.error('Error with saveRecipe:', err);
    } 
}


function* recipesSaga() {
    yield takeLatest('GET_SAVED_RECIPES', getSavedRecipes);
    yield takeLatest('REMOVE_RECIPE', removeRecipe);
    yield takeLatest('SAVE_RECIPE', saveRecipe);
}

export default recipesSaga;