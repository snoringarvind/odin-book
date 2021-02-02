import "./App.css";
import { OdinBookProvider } from "../src/Components/Context";
import Home from "../src/Components/Home/Home";

function App() {
  return (
    <div className="App">
      <OdinBookProvider>
        <Home />
      </OdinBookProvider>
    </div>
  );
}

export default App;
