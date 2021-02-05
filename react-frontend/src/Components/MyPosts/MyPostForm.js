import React, { useContext, useState } from "react";
import { OdinBookContext } from "../Context";
import uniqid from "uniqid";
import { useHistory, useParams } from "react-router-dom";

const MyPostForm = ({ route, update_value, method }) => {
  const [state, setState] = useState({
    title: update_value ? update_value.title : "",
    content_text: update_value ? update_value.content_text : "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  const { axios_request } = useContext(OdinBookContext);
  const [postLoading, setPostLoading] = useState(false);

  const history = useHistory();

  const changeHandler = (e) => {
    const { value, name } = e.target;

    setState({ ...state, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setPostLoading(true);
    const axios_error = (err) => {
      if (err.response) {
        console.log(err.response.data);
        setErrors(err.response.data);
      } else {
        console.log(err.message);
        setError(err.message);
      }
      setPostLoading(false);
    };

    const axios_response = (response) => {
      console.log(response);
      history.push(`/mypost/${response.data.id}`);
    };

    axios_request({
      route: route,
      data: state,
      method: method,
      axios_error: axios_error,
      axios_response: axios_response,
    });
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
    <div className="MyPostForm">
      {error && <div className="error">{error}</div>}
      {!error && (
        <form>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Enter your post title"
              name="title"
              value={state.title}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content_text">Text</label>
            <textarea
              type="text"
              id="content_text"
              name="content_text"
              placeholder="Add text"
              value={state.content_text}
              onChange={changeHandler}
            />
          </div>
          {display_errors()}
          <div className="submit-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                //to prevent multiple clicks
                if (!postLoading) {
                  submitHandler(e);
                } else {
                  return;
                }
              }}
            >
              {!postLoading ? "Submit" : "Submitting..."}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default MyPostForm;
