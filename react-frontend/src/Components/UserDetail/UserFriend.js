import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./UserFriend.css";

const UserFriend = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const location = useLocation();
  const userid = location.state;
  const friend_list_route = `/friend/${userid}`;
  const friend_list_method = "GET";

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setGetLoading(false);
      setResult(response.data.friend);
    };

    axios_request({
      route: friend_list_route,
      data: "",
      method: friend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    make_server_request();
  }, []);

  const display_friends = () => {
    let arr = [];
    console.log(result.length);
    if (result.length === 0) {
      return <div className="empty">No friends to show.</div>;
    } else {
      for (let i = 0; i < result.length; i++) {
        arr.push(
          <div className="card" key={uniqid()}>
            <div className="profile-picture">
              {[...result[i].fname[0].toLowerCase()]}
            </div>
            <div className="name-container">
              <Link
                to={{
                  pathname: `/user/${result[i].username}`,
                  state: result[i]._id,
                }}
              >
                <div className="name">
                  <span>{result[i].fname}</span>
                  <span>{result[i].lname}</span>
                </div>
              </Link>
              <div className="username">{result[i].username}</div>
            </div>
          </div>
        );
      }
      return arr;
    }
  };

  return (
    <div className="UserFriend">
      {getLoading && "loading.."}
      {!getLoading &&
        (error ? <div className="error">{error}</div> : display_friends())}
    </div>
  );
};

export default UserFriend;
