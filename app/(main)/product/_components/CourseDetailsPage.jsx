"use client";
import React, { useState } from "react";
import CourseDetailsBanner from "./CourseDetailsBanner";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import Instructor from "./Instructor";
import Faq from "./Faq";
import Query from "./Query";
import CourseCard from "../../_components/CourseCard";
import courseImg1 from "/public/images/course1.png";
import FreeCurriculum from "./FreeCurriculum";


const CourseDetailsPage = ({ slug }) => {
  function formatTitleFromSlug(slug) {
    // Split the slug by hyphens
    const words = slug.split("-");

    // Capitalize the first letter of each word
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words back into a sentence
    return formattedWords.join(" ");
  }

  const title = formatTitleFromSlug(slug);
  const [activeTab, setActiveTab] = useState("overview");

  const CourseList = [
    {
      id: 1,
      img: courseImg1,
      categoryName: "Development",
      courseFee: "Free",
      description: "Building single page applications with react",
      rating: "4.45",
      reviewNo: "328",
    },
    {
      id: 2,
      img: courseImg1,
      categoryName: "Design",
      courseFee: "$65",
      description: "Building single page applications with react",
      rating: "5.00",
      reviewNo: "328",
    },
    {
      id: 3,
      img: courseImg1,
      categoryName: "Finance",
      courseFee: "$65",
      description: "Building single page applications with react",
      rating: "3.00",
      reviewNo: "328",
    },
    {
      id: 4,
      img: courseImg1,
      categoryName: "Management",
      courseFee: "$65",
      description: "Building single page applications with react",
      rating: "3.00",
      reviewNo: "328",
    },
  ];

  return (
    <div>
      <CourseDetailsBanner title={title} CourseList={CourseList}/>
      <div className="py-10 md:py-32 mt-96 md:mt-0 container px-4 xl:px-0 mx-auto max-w-7xl">
        <div className="flex flex-col w-full md:w-auto md:flex-row items-center justify-center py-8">
          <button
            className={`px-10 py-4 w-full md:w-auto border-b rounded-l  ${(activeTab === "overview"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500")}`}
            onClick={() => setActiveTab("overview")}
          >Overview</button>
          <button
            className={`px-10 py-4 w-full border-b md:w-auto ${(activeTab === "curriculum"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500")}`}
            onClick={() => setActiveTab("curriculum")}
          >Curriculum</button>
          <button
            className={`px-10 py-4 border-b w-full md:w-auto ${(activeTab === "instructor"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500")}`}
            onClick={() => setActiveTab("instructor")}
          >Instructor</button>
          <button
            className={`px-10 py-4 border-b w-full md:w-auto ${(activeTab === "faq"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500")}`}
            onClick={() => setActiveTab("faq")}
          >FAQ</button>
          <button
            className={`px-10 py-4 border-b w-full md:w-auto rounded-r  ${(activeTab === "query"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500")}`}
            onClick={() => setActiveTab("query")}
          >Query</button>
        </div>
        {activeTab==='overview' && <Overview/>}
        {/* {activeTab==='curriculum' && <FreeCurriculum/>} */}
        {activeTab==='curriculum' && <Curriculum/>}
        {activeTab==='instructor' && <Instructor/>}
        {activeTab==='faq' && <Faq/>}
        {activeTab==='query' && <Query/>}
      </div>
      <div className="container max-w-7xl mx-auto flex flex-col justify-between pb-28">
      <div className="flex flex-col gap-5 items-start w-full px-4 xl:px-0 py-8 h-full">
          <p className="text-sm md:text-base font-sans uppercase text-gray-700">
            Online Learning
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Related Courses
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        
        {CourseList.map((course,index)=>(
            <div key={index} className="px-4 xl:px-0">
            <CourseCard
              img={course.img}
              categoryName={course.categoryName}
              courseFee={course.courseFee}
              description={course.description}
              rating={course.rating}
              reviewNo={course.reviewNo}
            />
          </div>
        ))}
        </div>

      </div>
    </div>
  );
};

export default CourseDetailsPage;
