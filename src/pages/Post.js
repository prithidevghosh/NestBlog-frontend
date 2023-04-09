import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { deleteBlog, getBlogs, setCurrentPage, setLoginStatus } from '../stores/blog';

import Card from "../components/Card";
import Paginator from "../components/Paginator";
import Loading from '../components/Loading';

const Post = () => {
  const {loading, blogs, currentPage, totalPages, loginStatus } = useSelector((state) => state.blogReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    (loginStatus || localStorage.getItem('token')) && dispatch(setLoginStatus(true))
    dispatch(getBlogs(currentPage))
  }, [currentPage, dispatch, loginStatus]);

  const handleDeletePost = (post_id) => {
    const newBlog = blogs.filter((data) => data.id !== post_id);
    dispatch(deleteBlog(post_id, currentPage, newBlog))
  };
  if(loading){
    return <Loading/>
  }

  return (
    <div className="post_container">

      {
        blogs.map((data, index) => {
          return (
            <Card
              key={index}
              title={data.title}
              description={data.description}
              body={data.body}
              publishDate={new Date(data.created).toDateString()}
              authorName={data.author.name}
              email={data.author.email}
              post_id={data.id}
              handleDeletePost={handleDeletePost}
            />
          );
        })
      }
      { blogs.length !== 0 &&
        <Paginator
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(page) => dispatch(setCurrentPage(page))}
        />
      }
    </div>
  );
};

export default Post;
