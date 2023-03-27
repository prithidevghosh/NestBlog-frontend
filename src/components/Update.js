import axios from "axios";
import React, { useState } from "react";
import "./Update.css";

const Modal = ({
  handleClose,
  show,
  title_post,
  body_post,
  description_post,
  deleteLoad,
  blog_id,
  setDeleteLoad,
  setBlogs,
  blogs,
}) => {
  const [title, setTitle] = useState(title_post);
  const [description, setDescription] = useState(body_post);
  const [body, setBody] = useState(description_post);
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const updateBlog = () => {
    setDeleteLoad(true);
    console.log(process.env.REACT_APP_POST_CREATE_GET_UPDATE + `/${blog_id}`);
    axios
      .put(
        process.env.REACT_APP_POST_CREATE_GET_UPDATE + `/${blog_id}`,
        {
          title: title,
          description: description,
          body: body,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setDeleteLoad(false);
        let blog = blogs.filter((data) => data.id !== blog_id);
        setBlogs([...blog, res.data]);

        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoad(false);
        handleClose();
      });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    updateBlog();
  };
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
            disabled={deleteLoad}
            className="PostForm__submit"
            type="submit"
          >
            {!deleteLoad ? "Edit Post" : "Editing Blog"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Modal;
