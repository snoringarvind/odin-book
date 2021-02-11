import React, { useState } from "react";
import { axios_request } from "../Utils";
import uniqid from "uniqid";
import "./CommentForm.css";

const CommentForm = ({
  profile_picture,
  postid,
  setComments,

  setNewCommentLoading,
}) => {
  const [state, setState] = useState({ comment: "" });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const post_comment = (e) => {
    e.preventDefault();

    setNewCommentLoading(true);

    const comments_route = `/post/${postid}/comment`;
    const comments_method = "POST";

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
      const element = document.querySelector(".comment-list");
      const height = element.scrollHeight;
      console.log(height);
      element.scrollTop = height;
      setNewCommentLoading(false);
      // console.log([response.data.comment_list].concat(comments.comment_list));
      // setComments([response.data].concat(comments));
    };

    axios_request({
      route: comments_route,
      data: state,
      method: comments_method,
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
          <div className="profile-picture">{profile_picture}</div>
          <form onSubmit={post_comment}>
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
