"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineLightMode,
} from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ toggleMenuShow, menuShow, user, handleLogout }) => {
  //   const [menuShow, setMenuShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileHover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 bg-white flex items-center justify-between px-4 py-2 z-50">
      {menuShow ? (
        <div className="py-2 h-full">
          <button className="px-4 py-3 border" onClick={toggleMenuShow}>
            <MdKeyboardDoubleArrowLeft className="text-xl" />
          </button>
        </div>
      ) : (
        <div className="py-2 h-full">
          <button className="px-4 py-3 border" onClick={toggleMenuShow}>
            <MdKeyboardDoubleArrowRight className="text-xl" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-6">
        <div className="px-2 py-2 border sm:flex items-center gap-3 w-64 hidden">
          <CiSearch className="text-md" />
          <input
            type="search"
            placeholder="Search..."
            className=" bg-transparent outline-none border-none text-sm p-1"
          />
        </div>
        {darkMode ? (
          <MdOutlineDarkMode
            className="text-xl hidden md:flex"
            onClick={() => setDarkMode(true)}
          />
        ) : (
          <MdOutlineLightMode
            className="text-xl hidden md:flex"
            onClick={() => setDarkMode(false)}
          />
        )}
        <button className="relative">
          <IoNotificationsOutline className="text-2xl" />

          <span className="absolute top-0 -right-1 px-1 py-0 rounded-full bg-yellow-400 text-gray-800 text-xs">
            0
          </span>
        </button>
        <IoSettingsSharp className="text-xl hidden md:flex" />
        <div
          className="h-full border-l p-3 relative cursor-pointer"
          onClick={() => setProfileHover((prev) => !prev)}
        >
          <Image src="/images/concept.png" alt="" width={40} height={40} />
        </div>
        {profileHover && (
          <div className="absolute z-10 top-20 xl:top-20 right-0 xl:right-2 w-56 mb-2 h-auto bg-white flex flex-col items-start justify-center rounded-md shadow-lg">
            <span className="flex flex-col gap-1 px-6 py-4 bg-gray-100 w-full">
              {user ? (
                <p className="text-sm">{user.name}</p>
              ) : (
                <p className="text-sm">Guest</p>
              )}
              {user ? (
                <p className="text-xs">{user.email}</p>
              ) : (
                <p className="text-xs">Guest@gmail.com</p>
              )}
            </span>
            <div className="w-full px-6 py-4 border-t flex flex-col gap-2">
              <Link
                href="/profile"
                className="w-full hover:text-yellow-500 hover:font-extralight hover:ml-2 transition-all duration-300 ease-in-out"
              >
                Profile
              </Link>
              <Link
                href="/user-setting"
                className="w-full hover:text-yellow-500 hover:font-extralight hover:ml-2 transition-all duration-300 ease-in-out"
              >
                Settings
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="w-full block px-6 py-4 hover:text-yellow-500 hover:font-extralight hover:ml-2 transition-all duration-300 ease-in-out border-t text-left"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
