import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

const Chat = () => {
  const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT, {
  //     withCredentials: true,
  //     transportOptions: {
  //       polling: {
  //         extraHeaders: {
  //           "my-custom-header": "authorization",
  //         },
  //       },
  //     },
  //   });
  //   socket.on("connection", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <div className="Chat">
      <form>
        <div className="form-group">
          <input type="text" />
        </div>
        <div className="send-btn">
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
