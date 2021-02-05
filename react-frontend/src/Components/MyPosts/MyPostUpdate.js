import React, { useContext, useEffect, useState } from "react";
import MyPostForm from "./MyPostForm";
import { OdinBookContext } from "../Context";
import { useParams } from "react-router-dom";

const MyPostUpdate = ({ props }) => {
  const { axios_request } = useContext(OdinBookContext);
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  const params = useParams();

  const post_detail_route = `/post/${params.id}`;

  const mypost_update_route = `/mypost/${params.id}`;
  const mypost_update_method = "PUT";

  useEffect(() => {
    make_server_request();
  }, []);

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };
    const cb_response = (response) => {
      setPost(response.data);
      setGetLoading(false);
    };

    axios_request({
      route: post_detail_route,
      data: post,
      method: "GET",
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  console.log(post);

  return (
    <div className="MyPostUpdate">
      {getLoading && "loading..."}
      {!getLoading && (
        <>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <MyPostForm
              route={mypost_update_route}
              update_value={post}
              method={mypost_update_method}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyPostUpdate;
