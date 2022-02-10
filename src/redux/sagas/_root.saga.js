import { all } from 'redux-saga/effects';
import barSaga from './bar.saga';
import cocktaildbSaga from './cocktaildb.saga';
import loginSaga from './login.saga';
import recipesSaga from './recipes.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    barSaga(),
    cocktaildbSaga(),
    loginSaga(), // login saga is now registered
    recipesSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
  