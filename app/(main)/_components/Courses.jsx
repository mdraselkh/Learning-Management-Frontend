"use client";
import React, { useEffect, useState } from "react";
import courseImg1 from "/public/images/course1.png";
import CourseCard from "./CourseCard";
import Link from "next/link";
import Pagination from "./Pagination";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";

const Courses = ({ isCoursePage }) => {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [courseData, setCourseData] = useState([]);

  const fetchCoursesData = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/courses/getCoursesWithRatings"
      );
      console.log(response);
      setCourseData(response.data.filter((c) => c.is_published));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  console.log(courseData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of cards per page

  // Calculate total pages
  const totalPages = Math.ceil(courseData.length / itemsPerPage);

  // Calculate the indices of the items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = courseData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredCourses =
    activeTab === "All Courses"
      ? courseData.slice(0,6)
      : courseData.filter((course) => course.categoryname === activeTab);

  const displayedCourses = isCoursePage ? currentData : filteredCourses;

  console.log(displayedCourses);

  return (
    <div
      className={`${
        isCoursePage ? "bg-slate-100" : "bg-teal-50"
      } py-16 lg:py-20`}
    >
      <div
        id="allCourses"
        className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between h-full"
      >
        <div className="flex flex-col gap-5 items-start w-full px-4 py-8 h-full">
          <p className="text-sm md:text-base font-sans uppercase text-gray-700">
            Online Learning
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Top Online Courses
          </h2>
        </div>
        {!isCoursePage && (
          <div className="flex flex-wrap items-start justify-start w-full lg:items-end lg:justify-between lg:max-w-lg gap-5 h-full lg:pt-12 font-serif px-4 pb-10 lg:pb-0">
            <button
              className={`font-medium ${
                activeTab === "All Courses" ? "text-gray-800" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("All Courses")}
            >
              All Courses
            </button>
            <button
              className={`${
                activeTab === "Design" ? "text-gray-800" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("Design")}
            >
              Design
            </button>
            <button
              className={`${
                activeTab === "Development" ? "text-gray-800" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("Development")}
            >
              Development
            </button>
            <button
              className={`${
                activeTab === "Management" ? "text-gray-800" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("Management")}
            >
              Management
            </button>
            <button
              className={`${
                activeTab === "Finance" ? "text-gray-800" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("Finance")}
            >
              Finance
            </button>
          </div>
        )}
      </div>
      <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10 px-3 md:px-4 xl:px-0">
        {displayedCourses.length > 0 ? (
          displayedCourses.map((course, index) => (
            <div key={index}>
              <CourseCard
                id={course.id}
                img={course.img}
                categoryName={course.categoryname}
                courseFee={course.coursefee}
                title={course.title}
                rating={course.rating}
                reviewNo={course.reviewno}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No courses found.
          </p>
        )}
      </div>
      {isCoursePage ? (
        <Pagination
          isCoursePage={isCoursePage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="container w-auto sm:max-w-2xl mx-auto flex items-center justify-center px-5 rounded-l-full rounded-r-full bg-teal-950 py-4 mt-16 md:mt-20">
          <h1 className="text-white text-base text-center">
            We assist you in finding the ideal tutor at no cost.{" "}
            <Link href="/course" className=" underline cursor-pointer">
              Browse all available courses
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Courses;
