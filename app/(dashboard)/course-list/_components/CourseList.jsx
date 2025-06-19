"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useSelector } from "react-redux";
import axiosInstance from "@/app/utils/axiosInstance";

const CourseList = ({isInstructorDash}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch categories from the API using Axios
    axiosInstance
      .get(`/api/categories/getAllCategories`) // Replace with your actual API endpoint
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/courses/getAllCourses?userId=${user?.userId}&role=${user?.role}`
      );
      console.log(response.data?.data);

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

  console.log(courses);

  const updateCourseList = () => {
    fetchCourseData();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <DataTable
        columns={columns(categories, updateCourseList, user?.role)}
        data={courses}
        categories={categories}
        isInstructorDash={isInstructorDash}
      />
    </div>
  );
};

export default CourseList;
