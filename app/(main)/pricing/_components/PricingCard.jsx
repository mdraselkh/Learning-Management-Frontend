import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcInspection } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

const PricingCard = ({ icon, title, subtitle, plans, features, isPremium }) => {
  return (
    <div
      className={`rounded-lg shadow-sm p-5 sm:px-7 sm:py-6 flex flex-col items-center justify-evenly ${
        isPremium ? "bg-teal-950" : "bg-white"
      } w-[330px] h-[650px] lg:w-[380px] lg:h-[700px]`}
    >
      <div className="flex flex-col items-center justify-between gap-5">
        {/* Icon */}
        <Image src={icon} width={80} height={80} alt={`${title} icon`} />

        {/* Title */}
        <h2
          className={`text-2xl font-bold ${
            isPremium ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-400">{subtitle}</p>

        {/* Plans */}
        <div className="flex flex-col items-center gap-3">
          {plans.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-400 text-lg line-through">
                {item.discountPrice}
              </span>
              <h2
                className={`text-4xl font-semibold ${
                  isPremium ? "text-white" : "text-black"
                }`}
              >
                {item.price}
                <span className="text-sm text-gray-400 capitalize">
                  /{item.type}
                </span>
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-300 w-full"></div>

      {/* Features */}
      <div className=" flex flex-col items-start gap-2 w-full px-4">
        {features.map((item, index) => (
          <span key={index} className="flex items-center gap-3">
            <FcOk className="text-xl" />
            <h2 className="text-base text-gray-400">{item}</h2>
          </span>
        ))}
      </div>
      <Link
        href="#"
        className={`md:px-8 xl:px-12 rounded xl:py-4 px-4 py-3 ${
          isPremium ? "bg-yellow-500 text-black" : "bg-teal-950 text-white"
        }  text-xs sm:text-base border border-black  hover:scale-95 transition-all  duration-300 font-semibold cursor-pointer`}
      >
        Subscribe This Paln
      </Link>
    </div>
  );
};

export default PricingCard;
