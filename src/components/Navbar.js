import React, { useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { setLoginStatus } from '../stores/blog';

const Navbar = () => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.blogReducer);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    dispatch(setLoginStatus(false));
  }, [dispatch])

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li>

        <li className="navbar__item">
          <Link to="/post" className="navbar__link">
            Posts
          </Link>
        </li>
        {loginStatus || localStorage.getItem('token') ? (
          <li className="navbar__item">
            <Link to="/create" className="navbar__link">
              Create Post
            </Link>
          </li>
        ) : (
          <li></li>
        )}
        <li className="navbar__item" title={loginStatus || localStorage.getItem('token')?localStorage.getItem('userEmail'):'Not logged in!'}>
          {loginStatus || localStorage.getItem('token') ? (
            <Link
              className="navbar__logout-button"
              onClick={handleLogout}
              to='/'
            >
              Log Out
            </Link>
          ) : (
            <Link to="/login" className="navbar__link">
              Log In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
