import { createContext, useState } from "react";
const DisplayContext = createContext();

const DisplayProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <DisplayContext.Provider value={{ hidden, setHidden }}>
      {children}
    </DisplayContext.Provider>
  );
};

export { DisplayProvider, DisplayContext };
