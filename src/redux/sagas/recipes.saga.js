import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* saveRecipe(action) {
    try {
        console.log('in saveRecipe', action.payload);
        // let response = yield axios.get();
        // api returns an array of objects with the first property being the string of the ingredient
        // We want only an array of ingredient strings, so use .map() to return an array of just the strings   
    }
    catch(err) {
        console.error('Error with saveRecipe:', err);
    } 
}


function* recipesSaga() {
    yield takeLatest('SAVE_RECIPE', saveRecipe);
}

export default recipesSaga;