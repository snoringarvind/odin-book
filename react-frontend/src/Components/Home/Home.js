import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import MyPostUpdate from "../MyPosts/MyPostUpdate";
import MyPostList from "../MyPosts/MyPostList";
import MyPostCreate from "../MyPosts/MyPostCreate";
// import MyPostDetail from "../MyPosts/MyPostDetail";
import MyPostDelete from "../MyPosts/MyPostDelete";
import NewsFeed from "../NewsFeed/NewsFeed";
import PostDetail from "../NewsFeed/PostDetail";
import Navigation from "../Navigation/Navigation";
import Login from "../Login/Login";
import Logout from "../Logout";
import Signup from "../Signup/Signup";
import "./Home.css";
import SearchBar from "../Search/SearchBar";
import SearchResult from "../Search/SearchResult";
import UserDetail from "../UserDetail/UserDetail";
import Hamburger from "../MyPosts/Hamburger/Hamburger";
import MyFriends from "./MyFriends/MyFriends";

const Home = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  const [isClick, setIsclick] = useState(false);

  console.log(location);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const x = window;
    x.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      let arr = e.target.classList;

      for (let i = 0; i < arr.length; i++) {
        const p = document.querySelector(`.${arr[i]}`).classList;
        if (
          p[i].toString() !== "drop-btn" &&
          p[i] !== null &&
          p[i] !== "ham-icon" &&
          p[i] !== "close-icon"
        ) {
          const c = document.querySelector(".drop-btn-active");
          if (c) {
            c.classList.remove("drop-btn-active");
            setIsclick(false);
            return;
          }
        }
        arr = [];
      }

      arr = [];
    });
  }, []);
  return (
    <div className="Home">
      <div className="Navigation">
        <SearchBar />
        <Navigation to="/" label="&#xf015;" />
        <Navigation to="/friends" label="&#xf500;" />

        <div
          className="drop-btn"
          onClick={(e) => {
            const x = document.querySelector(".drop-btn");
            x.classList.add("drop-btn-active");
            setIsclick(!isClick);
            if (isClick) {
              x.classList.remove("drop-btn-active");
            }
          }}
          onBlur={(e) => {
            console.log(e);
            console.log("hello blur");
          }}
        >
          {isClick ? (
            <div className="close-icon">&#10006;</div>
          ) : (
            <div className="ham-icon">&#x2630;</div>
          )}
        </div>

        <div className="content">
          <Hamburger />
        </div>
      </div>

      <Switch location={background || location}>
        <Route exact path="/">
          <NewsFeed />
        </Route>
        {/* user's friends */}
        <Route exect path="/user/:username">
          <UserDetail />
        </Route>
        {/* <Route path="/user/:username/:">
          <UserDetail />
        </Route> */}
        <Route path="/myposts">
          <MyPostList />
        </Route>
        <Route path="/update-post/:mypostid">
          <MyPostUpdate />
        </Route>
        {/* <Route exact path="/mypost/:mypostid">
          <MyPostDetail />
        </Route> */}
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
          <MyFriends />
        </Route>
        {/* <Route exact path="/account">
          my-Account
        </Route> */}

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
