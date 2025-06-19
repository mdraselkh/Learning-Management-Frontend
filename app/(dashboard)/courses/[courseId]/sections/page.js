'use client';
import CreateSectionForm from "@/app/(dashboard)/_components/CreateSectionForm";
import axiosInstance from "@/app/utils/axiosInstance";
import axios from "axios";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

const CourseCurriculumPage = ({ params }) => {
    const unwrappedParams = use(params);
  const { courseId } = unwrappedParams;


  const [course, setCourse] = useState([]);

  useEffect(() => {
    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/courses/getCourses/${courseId}`
        );
        setCourse(response.data?.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } 
    };

    if (courseId) fetchCourse();
  }, [courseId]);


  if (!course) {
    return redirect("/course-list")
  }

  return (
    <CreateSectionForm course={course} />
  );
}

export default CourseCurriculumPage;