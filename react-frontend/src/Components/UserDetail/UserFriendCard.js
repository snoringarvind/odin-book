import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";
import { axios_request } from "../Utils";

const UserFriendCard = ({
  value,
  index,
  setError,
  friendBtn,
  setFriendBtn,
  userid,
  isChanged,
  setIsChanged,
  path,
}) => {
  // const params = useParams();
  // console.log("params", params);
  // const history = useHistory();
  // console.log("histroy", history);

  const { jwtData, myFriendsValue } = useContext(OdinBookContext);

  const [myFriends, setMyFriends] = myFriendsValue;
  console.log("hello");
  //removes friend
  const clickHandler = () => {
    // if i don't do this it show 'cannot update state after the component is unmounted'
    //becoz you are not waiting for the response and directly deleting the user from the sreen
    // if (personid.toString() !== userid.toString()) {
    //   setBtnLoading(true);
    //   setIsClicked(!isClicked);
    // }

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

    // only do this for the owner,,, bcoz it deletes the user from the screen
    if (jwtData.sub == userid || path == "myfriends") {
      myFriends.splice(index, 1);
      setMyFriends(myFriends);
      setIsChanged(!isChanged);
    }
  };

  const [pp, setpp] = useState(false);

  console.log(path);
  return (
    <div className="UserFriendCard">
      {" "}
      <div className="profile-picture">{[...value.fname[0].toLowerCase()]}</div>
      <div className="name-container">
        <Link
          to={{
            pathname: `/user/${value.username}/posts`,
            state: {
              userid: value._id,
              fname: value.fname,
              lname: value.lname,
              username: value.username,
            },
          }}
        >
          <div className="name">
            <span>{value.fname} </span>
            <span>{value.lname}</span>
          </div>
        </Link>
        <div className="username">{value.username}</div>
      </div>
      <div
        className="add-btn"
        onClick={() => {
          if (jwtData.sub != userid) {
            friendBtn[index] = !friendBtn[index];
            setFriendBtn(friendBtn);
            setpp(!pp);
          }
          clickHandler();
        }}
      >
        {(jwtData.sub == userid || path === "myfriends") && (
          <button>Remove</button>
        )}
        {jwtData.sub !== userid && path !== "myfriends" && (
          <button>{friendBtn[index] ? "Remove" : "Add"}</button>
        )}
      </div>
    </div>
  );
};

export default UserFriendCard;
