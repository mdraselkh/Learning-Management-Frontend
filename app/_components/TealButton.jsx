import Link from "next/link";
import React from "react";

const TealButton = ({ path }) => {
  return (
    <div className="my-8">
      <Link
        href={path}
        className="md:px-12 rounded md:py-4 px-4 py-3 border border-gray-400 bg-teal-950 text-base text-gray-50 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer"
      >
        Get Started
      </Link>
    </div>
  );
};

export default TealButton;
