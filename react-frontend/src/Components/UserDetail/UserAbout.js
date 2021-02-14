import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import { axios_request } from "../Utils";

const UserAbout = () => {
  const { myAboutValue, didMyAboutMountValue } = useContext(OdinBookContext);
  const [myAbout, setMyAbout] = myAboutValue;
  const [didMyAboutMount, setdidMyAboutMount] = didMyAboutMountValue;

  const [getLoading, setGetLoading] = useState(true);

  const [result, setResult] = useState({});

  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const fname = location.state.fname;
  const lname = location.state.lname;
  const username = location.state.username;
  const userid = location.state.userid;

  const profile_route = `/profile/${userid}`;
  const profile_route_method = "GET";

  const make_server_request = () => {
    const cb_response = (response) => {
      if (userid === jwtData.sub) {
        setMyAbout(response.data);
      }
      setResult(response.data);

      setGetLoading(false);
    };
    const cb_error = (err) => {
      setError(err.message);
      setGetLoading(false);
    };

    axios_request({
      route: profile_route,
      data: "",
      method: profile_route_method,
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const { jwtData } = useContext(OdinBookContext);

  useEffect(() => {
    console.log(jwtData.sub, userid);
    if (jwtData.sub !== userid) {
      make_server_request();
    } else {
      if (didMyAboutMount) {
        make_server_request();
        setdidMyAboutMount(false);
      } else {
        setResult(myAbout);
        setGetLoading(false);
      }
    }
  }, []);

  const display_about = () => {
    return (
      <>
        <div>
          <span className="title">Name:</span> <span>{result.fname} </span>
          <span>{result.lname}</span>
        </div>
        {result.bio && (
          <div>
            <span className="title">Bio:</span>
            {result.bio}
          </div>
        )}
        {result.nickName && (
          <div>
            <span className="titie">NickName:</span>
            {result.nickName}
          </div>
        )}
        {result.school && (
          <div>
            <span className="title">School:</span>
            {result.school}
          </div>
        )}
        {result.college && (
          <div>
            <span className="title">College:</span>
            {result.college}
          </div>
        )}
        {result.working && (
          <div>
            <span className="title">Work:</span>
            {result.working}
          </div>
        )}
        {result.relationshipStatus && (
          <div>
            <span className="title">Relationship Status:</span>
            {result.relationshipStatus}
          </div>
        )}
        {result.book && (
          <div>
            <span className="title">Books:</span>
            {result.book}
          </div>
        )}
        {result.food && (
          <div>
            <span className="title">Food:</span>
            {result.food}
          </div>
        )}
        {result.phone && (
          <div>
            <span className="title">Phone:</span>
            {result.phone}
          </div>
        )}
        {result.email && (
          <div>
            <span className="title">Email:</span>
            {result.email}
          </div>
        )}
        {result.gender && (
          <div>
            <span className="title">Gender:</span>
            {result.gender}
          </div>
        )}
        {result.dob && (
          <div>
            <span className="title">Birthday</span>
            {result.dob}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="UserAbout">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? <div className="error">{error}</div> : display_about())}
    </div>
  );
};

export default UserAbout;
