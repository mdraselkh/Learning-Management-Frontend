import React from "react";
import CareerBanner from "./CareerBanner";
import CareerCard from "./CareerCard";

const CareerPage = () => {
  const CareerData = [
    {
      id: 1,
      position: "Software Development Instructor",
      vacancy: "50 Posts Avaiable",
      location: "Sector 7, Uttara, Dhaka-1280",
      salary: "$23K - $35K",
      jobDesc:
        "We are looking for a skilled software development instructor to join our team.",
      jobType: "Full-time, Parmanent",
      experience: "2 years",
    },
    {
      id: 2,
      position: "Software Development Instructor",
      vacancy: "50 Posts Avaiable",
      location: "Sector 7, Uttara, Dhaka-1280",
      salary: "$23K - $35K",
      jobDesc:
        "We are looking for a skilled software development instructor to join our team.",
      jobType: "Full-time, Parmanent",
      experience: "2 years",
    },
    {
      id: 3,
      position: "Software Development Instructor",
      vacancy: "50 Posts Avaiable",
      location: "Sector 7, Uttara, Dhaka-1280",
      salary: "$23K - $35K",
      jobDesc:
        "We are looking for a skilled software development instructor to join our team.",
      jobType: "Full-time, Parmanent",
      experience: "2 years",
    },
    {
      id: 4,
      position: "Software Development Instructor",
      vacancy: "50 Posts Avaiable",
      location: "Sector 7, Uttara, Dhaka-1280",
      salary: "$23K - $35K",
      jobDesc:
        "We are looking for a skilled software development instructor to join our team.",
      jobType: "Full-time, Parmanent",
      experience: "2 years",
    },
  ];

  return (
    <div className="bg-gray-100">
      <CareerBanner />
      <div className="container mx-auto max-7xl py-10 md:py-20 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h3 className="text-black font-semibold text-xs md:text-base uppercase">
            Job Opening
          </h3>
          <h1 className=" text-2xl md:text-4xl lg:text-5xl text-black font-bold max-w-3xl">
            Be a part of our faculty
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-4 xl:px-0">
          {CareerData.map((item) => (
            <div key={item.id}>
              <CareerCard
                position={item.position}
                vacancy={item.vacancy}
                location={item.location}
                salary={item.salary}
                jobDesc={item.jobDesc}
                jobType={item.jobType}
                experience={item.experience}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
