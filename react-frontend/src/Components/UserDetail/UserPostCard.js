import React from "react";
import uniqid from "uniqid";

const UserPostCard = ({
  value,
  index,
  setPostid,
  setUpdateClick,
  setUpdateData,
  result,
  setUpdateIndex,
}) => {
  // console.log(result);
  return (
    <div className="UserPostCard">
      <div className="card">
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
          <div
            className="options-icon fas fa-ellipsis-v"
            onClick={(e) => {
              e.preventDefault();
              setPostid(value._id);
              setUpdateClick(true);
              setUpdateData(value);
              setUpdateIndex(index);
            }}
          ></div>
        </div>
        <div className="post-content-container">
          <div className="post-title">{value.title}</div>
          <div className="post-content">{value.content_text}</div>
        </div>
        <div className="card-footer">
          <div className="far fa-thumbs-up"></div>
          <div className="far fa-comment-alt"></div>
          <div className="far fa-share-square"></div>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
