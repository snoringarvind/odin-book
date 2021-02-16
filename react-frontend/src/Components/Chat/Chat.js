import React, { useContext, useEffect, useState } from "react";
import socketIOClient, { io } from "socket.io-client";
import { OdinBookContext } from "../Context";
const ENDPOINT = "http://localhost:3000";

const Chat = () => {
  const [response, setResponse] = useState("");

  const { jwtData } = useContext(OdinBookContext);
  // console.log(jwtData);
  // console.log("hello");

  const [state, setState] = useState({ msg: "" });

  const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
  });

  socket.emit("connection", jwtData.user);
  socket.emit("join", jwtData.user);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(state);
    socket.emit("send-message", {
      to: "@coolarvind",
      from: "@coolkomal",
      msg: state.msg,
    });
  };

  useEffect(() => {
    // console.log(socket);
    if (socket == null) return;

    // console.log(socket);
    socket.on("receive-message", (data) => {
      console.log(data);
    });

    socket.on("new_msg", (data) => console.log(data));

    socket.on("nn", (data) => console.log(data));
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
