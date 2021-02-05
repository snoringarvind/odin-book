import React from "react";

const Logout = () => {
  return (
    <div className="Logout">
      {localStorage.clear()}
      {window.location.reload()}
    </div>
  );
};

export default Logout;
