import Image from "next/image";
import React from "react";
import img1 from "/public/images/man.png";
import img2 from "/public/images/women.png";
import img3 from "/public/images/freecourses.png";
import Link from "next/link";

const OfferSection = () => {
  return (
    <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0 xl:gap-16 py-10 lg:py-16 h-auto">
      <div className="relative w-full sm:w-2/3 md:w-3/4 lg:w-1/2 h-[400px] md:h-[600px] flex items-center justify-center">
        <Image
          src={img2}
          alt=""
          width={250}
          height={350}
          className="w-auto md:w-80 h-auto absolute rounded-md right-5 md:right-10"
        />
        <Image
          src={img1}
          alt=""
          width={250}
          height={350}
          className="w-auto md:w-80 h-auto absolute rounded-md -bottom-14 md:bottom-10 left-2"
        />
        <Image
          src={img3}
          alt=""
          width={250}
          height={350}
          className="w-48 md:w-56 h-auto absolute rounded-md top-5 md:top-10 left-16 md:left-24"
        />
      </div>

      <div className="flex flex-col items-start justify-between px-4 lg:px-10 lg:w-1/2 gap-6 mt-10 md:mt-0">
        <h2 className="uppercase text-sm lg:text-base text-black text-left font-medium font-sans">
          What We Offer
        </h2>
        <h1 className="text-black font-semibold text-4xl text-left font-serif">
          Personalized learning for your ambitions
        </h1>
        <p className="text-gray-400 text-sm">
          Unlock your potential with tailored courses designed to fit your goals
          and pace. Learn skills that matter and get certified globally.
        </p>
        <ul className="flex justify-between items-center gap-5 flex-wrap list-disc font-serif px-5">
          <li className="text-black text-base font-semibold">
            Skill-based instruction
          </li>
          <li className="text-black text-base font-semibold">
            Analytics and insights
          </li>
          <li className="text-black text-base font-semibold">
            Global certification
          </li>
          <li className="text-black text-base font-semibold">
            Customizable courses
          </li>
        </ul>
        <div className="mt-4 bg-teal-50 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full lg:w-auto">
          <div className="flex flex-col items-start justify-between gap-3 sm:w-1/2">
            <h3 className="font-semibold text-black text-base">
              Still have questions?
            </h3>
            <p className="text-gray-400 text-sm">
              We’re here to help! Reach out anytime for support or advice.
            </p>
          </div>

          <Link
            href="#"
            className="lg:px-6 xl:px-12 xl:py-4 rounded px-4 py-3  bg-teal-950 text-base border border-gray-500 text-gray-50 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
