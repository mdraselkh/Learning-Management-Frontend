import Link from 'next/link'
import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import Menu from './Menu'

const SideBar = ({toggleMenuShow ,menuShow,handleLogout}) => {
  return (
    <div className='flex items-center justify-between flex-col w-full h-full p-4'>
        {/* Logo */}
        <div className=" h-[8%] w-full">
          <Link
            href="/"
            className={`w-full text-black text-left ${menuShow ? 'text-xl' : 'text-xl md:text-xl'}  cursor-pointer font-medium flex items-center font-sans`}
          >
            <span className="text-teal-950 text-2xl md:text-3xl font-semibold flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full font-pacifico">
              l
            </span>
            <span className="ml-2">earnCraft</span>
          </Link>
        </div>

        <div className="h-full w-full">
          <Menu/>
        </div>
        <div className=" h-[8%] w-full">
          <button
            onClick={handleLogout}
            className="w-full flex p-4 bg-gray-200 items-center justify-between text-black"
          >
            <h2 className="font-semibold">Logout</h2>
            <LuLogOut />
          </button>
        </div>
    </div>
  )
}

export default SideBar