import Home from "./views/Home";
import Reader from "./views/Reader";
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
