import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MypostCreate from "../MyPosts/MyPostCreate";
import moment from "moment";
import "./UserPost.css";
import MyPostUpdate from "../MyPosts/MyPostUpdate";

const UserPost = () => {
  const { axios_request, userPostResultValue } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  // const [result, setResult] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [userPostResult, setUserPostResult] = userPostResultValue;

  const [newPost, setNewPost] = useState("");

  //this is so we don't have to make request to the server to prefill the update form.
  const [updateData, setUpdateData] = useState("");

  const [postid, setPostid] = useState("");

  const location = useLocation();
  const userid = location.state;
  const post_list_route = `/posts/${userid}`;
  const post_list_method = "GET";

  const params = useParams();
  console.log("params", params);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.mesage);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      // setResult(response.data);
      setUserPostResult(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: post_list_route,
      data: "",
      method: post_list_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));

    if (jwtData) {
      const logged_in_userid = jwtData.sub;
      if (logged_in_userid.toString() === userid.toString()) {
        setIsOwner(true);
      }
    }
    make_server_request();

    //if the owner then show the post form
    //here owner is the logged in user
    //and the userid is of the person we are browing which will be in the url
  }, []);

  const cb_error = (err) => {};

  const user_post_response = (response) => {
    setNewPost(response);
    console.log(response);
    // result.unshift(response.data);
  };

  const display_posts = () => {
    let arr = [];

    if (userPostResult.length === 0) {
      return <div className="empty">No posts to show.</div>;
    } else {
      for (let i = 0; i < userPostResult.length; i++) {
        arr.push(
          <div className="card" key={uniqid()}>
            <div className="head">
              <div className="profile-picture">
                {[...userPostResult[i].user.fname[0].toLowerCase()]}
              </div>
              <div className="name-container">
                <div className="name">
                  <span>{userPostResult[i].user.fname} </span>
                  <span>{userPostResult[i].user.lname}</span>
                </div>

                <div className="username">
                  {userPostResult[i].user.username}
                </div>
              </div>
              <div
                className="options-icon fas fa-ellipsis-v"
                onClick={(e) => {
                  e.preventDefault();
                  setPostid(userPostResult[i]._id);
                  setUpdateClick(true);
                  setUpdateData(userPostResult[i]);
                }}
              ></div>
            </div>
            <div className="post-content-container">
              <div className="post-title">{userPostResult[i].title}</div>
              <div className="post-content">
                {userPostResult[i].content_text}
              </div>
            </div>
            <div className="card-footer">
              <div className="far fa-thumbs-up"></div>
              <div className="far fa-comment-alt"></div>
              <div className="far fa-share-square"></div>
            </div>
          </div>
        );
      }
      return arr;
    }
  };

  return (
    <div className="UserPost">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {isOwner && (
              <div>
                <MypostCreate user_post_response={user_post_response} />
              </div>
            )}
            {updateClick && (
              <div>
                <MyPostUpdate
                  postid={postid}
                  updateClick={updateClick}
                  setUpdateClick={setUpdateClick}
                  updateData={updateData}
                />
              </div>
            )}
            {display_posts()}
          </>
        ))}
    </div>
  );
};

export default UserPost;
