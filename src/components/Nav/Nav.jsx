import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

// Import SVG icons
import { ReactComponent as BarIcon } from '../../icons/glass-bottles.svg';
import { ReactComponent as SearchIcon } from '../../icons/search-line.svg';
import { ReactComponent as DiscoverIcon } from '../../icons/bulb.svg';
import { ReactComponent as PopularIcon } from '../../icons/popular.svg';
import { ReactComponent as RecipesIcon } from '../../icons/notebook.svg';
import { ReactComponent as BarbackerIcon } from '../../icons/barbacker.svg';

function Nav() {
  const user = useSelector((store) => store.user);

  // Set state variable
  const [selected, setSelected] = useState();

  return (
    <div className="nav">
      <Link to="/home">
        <img src="/barbacker.png" className="app-icon"/>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link
              className={selected === 'bar' ? "navLink currentUrl" : "navLink"}
              to="/bar"
              onClick={() => setSelected('bar')}
            >
              <BarIcon className="nav-icon" />
            </Link>

            <Link
              className={selected === 'search' ? "navLink currentUrl" : "navLink"}
              to="/search"
              onClick={() => setSelected('search')}
            >
              <SearchIcon className="nav-icon" />
            </Link>

            <Link
              className={selected === 'discover' ? "navLink currentUrl" : "navLink"}
              to="/discover"
              onClick={() => setSelected('discover')}
            >
              <DiscoverIcon className="nav-icon" />
            </Link>

            <Link
              className={selected === 'popular' ? "navLink currentUrl" : "navLink"}
              to="/popular"
              onClick={() => setSelected('popular')}
            >
              <PopularIcon className="nav-icon" />
            </Link>

            <Link
              className={selected === 'recipes' ? "navLink currentUrl" : "navLink"}
              to="/recipes"
              onClick={() => setSelected('recipes')}
            >
              <RecipesIcon className="nav-icon" />
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
