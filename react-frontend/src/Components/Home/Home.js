import React from "react";
import Login from "../Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewsFeed from "../NewsFeed/NewsFeed";
import MyPostsGET from "../MyPosts/MyPostsGET";

const Home = () => {
  return (
    <div className="Home">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/news-feed">
            <NewsFeed />
          </Route>
          <Route path="/myposts">
            <MyPostsGET />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
