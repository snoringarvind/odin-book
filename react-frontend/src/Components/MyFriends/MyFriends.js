import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MyFriendsCard from "./MyFriendsCard";
import "./MyFriends.css";

const MyFriends = () => {
  const { axios_request, myFriendsValue, didfriendsMountValue } = useContext(
    OdinBookContext
  );
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  // const [result, setResult] = useState([]);

  const [myFriends, setMyFriends] = myFriendsValue;
  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  const userid = jwtData.sub;
  const myfriend_list_route = `/friend/${userid}`;
  const myfriend_list_method = "GET";

  const [isChanged, setIschanged] = useState(false);
  const [didfriendsMount, setDidfriendsMount] = didfriendsMountValue;

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      // setResult(response.data);
      setMyFriends(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: myfriend_list_route,
      data: "",
      method: myfriend_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  console.log(didfriendsMount);
  useEffect(() => {
    if (didfriendsMount == true) {
      make_server_request();
    }
    setDidfriendsMount(false);
  }, []);

  console.log(myFriendsValue);
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
                result={myFriends}
                setError={setError}
                key={uniqid()}
                isChanged={isChanged}
                setIschanged={setIschanged}
              />
            );
          })
        ))}
    </div>
  );
};

export default MyFriends;
