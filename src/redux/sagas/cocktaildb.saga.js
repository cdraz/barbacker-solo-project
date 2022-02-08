import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIngredients() {
    try {
        let response = yield axios.get('/api/ingredient');
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

function* cocktaildbSaga() {
    yield takeLatest('GET_INGREDIENTS', getIngredients);
}

export default cocktaildbSaga;