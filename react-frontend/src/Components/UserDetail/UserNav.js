import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import "./UserNav.css";

const UserNav = ({ to, state, label }) => {
  const match = useRouteMatch({ path: to });

  return (
    <div className={match ? "active nav-links" : "nav-links"}>
      <Link to={{ pathname: to, state: state }}>{label}</Link>
    </div>
  );
};

export default UserNav;
