import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import { Redirect, useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { axios_request, isAuthValue } = useContext(OdinBookContext);
  const [isAuth, setIsAuth] = isAuthValue;
  const [isloginClick, setIsLoginClick] = useState(false);

  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [postLoading, setPostLoading] = useState(false);

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
      setPostLoading(false);
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

  const history = useHistory();

  // useEffect(() => {
  //   if (isAuth == true) {
  //     history.push("/");
  //   }
  // }, [isAuth]);

  return (
    <div className="Login">
      {error && <div className="error">{error}</div>}
      {!error && (
        <form>
          <div className="head"> Login</div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={changeHandler}
              value={state.username}
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
              value={state.password}
            />
          </div>
          {display_errors()}
          <div className="buttons">
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
                {postLoading ? "Logging-in" : "Log-in"}
              </button>
            </div>
            <div
              className="signup-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginClick(true);
              }}
            >
              <button>Sign-up</button>
            </div>
          </div>

          {isloginClick && <Redirect to="/signup" />}
        </form>
      )}
    </div>
  );
};

export default Login;
