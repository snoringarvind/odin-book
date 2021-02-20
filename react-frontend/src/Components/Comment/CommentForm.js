import React, { useContext, useState } from "react";

import uniqid from "uniqid";
import "./CommentForm.css";
import { OdinBookContext } from "../Context";

const CommentForm = ({
  setComments,
  postIndex,
  setNewCommentLoading,
  route,
  method,
  updateValue,
}) => {
  const { jwtData, axios_request } = useContext(OdinBookContext);
  const [state, setState] = useState({
    comment: updateValue ? updateValue : "",
  });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const post_comment = (e) => {
    e.preventDefault();

    console.log(updateValue);
    let element;
    element = document.querySelector(`#post-${postIndex}`);
    console.log(postIndex);

    if (element) {
      const remove_empty = element.querySelector(`#post-${postIndex} .empty`);
      if (remove_empty) {
        remove_empty.style.display = "none";
      }
    }

    setNewCommentLoading(true);

    console.log(element);
    if (element) {
      const height = element.scrollHeight;
      console.log(height);
      element.scrollTop = height;
    }

    const cb_error = (err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
    };
    const cb_response = (response) => {
      setErrors([]);
      setState({ comment: "" });
      console.log(response.data);
      setComments(response.data);

      if (element) {
        const height = element.scrollHeight;
        console.log(height);
        console.log("helloooooo");
        console.log(element);
        element.scrollTop = height;
      }

      setNewCommentLoading(false);
    };

    axios_request({
      route: route,
      data: state,
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
    setState({ comment: "" });
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
    <div className="CommentForm">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="profile-picture">
            {[jwtData.fname[0].toLowerCase()]}
          </div>
          <form onSubmit={post_comment} autoComplete="off">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Write a comment..."
              value={state.comment}
              onChange={changeHandler}
            />
          </form>
          {display_errors()}
        </>
      )}
    </div>
  );
};

export default CommentForm;
