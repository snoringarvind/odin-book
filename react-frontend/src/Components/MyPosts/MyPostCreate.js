import React, { useState } from "react";
import MyPostForm from "./MyPostForm";
import "./MyPostCreate.css";

const MypostCreate = () => {
  const [formBtnClicked, setFormBtnClicked] = useState(false);

  const mypost_create_route = "/myposts";
  const mypost_create_method = "POST";
  return (
    <div className="MyPostCreate">
      <>
        <div className="show-form-container">
          <div className="profile-picture"></div>
          <div
            className="show-form-btn"
            onClick={(e) => {
              e.preventDefault();
              setFormBtnClicked(true);
            }}
          >
            What's on your mind..?
          </div>
        </div>
        {formBtnClicked && (
          <MyPostForm
            route={mypost_create_route}
            method={mypost_create_method}
            setFormBtnClicked={setFormBtnClicked}
            formBtnClicked={formBtnClicked}
            formTitle="Create Post"
          />
        )}
      </>
    </div>
  );
};

export default MypostCreate;
