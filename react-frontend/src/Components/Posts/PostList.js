import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";

const PostList = () => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  const [post, setPost] = useState("");

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
      setPost(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: post_list_route,
      data: "",
      method: post_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const display_post = () => {
    return (
      <>
        <div className="title">{post.title}</div>
        <div className="content_text">{post.content_text}</div>
      </>
    );
  };
  return (
    <div className="PostList">
      {getLoading && "loading..."}
      {!getLoading && (
        <>{error ? <div className="error">{error}</div> : display_post()}</>
      )}
    </div>
  );
};

export default PostList;
