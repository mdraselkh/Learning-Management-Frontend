// app/student-dashboard/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import PaymentHistory from "../payment-history/_components/PaymentHistory";
import MyCourses from "../my-courses/page";

export default function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    enrolledCount: 0,
    inProgress: 0,
    completed: 0,
    recentLessons: [],
    payments: [],
    certificates: [],
  });

  // useEffect(() => {
  //   if (!user) return;

  //   const fetchDashboardData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/api/student/${user.userId}/dashboard`
  //       );
  //       setDashboardData(res.data);
  //     } catch (err) {
  //       console.error("Failed to fetch dashboard data", err);
  //     }
  //   };

  //   fetchDashboardData();
  // }, [user]);

  return (
    <div className="container md:p-5">
      {/* Welcome Banner */}
      <div className="flex items-center gap-4 mb-8 p-5 bg-white rounded">
        <div className="w-10 h-10 md:w-16 md:h-16 relative">
          <Image
            src={user?.image_url || "/images/people.png"}
            alt={user?.name || "Student"}
            fill
            className="rounded-full object-cover border-2 border-blue-500 shadow"
          />
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">
              {user?.name || "Student"} 👋
            </span>
          </h1>
          <p className="text-xs md:text-base text-gray-500 mt-1">
            Let’s continue your learning journey today!
          </p>
        </div>
      </div>
      <div>
        <MyCourses />
      </div>
      <div>
        <PaymentHistory isDashboard={true}/>
      </div>

      {/* 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CourseProgressCard title="Enrolled" count={dashboardData.enrolledCount} />
        <CourseProgressCard title="In Progress" count={dashboardData.inProgress} />
        <CourseProgressCard title="Completed" count={dashboardData.completed} />
      </div>

      <RecentActivity lessons={dashboardData.recentLessons} />

      <PaymentSummary payments={dashboardData.payments} />

      <CertificateList certificates={dashboardData.certificates} /> */}
    </div>
  );
}
