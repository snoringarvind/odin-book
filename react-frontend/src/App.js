import "./App.css";
import Home from "../src/Components/Home/Home";
import { useContext } from "react";
import { OdinBookContext } from "./Components/Context";
import Login from "./Components/Login/Login";

function App() {
  const { jwtData } = useContext(OdinBookContext);

  return (
    <div className="App">
      {jwtData && <Home />}
      {!jwtData && <Login />}
    </div>
  );
}

export default App;
