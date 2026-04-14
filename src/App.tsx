import { useRef, useState } from "react";

const wishesData = [
  {
    name: "Hai mẹ con 🎙️",
    audioSrc: `${import.meta.env.BASE_URL}gallery/ghiam.m4a`,
    text: "Bấm play để nghe lời chúc sinh nhật gửi riêng đến bố! 🎂",
  },
  {
    name: "Hai mẹ con 🎙️",
    audioSrc: `${import.meta.env.BASE_URL}gallery/ghiam1.m4a`,
    text: "Và còn một điều bí mật nữa dành cho bố... 💖",
  },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWish, setCurrentWish] = useState<(typeof wishesData)[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onPlay = () => {};
  const onStop = () => {};

  const playRandomWish = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      onStop();
      return;
    }

    const firstWish = wishesData[0];
    setCurrentWish(firstWish);
    setIsPlaying(true);
    onPlay();

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio1 = new Audio(firstWish.audioSrc);
    audioRef.current = audio1;

    audio1.onended = () => {
      const secondWish = wishesData[1];
      setCurrentWish(secondWish);

      const audio2 = new Audio(secondWish.audioSrc);
      audioRef.current = audio2;

      audio2.onended = () => {
        setIsPlaying(false);
        onStop();
      };

      audio2.play().catch(() => {
        setIsPlaying(false);
        onStop();
      });
    };

    audio1.play().catch((e) => {
      console.error("Audio play failed:", e);
      setIsPlaying(false);
      onStop();
    });
  };

  return (
    <div>
      <button onClick={playRandomWish}>{isPlaying ? "Stop" : "Play"}</button>
      {currentWish && <p>{currentWish.text}</p>}
    </div>
  );
}
