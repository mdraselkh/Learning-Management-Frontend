'use client';
import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialData = [
    {
      id: 1,
      name: "John Doe",
      review: "This platform completely transformed my career trajectory!",
      designation: "Software Engineer",
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "A life-changing experience filled with learning and growth.",
      designation: "UI/UX Designer",
    },
    {
      id: 3,
      name: "Alex Johnson",
      review: "The courses are exceptional, and the results are evident.",
      designation: "Data Scientist",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative h-[600px]  bg-[url('/images/herobg.png')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-950 bg-opacity-70"></div>
      {/* Content */}
      <div
        className="z-10 relative
       container py-10 lg:py-20 mx-auto max-w-7xl flex flex-col items-center justify-between"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between md:px-4 xl:px-0">
        <div className="flex flex-col items-center lg:items-start px-4 lg:px-0 gap-4">
            <h2 className="uppercase w-full text-sm lg:text-base text-white text-center lg:text-left font-semibold font-sans">
              What We Offer
            </h2>
            <h1 className=" text-white text-3xl md:text-4xl xl:text-5xl font-bold xl:w-3/4">
              Trusted by our successful students
            </h1>
          </div>
          <div className="flex items-start lg:items-end mt-10 lg:mt-20 justify-between h-full">
            <div className="flex items-center justify-center px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white md:border-r-2 md:px-2">70M</h2>
              {/* <span className="px-2 text-white h-12">|</span> */}
              <h2 className="text-xs lg:text-base text-gray-400 uppercase px-2">
                Successful Students
              </h2>
            </div>
            <div className="flex items-center justify-center lg:px-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white md:border-r-2 md:px-2">25K</h2>
              {/* <span className="px-2 text-white">|</span> */}
              <h2 className="text-sm lg:text-base text-gray-400 uppercase px-2">
                Global Job Placements
              </h2>
            </div>
          </div>
          
        </div>
        <div className=" max-w-2xl px-8 md:px-4 sm:max-w-3xl md:mt-8 transition-all duration-500">
        <TestimonialCard
            name={testimonialData[currentIndex].name}
            review={testimonialData[currentIndex].review}
            designation={testimonialData[currentIndex].designation}
          />
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="rounded-full hover:text-white text-gray-400"
            >
              <SlArrowLeftCircle className="text-4xl" />
            </button>
            <button
              onClick={handleNext}
              className="rounded-full hover:text-white text-gray-400"
            >
              <SlArrowRightCircle className="text-4xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
