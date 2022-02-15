import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import SearchPage from '../SearchPage/SearchPage';
import BarPage from '../BarPage/BarPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../DiscoverPage/DiscoverPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RecipePage from '../RecipePage/RecipePage';
import RegisterPage from '../RegisterPage/RegisterPage';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  // On App load, get ingredients from cocktaildb api and store in redux
  // These ingredients are used in our bar page and our recipes page
  useEffect(() => {
    dispatch({ type: 'GET_INGREDIENTS' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#492748',
      },
      secondary: {
        main: '#FAED26',
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <div id="currentLocation">
            <Route exact path="/bar">My Bar</Route>
            <Route exact path="/search">Search</Route>
            <Route exact path="/discover">Discover</Route>
            <Route exact path="/recipes">Recipes</Route>
          </div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <ProtectedRoute
              // shows SearchPage if logged in
              exact
              path="/search"
            >
              <SearchPage />
            </ProtectedRoute>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows DiscoverPage else shows LoginPage
              exact
              path="/discover"
            >
              <InfoPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows RecipePage else shows LoginPage
              exact
              path="/recipes"
            >
              <RecipePage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            <ProtectedRoute
              exact
              path="/bar">

              <BarPage />

            </ProtectedRoute>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
