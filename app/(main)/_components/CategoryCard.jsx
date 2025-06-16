import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({
  icon,
  title,
  description,
  isCoursePage,
  categoryName,
}) => {
  return (
    <Link
      href={`/category/${categoryName?.toLowerCase()}`}
      className={`text-black flex flex-col items-center justify-center w-40 h-48 md:w-48 md:h-52 p-5 md:p-6 border rounded shadow-sm hover:shadow-teal transition-all ease-in-out duration-700 hover:bg-white cursor-pointer ${
        isCoursePage ? "bg-teal-50" : "bg-gray-100"
      }`}
    >
      <span className="p-3 rounded-full bg-[#dbedf2] w-16 h-16 flex items-center justify-center mb-4">
        <Image src={icon} alt="" width={48} height={48} className="w-28" />
      </span>
      <h2 className="text-base md:text-lg font-semibold mb-2 text-center md:px-2">
        {title}
      </h2>
      <p className="text-gray-600 text-sm md:text-sm text-center">
        {description}
      </p>
    </Link>
  );
};

export default CategoryCard;
