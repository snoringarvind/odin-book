import React from "react";

const Logout = () => {
  return <div className="Logout">{localStorage.clear()}</div>;
};

export default Logout;
