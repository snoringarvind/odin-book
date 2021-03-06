import React, { useContext, useState } from "react";
import "./CommentCard.css";
import { Link, useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
// import CommentUpdate from "../Comment/CommentUpdate";
import CommentDelete from "../Comment/CommentDelete";

const CommentCard = ({
  comment,
  index,
  postIndex,
  path,
  commentOptionIndex,
  setCommentOptionIndex,
  postid,
  comments,
  setComments,
  pp,
  setpp,
  setGetLoading,
}) => {
  const { jwtData } = useContext(OdinBookContext);

  // const [commentUpdateClick, setCommentUpdateClick] = useState(false);
  const [commentDeleteClick, setCommentDeleteClick] = useState(false);

  const userid = JSON.parse(localStorage.getItem("local_history")).userid;

  return (
    <div className="CommentCard">
      <div className="profile-picture">
        {[...comment.user.fname[0].toLowerCase()]}
      </div>
      <div className="comment-container">
        <div
          className="name"
          onClick={() => {
            setGetLoading(true);
          }}
        >
          {/* doin this if block because hash-router forbids visiting the same link again and the userid from localstorage is from the url */}
          {(path == "newsfeed" || userid !== comment.user._id) && (
            <Link
              to={{
                pathname: `/user/${comment.user.username}/posts`,
                state: {
                  fname: comment.user.fname,
                  lname: comment.user.lname,
                  username: comment.user.username,
                  userid: comment.user._id,
                },
              }}
            >
              <span>{comment.user.fname} </span>
              <span>{comment.user.lname}</span>
            </Link>
          )}
          {path != "newsfeed" && userid === comment.user._id && (
            <>
              <span>{comment.user.fname} </span>
              <span>{comment.user.lname}</span>
            </>
          )}
        </div>
        <div className="comment">{comment.comment}</div>
      </div>
      <div
        className="option-icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (commentOptionIndex == index) {
            setCommentOptionIndex(null);
          } else {
            setCommentOptionIndex(index);
          }
        }}
      >
        <div
          style={{
            backgroundColor: commentOptionIndex == index ? "lightgray" : "",
          }}
          className="btn fas fa-ellipsis-v"
        ></div>
        {commentOptionIndex === index && (
          <div className="comment-menu">
            {/* <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCommentUpdateClick(!commentUpdateClick);
            }}
          >
            Edit
          </div> */}
            <div
              className="comment-btn delete-comment-btn"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCommentDeleteClick(!commentDeleteClick);
              }}
            >
              Delete
            </div>
          </div>
        )}
        {/* {commentUpdateClick && (
        <CommentUpdate
          postid={postid}
          updateValue={comment.comment}
          setComments={setComments}
          commentid={comment._id}
          commentUpdateClick={commentUpdateClick}
          setCommentUpdateClick={setCommentUpdateClick}
        />
      )} */}
        {commentDeleteClick && (
          <CommentDelete
            postid={postid}
            index={index}
            setComments={setComments}
            comments={comments}
            commentid={comment._id}
            commentDeleteClick={commentDeleteClick}
            setCommentDeleteClick={setCommentDeleteClick}
            pp={pp}
            setpp={setpp}
            setCommentOptionIndex={setCommentOptionIndex}
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
