import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MyFriendsCard from "./MyFriendsCard";
import "./MyFriends.css";
import { axios_request } from "../Utils";

const MyFriends = () => {
  const {
    myFriendsValue,
    myFriendsBtnValue,
    didfriendsMountValue,
  } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  // const [result, setResult] = useState([]);

  const [myFriends, setMyFriends] = myFriendsValue;
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    console.log("hello");
    setMyFriends(myFriends);
  }, [isChanged]);
  // const [myFriendsBtn, setMyFriendsBtn] = myFriendsBtnValue;

  // // const [isChanged, setIschanged] = useState(false);
  // const [didfriendsMount, setDidfriendsMount] = didfriendsMountValue;

  // const make_server_request = () => {
  //   const cb_error = (err) => {
  //     setError(err.message);
  //     setGetLoading(false);
  //   };
  //   const cb_response = (response) => {
  //     // setResult(response.data);
  //     setMyFriends(response.data);
  //     setGetLoading(false);
  //     console.log(response.data.length);
  //     const h = Array(response.data.length).fill(true);
  //     setMyFriendsBtn(h);
  //   };

  //   axios_request({
  //     route: myfriend_list_route,
  //     data: "",
  //     method: myfriend_list_method,
  //     axios_error: cb_error,
  //     axios_response: cb_response,
  //   });
  // };

  // console.log(didfriendsMount);
  // useEffect(() => {
  //   if (didfriendsMount == true) {
  //     make_server_request();
  //   }
  //   setDidfriendsMount(false);
  // }, []);

  // console.log(myFriendsBtn);

  return (
    <div className="MyFriends">
      {" "}
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          myFriends.map((value, index) => {
            return (
              <MyFriendsCard
                value={value}
                index={index}
                myFriends={myFriends}
                setMyFriends={setMyFriends}
                setError={setError}
                key={uniqid()}
                // setMyFriendsBtn={setMyFriendsBtn}
                // myFriendsBtn={myFriendsBtn}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
            );
          })
        ))}
    </div>
  );
};

export default MyFriends;
