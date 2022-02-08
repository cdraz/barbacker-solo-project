import { combineReducers } from 'redux';

// ingredientsReducer will hold all ingredients from api
// and will be used for adding ingredients to user's bar
const ingredientsReducer = ( state = ['Bourbon', 'Angostura Bitters', 'Sweet Vermouth', 'Sugar', 'Orange'], action) => {
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