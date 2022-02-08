import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postBarIngredients(action) {
    try {
        let response = yield axios.post('/api/bar', action.payload);
        // api returns an array of objects with the first property being the string of the ingredient
        // We want only an array of ingredient strings, so use .map() to return an array of just the strings    
        // let payload = response.data.map( function(obj){
        //     return obj.strIngredient1;
        // })
        // yield put({
        //     type: 'SET_USER_INGREDIENTS',
        //     payload: payload
        // });
    }
    catch(err) {
        console.error('Error with postBarIngredients:', err);
    } 
}

function* barSaga() {
    yield takeLatest('POST_BAR_INGREDIENTS', postBarIngredients);
}

export default barSaga;