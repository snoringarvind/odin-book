import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MypostCreate from "../MyPosts/MyPostCreate";
import moment from "moment";
import "./UserPost.css";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import UserPostCard from "./UserPostCard";

const UserPost = () => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [updateClick, setUpdateClick] = useState("");
  const [createClick, setCreateClick] = useState(false);

  //this is so we don't have to make request to the server to prefill the update form.
  const [updateData, setUpdateData] = useState("");

  const [postid, setPostid] = useState("");

  const [updateIndex, setUpdateIndex] = useState("");

  const [indexOfCardClicked, setindexOfCardClicked] = useState(null);

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
      setResult(response.data);
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

  // useEffect(() => {
  //   if(indexOfCardClicked)
  // }, [optionClick]);

  const post_create_response = (response) => {
    // setNewPost([...result, response.data.save_post]);
    // console.log(response.data.save_post);
    // console.log(result);

    setResult([response.data].concat(result));
    console.log([response.data].concat(result));

    // result.unshift(response.data);
  };

  const post_update_response = (response) => {
    result[updateIndex] = response.data;
    setResult(result);
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
                <MypostCreate
                  user_post_response={post_create_response}
                  createClick={createClick}
                  setCreateClick={setCreateClick}
                />
              </div>
            )}
            {updateClick && (
              <div>
                <MyPostUpdate
                  postid={postid}
                  updateClick={updateClick}
                  setUpdateClick={setUpdateClick}
                  updateData={updateData}
                  // createClick={createClick}
                  // setCreateClick={setCreateClick}
                  user_post_response={post_update_response}
                />
              </div>
            )}
            {result.map((value, index) => {
              return (
                <UserPostCard
                  key={uniqid()}
                  value={value}
                  index={index}
                  setPostid={setPostid}
                  setUpdateClick={setUpdateClick}
                  setUpdateData={setUpdateData}
                  setUpdateIndex={setUpdateIndex}
                  indexOfCardClicked={indexOfCardClicked}
                  setindexOfCardClicked={setindexOfCardClicked}
                />
              );
            })}
          </>
        ))}
    </div>
  );
};

export default UserPost;
