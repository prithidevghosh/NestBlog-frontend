import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // handle form submission
    axios
      .post(
        process.env.REACT_APP_POST_CREATE_GET_UPDATE,
        {
          title,
          description,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        navigate("/post");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="create_container">
      <form className="PostForm" onSubmit={handleSubmit}>
        <div className="PostForm__field">
          <label className="PostForm__label" htmlFor="title">
            Title
          </label>
          <input
            className="PostForm__input"
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="PostForm__field">
          <label className="PostForm__label" htmlFor="description">
            Description
          </label>
          <input
            className="PostForm__input"
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="PostForm__field">
          <label className="PostForm__label" htmlFor="body">
            Body
          </label>
          <textarea
            className="PostForm__textarea"
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
        <button className="PostForm__submit" type="submit">
          {!loading ? "Create Post" : "Posting Blog"}
        </button>
      </form>
    </div>
  );
}

export default Create;
