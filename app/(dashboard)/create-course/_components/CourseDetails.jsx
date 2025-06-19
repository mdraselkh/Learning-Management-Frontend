"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import dynamic from "next/dynamic";
import { FaPlus, FaTimes } from "react-icons/fa";
import axiosInstance from "@/app/utils/axiosInstance";

const CourseDetails = ({ courseData, setCourseData, errors, handleNext }) => {
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const courseLevel = ["Beginner", "Intermediate", "Advanced"];
  const courseLang = ["English", "Bangla"];
  const [tags, setTags] = useState([]); // Array to hold subcategory tags
  const [inputValue, setInputValue] = useState(""); // To handle new input value

  const handleAddTags = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]); // Add new subcategory
      setInputValue(""); // Reset input value after adding
    }
  };

  const handleDeleteTags = (index) => {
    const newTags = tags.filter((_, i) => i !== index); // Remove subcategory at the index
    setTags(newTags);
  };

  useEffect(() => {
    // Fetch categories from the API using Axios
    axiosInstance
      .get("/api/categories/getAllCategories") // Replace with your actual API endpoint
      .then((response) => {
        setCategories(response.data); // Assuming the response contains an array of categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/users/getAllusers")
      .then((response) => {
        const filteredUsers = response.data.users.filter(
          (user) => user.role === "instructor"
        );
        const options = filteredUsers.map((instructor) => ({
          value: instructor.id,
          label: instructor.name,
        }));
        setInstructors(options);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  const handleInstructorChange = (selectedInstructors) => {
    setCourseData({
      ...courseData,
      instructors: selectedInstructors.map((instructor) => instructor.value),
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Details</h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center w-full gap-5">
          <div className="w-1/3">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="Enter course title"
              className="mt-1"
              value={courseData.title}
              onChange={(e) =>
                setCourseData({ ...courseData, title: e.target.value })
              }
              required
            />
            {errors.title && <p className="text-red-500">Title is required</p>}
          </div>
          <div className="w-1/3">
            <Label htmlFor="category">Course Category</Label>
            <Select
              instanceId="cetgory-select"
              className="mt-1"
              value={{
                label: courseData.category,
                value: courseData.category,
              }} // Update to match react-select format
              onChange={(selectedOption) =>
                setCourseData({ ...courseData, category: selectedOption.value })
              }
              options={categories.map((category) => ({
                value: category.category_title,
                label: category.category_title,
              }))}
              placeholder="Select category"
              required
            />
            {errors.category && (
              <p className="text-red-500">Category is required</p>
            )}
          </div>
          <div className="w-1/3">
            <Label htmlFor="level" className="mt-4">
              Course Level
            </Label>
            <Select
              instanceId="level-select"
              className="mt-1"
              value={{
                label: courseData.level,
                value: courseData.level,
              }} // Update to match react-select format
              onChange={(selectedOption) =>
                setCourseData({ ...courseData, level: selectedOption.value })
              }
              options={courseLevel.map((level) => ({
                value: level,
                label: level,
              }))}
              placeholder="Select course level"
              required
            />
            {errors.level && (
              <p className="text-red-500">Course level is required</p>
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-5">
          <div className="w-1/3">
            <Label htmlFor="instructors">Instructors</Label>
            <Select
              instanceId="instructors-select"
              className="mt-1"
              isMulti
              value={instructors.filter((instructor) =>
                courseData.instructors?.includes(instructor.value)
              )}
              onChange={handleInstructorChange}
              options={instructors}
              placeholder="Select instructors"
              required
            />
            {errors.instructors && (
              <p className="text-red-500">Instructor is required</p>
            )}
          </div>
          <div className="w-1/3">
            <Label htmlFor="language" className="mt-4">
              Language
            </Label>
            <Select
              instanceId="language-select"
              className="mt-1"
              value={{
                label: courseData.language,
                value: courseData.language,
              }} // Update to match react-select format
              onChange={(selectedOption) =>
                setCourseData({ ...courseData, language: selectedOption.value })
              }
              options={courseLang.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              required
            />
            {errors.language && (
              <p className="text-red-500">Course language is required</p>
            )}
          </div>
          <div className="w-1/3">
            <Label htmlFor="thumbnail" className="mt-4">
              Thumbnail
            </Label>
            <Input
              type="file"
              id="thumbnail"
              className="mt-1"
              onChange={(e) =>
                setCourseData({ ...courseData, thumbnail: e.target.files[0] })
              }
            />
            {errors.thumbnail && (
              <p className="text-red-500">Thumbnail is required</p>
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-5">
          <div className="w-1/3">
            <Label htmlFor="total_lesson" className="mt-4">
              Total Lesson
            </Label>
            <Input
              id="total_lesson"
              placeholder="Enter Total Lesson"
              className="mt-1"
              value={courseData.total_lesson}
              onChange={(e) =>
                setCourseData({ ...courseData, total_lesson: e.target.value })
              }
              required
            />
            {errors.total_lesson && (
              <p className="text-red-500">Total Lesson is required</p>
            )}
          </div>
          <div className="w-1/3">
            <Label htmlFor="lesson_duration" className="mt-4">
              Lesson duration
            </Label>
            <Input
              id="lesson_duration"
              placeholder="Enter Lesson duration"
              className="mt-1"
              value={courseData.lesson_duration}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  lesson_duration: e.target.value,
                })
              }
              required
            />
            {errors.lesson_duration && (
              <p className="text-red-500">Lesson Duration is required</p>
            )}
          </div>
          <div className="w-1/3">
            <Label htmlFor="time_span" className="mt-4">
              Time Span
            </Label>
            <Input
              id="time_span"
              placeholder="Enter Time Span"
              className="mt-1"
              value={courseData.time_span}
              onChange={(e) =>
                setCourseData({ ...courseData, time_span: e.target.value })
              }
              required
            />
            {errors.time_span && (
              <p className="text-red-500">Time Span is required</p>
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-5">
          <div className="w-1/3">
            <Label htmlFor="price" className="mt-4">
              Price
            </Label>
            <Input
              id="price"
              placeholder="Enter Course Price"
              className="mt-1"
              value={courseData.price}
              onChange={(e) =>
                setCourseData({ ...courseData, price: e.target.value })
              }
              required
            />
            {errors.price && <p className="text-red-500">Price is required</p>}
          </div>
          <div className="w-1/3">
            {/* Display tags dynamically */}
            <div className="flex flex-wrap">
              <Label htmlFor="tags" className="mt-1">
                Tags
              </Label>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className=" ml-2 flex items-center justify-between px-1 rounded text-[10px] text-white bg-gradient-to-r"
                  style={{
                    background: `hsl(${Math.random() * 360}, 100%, 75%)`,
                  }}
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTags(index)}
                    className="ml-1 text-black hover:text-red-500"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input field for new subcategory */}
            <div className="flex items-center gap-2">
              <Input
                id="tags"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter tags"
                className="mt-2 w-full"
              />
              <Button
                type="button"
                onClick={handleAddTags}
                className="bg-teal-700 text-white mt-2"
              >
                <FaPlus />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="block mb-2">
            Course Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter course description"
            value={courseData.description}
            onChange={(e) =>
              setCourseData({ ...courseData, description: e.target.value })
            }
            required
          />

          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-700">Status</label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="published"
                name="status"
                value="Published"
                checked={courseData.status === "Published"}
                onChange={(e) =>
                  setCourseData({ ...courseData, status: e.target.value })
                }
                className="form-radio h-4 w-4 text-yellow-600"
              />
              <label htmlFor="published" className="ml-2 text-sm text-black">
                Published
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="draft"
                name="status"
                value="Draft"
                checked={courseData.status === "Draft"}
                onChange={(e) =>
                  setCourseData({ ...courseData, status: e.target.value })
                }
                className="form-radio h-4 w-4 text-yellow-600"
              />
              <label htmlFor="draft" className="ml-2 text-sm text-black">
                Draft
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
