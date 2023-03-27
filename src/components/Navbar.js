import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedin, setIsLoggedin }) => {
  const navigate = useNavigate();

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
        {!isLoggedin ? (
          <li className="navbar__item">
            <Link to="/create" className="navbar__link">
              Create Post
            </Link>
          </li>
        ) : (
          <li></li>
        )}
        <li className="navbar__item">
          {!isLoggedin ? (
            <button
              className="navbar__logout-button"
              onClick={() => {
                setIsLoggedin(!isLoggedin);
                localStorage.clear();
                navigate("/");
              }}
            >
              Log out
            </button>
          ) : (
            <Link to="/login" className="navbar__link">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
