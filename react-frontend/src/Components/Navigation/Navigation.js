import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ to, label }) => {
  // console.log(to);
  // console.log(label);
  let match = useRouteMatch({ path: to });

  if (match != null) {
    match = match.isExact ? true : false;
  } else {
    match = false;
  }

  // console.log(to);
  // console.log(match, label, to);
  // console.log(match, label);
  return (
    <div className={match ? "active nav-links" : "nav-links"}>
      <Link to={to}>
        <i className={label}></i>
      </Link>
    </div>
  );
};

export default Navigation;
