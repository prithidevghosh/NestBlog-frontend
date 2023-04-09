import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './stores';

import {
  Signup, Login, Home, Post, Create
} from './pages';
import Navbar from "./components/Navbar";
import "./index.css"

const App = () => {
  return (
    <Provider store={store}>
      <Navbar  />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login  />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </Provider>
  );
};

export default App;
