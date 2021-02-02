import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";

const NewsFeed = () => {
  const { axios_GET } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState("");

  useEffect(() => {
    const error = (err) => {
      setError(err.message);
    };

    const response = (response) => {
      setPosts(response.data);
    };

    axios_GET("/posts", error, response);
  }, []);

  console.log(posts);
  console.log(error);

  return <div className="NewsFeed"></div>;
};

export default NewsFeed;
