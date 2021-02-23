import React, { useContext, useEffect, useState } from "react";
import { OdinBookContext } from "../Context";
import ChatListCard from "./ChatListCard";
import uniqid from "uniqid";
import "./ChatList.css";

const ChatList = () => {
  const { axios_request, jwtData } = useContext(OdinBookContext);

  const [chatListResponse, setChatListResponse] = useState([]);
  const [isRead, setIsRead] = useState([]);

  const [chatListLoading, setChatListLoading] = useState(true);
  const [isreadLoading, setIsreadLoading] = useState(true);

  const get_chat_list = () => {
    const route = `/mychat`;
    const method = "GET";

    const cb_error = (err) => {
      console.log(err);
    };

    const cb_response = (response) => {
      console.log(response);
      const a = response.data.received;
      const b = response.data.sent;
      console.log(b);
      if (b.length > 0) {
        a.forEach((value) => {
          console.log(value);
          const dupl_index = b.findIndex((x) => x.user._id === value.user._id);
          if (dupl_index !== -1) {
            b.splice(dupl_index, 1);
          }
        });
      }

      const c = [...a, ...b];

      const sort_arr = c.sort((a, b) => {
        console.log(a.last_msg);
        return b.last_msg < a.last_msg ? -1 : b.last_msg > a.last_msg ? 1 : 0;
      });

      setChatListResponse(sort_arr);

      setChatListLoading(false);
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
      setIsRead(response.data);
      setIsreadLoading(false);
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

  console.log(chatListResponse);
  return (
    <div className="ChatList">
      {!chatListLoading &&
        !isreadLoading &&
        chatListResponse.map((value, index) => (
          <ChatListCard
            value={value}
            index={index}
            key={uniqid()}
            isRead={isRead}
          />
        ))}
    </div>
  );
};

export default ChatList;
