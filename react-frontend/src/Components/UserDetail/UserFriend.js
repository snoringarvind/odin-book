import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./UserFriend.css";
import UserFriendCard from "./UserFriendCard";
import async from "async";
import { axios_request } from "../Utils";

const UserFriend = () => {
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [userFriendList, setUserFriendList] = useState([]);

  const [isChanged, setIsChanged] = useState(false);
  const { myFriendsValue } = useContext(OdinBookContext);
  const [myFriends, setMyFriends] = myFriendsValue;
  const location = useLocation();
  const userid = location.state.userid;

  const friend_list_route = `/friend/${userid}`;
  const friend_list_method = "GET";

  // const params = useParams();
  // console.log("params", params);
  // const history = useHistory();
  // console.log("histroy", history);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    const cb_response = (response) => {
      setGetLoading(false);
      setResult(response.data);
      // console.log(response);
      const h = Array(response.data.length).fill(true);
      setUserFriendList(h);
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
    console.log(jwtData.sub, userid);
    if (jwtData.sub !== userid) {
      make_server_request();
    } else {
      setResult(myFriends);
      setGetLoading(false);
    }
    // get_my_friend_list();
  }, [location.pathname]);

  // console.log(myFriendList);
  // console.log(result);
  return (
    <div className="UserFriend">
      {getLoading && "loading.."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          result.map((value, index) => {
            return (
              <UserFriendCard
                value={value}
                index={index}
                setError={setError}
                key={uniqid()}
                userFriendList={userFriendList}
                setUserFriendList={setUserFriendList}
                userid={userid}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
            );
          })
        ))}
    </div>
  );
};

export default UserFriend;
