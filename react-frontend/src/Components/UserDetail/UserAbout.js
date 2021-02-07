import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";

const UserAbout = () => {
  const { axios_request } = useContext(OdinBookContext);
  const [getLoading, setGetLoading] = useState(true);
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const userid = location.state;

  const profile_route = `/profile/${userid}`;
  const profile_route_method = "GET";

  const make_server_request = () => {
    const cb_response = (response) => {
      setAbout(response.data);
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

  useEffect(() => {
    make_server_request();
  }, []);

  const display_about = () => {
    return (
      <>
        <div>
          <span className="title">Name:</span> <span>{about.fname} </span>
          <span>{about.lname}</span>
        </div>
        {about.bio && (
          <div>
            <span className="title">Bio:</span>
            {about.bio}
          </div>
        )}
        {about.nickName && (
          <div>
            <span className="titie">NickName:</span>
            {about.nickName}
          </div>
        )}
        {about.school && (
          <div>
            <span className="title">School:</span>
            {about.school}
          </div>
        )}
        {about.college && (
          <div>
            <span className="title">College:</span>
            {about.college}
          </div>
        )}
        {about.working && (
          <div>
            <span className="title">Work:</span>
            {about.working}
          </div>
        )}
        {about.relationshipStatus && (
          <div>
            <span className="title">Relationship Status:</span>
            {about.relationshipStatus}
          </div>
        )}
        {about.book && (
          <div>
            <span className="title">Books:</span>
            {about.book}
          </div>
        )}
        {about.food && (
          <div>
            <span className="title">Food:</span>
            {about.food}
          </div>
        )}
        {about.phone && (
          <div>
            <span className="title">Phone:</span>
            {about.phone}
          </div>
        )}
        {about.email && (
          <div>
            <span className="title">Email:</span>
            {about.email}
          </div>
        )}
        {about.gender && (
          <div>
            <span className="title">Gender:</span>
            {about.gender}
          </div>
        )}
        {about.dob && (
          <div>
            <span className="title">Birthday</span>
            {about.dob}
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
