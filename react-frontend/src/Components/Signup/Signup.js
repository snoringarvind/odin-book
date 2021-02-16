import React, { useContext, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";

const Signup = () => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const [state, setState] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  const axios_signup = () => {
    setPostLoading(true);
    const signup_route = "/signup";
    const signup_method = "POST";
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
      setErrors([]);
      setError("");
    };

    axios_request({
      route: signup_route,
      data: state,
      method: signup_method,
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

  return (
    <div className="Signup">
      {error && <div className="error">{error}</div>}
      {!error && (
        <form>
          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="Enter your First Name"
              onChange={changeHandler}
              value={state.fname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Enter your Last Name"
              onChange={changeHandler}
              value={state.lname}
            />
          </div>
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
          <div className="login-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!postLoading) {
                  return axios_signup();
                } else {
                  return;
                }
              }}
            >
              {postLoading ? "signing-in" : "Sign-up"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
