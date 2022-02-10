import { combineReducers } from 'redux';

const userIngredientsReducer = ( state = [], action) => {
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