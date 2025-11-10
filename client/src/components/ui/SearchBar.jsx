import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { useSongContext } from '../../context/SongContext';
import { useState } from 'react';

const SearchBar = () => {
    const { allAlbums, setSelectedAlbum, setSelectedSong, setPlayingIndex, setIsPlaying } = useSongContext();
    const [query, setQuery] = useState("");

    // Search across *all albums*
    const results = query.trim()
        ? allAlbums.flatMap(album =>
            album.songs
                .filter(song => song.name.toLowerCase().includes(query.toLowerCase()))
                .map(song => ({ ...song, album }))
        )
        : [];

    const handleSelect = (song) => {
        // Set album context
        setSelectedAlbum(song.album);

        // Find song index inside that specific album
        const index = song.album.songs.findIndex(s => s.name === song.name);

        setSelectedSong(song);
        setPlayingIndex(index);
        setIsPlaying(true);
        setQuery(""); // close dropdown
    };
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center bg-[#1e1e1e] shadow-[0_0_5px_#3c3b3f,0_0_5px_#605c3c] rounded-full px-2.5 py-1.5 gap-2 w-[95%] relative transition-all duration-300 focus-within:bg-[#2b2b2b] focus-within:shadow-[0_0_8px_#00e0ff]">

                <button className="bg-gradient-to-br from-cyan-400 to-blue-600 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 shadow-md hover:scale-110 hover:rotate-6 hover:shadow-[0_6px_16px_rgba(0,225,255,0.1)]">
                    <IoMdSearch className="invert size-4.5" />
                </button>

                <input
                    type="text"
                    placeholder="Search songs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-4/5 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
                />
            </div>

            {results.length > 0 && (
                <ul className="w-[95%] bg-[#2a2a2a] rounded-lg mt-2 py-1 max-h-[200px] overflow-y-auto shadow-lg z-10">
                    {results.map((song, i) => (
                        <li
                            key={i}
                            onClick={() => handleSelect(song)}
                            className="px-3 py-2 text-sm text-white hover:bg-[#3d3d3d] cursor-pointer flex justify-between"
                        >
                            <span>{song.name}</span>
                            <span className="text-xs text-gray-400">{song.album.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default SearchBar