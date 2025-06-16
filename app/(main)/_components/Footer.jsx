import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-24 ">
      <div className="relative h-auto xl:h-[600px] bg-[url('/images/herobg.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute z-10 -top-28 left-0 right-0 px-4 xl:px-0 ">
          <div className="bg-yellow-500 container mx-auto max-w-7xl rounded p-6 lg:px-20 lg:py-14 flex flex-col lg:flex-row items-center gap-5 lg:gap-0 justify-center lg:justify-between">
            <h1 className="text-black max-w-sm text-3xl lg:text-4xl font-serif font-semibold text-center lg:text-left">
              Are you ready to start your journey{" "}
            </h1>
            <div className="flex items-center justify-between gap-4 lg:gap-8">
              <Link
                href="/course"
                className="md:px-8 xl:px-12 rounded xl:py-4 px-4 text-xs py-3 text-center  bg-gray-800 sm:text-base  text-gray-50 hover:scale-95 transition-all duration-200 cursor-pointer"
              >
                Browse Courses
              </Link>
              <Link
                href="/career"
                className="md:px-8 xl:px-12 rounded xl:py-4 px-4 py-3  bg-transparent text-xs sm:text-base border border-black text-gray-800 hover:scale-95 transition-all  duration-200 cursor-pointer"
              >
                Become A Teacher
              </Link>
            </div>
          </div>{" "}
        </div>
        <div className="z-10 relative pt-36 lg:pt-48 mb-4 gap-4 container mx-auto max-w-7xl transition-colors duration-500 px-4 lg:flex xl:justify-between">
          <div className="flex flex-col items-start justify-start gap-8 lg:max-w-72">
            {/* Logo */}
            <Link
              href="/"
              className="text-white text-xl md:text-2xl cursor-pointer font-medium rounded-full flex items-center justify-center font-sans"
            >
              <span className="text-teal-950 text-2xl md:text-3xl font-semibold rounded-full flex items-center justify-center w-8 h-8 bg-yellow-500 font-pacifico">
                l
              </span>
              earnCraft
            </Link>
            <p className="text-gray-400 text-sm md:text-base">
              Empowering learners and instructors to build skills and craft
              their future.
            </p>
          </div>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 xl:gap-10 mt-8 lg:mt-0">
            <div className="flex flex-col items-start justify-start gap-4">
              <h3 className="text-white text-lg md:text-xl font-bold">
                Company
              </h3>
              <Link href='/about' className="text-gray-400 text-sm md:text-base mt-2 hover:text-yellow-500 cursor-pointer">
                About
              </Link>
              <Link href='/course' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Courses
              </Link>
              <Link href='/blog' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Blog
              </Link>
              <Link href='/contact' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Contact
              </Link>
              <Link href='/about' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                License
              </Link>
              <Link href='/pricing' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col items-start justify-start gap-4">
              <h3 className="text-white text-lg md:text-xl font-bold">
                Popular Courses
              </h3>
              <Link href='/category/finance' className="text-gray-400 text-sm md:text-base mt-2 hover:text-yellow-500 cursor-pointer">
                Finance
              </Link >
              <Link href='/category/management' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Management
              </Link >
              <Link href='/category/design' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Design
              </Link >
              <Link href='/category/development' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Web Development
              </Link >
            </div>

            <div className="flex flex-col items-start justify-start gap-4">
              <h3 className="text-white text-lg md:text-xl font-bold">CMS</h3>
              <Link href='/course' className="text-gray-400 text-sm md:text-base mt-2 hover:text-yellow-500 cursor-pointer">
                Course details
              </Link>
              <Link href='/team' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Instructor details
              </Link>
              <Link href='/blog' className="text-gray-400 text-sm md:text-base hover:text-yellow-500 cursor-pointer">
                Blog Details
              </Link>
            </div>
            <div className="flex flex-col items-start justify-start gap-5">
              <h3 className="text-white text-lg md:text-xl font-bold">
                Need help?
              </h3>
              <h3 className="text-white text-lg md:text-xl font-bold flex flex-col items-start hover:text-yellow-500 cursor-pointer">
                <span className="text-gray-400 text-sm md:text-base hover:text-gray-400 cursor-default">
                  Call us
                </span>
                (888) 123 4567
              </h3>
              <h3 className="text-white text-lg md:text-xl font-bold flex flex-col items-start hover:text-yellow-500 cursor-pointer">
                <span className="text-gray-400 text-sm md:text-base hover:text-gray-400 cursor-default">
                  Need support?
                </span>
                info@example.com
              </h3>
            </div>
          </div>
        </div>

        <div className="border-t-2 bg-gray-400 mx-2 xl:container xl:mx-auto mt-8 lg:mt-16"></div>
        <div className="relative z-10 flex items-center justify-between text-gray-50 px-4 xl:px-0 py-4 lg:container lg:mx-auto max-w-7xl text-xs sm:text-sm lg:text-base">
          <h2 className="uppercase text-gray-400">
            Design By
            <span className=" ml-2 text-white font-semibold  hover:text-yellow-500 cursor-pointer">
              Md Rasel
            </span>{" "}
          </h2>
          <h2 className="text-gray-400">All Rights Reserved @2024</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
