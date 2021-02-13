import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./SearchResult.css";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";
import { axios_request } from "../Utils";

const SearchResult = () => {
  const { searchValue, searchBarStateValue } = useContext(OdinBookContext);

  const [searchValueChange, setSearchValueChange] = searchValue;
  const [searchBarState, setSearchBarState] = searchBarStateValue;

  const [friendBtn, setFriendBtn] = useState([]);

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
      if (!Array.isArray(response.data)) {
        setResult([response.data]);
      } else {
        setResult(response.data);
      }
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
      // get_my_friend_list();
      setSearchValueChange(false);
    }
  }, [searchValueChange]);

  useEffect(() => {
    if (!searchValueChange) {
      if (params) {
        make_server_request();
        // get_my_friend_list();
      }
    }
    //to prefil the search bar in case the user realoads the page
    setSearchBarState({ search: params.name });
  }, []);

  let arrg = [];

  return (
    <div className="SearchResult">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : result.length == 0 ? (
          <div className="empty">No users found with this query :(</div>
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
                friendBtn={friendBtn}
                setFriendBtn={setFriendBtn}
                arrg={arrg}
              />
            );
          })
        ))}
    </div>
  );
};

export default SearchResult;
