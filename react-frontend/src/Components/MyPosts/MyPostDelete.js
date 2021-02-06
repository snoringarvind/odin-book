import React, { useContext, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { OdinBookContext } from "../Context";

const MyPostDelete = () => {
  const { axios_request } = useContext(OdinBookContext);

  const params = useParams();
  console.log(params);

  const mypost_delete_route = `/mypost/${params.mypostid}`;
  const mypost_delete_method = "DELETE";

  const [postLoading, setPostLoading] = useState(false);

  const [error, setError] = useState("");

  const [isDeleted, setIsDeleted] = useState(false);

  const history = useHistory();

  const make_server_request = () => {
    const cb_error = (err) => {
      setError(err.message);
      setPostLoading(false);
    };

    const cb_response = (response) => {
      setPostLoading(false);
      // console.log(response);
      setIsDeleted(true);
    };

    axios_request({
      route: mypost_delete_route,
      data: "",
      method: mypost_delete_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  console.log(mypost_delete_route);
  console.log(mypost_delete_method);
  const deleteHandler = () => {
    make_server_request();
  };

  const cancelHandler = () => {
    history.goBack();
  };

  console.log("delete");
  return (
    <div className="MyPostDelete">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="dlt-btn">
            <button
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
              {!postLoading ? "Delete" : "Deleting post...."}
            </button>
          </div>
          <div className="cancel-btn">
            <button onClick={cancelHandler}>Cancel</button>
          </div>
          {isDeleted && <Redirect to="/myposts" />}
        </>
      )}
    </div>
  );
};

export default MyPostDelete;
