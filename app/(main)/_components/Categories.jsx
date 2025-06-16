"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import icon1 from "/public/images/writing.png";
import icon2 from "/public/images/finance.png";
import icon3 from "/public/images/layers.png";
import icon4 from "/public/images/digital.png";
import icon5 from "/public/images/devops.png";
import icon6 from "/public/images/content.png";
import { FaPenFancy } from "react-icons/fa6";
import axios from "axios";
import Loading from "@/app/loading";

const Categories = ({ removeTop, isCoursePage }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/categories/getCategoriesWithCourseCount"
      );
      console.log(response);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const categoriesData = [
    {
      id: 1,
      icon: icon1,
      title: categories[2]?.subcategories[0],
      courseCount: categories[2]?.courseCount,
      categoryName: categories[2]?.categoryTitle,
    },
    {
      id: 2,
      icon: icon2,
      title: categories[3]?.subcategories[0],
      courseCount: categories[3]?.courseCount,
      categoryName: categories[3]?.categoryTitle,
    },
    {
      id: 3,
      icon: icon3,
      title: categories[1]?.subcategories[1],
      courseCount: categories[1]?.courseCount,
      categoryName: categories[1]?.categoryTitle,
    },
    {
      id: 4,
      icon: icon4,
      title: categories[0]?.subcategories[0],
      courseCount: categories[0]?.courseCount,
      categoryName: categories[0]?.categoryTitle,
    },
    {
      id: 5,
      icon: icon5,
      title: categories[1]?.subcategories[0],
      courseCount: categories[1]?.courseCount,
      categoryName: categories[1]?.categoryTitle,
    },
    {
      id: 6,
      icon: icon6,
      title: categories[2]?.subcategories[1],
      courseCount: categories[2]?.courseCount,
      categoryName: categories[2]?.categoryTitle,
    },
  ];

  return (
    <div className={`${isCoursePage ? "bg-teal-50" : "bg-slate-100"}`}>
      <div
        className={`container mx-auto max-w-7xl flex flex-col items-center lg:items-start justify-between px-4 lg:flex-row py-10 ${
          removeTop
            ? "py-24"
            : "pt-40 xl:py-20 md:py-10 mt-96 md:mt-28 xl:mt-36"
        } `}
      >
        <div className="lg:w-1/3 xl:w-2/4 flex flex-col items-center lg:items-start justify-center gap-8 mb-16 lg:mb-0">
          <p className="text-black font-medium font-mono text-sm lg:text-base xl:text-lg">
            TOP CATEGORIES
          </p>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold font-serif text-center lg:text-left">
            Discover Leading Categories
          </h1>
          <Link
            href={isCoursePage ? '/course#allCourses':'/course'}
            className="md:px-12 rounded md:py-4 px-4 py-3  bg-teal-950 text-base text-gray-50 hover:scale-95 transition-all ease-in-out duration-200 cursor-pointer"
          >
            {isCoursePage ? 'Show Courses' : 'Explore Courses'}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 px-4 md:px-0 xl:w-1/2 gap-6 md:gap-8 place-items-center">
          {categoriesData.map((item, index) => (
            <div key={index}>
              <CategoryCard
                icon={item.icon}
                title={item.title}
                description={item.courseCount}
                isCoursePage={isCoursePage}
                categoryName={item.categoryName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
