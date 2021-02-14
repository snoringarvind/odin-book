import React from "react";
import CommentForm from "./CommentForm";

const CommentCreate = ({ postid, setComments, postindex }) => {
  const route = `/post/${postid}/comment`;
  const method = "POST";
  return (
    <div className="CommentCreate">
      <CommentForm
        setComments={setComments}
        postIndex={postindex}
        route={route}
        method={method}
      />
    </div>
  );
};

export default CommentCreate;
