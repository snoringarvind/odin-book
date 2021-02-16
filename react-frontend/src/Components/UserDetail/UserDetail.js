import React from "react";
import UserNav from "./UserNav";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useLocation,
  useHistory,
} from "react-router-dom";
import UserAbout from "./UserAbout";
import UserPost from "./UserPost";
import UserFriend from "./UserFriend";
import "./UserDetail.css";

const UserDetail = () => {
  const location = useLocation();
  let params = useParams();
  console.log(params);
  console.log(location.state);
  const history = useHistory();
  console.log(history);

  return (
    <div className="UserDetail">
      <div className="user-banner-container">
        <div className="user-banner">{params.username}</div>

        <div className="name-container">
          <div className="name">
            <span>{location.state.fname} </span>
            <span> {location.state.lname}</span>
          </div>
        </div>
      </div>
      <div className="UserNav">
        <UserNav
          to={`/user/${params.username}/posts`}
          fname={location.state.fname}
          lname={location.state.lname}
          userid={location.state.userid}
          username={location.state.username}
          label="Posts"
        />
        <UserNav
          to={`/user/${params.username}/about`}
          fname={location.state.fname}
          lname={location.state.lname}
          userid={location.state.userid}
          username={location.state.username}
          label="About"
        />
        <UserNav
          to={`/user/${params.username}/friends`}
          fname={location.state.fname}
          lname={location.state.lname}
          userid={location.state.userid}
          username={location.state.username}
          label="Friends"
        />
      </div>
      <Switch>
        <Route path={`/user/${params.username}/posts`}>
          <UserPost path="userpost" />
        </Route>
        <Route path={`/user/${params.username}/about`}>
          <UserAbout />
        </Route>
        <Route path={`/user/${params.username}/friends`}>
          <UserFriend />
        </Route>
      </Switch>
    </div>
  );
};

export default UserDetail;
