import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIngredients() {
    try {
        let response = yield axios.get('/api/ingredient');
        yield put({
            type: 'SET_INGREDIENTS',
            payload: response
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