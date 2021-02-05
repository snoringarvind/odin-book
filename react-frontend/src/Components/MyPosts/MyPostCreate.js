import React from "react";
import MyPostForm from "./MyPostForm";

const MypostCreate = () => {
  const mypost_create_route = "/myposts";
  const mypost_create_method = "POST";
  return (
    <div className="MyPostCreate">
      <MyPostForm route={mypost_create_route} method={mypost_create_method} />
    </div>
  );
};

export default MypostCreate;
