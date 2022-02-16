import { combineReducers } from 'redux';

const savedReducer = ( state = [], action) => {
    switch (action.type) {
        case 'SET_SAVED_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

const userRecipeReducer = ( state = [], action) => {
    switch (action.type) {
        case 'SET_USER_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

const popularReducer = ( state = [], action) => {
    switch (action.type) {
        case 'SET_POPULAR_RECIPES':
            return action.payload;
        default:
            return state;
    }
}

// Combine reducers and export
export default combineReducers({
    popularReducer,
    savedReducer,
    userRecipeReducer
});