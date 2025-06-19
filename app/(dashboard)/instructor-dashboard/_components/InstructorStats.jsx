"use client";
import axiosInstance from "@/app/utils/axiosInstance";
import { useEffect, useState } from "react";
import { FaBook, FaUsers, FaStar, FaMoneyBill, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";

const InstructorStats = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalCourses: 0,
    totalStudents: 0,
    avgRating: 0,
    totalLessons: 0,
  });
  const user=useSelector((state)=>state.auth.user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/dashboard/instructor-dashboard-stats/${user?.userId}`
        );
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const USD_TO_BDT = 110;
  const revenue = parseFloat(stats.totalEarnings) * USD_TO_BDT;

   const items = [
    {
      label: "Total Earnings",
      value: `৳${revenue.toLocaleString()}`,
      icon: <FaMoneyBill className="text-green-500" />,
    },
    {
      label: "Total Courses",
      value: stats.totalCourses,
      icon: <FaBook className="text-blue-600" />,
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: <FaUsers className="text-purple-500" />,
    },
    {
      label: "Average Rating",
      value: stats.avgRating,
      icon: <FaStar className="text-yellow-500" />,
    },
    {
      label: "Total Lessons",
      value: stats.totalLessons,
      icon: <FaVideo className="text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center border"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <h3 className="text-lg font-semibold">{item.label}</h3>
          <p className="text-xl font-bold text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InstructorStats;
