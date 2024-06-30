import React from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextDecreaseRoundedIcon from "@mui/icons-material/TextDecreaseRounded";
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded";
import HeightRoundedIcon from "@mui/icons-material/HeightRounded";
import VerticalAlignCenterRoundedIcon from "@mui/icons-material/VerticalAlignCenterRounded";
import FormatAlignLeftRoundedIcon from "@mui/icons-material/FormatAlignLeftRounded";
import FormatAlignJustifyRoundedIcon from "@mui/icons-material/FormatAlignJustifyRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import TocRoundedIcon from "@mui/icons-material/TocRounded";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const IconContext = React.createContext();

const IconProvider = ({ children }) => {
  const icons = {
    ChevronRightRoundedIcon: ChevronRightRoundedIcon,
    ChevronLeftRoundedIcon: ChevronLeftRoundedIcon,
    SettingsRoundedIcon: SettingsRoundedIcon,
    KeyboardArrowDownRoundedIcon: KeyboardArrowDownRoundedIcon,
    CloseRoundedIcon: CloseRoundedIcon,
    TextDecreaseRoundedIcon: TextDecreaseRoundedIcon,
    TextIncreaseRoundedIcon: TextIncreaseRoundedIcon,
    HeightRoundedIcon: HeightRoundedIcon,
    VerticalAlignCenterRoundedIcon: VerticalAlignCenterRoundedIcon,
    FormatAlignLeftRoundedIcon: FormatAlignLeftRoundedIcon,
    FormatAlignJustifyRoundedIcon: FormatAlignJustifyRoundedIcon,
    MenuBookRoundedIcon: MenuBookRoundedIcon,
    ArticleRoundedIcon: ArticleRoundedIcon,
    PlayCircleOutlineRoundedIcon: PlayCircleOutlineRoundedIcon,
    PauseCircleOutlineRoundedIcon: PauseCircleOutlineRoundedIcon,
    RepeatRoundedIcon: RepeatRoundedIcon,
    VolumeUpRoundedIcon: VolumeUpRoundedIcon,
    VolumeDownRoundedIcon: VolumeDownRoundedIcon,
    ExpandCircleDownOutlinedIcon: ExpandCircleDownOutlinedIcon,
    AlbumRoundedIcon: AlbumRoundedIcon,
    ExpandMoreRoundedIcon: ExpandMoreRoundedIcon,
    ArrowBackRoundedIcon: ArrowBackRoundedIcon,
    MusicNoteRoundedIcon: MusicNoteRoundedIcon,
    TocRoundedIcon: TocRoundedIcon,
  };
  return <IconContext.Provider value={icons}>{children}</IconContext.Provider>;
};

export { IconContext, IconProvider };
