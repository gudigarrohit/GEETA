import React, { useState } from "react";
import { GiMusicalNotes } from "react-icons/gi";
import { FaRegCirclePlay } from "react-icons/fa6"
import { FaRegPauseCircle } from "react-icons/fa";
import { useSongContext } from "../../context/SongContext";

const Library = () => {
  const { selectedAlbum, songs, setSelectedSong, playingIndex, setPlayingIndex, setIsPlaying ,isPlaying} = useSongContext();

  const handlePlayClick = (song, index) => {
    if (playingIndex === index) {
      // Pause
      setIsPlaying((prev) => !prev);
      setPlayingIndex(null);
      setSelectedSong(null);
    } else {
      // Play Song
      setPlayingIndex(index);
      setSelectedSong({ ...song, album: selectedAlbum });
      setIsPlaying(true);
    }
  };



  return (
    <div className="bg-[#121212] w-full h-full overflow-y-scroll p-2.5 ">
      <ul className="space-y-1 ">
        {songs && songs.length > 0 ? (
          songs.map((song, index) => (
            <li
              key={index}
              className={`flex items-center justify-between bg-transparent border-2 border-[#2a2929] px-3.5 py-2 rounded-lg hover:bg-[#3a3939] cursor-pointer transition-all duration-200 ${playingIndex === index ? "bg-[#2d2b2b]" : ""
                }`} onClick={() => handlePlayClick(song, index)}
            >
              <div className="flex items-center gap-2">
                <GiMusicalNotes className="invert size-4.5" />
                <div className="flex flex-col text-white font-semibold text-[.85rem]">
                  <span>{song.name}</span>
                  <span className="text-gray-400 text-[.7rem]">Geeth-Music</span>
                </div>
              </div>

              <div
                className="flex items-center gap-2"

              >
                <h3 className="text-[.8rem] font-semibold text-white">
                  {playingIndex === index && isPlaying ? "Pause" : "Play Now"}
                </h3>
                {playingIndex === index && isPlaying ? (
                  <FaRegPauseCircle className="invert size-5" />
                ) : (
                  <FaRegCirclePlay className="invert size-5" />
                )}

              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-200 text-sm font-bold px-3.5 flex items-center gap-1.5">
            <GiMusicalNotes className="size-4.5" /> No Album is selected...
          </p>
        )}
      </ul>
    </div >
  );
};

export default Library;
