// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Reader from "./views/Reader";
// import { ThemeProvider } from "./context/ThemeContext";
import AllProvider from "./provider/AllProvider";

function App() {
  return (
    <AllProvider>
      <Home />
      <Reader />
    </AllProvider>
  );
}
export default App;
