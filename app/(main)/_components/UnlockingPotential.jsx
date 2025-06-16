'use client';
import React, { useState } from "react";
import UnlockingPotentialCard from "./UnlockingPotentialCard";

const UnlockingPotential = ({isAbout}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const UnlockingPotentialContent = [
    {
      No: "01",
      title: "Flexibility and convenience",
      description:
        "Unlocking Potential is a program that helps individuals with disabilities to develop their skills and abilities.",
    },
    {
      No: "02",
      title: "Course accessibility",
      description:
        "Unlocking Potential is a program that helps individuals with disabilities to develop their skills and abilities.",
    },
    {
      No: "03",
      title: "Cost-effectiveness",
      description:
        "Unlocking Potential is a program that helps individuals with disabilities to develop their skills and abilities.",
    },
    {
      No: "04",
      title: "Personalized learning",
      description:
        "Unlocking Potential is a program that helps individuals with disabilities to develop their skills and abilities.",
    },
  ];

  return (
    <div className="bg-gray-200">
      <div className="container mx-auto pb-16 pt-16 md:pt-28 max-w-7xl flex flex-col items-center justify-center gap-4 md:gap-5 lg:px-10">
        <h1 className="text-sm md:text-base font-sans uppercase text-gray-700">
          {isAbout ? 'Why we are' : 'Unlocking Potential'}
        </h1>
        <p className="md:text-3xl text-2xl font-semibold font-serif text-center sm:w-3/4 px-4 md:px-0">
          {isAbout? 'We believe in our good education and development system and we know how to work together to reach greater success' : 
          'Discover the boundless advantages and transformative power of eLearning for personal and professional growth in the digital age'}
        </p>
      </div>
      <div className="flex md:flex-row flex-col flex-wrap lg:flex-nowrap items-center justify-between h-auto lg:h-96">
        {UnlockingPotentialContent.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="w-full md:w-1/2 lg:w-1/4"
          >
            <UnlockingPotentialCard
              No={item.No}
              title={item.title}
              description={item.description}
              isDefaultVisible={index === 0 && hoveredIndex === null} // First card initially visible
              isHovered={hoveredIndex === index} // Highlight hovered card
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnlockingPotential;
