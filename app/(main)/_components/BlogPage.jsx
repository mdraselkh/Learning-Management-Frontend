"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import BlogBanner from "./BlogBanner";
import Pagination from "./Pagination";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";
import Loading from "@/app/loading";

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/blog/getAllBlogs");
      console.log(response);
      setBlogData(
        response.data.data.filter((d) => {
          return d.status === "published";
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  console.log(blogData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of cards per page

  // Calculate total pages
  const totalPages = Math.ceil(blogData.length / itemsPerPage);

  // Calculate the indices of the items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = blogData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-500 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <BlogBanner />
      <div className="bg-slate-100 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto max-w-7xl px-4 xl:px-0">
          {/* Render paginated cards */}
          {currentData.map((blog) => (
            <div key={blog.id}>
              <BlogCard
                category={blog.category}
                img={blog.image_url}
                title={blog.title}
                date={blog.created_at}
                border={true}
              />
            </div>
          ))}
        </div>

        {/* Reusable Pagination Component */}
        <div className="pt-16 container mx-auto justify-center items-center flex">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
