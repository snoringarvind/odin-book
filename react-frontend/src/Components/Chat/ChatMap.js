import React, { useEffect } from "react";
import "./ChatMap.css";

const ChatMap = ({ value, index }) => {
  const d = new Date(value.createdAt);

  // console.log(d.getFullYear());
  const yearstr = d.getFullYear().toString();
  const splityear = [...yearstr];

  // useEffect(() => {
  // }, [value]);

  return (
    <div className="ChatMap">
      <div className={value.isOwner == true ? "me" : "person"}>
        <div
          className={value.isOwner == true ? "curve-right" : "curve-left"}
        ></div>
        <div className={value.isOwner == true ? "right" : "left"}>
          <div className="message">{value.message}</div>
          <div className="date-container">
            <div className="date">
              <span>{d.getDate()}/</span>
              <span>{d.getMonth() + 1}/</span>
              <span>{splityear[2]}</span>
              <span>{splityear[3]}</span>
            </div>
            <div className="time">
              <span>
                {d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}-
              </span>
              <span>{d.getMinutes()} </span>
              <span>{d.getHours() > 12 ? "pm" : "am"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMap;
