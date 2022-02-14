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

// discoverResultsReducer will hold drink recipe results from cocktaildb api
// Will be rednered on discover page
const discoverResultsReducer = ( state = [], action ) => {
    switch(action.type) {
        case 'SET_DISCOVER_RESULTS':
            return action.payload;
        default:
            return state;
    };
};

// detailsReducer will hold the details of the currently selected cocktail recipe from cocktaildb api
const detailsReducer = ( state = { fullDetails: {}, ingredients: [] }, action ) => {
    switch(action.type) {
        case 'SET_SELECTED_RECIPE_DETAIL':
            return {
                fullDetails: action.payload,
                ingredients: [
                    { i: action.payload.strIngredient1, m: action.payload.strMeasure1 },
                    { i: action.payload.strIngredient2, m: action.payload.strMeasure2 },
                    { i: action.payload.strIngredient3, m: action.payload.strMeasure3 },
                    { i: action.payload.strIngredient4, m: action.payload.strMeasure4 },
                    { i: action.payload.strIngredient5, m: action.payload.strMeasure5 },
                    { i: action.payload.strIngredient6, m: action.payload.strMeasure6 },
                    { i: action.payload.strIngredient7, m: action.payload.strMeasure7 },
                    { i: action.payload.strIngredient8, m: action.payload.strMeasure8 },
                    { i: action.payload.strIngredient9, m: action.payload.strMeasure9 },
                    { i: action.payload.strIngredient10, m: action.payload.strMeasure10 },
                    { i: action.payload.strIngredient11, m: action.payload.strMeasure11 },
                    { i: action.payload.strIngredient12, m: action.payload.strMeasure12 },
                    { i: action.payload.strIngredient13, m: action.payload.strMeasure13 },
                    { i: action.payload.strIngredient14, m: action.payload.strMeasure14 },
                    { i: action.payload.strIngredient15, m: action.payload.strMeasure15 }
                ]
            };
        default:
            return state;
    };
};

// Combine reducers and export
export default combineReducers({
    detailsReducer,
    discoverResultsReducer,
    ingredientsReducer,
    searchResultsReducer,
});