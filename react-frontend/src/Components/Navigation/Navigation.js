import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ to, label }) => {
  // console.log(to);
  // console.log(label);
  const match = useRouteMatch({ path: to });

  return (
    <div className={match ? "active nav-links" : "nav-links"}>
      <Link to={to}>{label}</Link>
    </div>
  );
};

export default Navigation;
