import axios from "axios";
import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  const [serverUrl] = useState("http://localhost:3000/odinbook");

  //to render the searchresult page if the user hits enter
  const [searchValueChange, setSearchValueChange] = useState(false);

  //to prefill the search bar if there is a value in the url
  const [searchBarState, setSearchBarState] = useState({ search: "" });

  //params for userdetail
  // const [params, setParams] = useState("");

  //global isAuth for route requests
  const axios_request = async ({
    route,
    data,
    method,
    axios_error,
    axios_response,
  }) => {
    // console.log(route);
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));

    // console.log(jwtData);
    if (jwtData !== null || route === "/login" || route === "/signup") {
      // console.log("helllo");
      try {
        let token;
        let headers;
        if (route !== "/login" && route !== "/signup") {
          token = jwtData.token;
          headers = { authorization: `Bearer ${token}` };
        }

        // console.log(data);
        // console.log(method);
        // console.log(route);
        const response_data = await axios({
          url: `${serverUrl}${route}`,
          method: method,
          headers: headers || "",
          data: data,
        });
        console.log("Context Response=", response_data);
        axios_response(response_data);
      } catch (err) {
        if (err.response) {
          console.log("Context Error", err.response.data);
        } else {
          console.log("Context Error", err.message);
        }
        axios_error(err);
      }
    } else {
      console.log("Context Error= NO JWT TOKEN");
    }
  };

  return (
    <OdinBookContext.Provider
      value={{
        axios_request: axios_request,
        searchValue: [searchValueChange, setSearchValueChange],
        searchBarStateValue: [searchBarState, setSearchBarState],
        // paramsValue: [params, setParams],
      }}
    >
      {children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
