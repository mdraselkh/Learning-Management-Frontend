import Image from 'next/image'
import React from 'react'

const TeamBanner = () => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src="/images/team.jpg"
        alt="Hero Background"
        className="z-0 w-full h-auto md:h-[600px] object-cover"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-5"></div>

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto max-w-7xl  flex flex-col items-center justify-center gap-5 px-8 xl:px-0">
          
          <h1 className=" text-3xl text-center max-w-4xl md:text-5xl lg:text-6xl text-white font-bold">
           Our Experts
          </h1>
          
        </div>
      </div>
    </div>
  )
}

export default TeamBanner