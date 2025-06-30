"use client";
import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LessonSection = ({ lesson }) => {
  const ref = useRef();
  const [ip, setIp] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await axiosInstance.get("/api/user-ip"); // or live URL
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

  return (
    <div className="flex flex-col items-start justify-between gap-8">
      <div>
        <h2 className="text-2xl md:text-4xl text-black font-semibold mb-6 font-serif">
          {lesson.title}
        </h2>
        <h3 className="text-lg font-semibold mb-3">{lesson.subtitle}</h3>
        <p className="text-base text-gray-500">{lesson.description}</p>
      </div>
      {/* Responsive Video Container */}
      <div
        ref={ref}
        className=" relative w-full h-[300px] lg:h-[420px] max-w-4xl aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg"
      >
        <video
          src={lesson.video_url}
          title="Lesson Video"
          controlsList="nodownload noremoteplayback"
          // disablePictureInPicture
          controls
          className="w-full h-full"
        ></video>

        <div className="flex flex-col gap-1 items-end absolute top-8 right-20 text-white text-xs opacity-50 bg-black/50 px-2 py-1 rounded">
          <p className=" font-serif">{user?.email || "LearnCraft"}</p>
          {ip && <p>{ip || ""}</p>}
        </div>
      </div>
    </div>
  );
};

export default LessonSection;
