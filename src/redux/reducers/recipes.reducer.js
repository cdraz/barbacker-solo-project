import { combineReducers } from 'redux';

const savedReducer = ( state = [], action) => {
    switch (action.type) {
        case 'SET_SAVED_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

// Combine reducers and export
export default combineReducers({
    savedReducer
});