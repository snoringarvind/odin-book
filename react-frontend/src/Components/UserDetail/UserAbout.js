import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import { axios_request } from "../Utils";
import UseraAboutCard from "./UserAboutCard";
import uniqid from "uniqid";
import "./UserAbout.css";

const UserAbout = () => {
  const { myAboutValue, didMyAboutMountValue } = useContext(OdinBookContext);
  const [myAbout, setMyAbout] = myAboutValue;
  const [didMyAboutMount, setdidMyAboutMount] = didMyAboutMountValue;

  const [result, setResult] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    const route = "/myprofile";
    const method = "POST";

    const cb_error = (err) => {
      console.log(err.message);
    };

    const cb_repsonse = (response) => {
      console.log(response);
    };

    axios_request({
      route: route,
      data: "",
      method: method,
      axios_error: cb_error,
      axios_response: cb_repsonse,
    });
  };

  const [getLoading, setGetLoading] = useState(true);

  const [about, setAbout] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const fname = location.state.fname;
  const lname = location.state.lname;
  const username = location.state.username;
  const userid = location.state.userid;

  const profile_route = `/profile/${userid}`;
  const profile_route_method = "GET";

  const [clickIndex, setClickIndex] = useState(null);

  const make_server_request = () => {
    const cb_response = (response) => {
      if (userid === jwtData.sub) {
        setMyAbout(response.data);
      }
      console.log(response.data);
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

  let g;
  if (result) {
    delete result.user;
    delete result._id;
    delete result.__v;

    g = Object.keys(result);
    console.log(g);
  }

  const [ee, setee] = useState({});

  useEffect(() => {
    if (result) {
      setee({
        fname: result.fname,
        lname: result.lname,
        bio: result.bio,
        nickName: result.nickName,
        school: result.school,
        college: result.college,
        working: result.working,
        relationshipStatus: result.relationshipStatus,
        book: result.book,
        food: result.food,

        gender: result.gender,
        dob: result.dob,
      });
    }
  }, [result]);

  // const [ee, setee] = useState();

  return (
    <div className="UserAbout">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : (
          g.map((value, index) => {
            return (
              <UseraAboutCard
                key={uniqid()}
                objkey={value}
                index={index}
                clickIndex={clickIndex}
                setClickIndex={setClickIndex}
                result={result}
                setResult={setResult}
                ee={ee}
                setee={setee}
              />
            );
          })
        ))}
    </div>
  );
};

export default UserAbout;
