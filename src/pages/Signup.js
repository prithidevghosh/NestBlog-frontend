import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { signUp } from '../stores/blog';
import Loading from "../components/Loading";
import { useDispatch } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blogReducer)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");


  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignup = useCallback((e) => {
    e.preventDefault();

    dispatch(signUp({
      name: displayName,
      username: username,
      password: password,
      email: email,
    })).then(() => {
      navigate("/login");
    }).catch((error) => {
      console.log(error);
    });
  }, [dispatch, displayName, email, navigate, password, username]);

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSignup}>
        <label className="signup-form__label label-input" name="displayName">
          <span className="label-input__label">Name:</span>
          <input
            className="label-input__displayName"
            name="displayName"
            placeholder="Enter your name"
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label className="signup-form__label label-input" name="username">
          <span className="label-input__label">Username:</span>
          <input
            className="label-input__username"
            name="username"
            placeholder="Enter your name"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="signup-form__label label-input" name="email">
          <span className="label-input__label">Email:</span>
          <input
            className="label-input__email"
            name="email"
            placeholder="Enter email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="signup-form__label label-input" name="password">
          <span className="label-input__label">Password:</span>
          <input
            className="label-input__password"
            name="password"
            required
            type={"password"}
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="signup-form__button button">
          <button disabled={loading} className="button__signup" type={"submit"}>
            {loading ? <Loading /> : "Sign up"}
          </button>
        </div>
        <div className="signup-form__signup">
          <p>
            Already user ?{" "}
            <span>
              <Link className="login" to="/login">
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
