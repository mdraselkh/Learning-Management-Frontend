"use client";
import React, { useState } from "react";
import LessonSection from "./LessonSection";

const FreeCurriculum = () => {
  const [activeTab, setActiveTab] = useState("lesson1");
  return (
    <div className="pt-8 flex flex-col-reverse md:flex-row items-start justify-between md:gap-20 relative">
      <div className="flex flex-wrap mt-10 md:mt-0 md:flex-col items-start gap-2 md:w-1/4 sticky">
        <button
          className={`md:px-20 px-6 py-2 md:py-4 rounded-l  ${
            activeTab === "lesson1"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500"
          }`}
          onClick={() => setActiveTab("lesson1")}
        >
          Lesson 1
        </button>
        <button
          className={`md:px-20 px-6  py-2 md:py-4 rounded-l  ${
            activeTab === "lesson2"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500"
          }`}
          onClick={() => setActiveTab("lesson2")}
        >
          Lesson 2
        </button>
        <button
          className={`md:px-20 px-6 py-2 md:py-4  rounded-l  ${
            activeTab === "lesson3"
              ? "bg-teal-950 text-white rounded"
              : "bg-teal-50 text-gray-500"
          }`}
          onClick={() => setActiveTab("lesson3")}
        >
          Lesson 3
        </button>
      </div>
      <div className="w-full md:w-3/4">
        {activeTab === "lesson1" && <LessonSection />}
        {activeTab === "lesson2" && <LessonSection />}
        {activeTab === "lesson3" && <LessonSection />}
      </div>
    </div>
  );
};

export default FreeCurriculum;
