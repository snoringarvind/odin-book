import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { OdinBookContext } from "../Context";
const ENDPOINT = "http://localhost:3000";

const Chat = () => {
  const [response, setResponse] = useState("");

  const { jwtData } = useContext(OdinBookContext);
  console.log(jwtData);
  console.log("hello");

  const [state, setState] = useState({ msg: "" });

  useEffect(() => {
    console.log("hello");
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true,
    });

    socket.emit("send-message", {
      to: "@coolarvind",
      from: "@coolkomal",
      msg: "hey bro how are you okay good nice shit",
    });

    socket.on("new-message", (data) => {
      // console.log("hello");
      console.log(data);
    });

    socket.on("check", (data) => {
      console.log(data);
    });
  };
  return (
    <div className="Chat">
      <form>
        <div className="form-group">
          <input type="text" onChange={changeHandler} name="msg" />
        </div>
        <div className="send-btn">
          <button onClick={submitHandler}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
