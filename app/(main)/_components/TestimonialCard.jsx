import React from "react";


const TestimonialCard = ({ name, review, designation }) => {
  return (
    <div className="w-full flex flex-col items-center justify-between text-white">
      <span className="text-7xl text-white rotate-180 mb-8">‘ ‘</span>
      <p className="mb-5 text-lg text-gray-400">{review}</p>
      <span className="font-semibold text-lg mb-3">{name}</span>
      <span className="text-base text-gray-400">{designation}</span>
    </div>
  );
};

export default TestimonialCard;
