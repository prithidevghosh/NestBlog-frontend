import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getQuotes } from '../stores/quote';

import { setLoginStatus } from '../stores/blog';

const Home = () => {
  const dispatch = useDispatch()
  const { quote, author } = useSelector(state => state.quoteReducer)

  useEffect(() => {
    localStorage.getItem('token') &&
      dispatch(setLoginStatus(true));
    dispatch(getQuotes());
  }, [dispatch]);

  return (
    <div className="welcome_container">
      <h1>{"Welcome to Blog"}</h1>
      <h2>{quote}</h2>
      <h3>- {author}</h3>
    </div>
  );
};

export default Home;
