import React from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";

const CommentCard = ({ value, index, postIndex }) => {
  return (
    <div className="CommentCard">
      <div className="profile-picture">
        {[...value.user.fname[0].toLowerCase()]}
      </div>
      <div className="comment-container">
        <div className="name">
          <Link
            to={{
              pathname: `/user/${value.user.username}/posts`,
              state: value.user._id,
            }}
          >
            <span>{value.user.fname} </span>
            <span>{value.user.lname}</span>
          </Link>
        </div>
        <div className="comment">{value.comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
