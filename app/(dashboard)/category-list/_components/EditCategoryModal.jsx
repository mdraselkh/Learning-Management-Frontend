"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export function EditCategoryModal({ onSubmit, onCancel, currentCategory }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Prefill data when `currentCategory` is provided
  useEffect(() => {
    if (currentCategory) {
      setCategoryTitle(currentCategory.category_title || "");
      setDescription(currentCategory.description || "");
      setSubCategory(currentCategory.subcategory || []);
    }
  }, [currentCategory]);

  const handleAddSubcategory = () => {
    if (inputValue && !subCategory.includes(inputValue)) {
      setSubCategory([...subCategory, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteSubcategory = (index) => {
    const newSubCategory = subCategory.filter((_, i) => i !== index);
    setSubCategory(newSubCategory);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCategory = {
      id: currentCategory?.id, // Include ID if editing an existing category
      category_title: categoryTitle,
      subcategory: subCategory,
      description: description,
    };
    onSubmit(updatedCategory);
    setCategoryTitle("");
    setDescription("");
    setSubCategory([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Category Title */}
      <div className="mb-4">
        <Label htmlFor="category_title">Category Title</Label>
        <Input
          id="category_title"
          name="category_title"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="Enter category title"
          className="mt-1"
          required
        />
      </div>

      {/* SubcurrentCategory */}
      <div className="mb-4">
        <Label htmlFor="subcategory">Subcategory Name</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {subCategory.map((subcategory, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r"
              style={{
                background: `hsl(${Math.random() * 360}, 100%, 75%)`,
              }}
            >
              <span>{subcategory}</span>
              <button
                type="button"
                onClick={() => handleDeleteSubcategory(index)}
                className="ml-2 text-black hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Input
            id="subcategory"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter subcategory"
            className="mt-1 w-full"
          />
          <Button
            type="button"
            onClick={handleAddSubcategory}
            className="bg-teal-700 text-white"
          >
            <FaPlus />
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter category description"
          className="mt-1"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-start gap-4">
        <Button type="submit" className="bg-teal-950 px-5 text-white">
          Submit
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 px-5 text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
