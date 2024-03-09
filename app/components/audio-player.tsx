import {
  // Dispatch,
  HTMLAttributes,
  // SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { audioPaths } from "~/data/audio-list";
import { PauseIcon } from "./icons/pause-icon";
import { PlayIcon } from "./icons/play-icon";
// import { CloseIcon } from "./icons/close-icon";
import { trackStory, trackTitles } from "~/data/texts";

interface AudioPlayerProps extends HTMLAttributes<HTMLDivElement> {
  trackNo?: string;
  onClose: () => void;
}

export const AudioPlayer = ({
  trackNo = "one",
  className,
  onClose,
}: AudioPlayerProps) => {
  const [isMute, setIsMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [playerClass, setPlayerClass] = useState(className);

  const [imgOverlayClass, setImgOverlayClass] = useState("");
  const [descOverlayClass, setDescOverlayClass] = useState("nodisplay");

  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      isMute
        ? (playerRef.current.muted = true)
        : (playerRef.current.muted = false);
      isPlaying ? playerRef.current.play() : playerRef.current.pause();
    }
  }, [isMute, isPlaying]);

  // useEffect(() => {
  //   setPlayerClass(className);
  // }, [className]);

  return (
    <div className={className}>
      <div className={`playerImg track${trackNo}Img`}>
        <div className={imgOverlayClass}>
          <button
            className="playerCloseBtn"
            onClick={() => {
              onClose();
            }}
          >
            <img
              src="/images/player/close.png"
              alt="Close button"
              width="40px"
            />
            {/* <CloseIcon /> */}
          </button>
          <button
            className="readMoreBtn"
            onClick={() => {
              setImgOverlayClass("nodisplay");
              setDescOverlayClass("descOverlay fadeIn");
            }}
          >
            Read More
          </button>
        </div>
        {/* overlay track story description */}
        <div className={descOverlayClass}>
          <button
            className="closeDescBtn"
            onClick={() => {
              setImgOverlayClass("fadeIn");
              setDescOverlayClass("descOverlay fadeOut");
              setTimeout(() => {
                setDescOverlayClass("nodisplay");
              }, 900);
            }}
          >
            <img src="/images/player/back.png" alt="Back button" width="40px" />
          </button>
          <p className="trackStoryTxt">{trackStory[trackNo]}</p>
        </div>
      </div>
      <audio autoPlay muted loop ref={playerRef}>
        <source src={audioPaths[trackNo]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="playerCtrl">
        <div className="playerDesc">
          <img src="/images/cd-cover.png" alt="" />
          <div className="trackTitle">
            <h2>{trackTitles[trackNo]}</h2>
            <p>Peter Garrett</p>
          </div>
        </div>

        <div className="playerButtons">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              isMute ? setIsMute(false) : null;
            }}
            className="titleFont playBtn"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
        {/* <button
        onClick={() => {
          setIsMute(!isMute);
        }}
      >
        {isMute ? "unmute" : "mute"}
      </button> */}
        <a
          className="streamBtn"
          href="https://petergarrett.lnk.to/TTNAlbum"
          target="_blank"
          rel="noreferrer"
        >
          Stream Album Now
        </a>
      </div>
    </div>
  );
};
