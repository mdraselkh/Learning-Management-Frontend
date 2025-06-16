import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/images/herobg.png"
        alt="Hero Background"
        layout="fill" // Makes it span the full width and height
        objectFit="cover" // Ensures the image covers the entire container
        className="z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-5"></div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center gap-5 px-8 xl:px-0">
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg">
              404
            </h1>

            <h2 className="text-3xl text-center text-white font-semibold">
              Oops! Page Not Found
            </h2>
            <p className="text-sm text-center text-gray-400">
              Oops! it could be you or us, there is no page here. It might have
              been moved or deleted.
            </p>
            <Link
              href="/"
              className="md:px-10 md:py-4 px-6 py-3 rounded-md text-black bg-yellow-500 hover:scale-95 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
