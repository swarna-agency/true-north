import { useEffect, useRef, useState } from "react";
import { audioPaths } from "~/data/audio-list";

export const AudioPlayer = () => {
  const [isMute, setIsMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      isMute
        ? (playerRef.current.muted = true)
        : (playerRef.current.muted = false);
      isPlaying ? playerRef.current.play() : playerRef.current.pause();
    }
  }, [isMute, isPlaying]);

  return (
    <div>
      <audio autoPlay muted loop ref={playerRef}>
        <source src={audioPaths[1]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
        className="titleFont"
      >
        {isPlaying ? "pause" : "play"}
      </button>
      <button
        onClick={() => {
          setIsMute(!isMute);
        }}
      >
        {isMute ? "unmute" : "mute"}
      </button>
    </div>
  );
};
