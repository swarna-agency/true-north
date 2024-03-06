/* eslint-disable jsx-a11y/media-has-caption */
import type { MetaFunction } from "@remix-run/node";
// import { AudioPlayer } from "~/components/audio-player";
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

export default function Index() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div>
      {hasEntered ? <MainPage /> : <Opening enterSite={setHasEntered} />}
      {/* <AudioPlayer /> */}
    </div>
  );
}
