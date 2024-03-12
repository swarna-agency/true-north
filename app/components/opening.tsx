// import { Dispatch, SetStateAction } from "react";

type OpeningProps = {
  // enterSite: Dispatch<SetStateAction<boolean>>;
  enterSite: () => void;
  albumImgClass: string;
  vinylImgClass: string;
  openingDivClass: string;
  ctaTextClass: string;
  onHover: () => void;
  onHoverOut: () => void;
};

export const Opening = ({
  enterSite,
  albumImgClass,
  vinylImgClass,
  openingDivClass,
  ctaTextClass,
  onHover,
  onHoverOut,
}: OpeningProps) => {
  return (
    <div className={openingDivClass}>
      <h1 className="titleName">Peter Garrett.</h1>
      <div className="imgContainer">
        <button
          className="albumButton"
          onClick={() => {
            enterSite();
          }}
          onMouseEnter={() => {
            onHover();
          }}
          onMouseLeave={() => {
            onHoverOut();
          }}
        >
          <img
            className={albumImgClass}
            src="/images/cd-cover.png"
            alt="The True North album cover"
          />
          <img
            className={vinylImgClass}
            src="/images/vinyl.png"
            alt="The True North vinyl"
          />
        </button>
        <p className={ctaTextClass}>Click to Start</p>
      </div>
    </div>
  );
};
