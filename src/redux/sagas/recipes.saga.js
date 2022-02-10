import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSavedRecipes() {
    try {
        console.log('in getSavedRecipes');
        let response = yield axios.get('/api/recipes');
        yield put({
            type: 'SET_SAVED_RECIPES',
            payload: response.data
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
        // api returns an array of objects with the first property being the string of the ingredient
        // We want only an array of ingredient strings, so use .map() to return an array of just the strings   
    }
    catch(err) {
        console.error('Error with saveRecipe:', err);
    } 
}


function* recipesSaga() {
    yield takeLatest('GET_SAVED_RECIPES', getSavedRecipes);
    yield takeLatest('SAVE_RECIPE', saveRecipe);``
}

export default recipesSaga;