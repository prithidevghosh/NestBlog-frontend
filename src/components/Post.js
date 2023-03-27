import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import Paginator from "./Paginator";
import "./Post.css";

const Post = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_POST_CREATE_GET_UPDATE}?page=${currentPage}&limit=5`
      )
      .then((res) => {
        setLoading(false);
        setCurrentPage(res.data.meta.currentPage);
        setTotalPage(res.data.meta.totalPages);
        setBlogs(res.data.items);
      });
  }, [currentPage]);

  const isLogin = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  };
  const handleDeletePost = (post_id) => {
    console.log(post_id);
    setDisable(true);
    if (isLogin()) {
      axios
        .delete(`${process.env.REACT_APP_POST_CREATE_GET_UPDATE}/${post_id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((data) => {
          console.log(data.data);
          setDisable(false);
          setBlogs(blogs.filter((data) => data.id !== post_id));
          console.log("post deleted");
        })
        .catch((err) => {
          console.log(err);
          setDisable(false);
        });
    }
  };

  return (
    <div className="post_container">
      {!loading ? (
        blogs.map((data, index) => {
          return (
            <>
              <Card
                setBlogs={setBlogs}
                blogs={blogs}
                loading={disable}
                key={index}
                title={data.title}
                description={data.description}
                body={data.body}
                publishDate={new Date(data.created).toDateString()}
                authorName={data.author.name}
                email={data.author.email}
                onDelete={() => handleDeletePost(data.id)}
                post_id={data.id}
              />
            </>
          );
        })
      ) : (
        <Loading />
      )}
      {!loading ? (
        <Paginator
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={(page) => setCurrentPage(page)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
