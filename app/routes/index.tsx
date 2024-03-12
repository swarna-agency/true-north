/* eslint-disable jsx-a11y/media-has-caption */
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Opening } from "~/components/opening";
import { MainPage } from "~/components/main-page";
import { useState } from "react";
export const meta: MetaFunction = () => {
  return [
    { title: "The True North" },
    {
      name: "description",
      content: `Check out The True North, a deeply personal reflection and musical journey, drawing inspiration and sustenance from the living colours of Australia’s natural environment and the sights and sounds of modern Oz.`,
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: "/images/bg/hero-bg.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/wave.png",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/bg/texture-2.png",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/01-img.jpg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/02-img.jpg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/03-img.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/04-img.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/05-img.jpg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/06-img.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/07-img.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/08-img.jpg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/player/09-img.jpeg",
      as: "image",
    },
  ];
};

export default function Index() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [albumBtnClass, setAlbumBtnClass] = useState("albumButton");
  const [vinylImgClass, setVinylImgClass] = useState("vinylImg");
  const [openingDivClass, setOpeningDivClass] = useState("opening");
  const [ctaTextClass, setCtaTextClass] = useState("ctaText");

  const goToMainPageSequence = () => {
    setAlbumBtnClass("albumImg animateAlbum");
    setVinylImgClass("vinylImg animateVinyl");
    setCtaTextClass("hidden");
    setIsEntering(true);
    setTimeout(() => {
      setOpeningDivClass("opening fadeOut2");
    }, 1000);
    setTimeout(() => {
      setHasEntered(true);
    }, 2000);
  };

  const onHover = () => {
    !isEntering ? setCtaTextClass("ctaText ctaTextHover") : null;
  };
  const onHoverOut = () => {
    !isEntering ? setCtaTextClass("ctaText") : null;
  };

  return (
    <div>
      {hasEntered ? (
        <MainPage />
      ) : (
        <Opening
          enterSite={goToMainPageSequence}
          albumImgClass={albumBtnClass}
          vinylImgClass={vinylImgClass}
          openingDivClass={openingDivClass}
          ctaTextClass={ctaTextClass}
          onHover={onHover}
          onHoverOut={onHoverOut}
        />
      )}
    </div>
  );
}
