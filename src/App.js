import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Signup from "./components/Signup";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Navbar isLoggedin={isLogin} setIsLoggedin={setIsLogin} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login isLoggedin={isLogin} setIsLoggedin={setIsLogin} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </>
  );
};

export default App;
