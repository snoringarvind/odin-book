import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import { Result } from "express-validator";

const UserPost = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const location = useLocation();
  const userid = location.state;
  const post_list_route = `/post/${userid}`;
  const post_list_method = "GET";

  // const params = useParams();
  // console.log("params", params);
  // const history = useHistory();
  // console.log("histroy", history);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.mesage);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      setResult(response.data);
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

  useEffect(() => {
    make_server_request();
    // console.log(paramsChanged);

    // console.log(paramsChanged);
  }, []);

  const display_posts = () => {
    let arr = [];
    console.log(result.length);
    if (result.length === 0) {
      return <div className="empty">No posts to show.</div>;
    } else {
      for (let i = 0; i < result.length; i++) {
        arr.push(
          <div className="card" key={uniqid()}>
            <div className="title-container">
              <div className="title">{result[i].title}</div>
              <div className="date">{result[i].created_at}</div>
            </div>
            <div className="content_text">{result[i].content_text}</div>
            <div className="like">{result[i].like.length}</div>
          </div>
        );
      }
      return arr;
    }
  };

  return (
    <div className="UserPost">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? <div className="error">{error}</div> : display_posts())}
    </div>
  );
};

export default UserPost;
