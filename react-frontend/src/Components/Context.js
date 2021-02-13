import axios from "axios";
import React, { createContext, useState } from "react";

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
  const [myFriendsBtn, setMyFriendsBtn] = useState([]);

  const [didfriendsMount, setDidfriendsMount] = useState(true);

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

  console.log(jwtData);
  return (
    <OdinBookContext.Provider
      value={{
        searchValue: [searchValueChange, setSearchValueChange],
        searchBarStateValue: [searchBarState, setSearchBarState],
        userPostResultValue: [userPostResult, setUserPostResult],
        myFriendsValue: [myFriends, setMyFriends],
        myFriendsBtnValue: [myFriendsBtn, setMyFriendsBtn],
        didfriendsMountValue: [didfriendsMount, setDidfriendsMount],
        jwtData: jwtData,
      }}
    >
      {children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
