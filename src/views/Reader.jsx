import { useEffect, useRef, useState, useContext, useCallback } from "react";

import HeaderReader from "../components/HeaderReader";
import FooterReader from "../components/FooterReader";
import { ThemeContext } from "../context/ThemeContext";
import { ProgressContext } from "../context/ProgressContext";
import { DisplayContext } from "../context/DisplayContext";
import { BookContext } from "../context/BookContext";
import { IconContext } from "../context/IconContext";
import "../resources/css/fonts.css";

const Reader = () => {
  const readerContainerRef = useRef();
  const renditionRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const { book, sectionDisplay } = useContext(BookContext);
  const { setReadingProgress } = useContext(ProgressContext);
  const { hidden } = useContext(DisplayContext);
  const icons = useContext(IconContext);
  const {
    theme,
    fontFamily,
    fontSize,
    lineHeight,
    justifyAlignment,
    paragraphSpacing,
    loadon,
    layout,
  } = useContext(ThemeContext);

  useEffect(() => {
    if (!renditionRef.current) return;

    renditionRef.current.themes.register("custom", {
      body: {
        color: theme.themesDefaultTextColor,
        "background-color": theme.themesDefaultBackgroundColor,
        "font-family":
          fontFamily.fontFamily !== "" ? `${fontFamily.fontFamily}` : "initial",
        "font-size": `${fontSize}`,
        "line-height": `${lineHeight}`,
        "text-align": `${justifyAlignment}`,
        "scroll-behavior": "smooth",
      },
      html: {
        "scroll-behavior": "smooth",
      },
      p: {
        "padding-bottom": `${paragraphSpacing}`,
      },
    });

    renditionRef.current.themes.select("custom");
  }, [theme, fontFamily, fontSize, lineHeight, justifyAlignment, paragraphSpacing]);
  useEffect(() => {
    if (renditionRef.current && sectionDisplay) {
      renditionRef.current.display(sectionDisplay);
    }
  }, [sectionDisplay]);
  useEffect(() => {
    let isMounted = true;
    const initializeBook = async () => {
      try {
        setIsLoading(true);

        await book.ready;
        if (!isMounted) return;
        await book.locations.generate(1000);
        if (!isMounted) return;
        // const totalPages = book.locations.length();

        renditionRef.current = book.renderTo(readerContainerRef.current, {
          width: "100%",
          height: "100%",
        });
        renditionRef.current.on("relocated", (section) => {
          if (section.start) {
            const currentPage = book.locations.locationFromCfi(section.start.cfi);
            const totalPages = book.locations.length();
            const percentage = Math.ceil((currentPage / totalPages) * 100);
            setReadingProgress(percentage);
          }
        });
        if (!isMounted) return;
        await renditionRef.current.display();
        setIsLoading(false);
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!renditionRef.current) {
      initializeBook();
    } else {
      renditionRef.current.flow(layout === "1" ? "scrolled-continuous" : "paginated");
    }

    return () => {
      isMounted = false;
    };
  }, [book, layout, setIsLoading, setReadingProgress]);

  const nextPage = useCallback(() => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  }, []);

  const prevPage = useCallback(() => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  }, []);

  useEffect(() => {
    if (layout !== "2") return;
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          prevPage();
          break;
        case "ArrowRight":
          nextPage();
          break;
        default:
          break;
      }
    };

    // const handleWheel = (event) => {
    //   if (event.deltaY < 0) {
    //     prevPage();
    //   } else {
    //     nextPage();
    //   }
    // };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [layout, nextPage, prevPage]);

  return (
    <div className={`parent-reader-container ${hidden ? "-display-option" : ""}`}>
      <div
        className="loading"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          display: isLoading ? "block" : "none",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        <img src={loadon} alt="Loading..." width={60} height={60} />
      </div>
      {!isLoading ? <HeaderReader /> : null}

      <div
        id="reader-container"
        className={`reader-container 
          ${theme.name === "sepiaTheme" ? " -target-child" : ""}
          ${layout === "1" ? "-additional-padding-" : ""} 
          ${theme.name} ${theme.textColor}`}
        ref={readerContainerRef}
        style={{ overflowX: "hidden" }}
      >
        {/* This is the container that will have the reader of the application */}
        <div
          onClick={prevPage}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            zIndex: 998,
            cursor: "pointer",
            display: isLoading ? "none" : "block",
          }}
        >
          <icons.ChevronLeftRoundedIcon />
        </div>
        <div
          onClick={nextPage}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            zIndex: 998,
            cursor: "pointer",
            display: isLoading ? "none" : "block",
          }}
        >
          <icons.ChevronRightRoundedIcon />
        </div>
      </div>
      {!isLoading ? <FooterReader /> : null}
    </div>
  );
};

export default Reader;
