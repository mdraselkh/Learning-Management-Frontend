"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axiosInstance from "@/app/utils/axiosInstance";

const BlogDetailsPage = ({ slug }) => {
  const [blogData, setBlogData] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date"; // Fallback for missing dates
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date"; // Fallback for invalid dates
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const fetchBlogData = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/blog/getAllBlogs"
      );
      setBlogData(response.data.data.filter((d) => d.status === "published"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const blog = blogData.find(
    (blog) =>
      blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") === slug
  );

  // Find related blogs based on the current blog's category
  const relatedBlogs = blogData.filter(
    (b) => b.category === blog?.category && b.title !== blog?.title
  );

  return (
    <div>
      <div className="relative w-full z-10">
        {blog?.image_url && blog.image_url !== "" ? (
          <Image
            src={blog.image_url}
            alt="Hero Background"
            className="z-0 w-full h-auto md:h-[600px] object-cover"
            width={500}
            height={500}
          />
        ) : (
          <div className="z-0 w-full h-auto md:h-[600px] bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-5"></div>

        {/* Hero Section */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <div className="container mx-auto absolute max-w-7xl flex flex-col items-center justify-center gap-5 px-8 xl:px-0">
            <h3 className="text-white font-medium text-xs md:text-base uppercase">
              {blog?.category}
            </h3>
            <h1 className=" text-4xl text-white text-center font-bold max-w-3xl">
              {blog?.title}
            </h1>
            <span className="text-gray-400 text-base">
              {formatDate(blog?.created_at)}
            </span>
          </div>
        </div>
      </div>
      {/* Blog Content Section */}
      <div className="py-28 container mx-auto max-w-7xl px-8 xl:px-0">
        <div className="rounded-md bg-white shadow-md p-6">
          <p>{blog?.content}</p>
          <div className="mt-4 text-right">
            <p className="font-medium text-gray-700">
              <span className="text-gray-500">Author:</span> {blog?.author_name}
            </p>
          </div>
        </div>
      </div>

      {/* Related Blogs Section */}
      <div className="container mx-auto max-w-7xl px-8 xl:px-0 pb-28">
        <div className="flex flex-col items-center justify-between container mx-auto gap-5 lg:gap-7">
          <h2 className="uppercase  w-full text-sm lg:text-base text-black text-center font-semibold font-sans">
            Related Blogs
          </h2>
          <h1 className="text-3xl lg:text-4xl font-semibold">
            {" "}
            Our news and ideas
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto max-w-7xl px-4 xl:px-0">
          {relatedBlogs.length > 0 ? (
            relatedBlogs.map((relatedBlog) => (
              <div key={relatedBlog.id}>
                <BlogCard
                  category={relatedBlog.category}
                  img={relatedBlog.image_url}
                  title={relatedBlog.title}
                  date={relatedBlog.created_at}
                  border={true}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No related blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
