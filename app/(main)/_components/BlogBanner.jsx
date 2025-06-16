import Image from "next/image";
import React from "react";

const BlogBanner = () => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src="/images/blogbanner.png"
        alt="Hero Background"
        className="z-0 w-full h-auto md:h-[600px] object-cover"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-5"></div>

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto absolute max-w-7xl flex flex-col items-start justify-center gap-5 px-8 xl:px-0">
          <h3 className="text-white font-semibold text-xs md:text-base uppercase">
            News And Journals
          </h3>
          <h1 className=" text-3xl md:text-5xl lg:text-6xl text-white font-bold max-w-3xl">
            Planing to transition to a new career?
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
