"use client";

import EditCourseForm from "@/app/(dashboard)/create-course/_components/EditCourseForm";
import AlertBanner from "@/app/_components/AlertBanner";
import Loading from "@/app/loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const CourseBasics = ({ params }) => {
  const unwrappedParams = use(params);
  const { courseId } = unwrappedParams;
  console.log("Course ID:", courseId);

  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/getCourses/${courseId}`
        );
        setCourse(response.data?.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/getAllCategories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch instructors
    const fetchInstructors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getAllusers"
        );
        const filteredUsers = response.data.users.filter(
          (user) => user.role === "instructor"
        );
        setInstructors(filteredUsers);
      } catch (err) {
        console.error("Error fetching instructors:", err);
      }
    };

    fetchInstructors();
  }, []);



  // const courseData = course?.data || {};

  useEffect(() => {
  if (course && course.instructor) {
    setCourse((prev) => ({
      ...prev,
      instructorIds: course.instructor.map((inst) => inst.id.toString()), // ✅ boom!
    }));
  }
}, [course?.instructor]);

  console.log(course);


  if (loading) {
    return <Loading />;
  }
  // Check for required fields
  const requiredFields = [
    course.title,
    course.description,
    course.category_id,
    course.instructorIds,
    course.course_label,
  ];

  const isEmpty = (field) => {
    if (Array.isArray(field)) return field.length === 0;
    return !field;
  };

  const missingFields = requiredFields.filter(isEmpty);

  // Calculate field completion
  // const missingFields = requiredFields.filter((field) => !field);
  const missingFieldsCount = missingFields.length;
  const requiredFieldsCount = requiredFields.length;
  const isCompleted = requiredFields.every(Boolean); // Checks if all are truthy

  console.log("Is Completed:", isCompleted);
  console.log("Missing Fields Count:", missingFieldsCount);

  const handleCourseChange = (field, value) => {
    setCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-10 bg-white">
      <AlertBanner
        isCompleted={isCompleted}
        missingFieldsCount={missingFieldsCount}
        requiredFieldsCount={requiredFieldsCount}
      />
      <EditCourseForm
        course={course}
        categories={categories}
        instructors={instructors}
        isCompleted={isCompleted}
        onCourseChange={handleCourseChange}
      />
    </div>
  );
};

export default CourseBasics;
