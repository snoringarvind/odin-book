import React, { useEffect, useState } from "react";
import { axios_request } from "../Utils";
import CommentForm from "../CommentForm/CommentForm";
import CommentCard from "../CommentCard/CommentCard";
import uniqid from "uniqid";

const UserPostCard = ({
  value,
  index,
  setPostid,
  setUpdateClick,
  setUpdateData,
  setUpdateIndex,
  indexOfCardClicked,
  setindexOfCardClicked,
  isOwner,
  setDeleteClick,
  deleteClick,
  logged_in_userid,
  likeLength,
  setLikeLength,
  setPostIndex,
  likeClick,
  setLikeClick,
  indexOfLikeClicked,
  setIndexOfLikeClicked,
  postsLength,
}) => {
  const [cardError, setCardError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentIconClicked, setCommentIconClicked] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [newCommentLoading, setNewCommentLoading] = useState(false);
  const [onlyOneClick, setonlyOneClick] = useState(true);

  // const [likeLength, setLikeLength] = useState("");

  const like_post = (postid) => {
    const like_post_route = `/post/${postid}/like`;
    const like_post_method = "POST";
    const cb_error = (err) => {
      setCardError(err.message);
    };
    const cb_response = (response) => {
      console.log(response);
    };

    axios_request({
      route: like_post_route,
      data: "",
      method: like_post_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const get_comments = (postid) => {
    const comments_route = `/post/${postid}/comment`;
    const comments_method = "GET";

    const cb_error = (err) => {
      setCommentError(err.mesage);
      setCommentsLoading(false);
    };
    const cb_response = (response) => {
      console.log(response.data);
      setComments(response.data);
      setCommentsLoading(false);
    };

    axios_request({
      route: comments_route,
      data: "",
      method: comments_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  let g = value.like.includes(logged_in_userid);
  // console.log(g);
  // useEffect(() => {
  //   const g = value.like.includes(logged_in_userid);
  //   if (g) {
  //     const element = document.querySelector(".like-icon");
  //     element.style.color = "blue";
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(g);
  //   setLikeClick(g);
  // }, []);

  const [pp, setpp] = useState(false);

  const show_like = () => {
    console.log(indexOfLikeClicked, likeClick);
    if (indexOfLikeClicked == null) {
      if (g) {
        return "blue";
      } else {
        return "";
      }
    } else if (indexOfLikeClicked !== null) {
      if (indexOfLikeClicked === index) {
        if (likeClick) {
          return "blue";
        } else {
          return "";
        }
      }
    }
  };

  useEffect(() => {
    likeClick.push(g);
    setLikeClick(likeClick);
    likeLength.push(value.like.length);
    setLikeLength(likeLength);
    // console.log(likeLength[index]);
    setpp(!pp);

    if (likeLength.length > postsLength) {
      // console.log(likeLength.length, postsLength);
      const x = likeLength.length - postsLength;
      likeLength.splice(postsLength, x);
    }
    if (likeClick.length > postsLength) {
      const j = likeClick.length - postsLength;
      likeClick.splice(postsLength, j);
    }
    console.log(
      "likeClick.length=",
      likeClick.length,
      "likeLength=",
      likeLength.length,
      "postslength=",
      postsLength
    );
  }, []);

  return (
    <div className="UserPostCard">
      <div className="head">
        <div className="profile-picture">
          {[...value.user.fname[0].toLowerCase()]}
        </div>
        <div className="name-container">
          <div className="name">
            <span>{value.user.fname} </span>
            <span>{value.user.lname}</span>
          </div>

          <div className="username">{value.user.username}</div>
        </div>
        {isOwner && (
          <div
            className="option-btn"
            onClick={(e) => {
              // console.log(e.target);

              e.preventDefault();
              // console.log(indexOfCardClicked, index);
              if (indexOfCardClicked == index) {
                setindexOfCardClicked(null);
              } else {
                setindexOfCardClicked(index);
              }
              // console.log(indexOfCardClicked, index);
            }}
          >
            <div className="btn">&#8942;</div>
            {indexOfCardClicked == index && (
              <div className="hamburger-menu">
                <div
                  className="menu-btn edit-button-container"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setindexOfCardClicked(null);
                    setUpdateClick(true);
                    setUpdateData(value);
                    setPostid(value._id);
                    setUpdateIndex(index);
                  }}
                >
                  <span className="far fa-edit icon"></span>
                  <span className="label">Edit post</span>
                </div>
                <div
                  className="menu-btn delete-btn-container"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setindexOfCardClicked(null);
                    setDeleteClick(true);
                    setPostid(value._id);
                    setUpdateIndex(index);
                  }}
                >
                  <span className="far fa-trash-alt icon"></span>
                  <span className="label">Delete post</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-content-container">
        <div className="post-title">{value.title}</div>
        <div className="post-content">{value.content_text}</div>
      </div>
      <div className="no-like">
        {/* <span>{likeLength[index]} </span> */}
        <span>{likeLength[index]}</span>
      </div>
      <div className="card-footer">
        <div
          style={{
            color: likeClick[index] ? "blue" : "",
            // (likeClick == null && (g ? "blue" : "")) ||
            // (likeClick !== null && (likeClick ? "blue" : "")),
          }}
          className="like-icon far fa-thumbs-up"
          onClick={(e) => {
            e.preventDefault();
            like_post(value._id);
            //   console.log(likeClick, g);
            //   if (likeClick == null) {
            //     if (g) {
            //       setLikeClick(false);
            //       setLikeLength(value.like.length - 1);
            //       console.log("hello");
            //     } else {
            //       setLikeClick(true);
            //       setLikeLength(value.like.length + 1);
            //       console.log("man");
            //     }
            //   } else {
            //     if (likeClick) {
            //       setLikeLength(likeLength - 1);
            //     } else {
            //       setLikeLength(likeLength + 1);
            //     }
            //     setLikeClick(!likeClick);
            //   }
            //   console.log(likeClick);
            //   setIndexOfLikeClicked(index);
            console.log(likeClick[index]);
            // console.log(indexOfLikeClicked);
            if (likeClick[index] == true) {
              likeLength[index] = likeLength[index] - 1;
              setLikeLength(likeLength);
            } else {
              likeLength[index] = likeLength[index] + 1;
              setLikeLength(likeLength);
            }
            setIndexOfLikeClicked(null);
            likeClick[index] = !likeClick[index];
            setLikeClick(likeClick);
            setpp(!pp);
          }}
        ></div>

        <div
          className="comment-icon far fa-comment-alt"
          onClick={(e) => {
            e.preventDefault();
            //get comments only once no need to fetch on every click.
            if (onlyOneClick) {
              get_comments(value._id);
              setonlyOneClick(false);
            }
            setCommentIconClicked(!commentIconClicked);
          }}
        ></div>
        <div className="share-icon far fa-share-square"></div>
      </div>
      <div className="comment-list" id={`post-${index}`}>
        {commentIconClicked && commentError && (
          <div className="error">{commentError}</div>
        )}
        {commentIconClicked && !commentError && commentsLoading && "loading..."}
        {commentIconClicked &&
          !commentError &&
          !commentsLoading &&
          commentIconClicked &&
          (comments.comment_list.length == 0 ? (
            <div className="empty">This post has no comments.</div>
          ) : (
            <>
              <div className="no-comment">
                <span>{comments.comment_list.length} </span>
                <span>
                  {comments.comment_list.length == 1 ? " Comment" : " Comments"}
                </span>
              </div>
              {comments.comment_list.map((value, index) => (
                <CommentCard
                  value={value}
                  key={uniqid()}
                  index={index}
                  postIndex={index}
                />
              ))}
            </>
          ))}

        <div>{newCommentLoading && "loading..."}</div>
      </div>
      {commentIconClicked && (
        <CommentForm
          profile_picture={[...value.user.fname[0].toLowerCase()]}
          postid={value._id}
          key={uniqid()}
          setComments={setComments}
          setNewCommentLoading={setNewCommentLoading}
          postIndex={index}
        />
      )}
    </div>
  );
};

export default UserPostCard;
