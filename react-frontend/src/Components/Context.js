import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { axios_request } from "./Utils";

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  const [serverUrl] = useState("http://localhost:3000/odinbook");

  //to render the searchresult page if the user hits enter
  const [searchValueChange, setSearchValueChange] = useState(false);

  //to prefill the search bar if there is a value in the url
  const [searchBarState, setSearchBarState] = useState({ search: "" });

  //for  form
  const [userPostResult, setUserPostResult] = useState([]);

  //for MyFriends to not re-render
  const [myFriends, setMyFriends] = useState([]);

  //for myabout to not re-render
  const [myAbout, setMyAbout] = useState({});

  //for mypost to not re-render
  const [myPosts, setMyposts] = useState([]);

  const [myFriendsLoading, setMyFriendsLoading] = useState(true);
  // let [jwtData, setJwData]
  // let
  let jwtData;
  let setJwData;
  try {
    [jwtData, setJwData] = useState(
      JSON.parse(localStorage.getItem("jwtData"))
    );
  } catch (err) {
    console.log(err.message);
  }

  const get_myfriends_list = () => {
    const route = `/friend/${jwtData.sub}`;
    const method = "GET";
    const cb_error = (err) => {
      console.log(err.message);
    };
    const cb_response = (response) => {
      setMyFriends(response.data);
      // const h = Array(response.data.length).fill(true);
      // setMyFriendsBtn(h);
      console.log(response.data);
      setMyFriendsLoading(false);
    };

    axios_request({
      route: route,
      method: method,
      data: "",
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };
  const get_myabout = () => {
    const route = `/profile/${jwtData.sub}`;
    const method = "GET";

    const cb_error = (err) => {
      console.log(err.message);
    };
    const cb_response = (response) => {
      setMyAbout(response.data);
    };

    axios_request({
      route: route,
      method: method,
      data: "",
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  const get_myposts = () => {
    const route = `/posts/${jwtData.sub}`;
    const method = "GET";

    const cb_error = (err) => {
      console.log(err.message);
      if (err.response) {
        console.log(err.response.data);
      }
    };
    const cb_response = (response) => {
      console.log(response.data);
      setMyposts(response.data);
    };

    axios_request({
      route: route,
      method: method,
      data: "",
      axios_error: cb_error,
      axios_response: cb_response,
    });
  };

  useEffect(() => {
    get_myfriends_list();
    get_myabout();
    get_myposts();
  }, []);

  return (
    <OdinBookContext.Provider
      value={{
        searchValue: [searchValueChange, setSearchValueChange],
        searchBarStateValue: [searchBarState, setSearchBarState],
        userPostResultValue: [userPostResult, setUserPostResult],
        myFriendsValue: [myFriends, setMyFriends],
        myAboutValue: [myAbout, setMyAbout],
        myPostsValue: [myPosts, setMyposts],
        jwtData: jwtData,
      }}
    >
      {myFriendsLoading && "loading context"}
      {!myFriendsLoading && children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
