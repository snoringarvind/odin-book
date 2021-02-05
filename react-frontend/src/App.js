import "./App.css";
import { OdinBookProvider, OdinBookContext } from "../src/Components/Context";
import Home from "../src/Components/Home/Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import AuthButton from "./Components/AuthButton";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
