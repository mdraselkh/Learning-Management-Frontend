"use client";
import React, { useEffect, useState } from "react";
import CourseViewer from "./_components/CourseViewer";
import CourseTabs from "./_components/CourseTabs";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInstance";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function encodeCourseId(courseId, courseTitle) {
    const titlePart = courseTitle
      .toLowerCase()
      .replace(/\s+/g, "-");
    const prefix = Math.random().toString(36).substring(2, 10);
    const suffix = Math.random().toString(36).substring(2, 10);
    return `/my-courses/lesson/${prefix}-${courseId}-${suffix}?title=${titlePart}`;
  }

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/courses/${user?.userId}/progress`
      );
      console.log(response);

      setCourses(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [user]);



  const startLearning = (course) => {
    const url = encodeCourseId(course.id, course.title);
    router.push(url);
  };

  // const goBack = async () => {
  //   setViewingCourseId(null);
  //   setCourseContent(null);
  //   await fetchCourseData();
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <CourseTabs courses={courses} onStartLearning={startLearning} />
    </div>
  );
}
