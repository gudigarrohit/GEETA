import { createContext, useContext, useState, useEffect } from "react";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);

  // ✅ Sync selectedSong when playingIndex changes
  useEffect(() => {
    if (playingIndex !== null && playlist?.length > 0) {
      setSelectedSong(playlist[playingIndex]);
      setIsPlaying(true);
      repeatOnePlayed.current = false;
    }
  }, [playingIndex, playlist]);


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
      setPlayingIndex,
      playlist,
      setPlaylist,
      allAlbums,
      setAllAlbums
    }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => useContext(SongContext);
