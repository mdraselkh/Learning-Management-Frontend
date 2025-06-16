"use client";
import React from "react";
import { useSelector } from "react-redux";
import InstructorStats from "./_components/InstructorStats";
import Image from "next/image";
import CourseList from "../course-list/_components/CourseList";

const Page = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-3">
      <div className="flex items-center gap-4 mb-8 p-5 bg-white rounded">
        <div className="w-16 h-16 relative">
          <Image
            src={user?.image_url || "/default-avatar.png"}
            alt={user?.name || "Instructor"}
            fill
            className="rounded-full object-cover border-2 border-blue-500 shadow"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">
              {user?.name || "Instructor"} 👋
            </span>
          </h1>
          <p className="text-gray-500 mt-1">
            Here’s a quick overview of your dashboard.
          </p>
        </div>
      </div>

      <InstructorStats />
      <CourseList isInstructorDash={true}/>
    </div>
  );
};

export default Page;
