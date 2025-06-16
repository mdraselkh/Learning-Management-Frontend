import React from "react";
import { CiLock } from "react-icons/ci";

const Curriculum = () => {
  return (
    <div className="pt-8 flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-4xl text-black font-semibold mb-4 font-serif">
          Course details
        </h2>
        <p className="text-base text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          architecto cupiditate perferendis laborum harum voluptas voluptatem
          quaerat eius? Fugit illum sed ad consectetur. Alias, tenetur.
          Consequuntur in officiis sequi quidem ratione corporis neque, adipisci
          eaque beatae maiores exercitationem. Accusantium adipisci ut incidunt
          minima, facilis mollitia vel libero consequuntur consectetur itaque
          dolor repudiandae vitae rerum tempore? Fugiat corporis earum
          voluptatem dolorem!
        </p>
      </div>
      <div className="w-full">
        <h3 className="text-2xl font-semibold text-black font-serif py-2 border-b border-black">
          Lessons
        </h3>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 1: Introduction to MongoDB and NoSQL database fundamentals
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 2: Setting up MongoDB installation and configuration
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 3: Understanding MongoDB data model
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 4: Using MongoDB with Node.js
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 5: Real-time data processing
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 6: MongoDB schema design
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <p className="text-base text-gray-800">
            Lesson 7: Integrating MongoDB with other technologies
          </p>
          <h3 className="flex items-center">
            <span className="px-4 py-1 text-gray-400 bg-teal-50 rounded ">
              Video
            </span>
            <CiLock className="text-lg ml-2" />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
