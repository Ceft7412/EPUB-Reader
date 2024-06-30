import { useState, useRef, useEffect, useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { IconContext } from "../context/IconContext";

import * as mm from "music-metadata-browser";

import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;

const Music = ({ isOpen, handleOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [songTitles, setSongTitles] = useState([]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [iconToShow, setIconToShow] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [loop, setLoop] = useState(false);
  const [selectItems, setSelectItems] = useState(false);

  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  const { theme } = useContext(ThemeContext);
  const icons = useContext(IconContext);

  const freeSongs = [
    { url: "/music/Digital Threat.mp3", name: "Digital Threat" },
    { url: "/music/Ether.mp3", name: "Ether" },
    { url: "/music/Guilty Spark.mp3", name: "Guilty Spark" },
    { url: "/music/Path Less Traveled.mp3", name: "Path Less Traveled" },
    { url: "/music/Skyward.mp3", name: "Skyward" },
  ];

  const showItemsSelect = () => {
    setSelectItems(!selectItems);
  };
  useEffect(() => {
    const getSongTitles = async () => {
      const titles = await Promise.all(
        freeSongs.map(async (song) => {
          try {
            const response = await fetch(song.url);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();

            const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
            const metadata = await mm.parseBlob(blob);

            return metadata.common.title || song.name;
          } catch (error) {
            return song.name;
          }
        })
      );

      setSongTitles(titles);
    };

    getSongTitles();
  }, []);

  const handleFileChange = async (event) => {
    let file;
    let filename = "";
    let audioUrl;

    if (event.target && event.target.files) {
      if (!event.target.files[0]) {
        return;
      }
      file = event.target.files[0];
      filename = file.name;
      filename = filename.split(".").slice(0, -1).join(".");
      audioUrl = URL.createObjectURL(file);
    } else if (typeof event === "string") {
      const song = freeSongs.find((s) => s.url === event);
      if (!song) {
        return;
      }

      filename = event.name;
      audioUrl = song.url;
    } else {
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIconToShow(false);
    }

    setSelectedFile(audioUrl);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }

    try {
      let metadata;
      if (file) {
        metadata = await mm.parseBlob(file);
      } else {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        metadata = await mm.parseBlob(blob);
      }

      if (metadata.common.artist) {
        setArtist(metadata.common.artist);
      } else {
        setArtist("Unknown");
      }
      if (metadata.common.title) {
        setTitle(metadata.common.title);
      } else {
        setTitle(filename);
      }
    } catch (error) {
      setArtist("Unknown");
      setTitle(filename);
    }
    setSelectItems(false);
    setShowBack(!showBack);
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();

      setIconToShow(!iconToShow);
    } else {
      audioRef.current.pause();
      setIconToShow(!iconToShow);
    }
  };

  const LoopToggle = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setLoop(!loop);
  };

  const handleGoBack = () => {
    setShowBack(!showBack);
    setSelectedFile(null);
    setIconToShow(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIconToShow(false);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [selectedFile]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 59);
    const seconds = Math.round(time % 59);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div className="">
      <div className="item" onClick={() => handleOpen("music")}>
        <icons.MusicNoteRoundedIcon />
      </div>
      <div
        className={`modal-music ${isOpen === "music" ? "open" : ""} ${
          theme.cardBackgroundColor
        } ${theme.textColor} ${theme.borderColor}`}
      >
        <div className="musicHeader">
          {showBack && (
            <div className="icon" onClick={handleGoBack} title="Go back">
              <icons.ArrowBackRoundedIcon />
            </div>
          )}
          <h3>Try your music </h3>
          <div className="icon" onClick={handleOpen}>
            <icons.CloseRoundedIcon />
          </div>
        </div>
        <div className="musicBody">
          <div className={`fileHandlingUpload ${showBack ? "-display-optionMusic" : ""}`}>
            <p>Drag and drop</p>
            <p>or </p>
            <form className="file-up">
              <label className="upload-mp3-file" htmlFor="upload-mp3">
                Select an MP3 file
              </label>
              <input
                className="input-file-upload"
                id="upload-mp3"
                type="file"
                accept="audio/mp3"
                onChange={handleFileChange}
              />
            </form>
            <div className="freeMusicToListen">
              <p>You might consider these</p>
              <div
                className={`selectContainer ${selectItems ? "-set-active-state" : ""}`}
              >
                <div className="selectChoose" onClick={showItemsSelect}>
                  <div className="iconContainerSelect">
                    <icons.AlbumRoundedIcon />
                  </div>
                  <p>Free music</p>
                  <div
                    className={`iconContainerSelect ${
                      selectItems ? "expandMoreIcon" : ""
                    }`}
                  >
                    <icons.ExpandMoreRoundedIcon />
                  </div>
                </div>

                <div
                  className={`selectItems ${
                    selectItems ? "-select-items-display " : ""
                  } ${theme.cardBackgroundColor} ${theme.textColor} ${theme.borderColor}`}
                >
                  {freeSongs.map((song, index) => (
                    <p
                      key={index}
                      className="itemSelect"
                      onClick={() => handleFileChange(song.url)}
                    >
                      {song.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {selectedFile && (
            <div className="wrapperBodyMusic">
              <audio ref={audioRef}>
                <source src={selectedFile} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <div className="itemMusic itemCol">
                <div className="musicTitle">{title}</div>
                <div className="musicArtist">{artist}</div>
              </div>
              <div className="progress-bar" style={{ backgroundColor: "white " }}>
                <div
                  className="progress"
                  style={{
                    height: "5px",
                    backgroundColor: "black",
                    width: `${progress}%`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: `0px`,
                      transform: "translateY( -50%)",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                    }}
                  />
                </div>
              </div>
              <div className="itemMusic itemRow">
                <div className="musicCurrent">{formatTime(currentTime)}</div>
                <div className="musicDuration">{formatTime(duration)}</div>
              </div>
              <div className="itemMusic itemIcons">
                {showVolume && (
                  <div className="itemMusic musicRow">
                    <div className="icon volumeControl">
                      <div className="volume-control">
                        <input
                          className="volume-control-input"
                          type="range"
                          id="volume"
                          name="volume"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="icon iconVolume">
                  <div
                    className="wrapperSingleIcon"
                    onClick={() => {
                      setShowVolume(!showVolume);
                    }}
                    title="Volume Control"
                  >
                    <icons.VolumeUpRoundedIcon style={{ fontSize: 27 }} />
                  </div>
                </div>
                <div className="icon iconPlayPause">
                  <div
                    className={`wrapperSingleIcon ${
                      iconToShow ? "-set-option-none" : "-set-option-display"
                    }`}
                    onClick={handlePlayPause}
                    title="Play Music"
                  >
                    <icons.PlayCircleOutlineRoundedIcon style={{ fontSize: 50 }} />
                  </div>
                  <div
                    className={`wrapperSingleIcon ${
                      iconToShow ? "-set-option-display" : "-set-option-none"
                    }`}
                    onClick={handlePlayPause}
                    title="Pause Music"
                  >
                    <icons.PauseCircleOutlineRoundedIcon style={{ fontSize: 50 }} />
                  </div>
                </div>
                <div className="icon iconRepeat">
                  <div
                    className={`wrapperSingleIcon ${loop ? "-loop-status-display" : ""}`}
                    onClick={LoopToggle}
                    title="Loop Music"
                  >
                    <icons.RepeatRoundedIcon style={{ fontSize: 25 }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music;
