import React, { useContext, useState } from "react";
import axios from "axios";
import { OdinBookContext } from "../Context";

const MyPostsForm = ({ route }) => {
  const [state, setState] = useState({ content_text: "", content_image: "" });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [newPost, setNewPost] = useState("");
  const { axios_POST } = useContext(OdinBookContext);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    if (e.target.files) {
      setState({ ...state, [name]: e.target.files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    // formData.append("content_image", state.content_image);

    // console.log(Object.keys(state));
    // console.log(state);

    // formData.append("content_text", state.content_text);

    for (let i = 0; i < Object.keys(state).length; i++) {
      formData.append(Object.keys(state)[i], state[Object.keys(state)[i]]);
    }

    const axios_error = (err) => {
      if (err.response) {
        console.log(err.response.data);
        setErrors(err.response.data);
      } else {
        console.log(err.message);
        setError(err.message);
      }
    };

    const axios_response = (response) => {
      setNewPost(response.data);
    };

    axios_POST(route, formData, axios_error, axios_response);
  };

  return (
    <div className="MyPostsForm">
      <form encType="multipart/form-data">
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
        <div className="form-group">
          <label htmlFor="content_image">Image</label>
          <input
            type="file"
            id="content_image"
            name="content_image"
            placeholder="Add image"
            onChange={changeHandler}
          />
        </div>
        <div className="submit-btn">
          <button onClick={submitHandler}>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default MyPostsForm;
