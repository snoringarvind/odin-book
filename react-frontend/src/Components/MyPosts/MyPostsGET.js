import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";

const MyPostsGET = () => {
  const { axios_GET } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    make_server_request();
  }, []);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
    };
    const cb_response = (response) => {
      setPosts(response.data);
    };
    axios_GET("/myposts", cb_error, cb_response);
  };

  const display_posts = () => {
    const arr = [];
    for (let i = 0; i < posts.length; i++) {
      arr.push(
        <>
          <div className="content_text">{posts[i].content_text}</div>
        </>
      );
    }
  };
  return <div className="MyPostsGET">{display_posts()}</div>;
};

export default MyPostsGET;
