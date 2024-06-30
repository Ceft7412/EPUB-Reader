import { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconContext } from "../context/IconContext";

const Configure = ({ isOpen, handleOpen }) => {
  const [textShow, setTextShow] = useState("Light");
  const [fontText, setFontText] = useState("Default");
  const [activeBackground, setActiveBackground] = useState("whiteTheme");
  const [activeJustify, setActiveJustify] = useState("left");
  const [activeFont, setActiveFont] = useState("Default");
  const [activeLayout, setActiveLayout] = useState("2");

  const [cardColors, setCardColors] = useState(false);
  const [cardFont, setCardFont] = useState(false);

  const icons = useContext(IconContext);
  const {
    theme,
    setTheme,
    setFontFamily,
    setFontSize,
    setLineHeight,
    setJustifyAlignment,
    setParagraphSpacing,
    setLayout,
  } = useContext(ThemeContext);
  const [percentage, setPercentage] = useState(50);
  const [percentageLine, setPercentageLine] = useState(50);
  const [percentageParagraph, setPercentageParagraph] = useState(50);

  const handleLayoutChange = (layout) => {
    setActiveLayout(layout);
    setLayout(layout);
  };

  const decreaseParagraphSpacing = () => {
    setPercentageParagraph((prevPercentage) => Math.max(0, prevPercentage - 10));
    setParagraphSpacing(false);
  };
  const increaseParagraphSpacing = () => {
    setPercentageParagraph((prevPercentage) => Math.min(100, prevPercentage + 10));
    setParagraphSpacing(true);
  };

  const handleJustifyAlignment = (alignment) => {
    setJustifyAlignment(alignment);
    if (alignment === "left") {
      setActiveJustify("left");
    }
    if (alignment === "justify") {
      setActiveJustify("justify");
    }
  };
  const decreasePercentage = () => {
    setPercentage((prevPercentage) => Math.max(0, prevPercentage - 10));
    setFontSize(false);
  };

  const increasePercentage = () => {
    setPercentage((prevPercentage) => Math.min(100, prevPercentage + 10));
    setFontSize(true);
  };

  const decreasePercentageLine = () => {
    setPercentageLine((prevPercentage) => Math.max(0, prevPercentage - 10));
    setLineHeight(false);
  };

  const increasePercentageLine = () => {
    setPercentageLine((prevPercentage) => Math.min(100, prevPercentage + 10));
    setLineHeight(true);
  };

  const handleThemeChange = (themeName, text) => {
    setActiveBackground(themeName);
    setTheme(themeName);
    setTextShow(text);
    setCardColors(false);
  };

  const handleFontChange = (className, fontFamily) => {
    setActiveFont(fontFamily);
    setFontFamily(className);
    setFontText(fontFamily);
    setCardFont(false);
  };

  const cardThemeRef = useRef(null);
  const cardColorsRef = useRef(null);
  const cardFontRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardColorsRef.current && !cardColorsRef.current.contains(event.target)) {
        setCardColors(false);
      }
      if (cardFontRef.current && !cardFontRef.current.contains(event.target)) {
        setCardFont(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={cardThemeRef}>
      <div className="item" onClick={() => handleOpen("configure")}>
        <icons.SettingsRoundedIcon />
      </div>
      <div
        className={`modal-themes ${isOpen === "configure" ? "open" : ""} ${
          theme.cardBackgroundColor
        } ${theme.textColor} ${theme.borderColor}`}
      >
        <div className="modal-themes-flex">
          <div className="config-header">
            <div></div>
            <div className="icon" onClick={handleOpen}>
              <icons.CloseRoundedIcon />
            </div>
          </div>
          <div className="config-body">
            <div className="itemTheme">
              <span className="label">Background</span>
              <div className="relativeContainer" ref={cardColorsRef}>
                <div
                  className={`colorBackground `}
                  onClick={() => setCardColors(!cardColors)}
                >
                  <span className="colorText">{textShow}</span>
                  <div className="iconChoose">
                    <icons.KeyboardArrowDownRoundedIcon />
                  </div>
                </div>
                {cardColors && (
                  <div
                    className={`cardColors ${theme.name} ${theme.textColor} ${theme.borderColor} `}
                  >
                    <div className="flexCardColors">
                      <p
                        className={`colorSpes ${
                          activeBackground === "whiteTheme"
                            ? "-active-background-color"
                            : ""
                        }`}
                        onClick={() => handleThemeChange("whiteTheme", "Light")}
                      >
                        Light
                      </p>
                      <p
                        className={`colorSpes ${
                          activeBackground === "darkTheme"
                            ? "-active-background-color"
                            : ""
                        }`}
                        onClick={() => handleThemeChange("darkTheme", "Dark")}
                      >
                        Black
                      </p>
                      <p
                        className={`colorSpes ${
                          activeBackground === "sepiaTheme"
                            ? "-active-background-color"
                            : ""
                        }`}
                        onClick={() => handleThemeChange("sepiaTheme", "Sepia")}
                      >
                        Sepia
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="itemTheme">
              <span className="label">Font</span>
              <div className="relativeContainer" ref={cardFontRef}>
                <div
                  className={`colorBackground fontWidth`}
                  onClick={() => setCardFont(!cardFont)}
                >
                  <span className="colorText">{fontText}</span>
                  <div className="iconChoose">
                    <icons.KeyboardArrowDownRoundedIcon />
                  </div>
                </div>
                {cardFont && (
                  <div
                    className={`cardColors ${theme.name} ${theme.textColor} ${theme.borderColor} `}
                  >
                    <div className="flexCardColors">
                      <p
                        className={`colorSpes ${
                          activeFont === "Default" ? "-active-background-color" : ""
                        }`}
                        onClick={() => handleFontChange("Default", "Default")}
                      >
                        Default
                      </p>
                      <p
                        className={`colorSpes  -arial-font-family ${
                          activeFont === "Arial" ? "-active-background-color" : ""
                        }`}
                        onClick={() => handleFontChange("Arial", "Arial")}
                      >
                        Arial
                      </p>
                      <p
                        className={`colorSpes -georgia-font-family ${
                          activeFont === "Georgia" ? "-active-background-color" : ""
                        }`}
                        onClick={() => handleFontChange("Georgia", "Georgia")}
                      >
                        Georgia
                      </p>
                      <p
                        className={`colorSpes -times-new-roman-font-family ${
                          activeFont === "Times New Roman"
                            ? "-active-background-color"
                            : ""
                        }`}
                        onClick={() =>
                          handleFontChange(
                            "-times-new-roman-font-family",
                            "Times New Roman"
                          )
                        }
                      >
                        Times New Roman
                      </p>
                      <p
                        className={`colorSpes -verdana-font-family ${
                          activeFont === "Verdana" ? "-active-background-color" : ""
                        }`}
                        onClick={() => handleFontChange("Verdana", "Verdana")}
                      >
                        Verdana
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="itemTheme">
              <span className="label">Font Size</span>
              <div className="-item-theme-flex-row-">
                <div className="-p-theme" onClick={decreasePercentage}>
                  <icons.TextDecreaseRoundedIcon style={{ fontSize: 20 }} />
                </div>

                <div className="-p-theme" onClick={increasePercentage}>
                  <icons.TextIncreaseRoundedIcon style={{ fontSize: 20 }} />
                </div>
                <div className="-value-theme">{percentage}%</div>
              </div>
            </div>
            <div className="itemTheme">
              <span className="label">Line Spacing</span>
              <div className="-item-theme-flex-row-">
                <div className="-p-theme" onClick={decreasePercentageLine}>
                  <icons.VerticalAlignCenterRoundedIcon style={{ fontSize: 20 }} />
                </div>

                <div className="-p-theme" onClick={increasePercentageLine}>
                  <icons.HeightRoundedIcon style={{ fontSize: 20 }} />
                </div>
                <div className="-value-theme">{percentageLine}%</div>
              </div>
            </div>
            <div className="itemTheme">
              <span className="label">Paragraph Spacing</span>
              <div className="-item-theme-flex-row-">
                <div className="-p-theme" onClick={decreaseParagraphSpacing}>
                  <icons.VerticalAlignCenterRoundedIcon style={{ fontSize: 20 }} />
                </div>

                <div className="-p-theme" onClick={increaseParagraphSpacing}>
                  <icons.HeightRoundedIcon style={{ fontSize: 20 }} />
                </div>
                <div className="-value-theme">{percentageParagraph}%</div>
              </div>
            </div>
            <div className="itemTheme colsItemTheme">
              <span className="label">Justify Alignment</span>
              <div className="-item-theme-flex-row- -biggergap-theme">
                <div
                  className={`-p-theme ${
                    activeJustify === "left" ? "-active-state-change" : ""
                  }`}
                  onClick={() => handleJustifyAlignment("left")}
                >
                  <icons.FormatAlignLeftRoundedIcon style={{ fontSize: 30 }} />
                </div>

                <div
                  className={`-p-theme ${
                    activeJustify === "justify" ? "-active-state-change" : ""
                  }`}
                  onClick={() => handleJustifyAlignment("justify")}
                >
                  <icons.FormatAlignJustifyRoundedIcon style={{ fontSize: 30 }} />
                </div>
              </div>
            </div>
            <div className="itemTheme colsItemTheme">
              <span className="label">Layout</span>
              <div className="-item-theme-flex-row- -biggergap-theme">
                <div
                  className={`-p-theme ${
                    activeLayout === "2" ? "-active-state-change" : ""
                  }`}
                  onClick={() => handleLayoutChange("2")}
                >
                  <icons.MenuBookRoundedIcon style={{ fontSize: 30 }} />
                </div>

                <div
                  className={`-p-theme ${
                    activeLayout === "1" ? "-active-state-change" : ""
                  }`}
                  onClick={() => handleLayoutChange("1")}
                >
                  <icons.ArticleRoundedIcon style={{ fontSize: 30 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configure;
