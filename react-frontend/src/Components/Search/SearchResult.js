import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./SearchResult.css";
import SearchResultCard from "./SearchResultCard";

const SearchResult = () => {
  const { searchValue, axios_request } = useContext(OdinBookContext);

  const [searchValueChange, setSearchValueChange] = searchValue;

  const [friendBtn, setFriendBtn] = useState([]);

  const params = useParams();

  const [error, setError] = useState("");

  const [getLoading, setGetLoading] = useState(true);

  const [result, setResult] = useState([]);

  const make_server_request = () => {
    const user_list_route = `/user/search/${params.name}`;
    const user_list_method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setGetLoading(false);
      if (!Array.isArray(response.data)) {
        setResult([response.data]);
      } else {
        setResult(response.data);
      }
      const h = Array(response.data.length).fill(false);
      setFriendBtn(h);
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
        //to prefill the search bar with the value in the url incase the user refrehes the page
        const element = document.querySelector("#search");
        element.value = params.name;
        make_server_request();
      }
    }
  }, []);

  let arrg = [];

  return (
    <div className="SearchResult">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          {getLoading && "loading..."}
          {!getLoading &&
            (result.length == 0 ? (
              <div className="empty">No users found with this query :(</div>
            ) : (
              result.map((value, index) => {
                return (
                  <SearchResultCard
                    value={value}
                    index={index}
                    setResult={setResult}
                    result={result}
                    key={uniqid()}
                    friendBtn={friendBtn}
                    setFriendBtn={setFriendBtn}
                    arrg={arrg}
                  />
                );
              })
            ))}
        </>
      )}
    </div>
  );
};

export default SearchResult;
