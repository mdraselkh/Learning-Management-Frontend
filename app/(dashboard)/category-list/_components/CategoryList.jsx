"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import Loading from "@/app/loading";
import axiosInstance from "@/app/utils/axiosInstance";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to true

  const fetchCategoriesData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/categories/getAllCategories"
      );
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const updateCategoriesList = () => {
    fetchCategoriesData();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <DataTable
        columns={columns({
          updateCategoriesList: updateCategoriesList,
          categories: categories,
        })}
        data={categories}
        updateCategoriesList={updateCategoriesList}
      />
    </div>
  );
};

export default CategoryList;
