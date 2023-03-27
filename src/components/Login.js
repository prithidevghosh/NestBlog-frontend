import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

import "./Login.css";

const Login = ({ isLoggedin, setIsLoggedin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_LOGIN, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("userEmail", response.data.user.email);
        setIsLoggedin(!isLoggedin);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
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
            New user ?
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
