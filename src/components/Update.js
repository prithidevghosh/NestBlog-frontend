import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { updateBlog } from '../stores/blog';

const Modal = ({
  handleClose,
  show,
  title_post,
  body_post,
  description_post,
  blog_id,
}) => {
  const { blogs, loading } = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(title_post);
  const [description, setDescription] = useState(body_post);
  const [body, setBody] = useState(description_post);

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleEdit = useCallback((e) => {
    e.preventDefault();
    const newBlog = blogs.map((data) => {
      if (data.id === blog_id) {
        return {
          ...data, title,
          description,
          body
        }
      }
      else
      return data
    })
    dispatch(updateBlog({
      blogId: blog_id,
      title,
      description,
      body,
      newBlog
    }))
  }, [blog_id, blogs, body, description, dispatch, title])

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="close-div">
          <button onClick={handleClose}>X</button>
        </div>
        <form onSubmit={handleEdit} className="PostForm">
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
          <button
            className="PostForm__submit"
            type="submit"
          >
            {loading ? "Updating" : "Update"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Modal;
