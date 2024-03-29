import {
  CSSProperties,
  DetailedHTMLProps,
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
import {
  trackCoords,
  trackLocations,
  trackStory,
  trackTitles,
} from "~/data/texts";
import { CopyIcon } from "./icons/copy-icon";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "./icons/social-icons";
import { SkipBackIcon, SkipForwardIcon } from "./icons/skip-icons";

interface AudioPlayerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  trackNo?: string;
  onClose: () => void;
  imgOverlayClass: string;
  setImgOverlayClass: Dispatch<SetStateAction<string>>;
  descOverlayClass: string;
  setDescOverlayClass: Dispatch<SetStateAction<string>>;
  bottomOverlay: string;
  setBottomOverlay: Dispatch<SetStateAction<string>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  onClickPin: (track: string) => void;
}

interface CustomCSSProps extends CSSProperties {
  "--progress-width": string;
}

// const getProgressWidth = (progress: number) => {
//   return Math.floor((progress / 30) * 100);
// };

const websiteLink = "thetruenorth.petergarrett.com.au";

const next: { [char: string]: string } = {
  one: "two",
  two: "three",
  three: "four",
  four: "five",
  five: "six",
  six: "seven",
  seven: "eight",
  eight: "nine",
  nine: "one",
};
const prev: { [char: string]: string } = {
  one: "nine",
  two: "one",
  three: "two",
  four: "three",
  five: "four",
  six: "five",
  seven: "six",
  eight: "seven",
  nine: "eight",
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

  isPlaying,
  setIsPlaying,
  onClickPin,
}: AudioPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef<HTMLAudioElement>(null);
  const seekbarRef = useRef<HTMLInputElement>(null);

  const [tooltipClass, setTooltipClass] = useState("nodisplay");
  const [isMobile, setIsMobile] = useState(false);

  const getProgressPosition = () => {
    if (!duration || duration < 10)
      return Math.floor((progress / 30) * 100) + 1;
    return Math.floor((progress / duration) * 100) + 1;
  };

  useEffect(() => {
    if (window.innerWidth < 550) {
      setIsMobile(true);
    }
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
    }
    playerRef.current ? setDuration(playerRef.current.duration) : null;
  }, [isPlaying]);
  useEffect(() => {
    isPlaying && playerRef.current
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
      : null;
  });

  const handleSkipBack = () => {
    // check timing
    if (progress > 0) {
      playerRef.current && playerRef.current.currentTime
        ? (playerRef.current.currentTime = 0)
        : null;
    } else {
      onClickPin(prev[trackNo]);
    }
  };

  return (
    <div className={className}>
      <div className={`playerImg track${trackNo}Img`}>
        <div className={imgOverlayClass}>
          {/* <div className="barDecor">
            <div className="decor one"></div>
            <div className="decor"></div>
            <div className="decor"></div>
          </div> */}
          <button
            className="playerCloseBtn"
            onClick={() => {
              onClose();
            }}
          >
            <img
              src="/images/player/close-small.png"
              alt="Close button"
              width="30px"
            />
          </button>
          <div className="imgTxtDiv">
            <div className="imgTxt">
              <p className="locTxt">{trackLocations[trackNo]}</p>
              <p className="coordTxt">{trackCoords[trackNo]}</p>
            </div>
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
        </div>
        {/* overlay track story description */}
        <div className={descOverlayClass}>
          <button
            className="closeDescBtn"
            onClick={() => {
              setImgOverlayClass("imgOverlay fadeIn");
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
          // setProgressPosition(`${getProgressWidth(progress)}%`);
          if (playerRef.current && playerRef.current.currentTime <= 12) {
            playerRef.current.volume =
              (playerRef.current.currentTime / 5) * 0.4;
          } else if (playerRef.current && playerRef.current.currentTime >= 25) {
            playerRef.current.volume = (30 - playerRef.current.currentTime) / 5;
          } else if (playerRef.current) {
            playerRef.current.volume = 1;
          }
        }}
      ></audio>
      <div className="playerCtrl">
        {bottomOverlay === "default" ? (
          <>
            <div className="playerDesc">
              <div className="flexrow width75">
                <img
                  src="/images/cd-cover.png"
                  alt="Album cover"
                  width="50px"
                  height="52px"
                />
                <div className="trackTitle">
                  <h2>{trackTitles[trackNo]}</h2>
                  <p>Peter Garrett</p>
                </div>
              </div>
              <div className="moreButtons">
                {/* <button
                  className="btnInfo"
                  onClick={() => {
                    setBottomOverlay("info");
                  }}
                >
                  <img alt="Info button" src="/images/player/info.png" />
                </button> */}
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
              <input
                ref={seekbarRef}
                id="seekbar"
                name="seekbar"
                type="range"
                min="0"
                max={
                  playerRef.current && playerRef.current.duration
                    ? Math.floor(playerRef.current?.duration)
                    : "0"
                }
                step="1"
                value={progress}
                onInput={() => {
                  playerRef.current &&
                  playerRef.current.currentTime &&
                  seekbarRef.current?.value
                    ? (playerRef.current.currentTime = Number(
                        seekbarRef.current?.value
                      ))
                    : null;
                }}
                style={
                  {
                    "--progress-width": `${getProgressPosition()}%`,
                  } as CustomCSSProps
                }
              />

              <div className="timeTxt">
                <span>
                  0:{progress < 10 ? "0" : ""}
                  {progress}
                </span>
                <span>
                  0:
                  {playerRef.current && playerRef.current.duration
                    ? Math.floor(playerRef.current?.duration)
                    : "00"}
                </span>
              </div>
            </div>
            <div className="playerButtons">
              <button
                className="skipBtn"
                onClick={() => {
                  handleSkipBack();
                }}
              >
                <SkipBackIcon />
              </button>
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  playerRef.current ? (playerRef.current.volume = 0) : null;
                }}
                className="titleFont playBtn"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                className="skipBtn"
                onClick={() => {
                  onClickPin(next[trackNo]);
                }}
              >
                <SkipForwardIcon />
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
              Purchase/Stream/Download Album
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
            <div className="shareLayer">
              <p className="shareTitle">Share with</p>
              <div className="shareButtons">
                <a
                  className="socialBtn"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://facebook.com/share.php?u=https://${websiteLink}`}
                >
                  <FacebookIcon />
                </a>
                <a
                  className="socialBtn"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/intent/tweet?url=https://${websiteLink}&text=Check%20out%20The%20True%20North%20album%20player%20from%20Peter%20Garrett`}
                >
                  <TwitterIcon />
                </a>
                <a
                  className="socialBtn wa"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me?text=Check%20out%20The%20True%20North%20album%20player%20from%20Peter%20Garrett.%20https://${websiteLink}`}
                >
                  <WhatsappIcon />
                </a>
              </div>
              <p className="shareTxt">Or share with link</p>
              <div className="shareLink">
                <span>{isMobile ? "thetruenorth.peter..." : websiteLink}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://${websiteLink}`);
                    setTooltipClass("copyTooltip");
                    setTimeout(() => {
                      setTooltipClass("nodisplay");
                    }, 2500);
                  }}
                >
                  <CopyIcon />
                </button>
                <div className={tooltipClass}>Copied to clipboard</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
