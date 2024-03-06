import { useRef, useState } from "react";

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
  // const [mapButtonClass, setMapButtonClass] = useState("");
  const [mapIcon, setMapIcon] = useState("/images/map-icon.png");
  const [animateClass, setAnimateClass] = useState("");
  const [mapImgClass, setMapImgClass] = useState("nodisplay");
  const [pinClass, setPinClass] = useState("nodisplay");
  const animationRef = useRef<HTMLDivElement>(null);

  const initialStatus = {
    one: "default",
    two: "default",
    three: "default",
  };
  const [pinStatus, setPinStatus] = useState(initialStatus);

  const hoverPin = (elem: Element) => {
    if (elem.classList.contains("pinOne") && pinStatus.one !== "visited") {
      setPinStatus({ ...pinStatus, one: "hover" });
    } else if (
      elem.classList.contains("pinTwo") &&
      pinStatus.two !== "visited"
    ) {
      setPinStatus({ ...pinStatus, two: "hover" });
    } else if (
      elem.classList.contains("pinThree") &&
      pinStatus.three !== "visited"
    ) {
      setPinStatus({ ...pinStatus, three: "hover" });
    }
  };

  const leavePin = (elem: Element) => {
    if (elem.classList.contains("pinOne") && pinStatus.one !== "visited") {
      setPinStatus({ ...pinStatus, one: "default" });
    } else if (
      elem.classList.contains("pinTwo") &&
      pinStatus.two !== "visited"
    ) {
      setPinStatus({ ...pinStatus, two: "default" });
    } else if (
      elem.classList.contains("pinThree") &&
      pinStatus.three !== "visited"
    ) {
      setPinStatus({ ...pinStatus, three: "default" });
    }
  };

  // useEffect(() => {
  //   isHidden ? setMapButtonClass("hidden") : setMapButtonClass("");
  //   console.log(isHidden);
  // }, [isHidden]);

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
      <div className="sectionWave"></div>
      <div className="sectionDebris"></div>
      <div className="sectionMap">
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
          className="mapButton"
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
            }, 200);
            setTimeout(() => {
              setMapImgClass("mapImg");
              setPinClass("pin");
            }, 5000);
          }}
        >
          <div>
            <img src={mapIcon} alt="" width="100px" />
            <p>Click to Explore</p>
          </div>
        </button>
        <div
          ref={animationRef}
          className={`animationContainer ${animateClass}`}
        >
          <div className="relative">
            <img
              className={mapImgClass}
              src="/images/map.png"
              alt="Map of Australia"
            />
            <img
              className={`${pinClass} pinOne`}
              src={getPinImg(pinStatus.one)}
              alt=""
              onMouseEnter={(event) => {
                event.target instanceof Element ? hoverPin(event.target) : null;
              }}
              onMouseLeave={(event) => {
                event.target instanceof Element ? leavePin(event.target) : null;
              }}
            />
            <img
              className={`${pinClass} pinTwo`}
              src={getPinImg(pinStatus.two)}
              alt=""
              onMouseEnter={(event) => {
                event.target instanceof Element ? hoverPin(event.target) : null;
              }}
              onMouseLeave={(event) => {
                event.target instanceof Element ? leavePin(event.target) : null;
              }}
            />
            <img
              className={`${pinClass} pinThree`}
              src={getPinImg(pinStatus.three)}
              alt=""
              onMouseEnter={(event) => {
                event.target instanceof Element ? hoverPin(event.target) : null;
              }}
              onMouseLeave={(event) => {
                event.target instanceof Element ? leavePin(event.target) : null;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
