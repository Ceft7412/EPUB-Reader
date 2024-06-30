import { useContext, useRef, useEffect, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { BookContext } from "../context/BookContext";
import { IconContext } from "../context/IconContext";

const Toc = ({ isOpen, handleOpen }) => {
  const { theme } = useContext(ThemeContext);

  const icons = useContext(IconContext);
  const { book, setSectionDisplay } = useContext(BookContext);
  const [toc, setToc] = useState([]);
  const tocRef = useRef(null);

  useEffect(() => {
    if (book && book.navigation) {
      setToc(book.navigation.toc);
    }
  }, [book]);
  return (
    <div ref={tocRef}>
      <div className="item" onClick={() => handleOpen("toc")}>
        <icons.TocRoundedIcon />
      </div>
      <div
        className={`modal-toc ${isOpen === "toc" ? "open" : ""} ${
          theme.cardBackgroundColor
        } ${theme.textColor} ${theme.borderColor}`}
      >
        <div className="modal-toc-flex">
          <div className="toc-header">
            <div className="label-big">
              <span className="label-text">Table of Contents</span>
            </div>
            <div className="icon" onClick={handleOpen}>
              <icons.CloseRoundedIcon />
            </div>
          </div>
          <div className="toc-body">
            {toc.map((item, index) => (
              <div
                key={index}
                className="toc-body-item"
                onClick={() => setSectionDisplay(item.href)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toc;
