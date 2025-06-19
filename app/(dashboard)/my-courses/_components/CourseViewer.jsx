"use client";
import ReviewSection from "@/app/_components/ReviewSection";
import axiosInstance from "@/app/utils/axiosInstance";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbArrowLeftFromArc, TbArrowRightFromArc } from "react-icons/tb";
import { TfiTimer } from "react-icons/tfi";
import { useSelector } from "react-redux";

export default function CourseViewer({ courseContent, onBack }) {
  const [selectedSection, setSelectedSection] = useState(courseContent[0]);
  const user = useSelector((state) => state.auth.user);
  console.log(selectedSection);
  const [completedSectionIds, setCompletedSectionIds] = useState([]);

  useEffect(() => {
    const fetchCompletedSections = async () => {
      const res = await axiosInstance.get(
        `/api/section/${user?.userId}/completed`
      );
      console.log(res);
      setCompletedSectionIds(res.data.data);
    };

    if (user?.userId) {
      fetchCompletedSections();
    }
  }, [user]);

  const handleMarkComplete = async () => {
    if (completedSectionIds.includes(selectedSection.id)) return;

    try {
      const res = await axiosInstance.post(
        "/api/section/mark-complete",
        {
          student_id: user.userId,
          section_id: selectedSection.id,
        }
      );

      if (res.status === 200) {
        setCompletedSectionIds((prev) => [...prev, selectedSection.id]);
      }
      showSuccessToast("✅ Auto-marked as complete!");
    } catch (error) {
      console.error("Error marking complete:", error);
      showErrorToast("❌ Failed to mark complete.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-white rounded shadow-lg ">
      {/* === Sidebar === */}
      <aside className="w-1/3 border-r p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Course Content</h2>
        <ul className="space-y-4">
          {courseContent.map((section, index) => (
            <div key={section.id}>
              <p className="text-gray-500 font-semibold text-sm">
                Lesson {index + 1}
              </p>
              <li
                onClick={() => setSelectedSection(section)}
                className={`ml-2 pl-2 border-l-4 cursor-pointer line-clamp-1 flex items-center gap-4 ${
                  selectedSection?.id === section.id
                    ? "text-blue-600 border-blue-500 font-bold"
                    : "text-gray-700 hover:text-blue-600 border-transparent"
                } ${
                  completedSectionIds.includes(section.id) &&
                  "text-teal-800 border-teal-700 font-semibold"
                }`}
              >
                {section.title}{" "}
                {completedSectionIds.includes(section.id) && <FaCheck />}
              </li>
            </div>
          ))}
        </ul>
      </aside>

      {/* === Main Viewer === */}
      <main className="w-2/3 p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            🎬 Now Playing:{" "}
            <span className="text-blue-600">{selectedSection?.title}</span>
          </h2>
          <button
            className="text-blue-500 hover:underline font-medium flex items-center gap-2"
            onClick={onBack}
          >
            <TbArrowRightFromArc/> Back to My Courses
          </button>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md h-[500px]">
          <video
            src={selectedSection?.video_url}
            title="Lesson Video"
            controls
            className="w-full h-full  bg-black"
            onEnded={handleMarkComplete}
          />
        </div>
        <div className="flex items-end justify-end">
          {!completedSectionIds.includes(selectedSection.id) ? (
            <button
              className="mt-4 px-4 py-2 border border-teal-700 text-teal-700 flex items-center gap-2 font-semibold rounded-lg shadow hover:bg-teal-900 transition hover:text-white"
              onClick={handleMarkComplete}
            >
              <TfiTimer size={20} /> Mark as Complete
            </button>
          ) : (
            <button className="mt-4 px-4 py-2 bg-teal-700 text-white font-semibold flex items-center gap-2 rounded-lg shadow hover:bg-teal-900  transition">
              <IoMdCheckmarkCircleOutline /> Completed
            </button>
          )}
        </div>

        <ReviewSection courseId={courseContent[0]?.course_id} />
      </main>
    </div>
  );
}
