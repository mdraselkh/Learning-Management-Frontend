"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import EditEnrollmentForm from "../_components/EditEnrollmentForm";
import axiosInstance from "@/app/utils/axiosInstance";

const page = ({ params }) => {
  const unwrappedParams = use(params);
  const { enrollId } = unwrappedParams;
  const [enroll, setEnroll] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchEnrollData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/enrollment/getAllEnrollmentUsers/${enrollId}` // Replace with your actual API endpoint
        );
        console.log(response.data.data);
        const transformedData = response.data.data.map((item) => ({
          id: item.enrollment.id,
          studentId: item.user.id,
          courseId: item.course.id,
          city: item.user.city,
          address: item.user.address,
          email: item.user.email,
          phone: item.user.phone,
          enrollStatus: item.enrollment.status,
          paymentMethod: item.payment.method,
          paymentStatus: item.payment.status,
        }));

        setEnroll(transformedData);
      } catch (error) {
        console.error("Error fetching blog list:", error);
      } finally {
        setLoading(false);
      }
    };
    if (enrollId) {
      fetchEnrollData();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <EditEnrollmentForm enroll={enroll[0]} />
    </div>
  );
};

export default page;
