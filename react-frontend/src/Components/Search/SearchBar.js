import { concatSeries } from "async";
import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./SearchBar.css";

const SearchBar = () => {
  const { searchBarStateValue, searchValue } = useContext(OdinBookContext);
  const [searchBarState, setSearchBarState] = searchBarStateValue;
  const [searchValueChange, setSearchValueChange] = searchValue;

  const history = useHistory();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSearchBarState({ ...searchBarState, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchValueChange(true);
    return history.push(`/search/${searchBarState.search}`);
  };

  return (
    <div className="SearchBar">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="search"
          name="search"
          onChange={changeHandler}
          value={searchBarState.search}
          placeholder="Search Odinbook"
        />
      </form>
    </div>
  );
};

export default SearchBar;
