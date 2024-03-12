import { useRef, useState } from "react";
import { AudioPlayer } from "./audio-player";
import {
  ArrowDownIcon,
  ArrowHoverIcon,
  ArrowUpIcon,
} from "./icons/arrows-icon";
import {
  AppleIcon,
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./icons/social-icons";

const getPinImg = (status: string): string => {
  switch (status) {
    case "default": {
      return "/images/pin/pin-default.png";
    }
    case "active":
    case "hover": {
      return "/images/pin/pin-hover.png";
    }
    case "visited": {
      return "/images/pin/pin-visited.png";
    }
    default:
      return "";
  }
};

export const MainPage = () => {
  const [mapButtonClass, setMapButtonClass] = useState("mapButton");
  const [mapIcon, setMapIcon] = useState("/images/map-icon.png");
  const [animateClass, setAnimateClass] = useState("");
  const [animationContainer, setAnimationContainer] = useState("justifyCenter");
  const [mapImgClass, setMapImgClass] = useState("nodisplay");
  const [mapContainerClass, setMapContainerClass] = useState("");
  const [isArrowHover, setIsArrowHover] = useState(false);

  const [pinClass, setPinClass] = useState("nodisplay");
  const [playerClass, setPlayerClass] = useState("nodisplay");
  const [activePin, setActivePin] = useState("");

  const animationRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const initialStatus: { [char: string]: string } = {
    one: "default",
    two: "default",
    three: "default",
    four: "default",
    five: "default",
    six: "default",
    seven: "default",
    eight: "default",
    nine: "default",
  };
  const [pinStatus, setPinStatus] = useState(initialStatus);

  const [imgOverlayClass, setImgOverlayClass] = useState("imgOverlay");
  const [descOverlayClass, setDescOverlayClass] = useState("nodisplay");
  const [bottomOverlay, setBottomOverlay] = useState("default");

  // const [isMute, setIsMute] = useState(true);
  // const [totalDuration, setTotalDuratio] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const closePlayer = () => {
    setAnimationContainer("justifyStart");
    setPinStatus({ ...pinStatus, [activePin]: "visited" });
    setActivePin("");
    setPlayerClass("nodisplay");
    setMapContainerClass("mapBeforeSlide mapSlideBack");
    setIsPlaying(false);
    setBottomOverlay("default");
    // setIsMute(true);
  };

  const hasVisitedAll = () => {
    const values = Object.values(pinStatus);
    return (
      values.every((item) => item !== "default") &&
      values.filter((val) => val === "active").length <= 1 &&
      values.filter((val) => val === "hover").length < 1
    );
  };

  const onClickPin = (trackNo: string) => {
    if (pinStatus[trackNo] !== "active") {
      if (activePin === "") {
        setMapContainerClass("mapBeforeSlide mapSlideLeft");
        setPinStatus({ ...pinStatus, [trackNo]: "active" });
        setActivePin(trackNo);
        // setPlayerClass("audioPlayer");
        setTimeout(() => {
          setMapContainerClass("");
          setPlayerClass("audioPlayer");
          setAnimationContainer("justifySpaceBetween");
        }, 1200);
      }
      // audio player is open on another track
      else {
        setIsPlaying(false);
        setBottomOverlay("default");
        setPinStatus({
          ...pinStatus,
          [activePin]: "visited",
          [trackNo]: "active",
        });
        setActivePin(trackNo);
        setPlayerClass("hidden");
        setImgOverlayClass("imgOverlay");
        setDescOverlayClass("nodisplay");
        setTimeout(() => {
          setPlayerClass("audioPlayer");
        }, 200);
      }
    }
  };

  const changeStatus = (trackNo: string, newStatus: string) => {
    if (pinStatus[trackNo] !== "visited" && pinStatus[trackNo] !== "active") {
      setPinStatus({ ...pinStatus, [trackNo]: newStatus });
    }
  };

  return (
    <div className="mainPage">
      <nav className="navbar">
        <img src="/images/logo-white.png" alt="Website Logo" />
        <ul className="navlist">
          <li>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Home
            </button>
          </li>
          <li>
            <a
              href="https://petergarrett.com.au/news/"
              target="_blank"
              rel="noreferrer"
            >
              News
            </a>
          </li>
          <li>
            <a
              href="https://petergarrett.com.au/tour/"
              target="_blank"
              rel="noreferrer"
            >
              Tour
            </a>
          </li>
          <li>
            <a
              className="purchaseBtn"
              href="https://petergarrett.lnk.to/TTNAlbum"
              target="_blank"
              rel="noreferrer"
            >
              Purchase/Stream/Download Album
            </a>
          </li>
        </ul>
      </nav>
      <div className="sectionHero">
        <div className="bgImg"></div>
        <h1 className="titleAlbum">The True North</h1>
        <p className="heroParagraph">
          A deeply personal reflection and musical journey, drawing inspiration
          and sustenance from the living colours of Australia’s natural
          environment and the sights and sounds of modern Oz.
        </p>
      </div>
      <div className="sectionWave">
        <button
          className="exploreBtn"
          onMouseEnter={() => {
            setIsArrowHover(true);
          }}
          onMouseLeave={() => {
            setIsArrowHover(false);
          }}
          onClick={() => {
            mapSectionRef.current?.scrollIntoView();
          }}
        >
          {isArrowHover ? <ArrowHoverIcon /> : <ArrowDownIcon />}
          <span>Explore the True North Sound</span>
        </button>
      </div>
      <div className="sectionDebris"></div>
      <div className="sectionMap" ref={mapSectionRef}>
        <div className="mapHeading">
          The True North is a musical adventure drawing inspiration from
          Australia’s Top End.
        </div>
        <div className="mapParagraph">
          The record aims to highlight environmental hot spots in Northern
          Australia, but the music and title reach broader… so leaning into the
          navigational meaning of true north but also referencing one’s moral
          compass with both geographic and philosophical meaning.
        </div>
        <button
          className={mapButtonClass}
          onMouseEnter={() => {
            // setMapButtonClass("hidden");
            setMapIcon("/images/map-icon-2.png");
          }}
          onMouseLeave={() => {
            // setMapButtonClass("");
            setMapIcon("/images/map-icon.png");
          }}
          onClick={() => {
            setAnimateClass("animateMap");
            // animationRef.current?.scrollIntoView({ behavior: "instant" });
            setMapButtonClass("nodisplay");
            // window.scrollTo({ top: 1500, behavior: "instant" });
            // const interval = setInterval(() => {
            // animationRef.current?.scrollIntoView({ behavior: "instant" });
            // }, 1000);
            // setTimeout(() => {
            animationRef.current?.scrollIntoView();
            // }, 10);
            setTimeout(() => {
              setMapImgClass("mapImg");
              setPinClass("pin");
              // clearInterval(interval);
              // animationRef.current?.scrollIntoView();
            }, 2500);
          }}
        >
          <div>
            <img src={mapIcon} alt="" width="100px" />
            <p>Click to Explore</p>
          </div>
        </button>
        <div
          ref={animationRef}
          className={`animationContainer ${animateClass} ${animationContainer}`}
        >
          <div className={`relative ${mapContainerClass}`}>
            <img
              className={mapImgClass}
              src="/images/map.png"
              alt="Map of Australia"
            />
            <button
              className={`${pinClass} pinButton pinOne`}
              onClick={() => {
                onClickPin("one");
              }}
              onMouseEnter={() => {
                changeStatus("one", "hover");
                // if (pinStatus.one !== "visited" && pinStatus.one !== "active") {
                //   setPinStatus({ ...pinStatus, one: "hover" });
                // }
              }}
              onMouseLeave={() => {
                changeStatus("one", "default");
                // if (pinStatus.one !== "visited" && pinStatus.one !== "active") {
                //   setPinStatus({ ...pinStatus, one: "default" });
                // }
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.one)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinTwo`}
              onClick={() => {
                onClickPin("two");
              }}
              onMouseEnter={() => {
                changeStatus("two", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("two", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.two)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinThree`}
              onClick={() => {
                onClickPin("three");
              }}
              onMouseEnter={() => {
                changeStatus("three", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("three", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.three)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinFour`}
              onClick={() => {
                onClickPin("four");
              }}
              onMouseEnter={() => {
                changeStatus("four", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("four", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.four)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinFive`}
              onClick={() => {
                onClickPin("five");
              }}
              onMouseEnter={() => {
                changeStatus("five", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("five", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.five)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinSix`}
              onClick={() => {
                onClickPin("six");
              }}
              onMouseEnter={() => {
                changeStatus("six", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("six", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.six)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinSeven`}
              onClick={() => {
                onClickPin("seven");
              }}
              onMouseEnter={() => {
                changeStatus("seven", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("seven", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.seven)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinEight`}
              onClick={() => {
                onClickPin("eight");
              }}
              onMouseEnter={() => {
                changeStatus("eight", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("eight", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.eight)} alt="" />
            </button>
            <button
              className={`${pinClass} pinButton pinNine`}
              onClick={() => {
                onClickPin("nine");
              }}
              onMouseEnter={() => {
                changeStatus("nine", "hover");
              }}
              onMouseLeave={() => {
                changeStatus("nine", "default");
              }}
            >
              <img className="pinImg" src={getPinImg(pinStatus.nine)} alt="" />
            </button>
          </div>
          <AudioPlayer
            trackNo={activePin}
            className={playerClass}
            onClose={closePlayer}
            imgOverlayClass={imgOverlayClass}
            setImgOverlayClass={setImgOverlayClass}
            descOverlayClass={descOverlayClass}
            setDescOverlayClass={setDescOverlayClass}
            bottomOverlay={bottomOverlay}
            setBottomOverlay={setBottomOverlay}
            // isMute={isMute}
            // setIsMute={setIsMute}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onClickPin={onClickPin}
          />
        </div>
        <div className="topBtnContainer">
          {hasVisitedAll() ? (
            <button
              className="toTopBtn"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <div className="upArrowOutCircle">
                <div className="upArrowInCircle">
                  <ArrowUpIcon />
                </div>
              </div>
              Back to Top
            </button>
          ) : null}
        </div>
      </div>
      <div className="sectionFooter">
        <div>
          <span style={{ fontWeight: "700" }}>© Peter Garrett 2024</span>
          <span>
            <a
              href="https://petergarrett.com.au/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          </span>
          <span>
            <a
              href="https://petergarrett.com.au/contact/"
              target="_blank"
              rel="noreferrer"
            >
              Contact
            </a>
          </span>
        </div>
        <div className="footerIcons">
          <a
            href="https://twitter.com/pgarrett"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.instagram.com/peterrgarrett/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/petergarrettofficial/"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.youtube.com/channel/UCTp1b1ENP-mPCuDvdlLvFjA"
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeIcon />
          </a>
          <a
            href="https://music.apple.com/au/artist/peter-garrett/33147132"
            target="_blank"
            rel="noreferrer"
          >
            <AppleIcon />
          </a>
          <a
            href="https://open.spotify.com/artist/3wgUGwReUoTsnLAC0ColFJ/"
            target="_blank"
            rel="noreferrer"
          >
            <SpotifyIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
