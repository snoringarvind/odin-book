import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MyFriendsCard from "./MyFriendsCard";
import "./MyFriends.css";

const MyFriends = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);

  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  const userid = jwtData.sub;
  const myfriend_list_route = `/friend/${userid}`;
  const myfriend_list_method = "GET";

  const [isChanged, setIschanged] = useState(false);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      setResult(response.data);
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

  useEffect(() => {
    make_server_request();
  }, []);

  return (
    <div className="MyFriends">
      {" "}
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          result.map((value, index) => {
            return (
              <MyFriendsCard
                value={value}
                index={index}
                result={result}
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
