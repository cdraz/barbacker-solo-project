import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIngredients() {
    try {
        let response = yield axios.get('/api/ingredients');
        // api returns an array of objects with the first property being the string of the ingredient
        // We want only an array of ingredient strings, so use .map() to return an array of just the strings    
        let payload = response.data.map( function(obj){
            return obj.strIngredient1;
        })
        yield put({
            type: 'SET_INGREDIENTS',
            payload: payload
        });
    }
    catch(err) {
        console.error('Error with get ingredients:', err);
    } 
}

// getDiscoverResults sends request to server asking for results from cocktaildb api
// based on query sent from client
function* getDiscoverResults(action) {
    console.log('in getDiscoverResults');
    try {
       let response = yield axios.get(`/api/recipes/search/${action.payload}`);
       yield put({
           type: 'SET_DISCOVER_RESULTS',
           // We only want the array of drinks that are returned so set those as state
           payload: response.data.drinks
       });
    }
    catch(err) {
        console.error('Error with getDiscoverResults:', err);
    }
}

// getRecipeDetails sends request to server asking for full recipe details from cocktaildb api
function* getRecipeDetails(action) {
    console.log('in getRecipeDetails');
    try {
        let response = yield axios.get(`/api/recipes/detail/${action.payload}`);
        yield put({
            type: 'SET_SELECTED_RECIPE_DETAIL',
            payload: response.data.drinks[0]
        })
    }
    catch(err) {
        console.error('Error with getRecipeDetails:', err);
    }
}

// getSearchResults sends request to server asking for search results from cocktaildb api
// based on query sent from client
function* getSearchResults(action) {
    console.log('in getSearchResults');
    try {
       let response = yield axios.get(`/api/recipes/search/${action.payload}`);
       yield put({
           type: 'SET_SEARCH_RESULTS',
           // We only want the array of drinks that are returned so set those as state
           payload: response.data.drinks
       });
    }
    catch(err) {
        console.error('Error with getSearchResults:', err);
    }
}

function* cocktaildbSaga() {
    yield takeLatest('GET_INGREDIENTS', getIngredients);
    yield takeLatest('GET_DISCOVER_RESULTS', getDiscoverResults);
    yield takeLatest('GET_SELECTED_RECIPE_DETAIL', getRecipeDetails);
    yield takeLatest('GET_SEARCH_RESULTS', getSearchResults);
}

export default cocktaildbSaga;