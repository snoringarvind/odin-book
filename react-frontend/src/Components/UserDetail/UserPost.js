import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import MypostCreate from "../MyPosts/MyPostCreate";
import moment from "moment";
import "./UserPost.css";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import UserPostCard from "./UserPostCard";
import MyPostDelete from "../MyPosts/MyPostDelete";

const UserPost = ({ path }) => {
  // console.log(path);
  const {
    jwtData,
    axios_request,
    myPostsValue,
    didMyPostsMountValue,
    myNewsFeedValue,
    didMyNewsFeedMountValue,
  } = useContext(OdinBookContext);
  const [myPosts, setMyPosts] = myPostsValue;
  const [myNewsfeed, setMyNewsFeed] = myNewsFeedValue;
  const [didMyNewsFeedMount, setDidMyNewsFeedMount] = didMyNewsFeedMountValue;
  const [didMyPostsMount, setDidMyPostsMount] = didMyPostsMountValue;

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  //herer result is the post list
  const [result, setResult] = useState([]);

  const [isOwner, setIsOwner] = useState(false);
  const [updateClick, setUpdateClick] = useState("");
  const [createClick, setCreateClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [likeLength, setLikeLength] = useState([]);

  // const [commentLength, setCommentLength] = useState([]);

  //this is so we don't have to make request to the server to prefill the update form.
  const [updateData, setUpdateData] = useState("");

  const [postid, setPostid] = useState("");

  const [updateIndex, setUpdateIndex] = useState("");

  const [indexOfCardClicked, setindexOfCardClicked] = useState(null);

  const location = useLocation();

  // console.log(location);

  //putting in an if-block since in news feed location.state will be undefined
  let userid;
  if (path == "userpost") {
    userid = location.state.userid;
  }

  const params = useParams();
  // console.log("params", params);

  const get_posts = () => {
    let post_list_route;
    if (path == "userpost") {
      post_list_route = `/posts/${userid}`;
    } else if (path === "newsfeed") {
      post_list_route = "/news-feed";
    }

    const post_list_method = "GET";
    const cb_error = (err) => {
      setError(err.mesage);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      if (path == "newsfeed") {
        setMyNewsFeed(response.data);
      } else {
        if (userid === jwtData.sub) {
          setMyPosts(response.data);
        }
      }

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

  // console.log(path);

  useEffect(() => {
    // console.log(userid);
    if (path == "userpost") {
      //herer if the url is news-feed , the userid will be undefined.
      if (userid !== jwtData.sub) {
        // console.log(userid, jwtData.sub);
        get_posts();
        setIsOwner(false);
      } else {
        if (didMyPostsMount) {
          get_posts();
          setIsOwner(true);
          setDidMyPostsMount(false);
        } else {
          setResult(myPosts);
          setGetLoading(false);
          setIsOwner(true);
        }
      }
    } else if (path == "newsfeed") {
      if (didMyNewsFeedMount) {
        get_posts();
        setIsOwner(false);
        setDidMyNewsFeedMount(false);
        // console.log(didMyNewsFeedMount);
      } else {
        setResult(myNewsfeed);
        setGetLoading(false);
        setIsOwner(false);
        // console.log("hello");
      }
    }

    // setLikeLength([]);
    console.log(getLoading);

    //if the owner then show the post form
    //here owner is the logged in user
    //and the userid is of the person we are browing which will be in the url
  }, []);

  console.log(getLoading);
  console.log(path);
  console.log(myNewsfeed);
  console.log(result);

  // console.log("hello");
  // useEffect(() => {
  //   setLikeLength([]);
  // }, [likeLength]);
  // useEffect(() => {
  //   if(indexOfCardClicked)
  // }, [optionClick]);

  const post_create_response = (response) => {
    // setNewPost([...result, response.data.save_post]);
    // console.log(response.data.save_post);
    // console.log(result);
    // console.log(response);
    setResult([response.data].concat(result));
    console.log([response.data].concat(result));

    // result.unshift(response.data);
  };

  const post_update_response = (response) => {
    // console.log(response);
    result[updateIndex] = response.data;
    setResult(result);
  };

  //uding updateindex for update and delete same
  const post_delete_repsonse = (response) => {
    console.log(response);
    //as soon as we get the response delete the post from the screen

    console.log(result);
    result.splice(updateIndex, 1);
    setResult(result);

    //we are doing this here bcoz jab tak child component mein value change nahi hota parent component re-render nahi hoga.
    //MyPostDelete meinn setDelteClick mein same component mein hi deleteClick value change karna pad raha tha isliye UserPost re-render nahi ho raha tha.
    //but postupdate and postcreate ka click-value child compoenent postform mein change ho raha tha isliye userpost re-render ho raha tha.
    setDeleteClick(false);
  };

  // console.log(location.pathname);

  const [likeClick, setLikeClick] = useState([]);
  const [UserLikedIndex, setUsersLikedIndex] = useState(null);

  return (
    <div className="UserPost">
      {/* doing path=='newsfeed' herer bcoz for a second it shows loading even if we are loading the data from state */}
      {/* maybe we will show loading even for newsfeed for a second. */}
      {/* {getLoading && path !== "newsfeed" && "loading"} */}
      {getLoading && (
        <div className="loading-container">
          <div className="spinner-border loading" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
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
            {deleteClick && (
              <MyPostDelete
                setDeleteClick={setDeleteClick}
                deleteClick={deleteClick}
                user_delete_response={post_delete_repsonse}
                postid={postid}
              />
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
                  isOwner={isOwner}
                  setDeleteClick={setDeleteClick}
                  deleteClick={deleteClick}
                  likeLength={likeLength}
                  setLikeLength={setLikeLength}
                  likeClick={likeClick}
                  setLikeClick={setLikeClick}
                  postsLength={result.length}
                  UserLikedIndex={UserLikedIndex}
                  setUsersLikedIndex={setUsersLikedIndex}
                  path={path}
                />
              );
            })}
          </>
        ))}
    </div>
  );
};

export default UserPost;
