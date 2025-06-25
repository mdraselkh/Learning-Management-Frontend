"use client";
import React, { useState } from "react";
import CourseCard from "./CourseCard";
import Loading from "@/app/loading";

const statusMap = {
  "Enrolled Courses": "Enrolled Courses",
  "In Progress": "In Progress",
  Completed: "Completed",
};

const tabs = Object.keys(statusMap);

export default function CourseTabs({ courses, onStartLearning }) {
  const [activeTab, setActiveTab] = useState("Enrolled Courses");

  if (!courses) return <Loading />;

  const courseCounts = {
    "Enrolled Courses": courses.filter(
      (c) => c.course_status === "Enrolled Courses"
    ).length,
    "In Progress": courses.filter((c) => c.course_status === "In Progress")
      .length,
    Completed: courses.filter((c) => c.course_status === "Completed").length,
  };

  const filteredCourses = (courses || []).filter(
    (course) => course.course_status === activeTab
  );

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex gap-2 md:gap-4 mb-6 border px-2 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-3 text-lg font-semibold  ${
              activeTab === tab
                ? "border-teal-700 border-b-4 text-teal-700"
                : "border-none text-gray-500"
            } `}
          >
            {tab}
            <span className="text-sm text-teal-800">({courseCounts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id || `${course.title}-${Math.random()}`}
              course={course}
              onStartLearning={onStartLearning}
            />
          ))
        ) : (
          <p>No courses here</p>
        )}
      </div>
    </div>
  );
}
