import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [thought, setThought] = useState(
    "Genius is one percent inspiration and ninety-nine percent perspiration."
  );
  const [author, setAuthor] = useState("Thomas Edison");
  console.log(thought, author);
  console.log(process.env.REACT_APP_QUOTE);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_QUOTE)
      .then((res) => {
        setAuthor(res.data.author);
        setThought(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="welcome_container">
      <h1>{"Welcome to Blog"}</h1>
      <h2>{thought}</h2>
      <h3>- {author}</h3>
    </div>
  );
};

export default Home;
