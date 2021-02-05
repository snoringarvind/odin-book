import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { OdinBookContext } from "./Context";

const AuthButton = ({ setLoading }) => {
  const { axios_request, isAuthValue } = useContext(OdinBookContext);

  const [isAuth, setIsAuth] = isAuthValue;

  const history = useHistory();

  const pushHistory = () => {
    const path = history.location.pathname;
    console.log(path);
    if (path === "/login" || path === "/") {
      history.push("/posts");
    }
  };

  console.log(history);
  return (
    <div className="AuthButton">
      {!isAuth && <Redirect to="/login" />}
      {isAuth && pushHistory()}
    </div>
  );
};

export default AuthButton;
