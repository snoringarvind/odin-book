import React, { useState, useEffect, useContext } from "react";
import { OdinBookContext } from "../Context";
import ChatMap from "./ChatMap";
import uniqid from "uniqid";
import axios from "axios";

const ChatCard = ({
  fname,
  lname,
  userid,
  username,
  // myMsg,
  // setMyMsg,
  // response,
  // setResponse,
  msgArr,
  setMsgArr,
  responseLoading,
  mymsgloading,
}) => {
  console.log("chatcard");
  const [state, setState] = useState("");
  const [submitMsg, setSubmitMsg] = useState({});

  const { jwtData, socket, axios_request } = useContext(OdinBookContext);
  const changeHandler = (e) => {
    setState(e.target.value);
  };

  const submitHandler = () => {
    // e.preventDefault();

    // const date = Date.now();

    // setMyMsg([...myMsg, { msg: state, date: date }]);

    setSubmitMsg({ message: state, createdAt: new Date().toISOString() });

    setMsgArr([
      ...msgArr,
      { message: state, createdAt: new Date().toISOString(), isOwner: true },
    ]);

    socket.emit("send_message", {
      to: username,
      from: jwtData.user,
      message: state,
      createdAt: new Date().toISOString(),
    });
  };

  const save_messages_on_database = () => {
    const route = `/chat/${userid}`;
    const method = "PUT";

    const cb_error = (err) => {
      console.log(err);
    };

    const cb_response = (response) => {
      console.log(userid);
      console.log(response);
    };

    axios_request({
      route: route,
      data: submitMsg,
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  //save my name in komal's (people from who I received message)
  const save_received = () => {
    const route = `/mychat/${jwtData.sub}/${userid}`;
    const method = "PUT";

    const cb_error = (err) => {};

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: { last_msg: new Date().toISOString() },
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  //save Komal's name in my sent list.
  //if she already in received then we don't need this function
  //we can find this out with if the messages from both are not null
  //we will not call this request if the length of messages<=2;
  //we will call this only once because we need to delete the name from the list
  const save_sent = () => {
    const route = `/mychat/${userid}/${jwtData.sub}`;
    const method = "PUT";

    const cb_error = (err) => {};

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: { last_msg: new Date().toISOString() },
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const save_isread_false = () => {
    const route = `/isreadfalse/${userid}`;
    const method = "PUT";

    const cb_error = (err) => {};

    const cb_response = (response) => {};

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_response: cb_response,
      axios_error: cb_error,
    });
  };
  useEffect(() => {
    if (state !== "") {
      save_messages_on_database();
      save_received();
      save_sent();
    }
  }, [submitMsg]);

  return (
    <div className="ChatCard">
      <div className="head-top">
        <div className="profile-picture">{[...fname][0].toLowerCase()}</div>
        <div className="name">
          <span>{fname} </span>
          <span>{lname}</span>
        </div>
      </div>
      <form>
        <div className="form-group">
          <input type="text" onChange={changeHandler} name="msg" id="msg" />

          <div className="send-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (state === "") {
                  return;
                } else {
                  save_isread_false();
                  submitHandler();
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </form>

      {mymsgloading && responseLoading && (
        <div className="loading-container">
          <div className="spinner-border loading" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {!mymsgloading &&
        !responseLoading &&
        msgArr.map((value, index) => {
          return <ChatMap value={value} index={index} key={uniqid()} />;
        })}
    </div>
  );
};

export default ChatCard;
