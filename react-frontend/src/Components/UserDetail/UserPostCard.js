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
                className="menu-btn"
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
              <div className="menu-btn">
                <span className="far fa-trash-alt icon"></span>
                <span className="label">Delete post</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
