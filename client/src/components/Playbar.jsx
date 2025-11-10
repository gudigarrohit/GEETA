import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat } from "lucide-react";
import { useSongContext } from "../context/SongContext";

function Playbar() {
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const { selectedSong, isPlaying, setIsPlaying, playingIndex } = useSongContext();
  const { songs, setPlayingIndex } = useSongContext();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!selectedSong || !audioRef.current) return;

    const url = `${API_URL}${selectedSong.filePath}`;
    audioRef.current.src = url;
    audioRef.current.load();

    if (isPlaying) audioRef.current.play();
  }, [selectedSong]);

  const animateProgress = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
    animationRef.current = requestAnimationFrame(animateProgress);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(animateProgress);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = (e) => {
    const value = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = value;
    setProgress(e.target.value);
  };

  const formatTime = (t) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-2 pt-3 px-5 pb-5 w-[97%] bg-[#1f1f1f] rounded-[1.3rem] m-auto mb-2 shadow">
      <div className="flex items-center justify-between text-white">

        <div className="w-1/3 text-center">
          {selectedSong ? selectedSong.name : "No song playing"}
        </div>

        <div className="flex items-center gap-4">
          <SkipBack size={20} />
          <button onClick={togglePlay} className="p-3 bg-white/10 rounded-full hover:bg-white/20">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <SkipForward size={20} />
        </div>

        <div className="w-1/3 text-center text-sm text-gray-300">
          {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
        </div>
      </div>

      <input type="range" min="0" max="100" value={progress}
        onInput={handleSeek}
        style={{ "--progress": `${progress}%` }}
        className="w-full h-1 cursor-pointer"
      />

      <audio ref={audioRef} onLoadedMetadata={handleLoadedMetadata} />
    </div>
  );
}

export default Playbar;
