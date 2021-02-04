import axios from "axios";
import React, { createContext, useState } from "react";

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  const [serverUrl] = useState("http://localhost:3000/odinbook");

  //global isAuth for get-routes
  const axios_GET = async (route, error, response) => {
    const token = JSON.parse(localStorage.getItem("jwtData")).token;
    console.log(token);
    if (token) {
      try {
        const headers = { authorization: `Bearer ${token}` };
        const response_data = await axios({
          url: `${serverUrl}${route}`,
          method: "GET",
          headers: headers,
        });
        response(response_data);
      } catch (err) {
        error(err);
      }
    }
  };

  const axios_POST = async (route, data, axios_error, axios_response) => {
    const token = JSON.parse(localStorage.getItem("jwtData")).token;
    console.log(token);
    if (token) {
      try {
        const headers = { authorization: `Bearer ${token}` };
        const response_data = await axios({
          url: `${serverUrl}${route}`,
          method: "POST",
          headers: headers,
          data: data,
        });
        axios_response(response_data);
      } catch (err) {
        console.log(err.response.data);
        axios_error(err);
      }
    }
  };

  return (
    <OdinBookContext.Provider
      value={{
        serverUrl: serverUrl,
        axios_GET: axios_GET,
        axios_POST: axios_POST,
      }}
    >
      {children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
