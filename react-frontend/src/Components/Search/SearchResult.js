import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./SearchResult.css";
import axios from "axios";

const SearchResult = () => {
  const { axios_request, searchValue, searchBarStateValue } = useContext(
    OdinBookContext
  );

  const [searchValueChange, setSearchValueChange] = searchValue;
  const [searchBarState, setSearchBarState] = searchBarStateValue;

  const [friendBtn, setFriendBtn] = useState(false);

  const params = useParams();

  const [error, setError] = useState("");

  const user_list_route = `/user/search/${params.name}`;

  const [getLoading, setGetLoading] = useState(true);

  const [result, setResult] = useState([]);

  const user_list_method = "GET";
  const make_server_request = () => {
    const cb_error = (err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        setError(err.message);
      }
      setGetLoading(false);
    };

    const cb_response = (response) => {
      console.log(response);
      setGetLoading(false);
      setResult(response.data);
    };

    axios_request({
      route: user_list_route,
      data: "",
      method: user_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (searchValueChange === true) {
      make_server_request();
      setSearchValueChange(false);
    }
  }, [searchValueChange]);

  useEffect(() => {
    if (!searchValueChange) {
      if (params) {
        make_server_request();
      }
    }
    //to prefil the search bar in case the user realoads the page
    setSearchBarState({ search: params.name });
  }, []);

  const add_friend_handler = (e) => {};

  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  let username;
  let userid;
  if (jwtData) {
    username = jwtData.user;
    userid = jwtData.sub;
  }

  const friend_button = (e) => {
    console.log(e);
  };

  const display_users = () => {
    let arr = [];
    let isFriend;
    if (result.length === 0) {
      return <div className="no-users">No users found with this query :(</div>;
    } else {
      for (let i = 0; i < result.length; i++) {
        isFriend = false;
        for (let j = 0; j < result[i].friend.length; j++) {
          if (userid == result[i].friend[j]) {
            isFriend = true;
            break;
          }
        }
        arr.push(
          <div key={uniqid()} className="card">
            <div className="profile-picture">
              {[...result[i].fname][0].toLowerCase()}
            </div>
            <div className="name-container">
              <Link
                to={{
                  pathname: `/user/${result[i].username}`,
                  state: result[i]._id,
                }}
              >
                <div className="name">
                  <span>{result[i].fname} </span>
                  <span>{result[i].lname}</span>
                </div>
              </Link>
              <div className="username">{result[i].username}</div>
            </div>
            <div className="add-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();

                  friend_button(e);

                  const route = `/friend/${result[i]._id}`;
                  const method = "POST";

                  const cb_error = (err) => {
                    //!using same state to set Error
                    setError(err.message);
                  };

                  const cb_response = (response) => {
                    console.log(response);
                  };

                  axios_request({
                    route: route,
                    data: "",
                    method: method,
                    axios_error: cb_error,
                    axios_response: cb_response,
                  });
                }}
              >
                {isFriend ? "Reomve" : "Add"}
              </button>
            </div>
          </div>
        );
      }
      return arr;
    }
  };

  return (
    <div className="SearchResult">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {result.length !== 0 && <div className="people">People</div>}
            {display_users()}
          </>
        ))}
    </div>
  );
};

export default SearchResult;
