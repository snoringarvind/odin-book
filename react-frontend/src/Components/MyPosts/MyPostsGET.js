import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";

let urls = new WeakMap();

let blobUrl = (blob) => {
  if (urls.has(blob)) {
    return urls.get(blob);
  } else {
    let url = URL.createObjectURL(blob);
    console.log(url);
    urls.set(blob, url);
    return url;
  }
};

const MyPostsGET = () => {
  const { axios_GET } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [getLoading, setGetLoading] = useState(true);

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
    };
    axios_GET("/myposts", cb_error, cb_response);
  };

  console.log(posts);
  const display_posts = () => {
    const arr = [];

    for (let i = 0; i < posts.length; i++) {
      // console.log(posts[i].content_text);
      // console.log(posts[i].content_image.data.data);

      // let { file } = posts[i].content_image;
      // let url = blobUrl(file);

      // console.log(url);
      arr.push(
        <div className="card" key={uniqid()}>
          <div className="content_text">{posts[i].content_text}</div>
          <div className="content_image">
            <img
              src={`data:image/jpeg;base64,${btoa(
                posts[i].content_image.data.data
              )}`}
              alt="good"
            />
          </div>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="MyPostsGET">
      {getLoading && "loading.."}
      {!getLoading && display_posts()}
    </div>
  );
};

export default MyPostsGET;
