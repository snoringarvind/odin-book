import { Result } from "express-validator";
import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";

const SearchResultCard = ({
  value,
  index,
  setError,
  result,
  friendBtn,
  setFriendBtn,
  arrg,
}) => {
  const { jwtData, myFriendsValue, axios_request } = useContext(
    OdinBookContext
  );
  const [myFriends, setMyFriends] = myFriendsValue;

  const [myFriendsIndex, setMyFriendsIndex] = useState(null);

  //removes friend
  const clickHandler = () => {
    // setIsClicked(!isClicked);

    const route = `/friend/${value._id}`;
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

  // let g;
  // for (let i = 0; i < myFriends.length; i++) {
  //   // g = myFriends[i].includes(result._id);
  //   // console.log(myFriends[i]._id, value._id);
  //   if (myFriends[i]._id == value._id) {
  //     g = true;
  //   } else {
  //     g = false;
  //   }
  //   // console.log(g);
  // }

  // console.log(g);

  useEffect(() => {
    // console.log("ahsahsahsahsbashbsh");
    // console.log(friendBtn.length, result.length);

    console.log("hellllll");
    // console.log(friendBtn);
    let g = false;

    for (let i = 0; i < myFriends.length; i++) {
      // g = myFriends[i].includes(result._id);
      // console.log(myFriends[i]._id, value._id);
      // console.log(myFriends[i], value);

      if (myFriends[i]._id == value._id) {
        // console.log(myFriends[i], value,g);
        // console.log(g);
        g = true;

        console.log(myFriends[i], value, g);
        setMyFriendsIndex(i);
        break;
      }
    }

    console.log(g);
    friendBtn[index] = g;
    setFriendBtn(friendBtn);
    // // console.log(g);
    // if (friendBtn.length < result.length) {
    //   console.log(g);
    //   friendBtn.push(g);
    //   setFriendBtn(friendBtn);
    // }
    setpp(!pp);
    console.log(friendBtn);
    console.log(friendBtn[index], index);
  }, []);

  // console.log(friendBtn[index], index);

  // console.log(value.user[index]._id);
  // console.log(jwtData.sub);
  // console.log(friendBtn);
  // console.log(arrg[index]);
  // console.log(arrg);
  // console.log(g, myFriends[index]);
  return (
    <div className="SearchResultCard">
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
      {value._id !== jwtData.sub && (
        <div
          className={
            friendBtn[index]
              ? "add-btn fas fa-user-minus"
              : "add-btn fas fa-user-plus"
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log(friendBtn[index], myFriendsIndex);

            //he add as friend so we will update our myfriend list
            if (friendBtn[index] == false) {
              myFriends.push(value);
              setMyFriends(myFriends);
              // myFriendsBtn.push(true);
              // setMyFriendsBtn(myFriendsBtn);
            } else {
              console.log("hello");
              myFriends.splice(myFriendsIndex, 1);
              setMyFriends(myFriends);
              // myFriendsBtn.splice(myFriendsIndex, 1);
              // setMyFriends(myFriends);
              // for (let i = 0; i < myFriends.length; i++) {
              //   if (myFriends._id == value._id) {
              //   }
              // }
            }

            friendBtn[index] = !friendBtn[index];
            setFriendBtn(friendBtn);
            setpp(!pp);
            clickHandler();
          }}
        ></div>
      )}

      {value._id !== jwtData.sub && (
        <div className="chat-link-container">
          <Link
            to={{
              pathname: "/chat",
              state: {
                userid: value._id,
                fname: value.fname,
                lname: value.lname,
                username: value.username,
              },
            }}
          >
            <div className="chat-btn fab fa-facebook-messenger"></div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultCard;
