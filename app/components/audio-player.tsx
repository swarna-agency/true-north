import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { audioPaths } from "~/data/audio-list";
import { PauseIcon } from "./icons/pause-icon";
import { PlayIcon } from "./icons/play-icon";
import { trackStory, trackTitles } from "~/data/texts";

interface AudioPlayerProps extends HTMLAttributes<HTMLDivElement> {
  trackNo?: string;
  onClose: () => void;
  // isReset: boolean;
  imgOverlayClass: string;
  setImgOverlayClass: Dispatch<SetStateAction<string>>;
  descOverlayClass: string;
  setDescOverlayClass: Dispatch<SetStateAction<string>>;
  bottomOverlay: string;
  setBottomOverlay: Dispatch<SetStateAction<string>>;

  // isMute: boolean;
  // setIsMute: Dispatch<SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const getProgressWidth = (progress: number) => {
  return Math.floor((progress / 30) * 100) + 1;
};

export const AudioPlayer = ({
  trackNo = "one",
  className,
  onClose,
  imgOverlayClass,
  setImgOverlayClass,
  descOverlayClass,
  setDescOverlayClass,
  bottomOverlay,
  setBottomOverlay,

  // isMute,
  // setIsMute,
  isPlaying,
  setIsPlaying,
}: AudioPlayerProps) => {
  // const [isMute, setIsMute] = useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      // isMute
      //   ? (playerRef.current.muted = true)
      //   : (playerRef.current.muted = false);
      isPlaying
        ? playerRef.current
            .play()
            .then(() => {
              if (playerRef.current?.muted) {
                playerRef.current.muted = false;
              }
            })
            .catch((e) => {
              console.log(e);
            })
        : !playerRef.current.paused
        ? playerRef.current.pause()
        : null;
      // console.log(audioPaths[trackNo]);
      // console.log("play ", isPlaying);

      // console.log("mute", isMute);
    }
  }, [isPlaying]);
  return (
    <div className={className}>
      <div className={`playerImg track${trackNo}Img`}>
        <div className={imgOverlayClass}>
          <button
            className="playerCloseBtn"
            onClick={() => {
              // setIsPlaying(false);
              onClose();
            }}
          >
            <img
              src="/images/player/close.png"
              alt="Close button"
              width="40px"
            />
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
      <audio
        muted
        loop
        ref={playerRef}
        src={audioPaths[trackNo]}
        onTimeUpdate={() => {
          setProgress(
            playerRef.current?.currentTime
              ? Math.floor(playerRef.current?.currentTime)
              : 0
          );
        }}
      >
        {/* <source src={audioPaths[trackNo]} type="audio/mp3" />
        Your browser does not support the audio element. */}
      </audio>
      <div className="playerCtrl">
        {bottomOverlay === "default" ? (
          <>
            <div className="playerDesc">
              <div className="flexrow width75">
                <img src="/images/cd-cover.png" alt="Album cover" />
                <div className="trackTitle">
                  <h2>{trackTitles[trackNo]}</h2>
                  <p>Peter Garrett</p>
                </div>
              </div>
              <div className="moreButtons">
                <button
                  className="btnInfo"
                  onClick={() => {
                    setBottomOverlay("info");
                  }}
                >
                  <img alt="Info button" src="/images/player/info.png" />
                </button>
                <button
                  className="btnShare"
                  onClick={() => {
                    setBottomOverlay("share");
                  }}
                >
                  <img alt="Share button" src="/images/player/share.png" />
                </button>
              </div>
            </div>
            <div>
              <div className="bar">
                <div
                  className="progressBar"
                  style={{ width: `${getProgressWidth(progress)}%` }}
                >
                  <div className="circlePoint">
                    <div className="circleShadow" />
                  </div>
                </div>
              </div>
              <div className="timeTxt">
                <span>
                  0:{progress < 10 ? "0" : ""}
                  {progress}
                </span>
                <span>
                  0:
                  {typeof playerRef.current?.duration !== "undefined"
                    ? Math.floor(playerRef.current?.duration)
                    : "00"}
                </span>
              </div>
              {/* Current time: {progress < 10 ? "0" : ""}
              {progress}
              Total duration: 0:
              {typeof playerRef.current?.duration !== "undefined"
                ? Math.floor(playerRef.current?.duration)
                : "00"} */}
            </div>
            <div className="playerButtons">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  // isMute ? setIsMute(false) : null;
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
          </>
        ) : bottomOverlay === "info" ? (
          <div className="bottomLayer">
            <button
              className="btnBottomClose"
              onClick={() => {
                setBottomOverlay("default");
              }}
            >
              <img
                src="/images/player/back.png"
                alt="Back button"
                width="40px"
              />
            </button>
            Track info here
          </div>
        ) : (
          <div className="bottomLayer">
            <button
              className="btnBottomClose"
              onClick={() => {
                setBottomOverlay("default");
              }}
            >
              <img
                src="/images/player/back.png"
                alt="Back button"
                width="40px"
              />
            </button>
            Share buttons here
          </div>
        )}
      </div>
    </div>
  );
};
