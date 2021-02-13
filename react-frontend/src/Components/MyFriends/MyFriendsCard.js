import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";
import { axios_request } from "../Utils";

const MyFriendsCard = ({
  value,
  index,
  myFriends,
  setMyFriends,
  setError,
  // myFriendsBtn,
  // setMyFriendsBtn,
  isChanged,
  setIsChanged,
}) => {
  const { myFriendsValue } = useContext(OdinBookContext);
  const [myFriends1, setMyFriends1] = myFriendsValue;
  //here we will also delete the friend from the screen maybe with a confirm message.
  //e.g. are you sure you want to remove this friend.
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

    console.log(index);
    console.log(myFriends[index]);
    myFriends.splice(index, 1);
    setMyFriends(myFriends);
    setpp(!pp);
    setIsChanged(!isChanged);
    // myFriendsBtn.splice(index, 1);
    // setMyFriendsBtn(myFriendsBtn);
  };

  console.log(myFriends);
  const [pp, setpp] = useState(false);

  useEffect(() => {}, [myFriends]);
  return (
    <div className="MyFriendsCard">
      <div className="profile-picture">{[...value.fname[0].toLowerCase()]}</div>
      <div className="name-container">
        <Link
          to={{
            pathname: `/user/${value.username}/posts`,
            state: {
              fname: value.fname,
              lname: value.lname,
              username: value.username,
              userid: value._id,
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
      <div className="add-btn">
        <button
          onClick={() => {
            // console.log(friendArray[index]);
            // console.log(myFriendsBtn[index]);
            // myFriendsBtn[index] = !myFriendsBtn[index];
            // setMyFriendsBtn(myFriendsBtn);
            setpp(!pp);
            return clickHandler();
          }}
        >
          Remove
          {/* {myFriendsBtn[index] ? "Remove" : "Add"} */}
        </button>
      </div>
    </div>
  );
};

export default MyFriendsCard;
