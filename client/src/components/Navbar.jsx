import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-[7vh] bg-[#1c1b1b] rounded-t px-5 py-2 flex items-center justify-between">
      <h1 className="text-2xl  tracking-[0.09rem] text-white font-[lobster]">Geeth Playlist</h1>
      <div className="flex items-center gap-1.5">
        <button
          className="w-18 h-[2.2rem] rounded-3xl bg-transparent font-roboto text-[0.8rem]  border-none  outline-none text-white/70 font-semibold transition-all duration-800 ease-out  hover:text-white hover:text-[0.82rem] hover:font-bold hover:border-2  cursor-pointer">
          Sign Up
        </button>

        <button
          className="w-[3.9rem] h-[2.2rem] rounded-full bg-[#2e2e2e] font-roboto text-[0.73rem] border-none outline-none text-white font-bold transition-all duration-700 ease-out hover:bg-white hover:text-black hover:text-[0.8rem] cursor-pointer">
          Login
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
