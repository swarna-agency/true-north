import { useRef, useState } from "react";

export const MainPage = () => {
  // const [mapButtonClass, setMapButtonClass] = useState("");
  const [mapIcon, setMapIcon] = useState("/images/map-icon.png");
  const [animateClass, setAnimateClass] = useState("");
  const animationRef = useRef<HTMLDivElement>(null);

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
            // setTimeout(() => {
            //   setAnimateClass("");
            // }, 7000);
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
        ></div>
      </div>
    </div>
  );
};
