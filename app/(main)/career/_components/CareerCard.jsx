import React from "react";

const CareerCard = ({
  position,
  vacancy,
  location,
  salary,
  jobDesc,
  jobType,
  experience,
}) => {
  return (
    <div className="flex flex-col items-start justify-center px-5 py-4 md:px-12 md:py-6 bg-white rounded-sm shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-300 transition-transform duration-300">
      <h2 className="text-2xl font-semibold text-left mb-4">{position}</h2>
      <p className="text-sm text-left mb-2 uppercase text-gray-400 ">{vacancy}</p>
      <p className="text-sm text-left uppercase text-gray-400">{location}</p>
      <div className="flex flex-col md:flex-row items-start justify-center py-6 gap-6">
        <span className="px-8 py-3 bg-yellow-500 text-lg rounded text-black font-medium">
          {salary}
        </span>
        <button className="px-8 py-3 bg-teal-950 rounded cursor-pointer text-lg text-white font-semibold">
          Apply Now
        </button>
      </div>
      <ul className="flex flex-col items-start justify-center gap-2 list-disc text-base text-gray-400 max-w-lg">
        <li>
          <span>Job Description :</span> {jobDesc}
        </li>
        <li>
          <span>Job Type :</span> {jobType}
        </li>
        <li>
          <span>Experience :</span> {experience}
        </li>
      </ul>
    </div>
  );
};

export default CareerCard;
