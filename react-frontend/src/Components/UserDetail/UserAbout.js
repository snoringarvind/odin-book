import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OdinBookContext } from "../Context";
import { axios_request } from "../Utils";

const UserAbout = () => {
  const { myAboutValue, didMyAboutMountValue } = useContext(OdinBookContext);
  const [myAbout, setMyAbout] = myAboutValue;
  const [didMyAboutMount, setdidMyAboutMount] = didMyAboutMountValue;

  const [state, setState] = useState({
    fname: "",
    lname: "",
    bio: "",
    nickName: "",
    school: "",
    college: "",
    working: "",
    relationshipStatus: "",
    book: "",
    food: "",

    gender: "",
    dob: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

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

  const [click, setClick] = useState(false);

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

  const display_myabout = () => {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input
              name="fname"
              id="fname"
              placeholder="Your first name"
              value={result.fname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input
              name="lname"
              id="lname"
              placeholder="Your last name"
              value={result.lname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <input
              name="bio"
              placeholder="Enter your bio"
              value={result.bio}
              id="bio"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickName">NickName"</label>
            <input
              name="nickName"
              placeholder="Enter your nick-name"
              id="nickName"
              value={result.nickName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="school">School:</label>
            <input
              name="school"
              placeholder="Enter your School name here"
              id="school"
              value={result.school}
            />
          </div>
          <div className="form-group">
            <label htmlFor="college">College:</label>
            <input
              name="college"
              placeholder="Enter your college here"
              id="college"
              value={result.college}
            />
          </div>
          <div className="form-group">
            <label htmlFor="working">Work Place:</label>
            <input
              name="working"
              placeholder="Enter tour work place here"
              id="working"
              value={result.working}
            />
          </div>
          <div className="form-group">
            <label htmlFor="relationshipStatus">
              Choose your relationship-status:
            </label>
            <select id="relationshipStatus" name="relationshipStatus">
              <option value="status">Status</option>
              <option value="married">Married</option>
              <option value="single">Single</option>
              <option value="divorced">Divorced</option>
              <option value="complicated">It's complicated</option>
              <option value="in-relationship">In relationship</option>
              <option value="open-relationship">Open Relationship</option>
              <option value="engaged">Engaged</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="book">Book:</label>
            <input
              id="book"
              placeholder="Enter books you like"
              name="book"
              value={result.book}
            />
          </div>
          <div className="form-group">
            <label htmlFor="food">Food:</label>
            <input
              id="food"
              placeholder="Add food"
              name="food"
              value={result.food}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not-say">Not say</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob" name="dob">
              Date of birth
            </label>
            <input name="dob" value={result.dob} type="date" id="dob" />
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="UserAbout">
      {getLoading && "loading..."}
      {!getLoading &&
        (error ? (
          <div className="error">{error}</div>
        ) : jwtData.sub == userid ? (
          display_myabout()
        ) : (
          display_about()
        ))}
    </div>
  );
};

export default UserAbout;
