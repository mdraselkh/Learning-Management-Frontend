"use client";
import React, { useEffect, useState } from "react";
import img1 from "/public/images/blogimg.png";
import BlogCard from "./BlogCard";
import axios from "axios";

const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blog/getAllBlogs"
      );
      console.log(response.data);

      const publishedBlogs = response.data.data.filter((d) => {
        return d.status === "published";
      });

      const lastThreeBlogs = publishedBlogs.slice(-3);
      setBlogData(lastThreeBlogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  console.log(blogData);

  return (
    <div className="bg-slate-100 py-10 lg:py-20">
      <div className="flex flex-col items-center justify-between container mx-auto gap-5 lg:gap-7">
        <h2 className="uppercase  w-full text-sm lg:text-base text-black text-center font-semibold font-sans">
          Education Blog
        </h2>
        <h1 className="text-3xl lg:text-5xl font-semibold">
          {" "}
          Our news and ideas
        </h1>
        <p className="text-gray-400 px-4 text-sm md:text-base max-w-3xl text-center">
          Stay ahead with the latest insights, tips, and trends in education.
          Our blog is your go-to spot for fresh ideas to boost learning and
          teaching.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto max-w-7xl px-4 xl:px-0">
        {blogData.map((blog) => (
          <div key={blog.id}>
            <BlogCard
              category={blog.category}
              img={blog.image_url}
              title={blog.title}
              date={blog.created_at}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
