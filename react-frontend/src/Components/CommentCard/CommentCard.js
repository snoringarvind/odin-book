import React, { useContext } from "react";
import "./CommentCard.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";

const CommentCard = ({ comment, index, postIndex, path }) => {
  console.log(comment);

  const { jwtData } = useContext(OdinBookContext);
  return (
    <div className="CommentCard">
      <div className="profile-picture">
        {[...comment.user.fname[0].toLowerCase()]}
      </div>
      <div className="comment-container">
        <div className="name">
          {path !== "userpost" && (
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
          {path === "userpost" && (
            <>
              <span>{comment.user.fname} </span>
              <span>{comment.user.lname}</span>
            </>
          )}
        </div>
        <div className="comment">{comment.comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
