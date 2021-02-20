import React from "react";
import CommentForm from "./CommentForm";

const CommentCreate = ({
  postid,
  setComments,
  postIndex,
  setNewCommentLoading,
}) => {
  const route = `/post/${postid}/comment`;
  const method = "POST";
  return (
    <div className="CommentCreate">
      <CommentForm
        setComments={setComments}
        postIndex={postIndex}
        route={route}
        method={method}
        setNewCommentLoading={setNewCommentLoading}
      />
    </div>
  );
};

export default CommentCreate;
