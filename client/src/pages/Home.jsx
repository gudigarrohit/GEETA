import { useState, useEffect } from "react";
import { useSongContext } from "../context/SongContext";

function Home() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { setSelectedAlbum, setSongs } = useSongContext();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${API_URL}/api/albums`);
        if (!res.ok) throw new Error("Failed to fetch albums");
        const json = await res.json();
        setAlbums(json.albums || []);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    fetchAlbums();
  }, [API_URL]);

  const getSongs = async (albumFolder) => {
    try {
      setSelectedAlbum(albumFolder);
      const res = await fetch(`${API_URL}/api/songs/${albumFolder}`);
      if (!res.ok) throw new Error("Failed to fetch songs");
      const data = await res.json();

      const songsList = (data.songs || data).map((song) => {
        const name = song.name || song.file?.replace(".mp3", "") || "Unknown";
        const file = song.file || `${name}.mp3`;
        return {
          ...song,
          name,
          file,
          album: albumFolder, // ✅ needed
          filePath: `/songs/${albumFolder}/${file}`, // ✅ needed
        };
      });

      setSongs(songsList);
    } catch (err) {
      console.error("Error fetching songs:", err);
      setError("Could not load songs");
    }
  };


  return (
    <div className="flex-wrap flex-col  p-4 space-y-6">
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-wrap gap-4">
          {albums.length > 0 ? (
            albums.map((album) => (
              <div
                key={album.folder}
                onClick={() => getSongs(album.folder)}
                className="bg-[#1c1c1c] rounded-lg p-3 flex flex-col gap-0.5 hover:bg-[#2a2a2a] cursor-pointer transition w-38"
              >
                <img
                  src={`${API_URL}/${album.cover}`}
                  alt={album.title}
                  className="rounded-lg mb-2 object-cover w-full h-32"
                />
                <h5 className="text-white font-bold">{album.title}</h5>
                <p className="text-gray-300 font-semibold text-[.8rem] mb-1">{album.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No albums found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
