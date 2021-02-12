import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import "./UserFriend.css";
import UserFriendCard from "./UserFriendCard";
import async from "async";

const UserFriend = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const [myFriendList, setMyFriendList] = useState([]);

  const [isChanged, setIschanged] = useState(false);
  const location = useLocation();
  const userid = location.state;
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
    };

    axios_request({
      route: friend_list_route,
      data: "",
      method: friend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  // const get_my_friend_list = () => {
  //   //this is the owner id
  //   const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  //   let username;
  //   let userid;
  //   if (jwtData) {
  //     username = jwtData.user;
  //     userid = jwtData.sub;
  //   }

  //   const route = `/friend/${userid}`;
  //   const method = "GET";

  //   const cb_error = (err) => {
  //     setError(err.message);
  //   };

  //   const cb_response = (response) => {
  //     setMyFriendList(response.data);
  //   };

  //   axios_request({
  //     route: route,
  //     data: "",
  //     method: method,
  //     axios_error: cb_error,
  //     axios_response: cb_response,
  //   });
  // };

  useEffect(() => {
    make_server_request();
    // get_my_friend_list();
  }, [location.pathname]);

  useEffect(() => {
    // setTempResult(result);
    // console.log(result);
    setResult(result);

    //here change result won't work because the result is set later(takes time since it is await), and so it can't detect any change in the result, but if it was not await there was no need for "[isChanged]", we could have done "[result]" in the useEffect
  }, [isChanged]);

  // console.log(myFriendList);
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
                setResult={setResult}
                result={result}
                setError={setError}
                key={uniqid()}
                isChanged={isChanged}
                setIschanged={setIschanged}
                myFriendList={myFriendList}
              />
            );
          })
        ))}
    </div>
  );
};

export default UserFriend;
