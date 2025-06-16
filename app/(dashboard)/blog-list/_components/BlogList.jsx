"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/blog/getAllBlogs" // Replace with your actual API endpoint
      );
      console.log(response.data.data);

      setBlogList(response.data.data);
    } catch (error) {
      console.error("Error fetching blog list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  console.log(blogList);

  const updateBlogList = () => {
    fetchBlogData(); // Fetch data again when needed
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Pass entire enrollment data to DataTable */}
      <DataTable columns={columns(updateBlogList)} data={blogList} />
    </div>
  );
};

export default BlogList;
