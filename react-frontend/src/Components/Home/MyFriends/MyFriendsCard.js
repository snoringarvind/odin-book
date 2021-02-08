import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../../Context";

const MyFriendsCard = ({
  value,
  index,
  result,
  setError,
  isChanged,
  setIschanged,
}) => {
  const { axios_request } = useContext(OdinBookContext);

  //removes friend
  const clickHandler = () => {
    const route = `/friend/${value._id}`;
    const method = "POST";

    const cb_error = (err) => {
      //!using same state to set Error
      setError(err.message);
    };

    const cb_response = (response) => {
      // console.log(response);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    result.splice(index, 1);
    setIschanged(!isChanged);
  };

  return (
    <div className="MyFriendsCard">
      <div className="profile-picture">{[...value.fname[0].toLowerCase()]}</div>
      <div className="name-container">
        <Link
          to={{
            pathname: `/user/${value.username}`,
            state: value._id,
          }}
        >
          <div className="name">
            <span>{value.fname} </span>
            <span>{value.lname}</span>
          </div>
        </Link>
        <div className="username">{value.username}</div>
      </div>
      <div className="add-btn">
        <button
          onClick={() => {
            return clickHandler();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MyFriendsCard;
