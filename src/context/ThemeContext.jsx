import React, { createContext, useState } from "react";
import loadon from "../assets/images/loadon.gif";
import Reader from "../views/Reader";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    name: "whiteTheme",
    border: "darkBorder",
    activeColor: "activeColor",
    textColor: "textColor",
    cardBackgroundColor: "whiteCard",
    themesDefaultTextColor: "#000",
    borderColor: "borderColor",
  });

  const [fontFamily, setFontFamily] = useState({
    fontFamily: "",
  });
  const [lineHeight, setLineHeight] = useState("1.5");
  const [fontSize, setFontSize] = useState("16px");
  const [justifyAlignment, setJustifyAlignment] = useState("left");
  const [paragraphSpacing, setParagraphSpacing] = useState("15px");
  const [layout, setLayout] = useState("2");

  const handleLayoutChange = (layout) => {
    setLayout(layout);
  };
  const changeParagraphSpacing = (increase) => {
    const minSize = 0; 
    const maxSize = 29; 
    const increment = 3;

    const currentSize = parseInt(paragraphSpacing.replace("px", ""));
    const newSize = increase ? currentSize + increment : currentSize - increment;
    const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
    setParagraphSpacing(`${clampedSize}px`);
  };
  const changeJustifyAlignment = (alignment) => {
    setJustifyAlignment(alignment);
  };
  const changeLineHeight = (increase) => {
    const minSize = 1.0; 
    const maxSize = 2.0;
    const increment = 0.1;

    const currentSize = parseFloat(lineHeight);

    const newSize = increase ? currentSize + increment : currentSize - increment;
    const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
    setLineHeight(clampedSize.toFixed(1));
  };

  const changeFontSize = (increase) => {
    const minSize = 6; 
    const maxSize = 26; 
    const increment = 2;

    const currentSize = parseInt(fontSize.replace("px", ""));
    const newSize = increase ? currentSize + increment : currentSize - increment;
    const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
    setFontSize(`${clampedSize}px`);
  };

  const changeFont = (font) => {
    setFontFamily({
      fontFamily: font === "Default" ? "" : font,
    });
  };
  const changeTheme = (themeName) => {
    if (themeName === "whiteTheme") {
      setTheme({
        name: "whiteTheme",
        border: "darkBorder",
        activeColor: "activeColor",
        cardBackgroundColor: "whiteCard",
        textColor: "textColor",
        borderColor: "borderColor",
        themesDefaultTextColor: "#000",
      });
    }
    if (themeName === "darkTheme") {
      setTheme({
        name: "darkTheme",
        border: "lightBorder",
        activeColor: "activeColor",
        cardBackgroundColor: "darkCard",
        textColor: "whiteColor  ",
        borderColor: "borderColor",
        themesDefaultTextColor: "#fff",
      });
    }
    if (themeName === "sepiaTheme") {
      setTheme({
        name: "sepiaTheme",
        border: "sepiaBorder",
        activeColor: "activeColor",
        cardBackgroundColor: "sepiaCard",
        textColor: "textColor",
        borderColor: "borderColor",
        themesDefaultTextColor: "#9c6f41",
      });
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontFamily,
        fontSize,
        lineHeight,
        justifyAlignment,
        paragraphSpacing,

        layout,
        setLayout: handleLayoutChange,
        setParagraphSpacing: changeParagraphSpacing,
        setJustifyAlignment: changeJustifyAlignment,
        setLineHeight: changeLineHeight,
        setFontSize: changeFontSize,
        setTheme: changeTheme,
        setFontFamily: changeFont,
        loadon,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
