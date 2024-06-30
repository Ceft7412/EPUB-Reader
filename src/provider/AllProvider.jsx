import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ProgressProvider } from "../context/ProgressContext";
import { DisplayProvider } from "../context/DisplayContext";
import { BookProvider } from "../context/BookContext";
import { IconProvider } from "../context/IconContext";

const AllProvider = ({ children }) => {
  return (
    <IconProvider>
      <DisplayProvider>
        <BookProvider>
          <ThemeProvider>
            <ProgressProvider>{children}</ProgressProvider>
          </ThemeProvider>
        </BookProvider>
      </DisplayProvider>
    </IconProvider>
  );
};

export default AllProvider;
