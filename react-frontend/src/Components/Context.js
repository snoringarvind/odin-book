import axios from "axios";
import React, { createContext, useState } from "react";

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  const [serverUrl] = useState("http://localhost:3000/odinbook");

  //global isAuth for route requests
  const axios_request = async ({
    route,
    data,
    method,
    axios_error,
    axios_response,
  }) => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));
    console.log(route);

    if (jwtData !== null || route === "/login") {
      try {
        let token;
        let headers;
        if (route !== "/login") {
          token = jwtData.token;
          headers = { authorization: `Bearer ${token}` };
        }

        const response_data = await axios({
          url: `${serverUrl}${route}`,
          method: method,
          headers: headers || "",
          data: data,
        });
        axios_response(response_data);
      } catch (err) {
        console.log(err.message);
        axios_error(err);
      }
    }
  };

  return (
    <OdinBookContext.Provider
      value={{
        axios_request: axios_request,
      }}
    >
      {children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
