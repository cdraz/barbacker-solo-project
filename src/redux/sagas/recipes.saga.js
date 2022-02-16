import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSavedRecipes() {
    try {
        console.log('in getSavedRecipes');
        // Get saved recipes from server
        const response = yield axios.get('/api/recipes');
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

function* getUserRecipes() {
    try {
        console.log('in getUserRecipes');
        // Get custom user recipes from server
        const response = yield axios.get('api/recipes/custom');
        yield put({
            type: 'SET_USER_RECIPES',
            payload: response.data
        });
    }
    catch(err) {
        console.error('Error in getUserRecipes', err);
    }
}

function* postUserRecipe(action) {
    try {
        console.log('in postUserRecipe');
        yield axios.post('/api/recipes/custom', action.payload);
        yield put({
            type: 'GET_USER_RECIPES'
        });
    }
    catch(err) {
        console.error('Error in postUserRecipe', err);
    }
}

function* deleteUserRecipe(action) {
    try {
        console.log('in deleteUserRecipe');
        yield axios.delete(`/api/recipes/custom/${action.payload}/delete`);
        yield put({
            type: 'GET_USER_RECIPES'
        });
    }
    catch(err) {
        console.error('Error in deleteUserRecipe', err);
    }
}
function* updateUserRecipe(action) {
    try {
        console.log('in updateUserRecipe');
        yield axios.put(`/api/recipes/custom/${action.payload.id}/edit`, action.payload);
        yield put({
            type: 'GET_USER_RECIPES'
        });
    }
    catch(err) {
        console.error('Error in updateUserRecipe', err);
    }
}

function* getPopularRecipes() {
    try {
        console.log('in getPopularRecipes');
        yield axios.get('/api/recipes/popular');
        yield put({
            type: 'SET_POPULAR_RECIPES'
        });
    }
    catch(err) {
        console.error('Error in getPopularRecipes', err);
    }
}

function* recipesSaga() {
    yield takeLatest('GET_SAVED_RECIPES', getSavedRecipes);
    yield takeLatest('GET_USER_RECIPES', getUserRecipes);
    yield takeLatest('DELETE_USER_RECIPE', deleteUserRecipe);
    yield takeLatest('POST_USER_RECIPE', postUserRecipe);
    yield takeLatest('UPDATE_USER_RECIPE', updateUserRecipe);
    yield takeLatest('REMOVE_RECIPE', removeRecipe);
    yield takeLatest('SAVE_RECIPE', saveRecipe);
    yield takeLatest('GET_POPULAR_RECIPES', getPopularRecipes);
}

export default recipesSaga;