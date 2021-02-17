import React, { useContext, useEffect, useState } from "react";
import socketIOClient, { io } from "socket.io-client";
import { OdinBookContext } from "../Context";
const ENDPOINT = "http://localhost:3000";

const Chat = () => {
  const [response, setResponse] = useState("");

  const { jwtData, socket } = useContext(OdinBookContext);

  const [state, setState] = useState({ msg: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    socket.emit("send_message", {
      to: "@coolarvind",
      from: jwtData.user,
      msg: state.msg,
    });
  };

  useEffect(() => {
    console.log("hello");
    socket.on("new_msg", (data) => {
      // console.log();
      // if (data.from !== jwtData.user) {
      console.log(data);
      // }
    });
  });
  return (
    <div className="Chat">
      <form>
        <div className="form-group">
          <input type="text" onChange={changeHandler} name="msg" id="msg" />
        </div>
        <div className="send-btn">
          <button onClick={submitHandler}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
