import Image from "next/image";
import React from "react";

const TeamCard = ({ name, image }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[270px] h-[500px] ">
      <div className="bg-gray-200 px-4 relative group overflow-hidden ">
       <Image src={image} alt="" width={270} height={350} className="pt-4 w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110" />
       </div>
      <span className="flex flex-col items-center gap-2">
        <h2 className="text-black text-lg font-bold">{name}</h2>
        <p className="text-gray-400 uppercase text-sm">Instructor</p>
      </span>
    </div>
  );
};

export default TeamCard;
