import React, { useContext, useEffect } from "react";
import { OdinBookContext } from "../Context";

const ChatList = () => {
  const { axios_request, jwtData } = useContext(OdinBookContext);

  const get_chat_list = () => {
    const route = `/mychat`;
    const method = "GET";

    const cb_error = (err) => {
      console.log(err);
    };

    const cb_response = (response) => {
      console.log(response);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const get_isread = () => {
    const route = "/isread";
    const method = "GET";

    const cb_error = (err) => {};
    const cb_response = (response) => {
      console.log(response);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_response: cb_response,
      axios_error: cb_error,
    });
  };

  useEffect(() => {
    get_chat_list();
    get_isread();
  }, []);

  return <div className="ChatList"></div>;
};

export default ChatList;
