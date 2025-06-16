import React from "react";
import AboutBanner from "./AboutBanner";
import Image from "next/image";
import categoryImg1 from "/public/images/category1.png";
import categoryImg2 from "/public/images/category2.png";
import categoryImg3 from "/public/images/category3.png";
import categoryImg4 from "/public/images/category4.png";
import CourseCategoryCard from "./CourseCategoryCard";
import UnlockingPotential from "../../_components/UnlockingPotential";
import Link from "next/link";
import BlogSection from "../../_components/BlogSection";

const AboutPage = () => {
  const CourseCategory = [
    {
      id: 1,
      name: "Web Design",
      image: categoryImg1,
      link: "design",
    },
    {
      id: 2,
      name: "Web Development",
      image: categoryImg2,
      link: "development",
    },
    {
      id: 3,
      name: "Management",
      image: categoryImg3,
      link: "management",
    },
    {
      id: 4,
      name: "Finance",
      image: categoryImg4,
      link: "finance",
    },
  ];

  return (
    <div>
      <AboutBanner />
      <div className="py-10 md:py-20 container mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 xl:gap-28 px-4 xl:px-0">
        <div className="flex items-center justify-between lg:w-1/2 gap-5 md:gap-8 px-4 lg:px-0">
          <div className="flex flex-col items-end justify-between w-1/2 gap-6 md:gap-8">
            <Image
              src="/images/man.png"
              alt=""
              width={300}
              height={400}
              className=" w-auto md:w-[300px]"
            />
            <div className="flex flex-col items-center justify-center gap-2  p-2 md:px-10 md:py-4 bg-teal-950 text-yellow-500 rounded">
              <h1 className="font-semibold text-lg md:text-4xl">100%</h1>
              <h3 className="text-yellow-500 font-medium text-[10px] sm:text-xs md:text-sm uppercase">
                Job Placement
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between w-1/2 gap-6 md:gap-8">
            <div className="flex flex-col items-center justify-center gap-2 p-2 md:px-10 md:py-4 text-black bg-yellow-500 rounded">
              <h1 className="font-semibold text-lg md:text-4xl">1.5K</h1>
              <h3 className="text-black font-medium text-[10px] sm:text-xs md:text-sm uppercase">
                Finish Seasons
              </h3>
            </div>
            <Image
              src="/images/aboutImg.png"
              alt=""
              width={300}
              height={400}
              className="w-auto md:w-[300px] h-auto lg:h-[250px] xl:h-[380px]"
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 px-4 xl:px-0">
          <h3 className="text-black font-semibold text-xs md:text-base uppercase">
            Our Story
          </h3>
          <h1 className=" text-center md:text-left text-2xl md:text-5xl text-black font-bold max-w-3xl">
            Limitless learning and get more possibilities
          </h1>
          <p className="text-xs md:text-sm text-gray-400 text-center md:text-left px-4 md:px-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
            quae officia necessitatibus natus nihil dicta.
          </p>
          <div className="flex items-start mt-6  justify-between h-full px-4">
            <div className="flex items-center justify-center px-4 md:px-6">
              <h2 className="text-2xl md:text-5xl lg:text-3xl xl:text-5xl font-bold text-black md:border-r-2 md:px-2">
                70M
              </h2>
              {/* <span className="px-2 text-white h-12">|</span> */}
              <h2 className="text-[8px] md:text-base lg:text-xs xl:text-base text-gray-400 uppercase px-2">
                Successful Students
              </h2>
            </div>
            <div className="flex items-center justify-center lg:px-6">
              <h2 className="text-2xl md:text-5xl lg:text-3xl xl:text-5xl font-bold text-black md:border-r-2 md:px-2">
                25K
              </h2>
              {/* <span className="px-2 text-white">|</span> */}
              <h2 className="text-[8px] md:text-base lg:text-xs xl:text-base text-gray-400 uppercase px-2">
                Global Job Placements
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl flex flex-col items-start justify-between gap-5 py-10 md:pb-28 px-4 xl:px-0">
        <h3 className="text-black font-semibold text-xs md:text-base uppercase">
          Our Philosophy
        </h3>
        <h1 className=" text-3xl md:text-4xl text-black font-bold max-w-3xl">
          Get instant access courses
        </h1>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {CourseCategory.map((item, index) => (
            <div key={index}>
              <CourseCategoryCard
                name={item.name}
                image={item.image}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pb-32">
        <UnlockingPotential isAbout={true} />
      </div>
      <div className="pb-10 md:pb-20 container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 px-4 xl:px-0">
        <div className="flex flex-col items-center md:items-end justify-between gap-8 md:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-serif text-black">
            Become an instructor
          </h1>
          <p className="text-sm text-gray-400 md:text-right text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
            tempora rerum accusamus unde non veniam voluptates quo, laborum
            adipisci quisquam quam laboriosam harum illo dolorum iure eligendi,
            voluptatum corporis maxime?
          </p>
          <Link
            href="/career"
            className="md:px-8 xl:px-12 rounded xl:py-4 px-4 py-3  bg-teal-950 text-xs sm:text-base border border-black text-white hover:scale-95 transition-all  duration-200 cursor-pointer"
          >
            Start Teaching Today
          </Link>
        </div>
        <div className="flex items-start w-1/2">
          <div className="relative">
            {/* Base Image */}
            <Image
              src="/images/instructor.png"
              alt="Instructor"
              width={500}
              height={400}
              className="object-cover w-[500px]"
            />

            {/* Overlay Image */}
            <Image
              src="/images/instructorReview.png"
              alt="Review"
              width={100}
              height={50}
              className="absolute z-10 top-1/3 left-0  md:w-56 h-auto rounded-l-full rounded-r-full"
            />
          </div>
        </div>
      </div>
      <div className="pb-20">
        <BlogSection />
      </div>
    </div>
  );
};

export default AboutPage;
