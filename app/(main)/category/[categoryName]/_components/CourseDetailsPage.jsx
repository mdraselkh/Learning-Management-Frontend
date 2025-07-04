"use client";
import React, { useEffect, useState } from "react";
import CourseDetailsBanner from "./CourseDetailsBanner";
import Overview from "./Overview";
import Curriculum from "./Curriculum";
import Instructor from "./Instructor";
import Faq from "./Faq";
import Query from "./Query";
import courseImg1 from "/public/images/course1.png";
import FreeCurriculum from "./FreeCurriculum";
import CourseCard from "@/app/(main)/_components/CourseCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCourseAccess } from "@/app/hooks/useCourseAccess";
import axiosInstance from "@/app/utils/axiosInstance";
import Loading from "@/app/loading";

const CourseDetailsPage = ({ slug }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [courseWithId, setCourseWithId] = useState(null); // Ensure initial state is null
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const fetchCourseData = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        "/api/courses/getCoursesWithRatings"
      );
      console.log("Fetched courses:", response);
      setCourseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all course data on component mount
  useEffect(() => {
    fetchCourseData();
  }, []);

  const course = courseData.find(
    (course) =>
      course.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") === slug
  );
  console.log(course);

  const { accessData: hasFullAccess } = useCourseAccess(
    user?.userId,
    course?.id
  );

  const relatedCourses = courseData.filter(
    (b) =>
      b.title !== course?.title &&
      b.is_published &&
      b.categoryname === course?.categoryname
  );
  // const relatedCourses = relatedCoursesList.filter(
  //   (c) => c.categoryname === course?.categoryname
  // );

  console.log(relatedCourses);

  // Fetch category name from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParts = window.location.pathname.split("/");
      setCategoryName(urlParts[2]);
    }
  }, []);

  function formatTitleFromSlug(slug) {
    const words = slug.split("-");
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join(" ");
  }

  const title = formatTitleFromSlug(slug);
  // Fetch course details by ID once course is found
  useEffect(() => {
    if (course?.id) {
      fetchAllCourseData();
    }
  }, [course?.id]);

  const fetchAllCourseData = async () => {
    if (!course?.id) return; // Make sure course is defined
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/courses/getCourses/${course.id}`
      );
      console.log("Course details:", response.data);
      setCourseWithId(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (course?.id) {
      fetchAllLessonData();
    }
  }, [course?.id]);

  const fetchAllLessonData = async () => {
    setLoading(true);

    if (!course?.id) return; // Make sure course is defined

    try {
      const response = await axiosInstance.get(
        `/api/section/${course.id}/getAllSections`
      );
      console.log("Lesson details:", response.data);
      setLessonData(response.data.data.filter((l) => l.is_published));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-950 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <CourseDetailsBanner
        Course={course}
        coursewithId={courseWithId}
        hasFullAccess={hasFullAccess}
      />
      <div className="py-10 md:py-32 mt-96 md:mt-0 container px-4 xl:px-0 mx-auto max-w-7xl">
        <div className="flex w-auto text-[14px] md:text-base flex-row items-center justify-center py-8">
          <button
            className={`px-3 py-2 md:px-10 md:py-4 w-auto border-b rounded-l  ${
              activeTab === "overview"
                ? "bg-teal-950 text-white rounded"
                : "bg-teal-50 text-gray-500"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 md:px-10 md:py-4 w-auto ${
              activeTab === "curriculum"
                ? "bg-teal-950 text-white rounded"
                : "bg-teal-50 text-gray-500"
            }`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum
          </button>
          <button
            className={`px-3 py-2 md:px-10 md:py-4 w-auto ${
              activeTab === "instructor"
                ? "bg-teal-950 text-white rounded"
                : "bg-teal-50 text-gray-500"
            }`}
            onClick={() => setActiveTab("instructor")}
          >
            Instructor
          </button>
          <button
            className={`px-3 py-2 md:px-10 md:py-4 w-auto ${
              activeTab === "faq"
                ? "bg-teal-950 text-white rounded"
                : "bg-teal-50 text-gray-500"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
          <button
            className={`px-3 py-2 md:px-10 md:py-4 w-auto rounded-r  ${
              activeTab === "query"
                ? "bg-teal-950 text-white rounded"
                : "bg-teal-50 text-gray-500"
            }`}
            onClick={() => setActiveTab("query")}
          >
            Query
          </button>
        </div>
        {activeTab === "overview" && <Overview coursewithId={courseWithId} />}

        {/* {activeTab === "curriculum" && course.coursefee === "Free" && (
          <FreeCurriculum lessonData={lessonData} />
        )}
        {activeTab === "curriculum" &&
        course.coursefee !== "Free" &&
        hasFullAccess ? (
          <FreeCurriculum lessonData={lessonData} />
        ) : (
          <Curriculum lessonData={lessonData} coursewithId={courseWithId} />
        )} */}
        {activeTab === "curriculum" &&
          (course.coursefee === "Free" || hasFullAccess ? (
            <FreeCurriculum lessonData={lessonData} />
          ) : (
            <Curriculum lessonData={lessonData} coursewithId={courseWithId} />
          ))}

        {activeTab === "instructor" && (
          <Instructor instructor={courseWithId.instructor} />
        )}
        {activeTab === "faq" && <Faq />}
        {activeTab === "query" && <Query />}
      </div>
      <div className="container max-w-7xl mx-auto flex flex-col justify-between pb-28">
        <div className="flex flex-col gap-5 items-start w-full px-4 xl:px-0 py-8 h-full">
          <p className="text-sm md:text-base font-sans uppercase text-gray-700">
            Online Learning
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Related Courses
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {relatedCourses.map((course, index) => (
            <div key={index} className="px-2 xl:px-0">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
