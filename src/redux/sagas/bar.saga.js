import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteBarIngredient(action) {
    try {
        // Delete request and send id as parameter
        yield axios.delete(`/api/bar/${action.payload}`);
        // After delete, get bar ingredients
        yield put({
            type: 'GET_BAR_INGREDIENTS'
        });
    }
    catch(err) {
        console.error('Error with deleteBarIngredient', err);
    }
}

function* getBarIngredients() {
    try {
        let response = yield axios.get('/api/bar');
        yield put({
            type: 'SET_BAR_INGREDIENTS',
            payload: response.data
        });
    }
    catch(err) {
        console.error('Error with getBarIngredients', err);
    }
}

function* postBarIngredients(action) {
    try {
        let response = yield axios.post('/api/bar', action.payload);
        // api returns an array of objects with the first property being the string of the ingredient
        // We want only an array of ingredient strings, so use .map() to return an array of just the strings    
        yield put({
            type: 'GET_BAR_INGREDIENTS',
        });
    }
    catch(err) {
        console.error('Error with postBarIngredients:', err);
    } 
}

function* barSaga() {
    yield takeLatest('DELETE_BAR_INGREDIENT', deleteBarIngredient);
    yield takeLatest('GET_BAR_INGREDIENTS', getBarIngredients);
    yield takeLatest('POST_BAR_INGREDIENTS', postBarIngredients);
}

export default barSaga;