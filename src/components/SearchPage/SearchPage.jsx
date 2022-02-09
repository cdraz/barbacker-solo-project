import { useState } from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function SearchPage() {

  // Set state variable for search input
  const [searchInput, setSearchInput] = useState('');

  // Declare handleChange
  const handleChange = event => {
    console.log('in handleChange');
    setSearchInput(event.target.value);
  }

  // Declare handleSubmit
  const handleSubmit = event => {
    event.preventDefault();
    console.log('searchInput is:', searchInput);
  }

  return (
    <div className="container">
      <div>
        <h3>Search</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchInput">
            Search by ingredient
          </label>
          <input
            id="searchInput"
            type="text"
            onChange={handleChange}
            value={searchInput}
            placeholder="Ingredient name"
          />
          <input
            type="submit"
            value="Search"
          />
        </form>
      </div>
    </div>
  );
}

export default SearchPage;
