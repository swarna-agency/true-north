/* eslint-disable jsx-a11y/media-has-caption */
import type { MetaFunction } from "@remix-run/node";
import { AudioPlayer } from "~/components/audio-player";
import { Opening } from "~/components/opening";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Opening />
      <AudioPlayer />
    </div>
  );
}
