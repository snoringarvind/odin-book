import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./UserFriend.css";
import UserFriendCard from "./UserFriendCard";
import async from "async";

const UserFriend = ({ path }) => {
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const [friendBtn, setFriendBtn] = useState([]);

  const [isChanged, setIsChanged] = useState(false);
  const { myFriendsValue, didMyFriendsMountValue, axios_request } = useContext(
    OdinBookContext
  );

  const [didMyFriendsMount, setDidMyFriendsMount] = didMyFriendsMountValue;

  const [myFriends, setMyFriends] = myFriendsValue;
  const location = useLocation();
  let userid;
  //since there will be no location.state for myfriends route.
  if (path != "myfriends") {
    userid = location.state.userid;
  }

  // const params = useParams();
  // console.log("params", params);
  // const history = useHistory();
  // console.log("histroy", history);

  const make_server_request = () => {
    let friend_list_route;
    if (path == "myfriends") {
      friend_list_route = `/friend/${jwtData.sub}`;
    } else {
      friend_list_route = `/friend/${userid}`;
    }
    const friend_list_method = "GET";

    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      if (path == "myfriends") {
        setMyFriends(response.data);
      } else {
        if (userid == jwtData.sub) {
          setMyFriends(response.data);
        } else {
          const h = Array(response.data.length).fill(true);
          setFriendBtn(h);
        }
      }
      setResult(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: friend_list_route,
      data: "",
      method: friend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };
  const { jwtData } = useContext(OdinBookContext);

  useEffect(() => {
    if (path == "myfriends") {
      if (didMyFriendsMount) {
        make_server_request();
        setDidMyFriendsMount(false);
      } else {
        setResult(myFriends);
        setGetLoading(false);
      }
    } else {
      if (jwtData.sub !== userid) {
        make_server_request();
      } else {
        if (didMyFriendsMount) {
          make_server_request();
          setDidMyFriendsMount(false);
        } else {
          setResult(myFriends);
          setGetLoading(false);
        }
      }
    }

    // get_my_friend_list();
  }, [location.pathname]);

  // console.log(myFriendList);
  // console.log(result);
  return (
    <div className="UserFriend">
      {getLoading && (
        <div className="loading-container">
          <div className="spinner-border loading" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : result.length == 0 ? (
          <div className="empty">
            <div>No friends to show.</div>
            {(path == "myfriends" || jwtData.sub == userid) && (
              <>
                <div>You can add them by searching their name :)</div>
                <div>To search with username, please prefix with '@' :)</div>
              </>
            )}
          </div>
        ) : (
          result.map((value, index) => {
            return (
              <UserFriendCard
                value={value}
                index={index}
                setError={setError}
                key={uniqid()}
                friendBtn={friendBtn}
                setFriendBtn={setFriendBtn}
                userid={userid}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
                path={path}
              />
            );
          })
        ))}
    </div>
  );
};

export default UserFriend;
