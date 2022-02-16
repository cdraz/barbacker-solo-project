import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  // Set state variable
  const [selected, setSelected] = useState();

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">🍸</h2>
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
              <img src="https://cdn-icons-png.flaticon.com/512/3184/3184586.png" alt="bar-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link
              className={selected === 'search' ? "navLink currentUrl" : "navLink"}
              to="/search"
              onClick={() => setSelected('search')}
            >
              <img src="https://cdn-icons.flaticon.com/png/512/2652/premium/2652234.png?token=exp=1644421700~hmac=a7fad12441d1ace590a63dc4a40194fc" alt="search-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link
              className={selected === 'discover' ? "navLink currentUrl" : "navLink"}
              to="/discover"
              onClick={() => setSelected('discover')}
            >
              <img src="https://cdn-icons.flaticon.com/png/512/566/premium/566359.png?token=exp=1644421625~hmac=a439ff45497066c0277e85cbfe7fb4cc" alt="idea-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link
              className={selected === 'popular' ? "navLink currentUrl" : "navLink"}
              to="/popular"
              onClick={() => setSelected('popular')}
            >
              <img src="https://cdn-icons.flaticon.com/png/512/4801/premium/4801603.png?token=exp=1645025506~hmac=564c4b18998b1cf234b4054a0cc49d21" alt="idea-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link
              className={selected === 'recipes' ? "navLink currentUrl" : "navLink"}
              to="/recipes"
              onClick={() => setSelected('recipes')}
            >
              <img src="https://cdn-icons.flaticon.com/png/512/3438/premium/3438070.png?token=exp=1644421926~hmac=5e7aaec51310284fa64da69ad339b478" alt="recipe-book-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
