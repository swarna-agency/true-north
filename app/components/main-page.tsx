import { useRef, useState } from "react";
import { AudioPlayer } from "./audio-player";
import { ArrowDownIcon } from "./icons/arrow-down-icon";
import { ArrowHoverIcon } from "./icons/arrow-hover-icon";

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
  };
  const [pinStatus, setPinStatus] = useState(initialStatus);

  // const hoverPin = (elem: Element) => {
  //   console.log("mouse hover");
  //   if (elem.classList.contains("pinOne") && pinStatus["one"] !== "visited") {
  //     setPinStatus({ ...pinStatus, one: "hover" });
  //   } else if (
  //     elem.classList.contains("pinTwo") &&
  //     pinStatus.two !== "visited"
  //   ) {
  //     setPinStatus({ ...pinStatus, two: "hover" });
  //   } else if (
  //     elem.classList.contains("pinThree") &&
  //     pinStatus.three !== "visited"
  //   ) {
  //     setPinStatus({ ...pinStatus, three: "hover" });
  //   }
  // };

  // const leavePin = (elem: Element) => {
  //   console.log("mouse leave");
  //   if (elem.classList.contains("pinOne") && pinStatus.one !== "visited") {
  //     setPinStatus({ ...pinStatus, one: "default" });
  //   } else if (
  //     elem.classList.contains("pinTwo") &&
  //     pinStatus.two !== "visited"
  //   ) {
  //     setPinStatus({ ...pinStatus, two: "default" });
  //   } else if (
  //     elem.classList.contains("pinThree") &&
  //     pinStatus.three !== "visited"
  //   ) {
  //     setPinStatus({ ...pinStatus, three: "default" });
  //   }
  // };

  const closePlayer = () => {
    setAnimationContainer("justifyStart");
    setPinStatus({ ...pinStatus, [activePin]: "visited" });
    setActivePin("");
    setPlayerClass("nodisplay");
    setMapContainerClass("mapBeforeSlide mapSlideBack");
  };

  const onClickPin = (trackNo: string) => {
    if (pinStatus[trackNo] !== "active") {
      if (activePin === "") {
        setMapContainerClass("mapBeforeSlide mapSlideLeft");
        setPinStatus({ ...pinStatus, [trackNo]: "active" });
        setActivePin(trackNo);
        setTimeout(() => {
          setMapContainerClass("");
          setPlayerClass("audioPlayer");
          setAnimationContainer("justifySpaceBetween");
        }, 1200);
      }
      // audio player is open on another track
      else {
        setPinStatus({
          ...pinStatus,
          [activePin]: "visited",
          [trackNo]: "active",
        });
        setActivePin(trackNo);
        setPlayerClass("hidden");
        setTimeout(() => {
          // setMapContainerClass("");
          setPlayerClass("audioPlayer");
          // setAnimationContainer("justifySpaceBetween");
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
          <li>Home</li>
          <li>News</li>
          <li>Tour</li>
        </ul>
      </nav>
      <div className="sectionHero">
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
          Australia’s Top End
        </div>
        <div className="mapParagraph">
          The record aims to highlight environmental hot spots in Northern
          Australia, but the music and title reach broader… leaning into the
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
            // animationRef.current?.scrollIntoView();
            setTimeout(() => {
              animationRef.current?.scrollIntoView();
              setMapButtonClass("nodisplay");
            }, 200);
            setTimeout(() => {
              setMapImgClass("mapImg");
              setPinClass("pin");
            }, 5200);
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
          </div>
          <AudioPlayer
            trackNo={activePin}
            className={playerClass}
            onClose={closePlayer}
          />
        </div>
      </div>
    </div>
  );
};
