import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";

const PostList = () => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  const [posts, setPosts] = useState("");

  const post_list_route = "/posts";
  const post_list_method = "GET";

  useEffect(() => {
    make_server_request();
  }, []);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setPosts(response.data);
      setGetLoading(false);
      console.log(response.data);
    };

    axios_request({
      route: post_list_route,
      data: "",
      method: post_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const display_posts = () => {
    let arr = [];
    for (let i = 0; i < posts.length; i++) {
      arr.push(
        <div className="card">
          <div className="title">{posts[i].title}</div>
          <div className="content_text">{posts[i].content_text}</div>
        </div>
      );
    }
  };

  return (
    <div className="PostList">
      {getLoading && "loading..."}
      {!getLoading && (
        <>{error ? <div className="error">{error}</div> : display_posts()}</>
      )}
    </div>
  );
};

export default PostList;
