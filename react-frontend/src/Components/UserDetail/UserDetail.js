import React from "react";
import UserNav from "./UserNav";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useLocation,
} from "react-router-dom";
import UserAbout from "./UserAbout";
import UserPost from "./UserPost";
import UserFriend from "./UserFriend";
import "./UserDetail.css";

const UserDetail = () => {
  const params = useParams();
  // console.log(params);

  const location = useLocation();
  // console.log(location);
  return (
    <div className="UserDetail">
      <Router>
        <div className="user-banner">{params.username}</div>
        <div className="UserNav">
          <UserNav
            to={`/user/${params.username}/posts`}
            state={location.state}
            label="Posts"
          />
          <UserNav
            to={`/user/${params.username}/about`}
            state={location.state}
            label="About"
          />
          <UserNav
            to={`/user/${params.username}/friends`}
            state={location.state}
            label="Friends"
          />
        </div>
        <Switch>
          <Route exact path={`/user/${params.username}/posts`}>
            <UserPost />
          </Route>
          <Route exact path={`/user/${params.username}/about`}>
            <UserAbout />
          </Route>
          <Route exact path={`/user/${params.username}/friends`}>
            <UserFriend />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default UserDetail;
