import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import { PiPencilRuler } from "react-icons/pi";
import { MdCastForEducation, MdUpdate } from "react-icons/md";

const NavHero = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/images/herobg.png"
        alt="Hero Background"
        layout="fill" // Makes it span the full width and height
        objectFit="cover" // Ensures the image covers the entire container
        className="z-0"
      />
      <div className="absolute inset-0 bg-teal-950 bg-opacity-70 z-5"></div>

      

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <HeroSection />
      </div>

      {/* Bottom Info Section */}
      <div className="max-w-7xl container py-10 mx-auto bg-white rounded-md absolute -bottom-[490px] gap-10 md:-bottom-20 md:left-0 md:right-0 flex flex-col flex-wrap lg:flex-nowrap md:flex-row items-center justify-center md:justify-between md:px-16 md:py-12 shadow-sm">
        {/* First Item */}
        <div className="flex gap-4 md:gap-6 md:flex-row flex-col items-center justify-center">
          <span className="px-4 py-4 flex items-center border border-gray-600 rounded-full">
            <MdCastForEducation className="text-2xl" />
          </span>
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-semibold text-center md:text-left">150+ online courses</h2>
            <p className="text-gray-600 text-sm text-center md:text-left">Expert-led courses for every passion</p>
          </div>
        </div>

        {/* Second Item */}
        <div className="flex gap-4 md:gap-6 md:flex-row flex-col items-center justify-center">
          <span className="px-4 py-4 flex items-center border border-gray-600 rounded-full">
            <PiPencilRuler className="text-2xl" />
          </span>
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-semibold text-center md:text-left">Personalized learning</h2>
            <p className="text-gray-600 text-sm text-center md:text-left">Your journey, your pace, your way</p>
          </div>
        </div>

        {/* Third Item */}
        <div className="flex gap-4 md:gap-6 md:flex-row flex-col items-center justify-center">
          <span className="px-4 py-4 flex items-center border border-gray-600 rounded-full">
            <MdUpdate className="text-2xl" />
          </span>
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-semibold text-center md:text-left">Lifetime update</h2>
            <p className="text-gray-600 text-sm text-center md:text-left">The gift of knowledge that never expires</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHero;
