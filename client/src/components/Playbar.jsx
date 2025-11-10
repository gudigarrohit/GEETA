import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Repeat1 } from "lucide-react";
import { useSongContext } from "../context/SongContext";

function Playbar() {

  const rafRef = useRef(null);
  const repeatOnePlayed = useRef(false);

  const {
    selectedAlbum,
    selectedSong,
    setSelectedSong,
    isPlaying,
    setIsPlaying,
    playingIndex,
    setPlayingIndex,
    songs
  } = useSongContext();

  // ✅ playlist = Album songs (not global songs)
  const playlist = selectedAlbum?.songs || songs;

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState("default"); // default | repeat | repeatOne

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const audioRef = useRef(null);
  const animationRef = useRef(null);  // ✅ this one updates the slider smoothly

  // ✅ ensure selectedSong follows playingIndex
  useEffect(() => {
    if (!playlist?.length) return;
    if (playingIndex == null) return;
    setSelectedSong(playlist[playingIndex]);
    repeatOnePlayed.current = false;
  }, [playingIndex, playlist, setSelectedSong]);

  const animateProgress = () => {
    const a = audioRef.current;
    if (a && a.duration) {
      const pct = (a.currentTime / a.duration) * 100;
      setProgress(pct); // number, not string
    }
    animationRef.current = requestAnimationFrame(animateProgress);
  };

  // ✅ load & start playback when selectedSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!selectedSong || !audio) return;

    audio.src = `${API_URL}${selectedSong.filePath}`;
    audio.load();
    audio.loop = repeatMode === "repeat"; // native loop only for Repeat mode

    audio.play().catch(() => { });
    setIsPlaying(true);
  }, [selectedSong, repeatMode, API_URL, setIsPlaying]);

  // ✅ play/pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const animate = () => {
      if (audio && audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setProgress(pct); // continuously updates fill (smooth)
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      audio.play().catch(() => { });
      animationRef.current = requestAnimationFrame(animate);
    } else {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);


  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  // when a new song loads, reset progress so fill starts at 0 smoothly
  useEffect(() => {
    if (!selectedSong || !audioRef.current) return;
    setProgress(0);
    // ...your load/play code...
  }, [selectedSong]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const val = Number(e.target.value);
    audio.currentTime = (val / 100) * audio.duration;
    setProgress(val);
  };

  const formatTime = (t) => {
    if (!t || Number.isNaN(t)) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const playNext = useCallback(() => {
    if (!playlist?.length) return;
    let next = playingIndex + 1;
    if (next >= playlist.length) next = 0;
    setPlayingIndex(next);
  }, [playingIndex, playlist, setPlayingIndex]);

  const playPrev = () => {
    if (!playlist?.length) return;
    let prev = playingIndex - 1;
    if (prev < 0) prev = playlist.length - 1;
    setPlayingIndex(prev);
  };

  // ✅ END OF SONG LOGIC (THIS IS THE IMPORTANT PART)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playlist?.length || !selectedSong) return;

    const onEnd = () => {
      const index = playlist.findIndex(s => s.name === selectedSong.name);

      // GREEN REPEAT: loop same song forever
      if (repeatMode === "repeat") {
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
        return;
      }

      // RED REPEAT ONE: play one extra time then STOP
      if (repeatMode === "repeatOne") {
        if (!repeatOnePlayed.current) {
          repeatOnePlayed.current = true;
          audio.currentTime = 0;
          audio.play();
          setIsPlaying(true);
          return;
        }
        repeatOnePlayed.current = false;
        setIsPlaying(false);
        return;
      }

      // WHITE DEFAULT: loop playlist forever
      let next = index + 1;
      if (next >= playlist.length) next = 0;
      setPlayingIndex(next);
    };

    audio.addEventListener("ended", onEnd);
    return () => audio.removeEventListener("ended", onEnd);

  }, [repeatMode, playlist, selectedSong, playNext, setIsPlaying, setPlayingIndex]);

  const togglePlay = () => setIsPlaying(x => !x);

  return (
    <div className="flex flex-col gap-2 pt-3 px-5 pb-5 w-[97%] bg-[#1f1f1f] rounded-[1.3rem] m-auto mb-2 shadow">
      <div className="flex items-center justify-between text-white">

        <div className="w-1/3 text-center">
          {selectedSong?.name || "No song playing"}
        </div>

        <div className="flex items-center gap-4">
          <SkipBack size={20} onClick={playPrev} className="cursor-pointer hover:text-blue-400" />

          <button onClick={togglePlay} className="p-3 bg-white/10 rounded-full hover:bg-white/20">
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <SkipForward size={20} onClick={playNext} className="cursor-pointer hover:text-blue-400" />

          {/* MODE TOGGLE */}
          {repeatMode === "repeatOne" ? (
            <Repeat1 size={20} className="cursor-pointer text-blue-400" onClick={() => setRepeatMode("default")} />
          ) : repeatMode === "repeat" ? (
            <Repeat size={20} className="cursor-pointer text-green-400" onClick={() => setRepeatMode("repeatOne")} />
          ) : (
            <Repeat size={20} className="cursor-pointer text-white" onClick={() => setRepeatMode("repeat")} />
          )}
        </div>

        <div className="w-1/3 text-center text-sm text-gray-300">
          {formatTime(audioRef.current?.currentTime)} / {formatTime(duration)}
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
