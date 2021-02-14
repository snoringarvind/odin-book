import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { axios_request } from "./Utils";
import async from "async";
// import { response } from "express";
import { Switch, useLocation } from "react-router-dom";

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  // const [serverUrl] = useState("http://localhost:3000/odinbook");

  //to render the searchresult page if the user hits enter
  const [searchValueChange, setSearchValueChange] = useState(false);

  //to prefill the search bar if there is a value in the url
  const [searchBarState, setSearchBarState] = useState({ search: "" });

  //for MyFriends to not re-render
  const [myFriends, setMyFriends] = useState([]);
  const [didMyFriendsMount, setDidMyFriendsMount] = useState(true);

  //for myabout to not re-render
  const [myAbout, setMyAbout] = useState({});
  const [didMyAboutMount, setdidMyAboutMount] = useState(true);

  //for mypost to not re-render
  const [myPosts, setMyposts] = useState([]);
  const [didMyPostsMount, setDidMyPostsMount] = useState(true);

  //for mynewsfeed to not re-render
  const [myNewsfeed, setMyNewsFeed] = useState([]);
  const [didMyNewsFeedMount, setDidMyNewsFeedMount] = useState(true);

  // const [loading, setLoading] = useState(true);

  let jwtData;
  try {
    [jwtData] = useState(JSON.parse(localStorage.getItem("jwtData")));
  } catch (err) {
    console.log(err.message);
  }

  return (
    <OdinBookContext.Provider
      value={{
        searchValue: [searchValueChange, setSearchValueChange],
        searchBarStateValue: [searchBarState, setSearchBarState],
        jwtData: jwtData,

        myFriendsValue: [myFriends, setMyFriends],
        didMyFriendsMountValue: [didMyFriendsMount, setDidMyFriendsMount],

        myAboutValue: [myAbout, setMyAbout],

        myPostsValue: [myPosts, setMyposts],
        didMyPostsMountValue: [didMyPostsMount, setDidMyPostsMount],

        myNewsFeedValue: [myNewsfeed, setMyNewsFeed],
        didMyNewsFeedMountValue: [didMyNewsFeedMount, setDidMyNewsFeedMount],

        didMyAboutMountValue: [didMyAboutMount, setdidMyAboutMount],
      }}
    >
      {children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
