"use client";
import ReviewSection from "@/app/_components/ReviewSection";
import axiosInstance from "@/app/utils/axiosInstance";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  const ref = useRef();

  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await axiosInstance.get("/api/user-ip");
        console.log(res);
        setIp(res.data.ip);
      } catch (err) {
        console.error("IP fetch error:", err);
      }
    };

    fetchIP();
  }, []);

  console.log(ip);

  useEffect(() => {
    const el = ref.current;
    const handleContextMenu = (e) => e.preventDefault();
    if (el) el.addEventListener("contextmenu", handleContextMenu);

    return () => {
      if (el) el.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
      const res = await axiosInstance.post("/api/section/mark-complete", {
        student_id: user.userId,
        section_id: selectedSection.id,
      });

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
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]  lg:overflow-hidden bg-white rounded shadow-lg ">
      {/* === Sidebar === */}
      <aside className="w-full md:w-1/3 border-r p-4 bg-gray-50 sticky top-0  overflow-y-auto">
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
      <main className="w-full p-1 md:w-2/3 md:p-6 flex flex-col gap-4 overflow-y-auto min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="mt-4 md:mt-0 text-lg md:text-2xl font-semibold text-gray-800">
            🎬 Now Playing:{" "}
            <span className="text-blue-600 text-sm md:text-2xl">
              {selectedSection?.title}
            </span>
          </h2>
          <button
            className="text-xs md:text-base text-blue-500 hover:underline font-medium flex items-center gap-2"
            onClick={onBack}
          >
            <TbArrowRightFromArc size={20} /> Back to My Courses
          </button>
        </div>

        <div
          ref={ref}
          className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[500px] max-w-5xl  aspect-video rounded-lg overflow-hidden shadow-lg"
        >
          <video
            src={selectedSection?.video_url}
            title="Lesson Video"
            controlsList="nodownload noremoteplayback"
            controls
            className="w-full h-full  bg-black object-cover"
            onEnded={handleMarkComplete}
          />

          <div className="flex flex-col gap-1 items-end absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-[10px] sm:text-xs opacity-50 bg-black/50 px-2 py-1 rounded z-0">
            <p className="font-medium break-all max-w-[150px] text-right">
              {user?.email || "LearnCraft"}
            </p>
            {ip && <p className="break-all text-right">{ip}</p>}
          </div>
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
