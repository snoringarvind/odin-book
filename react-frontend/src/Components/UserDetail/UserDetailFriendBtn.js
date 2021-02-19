import { concatSeries } from "async";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./UserDetail.css";
import UserDetailFriendBtnCard from "./UserDetailFriendBtnCard";

const UserDetailFriendBtn = () => {
  const {
    jwtData,
    axios_request,
    didMyFriendsMountValue,
    myFriendsValue,
  } = useContext(OdinBookContext);
  const location = useLocation();
  const userid = location.state.userid;
  const fname = location.state.fname;
  const lname = location.state.lname;
  const username = location.state.username;

  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;
  const [myFriends, setMyFriends] = myFriendsValue;

  const [isFriend, setIsFriend] = useState([]);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [isClicked, setIsClicked] = useState(false);

  const get_friend = () => {
    const route = `/friend/${jwtData.sub}`;
    const method = "GET";

    const cb_error = (err) => {
      console.log(err.message);
    };

    const cb_response = (response) => {
      setMyFriends(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_response: cb_response,
      axios_error: cb_error,
    });
  };

  const post_friend_value = () => {
    console.log(isFriend);

    if (isFriend == true) {
      if (index == null) {
        console.log("56 spliced null");
        myFriends.splice(myFriends.length - 1, 1);
        setMyFriends(myFriends);
        setIsFriend(false);
      } else {
        console.log("61 spliced not null", index);
        myFriends.splice(index, 1);
        setIndex(null);
        setIsFriend(false);
      }
    } else {
      console.log("pushed", index);
      myFriends.push({
        _id: userid,
        username: username,
        fname: fname,
        lname: lname,
      });
    }

    const route = `/friend/${userid}`;
    const method = "POST";

    const cb_error = (err) => {
      console.log(err.message);
    };

    const cb_response = (response) => {
      // console.log(response.data);
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
    console.log(didMyFriendsMount);
    if (didMyFriendsMount) {
      get_friend();
      setDidMyFriendsMount(false);
    }
  }, []);

  const check = () => {
    let include = false;
    for (let i = 0; i < myFriends.length; i++) {
      if (myFriends[i]._id == userid) {
        setIsFriend(true);
        include = true;
        setIndex(i);
        break;
      }
    }

    if (!include) {
      setIsFriend(false);
    }
  };

  useEffect(() => {
    check();
  }, [myFriends, location.pathname]);

  // console.log("isFriend", isFriend);
  // console.log(index);

  return (
    <div className="UserDetailFriendBtn">
      <div
        className={
          isFriend ? "add-btn fas fa-user-minus" : "add-btn fas fa-user-plus"
        }
        onClick={(e) => {
          e.preventDefault();
          post_friend_value();
          setIsFriend(!isFriend);
        }}
      ></div>
    </div>
  );
};

export default UserDetailFriendBtn;
