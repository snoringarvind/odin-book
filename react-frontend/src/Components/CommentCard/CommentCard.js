import React from "react";
import "./CommentCard.css";

const CommentCard = ({ value, index, postIndex }) => {
  return (
    <div className="CommentCard">
      <div className="profile-picture">
        {[...value.user.fname[0].toLowerCase()]}
      </div>
      <div className="comment-container">
        <div className="name">
          <span>{value.user.fname} </span>
          <span>{value.user.lname}</span>
        </div>
        <div className="comment">{value.comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
