import React, { useState } from "react";
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
import { set } from "mongoose";

const UserDetail = () => {
  const params = useParams();
  console.log(params);

  //since UserDetail holds the navigation bar for user, the banner photo won't changes unless the page is reloaded. There we will let know that the params was changed, so the userDetail can render again.
  const [isParamsChanged, setIsParamsChanged] = useState(false);

  console.log(isParamsChanged);
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
            <UserPost setIsParamsChanged={setIsParamsChanged} />
          </Route>
          <Route exact path={`/user/${params.username}/about`}>
            <UserAbout setIsParamsChanged={setIsParamsChanged} />
          </Route>
          <Route exact path={`/user/${params.username}/friends`}>
            <UserFriend setIsParamsChanged={setIsParamsChanged} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default UserDetail;
