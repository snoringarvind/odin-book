import React, { useContext, useState } from "react";
import { OdinBookContext } from "../Context";

const UserPost = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const post_route = "/posts";

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.mesage);
    };
    const cb_response = (response) => {
      setPosts(response);
    };

    axios_request({});
  };

  return <div className="UserPost">UserPost</div>;
};

export default UserPost;
