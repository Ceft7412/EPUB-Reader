import { useContext, useState } from "react";

import Toc from "./Toc";
import Configure from "./Configure";
import Music from "./Music";

import { ThemeContext } from "../context/ThemeContext";

const HeaderReader = ({ rendition }) => {
  const { theme } = useContext(ThemeContext);

  const [openModal, setOpenModal] = useState("");

  const handleModalOpen = (modalName) => {
    setOpenModal((prevModal) => (prevModal === modalName ? "" : modalName));
  };

  return (
    <div className={`header ${theme.name} ${theme.textColor}`}>
      <div className="flex">
        <div className="-left-content-">
          <Toc isOpen={openModal} handleOpen={handleModalOpen} />
        </div>
        <div className="-right-content-">
          <Music isOpen={openModal} handleOpen={handleModalOpen} />
          <Configure
            isOpen={openModal}
            handleOpen={handleModalOpen}
            rendition={rendition}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderReader;
