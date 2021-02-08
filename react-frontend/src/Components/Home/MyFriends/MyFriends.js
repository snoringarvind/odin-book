import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../../Context";
import uniqid from "uniqid";
import "./MyFriends.css";

const MyFriends = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  const userid = jwtData.sub;
  const myfriend_list_route = `/friend/${userid}`;
  const myfriend_list_method = "GET";

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      setResult(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: myfriend_list_route,
      data: "",
      method: myfriend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    make_server_request();
  }, []);

  const display_friends = () => {
    let arr = [];
    if (result.length === 0) {
      return <div className="empty">No Friends to show.</div>;
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
    <div className="MyFriends">
      {" "}
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {result.length !== 0 && <div className="friends">Friends</div>}
            {display_friends()}
          </>
        ))}
    </div>
  );
};

export default MyFriends;
