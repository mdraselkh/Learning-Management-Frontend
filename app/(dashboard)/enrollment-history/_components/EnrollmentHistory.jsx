"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axiosInstance from "@/app/utils/axiosInstance";
import { useSelector } from "react-redux";

const EnrollmentHistory = () => {
  const [enrollHistory, setEnrollHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchEnrollData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/enrollment/getAllEnrollments" // Replace with your actual API endpoint
      );
      console.log(response.data.data); // Log full response for debugging
      // const transformedData = response.data.data.map((item) => ({
      //   id: item.enrollment.id,
      //   userId:item.user.id,
      //   name: item.user.name,
      //   image_url: item.user.image_url,
      //   email: item.user.email,
      //   phone: item.user.phone,
      //   title: item.course.title,
      //   enrollment_date: item.enrollment.enrollment_date,
      //   status: item.enrollment.status,
      // }));

      setEnrollHistory(response.data?.data);
    } catch (error) {
      console.error("Error fetching enrollment history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollData();
  }, []);

  console.log(enrollHistory);

  const updateEnrollList = () => {
    fetchEnrollData(); // Fetch data again when needed
  };

  const userRole = user?.role;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Pass entire enrollment data to DataTable */}
      <DataTable
        columns={columns(updateEnrollList, userRole)}
        data={enrollHistory}
      />
    </div>
  );
};

export default EnrollmentHistory;
