import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const OdinBookContext = createContext();

const OdinBookProvider = ({ children }) => {
  // ex. http://localhost:3000/odinbook
  const [serverUrl] = useState("http://localhost:3000/odinbook");

  const [isAuth, setIsAuth] = useState(null);

  const [loading, setLoading] = useState(true);

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

  const check_if_user_isAuthenticated = async () => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));

    if (jwtData !== null) {
      try {
        let token;
        let headers;
        token = jwtData.token;
        headers = { authorization: `Bearer ${token}` };

        await axios({
          url: `${serverUrl}/isUserAuth`,
          method: "POST",
          headers: headers || "",
        });
        setIsAuth(true);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err.message);
        }
        setIsAuth(false);
        setLoading(false);
      }
    } else {
      setIsAuth(false);
      setLoading(false);
    }

    console.log(isAuth);
  };

  useEffect(() => {
    check_if_user_isAuthenticated();
  }, []);

  return (
    <OdinBookContext.Provider
      value={{
        axios_request: axios_request,
        isAuthValue: [isAuth, setIsAuth],
      }}
    >
      {loading && "loading...."}
      {!loading && children}
    </OdinBookContext.Provider>
  );
};

export { OdinBookContext, OdinBookProvider };
