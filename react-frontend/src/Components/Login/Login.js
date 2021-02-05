import React, { useContext, useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";

const Login = () => {
  const { axios_request, isAuthValue } = useContext(OdinBookContext);
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  const [isAuth, setIsAuth] = isAuthValue;

  const login_route = "/login";
  const login_method = "POST";

  const axios_login = async () => {
    setPostLoading(true);

    const cb_error = (err) => {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
      setPostLoading(false);
    };

    const cb_response = (response) => {
      localStorage.setItem("jwtData", JSON.stringify(response.data.jwtData));

      setPostLoading(false);
      setIsAuth(true);
    };

    axios_request({
      route: login_route,
      data: state,
      method: login_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const history = useHistory();

  const display_errors = () => {
    let arr = [];

    if (!Array.isArray(errors)) {
      arr.push(<li key={uniqid()}>{errors.msg}</li>);
    } else {
      for (let i = 0; i < errors.length; i++) {
        arr.push(<li key={uniqid()}>{errors[i].msg}</li>);
      }
    }

    return <ul className="errors">{arr}</ul>;
  };

  return (
    <div className="Login">
      {error && <div className="error">{error}</div>}
      {!error && (
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          {display_errors()}
          <div className="login-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!postLoading) {
                  return axios_login();
                } else {
                  return;
                }
              }}
            >
              {postLoading ? "Logging-in" : "Login"}
            </button>
          </div>
        </form>
      )}
      {!error && isAuth && <Redirect to="/posts" />}
    </div>
  );
};

export default Login;
