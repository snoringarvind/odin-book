import React from "react";
import { Link } from "react-router-dom";
import "./Hamburger.css";

const Hamburger = () => {
  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  const user = jwtData.user;
  return (
    <div className="Hamburger">
      <div className="account">
        <div className="profile-picture"></div>
        <div className="nav-link-container">
          <Link to="/account">
            <div className="user">{user}</div>
            <div className="nav-link-desc">See your profile</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
