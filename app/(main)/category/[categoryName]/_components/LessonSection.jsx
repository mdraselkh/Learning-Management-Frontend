"use client";
import axiosInstance from "@/app/utils/axiosInstance";
import { showErrorToast, showSuccessToast } from "@/app/utils/sweetAlert";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TfiTimer } from "react-icons/tfi";
import { useSelector } from "react-redux";

const LessonSection = ({ lesson }) => {
  const ref = useRef();
  const [ip, setIp] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [completedSectionIds, setCompletedSectionIds] = useState([]);

  console.log(lesson);

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
    const fetchCompletedSections = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/section/${user?.userId}/completed`
        );
        setCompletedSectionIds(res.data.data);
      } catch (error) {
        console.error("Failed to fetch completed sections", error);
      }
    };

    if (user?.userId) {
      fetchCompletedSections();
    }
  }, [user]);

  const handleMarkComplete = async () => {
    if (completedSectionIds.includes(lesson.id)) return;
    try {
      const res = await axiosInstance.post("/api/section/mark-complete", {
        student_id: user.userId,
        section_id: lesson.id,
      });
      if (res.status === 200) {
        setCompletedSectionIds((prev) => [...prev, lesson.id]);
        showSuccessToast("✅ Auto-marked as complete!");
      }
    } catch (error) {
      console.error("Error marking complete:", error);
      showErrorToast("❌ Failed to mark complete.");
    }
  };

  useEffect(() => {
    const el = ref.current;
    const handleContextMenu = (e) => e.preventDefault();
    if (el) el.addEventListener("contextmenu", handleContextMenu);

    return () => {
      if (el) el.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="flex items-center gap-2 text-2xl md:text-4xl text-black font-semibold mb-6 font-serif">
          {lesson.title}
        </h2>
        {/* {completedSectionIds.includes(lesson.id) && (
          <IoMdCheckmarkCircleOutline className="text-teal-600" size={24} />
        )} */}
        <h3 className="text-lg font-semibold mb-3">{lesson.subtitle}</h3>
        <p className="text-base text-gray-500">{lesson.description}</p>
      </div>
      {/* Responsive Video Container */}
      <div
        ref={ref}
        className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[420px] max-w-4xl  aspect-video rounded-lg overflow-hidden shadow-lg"
      >
        <video
          src={lesson.video_url}
          title="Lesson Video"
          controlsList="nodownload noremoteplayback"
          // disablePictureInPicture
          controls
          className="w-full h-full object-cover"
          onEnded={handleMarkComplete}
        ></video>

        <div className="flex flex-col gap-1 items-end absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-[10px] sm:text-xs opacity-50 bg-black/50 px-2 py-1 rounded z-10">
          <p className="font-medium break-all max-w-[150px] text-right">
            {user?.email || "LearnCraft"}
          </p>
          {ip && <p className="break-all text-right">{ip}</p>}
        </div>
      </div>
      <div className="flex items-end justify-end w-full">
        {completedSectionIds.includes(lesson.id) && (
          <button className="md:mt-4 md:px-4 md:py-2 px-2 py-1 text-xs md:text-base bg-teal-700 text-white font-semibold flex items-center gap-2 rounded-lg shadow hover:bg-teal-900 transition">
            <IoMdCheckmarkCircleOutline /> Completed
          </button>
        )}
      </div>
      {/* <div className="flex items-end justify-end w-full">
        {!completedSectionIds.includes(lesson.id) ? (
          <button
            className="mt-4 px-4 py-2 border border-teal-700 text-teal-700 flex items-center gap-2 font-semibold rounded-lg shadow hover:bg-teal-900 transition hover:text-white"
            onClick={handleMarkComplete}
          >
            <TfiTimer size={20} /> Mark as Complete
          </button>
        ) : (
          <button className="mt-4 px-4 py-2 bg-teal-700 text-white font-semibold flex items-center gap-2 rounded-lg shadow hover:bg-teal-900 transition">
            <IoMdCheckmarkCircleOutline /> Completed
          </button>
        )}
      </div> */}
    </div>
  );
};

export default LessonSection;
