import React, { useEffect, useState } from "react";
// import { use } from "../../../../routes/odinbook";
import { axios_request } from "../Utils";
import "./CommentDelete.css";

const CommentDelete = ({
  postid,
  index,
  setComments,
  commentid,
  commentDeleteClick,
  setCommentDeleteClick,
  comments,
  // isChanged,
  // setIsChanged,
  setCommentOptionIndex,
  pp,
  setpp,
}) => {
  console.log(comments);

  const mypost_delete_route = `/post/${postid}/comment/${commentid}`;
  const mypost_delete_method = "DELETE";

  const [postLoading, setPostLoading] = useState(false);

  const [error, setError] = useState("");

  const make_server_request = () => {
    console.log(index);
    comments[index] = comments.comment_list.splice(index, 1);
    console.log(comments);
    setComments(comments);
    setpp(!pp);
    setCommentOptionIndex(null);
    const cb_error = (err) => {
      setError(err.message);
      setPostLoading(false);
    };

    const cb_response = (response) => {
      setPostLoading(false);
      // setDeleteClick(false);
    };

    axios_request({
      route: mypost_delete_route,
      data: "",
      method: mypost_delete_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });

    // setIsChanged(!isChanged);
    // console.log(isChanged);
  };

  const deleteHandler = () => {
    make_server_request();
  };

  useEffect(() => {
    make_server_request();
  }, []);

  console.log(comments);
  // console.log(isChanged);
  return (
    <div className="CommentDelete">
      {/* {error && (
        <div className="error">
          <div>{error}</div>
          <div>Please try refreshing the Page</div>
        </div>
      )}
      {!error && (
        <div className="dialog-box">
          <p className="confitm-msg">
            Are you sure want to delete this comment?
          </p>
          <div className="btn">
            <button
              className="dlt-btn"
              onClick={(e) => {
                e.preventDefault();
                if (!postLoading) {
                  setPostLoading(true);
                  deleteHandler();
                } else {
                  return;
                }
              }}
            >
              {!postLoading ? "Delete" : "Deleting comment...."}
            </button>

            <button
              className="cancel-btn"
              onClick={(e) => {
                e.preventDefault();
                setCommentDeleteClick(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CommentDelete;
