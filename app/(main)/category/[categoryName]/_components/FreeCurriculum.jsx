"use client";
import React, { useEffect, useState } from "react";
import LessonSection from "./LessonSection";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";
import ReviewSection from "@/app/_components/ReviewSection";

const FreeCurriculum = ({ lessonData }) => {
  const [activeTab, setActiveTab] = useState(`lesson1`);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user);
  console.log(isAuthenticated);
  


  return (
    <div className="pt-8 flex flex-col-reverse md:flex-row items-start justify-between md:gap-20 relative">
      <div className="flex flex-wrap mt-10 md:mt-0 md:flex-col items-start gap-2 md:w-1/4 sticky">
        {lessonData.map((lesson, index) => {
          const lessonKey = `lesson${index + 1}`;
          return (
            <button
              key={lessonKey}
              className={`md:px-20 px-6 py-2 md:py-4 rounded-l ${
                activeTab === lessonKey
                  ? "bg-teal-950 text-white rounded"
                  : "bg-teal-50 text-gray-500"
              }`}
              onClick={() => setActiveTab(lessonKey)}
            >
              {`Lesson ${index + 1}`}
            </button>
          );
        })}
      </div>
      <div className="w-full flex flex-col md:w-3/4">
        {lessonData.map((lesson, index) => {
          const lessonKey = `lesson${index + 1}`;
          return (
            activeTab === lessonKey && (
              <LessonSection key={lessonKey} lesson={lesson} />
            )
          );
        })}

        {/* Review Section */}
        <ReviewSection courseId={lessonData[0].course_id}/>
      </div>
    </div>
  );
};

export default FreeCurriculum;
