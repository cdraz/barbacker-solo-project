# Barbacker

## Description

This is a full-stack single page web application that allows users to keep track of their home bar and browse and save cocktail recipes. Users are able to add and remove ingredients from their bar, and browse various cocktail recipes provided by TheCocktailDB. The app will tell the user which ingredients they have and which they are missing for each recipe. The app also provides a feature that suggests recipes to the user based on ingredients they currently have on hand.

Users are also able to upload custom recipes should they have ones they want to keep track of that are not recorded in the database of the third party API.

This app is currently designed for mobile web browsing. For the best experience, we recommend viewing it on a mobile device. Responsive design is planned for the future that will improve usability on larger devices.

## Installation & Usage

You will need node to run this application, as well as an API key from TheCocktailDB (https://www.thecocktaildb.com/).

Fork and clone this repo, and run "npm install" to install dependencies.

You will need your API key as an environment variable to access ingredients and recipes.

Using the "database.sql" file, set up your database using a Postgres GUI like Postico.

Run "npm run server" and "npm run client" to boot up the application, then navigate to localhost:5000 in a web browser to access it.

## Technologies

- React
- Redux
- Redux-Saga
- Postgres
- Node.js
- Axios
- Passport.js
- Express
- Material-UI
- Languages used: JavaScript, JSX, SQL, HTML, CSS

## Contributors

[Chris Razidlo](https://github.com/cdraz)
