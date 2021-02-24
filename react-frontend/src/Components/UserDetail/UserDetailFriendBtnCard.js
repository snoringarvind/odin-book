import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";

const UserDetailFriendBtnCard = (
  value,
  index,
  userid,
  isFriend,
  setIsFriend
) => {
  const { axios_request } = useContext(OdinBookContext);

  const [error, setError] = useState("");

  const post_friend_value = () => {
    const route = `/friend/${userid}`;
    const method = "POST";

    const cb_error = (err) => {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    };

    const cb_response = (response) => {
      // console.log(response.data);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    if (value._id === userid) {
      isFriend[index] = true;
      setIsFriend(isFriend);
    } else {
      isFriend[index] = false;
      setIsFriend(isFriend);
    }
  }, []);

  console.log("hello");
  return (
    <div className="UserDetailFriendBtn">
      {error && <div className="error">{error}</div>}
      {!error && (
        <div
          className={
            isFriend[index]
              ? "add-btn fas fa-user-minus"
              : "add-btn fas fa-user-plus"
          }
          onClick={(e) => {
            e.preventDefault();
            post_friend_value();

            console.log(isFriend[index]);
          }}
        ></div>
      )}
    </div>
  );
};

export default UserDetailFriendBtnCard;
