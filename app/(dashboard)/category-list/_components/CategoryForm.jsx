"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export function CategoryForm({ onSubmit, onCancel }) {
  const [subcategories, setSubcategories] = useState([]); // Array to hold subcategory tags
  const [inputValue, setInputValue] = useState(""); // To handle new input value

  const handleAddSubcategory = () => {
    if (inputValue && !subcategories.includes(inputValue)) {
      setSubcategories([...subcategories, inputValue]); // Add new subcategory
      setInputValue(""); // Reset input value after adding
    }
  };

  const handleDeleteSubcategory = (index) => {
    const newSubcategories = subcategories.filter((_, i) => i !== index); // Remove subcategory at the index
    setSubcategories(newSubcategories);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = {
      category_title: formData.get("category_title"),
      subcategory: subcategories,
      description: formData.get("description"),
    };
    onSubmit(category); 
    event.target.reset(); 
    setSubcategories([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Category Title */}
      <div className="mb-4">
        <Label htmlFor="category_title">Category Title</Label>
        <Input
          id="category_title"
          name="category_title"
          placeholder="Enter category title"
          className="mt-1"
          required
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="subcategory">Subcategory Name</Label>

        {/* Display tags dynamically */}
        <div className="flex flex-wrap gap-2 mt-2">
          {subcategories.map((subcategory, index) => (
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

        {/* Input field for new subcategory */}
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
          placeholder="Enter category description"
          className="mt-1"
        />
      </div>
      {/* Actions */}
      <div className="flex justify-start gap-4">
        <Button type="submit" className="bg-teal-950 px-5 text-white">
          Submit
        </Button>
      </div>
    </form>
  );
}
