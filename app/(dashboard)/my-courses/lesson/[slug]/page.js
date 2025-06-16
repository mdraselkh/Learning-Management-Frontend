'use client'
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseViewer from "../../_components/CourseViewer";
import axios from "axios";
import Loading from "@/app/loading";

const page = () => {
  const { slug } = useParams(); 
  const courseId = slug.split("-")[1];
  const [courseContent, setCourseContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourseContent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/section/${courseId}/content`);
      setCourseContent(res.data?.data);
    } catch (error) {
      console.error("Error loading course content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) fetchCourseContent();
  }, [courseId]);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto">
      <CourseViewer courseContent={courseContent} onBack={() => window.history.back()} />
    </div>
  );
};

export default page;
