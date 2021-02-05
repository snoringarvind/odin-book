import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { OdinBookContext } from "./Context";

const Logout = () => {
  return (
    <div className="Logout">
      {localStorage.clear()}
      {window.location.reload()}
    </div>
  );
};

export default Logout;
