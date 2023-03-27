import React, { useState } from "react";
import "./Card.css";
import Modal from "./Update";

const Card = ({
  title,
  description,
  body,
  publishDate,
  authorName,
  onDelete,
  email,
  loading,
  post_id,
  setBlogs,
  blogs,
}) => {
  const userEmail = localStorage.getItem("userEmail");
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="card">
      <Modal
        setBlogs={setBlogs}
        blogs={blogs}
        title_post={title}
        description_post={description}
        body_post={body}
        show={showModal}
        deleteLoad={deleteLoad}
        handleClose={handleCloseModal}
        setDeleteLoad={setDeleteLoad}
        blog_id={post_id}
      />
      <div className="card__header">
        <h2>{title}</h2>
      </div>
      <div className="card__body info">
        <p className="info__desc">{description}</p>
        <p className="info__body">{body}</p>
        <div className="info__footer footer">
          <p>Published on: {publishDate}</p>
          <p>Author: {authorName}</p>
          {email === userEmail ? (
            <div className="footer__buttons">
              <button disabled={loading} onClick={onDelete}>
                {loading ? "Deleting" : "Delete"}
              </button>
              <button onClick={() => setShowModal(true)}>Update</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
