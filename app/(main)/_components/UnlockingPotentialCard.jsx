import TealButton from "@/app/_components/TealButton";
import React from "react";

const UnlockingPotentialCard = ({ No, title, description, isDefaultVisible, isHovered }) => {
  return (
    <div className={`flex flex-col items-start justify-center bg-white shadow-sm border-l border-gray-50 gap-5 relative group transition-all duration-700  hover:shadow-lg hover:rounded-t p-8 xl:p-12 ${isHovered || isDefaultVisible ? 'h-80 md:h-96 bottom-0':'h-64 sm:h-80 md:h-72 -bottom-12'}`}>
      <h1 className="text-2xl sm:text-4xl text-blue-600 font-bold font-serif">{No}</h1>
      <h2 className="text-xl sm:text-2xl font-semibold font-serif">{title}</h2>
      <p className="text-sm text-gray-500 font-light font-sans">{description}</p>
      {/* Hidden button initially */}
      <div className={`${ isHovered || isDefaultVisible ? 'group-hover:opacity-100 group-hover:block': 'opacity-0 hidden '}  transition-all duration-500 hover:scale-95`}>
        <TealButton path="#" />
      </div>
    </div>
  );
};

export default UnlockingPotentialCard;
