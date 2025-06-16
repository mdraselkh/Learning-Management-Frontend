import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center md:justify-between max-w-7xl gap-8 md:gap-10 flex-col-reverse md:flex-row p-6">
      <div className="md:w-1/2 relative">
        {/* Decorative circles */}
        <div className="bg-transparent rounded-full p-3 border-8 border-blue-500 absolute top-5 left-5"></div>
        <div className="bg-transparent rounded-full p-3 border-[20px] lg:border-[40px] border-yellow-500 lg:w-52 lg:h-52 absolute top-2/3 lg:top-1/2 left-5"></div>
        <div className="bg-yellow-500 rounded-full p-1 absolute top-40 left-10"></div>
        <div className="bg-yellow-500 rounded-full p-2 absolute top-1/2 right-20"></div>

        {/* Main image */}
        <Image
          src="/images/heroBanner.png"
          alt="Hero Image"
          width={500}
          height={500}
          className="w-full md:w-[500px] object-cover"
        />

        {/* Trusted Image */}
        <div className="absolute bottom-2 -right-3 lg:right-16">
          <Image
            src="/images/trusted.png"
            alt="Trusted Image"
            width={200}
            height={80}
            className="w-32 md:w-[200px]"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 md:mt-0 flex flex-col items-center md:items-start gap-4 text-white md:w-1/2">
        <h2 className="mb-2  text-lg md:text-2xl">Online Learning</h2>
        <h1 className="mb-2 text-3xl md:text-4xl lg:text-5xl font-semibold text-center md:text-left">
          More than <span className="text-yellow-500">25000+</span> education courses online
        </h1>
        <p className="mb-4 text-sm md:text-lg text-center md:text-left">
          Discover the future of education with expertly designed courses that empower you to learn, grow, and thrive — anytime, anywhere.
        </p>
        <Link
          href="/login"
          className="md:px-12 rounded md:py-4 px-4 py-3  bg-teal-950 text-base border border-gray-500 text-gray-50 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer"
        >
          Get Started
        </Link>
        
      </div>
    </div>
  );
};

export default HeroSection;
