import React from "react";
import { Link } from "react-router-dom";
import "./Hamburger.css";

const Hamburger = () => {
  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  let username;
  let userid;
  if (jwtData) {
    username = jwtData.user;
    userid = jwtData.sub;
  }
  return (
    <div className="Hamburger">
      <div className="account">
        <div className="profile-picture"></div>
        <div className="nav-link-container">
          <Link to={{ pathname: `/user/${username}`, state: userid }}>
            <div className="user">{username}</div>
            <div className="nav-link-desc">See your profile</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
