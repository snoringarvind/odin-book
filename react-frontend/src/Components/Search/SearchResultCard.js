import { Result } from "express-validator";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";

const SearchResultCard = ({ value, index, setError, myFriendList }) => {
  const [btnValue, setBtnValue] = useState(null);

  const [response, setResponse] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  let username;
  let userid;
  if (jwtData) {
    username = jwtData.user;
    userid = jwtData.sub;
  }

  const [isClicked, setIsClicked] = useState(null);

  const { axios_request } = useContext(OdinBookContext);

  //removes friend
  const clickHandler = () => {
    // setIsClicked(!isClicked);

    console.log("hwlllll");
    setBtnLoading(true);
    console.log(value._id);
    const route = `/friend/${value.user[index]._id}`;
    const method = "POST";

    const cb_error = (err) => {
      //!using same state to set Error
      setError(err.message);
      setBtnLoading(false);
    };

    const cb_response = (response) => {
      // console.log(response);
      setBtnLoading(false);
      setResponse(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  console.log(isClicked);
  return (
    <div className="SearchResultCard">
      <div className="profile-picture">
        {[...value.user[index].fname[0].toLowerCase()]}
      </div>
      <div className="name-container">
        <Link
          to={{
            pathname: `/user/${value.user[index].username}/posts`,
            state: value.user[index]._id,
          }}
        >
          <div className="name">
            <span>{value.user[index].fname} </span>
            <span>{value.user[index].lname}</span>
          </div>
        </Link>
        <div className="username">{value.user[index].username}</div>
      </div>
      <div className="add-btn">
        {/* {value.user[index]._id === userid && ( */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(btnLoading);
            if (isClicked == null) {
              if (value.isfriend) {
                setIsClicked(true);
              } else {
                setIsClicked(false);
              }
            } else {
              setIsClicked(!isClicked);
            }
            clickHandler();
          }}
        >
          {isClicked == null && (value.isfriend ? "Remove" : "Add")}
          {isClicked !== null && (!isClicked ? "Remove" : "Add")}
        </button>

        {/* )} */}
      </div>
    </div>
  );
};

export default SearchResultCard;
