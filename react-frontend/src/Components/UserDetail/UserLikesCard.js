import React from "react";
import "./UserLikes.css";

const UserLikesCard = ({ value, index, myFriendList }) => {
  // let g = myFriendList.includes()
  console.log(myFriendList);

  return (
    <div className="UserLikesCard">
      <div className="profile-picture">{[...value.fname[0].toLowerCase()]}</div>
      <div className="name">
        <span>{value.fname}</span>
        <span>{value.lname}</span>
      </div>
    </div>
  );
};

export default UserLikesCard;
