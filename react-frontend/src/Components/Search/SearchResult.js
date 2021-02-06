import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./SearchResult.css";

const SearchResult = () => {
  const { axios_request, searchValue, searchBarStateValue } = useContext(
    OdinBookContext
  );

  const [searchValueChange, setSearchValueChange] = searchValue;
  const [searchBarState, setSearchBarState] = searchBarStateValue;

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

  const display_users = () => {
    let arr = [];
    if (result.length === 0) {
      return <div className="no-users">No users found with this query :(</div>;
    } else {
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]._id);
        arr.push(
          <div key={uniqid()} className="card">
            <div className="profile-picture">
              {[...result[i].fname][0].toLowerCase()}
            </div>
            <div className="name">
              <Link
                to={{
                  pathname: `/user/${result[i].username}`,
                  state: result[i]._id,
                }}
              >
                <span>{result[i].fname} </span>

                <span>{result[i].lname}</span>
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
    <div className="SearchResult">
      {error ? (
        <div className="error">{error}</div>
      ) : getLoading ? (
        "loading..."
      ) : (
        <>
          {result.length !== 0 && <div className="people">People</div>}
          {display_users()}
        </>
      )}
    </div>
  );
};

export default SearchResult;
