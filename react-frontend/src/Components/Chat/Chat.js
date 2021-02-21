import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIOClient, { io } from "socket.io-client";
import { OdinBookContext } from "../Context";
import "./Chat.css";
import ChatCard from "./ChatCard";

const Chat = () => {
  const location = useLocation();

  const { axios_request, jwtData, socket } = useContext(OdinBookContext);

  //this detail are of the person on whose chat btn we clicked
  const fname = location.state.fname;
  const lname = location.state.lname;
  const userid = location.state.userid;
  const username = location.state.username;

  console.log(userid);

  const [tempResponse, setTempResponse] = useState([]);
  const [response, setResponse] = useState([]);
  const [msgArr, setMsgArr] = useState([]);

  const [mymsgloading, setmsgloading] = useState(true);
  const [responseloading, setresponseloading] = useState(true);

  const [myMsg, setMyMsg] = useState([]);

  useEffect(() => {
    socket.on("new_msg", (data) => {
      console.log(data.msg);

      setTempResponse([
        ...tempResponse,
        { message: data.message, createdAt: data.createdAt },
      ]);
    });

    // console.log(curResponse);
  }, [socket]);

  console.log(msgArr);
  useEffect(() => {
    if (tempResponse.length !== 0) {
      setMsgArr([...msgArr, ...tempResponse]);
    }
  }, [tempResponse]);

  console.log(msgArr, "48 msgArr");
  useEffect(() => {
    const h = async () => {
      await Promise.all([get_responses(), get_my_messages()]);
    };
    h();
    // get_responses();
    // get_my_messages();
  }, []);

  // get the messages I sent to Komal
  const get_responses = () => {
    // sender = jwtData.sub
    console.log("get responses");
    const route = `/chat/${userid}/${jwtData.sub}`;
    const method = "GET";

    const cb_response = (response) => {
      console.log(response);
      if (response.data.length !== 0) {
        let newArr = response.data.message_container.map((v) => ({
          ...v,
          isOwner: true,
        }));
        setResponse(newArr);
      } else {
        //it might happen that there are no sent messages.
        setResponse([{ message: "", createdAt: "" }]);
      }
      console.log(response, "get responses");

      setresponseloading(false);
    };

    const cb_error = (error) => {
      console.log(error);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  // the messages Komal sent to me
  const get_my_messages = () => {
    console.log("my messages");
    const route = `/chat/${jwtData.sub}/${userid}`;
    const method = "GET";

    const cb_response = (response) => {
      console.log(response, "get my messages");
      if (response.data.length !== 0) {
        setMyMsg(response.data.message_container);
      } else {
        //it might happen that there are no response msgs and only ond side messages.
        setMyMsg([{ message: "", createdAt: "" }]);
      }
      setmsgloading(false);
    };

    const cb_error = (error) => {
      console.log(error);
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
    if (!mymsgloading && !responseloading) {
      let arr = [...response, ...myMsg];
      console.log(arr);

      let sorted = arr.sort((a, b) => {
        console.log(a, b);
        return a.createdAt < b.createdAt
          ? -1
          : a.createdAt > b.createdAt
          ? 1
          : 0;
      });
      console.log(sorted);

      setMsgArr(sorted);
    }
  }, [mymsgloading, responseloading]);

  console.log(mymsgloading, responseloading);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [msgArr]);

  console.log(mymsgloading, responseloading);
  console.log(msgArr);
  return (
    <div className="Chat">
      <ChatCard
        fname={fname}
        lname={lname}
        userid={userid}
        username={username}
        msgArr={msgArr}
        setMsgArr={setMsgArr}
        mymsgloading={mymsgloading}
        responseloading={responseloading}
      />
    </div>
  );
};

export default Chat;
