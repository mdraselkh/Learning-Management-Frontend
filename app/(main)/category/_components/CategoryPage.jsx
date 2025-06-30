"use client";
import React, { useEffect, useState } from "react";
import CategoryBanner from "./CategoryBanner";
import courseImg1 from "/public/images/course1.png";
import CourseCard from "../../_components/CourseCard";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";
import Loading from "@/app/loading";

const CategoryPage = ({ categoryName }) => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoursesData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/api/courses/getCoursesWithRatings"
      );
      console.log(response);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const filteredCourses = courseData.filter(
    (course) =>
      course.categoryname.toLocaleLowerCase() ===
      categoryName.toLocaleLowerCase()
  );
  if (loading) {
    return (
      <div className="min-h-screen bg-teal-950 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <CategoryBanner categoryName={categoryName} />
      <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10 px-3 md:px-4 xl:px-0 py-10 md:py-20">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={index}>
              <CourseCard
                img={course.img}
                categoryName={course.categoryname}
                courseFee={course.coursefee}
                title={course.title}
                rating={course.rating}
                reviewNo={course.reviewno}
                isCategoryPage={true}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No courses found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
