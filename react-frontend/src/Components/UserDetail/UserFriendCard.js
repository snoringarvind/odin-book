import { Result } from "express-validator";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";

const UserFriendCard = ({
  value,
  index,
  setResult,
  result,
  setError,
  isChanged,
  setIschanged,
  myFriendList,
  setParamsChanged,
  paramsChanged,
}) => {
  // const params = useParams();
  // console.log("params", params);
  // const history = useHistory();
  // console.log("histroy", history);

  const location = useLocation();
  const personid = location.state;

  const [btnValue, setBtnValue] = useState(null);

  const [btnLoading, setBtnLoading] = useState(false);

  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  let username;
  let userid;
  if (jwtData) {
    username = jwtData.user;
    userid = jwtData.sub;
  }

  const [isClicked, setIsClicked] = useState(true);

  const { axios_request } = useContext(OdinBookContext);
  //removes friend
  const clickHandler = () => {
    // if i don't do this it show 'cannot update state after the component is unmounted'
    //becoz you are not waiting for the response and directly deleting the user from the sreen
    if (personid.toString() !== userid.toString()) {
      setBtnLoading(true);
      setIsClicked(!isClicked);
    }

    const route = `/friend/${value._id}`;
    const method = "POST";

    const cb_error = (err) => {
      //!using same state to set Error
      setError(err.message);
      setBtnLoading(false);
    };

    const cb_response = (response) => {
      // console.log(response);
      setBtnLoading(false);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    // only do this for the owner,,, bcoz it deletes the user from the screen
    if (personid.toString() === userid.toString()) {
      result.splice(index, 1);
      setIschanged(!isChanged);
    }
  };

  const display = () => {
    // console.log("hahahahha");

    if (personid.toString() === userid.toString()) {
      return <button onClick={clickHandler}>Remove</button>;
    }

    if (myFriendList.length == 0) {
      if (value._id === userid) {
        return;
      } else {
        return (
          <button
            onClick={() => {
              if (btnLoading) {
                return;
              } else {
                return clickHandler();
              }
            }}
          >
            {btnLoading && "loading..."}
            {!btnLoading && (isClicked ? "Add" : "Remove")}
          </button>
        );
      }
    } else {
      for (let i = 0; i < myFriendList.length; i++) {
        if (value._id === myFriendList[i]._id) {
          return (
            <button
              onClick={() => {
                if (btnLoading) {
                  return;
                } else {
                  return clickHandler();
                }
              }}
            >
              {btnLoading && "loading..."}
              {!btnLoading && (isClicked ? "Remove" : "Add")}
            </button>
          );
        } else if (value._id === userid) {
          return;
        } else {
          return (
            <button
              onClick={() => {
                if (btnLoading) {
                  return;
                } else {
                  return clickHandler();
                }
              }}
            >
              {btnLoading && "loading..."}
              {!btnLoading && (isClicked ? "Add" : "Remove")}
            </button>
          );
        }
      }
    }
  };

  useEffect(() => {
    display();
  }, []);

  return (
    <div className="UserFriendCard">
      {" "}
      <div className="profile-picture">{[...value.fname[0].toLowerCase()]}</div>
      <div className="name-container">
        <Link
          to={{
            pathname: `/user/${value.username}`,
            state: value._id,
          }}
          onClick={() => {
            setParamsChanged(!paramsChanged);
          }}
        >
          <div className="name">
            <span>{value.fname}</span>
            <span>{value.lname}</span>
          </div>
        </Link>
        <div className="username">{value.username}</div>
      </div>
      <div className="add-btn">{display()}</div>
    </div>
  );
};

export default UserFriendCard;
