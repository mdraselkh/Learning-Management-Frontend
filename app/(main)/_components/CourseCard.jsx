import { useCourseAccess } from "@/app/hooks/useCourseAccess";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbCurrency, TbCurrencyTaka } from "react-icons/tb";
import { useSelector } from "react-redux";

const CourseCard = ({
  id,
  img,
  courseFee,
  categoryName,
  title,
  rating,
  reviewNo,
  isCategoryPage,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { accessData: hasFullAccess, loading } = useCourseAccess(
    user?.userId,
    id
  );

  return (
    <div className="w-auto xl:w-[400px] xl:h-[500px] relative group overflow-hidden">
      {/* Background Image */}
      <Image
        src={img}
        alt="Course Image"
        className="w-full h-full rounded-md"
        width={500}
        height={500}
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-80 rounded-md"></div>

      {/* Top-Left Border */}
      <div className="absolute top-0 left-0 h-0 w-[20px] group-hover:h-[150px] group-hover:border-l border-white transition-all duration-700 ml-4 mt-4"></div>
      <div className="absolute top-0 left-0 w-0 group-hover:w-[150px] h-[20px] group-hover:border-t border-white transition-all duration-700 ml-4 mt-4"></div>

      {/* Bottom-Right Border */}
      <div className="absolute bottom-0 right-0 w-0 mr-4 mb-4 h-[20px] group-hover:w-[150px] group-hover:border-b border-white transition-all duration-700"></div>
      <div className="absolute bottom-0 right-0 w-[20px] mr-4 mb-4 h-0 group-hover:h-[150px] group-hover:border-r border-white transition-all duration-700"></div>

      <div className="h-full p-3 absolute bottom-0 ">
        <div className="p-3 h-full flex justify-between flex-col  ">
          {/* Floating Course Fee Badge */}
          <div className="flex items-end w-full justify-end my-5 px-5">
            <div
              className={`w-16 h-16 flex items-center justify-center text-center rounded-full ${
                courseFee !== "Free" && hasFullAccess
                  ? "bg-green-600"
                  : "bg-blue-600"
              }  group-hover:scale-125 transition-all duration-700`}
            >
              <span className="text-white font-medium flex items-center">
                {courseFee !== "Free" && !hasFullAccess && (
                  <TbCurrencyTaka className="text-lg" />
                )}
                {courseFee !== "Free" && hasFullAccess ? (
                  <span className="">Paid</span>
                ) : (
                  courseFee
                )}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col group-hover:mt-4 items-center justify-between px-1 md:px-3 h-48 bottom-0  group-hover:h-72 transition-all duration-700 rounded-md ">
            {/* Course Details */}
            <div className="flex flex-col items-start transition-all duration-300">
              <h2 className="uppercase text-gray-300 text-sm font-medium mb-4">
                {categoryName}
              </h2>
              <h1 className="text-2xl md:text-3xl font-serif  font-bold line-clamp-2 md:line-clamp-3 text-gray-50 mb-4">
                {title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                {/* Render Stars */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`${
                        index < Math.floor(rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      } text-xl`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {/* Rating Number */}
                <p className="text-sm font-medium text-gray-400">{rating}</p>
                {/* Number of Reviews */}
                <p className="text-sm text-gray-400">({reviewNo})</p>
              </div>
              {/* Buttons */}
              {isCategoryPage ? (
                <Link
                  href={`/category/${categoryName?.toLowerCase()}/${title
                    ?.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")}`}
                  className="bg-yellow-500 rounded-md text-gray-800 w-full text-center py-4 hover:scale-95 opacity-0 hidden group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out mt-4"
                >
                  {courseFee === "Free" ? "Course Details " : "Buy Course"}
                </Link>
              ) : courseFee === "Free" ? (
                <Link
                  href={`/category/${categoryName?.toLowerCase()}/${title
                    ?.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")}`}
                  className="bg-yellow-500 rounded-md text-gray-800 w-full text-center py-4 hover:scale-95 opacity-0 hidden group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out mt-4"
                >
                  Course Details
                </Link>
              ) : courseFee !== "Free" && hasFullAccess ? (
                <Link
                  href={`/category/${categoryName?.toLowerCase()}/${title
                    ?.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")}`}
                  className="bg-yellow-500 rounded-md text-gray-800 w-full text-center py-4 hover:scale-95 opacity-0 hidden group-hover:opacity-100 group-hover:block transition-all duration-300 ease-in-out mt-4"
                >
                  Course Details
                </Link>
              ) : (
                <div className=" items-center w-full justify-between opacity-0 hidden group-hover:opacity-100 group-hover:flex mt-4 ">
                  <Link
                    href={`/category/${categoryName?.toLowerCase()}/${title
                      ?.toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`}
                    className="rounded-md bg-yellow-500 px-5 sm:px-4 lg:px-6 py-4 text-gray-800 hover:scale-95 transition-all duration-300 ease-in-out"
                  >
                    Course Details
                  </Link>
                  <Link
                    href={`/category/${categoryName?.toLowerCase()}/${title
                      ?.toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`}
                    className="rounded-md bg-teal-950 text-white px-7 sm:px-4 lg:px-7 py-4 hover:scale-95 border border-gray-600 transition-all duration-300 ease-in-out"
                  >
                    Buy Course
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
