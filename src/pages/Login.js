import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../stores/blog';

import Loading from "../components/Loading";



const Login = () => {
  const navigate = useNavigate();
  const {loginStatus,loading} = useSelector((state)=> state.blogReducer);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({
      email: email,
      password: password,
    }))
  };

  if(loginStatus){
    navigate('/');
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-form__label label-input" name="email">
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
        <label className="login-form__label label-input" name="password">
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
        <div className="login-form__button button">
          <button className="button__login" type={"submit"} disabled={loading}>
            {loading ? <Loading /> : "Login"}
          </button>
        </div>
        <div className="login-form__signup">
          <p>
            New user ?{" "}
            <span>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
