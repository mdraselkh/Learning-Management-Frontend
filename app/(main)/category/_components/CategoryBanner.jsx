import Image from 'next/image'
import React from 'react'

const CategoryBanner = ({categoryName}) => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="/images/herobg.png"
          alt="Hero Background"
          className="z-0 object-cover"
          layout="fill"
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-70 z-5"></div>

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center px-8 xl:px-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold max-w-3xl capitalize">
            {categoryName}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default CategoryBanner