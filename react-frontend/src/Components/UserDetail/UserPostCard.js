import React, { useEffect, useState } from "react";

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
}) => {
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
      <div className="card-footer">
        <div className="far fa-thumbs-up"></div>
        <div className="far fa-comment-alt"></div>
        <div className="far fa-share-square"></div>
      </div>
    </div>
  );
};

export default UserPostCard;
