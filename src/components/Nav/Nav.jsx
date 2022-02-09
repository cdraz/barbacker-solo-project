import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

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
            <Link className="navLink" to="/bar">
              <img src="https://cdn-icons-png.flaticon.com/512/3184/3184586.png" alt="bar-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link className="navLink" to="/search">
              <img src="https://cdn-icons.flaticon.com/png/512/2652/premium/2652234.png?token=exp=1644421700~hmac=a7fad12441d1ace590a63dc4a40194fc" alt="search-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link className="navLink" to="/discover">
              <img src="https://cdn-icons.flaticon.com/png/512/566/premium/566359.png?token=exp=1644421625~hmac=a439ff45497066c0277e85cbfe7fb4cc" alt="idea-icon" style={{ height: 30, width: 30 }} />
            </Link>

            <Link className="navLink" to="/recipes">
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
