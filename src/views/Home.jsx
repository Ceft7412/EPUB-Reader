import { useContext } from "react";
import Form from "../components/Form";
import Quotes from "../components/Quotes";
import { DisplayContext } from "../context/DisplayContext";
const Home = ({ readBook }) => {
  const { hidden } = useContext(DisplayContext);
  return (
    <div className={`container ${hidden ? "-display-option" : ""}`}>
      <div className="fx-items">
        <div className="item"></div>

        <div className="item card">
          <Form readBook={readBook} />
          <Quotes />
        </div>
      </div>
    </div>
  );
};

export default Home;
