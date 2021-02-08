import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./SearchResult.css";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";

const SearchResult = () => {
  const { axios_request, searchValue, searchBarStateValue } = useContext(
    OdinBookContext
  );

  const [myFriendList, setMyFriendList] = useState([]);

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

  const get_my_friend_list = () => {
    //this is the owner id
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    let username;
    let userid;
    if (jwtData) {
      username = jwtData.user;
      userid = jwtData.sub;
    }

    const route = `/friend/${userid}`;
    const method = "GET";

    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {
      setMyFriendList(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (searchValueChange === true) {
      make_server_request();
      get_my_friend_list();
      setSearchValueChange(false);
    }
  }, [searchValueChange]);

  useEffect(() => {
    if (!searchValueChange) {
      if (params) {
        make_server_request();
        get_my_friend_list();
      }
    }
    //to prefil the search bar in case the user realoads the page
    setSearchBarState({ search: params.name });
  }, []);

  return (
    <div className="SearchResult">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          result.map((value, index) => {
            return (
              <SearchResultCard
                value={value}
                index={index}
                setResult={setResult}
                result={result}
                setError={setError}
                key={uniqid()}
                myFriendList={myFriendList}
              />
            );
          })
        ))}
    </div>
  );
};

export default SearchResult;
