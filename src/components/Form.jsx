import { useState, useContext } from "react";
import ePub from "epubjs";

import { DisplayContext } from "../context/DisplayContext";
import { BookContext } from "../context/BookContext";

const Form = () => {
  const [dragging, setDragging] = useState(false);
  const { setBook } = useContext(BookContext);
  const { setHidden } = useContext(DisplayContext);

  const handleFileChange = async (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== "application/epub+zip") {
        alert(`Invalid file type for ${file.name}. Please select an epub file.`);
        return;
      }
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const book = ePub(e.target.result);
            setHidden(true);

            setBook(book);
          } catch (error) {
            alert(`Error loading ${file.name}: ${error.message}`);
          }
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        alert(`Error reading ${file.name}: ${error.message}`);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const newEvent = { target: { files: event.dataTransfer.files } };
    handleFileChange(newEvent);
  };

  return (
    <div
      className={`card-item left dropzone ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging && <div>Drop files here...</div>}
      {!dragging && (
        <div className="sub-item ">
          <div className="text">
            <p className="dragndrop">Drag and drop your book here </p>
            <p className="middle">or</p>
          </div>
          <form className="file-up">
            <label className="button-file-upload" htmlFor="upload">
              Select book
            </label>
            <input
              className="input-file-upload"
              id="upload"
              type="file"
              accept="application/epub+zip"
              multiple
              onChange={handleFileChange}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
