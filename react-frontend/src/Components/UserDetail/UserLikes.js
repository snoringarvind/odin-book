import axios from "axios";
import React, { useEffect, useState } from "react";
import { axios_request } from "../Utils";
import "./UserLikes.css";
import UserLikesCard from "./UserLikesCard";
import uniqid from "uniqid";
import { useParams } from "react-router-dom";

const UserLikes = ({ postid, setUsersLikedIndex }) => {
  const [error, setError] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [myFriendList, setMyFriendList] = useState([]);

  const location = useParams();
  // const userid = location.state;
  // console.log(userid);
  console.log(location);
  const params = useParams();
  console.log(params);
  const get_users_liked = () => {
    // const userid = location.state();

    // const route = `/friend/${}`;
    const method = "GET";
    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {
      setLikeList(response.data.like);
    };

    // axios_request({
    //   route: route,
    //   method: method,
    //   data: "",
    //   axios_error: cb_error,
    //   axios_response: cb_response,
    // });
  };

  const get_friend_list = () => {
    const route = `/post/${postid}/like`;
    const method = "GET";
    const cb_error = (err) => {
      setError(err.message);
    };

    const cb_response = (response) => {
      setMyFriendList(response.data.like);
    };

    axios_request({
      route: route,
      method: method,
      data: "",
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    get_users_liked();
    // get_friend_list();
  }, []);

  return (
    <div className="UserLikes">
      <div className="box">
        <div
          className="form-close-btn fas fa-times-circle"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setUsersLikedIndex(null);
          }}
        ></div>
        {likeList.map((value, index) => {
          return (
            <UserLikesCard
              value={value}
              index={index}
              key={uniqid()}
              myFriendList={myFriendList}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserLikes;
