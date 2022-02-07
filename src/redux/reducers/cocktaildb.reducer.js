import { combineReducers } from 'redux';

// ingredientsReducer will hold all ingredients from api
// and will be used for adding ingredients to user's bar
const ingredientsReducer = ( state = [{ strIngredient1: '' }], action) => {
    console.log('in ingredientsReducer');
    switch (action.type) {
        case 'SET_INGREDIENTS':
            return action.payload;
        default:
            return state;
    }
};


// Combine reducers and export
export default combineReducers({
    ingredientsReducer
});