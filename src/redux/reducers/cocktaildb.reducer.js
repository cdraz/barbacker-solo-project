import { combineReducers } from 'redux';

// ingredientsReducer will hold all ingredients from cocktaildb api
// and will be used for adding ingredients to user's bar
const ingredientsReducer = ( state = ['Bourbon', 'Angostura Bitters', 'Sweet Vermouth', 'Sugar', 'Orange'], action ) => {
    switch (action.type) {
        case 'SET_INGREDIENTS':
            return action.payload;
        default:
            return state;
    };
};

// searchResultsReducer will hold drink recipe results from cocktaildb api
// will be rendered on search page
const searchResultsReducer = ( state = [], action ) => {
    switch(action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    };
};

// detailsReducer will hold the details of the currently selected cocktail recipe from cocktaildb api
const detailsReducer = ( state = {}, action ) => {
    switch(action.type) {
        case 'SET_SELECTED_RECIPE_DETAIL':
            return action.payload;
        default:
            return state;
    };
};

// Combine reducers and export
export default combineReducers({
    detailsReducer,
    ingredientsReducer,
    searchResultsReducer,
});