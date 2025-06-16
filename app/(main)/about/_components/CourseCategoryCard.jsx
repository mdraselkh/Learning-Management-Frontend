import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SlArrowRightCircle } from "react-icons/sl";

const CourseCategoryCard = ({ name, image, link }) => {
  return (
    <div className="relative group w-full h-full overflow-hidden rounded-lg bg-gray-500">
      {/* Image */}
      <Image
        src={image}
        alt={name}
        width={300}
        height={400}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover Content: Name */}
      <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {name}
      </h2>

      {/* Hover Content: Icon */}
      <Link
        href={`/category/${link}`}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white"
      >
        <SlArrowRightCircle className="text-4xl" />
      </Link>
    </div>
  );
};

export default CourseCategoryCard;
