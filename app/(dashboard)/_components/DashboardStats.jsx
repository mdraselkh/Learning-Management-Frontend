"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Banknote,
  BookOpen,
  ClipboardList,
  GraduationCap,
  UserRound,
  Users,
} from "lucide-react";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    totalInstructors: 0,
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/dashboard-stats"
        );
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  const cardStyle =
    "shadow-lg rounded-xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300";
  const USD_TO_BDT = 110;
  const revenue = parseFloat(stats.totalRevenue) * USD_TO_BDT;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
      <Card className={cardStyle}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              ৳ {revenue.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <Banknote className="w-6 h-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Users</p>
            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Instructors</p>
            <p className="text-2xl font-semibold">{stats.totalInstructors}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <GraduationCap className="w-6 h-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Students</p>
            <p className="text-2xl font-semibold">{stats.totalStudents}</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <UserRound className="w-6 h-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Courses</p>
            <p className="text-2xl font-semibold">{stats.totalCourses}</p>
          </div>
          <div className="p-3 bg-teal-100 rounded-full">
            <BookOpen className="w-6 h-6 text-teal-600" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardStyle}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Enrollments</p>
            <p className="text-2xl font-semibold">{stats.totalEnrollments}</p>
          </div>
          <div className="p-3 bg-pink-100 rounded-full">
            <ClipboardList className="w-6 h-6 text-pink-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
