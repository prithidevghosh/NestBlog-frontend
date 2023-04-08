import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { createBlog } from '../stores/blog';

function Create() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.blogReducer)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(createBlog({
      title,
      description,
      body,
    }))
  }, [body, description, dispatch, title]);

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
          {!loading ? "Create Blog" : "Posting Blog"}
        </button>
      </form>
    </div>
  );
}

export default Create;
