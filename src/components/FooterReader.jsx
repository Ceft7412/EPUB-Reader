import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

const FooterReader = () => {
  const { readingProgress } = useContext(ProgressContext);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "47%",
        padding: "5px 10px",

        color: "gray",
        borderRadius: "15px",
        fontSize: "13px",
      }}
    >
      {readingProgress}%
    </div>
  );
};

export default FooterReader;
