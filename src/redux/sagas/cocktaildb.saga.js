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

// getSearchResults will send requests to server asking for search results from cocktaildb api
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
    yield takeLatest('GET_SEARCH_RESULTS', getSearchResults);
}

export default cocktaildbSaga;