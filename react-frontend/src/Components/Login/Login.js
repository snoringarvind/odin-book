import React, { useContext, useState } from "react";
import axios from "axios";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";

const Login = () => {
  const { serverUrl } = useContext(OdinBookContext);
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  const axios_login = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: `${serverUrl}/login`,
        data: state,
      });
      localStorage.setItem("jwtData", JSON.stringify(response.data.jwtData));
      setPostLoading(false);
    } catch (err) {
      if (err.response) {
        //if 404 or post-validation errors
        console.log("setErrors=", err.response.data);
        setErrors(err.response.data);
      } else {
        //if couldn't connect to server and cannot get any reponse
        console.log("setError=", err.message);
        setError(err.message);
      }
      setPostLoading(false);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

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
                if (!postLoading) {
                  return axios_login(e);
                } else {
                  e.preventDefault();
                  return;
                }
              }}
            >
              {postLoading ? "Logging-in" : "Login"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
