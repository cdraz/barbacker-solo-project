import { combineReducers } from 'redux';

const userIngredientsReducer = ( state = [], action) => {
    console.log('in userIngredientsReducer');
    switch (action.type) {
        case 'SET_BAR_INGREDIENTS':
            return action.payload;
        default:
            return state;
    }
};

// Combine reducers and export
export default combineReducers({
    userIngredientsReducer
});