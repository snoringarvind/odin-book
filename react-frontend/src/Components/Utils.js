import axios from "axios";

const axios_request = async ({
  route,
  data,
  method,
  axios_error,
  axios_response,
}) => {
  // console.log(route);
  const serverUrl = "http://localhost:3000/odinbook";
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

export default axios_request;
