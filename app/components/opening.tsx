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
          <p className={ctaTextClass}>Click to Start</p>
        </button>
        <div className="acknowledgement">
          <p>
            We acknowledge and pay respect to the traditional owners of the land
            on which we live and we extend that respect to Elders past and
            present.
            {/* </p>
          <p> */}
            We celebrate the culture, stories and traditions of Aboriginal and
            Torres Strait Islander people and we recognise the immeasurable
            influence our First Nations people continue to have on the music and
            art we all enjoy.
          </p>
        </div>
      </div>
    </div>
  );
};
