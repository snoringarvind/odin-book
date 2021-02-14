import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { OdinBookContext } from "../Context";
import "./Hamburger.css";

const Hamburger = () => {
  const { jwtData } = useContext(OdinBookContext);
  // console.log(jwtData);

  return (
    <div className="Hamburger">
      <div className="account">
        <div className="profile-picture"></div>
        <div className="nav-link-container">
          <Link
            to={{
              pathname: `/user/${jwtData.user}/posts`,
              state: {
                fname: jwtData.fname,
                lname: jwtData.lname,
                username: jwtData.user,
                userid: jwtData.sub,
              },
            }}
          >
            <div className="user">{jwtData.user}</div>
            <div className="nav-link-desc">See your profile</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
