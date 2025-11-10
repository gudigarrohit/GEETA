import { createContext, useContext, useState } from "react";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  return (
    <SongContext.Provider value={{
      selectedAlbum,
      setSelectedAlbum,
      songs,
      setSongs,
      selectedSong,
      setSelectedSong,
      isPlaying,
      setIsPlaying,
      playingIndex,
      setPlayingIndex
    }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => useContext(SongContext);
