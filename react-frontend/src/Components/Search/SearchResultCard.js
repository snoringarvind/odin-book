import { Result } from "express-validator";
import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";
import { axios_request } from "../Utils";

const SearchResultCard = ({
  value,
  index,
  setError,
  result,
  friendBtn,
  setFriendBtn,
}) => {
  const { jwtData } = useContext(OdinBookContext);

  //removes friend
  const clickHandler = () => {
    // setIsClicked(!isClicked);

    const route = `/friend/${value.user[index]._id}`;
    const method = "POST";

    const cb_error = (err) => {
      //!using same state to set Error
      setError(err.message);
    };

    const cb_response = (response) => {
      // console.log(response);
      // setResponse(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const [pp, setpp] = useState(false);

  let g = value.isfriend;

  useEffect(() => {
    if (friendBtn.length < result.length) {
      console.log(value.isfriend);
      friendBtn.push(g);
      setFriendBtn(friendBtn);
      console.log(friendBtn);
    }
    console.log(result.length, friendBtn.length);
    setpp(!pp);
  }, []);

  console.log(value.user[index]._id);
  console.log(jwtData.sub);
  console.log(friendBtn);
  return (
    <div className="SearchResultCard">
      <div className="profile-picture">
        {[...value.user[index].fname[0].toLowerCase()]}
      </div>
      <div className="name-container">
        <Link
          to={{
            pathname: `/user/${value.user[index].username}/posts`,
            state: {
              userid: value.user[index]._id,
              fname: value.user[index].fname,
              lname: value.user[index].lname,
              username: value.user[index].username,
            },
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
        {value.user[index]._id !== jwtData.sub && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              friendBtn[index] = !friendBtn[index];
              setFriendBtn(friendBtn);
              setpp(!pp);
              clickHandler();
            }}
          >
            {friendBtn[index] ? "remove" : "add"}
            {/* {friendBtn.length == 0 && (value.isfriend ? "Remove" : "Add")} */}
            {/* {friendBtn.length !== 0 && (friendBtn[index] ? "Remove" : "Add")} */}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResultCard;
