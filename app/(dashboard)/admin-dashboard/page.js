"use client";
import React from "react";
import DashboardStats from "../_components/DashboardStats";
import TransactionListTable from "../transactions/_components/TransactionListTable";
import HighestRatedCourses from "../_components/HighestRatedCourse";
import RevenueChart from "../_components/RevenueChart";
import Image from "next/image";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="flex items-center gap-4 mb-8 p-5 bg-white rounded">
        <div className="w-16 h-16 relative">
          <Image
            src={user?.image_url || "/images/people.png"}
            alt={user?.name || "Admin"}
            fill
            className="rounded-full object-cover border-2 border-blue-500 shadow"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">{user?.name || "Admin"} 👋</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Here’s a quick overview of your dashboard.
          </p>
        </div>
      </div>
      <DashboardStats />
      <div className="my-5 flex items-center gap-10">
        <div className="w-[45%]">
          <RevenueChart />
        </div>
        <div className="w-[55%]">
          <HighestRatedCourses isDashbaord={true} />
        </div>
      </div>
      <div className="my-5">
        <TransactionListTable isDashboard={true} />
      </div>
    </div>
  );
};

export default page;
