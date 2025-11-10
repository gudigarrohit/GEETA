import React from 'react'
import { Link } from "react-router-dom";
import { LuPanelLeftClose } from "react-icons/lu";
import { HiHome } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";

const Controlbox = () => {
  return (
    <>
      <div className="w-full  bg-[#121212] rounded-t flex flex-col gap-1 relative py-2 px-3.5">
        <LuPanelLeftClose className="absolute right-2 top-2 size-5.5  invert cursor-pointer"
        />


        <div className="flex items-center  ">
          <Link
            href="#"
            className="flex items-center text-white text-xl font-[Lobster] tracking-[0.07rem] no-underline hover:text-white gap-1"
          >
            <img
              src="/img/geeth_logo.png"
              className="invert "
              width="35"
              alt="Geeth Logo"
            />
            Geeth
          </Link>
        </div>


        <div>
          <ul className="  py-1 flex flex-col gap-2.5">
            <li className=" px-3 flex items-center gap-1.5 text-sm font-medium text-white ">
              <HiHome className='size-4.5' />

              Home
            </li>


            <li>
              <div className="flex items-center bg-[#1e1e1e] shadow-[0_0_5px_#3c3b3f,0_0_5px_#605c3c]  rounded-full px-2.5 py-1.5 gap-2 w-[95%] relative  transition-all duration-300 focus-within:bg-[#2b2b2b] focus-within:shadow-[0_0_8px_#00e0ff]">
                <button className="bg-gradient-to-br from-cyan-400 to-blue-600 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 shadow-md hover:scale-110 hover:rotate-6 hover:shadow-[0_6px_16px_rgba(0,225,255,0.1)]">
              <IoMdSearch className='invert size-4.5' />

                </button>

                <input
                  type="text"
                  placeholder="Search songs..."
                  className="w-4/5 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
                />

                <ul className="absolute top-full left-0 right-0 bg-[#2a2a2a] rounded-lg mt-1 py-1 max-h-[200px] overflow-y-auto hidden shadow-lg z-10">

                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </>
  )
}

export default Controlbox