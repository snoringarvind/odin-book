import React from "react";

const NewsFeedCard = ({ value, index }) => {
  return (
    <div className="NewsFeedCard">
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
        <div className="post-content-container">
          <div className="post-title">{value.title}</div>
          <div className="post-content">{value.content_text}</div>
        </div>
        <div className="no-like">
          {/* <span>{likeLength === "" ? value.like.length : likeLength} </span> */}
          <span>
            {/* {(likeLength === "" ? value.like.length : likeLength) === 1 */}
            {/* ? "  like" */}
            {/* : "  likes"} */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedCard;
