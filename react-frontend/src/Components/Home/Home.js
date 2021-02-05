import React, { useContext } from "react";
import Login from "../Login/Login";
import { Route, Switch, useLocation } from "react-router-dom";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import MyPostList from "../MyPosts/MyPostList";
import MyPostCreate from "../MyPosts/MyPostCreate";
import MyPostDetail from "../MyPosts/MyPostDetail";
import MyPostDelete from "../MyPosts/MyPostDelete";
import PostList from "../Posts/PostList";
import PostDetail from "../Posts/PostDetail";
import "./Home.css";
import Navigation from "../Navigation/Navigation";
import Logout from "../Logout";
import axios from "axios";
import { OdinBookContext } from "../Context";
import AuthButton from "../AuthButton";

const Home = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div className="Home">
      <AuthButton />

      <div className="Navigation">
        <Navigation to="/posts" label="Posts" />
        <Navigation to="/friends" label="Friends" />
        <Navigation to="/account" label="Account" />
        {/* <Navigation to="/logout" label="Logout" /> */}
      </div>

      <Switch location={background || location}>
        <>
          <Route path="/myposts">
            <MyPostList />
          </Route>
          <Route path="/mypost/update/:id">
            <MyPostUpdate />
          </Route>
          <Route exact path="/mypost/:id">
            <MyPostDetail />
          </Route>
          <Route path="/create-post">
            <MyPostCreate />
          </Route>
          <Route path="/post/:id">
            <PostDetail />
          </Route>
          <Route path="/posts">
            <PostList />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </>

        {/* <Route path="/login">
            <Login />
          </Route> */}
      </Switch>

      <Route path="/mypost/delete/:id">
        <MyPostDelete />
      </Route>
    </div>
  );
};

export default Home;
