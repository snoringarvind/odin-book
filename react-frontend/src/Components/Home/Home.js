import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import MyPostList from "../MyPosts/MyPostList";
import MyPostCreate from "../MyPosts/MyPostCreate";
import MyPostDetail from "../MyPosts/MyPostDetail";
import MyPostDelete from "../MyPosts/MyPostDelete";
import PostList from "../Posts/PostList";
import PostDetail from "../Posts/PostDetail";
import Navigation from "../Navigation/Navigation";
import Login from "../Login/Login";
import Logout from "../Logout";
import Signup from "../Signup/Signup";
import "./Home.css";
import SearchBar from "../Search/SearchBar";
import SearchResult from "../Search/SearchResult";
import UserDetail from "../UserDetail/UserDetail";

const Home = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div className="Home">
      <div className="Navigation">
        <Navigation to="/" label="NewsFeed" />
        <Navigation to="/friends" label="Friends" />
        <Navigation to="/account" label="Account" />
        <SearchBar />
      </div>

      <Switch location={background || location}>
        <Route exact path="/">
          <PostList />
        </Route>
        {/* user's friends */}
        <Route path="/user/:username">
          <UserDetail />
        </Route>
        <Route path="/user/:username/:">
          <UserDetail />
        </Route>
        <Route path="/myposts">
          <MyPostList />
        </Route>
        <Route path="/update-post/:mypostid">
          <MyPostUpdate />
        </Route>
        <Route exact path="/mypost/:mypostid">
          <MyPostDetail />
        </Route>
        <Route path="/create-post">
          <MyPostCreate />
        </Route>
        <Route path="/news-feed/:postid">
          <PostDetail />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route exact path="/friends">
          my-Friends
        </Route>
        <Route exact path="/account">
          my-Account
        </Route>
        {/* &&&&&& */}
        <Route path="/search/:name">
          <SearchResult />
        </Route>
      </Switch>

      <Route path="/delete-post/mypost:id">
        <MyPostDelete />
      </Route>
    </div>
  );
};

export default Home;
