'use client'
import React, { useState } from "react";

const Query = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    category: "",
    query: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add your form submission logic here
  };

  return (
    <div className=" pt-8 flex flex-col items-center justify-between gap-8">
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl text-black font-semibold mb-3 font-serif">
          Have any questions about this course?
        </h2>
        <p className="text-base text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
          architecto cupiditate perferendis laborum harum voluptas voluptatem
          quaerat eius? Fugit illum sed ad consectetur. Alias, tenetur.
          Consequuntur in officiis sequi quidem ratione corporis neque, adipisci
          eaque beatae maiores exercitationem. Accusantium adipisci ut incidunt
          minima, facilis mollitia vel libero consequuntur consectetur itaque
          dolor repudiandae vitae rerum tempore? Fugiat corporis earum
          voluptatem dolorem!
        </p>
      </div>
      <div className="w-full flex flex-col  justify-between gap-5">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div className="flex items-center justify-between gap-5">
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First name *"
              required
              className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Last name *"
              required
              className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="flex items-center justify-between gap-5">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email *"
              required
              className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Course category *"
              required
              className="mt-5 p-4  w-full border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

        

          {/* Message */}
          <div>
            <textarea
              id="query"
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Your query *"
              required
              rows="4"
              className="mt-5 p-4  w-full border border-gray-400  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Save Information Checkbox */}
          <div className="flex items-center py-4">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="saveInfo"
              className="ml-2 text-base font-medium text-gray-600"
            >
              Save information for next time
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-teal-950  text-white py-4 px-10 rounded-md hover:scale-95"
          >
            Send Your Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default Query;
