import { createContext, useState } from "react";
const ProgressContext = createContext();

const ProgressProvider = ({ children }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ readingProgress, setReadingProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressProvider, ProgressContext };
