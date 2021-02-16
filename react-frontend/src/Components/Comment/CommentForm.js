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
  console.log(updateValue);
  const { jwtData, axios_request } = useContext(OdinBookContext);
  const [state, setState] = useState({
    comment: updateValue ? updateValue : "",
  });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const post_comment = (e) => {
    e.preventDefault();

    // setNewCommentLoading(true);

    console.log(updateValue);
    let element;
    if (updateValue !== undefined) {
      element = document.querySelector(`#post-${postIndex}`);
      const remove_empty = element.querySelector(".empty");
      if (remove_empty) {
        remove_empty.style.display = "none";
      }
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
      // setComments(response.data);
      setErrors([]);
      setState({ comment: "" });
      // console.log(comments);
      console.log(response.data);
      setComments(response.data);

      if (updateValue !== undefined) {
        const height = element.scrollHeight;
        console.log(height);
        element.scrollTop = height;
      }
      // setNewCommentLoading(false);
      // console.log([response.data.comment_list].concat(comments.comment_list));
      // setComments([response.data].concat(comments));
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
