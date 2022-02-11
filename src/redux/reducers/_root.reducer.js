import { combineReducers } from 'redux';
import bar from './bar.reducer';
import errors from './errors.reducer';
import user from './user.reducer';
import cocktaildb from './cocktaildb.reducer';
import recipes from './recipes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  bar, // contains current user's ingredients that are in their bar
  cocktaildb, // contains results sent from third party api
  errors, // contains registrationMessage and loginMessage
  recipes, // Contains saved recipes and custom user recipes
  user, // will have an id and username if someone is logged in
});

export default rootReducer;
