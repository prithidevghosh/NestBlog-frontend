import React, { useState } from "react";

import Modal from "./Update";

const Card = ({
  title,
  description,
  body,
  publishDate,
  authorName,
  email,
  post_id,
  handleDeletePost
}) => {
  const userEmail = localStorage.getItem("userEmail");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card">
      <Modal
        title_post={title}
        description_post={description}
        body_post={body}
        show={showModal}
        handleClose={handleCloseModal}
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
          {email === userEmail && (
            <div className="footer__buttons">
              <button  onClick={()=>handleDeletePost(post_id)}>
                Delete
              </button>
              <button onClick={() => setShowModal(true)}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
