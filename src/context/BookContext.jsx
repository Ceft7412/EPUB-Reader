import { createContext, useState } from "react";
const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [book, setBook] = useState(null);
  const [sectionDisplay, setSectionDisplay] = useState(null);

  const handleSectionDisplay = (section) => {
    setSectionDisplay(section);
  };
  return (
    <BookContext.Provider
      value={{ book, setBook, sectionDisplay, setSectionDisplay: handleSectionDisplay }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
